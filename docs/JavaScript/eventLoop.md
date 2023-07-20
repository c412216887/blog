# JavaScript

## 事件循环

总结：

- 先执行微任务，期间产生的新的微任务，继续执行微任务，直到执行完所有的微任务。最后执行宏任务
- 宏任务中产生的微任务，和宏任务。也是先执行微任务，再执行宏任务

## 案例

```js
const p1 = Promise.resolve();
let p2 = p1.then(() => {
  console.log(1);
});
p2.then(() => {
  console.log(2);
});
p1.then(() => {
  console.log(3);
});

setTimeout(() => {
  console.log(4);
  p1.then(() => {
    console.log(5);
  });
  setTimeout(() => {
    console.log(6);
  }, 0);
}, 0);
// 1 3 2 4 5 6
```
