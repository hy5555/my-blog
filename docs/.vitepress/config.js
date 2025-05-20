import { defineConfig } from 'vitepress'
const base = "/my-blog/"; 
export default defineConfig({
  base,
  title: '我的博客',
  description: '这是我的个人博客',
  themeConfig: {
    nav: [
      { text: '首页', link: '/' },
      { text: 'JS', link: '/posts/Map迭代器与数组方法' },
      { text: '文章', link: '/posts/first-post' }
    ],
    sidebar: [
      {
        text: 'JS',
        collapsible: true,
        collapsed: true,
        items: [
          { text: 'Map迭代器与数组方法踩坑', link: '/posts/Map迭代器与数组方法' }
        ]
      },
      {
        text: '搭建',
        collapsible: true,
        collapsed: true,
        items: [
          { text: '使用vitepress搭建博客并部署到github', link: '/posts/first-post' }
        ]
      }
    ]
  }
})