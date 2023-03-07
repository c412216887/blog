# [JavaScript 高级程序设计](../README.md)

## 第三章 语言基础

### 语法

- 区分大小写
- 标识符：变量、函数、属性或函数参数的名称。
  - 标识符可以由一个或者多个下列字符组成
    - 第一个字符必须是一个字母、下划线(\_)或美元符号($), 人为规定，下划线(\_)开头，标识私有变量。
    - 剩下的其他字符可以是字母、下划线、美元符号或数字
- 注释
  - 单行注释：以两个斜杠开头(`//`)开头
  - 块注释: 以一个斜杠和一个星号(`/*`)开头，以它们的反向组合(`*/`)结尾
- 严格模式
  - 在脚本开头加上一行：`"use strict"`, 这其实是一个预处理指令
  - 也可以单独指定一个函数在严格模式下执行，只要把这个预处理指令放在函数体开头
  ```js
  function fn() {
    "use strict";
    // 函数体
  }
  ```
- 语句
  - 语句以分号结尾，省略分号意味着由解析器确定语句在哪里结尾

### 关键字与保留字

---

### 变量

- 有 3 个关键字可以声明变量：`var` 、 `const` 和 `let`
  - `var`
  1. `var`声明的作用域 - 函数作用域
  2. `var`声明提升 - 会自动提升到函数作用域顶部
  3. 全局声明，在全局作用域中，使用`var`声明的变量，会成为`window`对象的属性
  - `let`
  1. `let`声明的作用域 - 块级作用域，也不允许同级作用域中出现相同的标识符声明（冗余声明）。对声明冗余报错不会因混用`let`和`var`而受影响。这两个关键字声明的并不是不同类型的变量，他们只是指出变量在相关作用域如何存在
  2. 暂存死区，`let`声明的变量不会在作用域中被提升，在 let 声明之前的同级作用域被称为"暂存死区"
  3. 全局声明，在全局作用域中，使用`let`声明的变量，不会成为`window`对象的属性
  4. 提问
  ```js
  for (var i = 0; i < 5; i++) {
    console.log(i);
  }
  // 上述代码输出结果是啥？？
  for (var i = 0; i < 5; i++) {
    setTimeout(() => {
      console.log(i);
    }, 0);
  }
  // 上述代码输出的结果是啥？？
  for (let i = 0; i < 5; i++) {
    setTimeout(() => {
      console.log(i);
    }, 0);
  }
  ```
  - `const`
  1. 声明变量时，必须同时初始化变量， 且尝试修改`const`声明的变量会导致运行时错误。 const 声明的限制只适用于它指向的变量引用，换句话说，如果`const`变量引用的是一个对象，那么修改这个对象内部的属性并不违犯`const`的限制
  2. `const`声明的作用域 - 块级作用域，也不允许同级作用域中出现相同的标识符声明（冗余声明）
  3. 暂存死区， 同`let`一样
  4. 全局声明， 同`let`一样

### 数据类型

- 6 种简单数据类型

1. `Undefined`
2. `Null`
3. `Boolean`
4. `Number`
5. `String`
6. `Symbol`

- 1 种复杂类型

1. `Object`

- `typeof` 操作符

1. 对于没有声明的变量， `typeof`操作符，不会报错。可以用来判断变量是否声明并且赋值。

- `Null` 与 `Undefined`

1. `undefined`值是由`null`值派生而来的，因此，表面上两者相等

```js
console.log(undefined == null); // true
```

- `boolean`

---

- `number`

1. 浮点数：数值中必须包含小数点，而且小数点后面必须至少有一个数字
2. 值范围

- ECMAScript 可以表示的最小数值保存在`Number.MIN_VALUE`
- ECMAScript 可以表示的最大数值保存在`Number.MAX_VALUE`
- 超过或者低于这个数据范围，这个数值会自动转换为`Infinity`/ `-Infinity`

3. `NaN`: 表示本来要返回数值的操作失败了

```js
console.log(0 / 0); // NaN
console.log(-0 / +0); // NaN
```

- 任何涉及`NaN`操作始终返回`NaN`
- `NaN`不等于包含`NaN`在内的任何值

4. 数值转换

- `Number()`: 用于所有类型

```js
Number(""); // 0
Number("1234blue"); // NaN
```

- `parseInt()`: 主要用于字符串转数值

```js
parseInt(""); // NaN
parseInt("1234blue"); // 1234
```

- `parseFloat()`: 主要用于字符串转数值
- String

