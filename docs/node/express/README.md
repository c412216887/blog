# Express框架

## 概念
APP: express()返回一个App对象
Router:   
-  一个APP对象只包含一个Router对象
-  Router对象中一个stack数据里面存放APP对象中存放所有的Layer对象
Route:
Layer: 一个use(中间键)、"method"(请求方式)会创建一个Layer对象

## Q & A
Q: 最简主流程?
- 中间键和api请求，都会创建Lay对象存放在Router对象中，然后执行Router对象中handle方法依次**同步**执行Layer
Q: 中间键和api请求的区别？
- 中间键的Layer中route属性为undefined, 
- api请求方式的Layer中route属性为Route对象
