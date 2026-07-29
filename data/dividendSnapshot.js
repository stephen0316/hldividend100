import { SOURCE_URL } from '../lib/dividendSource.js';

export const DIVIDEND_SNAPSHOT = {
  "date": "2026-07-29",
  "yieldPct": 4.36,
  "source": "lixinger",
  "metricType": "市值加权",
  "sourceUrl": SOURCE_URL,
  "capturedAt": "2026-07-29T14:57:11.396Z",
  "lastAttemptAt": "2026-07-29T16:37:44.384Z",
  "lastAttemptStatus": "failed",
  "lastError": "理杏仁请求超时（15 秒）",
  "failureCount": 1,
  "captureMethod": "scheduled-fetch",
  "parseMethod": "scoped-text",
  "dataMode": "snapshot",
  "status": "stale",
  "lastFailureStage": "request"
};

export default DIVIDEND_SNAPSHOT;
