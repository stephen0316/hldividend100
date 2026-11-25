import {writeFile} from 'node:fs/promises';
import {createMarketService} from '../lib/marketSource.js';
import previous from '../data/marketSnapshot.js';
const service=createMarketService({snapshot:previous,timeoutMs:15000});
const results=await Promise.allSettled([service.getIndexHistory(),service.getBond()]);
const snapshot={...previous};
let failed=false;
for(const [i,key] of ['index','bond'].entries()) {
  const result=results[i];
  if(result.status==='fulfilled' && result.value.dataMode!=='snapshot') {
    const {dataMode,stale,sourceAgeDays,fallbackReason,...value}=result.value;
    snapshot[key]=value;
    console.log(`${key}: ${value.date} (${value.source})`);
  }else{
    failed=true;
    console.error(`${key}: refresh failed; preserving previous snapshot`,result.reason?.message||result.value?.fallbackReason);
  }
}
await writeFile(new URL('../data/marketSnapshot.js',import.meta.url),`// Validated market fallback; never relabelled as realtime.\nexport default ${JSON.stringify(snapshot)};\n`);
if(failed)process.exitCode=1;
