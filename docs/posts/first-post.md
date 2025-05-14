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

**你可以将构建好的静态文件部署到各种静态托管服务上，如 Vercel、Netlify 或 GitHub Pages。以 GitHub Pages 为例，本人是参考下面的文章进行部署的[使用github-pages部署](https://docs.bugdesigner.cn/docs/Tutorial/vitepress.html#%E4%BD%BF%E7%94%A8github-pages%E9%83%A8%E7%BD%B2)**

需要注意，上面博客中提到的deploy.yml文件内容需要改为下面的,原因是到 2025 年 1 月 30 日，GitHub Actions 客户将无法再使用 [actions/upload-artifact](https://github.com/actions/upload-artifact) 或 [actions/download-artifact](https://github.com/actions/download-artifact) 的 v3，对应通知链接在[这里](https://github.com/orgs/community/discussions/142581)，所以[actions/download-artifact](https://github.com/actions/download-artifact)的版本需要进行对应升级。

```bash
name: Deploy VitePress site to Pages


on:
  push:
    branches: [main]

# 设置tokenn访问权限
permissions:
  contents: read
  pages: write
  id-token: write

# 只允许同时进行一次部署，跳过正在运行和最新队列之间的运行队列
# 但是，不要取消正在进行的运行，因为我们希望允许这些生产部署完成
concurrency:
  group: pages
  cancel-in-progress: false

jobs:
  # 构建工作
  build:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v2
        with:
          fetch-depth: 0 # 如果未启用 lastUpdated，则不需要
      - name: Setup pnpm
        uses: pnpm/action-setup@v4 # 安装pnpm并添加到环境变量
        with:
          version: 8.6.12 # 指定需要的 pnpm 版本
      - name: Setup Node
        uses: actions/setup-node@v4
        with:
          node-version: 18
          cache: pnpm # 设置缓存
      - name: Setup Pages
        uses: actions/configure-pages@v4  # 在工作流程自动配置GithubPages
      - name: Install dependencies
        run: pnpm install # 安装依赖
      - name: Build with VitePress
        run: |
          pnpm run docs:build # 启动项目
          touch .nojekyll  # 通知githubpages不要使用Jekyll处理这个站点，不知道为啥不生效，就手动搞了
      - name: Upload artifact
        uses: actions/upload-pages-artifact@v3  # 上传构建产物
        with:
          path: docs/.vitepress/dist # 指定上传的路径，当前是根目录，如果是docs需要加docs/的前缀

  # 部署工作
  deploy:
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }} # 从后续的输出中获取部署后的页面URL
    needs: build    # 在build后面完成
    runs-on: ubuntu-latest  # 运行在最新版本的ubuntu系统上
    name: Deploy
    steps:
      - name: Deploy to GitHub Pages
        id: deployment  # 指定id
        uses: actions/deploy-pages@v4 # 将之前的构建产物部署到github pages中

```
