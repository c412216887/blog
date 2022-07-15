import { defaultTheme, defineUserConfig } from "vuepress";

export default defineUserConfig({
  lang: "zh-CN",
  title: "你好， VuePress ！",
  description: "这是我的第一个 VuePress 站点",
  // 默认主题配置
  theme: defaultTheme({
    // 顶部导航栏
    sidebar: [
      {
        text: "前言",
        link: "/",
      },
      {
        text: "HTML",
        link: "/HTML",
      },
      {
        text: "CSS",
        link: "/CSS",
      },
      {
        text: "Vue",
        link: "/vue",
      },
      {
        text: "typescript",
        link: "/TypeScript",
      },
      {
        text: "工程化",
        link: "/engine",
      },
      {
        text: "npm应用",
        link: "/npm",
      },
      {
        text: "npm包",
        link: "/third-part",
      },
      {
        text: "数据结构与算法",
        link: "algorithm",
      },
      {
        text: "vim",
        link: "/vim",
      },
      {
        text: "demo",
        link: "/demo",
      },
    ],
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
});
