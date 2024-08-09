# pinia

## 概念

id:
state:
getter:
action:

## 如何使用?

1. 插件注册

```js
// main.js
import { createApp } from "vue";
import { createPinia } from "pinia";
import App from "./App.vue";
createApp(App).use(createPinia());
```

2. 定义 store
   > pinia 定义 store 默认需要分配一个命名空间

- 方法一

```js
// store/index.js
import { defineStore } from "pinia";
// 后面使用，就是导入这个变量名，所以使用hooks的命名规则
export const useStore = defineStore({
  id: "",
  state() {
    return {};
  },
  getters: {},
  action: {},
});
```

- 方法二

```js
import { defineStore } from "pinia";
// 后面使用，就是导入这个变量名，所以使用hooks的命名规则
export const useStore = defineStore("[id]", {
  state: () => ({}),
  getters: {},
  actions: {},
});
```

3. 引入 store 并使用

```js
// 导入的变量useStore，就是在定义(defineStore)时，export的变量
import { useStore } from "store/index.js";
import { useRouter } from "vue-router";
const router = useRouter();
const store = useStore();
```

4. 修改 store 中的状态
1. 直接修改

```js
store.stateKey = 5;
```

2. 调用$patch,传入一个对象, 无法增加相关逻辑

```js
store.$patch({
  stateKey: 5,
});
```

3. 调用$patch, 传入一个回调函数

```js
store.$patch((state) => {
  ...
})
```

4. 调用$state

```js
store.$state = {
  ...
}
```

5. 调用 action 进行数据修改

```js
store.[actionName]()
```

# Vuex

> vue3 以后，推荐使用 pinia，所有不在单独设置 vue3 的目录

## 概念

state:  
getter:  
mutation:  
action:  
module:

## 开始

1. 插件注册

```js
import { createApp } from "vue";
// pinia中使用createPinia
import store from "./store";
import App from "./App.vue";
createApp(App).use(store);
```

2.  定义 store

```js
// pinia使用defineStore，但是注册时，使用createPinia
import { createStore } from "vuex";
export default createStore({
  // state都是一个函数，防止数据污染
  state() {
    return {};
  },
  getters: {},
  mutations: {},
  actions: {},
  modules: {},
});
```

3. 使用 vuex

```js
  import { defineComponent } from 'vue'
  // pinia从store定义的文件中，导入。同时，pinia习惯的会把store文件中导出的变量命名为'useStore',这样vuex跟pinia使用上一致了
  import { useStore } from 'vuex'
  export defaut defineComponent({
    setup() {
      const store = useStore()
    }
  })
```
