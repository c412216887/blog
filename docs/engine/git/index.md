# git

```shell
git init # 初始化
git log # 查看历史
git branch [分支名] # 创建一个新的分支
git branch -f XXX YYY # 强行移动分支dan
git branch -u origin/YYY [本地分支名] # 【本地分支】追踪远程 origin/YYY
git checkout [分支名] # 切换分支，HEAD指向当前提交记录
git checkout -b [分支名] # 创建分支，并且切换到分支上
git checkout -b [分支名] origin/YYY # 创建新分支，来追踪远程分支origin/YYY
git add . # 将所有修改内容提交到暂存区
git commit # 将暂存区内容提交
git commit -m '' # 带msg提交
git commit --amend # 修改上一次提交
git push # 将本地代码推送到远程仓库
git push origin XXX # 将本地XXX分支上的代码推送到远程仓库XXX分支上
git push origin XXX:YYY # 将本地XXX分支/提交记录上的代码推送远程仓库YYY分支上
git push origin :YYY # 删除远程分支YYY
git merge XXX # 将分支XXX与当前分支进行合并，同时生成新的提交记录
git merge --abort # 撤销合并
git rebase XXX YYY # 将YYY分支新提交复制到XXX，同时生成新的提交记录
git rebase -i # 打开交互式窗口，可以修改删除提交记录
git rebase --abort # 撤销合并
git revert # 新的提交记录来承载撤回操作，适用于恢复远程记录；恢复哪一步操作
git reset # 把分支记录回退几个提交记录，适用于回退本地的提交记录； 撤销到哪步操作
git cherry-pick # 挑选几条记录
git tag xxx YYY # 在YYY提交记录中，打上xxx标签
git tag -d # 删除tag
git push origin [标签名] # 将本地标签推送到远程仓库
git describe --tag YY # 距离YY最近的标签
git fetch # 将代码拉取到origin对应的分支上
git fetch origin XXX:YYY # 将远程XXX的分支/提交记录拉取到本地YYY分支
git fetch origin :YYY # 在本地创建一个YYY的分支
git rm FFF # 删除某个文件
git add FFF ## 增加文件
git mv -f [删除文件] [增加的文件]
```

## 常见问题

:::
"warning: LF will be replaced by CRLF"
:::

- 原因分析
  主要是因为 git 的配置项`core.autocrlf`。多平台合作时，因为 Macbook 和 window 的结束符不一致，所以存在这个种选项
  `false`表示取消自动转换功能。适合纯 Windows
  `true`表示提交代码时将 CRLF 转化成 LF，签出时 LF 转换成 CRLF。适合多平台协作
  `input`表示提交时把 CRLF 转换为 LF，签出时不转换，适合纯 Linux 或 Macbook

- 最优解法
  设置 core.autocrlf=false,windows 也用 LF 换行

```shell
git config --global core.autocrlf false
```

设置一个`.editorconfig`来保证文件都是 LF 结尾
:::
github 上文件/文件夹名称大小写跟本地的不一致
:::

- 原因分析
  这个行为是由文件系统的不同规则引起的。

  在类 Unix 文件系统（例如 Linux 和 macOS）上，文件名是区分大小写的，  
  而在 Windows 文件系统上，默认情况下是不区分大小写的。

- 解决方案

1.  使用 git mv 命令修改文件名

```shell
 git mv -f [删除文件] [留下的文件]
# 等同于
 git rm a.js
 git add A.js
```

2. 关闭 git 忽略大小写配置

```shell
git config core.ignorecase false
```
