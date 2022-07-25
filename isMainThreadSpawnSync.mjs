import { spawnSync } from 'child_process';
import { isMainThread } from 'worker_threads';

if (isMainThread) {
  console.log('in the main thread');
} else {
  console.log('in a worker thread');
}

spawnSync('pwd', {
  stdio: isMainThread ? ['ignore', process.stderr, 'inherit'] : ['inherit'],
});
