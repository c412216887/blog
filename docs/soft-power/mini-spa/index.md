# 微前端

想要实现微前端，需要解决什么问题
支持不同框架的子应用挂载、更新、卸载
支持 css 隔离
支持 javascript 隔离
支持子应用之间的通信
支持父子应用之间的通信

## 支持不同框架的子应用

实现理论

1. 监听浏览器路由的变化
   改变浏览器路由变化的方法：
1. 在浏览器中修改 url
1. 在浏览器中点击前进、后退
   涉及到 pushState replaceState popstate
   pushState 相当于 window.location
   replaceState
   popstate
   hashchange

代码中改变 URL，可以改变 url 三个部分，

- 域名(host)
- 路径(pathname)
- 锚点(hash)
- 搜索条件(searchParams):

改变 hash 值时，是否会在 history 中新增一份条目
