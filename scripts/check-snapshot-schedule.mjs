import { appendFileSync } from 'node:fs';
import { isSnapshotDue } from '../lib/snapshotSchedule.js';

const due = isSnapshotDue({ eventName: process.env.GITHUB_EVENT_NAME });
if (process.env.GITHUB_OUTPUT) appendFileSync(process.env.GITHUB_OUTPUT, `due=${due}\n`);
console.log(due ? 'Snapshot update is due (fortnightly or manual).' : 'Off week: skip fetching and pushing the snapshot.');
