以下是 plasmo@0.90.5 的开发文档概述。由于 Plasmo 是一个基于 TypeScript 和 React 的浏览器扩展框架，本指南将涵盖其核心功能、配置方法和开发流程。

1. 安装与初始化
安装 Plasmo CLI
npm install -g @plasmo/cli
创建新项目
plasmo init my-extension
进入项目目录
cd my-extension
启动开发服务器
npx plasmo dev

2. 项目结构
典型的 Plasmo 项目结构如下：
my-extension/
├── public/                # 静态资源（如图标、HTML 文件）
├── src/
│   ├── background/        # 后台脚本（Background Script）
│   ├── content/           # 内容脚本（Content Script）
│   ├── popup/             # 弹出窗口（Popup）
│   └── util/              # 工具函数
├── plasmo.config.ts       # 项目配置文件
└── package.json

3. 核心配置（plasmo.config.ts）
import { defineConfig } from '@plasmo/utils/config'

export default defineConfig({
  // 浏览器扩展清单配置（manifest.json）
  manifest: {
    name: "My Extension",
    version: "1.0.0",
    description: "A Plasmo-powered extension",
    permissions: ["storage", "activeTab"],
    // 其他 manifest 属性...
  },

  // 开发配置
  dev: {
    port: 3000,
    https: true
  },

  // 指定 React 的入口文件（可选）
  react: {
    entry: "src/popup/index.tsx"
  },

  // 内容脚本配置
  content_scripts: [
    {
      matches: ["https://*.example.com/*"],
      js: ["src/content/index.ts"],
      run_at: "document_end"
    }
  ],

  // 后台脚本配置
  background: {
    service_worker: "src/background/index.ts"
  }
})

4. 核心功能开发
4.1 后台脚本（Background Script）
在 src/background/index.ts 中编写后台逻辑：
// 监听消息并存储数据
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.type === "SAVE_DATA") {
    chrome.storage.local.set({ key: request.data });
    sendResponse({ success: true });
  }
});
4.2 内容脚本（Content Script）
在 src/content/index.ts 中操作页面 DOM：
// 等待 DOM 加载完成
document.addEventListener("DOMContentLoaded", () => {
  const element = document.getElementById("target-element");
  if (element) {
    element.textContent = "Modified by Plasmo!";
  }
});
4.3 弹出窗口（Popup）
使用 React 开发弹出窗口（src/popup/index.tsx）：
import { useState } from "react";
import { usePlasmoStorage } from "@plasmo/utils/storage";

function Popup() {
  const [inputValue, setInputValue] = useState("");
  const { setStorage, getStorage } = usePlasmoStorage();

  const handleSave = async () => {
    await setStorage("userInput", inputValue);
    const data = await getStorage("userInput");
    console.log("Saved data:", data);
  };

  return (
    <div>
      <input
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
      />
      <button onClick={handleSave}>Save</button>
    </div>
  );
}

export default Popup;
4.4 跨脚本通信
通过 chrome.runtime.sendMessage 与后台脚本通信：
// 内容脚本发送消息
chrome.runtime.sendMessage(
  {
    type: "SAVE_DATA",
    data: "Hello from Content Script!"
  },
  (response) => {
    console.log("Background response:", response);
  }
);

5. 开发与调试
5.1 开发服务器
运行命令后，Plasmo 会自动在浏览器中加载扩展：
npx plasmo dev
5.2 调试扩展
● 在浏览器中启用开发者工具（右键点击扩展图标 → 查看后台脚本/内容脚本）。
● 使用 console.log 进行调试。
5.3 TypeScript 支持
Plasmo 默认支持 TypeScript，无需额外配置。确保项目中包含 tsconfig.json。

6. 打包与发布
6.1 构建生产版本
npx plasmo build
6.2 生成扩展包
构建完成后，会在 dist/ 目录下生成 .crx 或 ZIP 文件。
6.3 发布到商店
● Chrome 网上应用店：Chrome Web Store
● Firefox Add-ons：Mozilla Add-ons

7. 常见问题
7.1 如何更新到最新版本？
npm update @plasmo/*
7.2 如何处理跨域问题？
在 manifest.json 中添加权限：
"permissions": ["<all_urls>"]
7.3 如何使用浏览器 API？
Plasmo 已封装了常用的 API，例如：
import { chrome } from "@plasmo/utils/chrome-api";

8. 参考资料
● Plasmo 官方文档
● Manifest V3 文档
● 浏览器扩展开发最佳实践

如需更详细的功能或 API 文档，请参考 Plasmo GitHub 仓库或官方文档。

manifest
1. 使用环境变量
2. 使用国际化语言包
    a. 
