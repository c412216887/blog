前端 Web 应用中的 Version-Polling 文档
概述
在前端 Web 应用中，Version-polling 是一种技术，用于定期检查服务器上的资源（如配置文件、数据集或应用程序版本）是否有更新。这种机制可以帮助确保客户端始终使用最新的资源，从而提供更好的用户体验和安全性。本文档将详细介绍如何在前端 Web 应用中实现 Version-polling。
为什么需要 Version-Polling？
● 实时更新：确保用户能够及时获取到最新的功能和修复。
● 提高用户体验：自动更新可以减少手动刷新页面的需要。
● 安全性增强：及时应用安全补丁以减少漏洞风险。
● 维护一致性：确保所有用户看到的内容是一致的。
如何实现 Version-Polling？
步骤 1: 确定目标
首先明确你想要监控哪些资源的版本变化。这可能是：
● 配置文件
● 数据集
● 应用程序版本
● 其他动态内容
步骤 2: 设计 Polling 逻辑
决定如何以及何时进行 polling。考虑因素有：
● 频率：每隔多久执行一次检查？（例如每分钟、每小时）
● 触发条件：是否只有当某些特定事件发生时才启动 poll？（例如用户登录、页面加载）
● 通知方式：如果发现新的版本可用，应该怎样通知用户？（弹窗、提示信息等）
步骤 3: 实现 Polling 代码
以下是一个简单的示例，展示如何使用 JavaScript 和 Fetch API 实现 version-polling。
示例 - 使用 JavaScript 实现版本轮询

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Version Polling Example</title>
  </head>
  <body>
    <h1>Version Polling Example</h1>
    <p id="version-status">Checking for updates...</p>

    <script>
      const POLL_INTERVAL = 60000; // 每分钟检查一次
      let currentVersion = "1.0.0";

      function checkForUpdates() {
        fetch("https://api.example.com/latest-version")
          .then((response) => response.json())
          .then((data) => {
            const latestVersion = data.version;
            if (latestVersion !== currentVersion) {
              document.getElementById(
                "version-status"
              ).innerText = `New version available: ${latestVersion}`;
              alert(
                `A new version (${latestVersion}) is available. Please refresh the page.`
              );
              currentVersion = latestVersion;
            } else {
              document.getElementById("version-status").innerText =
                "No updates found.";
            }
          })
          .catch((error) => {
            console.error("Error checking for updates:", error);
            document.getElementById("version-status").innerText =
              "Failed to check for updates.";
          });
      }

      // 初始检查
      checkForUpdates();

      // 定期检查
      setInterval(checkForUpdates, POLL_INTERVAL);
    </script>
  </body>
