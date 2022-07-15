# tapable

## 什么是tapable
一个使用在webpack内部的库，这个库设定了好几种Hook

## 10种Hooks类型， 3种订阅， 3种调用方式
同步hook只支持tap，异步hook还支持tapAsync、tapPromise

1. Hooks类型
SyncHook：轮流调用taps, 不处理tap的返回值
  订阅方式：tap
  调用方式：call、callAsync、promise
SyncBailHook:  tap的返回数据不为undefined时，直接return
  订阅方式：tap
  调用方式：call、callAsync、promise
AsyncSeriesHook: 异步，如果异步tap不手动执行next()函数,则后续tap将不会继续执行。同步tap不用手动执行
  订阅方式：tap、tapAsync、tapPromise
  调用方式：callAsync、promise
AsyncParallelHook: 异步平行调用，从第一个依次调用tap，只需要最后一个异步tap手动执行next()，并可以最后的回调函数   
---   
总结：
sync, 同步hook，只允许tap方式订阅，但是可以使用异步call。  
Async, 异步hook, 允许同步tap和异步tap订阅。也可以使用同步call和异步call。  
   
series, 连续调用，同步tap直接继续执行下一个tap，如何遇到异步tap,则需要在异步tap中调用next()函数，才能继续执行。
bail, 连续调用，当tap函数存在返回值时，终止剩下的tap执行，其他跟series一样
parallel, 平行调用



2. 订阅方式
tap: 订阅的类型'sync',    
  tap函数，参数只有hook对应的参数
tapAsync: '订阅类型'async',   
  tap函数，参数除了hook对应的参数之外，还有一个回调函数; 如果不执行回调函数，后续tap函数不执行
tapPromise: 订阅类型'promise'

3.调用方式
call: 返回tap的结果, 只能传递参数
callAsync: 将tap的结果传递给回调函数， 参数hook的需要传递的参数 + 回调函数, 在最后调用回调函数
promise

## 源码思路

hook使用tap将回调函数存放在实例对象taps数组中
根据hook类型，使用不同call方法,最后调用```new Function()```方法,生成包含所有tap的函数，并调用
关键代码是，没有Hook显示自己compiler方法和content方法
1. call: 根据hook自己的实现的compile方法
2. callAsync: 多一个回调函数，回调函数参数接受一个error入参
3. callPromise

分析hookCodeFactory文件中代码

```create()```: 根据类型生成对应的函数结构，里面会调用content函数自己开始确定，函数内部，如何处理自己的没有tap的结果
```callTapsSerise()```开始遍历taps，根据content传进来的如何处理结果的onResult参数，组装成完成的内容

