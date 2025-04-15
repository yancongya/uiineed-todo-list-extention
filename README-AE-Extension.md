# UINeed Todo AE Extension

基于[UINeed Todo List](https://github.com/ricocc/uiineed-todo-list)开发的After Effects扩展版本，可以将待办事项直接创建为AE文本图层。

## 特性

- 简洁的待办事项管理界面
- 支持添加、编辑、删除待办事项
- 支持将待办事项一键创建为AE文本图层
- 支持数据导入导出

## 安装方法

### 开发模式安装

1. 启用CEP扩展开发者模式:
   - Windows: 以管理员身份运行命令提示符，执行以下命令:
     ```
     reg add HKEY_CURRENT_USER\Software\Adobe\CSXS.11 /v PlayerDebugMode /t REG_SZ /d 1 /f
     ```
   - Mac OS: 在终端执行以下命令:
     ```
     defaults write com.adobe.CSXS.11 PlayerDebugMode 1
     ```

2. 将扩展目录复制到CEP扩展目录:
   - Windows: `C:\Users\[用户名]\AppData\Roaming\Adobe\CEP\extensions\`
   - Mac OS: `~/Library/Application Support/Adobe/CEP/extensions/`

3. 重启After Effects，扩展将显示在窗口 > 扩展菜单中

## 使用方法

1. 在After Effects中，打开窗口 > 扩展 > UINeed Todo
2. 添加、编辑和管理你的待办事项
3. 点击"Create Todo Items in After Effects"按钮，将待办事项创建为AE文本图层

## 开发计划

- 第一阶段: 基本扩展功能，保持原有UI和功能
- 第二阶段: 添加文件存储功能，替代localStorage
- 第三阶段: 增强AE集成功能，如合成创建、进度条显示等
- 第四阶段: UI优化，增加Adobe Spectrum设计风格支持

## 技术说明

- 前端: HTML、CSS、JavaScript、Vue.js 2.x
- CEP扩展: CSInterface.js
- ExtendScript: AE脚本API

## 贡献

欢迎提交Issue和Pull Request!

## 许可证

MIT License 