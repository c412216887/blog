# JavaScript

## then 方法

接受两个回调函数，分别接受 promise 最终的结果，和 promise 不能 fulfill 的原因
返回一个 pending 状态的 promise。只能等到回调函数全部执行完成，才能成为 fulfill 的 promise

- then 返回的一定是个 pending 状态 promise
  什么时候，fulfillment？
  then 回调函数，返回值为基本类型，直接调用 resolve(),返回值为 Promise,则在.then 里面调用回调
- promise 的状态为 fulfill 时，then 的回调函数才会放入微循环中
