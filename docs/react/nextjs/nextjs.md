以下是一份详细的 Next.js 开发使用文档，涵盖从环境搭建到高级功能的各个方面。适合新手入门和开发者快速查阅。

Next.js 开发使用文档
1. 简介
Next.js 是一个基于 React 的全栈框架，提供以下核心功能：
● 静态站点生成（SSG）：预渲染静态 HTML（getStaticProps）。
● 服务器端渲染（SSR）：动态渲染 HTML（getServerSideProps）。
● 混合渲染：结合客户端和服务器端渲染。
● API 路由：在服务端直接编写 API 端点。
● TypeScript 支持：开箱即用。
● 路由系统：基于文件系统的动态路由。

2. 环境搭建
2.1 安装 Node.js
● 版本要求：Node.js 16.x 或更高版本。
● 安装命令：
2.2 创建 Next.js 项目
# 安装 create-next-app
npx create-next-app@latest my-next-app

# 进入项目目录
cd my-next-app

# 启动开发服务器
npm run dev
2.3 项目结构
典型目录结构如下：
my-next-app/
├── node_modules/
├── public/          # 静态资源（图片、favicon等）
├── pages/           # 核心路由文件夹
│   ├── api/         # API 路由
│   ├── [slug].js    # 动态路由示例
│   └── index.js     # 首页
├── styles/          # 样式文件
├── package.json
└── next.config.js   # Next.js 配置文件（可选）

3. 核心概念
3.1 App Router 与 Pages Router
Next.js有两种不同的路由器：App Router 和Pages Router。
3.1.1 App Router是一种较新的路由器，允许
3.1 页面路由
● 静态路由：在 pages/ 下创建文件名即为路由路径，例如：
● 动态路由：使用 [slug].js 命名，例如：
3.2 API 路由
在 pages/api/ 下创建文件，自动暴露为 API 端点：
// pages/api/hello.js
export default function handler(req, res) {
  res.status(200).json({ message: 'Hello World!' });
}
访问路径：/api/hello
3.3 数据获取
Next.js 提供多种数据获取方式：
3.3.1 静态生成（SSG）
// pages/index.js
export async function getStaticProps() {
  const data = await fetch('https://api.example.com/data').then(res => res.json());
  return { props: { data }, revalidate: 10 } // 10秒后重新生成
}
3.3.2 服务器端渲染（SSR）
// pages/ssr-page.js
export async function getServerSideProps(context) {
  const data = await fetch('https://api.example.com/data').then(res => res.json());
  return { props: { data } }
}
3.3.3 客户端获取（SWR 或 useEffect）
import useSWR from 'swr';

function Profile() {
  const { data, error } = useSWR('/api/user', fetch);
  return <div>{data ? data.name : 'Loading...'}</div>;
}

4. 样式与布局
4.1 内联样式与 CSS Modules
// pages/index.js
import styles from './index.module.css';

function Home() {
  return <div className={styles.container}>Hello World!</div>;
}
4.2 全局样式
在 styles/globals.css 中编写全局样式，Next.js 会自动引入。
4.3 第三方样式库
使用 Tailwind CSS：
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
在 tailwind.config.js 中配置：
module.exports = {
  content: ["./pages/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
  },

  plugins: [ ],

}

5. 部署
5.1 部署到 Vercel（官方推荐）
1. 登录 Vercel 并连接 GitHub/GitLab 仓库。
2. 选择 Next.js 项目并部署。
3. 配置环境变量（如 API 密钥）。
5.2 其他部署平台
Netlify：
# 安装构建工具
npm install --save netlify-cli

# 配置 netlify.toml
[build]
  command = "npm run build"
  publish = "out"
自托管：
# 构建生产版本
npm run build

# 启动生产服务器
npm start

6. 常见问题
问题 1：热重载不生效？
● 检查文件扩展名是否为 .js 或 .jsx。
● 重启开发服务器：npm run dev。
问题 2：404 页面配置？
在 pages/404.js 中编写自定义 404 页面。
问题 3：样式未生效？
● 确保 CSS 文件在 pages/ 或 styles/ 目录中。
● 检查 CSS Modules 的导入语法是否正确。

7. 最佳实践
1. 代码分割：使用 next/dynamic 按需加载组件。
2. 环境变量：

    ○ 在 .env.local 中定义本地变量（如 NEXT_PUBLIC_API_URL）。
    ○ 前端可访问的变量需以 NEXT_PUBLIC_ 开头。
3. TypeScript：

    ○ 安装类型定义：npm install --save-dev @types/react。
    ○ 使用 .tsx 扩展名。

8. 进阶功能
8.1 国际化路由
在 next.config.js 中配置多语言：
module.exports = {
  i18n: {
    locales: ['en', 'zh'],
    defaultLocale: 'en',
  },
}
创建 pages/[lang]/about.js 支持多语言路由。
8.2 中间件
在 middleware.js 中处理请求：
export function middleware(request) {
  const response = new Response('Hello, Next.js Middleware!');
  return response;
}
8.3 自定义配置
在 next.config.js 中扩展配置：
module.exports = {
  images: {
    domains: ['example.com'], // 允许的图片域名
  },
  experimental: {
    appDir: true, // 启用 App Router 实验功能
  },
}

9. 参考资料
● 官方文档：https://nextjs.org/docs
● 社区资源：

    ○ GitHub：https://github.com/vercel/next.js
    ○ Discord：https://discord.gg/nextjs

希望这份文档能帮助你高效开发 Next.js 应用！如果有任何问题或需要进一步扩展，请随时提问。
