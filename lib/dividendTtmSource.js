import XLSX from 'xlsx';

export const SOURCE_URL = 'https://oss-ch.csindex.com.cn/static/html/csindex/public/uploads/file/autofile/cons/930955cons.xls';
export const MARKET_URL = 'https://datacenter-web.eastmoney.com/api/data/v1/get';
export const METRIC_TYPE = 'TTM（总股本加权）';
export const METHODOLOGY = 'ttm-total-shares-adjusted-dps-v1';
function fail(message, stage = 'validation') { const error = new Error(message); error.failureStage = stage; throw error; }
function day(value) {
  const text = String(value || '').slice(0, 10).replace(/^(\d{4})(\d{2})(\d{2})$/, '$1-$2-$3');
  if (!/^\d{4}-\d{2}-\d{2}$/.test(text) || !Number.isFinite(Date.parse(text)) || new Date(text).toISOString().slice(0, 10) !== text) fail(`无效日期：${value}`);
  return text;
}
function positive(value, label) {
  if (typeof value !== 'number' || !Number.isFinite(value) || value <= 0) fail(`${label}缺失或无效`);
  return value;
}
export function parseMembers(bytes, { today = new Intl.DateTimeFormat('en-CA', { timeZone: 'Asia/Shanghai' }).format(new Date()) } = {}) {
  const data = Buffer.from(bytes);
  if (data.length > 2 * 1024 * 1024 || data.subarray(0, 8).toString('hex') !== 'd0cf11e0a1b11ae1') fail('中证成分文件不是有效 XLS', 'parse');
  let rows;
  try {
    const book = XLSX.read(data, { type: 'buffer', sheetRows: 200 });
    rows = XLSX.utils.sheet_to_json(book.Sheets[book.SheetNames[0]], { header: 1, defval: null });
  } catch { fail('中证成分文件解析失败', 'parse'); }
  const headers = (rows[0] || []).map(v => String(v || '').replace(/\s/g, ''));
  const columns = ['日期', '指数代码', '成份券代码'].map(label => headers.findIndex(v => v.startsWith(label)));
  if (columns.some(col => col < 0)) fail('中证成分文件缺少必需列', 'parse');
  const members = rows.slice(1).filter(row => row.some(v => v != null)).map(row => {
    if (String(row[columns[1]]) !== '930955') fail('成分文件包含其他指数');
    return { date: day(row[columns[0]]), code: String(row[columns[2]]).padStart(6, '0') };
  });
  if (members.length !== 100 || new Set(members.map(r => r.code)).size !== 100 || members.some(r => !/^\d{6}$/.test(r.code))) fail('成分股不足100只或代码重复');
  const date = members[0].date;
  if (members.some(r => r.date !== date) || date > today) fail('成分文件日期不一致或为未来日期');
  return { date, codes: members.map(r => r.code) };
}
export function windowStart(date) {
  const [year, month, dateOfMonth] = day(date).split('-').map(Number);
  const lastDay = new Date(Date.UTC(year - 1, month, 0)).getUTCDate();
  return `${year - 1}-${String(month).padStart(2, '0')}-${String(Math.min(dateOfMonth, lastDay)).padStart(2, '0')}`;
}
export function calculateTtm({ date, codes, valuations, dividends }) {
  date = day(date);
  const startDate = windowStart(date);
  if (codes.length !== 100 || new Set(codes).size !== 100) fail('必须覆盖100只不同成分股');
  if (valuations.length !== 100 || valuations.some(v => !codes.includes(v.SECURITY_CODE)) || dividends.some(v => !codes.includes(v.SECURITY_CODE))) fail('上游成分范围不完整或混入其他股票');
  const components = codes.map(code => {
    const quotes = valuations.filter(row => row.SECURITY_CODE === code);
    const history = dividends.filter(row => row.SECURITY_CODE === code);
    if (quotes.length !== 1 || !history.length) fail(`${code} 缺少唯一市值或分红历史，拒绝部分汇总`);
    const quote = quotes[0];
    if (day(quote.TRADE_DATE) !== date) fail(`${code} 市值日期不一致`);
    const shares = positive(quote.TOTAL_SHARES, `${code}总股本`);
    const cap = positive(quote.TOTAL_MARKET_CAP, `${code}总市值`);
    const price = positive(quote.CLOSE_PRICE, `${code}收盘价`);
    if (Math.abs(price * shares / cap - 1) > 0.001) fail(`${code}总市值与股本价格单位不匹配`);
    const seen = new Set(), events = [];
    for (const row of history) {
      if (row.ASSIGN_PROGRESS !== '实施分配') continue;
      const cash = row.PRETAX_BONUS_RMB, bonus = row.BONUS_IT_RATIO;
      if (cash == null && /派|现金分红/.test(row.IMPL_PLAN_PROFILE || '')) {
        const recent = row.EX_DIVIDEND_DATE
          ? day(row.EX_DIVIDEND_DATE) > startDate && day(row.EX_DIVIDEND_DATE) <= date
          : !row.NOTICE_DATE || day(row.NOTICE_DATE) > startDate;
        if (recent) fail(`${code}近期现金分红金额缺失`);
      }
      if (cash == null && bonus == null) continue;
      // Very old implemented records can lack an ex-date. An implementation
      // notice before the window proves those records cannot be new payouts.
      if (!row.EX_DIVIDEND_DATE) {
        if (row.NOTICE_DATE && day(row.NOTICE_DATE) <= startDate) continue;
        fail(`${code}近期已实施分红缺少除息日（报告期${row.REPORT_DATE}）`);
      }
      if ((cash != null && (typeof cash !== 'number' || !Number.isFinite(cash) || cash < 0)) ||
          (bonus != null && (typeof bonus !== 'number' || !Number.isFinite(bonus) || bonus < 0))) fail(`${code}分红金额或送转比例无效`);
      const exDate = day(row.EX_DIVIDEND_DATE);
      if (exDate <= startDate || exDate > date) continue;
      const key = `${row.REPORT_DATE}|${exDate}`;
      if (seen.has(key)) fail(`${code}重复分红事件`);
      seen.add(key);
      events.push({ exDate, reportDate: day(row.REPORT_DATE), cashPer10: cash ?? 0, bonusPer10: bonus ?? 0 });
    }
    // Same-day cash uses pre-action shares. Restate past DPS on today's share basis.
    events.sort((a, b) => b.exDate.localeCompare(a.exDate));
    let adjustment = 1, dps = 0;
    for (const event of events) {
      adjustment *= 1 + event.bonusPer10 / 10;
      dps += event.cashPer10 / 10 / adjustment;
    }
    if (!Number.isFinite(dps) || dps < 0) fail(`${code}每股TTM分红计算异常`);
    return { code, name: quote.SECURITY_NAME_ABBR, totalShares: shares, totalMarketCap: cap, close: price,
      adjustedDpsTtm: dps, cashEquivalentTtm: shares * dps, events };
  });
  const totalMarketCap = components.reduce((s, r) => s + r.totalMarketCap, 0);
  const cashEquivalentTtm = components.reduce((s, r) => s + r.cashEquivalentTtm, 0);
  const yieldPct = cashEquivalentTtm / totalMarketCap * 100;
  if (!Number.isFinite(yieldPct) || yieldPct <= 0 || yieldPct >= 100) fail('指数 TTM 股息率异常');
  return { date, yieldPct, components, calculation: { methodology: METHODOLOGY, period: 'ttm', weighting: 'total-shares',
    startDate, endDate: date, startExclusive: true, constituentCount: 100, coveredConstituents: 100,
    dividendEventCount: components.reduce((s,r)=>s+r.events.filter(e=>e.cashPer10>0).length,0), totalMarketCap, cashEquivalentTtm,
    formula: 'sum(currentTotalShares * splitAdjustedTrailing12MonthDps) / sum(currentTotalMarketCap)',
    limitations: '按当前成分和总股本汇总历史分红，含送转调整；非中证官方股息率或基金分红率。配股、合并等其他公司行为未作独立复核。' } };
}
async function request(url, { binary, fetchImpl, sleepImpl, maxAttempts, timeoutMs }) {
  for (let attempt = 1; attempt <= maxAttempts; attempt++) {
    const controller = new AbortController(), timer = setTimeout(() => controller.abort(), timeoutMs);
    try {
      const response = await fetchImpl(url, { signal: controller.signal, headers: { 'User-Agent': 'Mozilla/5.0', 'Referer': 'https://data.eastmoney.com/' } });
      if (!response.ok) {
        const error = new Error(`数据源 HTTP ${response.status}`);
        error.retryable = [408,425,429,500,502,503,504].includes(response.status);
        error.status = response.status;
        const seconds = Number(response.headers.get('retry-after'));
        if (response.headers.has('retry-after') && Number.isFinite(seconds) && seconds >= 0) error.delayMs = Math.min(seconds * 1000, 300000);
        throw error;
      }
      if (Number(response.headers.get('content-length')) > 10 * 1024 * 1024) fail('上游响应过大', 'parse');
      return binary ? await response.arrayBuffer() : await response.json();
    } catch (error) {
      if (error.failureStage || error.retryable === false || attempt === maxAttempts) {
        error.failureStage ||= error.status ? 'http' : 'request';
        error.attempts = attempt;
        throw error;
      }
      // Clear the request timeout before backoff.
      clearTimeout(timer);
      await sleepImpl(error.delayMs ?? 2000 * 2 ** (attempt - 1));
    } finally { clearTimeout(timer); }
  }
}
export async function fetchDividendSnapshotFromSource({ fetchImpl = fetch, maxAttempts = 3, timeoutMs = 20000,
  sleepImpl = ms => new Promise(resolve => setTimeout(resolve, ms)) } = {}) {
  const options = { fetchImpl, sleepImpl, maxAttempts, timeoutMs };
  const { date, codes } = parseMembers(await request(SOURCE_URL, { ...options, binary: true }));
  const valuations = [], dividends = [];
  for (let i = 0; i < codes.length; i += 25) {
    const filter = `(SECURITY_CODE in (${codes.slice(i, i + 25).map(code=>`"${code}"`).join(',')}))`;
    for (const [reportName, extra, output] of [
      ['RPT_VALUEANALYSIS_DET', `(TRADE_DATE='${date}')`, valuations], ['RPT_SHAREBONUS_DET', '', dividends],
    ]) {
      const url = new URL(MARKET_URL);
      url.search = new URLSearchParams({ reportName, columns: 'ALL', filter: filter + extra, pageSize: '500', pageNumber: '1', source: 'WEB', client: 'WEB',
        sortColumns: reportName === 'RPT_SHAREBONUS_DET' ? 'SECURITY_CODE,REPORT_DATE' : 'SECURITY_CODE',
        sortTypes: reportName === 'RPT_SHAREBONUS_DET' ? '1,-1' : '1' });
      let expectedCount, expectedPages, received = 0;
      for (let page = 1; page <= (expectedPages || 1); page++) {
        url.searchParams.set('pageNumber', String(page));
        const payload = await request(url.href, options), result = payload.result;
        if (!payload.success || !Array.isArray(result?.data) || !Number.isInteger(result.pages) || result.pages < 1 || result.pages > 20) fail(`${reportName}返回错误或分页不完整`);
        if (page === 1) { expectedPages = result.pages; expectedCount = result.count; }
        if (result.count !== expectedCount || result.pages !== expectedPages) fail('上游分页在抓取期间变化，请重试');
        received += result.data.length;
        output.push(...result.data);
      }
      if (received !== expectedCount) fail(`${reportName}分页缺失`);
    }
  }
  return { ...calculateTtm({ date, codes, valuations, dividends }), source: 'computed-ttm', metricType: METRIC_TYPE,
    period: 'ttm', weighting: 'total-shares', sourceUrl: SOURCE_URL, sourceUrls: [SOURCE_URL, MARKET_URL], parseMethod: METHODOLOGY };
}
