/**
 * GET /api/index
 * 代理：红利低波100指数数据
 * 优先实时接口，失败时回退到最新日K，避免线上因单一源抖动直接 500。
 */

const INDEX_SECID = '2.930955';

function fetchOpts() {
  return {
    headers: {
      'User-Agent': 'Mozilla/5.0',
      'Referer': 'https://www.eastmoney.com/',
    },
  };
}

function toNumber(value, divisor = 1) {
  const num = Number(value);
  return Number.isFinite(num) ? num / divisor : null;
}

function buildRealtimePayload(raw) {
  const current = toNumber(raw?.f43, 100);
  const prevClose = toNumber(raw?.f60, 100);
  const open = toNumber(raw?.f46, 100);
  const high = toNumber(raw?.f44, 100);
  const low = toNumber(raw?.f45, 100);

  if (!current || !prevClose) return null;

  return {
    name: raw?.f58 || '红利低波100',
    current,
    open: open ?? current,
    high: high ?? current,
    low: low ?? current,
    prevClose,
    // 直接用现价/昨收重算，避免上游返回字段量纲偶发变化
    changePct: ((current - prevClose) / prevClose) * 100,
    source: 'realtime',
  };
}

function buildKlinePayload(klines) {
  if (!Array.isArray(klines) || klines.length === 0) return null;

  const latest = String(klines[klines.length - 1]).split(',');
  const previous = klines.length > 1 ? String(klines[klines.length - 2]).split(',') : null;

  const current = Number(latest[2]);
  const open = Number(latest[1]);
  const high = Number(latest[3]);
  const low = Number(latest[4]);
  const prevClose = previous ? Number(previous[2]) : open;

  if (![current, open, high, low, prevClose].every(Number.isFinite)) return null;

  return {
    name: '红利低波100',
    current,
    open,
    high,
    low,
    prevClose,
    changePct: prevClose ? ((current - prevClose) / prevClose) * 100 : 0,
    date: latest[0] || null,
    source: 'kline',
  };
}

async function fetchRealtimeIndex() {
  const url = 'https://push2.eastmoney.com/api/qt/stock/get?' +
    `secid=${INDEX_SECID}&fields=f43,f44,f45,f46,f57,f58,f60,f170`;

  const response = await fetch(url, fetchOpts());
  if (!response.ok) {
    throw new Error('实时接口请求失败: HTTP ' + response.status);
  }

  const data = await response.json();
  const payload = buildRealtimePayload(data?.data);
  if (!payload) {
    throw new Error('实时接口返回缺少关键字段');
  }
  return payload;
}

async function fetchIndexFromKline() {
  const url = 'https://push2his.eastmoney.com/api/qt/stock/kline/get?' +
    `secid=${INDEX_SECID}&fields1=f1,f2,f3&fields2=f51,f52,f53,f54,f55` +
    '&klt=101&fqt=1&lmt=3';

  const response = await fetch(url, fetchOpts());
  if (!response.ok) {
    throw new Error('K线接口请求失败: HTTP ' + response.status);
  }

  const data = await response.json();
  const payload = buildKlinePayload(data?.data?.klines);
  if (!payload) {
    throw new Error('K线接口返回缺少关键字段');
  }
  return payload;
}

export default async function handler(req, res) {
  try {
    try {
      const realtime = await fetchRealtimeIndex();
      return res.json(realtime);
    } catch (realtimeError) {
      const fallback = await fetchIndexFromKline();
      return res.json({
        ...fallback,
        fallbackReason: realtimeError.message,
      });
    }
  } catch (e) {
    res.status(500).json({ error: e.message || '指数数据获取失败' });
  }
}
