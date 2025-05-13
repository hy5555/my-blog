
# **利用vitepress搭建博客**

## 背景

原来是用hexo搭建的博客，由于看到的很多文档都是利用vitepress写的，作为Vue框架使用者，就想转到vitepress这边来。

## **步骤**

### 一、初始化项目

**首先确保你已经安装了 Node.js（版本 16 或更高），然后在你想要创建博客的目录下打开终端，执行以下命令来初始化项目：**

```plain
# 创建一个新目录并进入
mkdir my-blog
cd my-blog

# 初始化一个新的 npm 项目
npm init -y

# 安装 VitePress
npm install vitepress --save-dev
```

### 二、配置基本文件结构

**在项目根目录下创建以下文件和文件夹结构：**

```markdown
my-blog/
├── docs/
│   ├── .vitepress/
│   │   └── config.js
│   ├── index.md
│   └── posts/
│       └── first-post.md
└── package.json
```

### 三、配置 VitePress

**在 docs/.vitepress/config.js 中添加基本配置：**

```plain
import { defineConfig } from 'vitepress'

export default defineConfig({
  title: '我的博客',
  description: '这是我的个人博客',
  themeConfig: {
    nav: [
      { text: '首页', link: '/' },
      { text: '文章', link: '/posts/first-post' }
    ],
    sidebar: [
      {
        text: '文章',
        items: [
          { text: '第一篇文章', link: '/posts/first-post' }
        ]
      }
    ]
  }
})
```

### 四、编写博客文章

```plain
# 欢迎来到我的博客

这里是我的个人博客，分享我的技术经验和生活感悟。
```

### 五、添加运行脚本

**在 package.json 中添加以下脚本：**

```plain
{
  "type":"module",
  "scripts": {
    "docs:dev": "vitepress dev docs",
    "docs:build": "vitepress build docs",
    "docs:serve": "vitepress serve docs"
  },
  // 其他配置...
}
```

### 六、运行和构建项目

**开发模式 ：在终端中运行以下命令启动开发服务器：**

```bash
npm run docs:dev
```

100|**打开浏览器访问你博客的实际地址即可查看博客。**

**- 构建项目 ：当你完成博客内容编写后，可以运行以下命令构建静态文件：**

```bash
npm run docs:build
```

**构建完成后，静态文件会生成在 docs/.vitepress/dist 目录下。**

**- 预览构建结果 ：运行以下命令预览构建后的静态文件：**

```bash
npm run docs:serve
```

### 七、部署博客

**你可以将构建好的静态文件部署到各种静态托管服务上，如 Vercel、Netlify 或 GitHub Pages。以 GitHub Pages 为例，步骤如下：**

**1. 在 GitHub 上创建一个新的仓库。**

**2. 将本地项目推送到 GitHub 仓库。**

**3. 在 GitHub 仓库的 Settings -> Pages 中，将 Source 设置为 GitHub Actions 。**

**4. 选择 VitePress 模板，然后提交更改。GitHub Actions 会自动构建并部署你的博客。**
