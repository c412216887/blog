# [面试](../.)

## 常见的垂直水平居中布局

![垂直水平居中](./image/1.png)
标签分为块级标签和行内标签(可替换标签不考虑)， 外层标签只能是块级元素，则一共 2 中情况， 即

- 行内标签相当于块级标签垂直水平居中， 具体情况如下：

1. 父元素宽高固定，一行文字垂直水平居中

```css
.parent {
  text-align: "center";
  line-height: [当前高度];
}
```

2. 父元素宽高不固定，一行文字垂直水平居中  
   2.1 父元素高度是这行文字撑开，那么自身就是垂直居中

```css
.parent {
  text-align: "center";
}
```

2.2 父元素高度由设置百分比撑开(`line-height`的百分比是根据自身字体大小)

```css
/**使用table实现垂直居中 */
.parent {
  display: table; /** 宽度不会充满整行 */
  width: 100%;
}
.child {
  display: table-cell;
  vertical-align: middle;
}
/**使用grid实现垂直居中 */
.parent {
  display: grid;
}
.child {
  margin: auto;
}
/**使用write-mode */
/**只能实现垂直居中 */
.parent {
  write-mode: vertical-lr;
}
.child {
  write-mode: horizontal-tb;
}
```

3. 父元素宽高固定，多行文字垂直水平居中
   **同上**
4. 父元素宽高不固定，多行文字垂直水平居中
   **同上**

- 块级标签相当于块级标签垂直水平居中

1. 父元素宽高固定， 子元素宽高固定
   **使用 grid 布局**

```css
/**使用定位实现 */
.parent {
  position: relative;
}
.child {
  postion: absolute;
  top: 50%;
  left: 50%;
  margin-top: -[子元素高度的一半]
  margin-left: -[子元素宽度的一半]
}
```

2. 父元素宽高不固定， 子元素宽高固定

```css
/**使用定位 */
.parent {
  position: relative;
}
.child {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  margin: auto;
}
/**使用grid布局 */
.parent {
  display: grid;
}
.child {
  margin: auto;
}
```

3. 父元素宽高固定，子元素宽高不固定
   **可使用`grid`布局**
   ```css
   /**使用定位 */
   .parent {
     postion: relative;
   }
   .child {
     top: 50%;
     left: 50%;
     transform: translate(-50%, -50%);
   }
   ```
4. 父元素宽高不固定，子元素宽高不固定
   **跟上面一样**

---

总结： grid 布局可以实用所有的情况
