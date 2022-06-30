# TypeScript

## 什么是TypeScript


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
type A = a(key: string) = > string
enum B {
  "men" = 1
}
```
