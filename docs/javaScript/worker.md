# Web Worker
Web worker的作用就是为了JavaScript创造多线程环境，允许主线程创建Worker线程，将一些任务分配给后者运行。
Worker线程一旦新建成功，就会始终运行，不会被主线程的活动（比如用户点击按钮、提交表单）打断。

## 限制
1. 同源限制
分配给Worker线程运行的脚本文件，必须与主线程的脚本文件同源
2. DOM限制
Worker线程所在的全局对象，与主线程不一样，无法读取主线程所在网页的DOM对象，也无法使用`document`、`window`、`parent`这些对象。但是，Worker线程可以使用`navigation`对象和`location`对象
3. 通信联系
Worker线程和主线不在同一个上下文环境，他们不能直接通信，必须通过消息完成
4. 脚本限制
Worker线程不能执行`alert()`方法和`confirm()`方法，但可以使用XMLHttpRequest对象发出的AJAX请求
5. 文件限制
Worker线程无法读取本地文件，即不能打开本机的文件系统（file://）,他所加载的脚本，必须来自网络

## 基本用法
### 主线程
1. 创建worker
主线程采用`new`命令,调用`Worker()`构造函数,新建一个Worker线程

```javaScript
const worker = new Worker('work.js')
```
`Worker()`构造函数的参数是一个脚本文件，该文件就是Worker线程所要执行的任务。由于Worker不能读取本地文件，所以这个脚本必须来自网络。如果下载没有成功（比如404错误）。Worker就会默默低失败。
2. 与worker通信
主线程调用`worker.postMessage()`方法，向Worker发消息
```JavaScript
worker.postMessage('Hello World');
worker.postMessage({method: 'echo', args: ['Work']})
```

3. 接受worker的信息
```JavaScript
worker.onmessage = function(event) {
  console.log('received message' + event.data);
}
```
4. 关闭worker线程
```JavaScript
worker.terminate()
```

### worker线程
1. 接受主线程信息
```JavaScript
// worker.js
/** 方法一 */
this.addEventListener('message', function (e) {
  this.postMessage('Hello world')
})
/** 方法二 */
self.addEventListener('message', function(e) {
  self.postMessage()
})
/** 方法三 */
addEventListener('message', function(e) {
  postMessage()
})
```
2. 全局对象self
worker中，`self`代表子线程自身， 即子线程的全局对象

3. 关闭worker自身
```JavaScript
self.close()
```

## 创建Web Worker几种场景
通常情况下，Worker载入的是一个单独的JavaScript脚本文件，但是也可以载入与主线程在同一个网页的代码
1. 载入单独的JavaScript脚本文件
```javascript
const worker = new Worker('worker.js')
```
2. 同页面下的脚本
```html
<!doctype html>
<head></head>
<body>
  <script id='worker' type="app/worker">
    addEventListener('message', function() {})
  </script>
  <script>
    const blob = new Blob([document.querySelector('#worker').textContent]);
    const url = window.URL.createObjectURL(blob);
    const worker = new Worker(url);
    window.URL.revokeObjectURL(url);
    worker.postMessage();
    worker.onmessage = () => {

    }
  </script>
</body>
```
上面嵌入了一段JavaScript脚本，注意必须指定`<script>`标签type属性是一个浏览器不认识的值，上例是app/worker。防止脚本中的内容被主线程执行。
然后读取这端脚本内容，用worker来处理
3. 同页面下的函数
```javascript
function workerFn() {
  self.onmessage = function (event) {

  }
}
const blob = new Blob([`(${workerFn.tostring()})()`])
const url = window.URL.createObjectURL(blob);
const worker = new Worker(url);
window.URL.revokeObjectURL(url);
```
## Worker 加载脚本
Worker内部加载其他脚本，需要使用`importScripts()`
```javascript
// worker.js
importScripts('script1.js')
importScripts('script1.js', 'script2.js')
```

## 主线程处理Worker异常
主线程可以监听

