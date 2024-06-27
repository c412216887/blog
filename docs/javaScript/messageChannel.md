# MessageChannel

messageChannel 宏任务

::: info
MessageChannel 构造函数，实例化后，会提供`port1` 和 `port2`两个端口  
使用`postMessage`传送消息  
使用`onmessage`事件接受消息, 无法使用`addEventListener('message')`
:::

## 深拷贝

```js
const { port1, port2 } = new MessageChannel();
port1.postMessage({});
port2.onmessage = (ev) => {
  ev.data; // 深拷贝数据，可以拷贝undefined 和 循环对象，不能拷贝函数和Symbol
};
```

## iframe 传参

```js
// main.js
const iframe = document.querySelector("iframe");
const { port1, port2 } = new MessageChannel();
iframe.contentWindow.postMessage("main", "*", [port2]); // 第三个参数，通过ports获取
port1.onmessage = function (ev) {
  // 不能使用addEventListener
};
// iframe.js
window.onmessage = function (ev) {
  const port = ev.ports[0];
  port.postMessage("");
};
```

## web worker 通信

```js
// index.js
const worker = new Worker("worker.js");
const { port1, port2 } = new MessageChannel();
worker.postMessage("main", [port2]);
port1.onmessage = function (ev) {
  console.log(ev.message);
};
// worker.js
worker中全局变量self取代window;
self.onmessage = function (ev) {
  port = ev.ports[0];
  port.postMessage("");
};
```
