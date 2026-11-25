import assert from 'node:assert/strict';
import test from 'node:test';
import fs from 'node:fs';
import vm from 'node:vm';
import dividend from '../data/dividendSnapshot.js';
const html=fs.readFileSync(new URL('../index.html',import.meta.url),'utf8');
const script=[...html.matchAll(/<script\b[^>]*>([\s\S]*?)<\/script>/g)].at(-1)[1].replace('bindIndexInfoPopover();\nbindMobileTabs();\ninit();','');
function dashboard(overrides={}) {
  const elements=new Map(), storage=new Map();
  const element=id=>{if(!elements.has(id))elements.set(id,{textContent:'',innerHTML:'',style:{},dataset:{tooltipBound:'1'},classList:{add(){},remove(){},toggle(){}},removeAttribute(){},appendChild(){},addEventListener(){}});return elements.get(id);};
  const context=vm.createContext({console,Date,AbortSignal,setTimeout,clearTimeout,
    document:{getElementById:element,querySelectorAll:()=>[],createElement:()=>element(Symbol()),addEventListener(){},head:{appendChild(){}}},
    localStorage:{getItem:key=>storage.get(key)||null,setItem:(key,v)=>storage.set(key,v),removeItem:key=>storage.delete(key)},
    fetch:async path=>{
      if(overrides[path])return new Response(JSON.stringify({error:overrides[path]}),{status:503});
      if(path==='/api/dividend')return Response.json({...dividend,dataMode:'snapshot',stale:false});
      if(path==='/api/bond')return Response.json({date:'2026-11-24',yieldPct:1.5853,source:'eastmoney-datacenter',dataMode:'daily'});
      if(path==='/api/index')return Response.json({date:'2026-11-24',current:13000,changePct:0.5,source:'csindex',dataMode:'daily'});
      return new Response(JSON.stringify({error:'history offline'}),{status:503});
    },
  });
  vm.runInContext(script,context);
  return {context,element,storage};
}
test('bond failure does not hide the good dividend and does not persist a fabricated spread',async()=>{
  const ui=dashboard({'/api/bond':'bond offline'});
  const result=await vm.runInContext('fetchAllData()',ui.context);
  assert.equal(ui.element('dividendDisplay').textContent,dividend.yieldPct.toFixed(2)+'%');
  assert.equal(ui.element('bondDisplay').textContent,'--');assert.equal(ui.element('spreadValue').textContent,'--');
  assert.equal(result.lastRecord.spread,null);assert.equal(result.records.length,0);
  assert.match(ui.element('dataHealth').textContent,/国债利率暂不可用/);
  assert.equal(ui.element('ma120CurrentPoint').textContent,'13,000.00');
});
test('index and MA failures no longer block the valuation module or its valid history',async()=>{
  const ui=dashboard({'/api/index':'index offline'});
  const result=await vm.runInContext('fetchAllData()',ui.context);
  assert.equal(ui.element('dividendDisplay').textContent,dividend.yieldPct.toFixed(2)+'%');
  assert.equal(ui.element('spreadValue').textContent,(Math.round((dividend.yieldPct-1.5853)*100)/100).toFixed(2)+'%');assert.equal(result.records.length,1);
  assert.equal(result.lastRecord.indexPoint,null);assert.equal(result.lastRecord.bondDate,'2026-11-24');
  assert.match(ui.element('dataHealth').textContent,/指数行情暂不可用/);
});
test('missing dividend still displays bond and index, but produces no signal',async()=>{
  const ui=dashboard({'/api/dividend':'TTM offline'});
  const result=await vm.runInContext('fetchAllData()',ui.context);
  assert.equal(ui.element('bondDisplay').textContent,'1.59%');assert.equal(ui.element('dividendDisplay').textContent,'--');
  assert.equal(result.lastRecord.spread,null);assert.equal(result.records.length,0);
});
test('percentage-point values are never guessed from their magnitude',()=>{
  const ui=dashboard();assert.equal(vm.runInContext('normalizeIndexChangePct(0.5)',ui.context),0.5);
});
