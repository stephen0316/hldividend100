export const SOURCE_URL = 'https://www.lixinger.com/equity/index/detail/csi/930955/930955/fundamental/valuation/dyr?metrics-type=mcw';

const RETRYABLE_STATUS_CODES = new Set([408, 425, 429, 500, 502, 503, 504]);
const DEFAULT_MAX_ATTEMPTS = 4;
const DEFAULT_TIMEOUT_MS = 15_000;
const DEFAULT_BASE_DELAY_MS = 20_000;
const MAX_RETRY_AFTER_MS = 5 * 60_000;

function stripHtml(html) {
  return String(html)
    .replace(/<script[\s\S]*?<\/script>/gi, ' ')
    .replace(/<style[\s\S]*?<\/style>/gi, ' ')
    .replace(/<[^>]+>/g, ' ')
    .replace(/&nbsp;/gi, ' ')
    .replace(/&amp;/gi, '&')
    .replace(/\s+/g, ' ')
    .trim();
}

function extractFirst(text, patterns) {
  for (const pattern of patterns) {
    const match = text.match(pattern);
    if (match) return match[1];
  }
  return null;
}

function extractLatestTablePair(text) {
  const rows = [...text.matchAll(/(\d{4}-\d{2}-\d{2})\s+[0-9.]+万\s+([0-9]+(?:\.[0-9]+)?)%/g)];
  if (!rows.length) return null;
  return {
    date: rows[0][1],
    yieldPct: Number(rows[0][2]),
  };
}

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

export function parseDividendPayload(html) {
  const text = stripHtml(html);
  const scoped = text.match(/最后更新于[:：]?\s*(\d{4}-\d{2}-\d{2})[\s\S]{0,240}?当前值[:：]?\s*([0-9]+(?:\.[0-9]+)?)%/);
  const date = scoped ? scoped[1] : extractFirst(text, [
    /最后更新于[:：]?\s*(\d{4}-\d{2}-\d{2})/,
    /更新于[:：]?\s*(\d{4}-\d{2}-\d{2})/,
  ]);
  const yieldText = scoped ? scoped[2] : extractFirst(text, [
    /当前值[:：]?\s*([0-9]+(?:\.[0-9]+)?)%/,
    /最新值[:：]?\s*([0-9]+(?:\.[0-9]+)?)%/,
  ]);
  const yieldPct = Number(yieldText);

  if (date && Number.isFinite(yieldPct)) {
    return { date, yieldPct, parseMethod: 'scoped-text' };
  }

  const tablePair = extractLatestTablePair(text);
  if (tablePair && Number.isFinite(tablePair.yieldPct)) {
    return { ...tablePair, parseMethod: 'history-table' };
  }

  throw createSourceError('未能从理杏仁页面解析出最新股息率', { failureStage: 'parse' });
}

async function fetchHtmlOnce({ fetchImpl, timeoutMs }) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);
  try {
    let response;
    try {
      response = await fetchImpl(SOURCE_URL, {
        signal: controller.signal,
        headers: {
          'User-Agent': 'Mozilla/5.0 (compatible; hldividend100-snapshot/1.0)',
          'Referer': 'https://www.lixinger.com/',
          'Accept-Language': 'zh-CN,zh;q=0.9,en;q=0.8',
          'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
          'Cache-Control': 'no-cache',
          'Pragma': 'no-cache',
        },
      });
    } catch (cause) {
      const timedOut = controller.signal.aborted;
      throw createSourceError(
        timedOut ? `理杏仁请求超时（${Math.round(timeoutMs / 1000)} 秒）` : '理杏仁请求失败',
        { failureStage: 'request', cause }
      );
    }

    if (!response.ok) {
      const retryAfterMs = parseRetryAfterMs(response.headers.get('retry-after'));
      throw createSourceError(`理杏仁请求失败: HTTP ${response.status}`, {
        failureStage: 'http',
        status: response.status,
        retryAfterMs,
      });
    }

    return response.text();
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
      const html = await fetchHtmlOnce({ fetchImpl, timeoutMs });
      const payload = parseDividendPayload(html);
      return {
        ...payload,
        source: 'lixinger',
        metricType: '市值加权',
        sourceUrl: SOURCE_URL,
        attempts: attempt,
        failureStage: null,
      };
    } catch (error) {
      const sourceError = error.failureStage ? error : createSourceError(error.message || '理杏仁请求失败', {
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
