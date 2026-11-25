import assert from 'node:assert/strict';
import test from 'node:test';
import XLSX from 'xlsx';
import { fetchDividendSnapshotFromSource, parseDividendPayload, SOURCE_URL, METRIC_TYPE } from '../lib/dividendSource.js';

const HEADERS = ['日期Date', '指数代码Index Code', '股息率1（总股本）D/P1', '股息率2（计算用股本）D/P2'];
function file(rows = [['20261124', '930955', 4.42, 4.88]], headers = HEADERS) {
  const book = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(book, XLSX.utils.aoa_to_sheet([headers, ...rows]), 'indicator');
  return XLSX.write(book, { type: 'buffer', bookType: 'biff8' });
}
const parse = bytes => parseDividendPayload(bytes, { now: new Date('2026-11-25T01:00:00Z') });

test('reads DP1 using source date and selects newest row regardless of order', () => {
  assert.deepEqual(parse(file([
    ['20261123', '930955', 4.45, 4.85], ['20261124', '930955', 4.42, 4.88],
  ])), { date: '2026-11-24', yieldPct: 4.42, parseMethod: 'csindex-xls-dp1' });
});

test('maps reordered columns by label rather than position', () => {
  assert.equal(parse(file([[4.88, '930955', '20261124', 4.42]], [HEADERS[3], HEADERS[1], HEADERS[0], HEADERS[2]])).yieldPct, 4.42);
});

test('rejects HTML disguised as HTTP 200 and truncated XLS', () => {
  for (const bytes of [Buffer.from('<html>blocked</html>'), file().subarray(0, 12)]) {
    assert.throws(() => parse(bytes), error => error.failureStage === 'parse');
  }
});

test('never substitutes DP2 or a different index', () => {
  assert.throws(() => parse(file([['20261124', '930955', 4.88]], [HEADERS[0], HEADERS[1], HEADERS[3]])), /缺少/);
  assert.throws(() => parse(file([['20261124', '000300', 4.42, 4.88]])), /没有 930955/);
});

test('rejects missing or invalid yields, dates, and duplicate dates', () => {
  for (const value of [null, '', '4.42', 0, -1, 100]) {
    assert.throws(() => parse(file([['20261124', '930955', value, 4.88]])), /股息率1/);
  }
  for (const date of ['20260230', '20261126', 'not-a-date']) {
    assert.throws(() => parse(file([[date, '930955', 4.42, 4.88]])), /日期/);
  }
  assert.throws(() => parse(file([
    ['20261124', '930955', 4.42, 4.88], ['20261124', '930955', 4.42, 4.88],
  ])), /重复日期/);
});

test('retries rate limits, honours Retry-After, and returns correct provenance', async () => {
  let calls = 0;
  const delays = [];
  const payload = await fetchDividendSnapshotFromSource({
    fetchImpl: async url => {
      assert.equal(url, SOURCE_URL);
      calls++;
      return calls === 1 ? new Response('', { status: 429, headers: { 'retry-after': '0' } }) : new Response(file());
    },
    sleepImpl: async delay => delays.push(delay), onRetry: () => {},
  });
  assert.equal(calls, 2);
  assert.deepEqual(delays, [0]);
  assert.equal(payload.yieldPct, 4.42);
  assert.equal(payload.source, 'csindex');
  assert.equal(payload.metricType, METRIC_TYPE);
});

test('retries transient network failures', async () => {
  let calls = 0;
  const payload = await fetchDividendSnapshotFromSource({
    fetchImpl: async () => { if (++calls === 1) throw new TypeError('network unavailable'); return new Response(file()); },
    maxAttempts: 2, baseDelayMs: 0, sleepImpl: async () => {}, onRetry: () => {},
  });
  assert.equal(payload.attempts, 2);
});

test('does not retry schema errors or forbidden requests', async () => {
  for (const response of [new Response('blocked', { status: 403 }), new Response('<html>unexpected page</html>')]) {
    let calls = 0;
    await assert.rejects(fetchDividendSnapshotFromSource({
      fetchImpl: async () => { calls++; return response; }, sleepImpl: async () => {}, onRetry: () => {},
    }), error => error.attempts === 1 && ['parse', 'http'].includes(error.failureStage));
    assert.equal(calls, 1);
  }
});

test('timeout also covers response body download', async () => {
  await assert.rejects(fetchDividendSnapshotFromSource({
    fetchImpl: async (url, { signal }) => ({
      ok: true, headers: new Headers(),
      arrayBuffer: () => new Promise((resolve, reject) => signal.addEventListener('abort', () => reject(new Error('body aborted')))),
    }),
    timeoutMs: 10, maxAttempts: 1,
  }), error => error.failureStage === 'request' && error.attempts === 1);
});
