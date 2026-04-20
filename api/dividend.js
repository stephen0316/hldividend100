/**
 * GET /api/dividend
 * 代理：红利低波100（930955.CSI）最新股息率
 * 数据源：理杏仁指数估值页
 */

const SOURCE_URL = 'https://www.lixinger.com/equity/index/detail/csi/930955/930955/fundamental/valuation/dyr?metrics-type=mcw';
const LAST_VERIFIED_PAYLOAD = {
  date: '2026-04-17',
  yieldPct: 4.44,
  source: 'lixinger',
  metricType: '市值加权',
  sourceUrl: SOURCE_URL,
  fallback: true,
  fallbackReason: '理杏仁实时页面暂时不可用，使用最后校验值',
};

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

function parseDividendPayload(html) {
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

  if (!date || !Number.isFinite(yieldPct)) {
    throw new Error('未能从理杏仁页面解析出最新股息率');
  }

  return { date, yieldPct };
}

export default async function handler(req, res) {
  try {
    const response = await fetch(SOURCE_URL, {
      headers: {
        'User-Agent': 'Mozilla/5.0',
        'Referer': 'https://www.lixinger.com/',
        'Accept-Language': 'zh-CN,zh;q=0.9,en;q=0.8',
      },
    });

    if (!response.ok) {
      throw new Error('理杏仁请求失败: HTTP ' + response.status);
    }

    const html = await response.text();
    const payload = parseDividendPayload(html);

    res.json({
      ...payload,
      source: 'lixinger',
      metricType: '市值加权',
      sourceUrl: SOURCE_URL,
    });
  } catch (e) {
    res.setHeader('Cache-Control', 's-maxage=1800, stale-while-revalidate=86400');
    res.json({
      ...LAST_VERIFIED_PAYLOAD,
      error: e.message || '股息率获取失败',
    });
  }
}
