/**
 * GET /api/history?days=30
 * 代理：历史息差数据（国债 + 指数K线，合并返回）
 * 用于图表渲染
 */
export default async function handler(req, res) {
  const days = parseInt(req.query.days) || 30;
  const lmt = days + 5;

  try {
    // 并行拉取两条K线
    const bondUrl = 'https://push2his.eastmoney.com/api/qt/stock/kline/get?' +
      'secid=171.CN10Y&fields1=f1,f2,f3&fields2=f51,f52,f53,f54,f55' +
      '&klt=101&fqt=1&beg=20200101&end=20991231&lmt=' + lmt;

    const indexUrl = 'https://push2his.eastmoney.com/api/qt/stock/kline/get?' +
      'secid=2.930955&fields1=f1,f2,f3&fields2=f51,f52,f53,f54,f55' +
      '&klt=101&fqt=1&beg=20200101&end=20991231&lmt=' + lmt;

    const fetchOpts = {
      headers: {
        'User-Agent': 'Mozilla/5.0',
        'Referer': 'https://www.eastmoney.com/',
      },
    };

    const [bondRes, indexRes] = await Promise.all([
      fetch(bondUrl, fetchOpts),
      fetch(indexUrl, fetchOpts),
    ]);

    const bondData = await bondRes.json();
    const indexData = await indexRes.json();

    const bondKlines = bondData.data?.klines || [];
    const indexKlines = indexData.data?.klines || [];

    // 构建国债收益率映射（日期 -> 收益率）
    const bondMap = {};
    bondKlines.forEach(k => {
      const p = k.split(',');
      bondMap[p[0]] = parseFloat(p[2]);
    });

    // 用固定的每股分红总额（来自 localStorage 中配置的 totalDividendPerIndex）
    // 由于代理无法访问 localStorage，这里只返回原始 K 线数据，前端自行计算
    const results = [];
    indexKlines.forEach(k => {
      const p = k.split(',');
      const date = p[0];
      const bondYield = bondMap[date];
      if (bondYield == null) return;
      results.push({
        date,
        indexClose: parseFloat(p[2]),
        bondYield,
      });
    });

    res.json({ results: results.slice(-days) });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
}
