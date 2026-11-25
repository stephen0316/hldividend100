import storedSnapshot from '../data/marketSnapshot.js';

const DAY = 86_400_000;
export const CSI_URL = 'https://www.csindex.com.cn/csindex-home/perf/index-perf';
export const BOND_URL = 'https://datacenter-web.eastmoney.com/api/data/v1/get';
const today = now => new Date(new Date(now).getTime() + 8 * 3_600_000).toISOString().slice(0, 10);
const numeric = value => typeof value === 'number' && Number.isFinite(value);
export function validDate(value, now = new Date()) {
  return typeof value === 'string' && /^\d{4}-\d{2}-\d{2}$/.test(value) &&
    Number.isFinite(Date.parse(value)) && new Date(`${value}T00:00:00Z`).toISOString().slice(0,10) === value && value <= today(now);
}
export function parseCsiHistory(payload, now = new Date()) {
  if (String(payload?.code) !== '200' || !Array.isArray(payload.data)) throw new Error('中证行情响应无效');
  const rows = payload.data.map(raw => {
    const date = String(raw.tradeDate).replace(/^(\d{4})(\d{2})(\d{2})$/, '$1-$2-$3');
    if (raw.indexCode !== '930955' || !validDate(date, now) ||
        !['open','high','low','close'].every(k => numeric(raw[k]) && raw[k] > 0) ||
        raw.low > Math.min(raw.open,raw.close) || raw.high < Math.max(raw.open,raw.close)) throw new Error('指数代码、日期或价格无效');
    return {date,open:raw.open,close:raw.close,high:raw.high,low:raw.low};
  }).sort((a,b)=>a.date.localeCompare(b.date));
  if (rows.length < 120 || new Set(rows.map(r=>r.date)).size !== rows.length) throw new Error('指数历史不足120日或日期重复');
  return rows;
}
export function parseBond(payload, now = new Date()) {
  if (!payload?.success || !Array.isArray(payload.result?.data)) throw new Error('国债数据中心响应无效');
  const rows = payload.result.data.filter(r=>r.EMM00166466 != null).map(r=>({date:String(r.SOLAR_DATE).slice(0,10),yieldPct:r.EMM00166466})).sort((a,b)=>b.date.localeCompare(a.date));
  const last = rows[0];
  if (!last || !validDate(last.date,now) || !numeric(last.yieldPct) || last.yieldPct <= 0 || last.yieldPct > 20) throw new Error('十年期国债收益率或日期无效');
  return last;
}
function parseEastmoney(payload, now) {
  if (payload?.data?.code !== '930955') throw new Error('指数代码不匹配');
  return parseCsiHistory({code:'200',data:(payload.data.klines || []).map(line=>{
    const [date,open,close,high,low]=line.split(',');
    return {indexCode:'930955',tradeDate:date.replaceAll('-',''),open:Number(open),close:Number(close),high:Number(high),low:Number(low)};
  })},now);
}
export function createMarketService({fetchImpl=(...args)=>fetch(...args), snapshot=storedSnapshot, now=()=>new Date(), timeoutMs=4000}={}) {
  const cache=new Map(), pending=new Map();
  async function json(url) {
    const r=await fetchImpl(url,{signal:AbortSignal.timeout(timeoutMs),headers:{'User-Agent':'Mozilla/5.0',Referer:'https://www.csindex.com.cn/'}});
    if(!r.ok)throw new Error(`HTTP ${r.status}`);
    return await r.json();
  }
  function decorate(value,mode,errors=[]) {
    const sourceAgeDays=Math.floor((Date.parse(today(now()))-Date.parse(value.date))/DAY);
    return {...value,dataMode:mode,stale:mode==='snapshot'||sourceAgeDays>3,sourceAgeDays,fallbackReason:errors.join('；')||null};
  }
  async function resolve(key,loaders) {
    const cached=cache.get(key);
    if(cached && now().getTime()-cached.ts<300_000)return decorate(cached.value,'daily');
    if(pending.has(key))return pending.get(key);
    const job=(async()=>{
      const errors=[];
      for(const load of loaders)try{
        const value=await load();
        if(snapshot[key]?.date && value.date<snapshot[key].date)throw new Error('源数据日期倒退');
        cache.set(key,{value,ts:now().getTime()});
        return decorate(value,'daily',errors);
      }catch(e){errors.push(e.message);}
      const fallback=cached?.value||snapshot[key];
      if(!fallback||!validDate(fallback.date,now())||(key==='bond'?!numeric(fallback.yieldPct):!Array.isArray(fallback.rows)||fallback.rows.length<120))throw new Error(`${key==='bond'?'国债':'指数'}来源暂不可用且没有有效快照：${errors.join('；')}`);
      return decorate(fallback,'snapshot',errors);
    })();
    pending.set(key,job);
    try{return await job;}finally{pending.delete(key);}
  }
  return {
    getIndexHistory:()=>resolve('index',[
      async()=>{
        const end=today(now()).replaceAll('-',''), start=new Date(now().getTime()-760*DAY).toISOString().slice(0,10).replaceAll('-','');
        const rows=parseCsiHistory(await json(`${CSI_URL}?indexCode=930955&startDate=${start}&endDate=${end}`),now());
        return {date:rows.at(-1).date,rows,source:'csindex',sourceUrl:CSI_URL,capturedAt:now().toISOString()};
      },
      async()=>{
        const url='https://push2his.eastmoney.com/api/qt/stock/kline/get?secid=2.930955&fields1=f1,f2,f3&fields2=f51,f52,f53,f54,f55&klt=101&fqt=0&lmt=550';
        const rows=parseEastmoney(await json(url),now());
        return {date:rows.at(-1).date,rows,source:'eastmoney-kline',sourceUrl:url,capturedAt:now().toISOString()};
      },
    ]),
    getBond:()=>resolve('bond',[
      async()=>{
        const url=`${BOND_URL}?reportName=RPTA_WEB_TREASURYYIELD&columns=ALL&sortColumns=SOLAR_DATE&sortTypes=-1&pageSize=10&pageNumber=1&source=WEB&client=WEB`;
        return {...parseBond(await json(url),now()),source:'eastmoney-datacenter',sourceUrl:url,capturedAt:now().toISOString()};
      },
      async()=>{
        const url='https://push2his.eastmoney.com/api/qt/stock/kline/get?secid=171.CN10Y&fields1=f1,f2,f3&fields2=f51,f52,f53,f54,f55&klt=101&fqt=0&lmt=10';
        const raw=await json(url);
        if(raw?.data?.code!=='CN10Y')throw new Error('国债代码不匹配');
        const rows=(raw.data.klines||[]).map(line=>{const p=line.split(',');return {SOLAR_DATE:p[0],EMM00166466:Number(p[2])};});
        return {...parseBond({success:true,result:{data:rows}},now()),source:'eastmoney-kline',sourceUrl:url,capturedAt:now().toISOString()};
      },
    ]),
  };
}
export function indexQuote(history) {
  const last=history.rows.at(-1), prev=history.rows.at(-2);
  return {...last,current:last.close,prevClose:prev.close,changePct:(last.close/prev.close-1)*100,name:'红利低波100',
    source:history.source,sourceUrl:history.sourceUrl,capturedAt:history.capturedAt,dataMode:history.dataMode,stale:history.stale,fallbackReason:history.fallbackReason};
}
export const marketService=createMarketService();
export function marketHeaders(res) {
  res.setHeader('Cache-Control','public, max-age=60, s-maxage=300, stale-while-revalidate=3600');
}
