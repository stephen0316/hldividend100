import assert from 'node:assert/strict';
import test from 'node:test';
import { isSnapshotDue } from '../lib/snapshotSchedule.js';

test('scheduled snapshots follow a 14-day anchor, including year boundaries', () => {
  for (const date of ['2026-11-25', '2026-12-09', '2026-12-23', '2027-01-06', '2027-01-20']) {
    assert.equal(isSnapshotDue({eventName:'schedule', now:`${date}T15:10:00Z`}), true, date);
  }
  for (const date of ['2026-11-18', '2026-12-02', '2026-12-16', '2026-12-30', '2027-01-13']) {
    assert.equal(isSnapshotDue({eventName:'schedule', now:`${date}T15:10:00Z`}), false, date);
  }
});

test('delayed scheduled runs use Shanghai dates and cannot leak into the off week', () => {
  assert.equal(isSnapshotDue({eventName:'schedule', now:'2026-11-26T00:30:00Z'}), true);
  assert.equal(isSnapshotDue({eventName:'schedule', now:'2026-11-29T15:59:59Z'}), true);
  assert.equal(isSnapshotDue({eventName:'schedule', now:'2026-11-29T16:00:00Z'}), false);
  assert.equal(isSnapshotDue({eventName:'schedule', now:'2026-12-08T16:00:00Z'}), true);
  assert.throws(() => isSnapshotDue({eventName:'schedule', now:'bad-date'}), /Invalid/);
});

test('manual runs bypass the cadence; unrelated events never update snapshots', () => {
  assert.equal(isSnapshotDue({eventName:'workflow_dispatch', now:'2026-12-02T15:10:00Z'}), true);
  assert.equal(isSnapshotDue({eventName:'push'}), false);
  assert.equal(isSnapshotDue({}), false);
});