</html>
```

步骤 4: 测试与部署
在实际环境中部署之前，请务必彻底测试你的 version-polling 解决方案，以确保它能够正确识别版本差异，并按预期工作。
步骤 5: 优化与改进
● 缓存机制：避免频繁请求相同的资源，可以使用浏览器缓存或本地存储来减少网络请求。
● 错误处理：添加更详细的错误处理逻辑，确保在网络不稳定或服务器不可达时能够优雅地处理。
● 用户控制：提供选项让用户可以选择是否启用自动更新或调整检查频率。
注意事项
● 性能影响：频繁的网络请求可能会影响页面性能，特别是在移动设备上。
● 隐私与安全：确保所使用的任何第三方服务都符合组织的安全标准。
● 用户体验：频繁的提示可能会打扰用户，因此需要谨慎设计提示的方式和频率。
项目实践
项目中使用第三方包`version-polling`来实现
version-polling 注意事项
● version-polling 需要在支持 web worker 和 fetchAPI 的浏览器中运行，不支持 IE 浏览器
● version-polling 需要在 web 应用的入口文件（通常是 index.html）中引入，否则无法检测到更新
● version-polling 需要在 web 应用的服务端配置协商缓存，否则无法命中缓存，会增加网络请求
● version-polling 需要在 web 应用的服务端保证每次发版后，index.html 文件的 etag 字段值会改变，否则无法检测到更新
具体实现

1. 使用  Web Worker API 在浏览器后台轮询请求页面，不会影响主线程运行。
2. 命中协商缓存，对比本地和服务器请求响应头 etag 字段值。
3. 如果 etag 值不一致，说明有更新，则弹出更新提示，并引导用户手动刷新页面（例如弹窗提示），完成应用更新。
4. 当页面不可见时（例如切换标签页或最小化窗口），停止实时检测任务；再次可见时（例如切换回标签页或还原窗口），恢复实时检测任务。
   项目中的引入
   vue 工程，在 App.vue 单文件中引入 version-polling
   ```vue
   <script setup>
   import { createVersionPolling } from 'version-polling'
   // 创建了VersionPolling实例
   createVersionPolling({
     ... // 一些配置参数
     onUpdate: (self) => {} // 检测到有更新的回调
   })
   </script>
   ```
   不适配的问题
   nginx 前端集群，每台机器部署项目会存在一定的时差，而 nginx 服务器生成 etag 由响应头 Last-Modified 与 Content-Length 表示为十六进制组合而成。导致每台 nginx 服务器，返回的 Last-Modified 存在时间误差，固然影响了 etag 的数据。
   通过计算获得，目前两台机器返回的`Last-Modified`时差为 13s。就不能只是单纯的比较每次请求的获取的 etag 是否一致，还需要判断获取的 etag 时差是不是在 90s 之内(增加一定的容错率，每次部署时长在 2min 之上，为了保证每次部署都能被检测到，时差要大于 13s，尽可能小于 2min)
   需要修改点
5. 初始化 version-polling 时，需要增加判断，是否存在更新。-- 更新，需要项目评价表单，供用户填写（等后续迭代更新）
6. 检测到更新后，回调函数 onUpdate 需要增加新的 etag 入参，用于比较新旧 etag 做时差对比（当然直接比较 Last-modified 最简单，但，原有逻辑就是比较 eTag，就不再更改）
   一些关注点
7. etag 语法
   ETag: W/"<etag_value>"
   ETag: "<etag_value>"
   W/(可选)
   'W/'(大小写敏感) 表示使用弱验证器。弱验证器很容易生成，但不利于比较。强验证器是比较的理想选择，但很难有效地生成。相同资源的两个弱 Etag 值可能语义等同，但不是每个字节都相同。
8. `version-polling`使用 web worker 轮询，不占用主进程

```ts
let myWorker;
/**
    创建一个 Web Work 实例
    @param func
  */
export function createWorker(func: (e: any) => void) {
  const blob = new Blob(["(" + func.toString() + ")()"]);
  const url = window.URL.createObjectURL(blob);
  const worker = new Worker(url);

  window.URL.revokeObjectURL(url);

  return worker;
}
export function createWorkerFunc() {
  // 轮询的 interval id
  let timerId: ReturnType<typeof setTimeout> | null = null;
  // 配置的的选项
  let options: Pick<
    VersionPollingOptions,
    "appETagKey" | "pollingInterval" | "silentPollingInterval"
  > & { htmlFileUrl: string; lastEtag: string };

  self.onmessage = (event: any) => {
    let code = event.data["code"];
    options = Object.assign({}, options, event.data["data"]);

    const runReq = () => {
      // 发送请求，判断新旧etag是否一致
    };
    // 开始轮询
    const startPollingTask = () => {
      timerId = setInterval(runReq, pollingInterval);
    };
    // 暂停轮询
    const pausePollingTask = () => {
      if (timerId) {
        clearInterval(timerId);
        timerId = null;
      }
    };

    if (code === "pause") {
      pausePollingTask();
    } else {
      runReq(); // 立即执行一次
      if (!silentPollingInterval) {
        startPollingTask();
      }
    }
  };

  return self;
}
export function closeWorker(worker: Worker) {
  // 终止 worker
  worker.terminate();
}
myWorker = createWorker(createWorkerFunc);
```
