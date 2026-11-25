import assert from 'node:assert/strict';
import test from 'node:test';
import XLSX from 'xlsx';
import { calculateTtm, parseMembers, windowStart, fetchDividendSnapshotFromSource, SOURCE_URL } from '../lib/dividendTtmSource.js';

function inputs() {
  const codes = Array.from({length:100}, (_,i)=>String(i+1).padStart(6,'0'));
  return { date:'2026-11-24', codes,
    valuations: codes.map(code=>({SECURITY_CODE:code,TRADE_DATE:'2026-11-24',TOTAL_SHARES:100,TOTAL_MARKET_CAP:1000,CLOSE_PRICE:10})),
    dividends: codes.map(code=>({SECURITY_CODE:code,REPORT_DATE:'2025-12-31',EX_DIVIDEND_DATE:'2026-07-01',NOTICE_DATE:'2026-06-28',ASSIGN_PROGRESS:'实施分配',PRETAX_BONUS_RMB:4,BONUS_IT_RATIO:null})) };
}
function membersFile(codes) {
  const book = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(book,XLSX.utils.aoa_to_sheet([
    ['日期Date','指数代码 Index Code','成份券代码Constituent Code'],
    ...codes.map(code=>['20261124','930955',code])
  ]),'members');
  return XLSX.write(book,{type:'buffer',bookType:'biff8'});
}
test('TTM uses tax-before cash per TEN shares, full market caps and all 100 constituents',()=>{
  const result=calculateTtm(inputs());
  assert.equal(result.yieldPct,4);
  assert.equal(result.calculation.coveredConstituents,100);
  assert.equal(result.calculation.cashEquivalentTtm,4000);
  assert.equal(result.calculation.totalMarketCap,100000);
});
test('ex-date window excludes start and future, includes end, excludes unimplemented proposals',()=>{
  const data=inputs(), original=data.dividends[0];
  data.dividends.push(
    {...original,EX_DIVIDEND_DATE:'2025-11-24',REPORT_DATE:'2024-06-30',PRETAX_BONUS_RMB:100},
    {...original,EX_DIVIDEND_DATE:'2026-11-25',REPORT_DATE:'2026-06-30',PRETAX_BONUS_RMB:100},
    {...original,EX_DIVIDEND_DATE:'2026-09-01',ASSIGN_PROGRESS:'预披露',PRETAX_BONUS_RMB:100},
    {...original,EX_DIVIDEND_DATE:'2026-11-24',REPORT_DATE:'2026-06-30',PRETAX_BONUS_RMB:2}
  );
  assert.ok(Math.abs(calculateTtm(data).yieldPct-4.02)<1e-9);
  assert.equal(windowStart('2024-02-29'),'2023-02-28');
});
test('same-day split and earlier dividends are both adjusted to current share basis',()=>{
  const data=inputs();
  Object.assign(data.valuations[0],{TOTAL_SHARES:200,TOTAL_MARKET_CAP:2000});
  Object.assign(data.dividends[0],{PRETAX_BONUS_RMB:10,BONUS_IT_RATIO:10});
  data.dividends.push({...data.dividends[0],REPORT_DATE:'2024-12-31',EX_DIVIDEND_DATE:'2026-01-01',PRETAX_BONUS_RMB:2,BONUS_IT_RATIO:0});
  const result=calculateTtm(data);
  assert.equal(result.components[0].adjustedDpsTtm,0.6);
  assert.equal(result.components[0].cashEquivalentTtm,120);
});
test('no dividend in the window is zero; absent history is missing data',()=>{
  const data=inputs();
  data.dividends[0].EX_DIVIDEND_DATE='2024-07-01';
  assert.equal(calculateTtm(data).components[0].cashEquivalentTtm,0);
  data.dividends.shift();
  assert.throws(()=>calculateTtm(data),/缺少/);
});
test('only old implementation notices can excuse missing historical ex-dates',()=>{
  const data=inputs();
  data.dividends.push({...data.dividends[0],EX_DIVIDEND_DATE:null,NOTICE_DATE:'2020-07-01',REPORT_DATE:'2019-12-31'});
  assert.equal(calculateTtm(data).yieldPct,4);
  data.dividends.at(-1).NOTICE_DATE='2026-07-01';
  assert.throws(()=>calculateTtm(data),/缺少除息日/);
});
test('missing declared cash is not treated as a zero dividend',()=>{
  const data=inputs();
  Object.assign(data.dividends[0],{PRETAX_BONUS_RMB:null,IMPL_PLAN_PROFILE:'10派4元(含税)'});
  assert.throws(()=>calculateTtm(data),/金额缺失/);
});
test('rejects partial, duplicate, stale-date, bad-unit and unknown cash inputs',()=>{
  for(const mutate of [
    d=>d.valuations.pop(), d=>d.valuations[0]=d.valuations[1],
    d=>d.valuations[0].TRADE_DATE='2026-11-23', d=>d.valuations[0].TOTAL_MARKET_CAP=null,
    d=>d.valuations[0].TOTAL_MARKET_CAP=10000, d=>d.dividends.push({...d.dividends[0]}),
    d=>d.dividends[0].PRETAX_BONUS_RMB='4'
  ]){const data=inputs();mutate(data);assert.throws(()=>calculateTtm(data));}
});
test('validates official membership date and all 100 codes',()=>{
  const {codes}=inputs();
  assert.equal(parseMembers(membersFile(codes),{today:'2026-11-25'}).codes.length,100);
  assert.throws(()=>parseMembers(membersFile(codes.slice(1))),/不足100/);
  assert.throws(()=>parseMembers(membersFile(codes),{today:'2026-11-23'}),/未来/);
  assert.throws(()=>parseMembers(Buffer.from('<html>blocked</html>')),/XLS/);
});
test('free endpoint integration retries transient failure then returns a fully covered TTM payload',async()=>{
  const data=inputs(), delays=[];
  let calls=0;
  const payload=await fetchDividendSnapshotFromSource({
    sleepImpl:async ms=>delays.push(ms),
    fetchImpl:async url=>{
      if(++calls===1)return new Response('',{status:429,headers:{'retry-after':'0'}});
      if(url===SOURCE_URL)return new Response(membersFile(data.codes));
      const q=new URL(url).searchParams, group=[...q.get('filter').matchAll(/"(\d{6})"/g)].map(m=>m[1]);
      const rows=(q.get('reportName')==='RPT_SHAREBONUS_DET'?data.dividends:data.valuations).filter(r=>group.includes(r.SECURITY_CODE));
      return Response.json({success:true,result:{pages:1,count:rows.length,data:rows}});
    }
  });
  assert.equal(payload.yieldPct,4);
  assert.equal(payload.source,'computed-ttm');
  assert.equal(payload.period,'ttm');
  assert.equal(payload.weighting,'total-shares');
  assert.deepEqual(delays,[0]);
});
