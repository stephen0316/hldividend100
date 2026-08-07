import { SOURCE_URL } from '../lib/dividendSource.js';

export const DIVIDEND_SNAPSHOT = {
  "date": "2026-08-05",
  "yieldPct": 4.5,
  "source": "lixinger",
  "metricType": "市值加权",
  "sourceUrl": SOURCE_URL,
  "capturedAt": "2026-08-05T16:50:28.035Z",
  "lastAttemptAt": "2026-08-07T16:06:54.027Z",
  "lastAttemptStatus": "failed",
  "lastError": "理杏仁请求失败: HTTP 403",
  "failureCount": 3,
  "captureMethod": "scheduled-fetch",
  "parseMethod": "scoped-text",
  "dataMode": "snapshot",
  "status": "stale",
  "lastFailureStage": "http"
};

export default DIVIDEND_SNAPSHOT;
