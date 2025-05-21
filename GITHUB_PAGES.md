# UINeed-Todo-AE GitHub Pages 部署指南

本文档将指导您如何将UINeed-Todo-AE项目部署到GitHub Pages，同时不影响其作为Adobe After Effects扩展的功能。

## 部署步骤

### 1. 创建GitHub仓库

1. 登录您的GitHub账号
2. 创建一个新的仓库，建议使用名称 `uiineed-todo-list`
3. 将本项目代码上传到该仓库

### 2. 配置GitHub Pages

方法一：通过设置页面启用GitHub Pages
1. 进入仓库设置（Settings）
2. 滚动到"GitHub Pages"部分
3. 在"Source"下选择"main"分支（或者您的默认分支）
4. 点击"Save"

方法二：通过Actions自动部署（推荐）
1. 项目中已包含 `.github/workflows/deploy.yml` 文件
2. 只需将代码推送到GitHub仓库即可
3. GitHub Actions会自动将项目部署到gh-pages分支

### 3. 访问您的GitHub Pages站点

部署完成后，您可以通过以下URL访问您的GitHub Pages站点：
```
https://[您的用户名].github.io/uiineed-todo-list/
```

## 关于GitHub Pages版本的说明

GitHub Pages版本与AE扩展版本有以下区别：

1. **存储方式不同**：
   - GitHub Pages版本使用浏览器的localStorage存储数据
   - AE扩展版本可以保存到本地文件系统

2. **功能限制**：
   - GitHub Pages版本无法使用AE特有功能（如创建AE图层等）
   - 提供了模拟的适配器，确保基本功能可用

3. **用途**：
   - GitHub Pages版本适合作为演示、预览和分享
   - AE扩展版本适合实际生产环境使用

## 技术实现细节

本项目通过以下方式实现GitHub Pages兼容：

1. 添加了 `public/js/github-pages-adapter.js` 适配器脚本
   - 检测是否在GitHub Pages环境中运行
   - 模拟CSInterface和ExtendScript功能

2. 增加了提示信息，明确告知用户当前是在Web环境中

3. 保留了与AE扩展版本相同的UI和基本功能

## 定制您的GitHub Pages版本

如果您希望进一步定制GitHub Pages版本，可以考虑：

1. 修改 `public/js/github-pages-adapter.js` 文件以添加更多Web特定功能
2. 在index.html中添加特定于Web版本的UI元素
3. 优化移动设备上的体验

## 常见问题

**Q: 在GitHub Pages上保存的数据会丢失吗？**  
A: 数据存储在浏览器的localStorage中，清除浏览器数据会导致数据丢失。请使用导出功能保存重要数据。

**Q: 如何更新已部署的GitHub Pages？**  
A: 只需将更新推送到您的GitHub仓库，GitHub Actions会自动更新部署。

**Q: 可以使用自定义域名吗？**  
A: 是的，您可以在GitHub仓库设置中配置自定义域名。请参考GitHub文档进行设置。 