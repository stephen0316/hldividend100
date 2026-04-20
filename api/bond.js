/**
 * GET /api/bond
 * 代理：十年期国债收益率（东方财富）
 * secid=171.CN10Y, 日K线
 */
export default async function handler(req, res) {
  try {
    const url = 'https://push2his.eastmoney.com/api/qt/stock/kline/get?' +
      'secid=171.CN10Y&fields1=f1,f2,f3&fields2=f51,f52,f53,f54,f55' +
      '&klt=101&fqt=1&beg=20200101&end=20991231&lmt=10';

    const response = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0',
        'Referer': 'https://www.eastmoney.com/',
      },
    });

    if (!response.ok) {
      return res.status(502).json({ error: '东方财富请求失败', status: response.status });
    }

    const data = await response.json();

    if (!data.data || !data.data.klines || data.data.klines.length === 0) {
      return res.status(404).json({ error: '国债收益率数据为空' });
    }

    const kline = data.data.klines[data.data.klines.length - 1];
    const parts = kline.split(',');

    res.json({
      date: parts[0],
      yieldPct: parseFloat(parts[2]),
    });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
}
