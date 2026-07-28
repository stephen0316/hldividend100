import DIVIDEND_SNAPSHOT from '../data/dividendSnapshot.js';
import { fetchDividendSnapshotFromSource } from '../lib/dividendSource.js';

const SNAPSHOT_STALE_HOURS = 48;
const SOURCE_STALE_DAYS = 3;

function dateAgeDays(date) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(String(date || ''))) return null;
  const sourceDay = Date.parse(`${date}T00:00:00Z`);
  const today = new Date();
  const todayDay = Date.UTC(today.getUTCFullYear(), today.getUTCMonth(), today.getUTCDate());
  return Math.floor((todayDay - sourceDay) / 86_400_000);
}

function decorateSnapshot(snapshot) {
  const capturedAtMs = snapshot.capturedAt ? Date.parse(snapshot.capturedAt) : NaN;
  const ageHours = Number.isFinite(capturedAtMs)
    ? Math.round(((Date.now() - capturedAtMs) / 3600000) * 10) / 10
    : null;
  const sourceAgeDays = dateAgeDays(snapshot.date);
  const staleReasons = [
    ageHours == null || ageHours > SNAPSHOT_STALE_HOURS ? 'capture-age' : null,
    sourceAgeDays == null || sourceAgeDays > SOURCE_STALE_DAYS ? 'source-age' : null,
    snapshot.lastAttemptStatus === 'failed' ? 'last-attempt-failed' : null,
  ].filter(Boolean);

  return {
    ...snapshot,
    dataMode: 'snapshot',
    snapshot: true,
    stale: staleReasons.length > 0,
    staleReasons,
    ageHours,
    sourceAgeDays,
  };
}

export default async function handler(req, res) {
  const live = req?.query?.live === '1' || (() => {
    try {
      const url = new URL(req.url, 'http://localhost');
      return url.searchParams.get('live') === '1';
    } catch {
      return false;
    }
  })();

  if (live) {
    try {
      const payload = await fetchDividendSnapshotFromSource();
      return res.json({
        ...payload,
        dataMode: 'live-debug',
        snapshot: false,
        stale: false,
        ageHours: 0,
      });
    } catch (error) {
      return res.status(502).json({
        error: error.message || '理杏仁实时抓取失败',
        failureStage: error.failureStage || 'request',
      });
    }
  }

  res.setHeader('Cache-Control', 'public, max-age=300, s-maxage=1800, stale-while-revalidate=86400');
  return res.json(decorateSnapshot(DIVIDEND_SNAPSHOT));
}
