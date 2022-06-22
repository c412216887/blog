# commander

## 1. commander是什么？
完整的nodejs命令行解决方案。给当前文件或者命令设置选项或者子命令，然后根据相关选项或者命令做出相关的行为

## 2. commander核心概念
- program：commander直接导出了program，也可以通过实例化command来生成
- option：选项
- command：命令

## 3. program
为了简化使用commander提供了一个全局对象。
```js
// commonjs
const {program} = require('commander')
// esmodule
import {program} from 'commander'
```
也可以通过实例化Command类来创建```program```
```js
const {Command} = require('command')
const program = new Command()
```

## 4. option选项和选项参数
1. 添加选项  
- 使用```option()```方法来定义选项，每个选项可以定义短选项名称(-后面接单个单词)和一个选项名称(--后面接单个或者多个单词，多个单词之间用-隔开),短选项名称和长选项名称之间使用','、空格或者'|'分隔。
- 使用```addOption()```方法来定义比较复杂的选项，每个选项使用```new Option()```来创造

2. 获取选项和选项参数  
解析后(调用parse()方法之后)的选项可以通过program上的```opts()```方法获取，同时会被传递到命令处理函数```action()```中。
- 对于多个单词的长选项,选项名称会转为驼峰(camel-case), 例如：```--template-engine```选项可以通过```program.opts().templateEngine```获取  
- 对于```--no-```开头的反向选项，直接通过选项名获取，例如：```--no-template```选项可以通过```program.opts().template```获取  
- 在命令行中，选项及其选项参数可以使用空格分隔，也可以组合成一个参数。选项参数可以直接跟在短选项之后，也可以在长选项后面加上'='
```
serve -p 80
serve -p80
serve --port 80
serve --port=80
```
3. 常见选项类型
- 如果在命令行中没有指定具体的选项和选项参数，
   - 没有设置默认值，则会被定义为undefined
   - 如果有设置默认值，则为具体的默认值
- 选项无需配置选项参数时，会被定义为boolean类型
- 选项可以设置选项参数时，值为具体的选项参数
   - 选项拥有必要的选项参数时，即使设置了默认值，在命令行中，选项后面也要跟上选项参数

4. 选项其他特性
- 必填选项：  
通过```requiredOption()```方法可以设置选项必填，必填选项要么设置默认值，要么在命令行中输入。
- 变长选项参数：   
在定义选项参数时，可以设置选项参数为可变长参数，在命令行中，用户可以输入多个参数，解析后会以数组形式存储在对应的属性字段中。
   - 在输入下一个选项前(-或者--开头)，用户输入的指令均会被视为变长选项参数，
   - 可以通过```--```强制结束边长选项参数

## 5. 命令
1. 增加命令：    
- 使用```command()```方法增加命令
- 使用```addCommand()```方法增加命令

## 6. 命令参数
1. 定义命令参数    
- 命令参数可以直接使用```command()```方法，跟在命令名称后面
- 命令参数可以使用```argument()```方法
```js
program
.argument('<user>', 'user to login') // 必填命令参数
.argument('<password>', 'password for user, if required', 'no password gived') // 可选命令参数
.parse()
```
2. 可变命令参数，在参数后面跟上```...```
```js
program
.argument('<dir...>')
.parse()
```
3. 自定义参数处理函数
```js
function sum(value, total) {
  return total + parseInt(value)
}
program
.argument('<value...>', 'values to be summed', sum, 0)
.parse()
```

## 7. 处理函数
**命令**处理函数的参数，为该命令声明的所有参数，除此之外还会附加两个额外参数： 1，解析出来的选项，2，该命令对象本身
- 处理函数(action())只是针对命令而言，不是选项。
- 处理函数如果存在异步操作，需要使用```parseAsync()```方法解析


