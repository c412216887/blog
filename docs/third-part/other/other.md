# chalk

用来对输出内容增加颜色、粗细等效果

## 使用

```js
import chalk from "chalk";
chalk.green("xxxx");
```

# boxen

将输出内容包裹在一个方格中

## 使用

```js
import boxen from "boxen";
boxen("xxxx", {
  padding: 1,
  borderColor: "green",
  margin: 1,
});
```

# clipboardy

允许使用系统剪切板(复制/粘贴)

## 使用

```js
import clipboard from "clipboardy";
clipboard.writeSync("xxxx"); // 同步写入到剪切板中
clipboard.readSync(); // 同步读取剪切板
```

# arg

获取命令行上的参数, 跟 commander 使用类似

## 使用

```js
import arg from "arg";
const parsedArg = arg({
  "--listen": Number,
});
/** 示例： node . --listen 3000 */
console.log(parsedArg); // {_: [], '--listen': 3000}
```
