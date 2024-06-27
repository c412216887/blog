# Vue3

## 什么 Vue？

渐进式的 JavaScript 框架

## 核心概念

- 数据响应式

  1. ref
  2. toRef
  3. toRefs
  4. isRef
  5. reactive
  6. isReactive
  7. shallowReactive
  8. readonly
  9. watch
  10. watchEffect
  11. watchPostEffect
  12. watchSyncEffect
  13. computed

- 生命周期
  1. 挂载阶段
  - setup
  - <del>_onBeforeCreate_</del>
  - <del>_onCtreated_</del>
  - onBeforeMount
  - onMounted
  2. 失活阶段(keep-alive 特有)
  - onDeactivated
  - onActivated
  3. 更新阶段
  - onBeforeUpdate
  - onUpdated
  4. 卸载阶段
  - onBeforeUnmount
  - onUnmounted
- 插槽
  1. 匿名插槽
  2. 具名插槽
  3. 插槽作用域
  4. 动态插槽
- 组件

  1. 全局组件
  2. 局部组件
  3. 动态组件
  4. 递归组件
  5. Suspense 异步组件
  6. Teleport 组件
  7. transition 组件
  8. transition-group 组件
  9. keep-alive

- 自定义指令

- 自定义 hook
  本质上就是封装一个函数
- nextTick
  执行机制是什么？？
- h
  渲染函数

- vue 单文件，一定要有`<script></script>`标签

## 问题

3. render 函数
