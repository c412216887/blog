# TypeScript

## 什么是 TypeScript

## `tsconfig.json`生效

1. `tsc --build tsconfig.json` 手动指定配置文件
2. `tsc` 自动获取工程根目录中的配置文件
3. `tsc [file]` 自动获取全局的配置文件，这种不会获取工程中的配置文件

## monorepo 配置文件

1. `packages` 里面子工程存在`tsconfig.json`时，运行`tsc`只获取子工程中的配置文件
2. `packages` 里面子工程不存在`tsconfig.json`时，运行`tsc`，获取工程根目录中的配置文件
3. `packages` 里面子工程存在`tsconfig.json`时，可以在配置文件中使用`extends`来引用工程根目录中的配置文件

```json
{
  "extends": "",
  "compilerOptions": {}
}
```

## TypeScript 配置项

- compilerOptions  
  `/*Basic Option*/`

  - target: 编译输出，使用的 ES 版本
  - module: 编译输出，使用的模板规划。只有 commmjs、UMD、esnext 等
  - lib: 需要的内置对象, 例如：`esnext`/`dom` node 环境需要手动安装`@types/node`
  - sourceMap: 是否生成 map 文件
  - outDir: 编译输出的文件夹, 可以指定为 `dist` 文件
  - rootDir: 编译开始的的入口, 一般默认为程序运行的入口文件，不需要特别指定
  - isolatedModules: 将 ts 文件当作单独的模块处理，表现为每个文件必须存在导入或者导出

  `/* Strict Type-Checking Options */`

  - strict: 是否启动严格模式

  `/* Module Resolution Options */`

  - moduleResolution: 代码中模块引入的方案，需要设置为"node", module 设置为 esnext 时，必须设置这个值。
  - esModuleInterop: commonjs 与 esModule 之间相关转换
  - declaration: 是否生成.d.ts 文件
  - declarationDir: 生成.d.ts 文件的输出目录
  - skipLibCheck: 跳过.d.ts 类型检查
  - resolveJsonModule: 项目中引入 json 文件则需要将该选项设置为 true

- include 指定需要编译处理的文件列表，支持`glob`模式匹配，文件的解析路径相对于当前项目的`tsconfig.json`文件位置
  1. 如果指定了`files`选项值，则`includes`的默认值为`[]`,否则默认包含当前项目中所有的文件`[**/*]`
  2. 支持的通配符
  - `*`匹配零个或者多个字符(包括目录分隔符)
  - `?`配置任一字符(包括目录分隔符)
  - `**/`配置任何层级的嵌套目录
  3. 在使用`glob`模式匹配时，如果没有明确指定文件扩展名，那么默认包含`.ts`、`.tsx`和 `.d.ts`。如果`allowJs`选项被设置成`true`,那么`.js`和`.jsx`文件也会被包含其中  
     **在 `vscode` 中, `include` 包含的文件，ts 报错会出现红色提示，不包含的文件，只会出现白色提示。**  
     **`include` 中主要是包含一些类型文件。**

## Q & A

**Q**: declare 和 type 有什么区别  
**A**: declare 默认 js 空间已经存在着这个变量，现在对这个变量赋予类型，或者拓展类型  
 type 只是在 ts 空间增加一个新的类型

type 和 interface，可以交杂拓展。也就是说，type 和 interface 内部是互换的，type 在被使用在 implement 或者 extends 的时候，会自动转换为 interface

**Q**: 三种使用大括号定义的类型(interface、type、enum)  
**A**:

```
interface IA {
  a(key: string): string,
}
type A = (key: string) = > string
enum B {
  "men" = 1,
}
```

**Q**: 配置多个 tsconfig.json 文件的原因  
**A**：主要是因为 eslint 使用@typescript-eslint/parser 时，需要引入 tsconfig.json.而像 jest 这样测试文件，输出的文件，便不需要测试文件，这样就需要另外一个 tsconfig 文件单独提供给 eslint 使用

**Q**: 对象、联合类型除去指定/获取类型  
**A**:

- 对象，Pick、Omit;
- 联合类型, Exclude、Extract

**Q**: & 和 | 运算符  
**A**:

- 联合类型: & 是获取两个联合类型共有部分， | 是合并两个联合类型
- 对象: & 是合并两个对象， | 相当于是获取两个对象共有部分，但并不完全是

Q: 判断是否为联合类型
A:

```typescript
type IsUnion<T, C = T> = T extends C ? ([C] extends [T] ? false : true) : never;
```
