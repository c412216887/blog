# yaml

## 简介

它的实质上是一种通用的数据串行化格式  
它的基本语法

- 大小写敏感
- 使用缩进表示层级关系
- 缩进时不允许使用 Tab 键，只允许使用空格
- 缩进的空格数目不重要，只要相同的层级的元素左侧对齐即可

`#`表示注释，从这个字符一直到行尾，都会被解析器忽略

`YAML`支持的数据结构有三种

- 对象： 键值对的集合，又称为映射(map) / 哈希(hash) / 字典(dictionary)
- 数组： 一组按次序排序的值， 又称为序列(sequence) / 列表(list)
- 纯量： 单个的、不可再分的值

## 对象

对象的一组键值对，使用冒号结构表示

```yaml
animal: pets
```

转为 json 如下

```json
{ "animal": "pets" }
```

Yaml 也允许另一种写法，将所有的键值对写成一个行内对象

```yaml
hash: { name: Steve, foo: bar }
```

转为 Json 如下

```json
{ "hash": { "name": "Steve", "foo": "bar" } }
```

## 数组

一组连词线开头的行，构成一个数组

```yaml
- Cat
- Dog
- Goldfish
```

转成 Json 如下

```json
["Cat", "Dog", "Goldfish"]
```

数组结构的子成员是一个数组，则可以在该项下面缩进 n 个空格

```yaml
- - Cat
  - Dog
  - Goldfish
```

转为 Json 如下

```json
[["Cat", "Dog", "Goldfish"]]
```

数组也可以采用行内表示法

```yaml
animal: [Cat, Dog]
```

转为 Json 如下

```json
{ "animal": ["Cat", "Dog"] }
```

## 复合结构

对象和数组可以结合使用，形成复合结构

```yaml
language:
  - Ruby
  - Perl
  - Python
websites:
  YAML: yaml.org
  Ruby: ruby-lang.org
  Python: python.org
  Perl: use.perl.org
```

转为 Json 如下

```json
{
  "language": ["Ruby", "Perl", "Python"],
  "websites": {
    "YAML": "yaml.org",
    "Ruby": "ruby-lang.org",
    "Python": "python.org",
    "Perl": "use.perl.org"
  }
}
```

## 纯量

纯量是最基础的，不可再分的值，以下都是`yaml`的纯量，也就是基本类型

- 数值
- 布尔值
- Null
- 时间
- 日期
- 字符串  
  数值直接使用字面量

```yaml
number: 12.30
```

转化为 json 如下

```json
{ "number": 12.3 }
```

布尔值使用`true`和`false`

```yaml
isSet: true
```

转为 Json 如下

```json
{
  "isSet": true
}
```

`null`使用`~`表示

```yaml
parent: ~
```

转化为 json 如下

```json
{ "parent": null }
```

时间采用 ISO8601

```yaml
iso: 2001-12-14t21:59:43-05:00
```

转为`Javascript`如下

```javascript
{
  iso: new Date("2001-12-14t21:59:43-05:00");
}
```

日期采用复合 iso8601 格式的年、月、日表示

```yaml
date: 1976-07-31
```

转换为`Javascript`如下

```javascript
{
  date: new Date("1976-07-31");
}
```

强制转换： YAML 允许使用两个感叹号，强制转换数据类型

```yaml
e: !!str 123
f: !!str true
```

转换为 Json 如下

```json
{
  "e": "123",
  "f": "true"
}
```

## 字符串

字符串是最常见，也是最复杂的一种数据类型

字符串默认不使用引号表示

```yaml
str: 这是一行字符串
```

转换为 Json 如下

```json
{ "str": "这是一行字符串" }
```

如果字符串中包含空格或特殊字符，需要放在引号之中

```yaml
str: "内容： 字符串"
```

转换为 Json 如下

```yaml
{ "str": "内容： 字符串" }
```

单引号和双引号都可以使用，单引号会对特殊字符进行转义

```yaml
s1: '内容\n字符串'
s2: "内容\n字符串"
```

转为 JSON 如下

```json
{
  "s1": "内容\\n字符串",
  "s2": "内容\n字符串"
}
```

单引号之中如果还有单引号，必须连续使用两个单引号转义

```yaml
str: 'labor''s\t  day'
```

转换为 Javascript 如下

```javascript
{
  str: "labor's\\t day";
}
```

字符串可以写成多行，从第二开始，必须有 n 个空格缩进，所缩进会转换为空格

```yaml
str: 这是一段
  多行
  字符串
```

转换为 json 如下

```json
{
  "str": "这是一段 多行 字符串"
}
```

多行字符串可以使用`|`保留换行符，也可以使用`>`折叠换行

```yaml
this: |
  Foo
  Bar
that: >
  Foo
  Bar
```

转换 json 如下

```json
{
  "this": "Foo\nBar\n",
  "that": "Foo Bar\n"
}
```

`+`表示保留文字块末尾的换行符，`-`表示删除蚊子块末尾的换行符

```yaml
s1: |
  Foo

s2: |+
  Foo

s3: |-
  Foo
```

转换 Json 如下

```json
{
  "s1": "Foo\n",
  "s2": "Foo\n\n",
  "s3": "Foo"
}
```

字符串之中可以插入 HTML 标记

```yml
message: |

  <p style="color: red">
    段落
  </p>
```

转换为 json 如下

```json
{
  "message": "/n<p style=\"color: red\">段落\n</p>\n"
}
```

## 引用

描点`&`和别名`*`

```yml
defaults: &defaults
  adapter: postgres
  host: localhost
development:
  database: myapp_development
  <<: *defaults
test:
  database: myapp_test
  <<: *defaults
```

转换为 json

```json
{
  "defaults": {
    "adapter": "postgres",
    "host": "localhost"
  },
  "development": {
    "database": "myapp_development",
    "adapter": "postgres",
    "host": "localhost"
  },
  "test": {
    "database": "myapp_test",
    "adapter": "postgres",
    "host": "localhost"
  }
}
```

`&`用来建立锚点(`defaults`), `<<`表示合并到当前数据， `*`用来引用锚点

```yml
- &showell Steve
- Clark
- Brian
- Oren
- *showell
```

转换为 json 如下

```json
["Steve", "Clark", "Brian", "Oren", "Steve"]
```
