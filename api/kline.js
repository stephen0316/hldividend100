/**
 * GET /api/kline?secid=2.930955&beg=20230101&end=20260415
 * 代理：任意股票/指数的日K线数据（东方财富）
 * 用于 MA120 计算
 */
export default async function handler(req, res) {
  const { secid = '2.930955', beg, end } = req.query;

  if (!beg || !end) {
    return res.status(400).json({ error: '缺少 beg 或 end 参数' });
  }

  try {
    const url = 'https://push2his.eastmoney.com/api/qt/stock/kline/get?' +
      `secid=${secid}&fields1=f1,f2,f3&fields2=f51,f52,f53,f54,f55` +
      `&klt=101&fqt=0&beg=${beg}&end=${end}`;

    const response = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0',
        'Referer': 'https://www.eastmoney.com/',
      },
    });

    if (!response.ok) {
      return res.status(502).json({ error: '东方财富请求失败' });
    }

    const data = await response.json();
    res.json(data);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
}
