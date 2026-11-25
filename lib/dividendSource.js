import XLSX from 'xlsx';

export const SOURCE_URL = 'https://oss-ch.csindex.com.cn/static/html/csindex/public/uploads/file/autofile/indicator/930955indicator.xls';
export const METRIC_TYPE = '股息率1（总股本）';
const MAX_FILE_BYTES = 2 * 1024 * 1024;

const RETRYABLE_STATUS_CODES = new Set([408, 425, 429, 500, 502, 503, 504]);
const DEFAULT_MAX_ATTEMPTS = 4;
const DEFAULT_TIMEOUT_MS = 15_000;
const DEFAULT_BASE_DELAY_MS = 20_000;
const MAX_RETRY_AFTER_MS = 5 * 60_000;

function createSourceError(message, { failureStage, status, retryAfterMs, cause } = {}) {
  const error = new Error(message, cause ? { cause } : undefined);
  error.failureStage = failureStage || 'request';
  error.status = status ?? null;
  error.retryAfterMs = retryAfterMs ?? null;
  error.retryable = error.failureStage === 'request' || RETRYABLE_STATUS_CODES.has(status);
  return error;
}

function parseRetryAfterMs(value, now = Date.now()) {
  if (!value) return null;
  const seconds = Number(value);
  if (Number.isFinite(seconds) && seconds >= 0) return Math.min(seconds * 1000, MAX_RETRY_AFTER_MS);

  const target = Date.parse(value);
  if (!Number.isFinite(target)) return null;
  return Math.min(Math.max(0, target - now), MAX_RETRY_AFTER_MS);
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function retryDelayMs(attempt, retryAfterMs, baseDelayMs, random = Math.random) {
  if (Number.isFinite(retryAfterMs)) return retryAfterMs;
  const exponentialDelay = baseDelayMs * (2 ** (attempt - 1));
  const jitter = Math.round(exponentialDelay * 0.2 * random());
  return exponentialDelay + jitter;
}

export function parseDividendPayload(bytes, { now = new Date() } = {}) {
  const fail = message => { throw createSourceError(message, { failureStage: 'parse' }); };
  const buffer = Buffer.from(bytes);
  if (buffer.length > MAX_FILE_BYTES || buffer.subarray(0, 8).toString('hex') !== 'd0cf11e0a1b11ae1') {
    fail('中证返回的内容不是有效 XLS 估值文件');
  }
  let rows;
  try {
    const book = XLSX.read(buffer, { type: 'buffer', sheetRows: 256 });
    rows = XLSX.utils.sheet_to_json(book.Sheets[book.SheetNames[0]], { header: 1, defval: null, raw: true });
  } catch {
    fail('中证 XLS 估值文件解析失败');
  }
  const headers = (rows[0] || []).map(value => String(value || '').replace(/\s/g, ''));
  const dateCol = headers.findIndex(value => value.startsWith('日期'));
  const codeCol = headers.findIndex(value => value.startsWith('指数代码'));
  const yieldCol = headers.findIndex(value => value.includes('股息率1') && value.includes('总股本'));
  if ([dateCol, codeCol, yieldCol].some(col => col < 0)) fail('中证估值文件缺少日期、指数代码或股息率1列');
  const today = new Intl.DateTimeFormat('en-CA', { timeZone: 'Asia/Shanghai', year: 'numeric', month: '2-digit', day: '2-digit' }).format(now);
  const records = [];
  const dates = new Set();
  for (const row of rows.slice(1)) {
    if (String(row[codeCol]) !== '930955') continue;
    const rawDate = String(row[dateCol]);
    const date = rawDate.replace(/^(\d{4})(\d{2})(\d{2})$/, '$1-$2-$3');
    if (!/^\d{4}-\d{2}-\d{2}$/.test(date) || !Number.isFinite(Date.parse(date)) || new Date(date).toISOString().slice(0, 10) !== date || date > today) {
      fail('中证估值文件包含无效或未来日期');
    }
    const yieldPct = row[yieldCol];
    if (typeof yieldPct !== 'number' || !Number.isFinite(yieldPct) || yieldPct <= 0 || yieldPct >= 100) fail('中证股息率1为空或超出合理范围');
    if (dates.has(date)) fail('中证估值文件包含重复日期');
    dates.add(date);
    records.push({ date, yieldPct });
  }
  if (!records.length) fail('中证估值文件中没有 930955 的有效记录');
  records.sort((a, b) => b.date.localeCompare(a.date));
  return { ...records[0], parseMethod: 'csindex-xls-dp1' };
}

async function fetchFileOnce({ fetchImpl, timeoutMs }) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);
  try {
    let response;
    try {
      response = await fetchImpl(SOURCE_URL, {
        signal: controller.signal,
        headers: {
          'User-Agent': 'Mozilla/5.0 (compatible; hldividend100-snapshot/1.0)',
          'Referer': 'https://www.csindex.com.cn/',
          'Accept-Language': 'zh-CN,zh;q=0.9,en;q=0.8',
          'Accept': 'application/vnd.ms-excel,application/octet-stream;q=0.9,*/*;q=0.8',
          'Cache-Control': 'no-cache',
          'Pragma': 'no-cache',
        },
      });
    } catch (cause) {
      const timedOut = controller.signal.aborted;
      throw createSourceError(
        timedOut ? `中证请求超时（${Math.round(timeoutMs / 1000)} 秒）` : '中证请求失败',
        { failureStage: 'request', cause }
      );
    }

    if (!response.ok) {
      const retryAfterMs = parseRetryAfterMs(response.headers.get('retry-after'));
      throw createSourceError(`中证请求失败: HTTP ${response.status}`, {
        failureStage: 'http',
        status: response.status,
        retryAfterMs,
      });
    }

    if (Number(response.headers.get('content-length')) > MAX_FILE_BYTES) {
      throw createSourceError('中证估值文件过大', { failureStage: 'parse' });
    }
    return await response.arrayBuffer();
  } finally {
    clearTimeout(timer);
  }
}

