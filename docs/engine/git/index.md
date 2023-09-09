# git

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
