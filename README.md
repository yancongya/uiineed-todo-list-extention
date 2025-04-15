# UINeed-Todo-AE

UINeed-Todo-AE是一款为Adobe After Effects开发的待办事项扩展，帮助AE设计师和创作者在工作环境中直接管理任务列表，并可将任务可视化为文本图层。

## 功能特点

- 简单易用的待办事项管理界面
- 支持添加、编辑、删除和完成待办事项
- 将待办事项创建为AE文本图层
- 自动同步待办事项状态到AE图层
- 数据本地存储，无需联网
- 支持导出导入待办事项数据

## 安装方法

### 开发测试安装

1. 复制整个扩展文件夹到Adobe CEP扩展目录：
   - Windows: `C:\Program Files (x86)\Common Files\Adobe\CEP\extensions\`
   - macOS: `/Library/Application Support/Adobe/CEP/extensions/`

2. 启用CEP调试模式：
   - Windows: 以管理员身份运行注册表编辑器，添加或修改键值：
     ```
     HKEY_CURRENT_USER\Software\Adobe\CSXS.11
     PlayerDebugMode - "1"
     ```
   - macOS: 打开终端执行命令：
     ```
     defaults write com.adobe.CSXS.11 PlayerDebugMode 1
     ```

3. 重启After Effects，在窗口菜单中找到"UINeed Todo AE"并打开。

### 正式安装包（未来提供）

1. 下载最新的ZXP安装包
2. 使用Adobe Exchange或ZXP Installer安装扩展
3. 重启After Effects，在窗口菜单中找到"UINeed Todo AE"并打开

## 使用方法

1. 在AE中打开UINeed Todo AE面板
2. 添加待办事项：在输入框中输入任务内容，点击"提交"或按Enter
3. 管理待办事项：
   - 点击圆圈标记完成/未完成
   - 点击删除图标移除待办事项
   - 双击文本编辑待办事项
4. 创建AE图层：
   - 点击"创建AE图层"按钮将待办事项创建为AE中的文本图层
   - 点击"更新状态"按钮同步待办事项状态到AE图层

## 数据存储

所有待办事项数据保存在扩展根目录的`todo.list`文件中。

## 支持和反馈

如有问题或建议，请通过以下方式联系我们：
- GitHub Issues
- 电子邮件: support@uiineed.com

## 许可证

本项目基于MIT许可证开源。

---

© 2023 UINeed. 保留所有权利。
