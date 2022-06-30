# Vue3

## 什么Vue？
渐进式的JavaScript框架

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
    - <del>*onBeforeCreate*</del>
    - <del>*onCtreated*</del>
    - onBeforeMount
    - onMounted
  2. 失活阶段(keep-alive特有)
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
5. Suspense异步组件
6. Teleport组件
7. transition组件
8. transition-group组件
9. keep-alive
- 自定义指令

- 自定义hook
  本质上就是封装一个函数
- nextTick
  执行机制是什么？？


## vite插件
unplugin-vue-components: 自动引入vue组件
unplugin-auto-import: 自动引入模板里的API

