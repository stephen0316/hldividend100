import { SOURCE_URL } from '../lib/dividendSource.js';

export const DIVIDEND_SNAPSHOT = {
  "date": "2026-08-17",
  "yieldPct": 4.52,
  "source": "lixinger",
  "metricType": "市值加权",
  "sourceUrl": SOURCE_URL,
  "capturedAt": "2026-08-17T13:25:26.294Z",
  "lastAttemptAt": "2026-08-18T13:28:24.159Z",
  "lastAttemptStatus": "failed",
  "lastError": "理杏仁请求失败: HTTP 403",
  "failureCount": 2,
  "captureMethod": "scheduled-fetch",
  "parseMethod": "scoped-text",
  "dataMode": "snapshot",
  "status": "stale",
  "lastFailureStage": "http"
};

export default DIVIDEND_SNAPSHOT;
