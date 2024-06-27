# git

```shell
git init # 初始化
git log # 查看历史
git branch XXX # 创建一个新的分支
git branch -f XXX YYY # 强行移动分支dan
git branch -u origin/YYY XXX # 分支xxx追踪远程 origin/YYY
git checkout XXX # XXX分支名，切换分支；XXX提交记录，HEAD指向当前提交记录
git checkout -b XXX # 创建分支XXX，并且切换到XXX上
git checkout -b XXX origin/YYY ## 创建分支XXX，最终远程origin/YYY
git add # 将修改内容提交到暂存区
git commit # 将暂存区内容提交
git commit -m '' # 带msg提交
git commit --amend # 修改上一次提交
git push # 将本地代码推送到远程仓库
git push origin XXX # 将本地XXX分支上的代码推送到远程仓库XXX分支上
git push origin XXX:YYY # 将本地XXX分支/提交记录上的代码推送远程仓库YYY分支上
git push origin :YYY # 删除远程分支YYY
git merge XXX # 合并两个分支，生成新的记录
git merge --abort
git rebase XXX YYY # 将YYY分支新提交复制到XXX
git rebase -i # 打开交互式窗口，可以修改删除提交记录
git rebase --abort # 撤销合并
git revert # 新的提交记录来承载撤回操作，适用于恢复远程记录；恢复哪一步操作
git reset # 把分支记录回退几个提交记录，适用于回退本地的提交记录； 撤销到哪步操作
git cherry-pick # 挑选几条记录
git tag xxx YYY # 在YYY提交记录中，打上xxx标签
git tag -d # 删除tag
git describe --tag YY # 距离YY最近的标签
git fetch # 将代码拉取到origin对应的分支上
git fetch origin XXX:YYY # 将远程XXX的分支/提交记录拉取到本地YYY分支
git fetch origin :YYY # 在本地创建一个YYY的分支
```

## 常见问题

"warning: LF will be replaced by CRLF"
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
