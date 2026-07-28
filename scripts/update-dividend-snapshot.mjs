import { writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';
import { fetchDividendSnapshotFromSource, SOURCE_URL } from '../lib/dividendSource.js';
import previousSnapshot from '../data/dividendSnapshot.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const snapshotPath = resolve(__dirname, '../data/dividendSnapshot.js');

function buildModuleSource(snapshot) {
  return `import { SOURCE_URL } from '../lib/dividendSource.js';

export const DIVIDEND_SNAPSHOT = ${JSON.stringify(snapshot, null, 2).replace(
    new RegExp(`"${SOURCE_URL.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}"`, 'g'),
    'SOURCE_URL'
  )};

export default DIVIDEND_SNAPSHOT;
`;
}

async function main() {
  const attemptedAt = new Date().toISOString();
  try {
    const payload = await fetchDividendSnapshotFromSource();
    const snapshot = {
      date: payload.date,
      yieldPct: Math.round(Number(payload.yieldPct) * 100) / 100,
      source: 'lixinger',
      metricType: payload.metricType || '市值加权',
      sourceUrl: SOURCE_URL,
      capturedAt: attemptedAt,
      lastAttemptAt: attemptedAt,
      lastAttemptStatus: 'ok',
      lastError: null,
      failureCount: 0,
      captureMethod: 'scheduled-fetch',
      parseMethod: payload.parseMethod || 'unknown',
      dataMode: 'snapshot',
      status: 'ok',
    };

    await writeFile(snapshotPath, buildModuleSource(snapshot), 'utf8');
    console.log(`snapshot updated: ${snapshot.date} ${snapshot.yieldPct}% (${snapshot.parseMethod}, ${payload.attempts} attempt${payload.attempts === 1 ? '' : 's'})`);
  } catch (error) {
    const snapshot = {
      ...previousSnapshot,
      lastAttemptAt: attemptedAt,
      lastAttemptStatus: 'failed',
      lastError: error.message || '理杏仁抓取失败',
      lastFailureStage: error.failureStage || 'request',
      failureCount: Number(previousSnapshot.failureCount || 0) + 1,
      status: 'stale',
    };
    await writeFile(snapshotPath, buildModuleSource(snapshot), 'utf8');
    throw error;
  }
}

main().catch((error) => {
  console.error('snapshot update failed:', error.message || error);
  if (error.failureStage) {
    console.error('failure stage:', error.failureStage);
  }
  if (error.status) {
    console.error('HTTP status:', error.status);
  }
  if (error.attempts) {
    console.error('attempts:', error.attempts);
  }
  process.exit(1);
});
