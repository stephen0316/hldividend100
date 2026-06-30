import DIVIDEND_SNAPSHOT from '../data/dividendSnapshot.js';
import { fetchDividendSnapshotFromSource } from '../lib/dividendSource.js';

const SNAPSHOT_STALE_HOURS = 48;

function decorateSnapshot(snapshot) {
  const capturedAtMs = snapshot.capturedAt ? Date.parse(snapshot.capturedAt) : NaN;
  const ageHours = Number.isFinite(capturedAtMs)
    ? Math.round(((Date.now() - capturedAtMs) / 3600000) * 10) / 10
    : null;

  return {
    ...snapshot,
    dataMode: 'snapshot',
    snapshot: true,
    stale: ageHours == null ? true : ageHours > SNAPSHOT_STALE_HOURS,
    ageHours,
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
