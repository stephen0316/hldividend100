/**
 * GET /api/tradedate
 * 代理：获取最近交易日日期（东方财富）
 * secid=2.930955，日K，取最新一条
 */
export default async function handler(req, res) {
  try {
    const url = 'https://push2his.eastmoney.com/api/qt/stock/kline/get?' +
      'secid=2.930955&fields1=f1,f2,f3&fields2=f51,f52,f53,f54,f55' +
      '&klt=101&fqt=1&lmt=3';

    const response = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0',
        'Referer': 'https://www.eastmoney.com/',
      },
    });

    if (!response.ok) {
      // 失败时降级返回当天日期
      return res.json({ date: new Date().toISOString().slice(0, 10) });
    }

    const data = await response.json();

    if (!data.data || !data.data.klines || data.data.klines.length === 0) {
      return res.json({ date: new Date().toISOString().slice(0, 10) });
    }

    const latest = data.data.klines[data.data.klines.length - 1];
    res.json({ date: latest.split(',')[0] });
  } catch (e) {
    res.json({ date: new Date().toISOString().slice(0, 10) });
  }
}
