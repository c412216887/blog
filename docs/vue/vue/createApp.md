# Vue

## createApp

源码位置
runtime-dom/src/index.ts

createApp(rootComponent, rootProps): APP

- APP 就是一个对象，拥有 use, mount 等方法
- createApp 重新 app 的 mount 方法，对 mount 方法完善根节点过去的方法

ensureRenderer() -> createRenderer(options) -> baseCreateRender -> createAppAPI -> 返回{render, createApp}
ensureRenderer 确保渲染器的存在,这里采用单例模式
createRenderer 接受 renderOptions(dom 元素操作方法), 调用 baseCreateRender
baseCreateRender 接受 renderOptions， 返回一个对象{render, createApp}

createApp，通过 createAppAPI(render)生成的
createAppAPI(render)采用闭包，返回了一个 createApp 函数
createApp 函数，返回一个 app 对象

```json
{
  _uid: 0 // vue组件uid，递增
  component:null // 函数，返回组件
  directive: null // 函数，指令
  mixin: null // 函数，混入，为了链式调用，返回app
  provide：null // 函数，提供
  mount: null // 基础挂载方法
  unmount: null // 函数，
  use: null//函数，安装plugin
  version:3.4.17 // 当前vue的版本
}
```

render: 根据组件生成 vnode
patch: 根据 vnode 生成真实 element

- `app.mount("#app")`方法，调用 render 方法，
- render 方法， 调用 patch 方法
- patch 方法
  - 入参 n1: 新的 vnode
  - 入参 n2: 旧的 vnode
  - 入参 container: 父 DOM 节点
  - 入参 anchor: 锚点
