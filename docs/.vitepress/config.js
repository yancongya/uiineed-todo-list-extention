import { defineConfig } from 'vitepress'

export default defineConfig({
  // 性能优化
  cleanUrls: true,
  metaChunk: true,
  
  // 基础配置
  head: [
    ['link', { rel: 'icon', href: '/icon-192.png' }],
    ['meta', { name: 'theme-color', content: '#646cff' }],
    ['meta', { name: 'viewport', content: 'width=device-width, initial-scale=1.0, viewport-fit=cover' }],
    ['meta', { name: 'mobile-web-app-capable', content: 'yes' }],
    ['meta', { name: 'apple-mobile-web-app-status-bar-style', content: 'default' }],
    ['link', { rel: 'apple-touch-icon', href: '/apple-touch-icon.png' }],
    ['script', { src: '/doc/js/about-panel.js' }]
  ],
  title: 'TodoListAE-doc',
  description: '专为Adobe After Effects设计的待办事项扩展插件',
  base: '/doc/',
  


  // Vite配置优化
  vite: {
    optimizeDeps: {
      exclude: ['vitepress']
    },
    ssr: {
      noExternal: ['vitepress']
    },
    define: {
      global: 'globalThis'
    }
  },
  
  // SSR配置
  ssr: {
    noExternal: ['vitepress']
  },
  
  // 站点地图
  sitemap: {
    hostname: 'https://yancongya.github.io/Uiineed-Todo-List-For-AE/doc/'
  },
  
  themeConfig: {
    logo: {
      src: '/todo.svg',
      width: 48,
      height: 48
    },
    
    // 外观切换
    appearance: {
      theme: 'auto',
      accentColor: '#646cff'
    },
    
    nav: [
      { text: '🏠 首页', link: '/' },
      { 
        text: '📚 文档',
        items: [
          { text: '🚀 快速开始', link: '/guide/getting-started' },
          { text: '📖 使用教程', link: '/guide/tutorial' },
          { text: '📦 安装教程', link: '/guide/installation' },
          { text: '❓ 常见问题', link: '/guide/faq' }
        ]
      },
      { text: '✨ 功能特性', link: '/features/' },
      { text: '🛠️ 开发文档', link: '/development/' },
      { 
        text: '🔗 链接',
        items: [
          { text: '🌐 在线演示', link: 'https://yancongya.github.io/Uiineed-Todo-List-For-AE/' },
          { text: '📦 下载', link: 'https://github.com/yancongya/Uiineed-Todo-List-For-AE/releases' },
          { text: '🐛 报告问题', link: 'https://github.com/yancongya/Uiineed-Todo-List-For-AE/issues' }
        ]
      },
      { text: '💻 GitHub', link: 'https://github.com/yancongya/Uiineed-Todo-List-For-AE' }
    ],

    sidebar: {
      '/guide/': [
        {
          text: '📚 指南',
          collapsed: false,
          items: [
            { text: '🎯 介绍', link: '/guide/introduction' },
            { text: '🚀 快速开始', link: '/guide/getting-started' },
            { text: '📦 安装教程', link: '/guide/installation' },
            { text: '📖 使用教程', link: '/guide/tutorial' },
            { text: '❓ 常见问题', link: '/guide/faq' }
          ]
        }
      ],
      '/features/': [
        {
          text: '✨ 功能特性',
          collapsed: false,
          items: [
            { text: '🔍 功能概览', link: '/features/' },
            { text: '📝 任务管理', link: '/features/task-management' },
            { text: '🎬 AE集成', link: '/features/ae-integration' },
            { text: '💾 数据存储', link: '/features/data-storage' },
            { text: '🎨 界面设计', link: '/features/ui-design' }
          ]
        }
      ],
      '/development/': [
        {
          text: '🛠️ 开发文档',
          collapsed: false,
          items: [
            { text: '📋 开发指南', link: '/development/' }
          ]
        }
      ]
    },

    socialLinks: [
      { icon: 'github', link: 'https://github.com/yancongya/Uiineed-Todo-List-For-AE' },
      { 
        icon: {
          svg: '<img src="/doc/author.gif" alt="关于我" style="width: 20px; height: 20px; border-radius: 50%; object-fit: cover; cursor: pointer;" onclick="document.getElementById(\'about-panel-overlay\').style.display=\'flex\'; event.preventDefault(); event.stopPropagation(); return false;"/>'
        }, 
        link: 'javascript:void(0)',
        ariaLabel: '关于我'
      }
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