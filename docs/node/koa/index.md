# KOA
## 中间键
- 中间键执行逻辑，koa封装在compose第三方包中
- 中间键会存放在```this.middleware```中,执行过程中，会将中间键包括在```Promise.resolve```

