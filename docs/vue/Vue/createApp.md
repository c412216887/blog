# Vue

## createApp

源码位置
runtime-dom/src/index.ts

createApp(rootComponent, rootProps): APP

- APP 就是一个对象，拥有 use, mount 等方法
- createApp 重新 app 的 mount 方法，对 mount 方法完善根节点过去的方法

ensureRenderer -> createRenderer -> baseCreateRender -> 返回{render, createApp}
ensureRenderer 确保渲染器的存在,这里相当于单例模式
createRenderer 接受 renderOptions, 调用 baseCreateRender
baseCreateRender 接受 renderOptions， 返回一个对象{render, createApp}

render: 根据组件生成 vnode
patch: 根据 vnode 生成真实 element

- `app.mount("#app")`方法，调用 render 方法，
- render 方法， 调用 patch 方法
- patch 方法
  - 入参 n1: 新的 vnode
  - 入参 n2: 旧的 vnode
  - 入参 container: 父 DOM 节点
  - 入参 anchor: 锚点
