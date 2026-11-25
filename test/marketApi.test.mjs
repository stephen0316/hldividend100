import test from 'node:test';
import assert from 'node:assert/strict';
import bond from '../api/bond.js';
import index from '../api/index.js';
import kline from '../api/kline.js';
import tradedate from '../api/tradedate.js';
import snapshot from '../data/marketSnapshot.js';
const response=()=>({statusCode:200,headers:{},setHeader(k,v){this.headers[k]=v;},status(code){this.statusCode=code;return this;},json(data){this.payload=data;return this;}});
test('all market routes still work from a cold start when every upstream is offline',async()=>{
  const previous=globalThis.fetch;
  globalThis.fetch=async()=>{throw Error('simulated upstream outage');};
  try {
    for(const [handler,query] of [[bond,{}],[index,{}],[tradedate,{}],[kline,{beg:'20200101',end:'20991231'}]]) {
      const res=response();await handler({query},res);
      assert.equal(res.statusCode,200);assert.equal(res.payload.stale,true);assert.equal(res.payload.dataMode,'snapshot');
      assert.match(res.headers['Cache-Control'],/s-maxage=300/);
    }
    const res=response();await tradedate({query:{}},res);assert.equal(res.payload.date,snapshot.index.date);
    const invalid=response();await kline({query:{secid:'1.000001',beg:'20200101',end:'20991231'}},invalid);assert.equal(invalid.statusCode,400);
  } finally {globalThis.fetch=previous;}
});
