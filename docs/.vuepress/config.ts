/*
 * @LastEditors: chenlu chenlu0917boy@163.com
 * @Date: 2022-07-18 16:58:14
 * @LastEditTime: 2023-04-17 22:28:57
 * @FilePath: \blog\docs\.vuepress\config.ts
 */
import { defaultTheme, defineUserConfig } from "vuepress";
import { searchPlugin } from "@vuepress/plugin-search";
import { copyCodePlugin } from "vuepress-plugin-copy-code2";

export default defineUserConfig({
  lang: "zh-CN",
  title: "你好， 未来的我",
  description: "记录个人学习资料",
  head: [
    [
      "link",
      { rel: "reload", href: "https://vuejs.org/images/logo.png", as: "image" },
    ],
    ["link", { rel: "icon", href: "https://vuejs.org/images/logo.png" }],
  ],
  // 默认主题配置
  theme: defaultTheme({
    // 侧边栏配置
    sidebar: "auto",
    // 顶部导航配置
    navbar: [
      // NavbarItem
      {
        text: "Foo",
        link: "/foo/",
      },
      // NavbarGroup
      {
        text: "Group",
        children: ["/group/foo.md", "/group/bar.md"],
      },
      // 字符串 - 页面文件路径
      "/bar/README.md",
    ],

    // URL
    logo: "https://vuejs.org/images/logo.png",
  }),
  plugins: [
    // 搜索插件
    searchPlugin({}),
    copyCodePlugin({
      showInMobile: true, //是否显示在移动端
    }),
  ],
});
