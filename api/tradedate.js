import {marketService,marketHeaders} from '../lib/marketSource.js';
export default async function handler(req,res) {
  try {const {date,source,dataMode,stale}=await marketService.getIndexHistory(); marketHeaders(res); return res.json({date,source,dataMode,stale});}
  catch(error){return res.status(503).json({error:error.message,service:'tradedate'});}
}
