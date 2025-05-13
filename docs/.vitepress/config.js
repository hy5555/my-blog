import { defineConfig } from 'vitepress'
const base = "/blog/"; 
export default defineConfig({
  base,
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
        items: []
      },
      {
        text: '搭建',
        collapsible: true,
        collapsed: true,
        items: [
          { text: '第一篇文章', link: '/posts/first-post' }
        ]
      }
    ]
  }
})