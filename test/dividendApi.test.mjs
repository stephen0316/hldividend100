import assert from 'node:assert/strict';
import test from 'node:test';
import handler from '../api/dividend.js';
import snapshot from '../data/dividendSnapshot.js';

test('static dividend endpoint serves the stored source date, value and method without fetching upstream', async () => {
  const previousFetch = globalThis.fetch;
  globalThis.fetch = () => { throw new Error('static endpoint must not fetch upstream'); };
  try {
    let payload;
    const headers = {};
    await handler({ query: {}, url: '/api/dividend' }, {
      setHeader: (name, value) => { headers[name] = value; },
      json: value => { payload = value; },
    });
    assert.equal(payload.source, 'computed-ttm');
    assert.equal(payload.metricType, 'TTM（总股本加权）');
    assert.equal(payload.date, snapshot.date);
    assert.equal(payload.yieldPct, snapshot.yieldPct);
    assert.equal(payload.sourceUrl, snapshot.sourceUrl);
    assert.equal(payload.parseMethod, 'ttm-total-shares-adjusted-dps-v1');
    assert.equal(payload.period, 'ttm');
    assert.equal(payload.weighting, 'total-shares');
    assert.equal(payload.calculation.coveredConstituents, 100);
    assert.equal(payload.snapshot, true);
    assert.equal(payload.stale, payload.staleReasons.length > 0);
    assert.match(headers['Cache-Control'], /s-maxage=1800/);
  } finally {
    globalThis.fetch = previousFetch;
  }
});
