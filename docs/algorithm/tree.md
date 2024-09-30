# 树



## 二叉树
## 几种特殊的二叉树
### 完全二叉树
1. 概念    
  完全二叉树：若二叉树的深度为h，除第h层外，其他层的结点全部达到最大值，且第h层叶子结点从左到右连续分布。
2. 特性
  - 可以快速的获取当前节点的父节点和左右子节点
```js
// 完全二叉树，使用数组表示
const completeBinaryTree = []
/**
 * @param {number} nodeIndex 节点索引
 */
function getParent(nodeIndex) {
  return completeBinaryTree[Math.floor((nodeIndex - 1) / 2)]
}
/**
 * @param {number} nodeIndex 节点索引
 */
function getLeft(nodeIndex) {
  return completeBinaryTree[nodeIndex * 2 + 1]
}
/**
 * @param {number} nodeIndex 节点索引
 */
function getRight(node) {
  return completeBinaryTree[nodeIndex * 2 + 2]
}
```
  - 可以通过层序遍历获取所有节点
```js

```
  
### 满二叉树
1. 概念
  满二叉树：每一层的节点数都是满的，并且所有叶子节点都在同一层级上
2. 特性
  - 对于高度为h的满二叉树，其节点个数为2^h - 1
  - 满二叉树一定是完全二叉树，拥有所有完全二叉树的特性

### 搜索二叉树
