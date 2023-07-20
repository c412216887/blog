# JavaScript

## then 方法

接受两个回调函数，分别接受 promise 最终的结果，和 promise 不能 fulfill 的原因
返回一个 pending 状态的 promise。只能等到回调函数全部执行完成，才能成为 fulfill 的 promise

- then 返回的一定是个 pending 状态 promise
- promise 的状态为 fulfill 时，then 的回调函数才会放入微循环中
