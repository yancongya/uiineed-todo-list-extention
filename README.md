# Uiineed Todo List - AE扩展

> 原创作者：[@Rico的设计漫想](https://www.xiaohongshu.com/user/profile/5f2b6903000000000101f51f) | [原项目地址](https://github.com/ricocc/uiineed-todo-list)

一个为Adobe After Effects设计的待办事项扩展插件，支持流畅动效和本地数据存储，帮助设计师高效管理AE工作流程。

<div align="center">
  <img src="public/img/ricocc/preview-uiineed-todo-list-zh.jpg" alt="预览图1" width="80%" style="border-radius:8px;margin:10px 0">
  <img src="public/img/ricocc/preview-uiineed-todo-list-zh-2.jpg" alt="预览图2" width="80%" style="border-radius:8px;margin:10px 0">
  <img src="public/img/ricocc/preview-uiineed-todo-list-en.jpg" alt="英文版预览" width="80%" style="border-radius:8px;margin:10px 0">
</div>

## 📖 项目背景

市面上有各种各样的待办事项应用，但很少有专为AE设计师量身定制的工具，发现有大佬做了一份挺不错的，就迁移看一份到AE中。本项目旨在创建一个：

- 简洁美观，没有多余功能的待办事项管理工具
- 与Adobe After Effects无缝集成
- 提供流畅的界面动效
- 支持本地数据存储，确保工作不丢失

在视觉设计上，参考了Figma社区aakarshna的Noted设计规范，并根据AE工作流进行了优化调整。技术实现上使用Vue 2.x结合Adobe CEP扩展框架，让设计师能在AE环境中高效管理任务。

## 🚀 特性

- 🎬 专为AE设计师打造的工作流管理工具
- ✨ 流畅的UI交互动效
- 📝 创建、编辑、完成、删除待办事项  
- 🔗 拖拽排序 
- 🔄 与AE项目集成，可直接AE中使用
- 💾 本地存储数据，不丢失工作进度
- 📤 支持导入/导出数据
- 🌓 精美视觉设计，符合设计师审美

## 💡 使用方法

作为AE扩展安装后，可在AE中直接打开并使用：

1. 将文件夹放入AE扩展目录
2. 在AE中通过"窗口 > 扩展"菜单打开
3. 也可直接打开HTML文件进行独立使用：

### 快捷操作

- ✅ 回车键提交内容
- ✏️ 双击待办事项或标语可编辑
- ↕️ 拖拽待办事项可排序
- 🔍 右侧面板提供快捷筛选功能

## 💻 技术栈

- Vue 2.x (CDN引入)
- HTML/CSS/JavaScript
- Adobe CEP扩展框架
- ExtendScript与AE集成
- 本地存储 (localStorage)


## 👨‍💻 作者

- 小红书: [@Rico的设计漫想](https://www.xiaohongshu.com/user/profile/5f2b6903000000000101f51f)


## 📄 许可证

本项目基于 MIT 许可证开源。详情请查看 [LICENSE](./LICENSE) 文件。
