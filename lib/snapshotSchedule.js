// Anchor: 2026-11-25 (Wednesday), Asia/Shanghai. Never use ISO week parity:
// consecutive odd ISO weeks around a year boundary can break a 14-day cadence.
export const SCHEDULE_ANCHOR = '2026-11-25';
export const SCHEDULE_INTERVAL_DAYS = 14;

export function isSnapshotDue({ eventName, now = new Date() }) {
  if (eventName === 'workflow_dispatch') return true;
  if (eventName !== 'schedule') return false;
  const timestamp = new Date(now).getTime();
  if (!Number.isFinite(timestamp)) throw new Error('Invalid schedule time');
  const day = Math.floor((timestamp + 8 * 3_600_000) / 86_400_000);
  const anchorDay = Date.parse(`${SCHEDULE_ANCHOR}T00:00:00Z`) / 86_400_000;
  const elapsedDays = day - anchorDay;
  // Allow a delayed Wednesday trigger until Sunday, never a new weekly cycle.
  return elapsedDays >= 0 && elapsedDays % SCHEDULE_INTERVAL_DAYS < 5;
}