1. 转义字符，算一个字符长度，即`"\t".length === 1`
2. 字符串是不可变的,要修改某个变量中的字符串值，必须先销毁原始的字符串，然后将新值保存到该变量中
3. 转换为字符串

- `toString()`: 几乎所有的值都有该方法，`null`和`undefined`没有
- `String()`: 遵循如下规则
- 如果值有`toString()`方法，则调用该方法(不传参数)，并返回结果
- 如果值为`null`,返回`null`
- 如果值为`undefined`,返回`undefined`

4. 模板字符串

- 所有插入的值，都会使用`toString()`强制转型为字符串，而且任何 JavaScript 表达式都可以用于插值

- Symbol

1. 符号的基本用法

- 符号是原始值，且符号是唯一、不可变的
- 符号的用途是确保对象属性使用唯一标识符，不会发生属性冲突的危险

2. 使用全局符号注册表

- 如果程序中需要共享或者多次使用同一个符号实例，需要使用`Symbol.for()`方法。
- `Symbol.for()`发现不存在对应的符号，会生成一个新的符号实例；否则，返回原有的符号实例
- 即使采用相同的符号描述，使用`Symbol.for()`跟使用`Symbol()`定义的符号也并不相同

```js
let localSymbol = Symbol("foo");
let globalSymbol = Symbol("foo");
console.log(localSymbol === globalSymbol); // false
```

3. 常见内置符号

- ES6 引入了一批常用内置符号，这些内置符号都以`Symbol`工厂函数字符串属性的形式存在
- 这些内置符号最重要的用途之一是重新定义它们，从而改变原生结构的行为(元编程)
- 所有内置符号属性都是不可写，不可枚举，不可配置的
  **在提 ECMAScript 规范时，经常会引用符号在规范中的名称，前缀为@@。比如，@@iterator 指的就是`Symbol.iterator`**

4. Symbol.hasInstance

- 一个方法， 该方法决定一个对象是否为一个构造器函数的实例
- 在 ES6 中，`instanceof` 操作符会使用 `Symbol.hasInstanceof` 函数来代替

```js
class Bar {}
let b = new Bar();
console.log(b instanceof Bar); // true
console.log(Bar[Symbol.hasInstance](b)); // true
```

- 这个属性定义在`Function`的原型上，因此默认在所有的函数和类上都可以调用

5.  Symbol.iterator

- 一个方法，该方法是一个迭代器函数
- 由`for-of`语句使用

6.  Symbol.toPrimitive

- 一个方法，该方法将对象转换为相应的原始值

7.  Symbol.toStringTag

- 一个属性，该属性表示对象默认字符串描述
- `Object.prototype.toString()`返回该属性值

```js
let s = new Set();
console.log(s.toString()); // [object Set]
console.log(s[Symbol.toStringTag]); // Set
```

- Object

1. ECMAScript 中的对象其实就是一组数据和功能的集合
2. 每个`Object`实例都有如下属性和方法

- `construct`：创建当前对象的函数
- `hasOwnProperty([propertyName])`: 用于判断当前对象实例（不是原型）上是否存在给定的属性
- `isPrototypeOf([object])`: 用于创建当前对象是否为另一个对象的原型
- `prototypeIsEnumerable([propertyName])`: 用于判断给定的属性是否可以使用`for-in`语句进行枚举
- `toLocalString()`: 返回对象的字符串表示，该字符串反映对象所在的本地化执行环境
- `toString()`: 返回对象的字符串表示
- `valueOf()`: 返回对象对应的字符串、数值或者布尔值

### 操作符

1. 位操作符

- 按位非：

1. 用波浪符（~）表示
2. 最终结果时对数值取反并减一
3. 可以用来取整

```js
~~3.1; // 3
~~3.5; // 3
```

- 按位与

1.  用和号（&）表示
2.  可以用来判断一个数是否为奇数还是偶数

```js
3 & 1; // 1
2 & 1; // 0
```

- 按位或

1.  用管道符（|）表示

- 按位异或

1.  用脱字符（^）表示

- 左移

1.  用两个小于号（<<）表示
2.  用来进行幂加速

```js
2 << 2; // 8
(2 * 2) ^ 2; // 8
3 << 2; // 12
(3 * 2) ^ 2; // 12
```

- 右移
  1. 用两个大于号（>>）表示
  2. 用来进行幂加速
  ```js
  12 >> 2; // 3
  12 / (2 * 2); // 3
  9 >> 2; // 2
  9 / (2 * 2); // 2.25
  ```

2. 布尔操作符

- 逻辑非

1. 用一个感叹号(!)表示

- 逻辑与

1. 用两个和号(&&)表示

### 流控制语句

### 理解函数
