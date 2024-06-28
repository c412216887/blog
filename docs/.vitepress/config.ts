/*
 * @LastEditors: chenlu chenlu0917boy@163.com
 * @Date: 2022-07-18 16:58:14
 * @LastEditTime: 2023-04-17 22:28:57
 * @FilePath: \blog\docs\.vuepress\config.ts
 */
import { defineConfig } from "vitepress";

export default defineConfig({
  base: "/blog/",
  lang: "zh-CN",
  title: "记录个人学习资料",
  description: "记录个人学习资料",
  head: [
    [
      "link",
      { rel: "reload", href: "https://vuejs.org/images/logo.png", as: "image" },
    ],
    ["link", { rel: "icon", href: "https://vuejs.org/images/logo.png" }],
  ],
});
