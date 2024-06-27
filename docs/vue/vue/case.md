# vue

## 创建 vue 组件

1. 使用单文件

```vue
// App.vue
<template></template>
<script></script>
```

2. 使用`Vue.defineComponent()`,原理是，setup 函数，可以返回一个 render 函数

```js
import { defineComponent, h } from "vue";
defineComponent({
  setup() {
    return () => {
      return h("p", "hello world");
    }; // 为了表述的更清晰，这里没有省略大括号
  },
});
```
