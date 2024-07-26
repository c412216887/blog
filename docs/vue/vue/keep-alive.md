# keep-alive

## 代码位置

/packages/runtime-core/src/components/KeepAlive.ts

:::info
内置了四个组件，分别是:

- BaseTransition: 过渡组件，用来增加过渡动画
- KeepAlive: 缓存组件，用来缓存
- Suspense: 异步组件
- Teleport: 传送组件  
  :::

keep-alive 子元素只存在一个

代码总量 460 行
导出 4 个方法

- isKeepAlive
- KeepLive: 缓存组件
- onActivated: 生命周期
- onDeactivated: 生命周期

props 接受 3 个属性
include: 包含的
exclude: 排除的
max: 最大

shapeFlag 一共 10 中类型  
元素 1
函数式组件 2
有状态组件 4
文本
数组子元素 16
插槽子元素
teleport
suspense
componentShouldKeepAlive - 256
componentKeptAlive - 512
组件

```js
// 不缓存就直接渲染组件
// includes | exclude 是根据 子元素的 name 值来匹配
if (
  (include && (!name || !matches(include, name))) ||
  (exclude && name && matches(exclude, name))
) {
  current = vnode;
  return rawVNode;
}
```

```ts
// keep-alive子元素只能有一个根元素/一个组件
if (children.length > 1) {
  if (__DEV__) {
    warn(`KeepAlive should contain exactly one component child.`);
  }
  current = null;
  return children;
} else if (
  // keep-alive子元素只能是组件或者异步组件
  !isVNode(rawVNode) ||
  (!(rawVNode.shapeFlag & ShapeFlags.STATEFUL_COMPONENT) &&
    !(rawVNode.shapeFlag & ShapeFlags.SUSPENSE))
) {
  current = null;
  return rawVNode;
}
```

减少缓存
cache: Map<CacheKey, VNode> 缓存 子元素 key | 子元素 vnode

cache.get(key)

怎么缓存，怎么取

- 怎么缓存

从 cache.get(key)中获取 vnode，

- 不存在， keys.add(key)
- 存在， 更新 keys.remove(key), keys.add(key)

在 keepalive 的 render 函数中，将 pendingCacheKey = component.name
在 onMounted 生命周期中，调用 cacheSubstree 函数，后续在 onUpdated 生命周期中，调用 cacheSubstree 函数

patchFlag

shapeFlag

keep-alive 存在 key 时 shapeFlag 772 ShapeFlags.COMPONENT_KEPT_ALIVE 已经缓存过的组件 调用 activate
不存在 key 时 shapeFlag 260 没有缓存
