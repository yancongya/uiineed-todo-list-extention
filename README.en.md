# Uiineed Todo List - After Effects Extension

English | [简体中文](README.md)

> Original author: [@Rico's Design Thinking](https://www.xiaohongshu.com/user/profile/5f2b6903000000000101f51f) | [Original project](https://github.com/ricocc/uiineed-todo-list)

A to-do list extension plugin designed for Adobe After Effects, based on [Uiineed Todo List](https://github.com/ricocc/uiineed-todo-list) with additional development, supporting smooth animations and local data storage to help designers efficiently manage AE workflows.

## 📸 Interface Preview

<div align="center">
  <div style="overflow-x: auto; white-space: nowrap; padding: 10px 0;">
    <img src="public/img/sc/sc1.jpg" alt="Interface Preview 1" style="height: 300px; border-radius: 8px; margin-right: 15px; display: inline-block;">
    <img src="public/img/sc/sc2.jpg" alt="Interface Preview 2" style="height: 300px; border-radius: 8px; margin-right: 15px; display: inline-block;">
    <img src="public/img/sc/sc3.jpg" alt="Interface Preview 3" style="height: 300px; border-radius: 8px; margin-right: 15px; display: inline-block;">
    <img src="public/img/sc/sc4.jpg" alt="Interface Preview 4" style="height: 300px; border-radius: 8px; margin-right: 15px; display: inline-block;">
    <img src="public/img/sc/sc5.jpg" alt="Interface Preview 5" style="height: 300px; border-radius: 8px; display: inline-block;">
  </div>
</div>

## 📖 Project Background

There are various to-do list applications in the market, but few are tailored specifically for AE designers. This project aims to create:

- A clean, beautiful to-do list management tool without unnecessary features
- Seamless integration with Adobe After Effects
- Optimization based on Adobe After Effects usage logic
- Smooth interface animations
- Local data storage to ensure work is not lost
- Multi-project management for easy organization
- Task priority settings
- Support for task notes and tags

The visual design references Figma community member aakarshna's Noted design specifications, with optimizations for AE workflows. The technical implementation uses Vue 2.x combined with Adobe CEP extension framework, allowing designers to efficiently manage tasks within the AE environment.

## 🚀 Features

- 🎬 Specifically redesigned for AE
- ✨ Smooth UI interactions
- 📝 Create, edit, complete, and delete to-do items
- 🔗 Drag and drop to-do items for reordering
- 🔄 Integration with AE projects for direct use within AE
- 💾 Local storage, export and import data without losing data presets

## 💡 Usage

### Installation Steps

After installing as an AE extension, it can be opened directly in AE:

1. Place the folder in the AE extension directory:
   - Windows: `C:\Program Files (x86)\Common Files\Adobe\CEP\extensions`
   - macOS: `/Library/Application Support/Adobe/CEP/extensions`
2. First-time installation requires enabling CEP extension debug mode:
   - Windows: Run as administrator `REG ADD HKEY_CURRENT_USER\Software\Adobe\CSXS.11 /v PlayerDebugMode /t REG_STRING /d 1`
   - macOS: Terminal command `defaults write com.adobe.CSXS.11 PlayerDebugMode 1`
3. Restart AE, then open from the "Window > Extensions" menu
4. You can also open the HTML file directly for standalone use

### Shortcut Operations

- ✅ Click the title to create a task
- ✏️ Double-click a to-do item or slogan to edit
- ↕️ Drag and drop to-do items to sort
- 🔍 Right panel provides quick filtering and data viewing

### Data Management

- All data is saved in the todo.list file in the local uiineed-todo-list folder, no privacy concerns
- Support for importing/exporting task lists for backup and migration
- Recommended regular auto-save to prevent data loss
- Support for project-based task management

## 💻 Technology Stack

- Vue 2.x (CDN import)
- HTML/CSS/JavaScript
- Adobe CEP extension framework
- ExtendScript with AE integration
- Local storage (localStorage)
- Vuex state management
- Vue-draggable for drag functionality
- Vue-transitions for transition animations

## 🎬 Operation Demo

<div align="center">
  <div style="overflow-x: auto; white-space: nowrap; padding: 10px 0;">
    <div style="display: inline-block; margin-right: 20px; vertical-align: top; min-width: 300px;">
      <img src="public/img/sc/创建任务.webp" alt="Create Task Demo" style="width: 300px; border-radius: 8px; margin-bottom: 10px;">
      <p style="color: #666; font-size: 14px; text-align: center; margin: 0;">Create Task</p>
    </div>

<div style="display: inline-block; margin-right: 20px; vertical-align: top; min-width: 300px;">
  <img src="public/img/sc/任务调整.webp" alt="Task Adjustment Demo" style="width: 300px; border-radius: 8px; margin-bottom: 10px;">
  <p style="color: #666; font-size: 14px; text-align: center; margin: 0;">Task Adjustment</p>
</div>

<div style="display: inline-block; vertical-align: top; min-width: 300px;">
  <img src="public/img/sc/修改名字.webp" alt="Edit Name Demo" style="width: 300px; border-radius: 8px; margin-bottom: 10px;">
  <p style="color: #666; font-size: 14px; text-align: center; margin: 0;">Edit Name</p>
</div>
</div>
</div>


## 📄 License

This project is open-source under the MIT license. See the [LICENSE](./LICENSE) file for details.

## 🤝 Contribution Guidelines

Contributions and suggestions are welcome!

1. Fork this repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 💰 Support the Author

Development takes time and effort. If this project helps you, please consider supporting me!

<div align="center">
  <img src="public/img/shoukuanma.jpg" alt="Payment QR Code" style="width: 300px; border-radius: 8px;">
  <p style="margin-top: 10px;">You can also support me via <a href="https://afdian.tv/a/tycon" target="_blank">Afdian</a> platform</p>
</div>

## ❗ Notes

- Restart AE after first installation for normal use
- Default values are temporarily saved; click "Save to Local" to avoid data loss after restarting AE
- Regular data export backups recommended
- If the extension fails to load, check if CEP debug mode is enabled
- Network synchronization not currently supported
- Large numbers of tasks may affect performance, archive appropriately

## 🌐 GitHub Pages Online Demo

This project also supports GitHub Pages deployment. You can access the online demo version at:

- GitHub Pages link:
- `https://todo.xn--jcs561df75a.space/`
- `https://yancongya.github.io/Uiineed-Todo-List-For-AE/`