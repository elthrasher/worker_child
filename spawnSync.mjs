import { spawnSync } from 'child_process';
import { isMainThread } from 'worker_threads';

spawnSync('pwd', {
  stdio: ['ignore', process.stderr, 'inherit'],
});
