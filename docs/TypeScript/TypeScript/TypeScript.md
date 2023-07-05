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
  _Basic Option_

  - **target: 编译输出，使用的 ES 版本**
  - **module: 编译输出，使用的模板规划。只有 commmjs、UMD、esnext 等**
  - **lib: 需要的内置对象, 例如：`esnext`/`dom` node 环境需要手动安装`@types/node`**
  - declaration: 每个 ts 文件生成一个`js`文件和一个`.d.ts` 类型文件, declaration 和 allowJs 不能同时设为 true
  - declarationDir: 生成.d.ts 文件的输出目录
  - declarationMap: 生成.d.ts 类型文件的映射文件
  - sourceMap: 是否生成 map 文件
  - outFile: 编译输出的文件
  - outDir: 编译输出的文件夹, 可以指定为 `dist` 文件
  - rootDir: 编译开始的的入口, 一般默认为程序运行的入口文件，不需要特别指定
  - **isolatedModules: 将 ts 文件当作单独的模块处理，表现为每个文件必须存在导入或者导出**
  - jsx: 针对 jsx 执行相关编译。有效值为`preserve`(保持不变),`react-native`, `react`
  - allowJs: 允许编译 js 文件,不能和 declaration 同时设置为 true
  - checkJs: 检测 JS 的语法
    _Strict Type-Checking Options_

  - **strict: 是否启动严格模式**

  _Module Resolution Options_

  - **moduleResolution: 代码中模块引入的方案，需要设置为"node"。module 设置为 esnext 时，必须设置这个值。**
  - **esModuleInterop: commonjs 与 esModule 之间相互引入，允许使用 import 引入使用 exports=导出的内容**
  - **resolveJsonModule: 项目中引入 json 文件则需要将该选项设置为 true**

  _Advanced Options_

  - **skipLibCheck: 跳过.d.ts 类型检查**
  - forceConsistentCasingInFileNames: 引入模块的地址与模块的文件名的大小写必须一致

  ```js
  // Foo.ts
  export function Foo() {}
  // Main.ts
  import { Foo } from "./foo"; // forceConsistentCasingInFileNames设置为false时，可以这样引入Foo文件
  import { Foo } from "./Foo"; // forceConsistentCasingInFileNames设置为ture时，只能这样引入Foo文件
  ```

- include 指定需要编译处理的文件列表，支持`glob`模式匹配，文件的解析路径相对于当前项目的`tsconfig.json`文件位置

  1. 如果指定了`files`选项值，则`includes`的默认值为`[]`,否则默认包含当前项目中所有的文件`[**/*]`
  2. 支持的通配符

     - `*`匹配零个或者多个字符(包括目录分隔符)
     - `?`配置任一字符(包括目录分隔符)
     - `**/`配置任何层级的嵌套目录

  3. 在使用`glob`模式匹配时，如果没有明确指定文件扩展名，那么默认包含`.ts`、`.tsx`和 `.d.ts`。如果`allowJs`选项被设置成`true`,那么`.js`和`.jsx`文件也会被包含其中

  ```json
  {
    "include": ["src/**/*.ts"]
  }
  ```

- exclude 用于指定当解析`include`选项时，需要忽略的文件列表。

  1. exclude 的默认值是`["node_module", "bower_components", "jspm_packages"]`加上`outDir`选项指定的值

- files 用来指定需要编译的文件列表(只能是文件，不能是文件夹)
  1. `files`中指定的文件要是找不到，则会出现报错
  2. 只适用于指定的文件比较少，并且不需要使用 glob 模式匹配的情况

```json
{
  "compilerOptions": {},
  "files": ["types.ts"]
}
```

**在 `vscode` 中, `include` 包含的文件，ts 报错会出现红色提示，不包含的文件，只会出现白色提示。**  
**`include` 中主要是包含一些类型文件。**

## vscode 调试 ts 文件

1. 安装 vscode 插件`TypeScript Debugger`
2. 在项目根目录中创建`tsconfig.json`
3. 在项目中添加`ts-node`依赖
4. 在 vscode 运行调试中选择名为'ts-node'

## Q & A

**Q**: declare 和 type 有什么区别  
**A**: declare 默认 js 空间已经存在着这个变量，现在对这个变量赋予类型，或者拓展类型  
 type 只是在 ts 空间增加一个新的类型

type 和 interface，可以交杂拓展。也就是说，type 和 interface 内部是互换的，type 在被使用在 implement 或者 extends 的时候，会自动转换为 interface

**Q**: 三种使用大括号定义的类型(interface、type、enum)  
**A**:

```
interface IA {
  a(key: string): string;
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

- Pick<Type, Keys>: 从一个对象类型中提取指定属性，生成新的对象类型

```ts
interface Todo {
  title: string;
  description: string;
  completed: boolean;
}
type TodoPreview = Pick<Todo, "title" | "completed">;
const todo: TodoPreview = {
  title: "",
  completed: false,
};
```

- Omit<Type, keys>: 从一个类型中移除指定的属性，生成新的对象类型;

```ts
interface Todo {
  title: string;
  description: string;
  completed: boolean;
}
type TodoPreview = Omit<Todo, "description">;
const todo: TodoPreview = {
  title: "",
  completed: false,
};
```

- Exclude<UnionType, ExcludeMembers>: 从一个联合类型中移除指定成员，生成新的联合类型

```ts
type T0 = Exclude<"a" | "b" | "c", "a">; // To = "b" | "c"
type T1 = Exclude<"string" | "number" | (() => void), Function>; // T1 = "string" |"number"
type Shape =
  | { king: "cicle"; radius: number }
  | { king: "square"; x: number }
  | { king: "triangle"; x: number; y: number };
type T2 = Exclude<Shape, { king: "cicle" }>;
/**
 * T2 = {king: "square"; x: number} | {king: "triangle"; x: number; y: number}
 *  */
```

- Extract<Type, Union>: 从两个联合类型中，提取交集，生成新的联合类型

```ts
type T0 = Extract<"a" | "b" | "c", "a">; // To = "a"
type T1 = Extract<"string" | "number" | (() => void), Function>; // T1 = () => void
type Shape =
  | { king: "cicle"; radius: number }
  | { king: "square"; x: number }
  | { king: "triangle"; x: number; y: number };
type T2 = Exclude<Shape, { king: "cicle" }>;
/**
 * T2 = { king: "cicle"; radius: number }
 *  */
```

**Q**: & 和 | 运算符  
**A**:

- 联合类型: & 是获取两个联合类型共有部分， | 是合并两个联合类型
- 对象: & 是合并两个对象， | 相当于是获取两个对象共有部分，但并不完全是

**Q**: 判断是否为联合类型  
**A**:

```typescript
type IsUnion<T, C = T> = T extends C ? ([C] extends [T] ? false : true) : never;
```
