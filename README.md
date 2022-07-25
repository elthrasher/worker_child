# Worker Child

Children shouldn't be forced to work! This repo shows us why we can't pass certain args to `spawnSync` if we expect to run it in a worker thread. For additional context, see https://github.com/vitest-dev/vitest/issues/1544 and https://github.com/aws/aws-cdk/issues/20873#issuecomment-1171528320

## Instructions

* Clone the repo
* Run `node spawnSync.mjs` and see the valid output.
* Now run `node index.mjs` and see the error which should look something like...

```bash
➜  worker_child node index.mjs

node:internal/event_target:912
  process.nextTick(() => { throw err; });
                           ^
TypeError [ERR_INVALID_ARG_VALUE]: The argument 'stdio' is invalid. Received WritableWorkerStdio {
  _writableState: WritableState {
    objectMode: false,
    highWaterMark: 16384,
    finalCalled: false,...
    at new NodeError (node:internal/errors:372:5)
    at node:internal/child_process:1067:13
    at Array.reduce (<anonymous>)
    at getValidStdio (node:internal/child_process:992:11)
    at spawnSync (node:child_process:787:19)
    at file:///Users/matt/code/worker_child/spawnSync.mjs:3:1
    at ModuleJob.run (node:internal/modules/esm/module_job:198:25)
    at async Promise.all (index 0)
    at async ESMLoader.import (node:internal/modules/esm/loader:385:24)
    at async loadESM (node:internal/process/esm_loader:88:5)
Emitted 'error' event on Worker instance at:
    at Worker.[kOnErrorMessage] (node:internal/worker:289:10)
    at Worker.[kOnMessage] (node:internal/worker:300:37)
    at MessagePort.<anonymous> (node:internal/worker:201:57)
    at MessagePort.[nodejs.internal.kHybridDispatch] (node:internal/event_target:643:20)
    at MessagePort.exports.emitMessage (node:internal/per_context/messageport:23:28) {
  code: 'ERR_INVALID_ARG_VALUE'
}
```

Tested with both Node 16 and Node 18.

One solution to this issue could be to use `isMainThread` as shown in `isMainThreadSpawnSync.mjs`.