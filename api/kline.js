import {marketService,marketHeaders} from '../lib/marketSource.js';
export default async function handler(req,res) {
  const {secid='2.930955',beg,end}=req.query||{};
  if(secid!=='2.930955'||!/^\d{8}$/.test(beg||'')||!/^\d{8}$/.test(end||'')||beg>end) return res.status(400).json({error:'仅支持红利低波100及有效的 beg/end 日期区间'});
  try {
    const {rows,...metadata}=await marketService.getIndexHistory();
    const selected=rows.filter(r=>r.date.replaceAll('-','')>=beg&&r.date.replaceAll('-','')<=end);
    marketHeaders(res);
    return res.json({...metadata,data:{code:'930955',klines:selected.map(r=>[r.date,r.open,r.close,r.high,r.low].join(','))}});
  }catch(error){return res.status(503).json({error:error.message,service:'kline'});}
}
