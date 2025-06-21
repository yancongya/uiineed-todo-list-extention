---
layout: home

hero:
  name: "UINeed Todo AE"
  text: "专为AE设计师打造的待办事项扩展"
  tagline: 简洁美观，与Adobe After Effects无缝集成的任务管理工具
  actions:
    - theme: brand
      text: 快速开始
      link: /guide/getting-started
    - theme: alt
      text: 在线演示
      link: https://todo.xn--jcs561df75a.space/
    - theme: alt
      text: GitHub
      link: https://github.com/yancongya/Uiineed-Todo-List-For-AE

features:
  - icon: 🎬
    title: 专为AE优化
    details: 针对Adobe After Effects工作流程进行深度优化，完美融入AE工作环境
  - icon: ✨
    title: 流畅动效
    details: 精心设计的UI交互动效，提供丝滑的用户体验
  - icon: 📝
    title: 完整功能
    details: 支持创建、编辑、完成、删除待办事项，满足日常任务管理需求
  - icon: 🔗
    title: 拖拽排序
    details: 直观的拖拽操作，轻松调整任务优先级和顺序
  - icon: 💾
    title: 本地存储
    details: 数据保存在本地，确保隐私安全，支持导入导出功能
  - icon: 🎨
    title: 美观设计
    details: 参考Figma社区设计规范，提供现代化的视觉体验
---

## 📖 项目背景

市面上有各种各样的待办事项应用，但很少有专为AE设计师量身定制的工具。本项目基于开源项目进行二次开发，旨在创建一个：

- **简洁美观**：没有多余功能的待办事项管理工具
- **无缝集成**：与Adobe After Effects完美融合
- **流畅动效**：提供丝滑的UI交互体验
- **本地存储**：确保工作数据不丢失
- **多项目管理**：便于分类整理任务
- **优先级设置**：支持任务重要性标记

在视觉设计上，参考了Figma社区的Noted设计规范，并根据AE工作流进行了优化调整。技术实现上使用Vue 2.x结合Adobe CEP扩展框架，让设计师能在AE环境中高效管理任务。

## 📸 界面预览

<div class="interface-preview">
  <div class="screenshot-gallery">
    <img src="/sc1.jpg" alt="界面预览1" />
    <img src="/sc2.jpg" alt="界面预览2" />
    <img src="/sc3.jpg" alt="界面预览3" />
    <img src="/sc4.jpg" alt="界面预览4" />
    <img src="/sc5.jpg" alt="界面预览5" />
  </div>
</div>

## 🎬 操作演示

<div class="demo-gallery">
  <div class="demo-item">
    <img src="/创建任务.webp" alt="创建任务演示" />
    <p>创建任务</p>
  </div>
  <div class="demo-item">
    <img src="/任务调整.webp" alt="任务调整演示" />
    <p>任务调整</p>
  </div>
  <div class="demo-item">
    <img src="/操作.webp" alt="自适应操作" />
    <p>自适应操作</p>
  </div>
  <div class="demo-item">
    <img src="/修改名字.webp" alt="修改名字演示" />
    <p>修改名字</p>
  </div>
</div>

<style>
.interface-preview {
  margin: 2rem 0;
  text-align: center;
}

.screenshot-gallery {
  display: flex;
  justify-content: flex-start;
  gap: 10px;
  overflow-x: auto;
  overflow-y: hidden;
  white-space: nowrap;
  padding: 10px 0;
  scrollbar-width: thin;
}

.screenshot-gallery::-webkit-scrollbar {
  height: 6px;
}

.screenshot-gallery::-webkit-scrollbar-track {
  background: #f1f1f1;
  border-radius: 3px;
}

.screenshot-gallery::-webkit-scrollbar-thumb {
  background: #c1c1c1;
  border-radius: 3px;
}

.screenshot-gallery::-webkit-scrollbar-thumb:hover {
  background: #a8a8a8;
}

.screenshot-gallery img {
  height: 280px;
  width: auto;
  border-radius: 8px;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  flex-shrink: 0;
}

.screenshot-gallery img:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.2);
}

.demo-gallery {
  display: flex;
  justify-content: flex-start;
  gap: 15px;
  overflow-x: auto;
  overflow-y: hidden;
  margin: 2rem 0;
  padding: 10px 0;
  scrollbar-width: thin;
}

.demo-gallery::-webkit-scrollbar {
  height: 6px;
}

.demo-gallery::-webkit-scrollbar-track {
  background: #f1f1f1;
  border-radius: 3px;
}

.demo-gallery::-webkit-scrollbar-thumb {
  background: #c1c1c1;
  border-radius: 3px;
}

.demo-gallery::-webkit-scrollbar-thumb:hover {
  background: #a8a8a8;
}

.demo-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  min-width: 220px;
  flex-shrink: 0;
  margin-bottom: 10px;
}

.demo-item img {
  width: 220px;
  height: auto;
  border-radius: 8px;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  margin-bottom: 8px;
}

.demo-item img:hover {
  transform: scale(1.02);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
}

.demo-item p {
  color: #666;
  font-size: 14px;
  text-align: center;
  margin: 0;
  font-weight: 500;
}

@media (max-width: 768px) {
  .screenshot-gallery {
    flex-direction: column;
    align-items: center;
  }
  
  .screenshot-gallery img {
    height: 250px;
  }
  
  .demo-gallery {
    justify-content: flex-start;
  }
  
  .demo-item {
    min-width: 200px;
  }
  
  .demo-item img {
    width: 200px;
  }
}
</style>

## 💡 快捷操作

- ✅ **点击标题创建任务** - 快速添加新的待办事项
- ✏️ **双击编辑内容** - 直接修改任务或标语
- ↕️ **拖拽排序** - 调整任务优先级和顺序
- 🔍 **右侧面板** - 快捷筛选功能和数据查看
- 💾 **数据管理** - 支持导入/导出，本地安全存储

## 💻 技术栈

- **Vue 2.x** - 响应式前端框架
- **Adobe CEP** - 扩展开发框架
- **ExtendScript** - AE集成脚本
- **Vue-draggable** - 拖拽排序功能
- **LocalStorage** - 本地数据存储

## 🌐 在线演示

除了AE扩展版本，您还可以通过以下链接体验在线版本：

- [GitHub Pages 演示](https://yancongya.github.io/Uiineed-Todo-List-For-AE/)
- [备用链接](https://todo.xn--jcs561df75a.space/)

> 注意：在线版本主要用于功能预览，完整功能请使用AE扩展版本

## 开始使用

准备好开始使用 UINeed Todo AE 了吗？

[快速开始](/guide/getting-started){ .vp-button }
[安装教程](/guide/installation){ .vp-button .secondary }
[查看功能](/features/){ .vp-button .secondary }

## 社区与支持

- 🐛 [报告问题](https://github.com/yancongya/Uiineed-Todo-List-For-AE/issues)
- 💡 [功能建议](https://github.com/yancongya/Uiineed-Todo-List-For-AE/discussions)
- 📖 [查看文档](/guide/introduction)
- 🌐 [在线演示](https://yancongya.github.io/Uiineed-Todo-List-For-AE/)