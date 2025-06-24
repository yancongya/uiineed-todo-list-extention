# 安装教程

本页面提供详细的安装步骤和故障排除指南，确保您能够成功安装并运行 UINeed Todo AE 扩展。

## 详细安装步骤

### 步骤1：准备工作

#### 检查AE版本

确保您的Adobe After Effects版本符合要求：

- **最低版本**：CC 2018 (15.0)
- **推荐版本**：CC 2020 或更高版本
- **测试版本**：CC 2024 (最新测试)

#### 检查系统权限

- **Windows**：确保有管理员权限
- **macOS**：确保有系统修改权限

### 步骤2：下载扩展文件

#### 从GitHub下载

1. 访问 [GitHub Releases页面](https://github.com/yancongya/Uiineed-Todo-List-For-AE/releases)
2. 找到最新版本（标有 `Latest` 标签）
3. 下载 `UINeed-Todo-AE-v*.*.*.zip` 文件
4. 将文件保存到易于访问的位置

#### 解压文件

1. 右键点击下载的zip文件
2. 选择"解压到当前文件夹"或"解压到指定文件夹"
3. 确保解压后的文件夹包含以下内容：
   ```
   Uiineed-Todo-List-For-AE/
   ├── CSXS/
   │   └── manifest.xml
   ├── jsx/
   │   └── index.jsx
   ├── public/
   ├── index.html
   └── 其他文件...
   ```

### 步骤3：安装到AE扩展目录

#### Windows安装

1. **找到扩展目录**：
   ```
   C:\Program Files (x86)\Common Files\Adobe\CEP\extensions
   ```

2. **如果目录不存在**：
   - 手动创建 `CEP` 文件夹
   - 在 `CEP` 文件夹内创建 `extensions` 文件夹

3. **复制扩展文件**：
   - 将整个 `Uiineed-Todo-List-For-AE` 文件夹复制到 `extensions` 目录
   - 最终路径应为：
     ```
     C:\Program Files (x86)\Common Files\Adobe\CEP\extensions\Uiineed-Todo-List-For-AE
     ```

#### macOS安装

1. **找到扩展目录**：
   ```
   /Library/Application Support/Adobe/CEP/extensions
   ```

2. **使用Finder访问**：
   - 按 `Cmd + Shift + G`
   - 输入路径：`/Library/Application Support/Adobe/CEP/extensions`
   - 如果目录不存在，请手动创建

3. **复制扩展文件**：
   - 将 `Uiineed-Todo-List-For-AE` 文件夹拖拽到 `extensions` 目录

### 步骤4：启用CEP调试模式

#### Windows设置

1. **以管理员身份运行命令提示符**：
   - 按 `Win + R`
   - 输入 `cmd`
   - 按 `Ctrl + Shift + Enter`

2. **执行注册表命令**：
   ```powershell
   REG ADD HKEY_CURRENT_USER\Software\Adobe\CSXS.11 /v PlayerDebugMode /t REG_STRING /d 1
   ```

3. **针对不同AE版本**：
   ```powershell
   # AE 2024
   REG ADD HKEY_CURRENT_USER\Software\Adobe\CSXS.11 /v PlayerDebugMode /t REG_STRING /d 1
   
   # AE 2023
   REG ADD HKEY_CURRENT_USER\Software\Adobe\CSXS.10 /v PlayerDebugMode /t REG_STRING /d 1
   
   # AE 2022
   REG ADD HKEY_CURRENT_USER\Software\Adobe\CSXS.9 /v PlayerDebugMode /t REG_STRING /d 1
   ```

#### macOS设置

1. **打开终端**：
   - 按 `Cmd + Space`
   - 输入 "Terminal" 并回车

2. **执行命令**：
   ```bash
   defaults write com.adobe.CSXS.11 PlayerDebugMode 1
   ```

3. **针对不同AE版本**：
   ```bash
   # AE 2024
   defaults write com.adobe.CSXS.11 PlayerDebugMode 1
   
   # AE 2023
   defaults write com.adobe.CSXS.10 PlayerDebugMode 1
   
   # AE 2022
   defaults write com.adobe.CSXS.9 PlayerDebugMode 1
   ```

### 步骤5：验证安装

1. **重启After Effects**
2. **打开扩展**：
   - 菜单栏 → 窗口 → 扩展 → UINeed Todo@烟囱鸭
3. **检查功能**：
   - 扩展面板正常显示
   - 可以创建和管理待办事项
   - 数据能够正常保存

## 故障排除

### 常见问题

#### 问题1：扩展菜单中找不到插件

**可能原因**：
- CEP调试模式未正确启用
- 扩展文件路径不正确
- AE版本不兼容

**解决方案**：
1. 重新执行CEP调试模式设置命令
2. 检查扩展文件夹路径和名称
3. 确认AE版本兼容性

#### 问题2：扩展打开后显示空白

**可能原因**：
- 文件权限问题
- 扩展文件损坏
- 网络连接问题（如果使用在线资源）

**解决方案**：
1. 检查文件夹权限设置
2. 重新下载并安装扩展
3. 检查防火墙和网络设置

#### 问题3：数据无法保存

**可能原因**：
- 文档文件夹权限不足
- 磁盘空间不足
- ExtendScript执行错误

**解决方案**：
1. 检查用户文档文件夹权限
2. 清理磁盘空间
3. 查看AE的ExtendScript调试信息

### 高级故障排除

#### 启用ExtendScript调试

1. **打开ExtendScript Toolkit**（如果可用）
2. **在AE中启用调试**：
   - 编辑 → 首选项 → 脚本和表达式
   - 勾选"允许脚本写入文件和访问网络"

#### 查看错误日志

**Windows日志位置**：
```
%APPDATA%\Adobe\CEP\extensions\Uiineed-Todo-List-For-AE\debug.log
```

**macOS日志位置**：
```
~/Library/Application Support/Adobe/CEP/extensions/Uiineed-Todo-List-For-AE/debug.log
```

#### 手动清理安装

如果需要完全重新安装：

1. **删除扩展文件夹**
2. **清理注册表/偏好设置**：
   ```powershell
   # Windows
   REG DELETE HKEY_CURRENT_USER\Software\Adobe\CSXS.11 /v PlayerDebugMode
   
   # macOS
   defaults delete com.adobe.CSXS.11 PlayerDebugMode
   ```
3. **删除用户数据**：
   - Windows: `%USERPROFILE%\Documents\uiineed-todo-list`
   - macOS: `~/Documents/uiineed-todo-list`
4. **重新安装**

## 获取帮助

如果以上步骤无法解决您的问题，请：

1. **查看常见问题**：[FAQ页面](/guide/faq)
2. **提交Issue**：[GitHub Issues](https://github.com/yancongya/Uiineed-Todo-List-For-AE/issues)
3. **参与讨论**：[GitHub Discussions](https://github.com/yancongya/Uiineed-Todo-List-For-AE/discussions)

提交问题时，请包含：
- 操作系统版本
- AE版本信息
- 错误信息截图
- 详细的操作步骤

## 下一步

安装成功后，建议您：

- 阅读 [使用教程](/guide/tutorial) 学习高级功能
- 查看 [功能特性](/features/) 了解所有可用功能
- 体验 [在线演示](https://yancongya.github.io/Uiineed-Todo-List-For-AE/) 版本