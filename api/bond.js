import {marketService,marketHeaders} from '../lib/marketSource.js';
export default async function handler(req,res) {
  try { const payload=await marketService.getBond(); marketHeaders(res); return res.json(payload); }
  catch(error) { return res.status(503).json({error:error.message,service:'bond'}); }
}
