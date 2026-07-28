import assert from 'node:assert/strict';
import test from 'node:test';
import { fetchDividendSnapshotFromSource, parseDividendPayload } from '../lib/dividendSource.js';

const VALID_HTML = `
  <main>
    最后更新于：2026-07-27
    <section>当前值：4.45%</section>
  </main>
`;

test('parses the source date and current dividend yield as one scoped record', () => {
  assert.deepEqual(parseDividendPayload(VALID_HTML), {
    date: '2026-07-27',
    yieldPct: 4.45,
    parseMethod: 'scoped-text',
  });
});

test('retries a rate-limited request and honours Retry-After', async () => {
  let calls = 0;
  const delays = [];
  const payload = await fetchDividendSnapshotFromSource({
    fetchImpl: async () => {
      calls += 1;
      return calls === 1
        ? new Response('', { status: 429, headers: { 'retry-after': '0' } })
        : new Response(VALID_HTML, { status: 200 });
    },
    maxAttempts: 3,
    sleepImpl: async delay => delays.push(delay),
    onRetry: () => {},
  });

  assert.equal(calls, 2);
  assert.deepEqual(delays, [0]);
  assert.equal(payload.attempts, 2);
  assert.equal(payload.yieldPct, 4.45);
});

test('retries a transient network error', async () => {
  let calls = 0;
  const payload = await fetchDividendSnapshotFromSource({
    fetchImpl: async () => {
      calls += 1;
      if (calls === 1) throw new TypeError('network unavailable');
      return new Response(VALID_HTML, { status: 200 });
    },
    maxAttempts: 2,
    baseDelayMs: 0,
    sleepImpl: async () => {},
    random: () => 0,
    onRetry: () => {},
  });

  assert.equal(calls, 2);
  assert.equal(payload.attempts, 2);
});

test('does not retry a parser mismatch and reports the parser stage', async () => {
  let calls = 0;
  await assert.rejects(
    fetchDividendSnapshotFromSource({
      fetchImpl: async () => {
        calls += 1;
        return new Response('<main>unexpected page</main>', { status: 200 });
      },
      maxAttempts: 4,
      sleepImpl: async () => {},
      onRetry: () => {},
    }),
    error => error.failureStage === 'parse' && error.attempts === 1
  );
  assert.equal(calls, 1);
});
