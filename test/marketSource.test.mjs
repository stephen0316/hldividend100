import assert from 'node:assert/strict';
import test from 'node:test';
import {createMarketService,parseCsiHistory,parseBond,indexQuote,validDate} from '../lib/marketSource.js';
import saved from '../data/marketSnapshot.js';
const now=()=>new Date(Date.parse(`${saved.index.date}T06:00:00Z`)+86_400_000);
function csi() {
  return {code:'200',data:Array.from({length:130},(_,i)=>({indexCode:'930955',tradeDate:new Date(Date.UTC(2026,0,1+i)).toISOString().slice(0,10).replaceAll('-',''),open:100+i,close:101+i,high:102+i,low:99+i}))};
}
test('CSI parser validates code, OHLC, history length, dates and duplicate days',()=>{
  const data=csi(); assert.equal(parseCsiHistory(data,now()).length,130);
  for(const mutate of [d=>d.data.pop()&&d.data.splice(0,20), d=>d.data[0].indexCode='000300',d=>d.data[0].close=null,d=>d.data[0].close='100',d=>d.data[0].low=999,d=>d.data[0].tradeDate='20270230',d=>d.data.push(d.data[0])]) {
    const changed=structuredClone(data);mutate(changed);assert.throws(()=>parseCsiHistory(changed,new Date('2026-11-25T06:00:00Z')));
  }
  assert.equal(validDate('2026-02-30',now()),false);
});
test('bond parser selects China TEN-year field, never 2Y/5Y/US or a null-to-zero value',()=>{
  const raw={success:true,result:{data:[{SOLAR_DATE:'2026-11-24 00:00:00',EMM00166466:1.5853,EMM00588704:1.23,EMM00166462:1.32,EMG00001310:4.91}]}};
  assert.equal(parseBond(raw,now()).yieldPct,1.5853);
  for(const value of [null,0,'1.58',NaN,25]) {const data=structuredClone(raw);data.result.data[0].EMM00166466=value;assert.throws(()=>parseBond(data,now()));}
});
test('upstream outage falls back to durable server snapshot with actual date and stale flags',async()=>{
  const service=createMarketService({now,fetchImpl:async()=>{throw Error('offline');}});
  const bond=await service.getBond(), history=await service.getIndexHistory();
  assert.equal(bond.date,saved.bond.date);assert.equal(bond.dataMode,'snapshot');assert.equal(bond.stale,true);
  assert.match(bond.fallbackReason,/offline/);assert.equal(history.rows.length,saved.index.rows.length);
  const quote=indexQuote(history);assert.equal(quote.current,saved.index.rows.at(-1).close);assert.equal(quote.dataMode,'snapshot');
});
test('empty snapshots fail explicitly, rather than fabricate a trading date or yield',async()=>{
  const service=createMarketService({now,snapshot:{},fetchImpl:async()=>new Response('no',{status:503})});
  await assert.rejects(service.getBond(),/没有有效快照/);await assert.rejects(service.getIndexHistory(),/没有有效快照/);
});
test('primary live daily data is cached and parallel callers share a single request',async()=>{
  let calls=0;
  const service=createMarketService({now,snapshot:{},fetchImpl:async()=>{calls++;return Response.json({success:true,result:{data:[{SOLAR_DATE:'2026-11-24',EMM00166466:1.58}]}});}});
  const [a,b]=await Promise.all([service.getBond(),service.getBond()]);
  assert.equal(calls,1);assert.equal(typeof a.stale,'boolean');assert.equal(b.dataMode,'daily');await service.getBond();assert.equal(calls,1);
});
test('stale daily data and source date regressions are not presented as current',async()=>{
  const service=createMarketService({now,fetchImpl:async()=>Response.json({success:true,result:{data:[{SOLAR_DATE:'2026-01-01',EMM00166466:1.5}]}})});
  const bond=await service.getBond();assert.equal(bond.date,saved.bond.date);assert.equal(bond.stale,true);assert.match(bond.fallbackReason,/倒退/);
});
test('timeout during response body reading also falls back to snapshot',async()=>{
  const service=createMarketService({now,timeoutMs:5,fetchImpl:async(url,opts)=>({ok:true,json:()=>new Promise((resolve,reject)=>{opts.signal.addEventListener('abort',()=>reject(Error('body timeout')));setTimeout(resolve,15);})})});
  const result=await service.getBond();assert.equal(result.stale,true);assert.match(result.fallbackReason,/timeout/);
});
