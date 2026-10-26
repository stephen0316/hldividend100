import { SOURCE_URL } from '../lib/dividendSource.js';

export const DIVIDEND_SNAPSHOT = {
  "date": "2026-08-19",
  "yieldPct": 4.37,
  "source": "lixinger",
  "metricType": "市值加权",
  "sourceUrl": SOURCE_URL,
  "capturedAt": "2026-08-19T15:43:57.992Z",
  "lastAttemptAt": "2026-10-26T18:51:07.158Z",
  "lastAttemptStatus": "failed",
  "lastError": "理杏仁请求失败: HTTP 403",
  "failureCount": 94,
  "captureMethod": "scheduled-fetch",
  "parseMethod": "scoped-text",
  "dataMode": "snapshot",
  "status": "stale",
  "lastFailureStage": "http"
};

export default DIVIDEND_SNAPSHOT;
