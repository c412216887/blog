# vue

## 响应式原理

获取值的时候，添加依赖；  
设置值的时候，触发依赖

## reactive

reactive -> createReactiveObject -> get -> track
reactive -> set ->

```js
function reactive(target) {
  // if trying to observe a readonly proxy, return the readonly version.
  if (target && target["__v_isReadonly" /* IS_READONLY */]) {
    return target;
  }
  return createReactiveObject(
    target,
    false,
    mutableHandlers,
    mutableCollectionHandlers,
    reactiveMap
  );
}
```
