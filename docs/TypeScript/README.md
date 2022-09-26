# TypeScript

## 什么是TypeScript


## TypeScript配置项
- compilerOptions
    - rootDir: 编译开始的的入口
    - outDir: 编译输出的文件夹
    - target: 编译输出，使用的ES版本
    - module: 编译输出，使用的模板规划。只有commmjs、UMD、esnext等
    - moduleResolution: 代码中模块引入的方案，需要设置为"node", module设置为esnext，必须设置这个值。
    - lib: 需要的内置对象, node环境需要手动安装```@types/node```
    - sourceMap: 是否生成map文件
    - declaration: 是否生成.d.ts文件
    - declarationDir: 生成.d.ts文件的输出目录
    - strict: 是否启动严格模式
    - skipLibCheck: 跳过.d.ts类型检查
    - resolveJsonModule: 项目中引入json文件则需要将该选项设置为true

## Q & A
Q: declare 和 type 有什么区别   
A: declare 默认js空间已经存在着这个变量，现在对这个变量赋予类型，或者拓展类型    
    type 只是在ts空间增加一个新的类型 

type和interface，可以交杂拓展。也就是说，type和interface 内部是互换的，type在被使用在implement或者extends的时候，会自动转换为interface

Q: 三种使用大括号定义的类型(interface、type、enum)
```
interface IA {
  a(key: string): string,
}
type A = (key: string) = > string
enum B {
  "men" = 1,
}
```

Q: 配置多个tsconfig.json文件的原因
A：主要是因为eslint使用@typescript-eslint/parser时，需要引入tsconfig.json.而像jest这样测试文件，输出的文件，便不需要测试文件，这样就需要另外一个tsconfig文件单独提供给eslint使用


Q: 对象、联合类型除去指定/获取类型
A: 对象，Pick、Omit
  联合类型, Exclude、Extract

Q: & 和 | 运算符
A: 联合类型: & 是获取两个联合类型共有部分， | 是合并两个联合类型    
    对象: & 是合并两个对象， | 相当于是获取两个对象共有部分，但并不完全是     

Q: 判断是否为联合类型
A:
```typescript
type IsUnion<T, C = T> = T extends C ? [C] extends [T] ? false : true : never 
```
