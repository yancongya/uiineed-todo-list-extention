# 快速开始

本指南将帮助您在几分钟内安装并开始使用 UINeed Todo AE 扩展。

## 系统要求

### 软件要求
- **Adobe After Effects** CC 2018 (15.0) 或更高版本
- **操作系统**：Windows 10+ 或 macOS 10.14+

### 硬件要求
- 运行AE的基本硬件配置即可
- 无额外硬件要求

## 安装步骤

### 1. 下载扩展

从以下渠道获取最新版本：

::: tip 推荐方式
访问 [GitHub Releases](https://github.com/yancongya/Uiineed-Todo-List-For-AE/releases) 下载最新版本
:::

- 下载 `UINeed-Todo-AE-v1.0.0.zip` 文件
- 解压到任意位置

### 2. 安装到AE扩展目录

将解压后的文件夹复制到AE扩展目录：

::: code-group

```bash [Windows]
C:\Program Files (x86)\Common Files\Adobe\CEP\extensions
```

```bash [macOS]
/Library/Application Support/Adobe/CEP/extensions
```

:::

::: warning 注意
确保文件夹名称为 `Uiineed-Todo-List-For-AE`，避免中文或特殊字符
:::

### 3. 启用CEP调试模式

首次安装需要开启CEP扩展调试模式：

::: code-group

```powershell [Windows (管理员权限)]
REG ADD HKEY_CURRENT_USER\Software\Adobe\CSXS.11 /v PlayerDebugMode /t REG_STRING /d 1
```

```bash [macOS (终端)]
defaults write com.adobe.CSXS.11 PlayerDebugMode 1
```

:::

::: details 其他AE版本的调试模式设置

不同版本的AE需要设置不同的注册表项：

- **AE 2024 (CC 24.x)**：CSXS.11
- **AE 2023 (CC 23.x)**：CSXS.10
- **AE 2022 (CC 22.x)**：CSXS.9
- **AE 2021 (CC 18.x)**：CSXS.8
- **AE 2020 (CC 17.x)**：CSXS.7

:::

### 4. 重启AE并打开扩展

1. 完全关闭Adobe After Effects
2. 重新启动AE
3. 在菜单栏选择：**窗口 > 扩展 > UINeed Todo@烟囱鸭**

## 首次使用

### 界面概览

扩展打开后，您将看到：

- **顶部标语区域**：可自定义的项目标语
- **任务列表区域**：显示所有待办事项
- **底部操作栏**：快捷功能按钮
- **侧边面板**：筛选和数据管理功能

### 创建第一个任务

1. 点击顶部的 **"点击这里添加待办事项"**
2. 输入任务内容，例如："完成片头动画"
3. 按 `Enter` 键或点击提交按钮
4. 任务创建成功！

### 基本操作

- **✅ 完成任务**：点击任务左侧的圆圈按钮
- **✏️ 编辑任务**：双击任务内容进行编辑
- **🗑️ 删除任务**：点击任务右侧的删除按钮
- **↕️ 排序任务**：拖拽任务进行重新排序

## 快速体验

如果您想在安装前先体验功能，可以访问我们的 [在线演示版本](https://yancongya.github.io/Uiineed-Todo-List-For-AE/)。

::: info 在线版本说明
在线版本功能与扩展版本基本一致，但：
- 数据存储在浏览器localStorage中
- 无法使用AE特有功能（如创建图层等）
- 主要用于功能预览和体验
:::

## 遇到问题？

如果安装过程中遇到问题，请查看：

- [常见问题解答](/guide/faq)
- [详细安装教程](/guide/installation)
- [GitHub Issues](https://github.com/yancongya/Uiineed-Todo-List-For-AE/issues)

## 下一步

安装成功后，建议您：

1. 阅读 [使用教程](/guide/tutorial) 了解高级功能
2. 查看 [功能特性](/features/) 了解所有可用功能
3. 根据需要调整设置和偏好

开始享受高效的任务管理体验吧！🚀