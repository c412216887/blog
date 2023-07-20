/*
 * @LastEditors: chenlu chenlu0917boy@163.com
 * @Date: 2023-04-17 11:16:05
 * @LastEditTime: 2023-04-17 17:48:12
 * @FilePath: \blog\generateCatalog.js
 */
// 生成目录
import path from "node:path"
import fs from "node:fs"
const docDir = path.resolve("", './docs/')
// 遍历dicDir里面所有的文件夹
fs.readdir(docDir, (e, data) => {
  if (e) {
    return
  }
  const catalog = generateCatalog(data)
  // 写入文件
  fs.writeFileSync(path.join(docDir, 'README.md'), catalog)
})
// 将文件夹名和文件夹下面的readme里面的内容生成目录

function generateCatalog(dirnames) {
  let catalog = "# 你好，未来的我 \n";
  dirnames.forEach(dirname => {
    // 排除.vuepress和readme
    if (dirname !== "README.md" && !dirname.startsWith(".")) {
      // 类别文件下面的readme路径
      const classReadmePath = path.join(docDir, "/", dirname, "/readme.md")
      const relativePath = path.relative("./docs", classReadmePath)
      catalog += `## [${dirname}](./${relativePath.replaceAll(path.sep, '/')})   \n`
    };
  })
  return catalog
}
