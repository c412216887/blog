# DOM

## 在 dom tree 中插入新的 DOM

1. `insertBefore(newNode， referenceNode)` 在参考节点之前插入新的节点  
   referenceNode 引用节点不是可选参数--必须显式传入一个 Node 或者 null

2. `insertAdjacentHTML(position, text)` 将指定的文本解析为 Element 元素，并将结果节点插入到 DOM 树中指定位置
   `insertAdjacentElement(position, element)` 将一个给定的元素节点插入到给定的位置

```html
<!-- beforebegin -->
<p>
  <!-- afterbegin -->
  foo
  <!-- beforeend -->
</p>
<!-- afterend -->
```

3. `appendChild()` 将一个节点附加到指定父节点的子节点列表的末尾处
