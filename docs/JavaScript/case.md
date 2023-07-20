# JavaScript

## 特殊案例

1. Array.prototype.sort()
   默认排序是将元素转换为**字符串**，然后按照它们的 UTF-16 码元值升序排序

```js
const arr = [1, 2, 0, -1, -2];
arr.sort(); // 实际情况为[-1, -2, 0, 1, 2]
const array1 = [1, 30, 4, 21, 100000];
array1.sort(); // 实际情况为[1, 100000, 21, 30, 4]
```

2. String.prototype.match()
   检索返回一个字符串匹配正则表达式的结果

- 如果使用 g 标识，则将返回与完整正则表达式匹配的所有结果，但不会返回捕获组

```js
["a", "b", 0]
  .match(/[a-z]/) // ["a", ...捕获组]
  [("a", "b", 0)].match(/[a-z]/g); // ["a", "b"]
```

3. 正则表达式，具名捕获组
   `/(?<name>x)/`匹配"x"并将其存储在返回的匹配项的 groups 属性中。

```js
"web-doc".match(/-(?<customName>\w)/).group; // {customName: "d"}
```

3-1. String.prototype.replace(), 传入回调函数时，

- 函数第一参数: 匹配到子字符串
- 第二个参数: 匹配到子字符串中的第一个捕获组

4. 二进制与十进制之间转换

```js
// 二进制转十进制
parseInt(0b001, 2);
// 十进制转二进制
const num = 10;
num.tostring(2); // Number.prototype.toString() 和 BigInt.prototype.toString() 才可以接受一个可选的radix参数
```

4.1. unicode 和对应字符互相转换

```js
// 获取字符对应的unicode码
const uni = "".charCodeAt();
// 将获取的unicode码，转换为对应的字符
const char = String.charCodeFrom();
```

5. `String.prototype.slice` 和 `String.prototype.substring`有什么区别
   相同点: 接受两个参数，两个参数都是开始到结束

```js
String.prototype.slice(start[, end])
String.prototype.substring(start[, end])
```

不同点:

- slice 可以接受负值，表示从末端开始, substring 不可以接受负值
- slice 方法，start 对应的位置 不小于 end 对应的位置时，返回"", substring 方法，start 大于 end 时，start 和 end 互换位置

6. `forEach` 和 `for...of`异同
   相同点: 可以遍历 Set 和 Array
   不同点:

- for...of 可以遍历 string
- for...of 循环体中添加或者删除数据，会影响被循环的 Set 或者 Array。forEach 不会
- for...of 循环，取 index 不方便，forEach 回调函数第二个参数就是 index

7. BigInt  
   用于高精度数计算。可以进行+ - \* / %

```js
// 创建一个bigInt
const b = 1n; // 字面法
const b2 = BigInt(1); // 对象法
b === b2; // true
```

8. 对象与字符串和数字进行比较，对象中按照优先级调用  
   `[Symbol.toPrimitive]()` > `valueOf()` > `toString()`  
   存在 valueOf 方法，则会直接调用 valueOf 的返回值，要是没有，在调用 toString 的返回值

9. node 和 element 有什么区别
