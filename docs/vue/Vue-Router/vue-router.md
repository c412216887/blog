# Vue-Router

## 什么是 Vue-Router?

Vue 框架用来控制控制路由的，根据不同的路由加载不同的路径

## 核心概念

1. router

- 在全局中可以使用`createRouter`创建一个 router 实例
- 在组件中可以使用`useRouter`获取创建的实例

2. route

- 在组件中可以使用`useRoute`获取到 route 实例

3. 路由守卫
4. 动态路由
5. 嵌套路由
6. 路由跳转
7. 路由滚动
8. 路由别名
9. 路由重定向
10. 编程式导航

## router

router 的实例，包含完整 route 信息
在单文件组件中获取 router 实例，示例如下

```js
// router/index
import { createRouter, createWebHashHistory } from "vue-router";
export const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

// index
import { createApp } from "vue";
import App from "./App.vue";
import { router } from "./router/index";
createApp(App).use(router);
```

```js
import { useRouter } from "vue-router";
const router = useRouter();
```

## route

当前路由上的路由信息
在单文件组件中获取 route 对象，示例如下

```js
import { useRoute } from "vue-router";
const route = useRoute();
```

## 路由守卫

主要通过跳转或者取消的方式守卫导航
前置守卫/beforeEach

- 全局守卫：`return false`取消路由  
  后置守卫

## 编程式导航

1. `router.push`和`router.replace`异同?
   相同点: 导航到新的路由
   不同点: `router.push`会在 history(历史记录中)添加一条新的记录，浏览器后退按钮，可以回到之前的地址  
    `router.replace`会替换 history 当前的记录。

```js
router.push("/home", replace: true)
// 相当于
router.replace("/home")
```

## `vue-router`运行顺序？

1. router 的创建: 使用`createRouter`创建 router 实例
   1.1 `createRouterMatcher`根据`routes`属性创建`addRoute`/`getRoutes`/`removeRoute`/`resolve`

2. vue.use(Router): vue 调用 router 的 install 方法
3. 开始渲染`<router-view />`

## `vue-router`打包工具

使用 rollup 进行打包

## 问题

Q: 场景：浏览器路径带有 hash 值时,使用 route 无法获取到正确的 hash 数据

1. 为什么 route 无法获取到正确的 hash 数据
2. 这种情况应该如何解决

Q: `<router-view />`什么时候开始进行渲染

Q:

```js
window.addEventListener("popstate");
window.addEventListener("beforeunload");
```

Q: RouteLocation 的数据结构

```ts
type RouteLocation = {
  name: string;
  path: string;
  fullPath: string;
  hash: string;
  query: string;
  params: RouteParams;
  matched: RouteRecord[];
};
```

Q: 跳转路由，使用 promise
