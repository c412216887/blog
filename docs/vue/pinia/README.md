# pinia
## 如何使用?
1. 插件注册
```js
// main.js
import {createPinia} from 'pinia'
App.use(createPinia())
```
2. 定义store
```js
// store/index.js
import {defineStore} from 'pinia'
export const useStore = defineStore({
  id: "",
  state() {
    return {

    }
  },
  getters: {

  },
  action: {

  }
})
```

3. 引入store并使用
```
import {useStore} from 'store/index.js'
const store = useStore()
```

4. 修改store中的状态
    1. 直接修改
    ```
store.stateKey = 5
```
2. 调用$patch,传入一个对象, 无法增加相关逻辑
```
store.$patch({
  stateKey: 5
})
```
3. 调用$patch, 传入一个回调函数
```
store.$patch((state) => {
...
})
```
4. 调用$state
```
store.$state = {
  ...
}
```
5. 调用action进行数据修改
```
store.[actionName]()
```
