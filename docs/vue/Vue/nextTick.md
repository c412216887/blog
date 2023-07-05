# vue

## nextTick

等待下一次 DOM 更新刷新的工具方法（无法理解这句话）

- 类型

```ts
function nextTick(callback?: () => void): Promise<void>;
```

- 源码位置
  packages/runtime-core/src/scheduler.ts

- 源码

```ts
export function nextTick<T = void>(
  this: T,
  fn?: (this: T) => void
): Promise<void> {
  const p = currentFlushPromise || resolvedPromise;
  return fn ? p.then(this ? fn.bind(this) : fn) : p;
}
```

- `nextTick`可以传入一个回调函数，这个回调函数是在 Promise 的 then 方法中执行
- 返回一个 promise
- currentFlushPromise
  在方法`queueFlush()`,将 currentFlushPromise 赋值为 Promise
  在方法`flushJobs()`,将 currentFlushPromise 赋值为 null
- resolvedPromise = Promise.resolve()。这就是一个任务队列

添加任务
queueJob(job) -> queueFlush() -> flushJobs()

queueJob,在响应式数据变更时，会触发