/**
 * Fetches the public source defensively. Options are intentionally injectable
 * so the retry policy can be tested without making external requests.
 */
export async function fetchDividendSnapshotFromSource({
  fetchImpl = fetch,
  maxAttempts = DEFAULT_MAX_ATTEMPTS,
  timeoutMs = DEFAULT_TIMEOUT_MS,
  baseDelayMs = DEFAULT_BASE_DELAY_MS,
  sleepImpl = sleep,
  random = Math.random,
  onRetry = ({ attempt, delayMs, error }) => console.warn(
    `snapshot fetch attempt ${attempt} failed (${error.message}); retrying in ${Math.ceil(delayMs / 1000)}s`
  ),
} = {}) {
  let lastError;
  let attemptsMade = 0;

  for (let attempt = 1; attempt <= maxAttempts; attempt += 1) {
    attemptsMade = attempt;
    try {
      const bytes = await fetchFileOnce({ fetchImpl, timeoutMs });
      const payload = parseDividendPayload(bytes);
      return {
        ...payload,
        source: 'csindex',
        metricType: METRIC_TYPE,
        sourceUrl: SOURCE_URL,
        attempts: attempt,
        failureStage: null,
      };
    } catch (error) {
      const sourceError = error.failureStage ? error : createSourceError(error.message || '中证请求失败', {
        failureStage: 'request',
        cause: error,
      });
      lastError = sourceError;
      if (!sourceError.retryable || attempt === maxAttempts) break;

      const delayMs = retryDelayMs(attempt, sourceError.retryAfterMs, baseDelayMs, random);
      onRetry({ attempt, delayMs, error: sourceError });
      await sleepImpl(delayMs);
    }
  }

  lastError.attempts = attemptsMade;
  throw lastError;
}
