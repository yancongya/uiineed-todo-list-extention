import { defineConfig } from 'vitepress'

export default defineConfig({
  title: 'UINeed Todo AE',
  description: '专为Adobe After Effects设计的待办事项扩展插件',
  base: process.env.NODE_ENV === 'production' ? '/Uiineed-Todo-List-For-AE/' : '/',
  
  head: [
    ['link', { rel: 'icon', href: process.env.NODE_ENV === 'production' ? '/Uiineed-Todo-List-For-AE/favicon.ico' : '/favicon.ico' }]
  ],

  themeConfig: {
    logo: '/logo.png',
    
    nav: [
      { text: '首页', link: '/' },
      { text: '快速开始', link: '/guide/getting-started' },
      { text: '使用教程', link: '/guide/tutorial' },
      { text: '功能特性', link: '/features/' },
      { text: '在线演示', link: 'https://yancongya.github.io/Uiineed-Todo-List-For-AE/' },
      { text: 'GitHub', link: 'https://github.com/yancongya/Uiineed-Todo-List-For-AE' }
    ],

    sidebar: {
      '/guide/': [
        {
          text: '指南',
          items: [
            { text: '介绍', link: '/guide/introduction' },
            { text: '快速开始', link: '/guide/getting-started' },
            { text: '安装教程', link: '/guide/installation' },
            { text: '使用教程', link: '/guide/tutorial' },
            { text: '常见问题', link: '/guide/faq' }
          ]
        }
      ],
      '/features/': [
        {
          text: '功能特性',
          items: [
            { text: '功能概览', link: '/features/' },
            { text: '任务管理', link: '/features/task-management' },
            { text: 'AE集成', link: '/features/ae-integration' },
            { text: '数据存储', link: '/features/data-storage' },
            { text: '界面设计', link: '/features/ui-design' }
          ]
        }
      ]
    },

    socialLinks: [
      { icon: 'github', link: 'https://github.com/yancongya/Uiineed-Todo-List-For-AE' }
    ],

    footer: {
      message: '基于 MIT 许可证发布',
      copyright: 'Copyright © 2025 Rico & 烟囱鸭'
    },

    search: {
      provider: 'local'
    },

    editLink: {
      pattern: 'https://github.com/yancongya/Uiineed-Todo-List-For-AE/edit/main/docs/:path',
      text: '在 GitHub 上编辑此页面'
    },

    lastUpdated: {
      text: '最后更新于',
      formatOptions: {
        dateStyle: 'short',
        timeStyle: 'medium'
      }
    }
  }
})