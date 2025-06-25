技术框架
electron + element-ui + quasar
打包
1. 构建测试环境包
pnpm build:dev
2. 构建生产环境包
pnpm build:prod

对话渲染逻辑
两层keep-alive实现缓存
应用版本更新逻辑
● 本地开发调试逻辑
代码逻辑：
        i. 通过process.env.NODE_ENV !== 'development判断是否为测试环境
        ii. 测试环境调用checkUpdateDev()方法
export async function checkUpdateDev(mainWindow?: BrowserWindow | null) {
  mainWin = mainWindow
  // 等待 3 秒再检查更新，确保窗口准备完成，用户进入系统
  await sleep(3000)
  autoUpdater.updateConfigPath = join(_dirname, 'dev-app-update.yml');
  autoUpdater.forceDevUpdateConfig = true;
  // 每次启动自动更新检查更新版本
  autoUpdater.checkForUpdates()
}
provider: generic
url: http://localhost:5000/updates #检查地址
本地启动5000端口
1. 在E磁盘中创建updates文件夹，打包一个高版本的安装包，将latest.yml文件和.exe文件放在updates文件夹中
2. 在E:\打开cmd控制台，执行npx http-server -p 5000启动服务
安装包存在位置
C:\Users\Administrator\AppData\Local\lute-assistant

检测更新运行流程
1. autoUpdater.checkForUpdates()检查更新
    a. autoUpdater.on('checking-for-update', () => {})检查更新中
    b. 有更新触发autoUpdater.on('update-available', info => {})info内容便是latest.yml文件
    c. 无更新触发autoUpdater.on('update-not-available', () => {})
2. 可以调用autoUpdater.downloadUpdate()执行下载任务
    a. 触发autoUpdater.on('download-progress', progress => {})下载进度
    b. 下载完成触发autoUpdater.on('update-downloaded', info => {})
3. autoUpdater.quitAndInstall()执行安装
4. 报错，autoUpdater.on('error', (error) => {})

● 获取changeLog
1. 在打包生成的`latest.yml`文件中增加changeLog属性
2. ipcRenderer.on('update-available', (event, payload) => {})在payload中获取到latest.yml文件内容（JSON格式）
文件下载
1. 文件路径：src/utils/file.ts
2. 方法名：downloadFileKey根据osskey下载文件
    a. 通过queryFileUrl接口获取到ossKey对应的文件下载链接
3. 根据不同上下文环境使用不同的下载方式
    a. window.ipcRenderer存在，则是在electron上下文中
        i. window.ipcRenderer.onDownloadProgress(cb)监听下载进度
        ii. window.ipcRenderer.onDownloadComplete(cb)监听一次下载完成，同时，下载完成之后，需要window.ipcRenderer.removeDownloadProgress()移除下载进行的监听，防止下次下载存在多个文件的监听
        iii. 未考虑下载过程中出现异常报错的情况
    b. 不存在，则是在浏览器上下文中
        i. 直接使用<a>标签下载
4. window.ipcRenderer.send('download-file', File)开始文件下载。
5. 每次下载调用一个函数，可以实现多个文件同时下载
图片预览
1. 方法路径：src/utils/image.ts
2. 方法名：imgViewer
3. 入参：Element image viewer组件所有的props
4. 实现：
    a. 创建一个空的DIV标签，用来挂载ElImageViewer组件
    b. 利用vue中defineComponent和h方法创建组件，组件主要是包裹了ElImageViewer组件，其中teleported设置为true，确保图片预览可以全屏展示。同时，使用withModifiers实现close方法，用来移除自身，同时卸载app，避免多次预览图片产生多个元素
    c. 挂载组件，使用createApp()将创建的组件挂载到`DIV`标签中
    d. 不要直接挂载在Body上，会导致body被清空，使用teleport实现body挂载
pdf文档资源查阅
1. pdf文档附加在每次问题回答后面采用<a>标签（markdown语法不支持在新窗口打开所以采用<a>标签实现）
2. vue-markdown开启html编译，将:html: true
3. 监控window open行为win.webContent.setWindowOpenHandler(() => { return {action: deny }}), 拒绝打开新得web页面，手动控制新页面
4. 打开新页面new BrowerWindow()
    a. 监控网络请求，session.defaultSession.webRequest.onHeadersReceived(filters, (details, callback)),通过过滤器，将接口响应头进行拦截
    b. callback({ reponseHeaders: { ...details.responseHeaders, 'Content-Disposition': ['inline'] } })将响应头中Content-Disposition更改为inline,实现预览
5. 隐藏pdf预览页面工具栏
    a. 在pdf链接后面增加#toolbar=0,将不显示顶部工具栏



打包安装证书（暂未应用证书）
1. 打包使用electron-builder
2. 配置electron-builder.json,证书使用openSSL生成得免费版。
{
  ...
  "win": {
    "certificateFile": 
      "C:\\Program Files\\OpenSSL-Win64\\bin\\certificate.pfx",
    "certificatePassword": "",
    "publisherName": "Root",
    "signingHashAlgorithms": ["sha256"],
  // 校验证书，可能导致更新时，安装包无法通过验证，导致下载失败
    "verifyUpdateCodeSignature": true, // 设置未false，禁止校验证书
  }
  
}
3. 再package.json中增加publisherName: "Root"，便于更新时，校验安装包
{
  ...
  "publisherName": "Root" //跟electron-builder.json中保持一致
}

自定义协议实现钉钉登录（暂未应用）

后端系统
1. dify.luteos.site
2. dify.luteos.com
3. roosync.luteos.com
