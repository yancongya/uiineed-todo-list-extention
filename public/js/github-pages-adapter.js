/**
 * GitHub Pages环境适配器
 * 用于在Web环境中模拟CEP功能，保证在GitHub Pages上也能正常运行
 */

(function() {
    // 检测是否在GitHub Pages环境中运行
    var isGitHubPages = (function() {
        return window.location.hostname.indexOf('github.io') !== -1 || 
               !window.__adobe_cep__;
    })();

    // 只有在GitHub Pages环境中才执行模拟
    if (isGitHubPages) {
        console.log('检测到GitHub Pages环境，启用适配器...');

        // 模拟CSInterface对象
        window.CSInterface = function() {
            this.hostEnvironment = {
                appName: "WEB",
                appVersion: "1.0.0",
                appLocale: "zh_CN",
                isAppOnline: true,
                appUILocale: "zh_CN",
                appId: "WEB",
                isAppOffline: false
            };
            
            // 模拟evalScript方法
            this.evalScript = function(script, callback) {
                console.log("GitHub Pages环境: 不支持ExtendScript: " + script);
                
                // 对不同的ExtendScript调用进行模拟
                if (script.indexOf('$.todo.saveTodos') !== -1) {
                    // 模拟保存操作
                    console.log("模拟保存到本地文件...");
                    callback(JSON.stringify({
                        success: true,
                        message: "在GitHub Pages环境中，数据已保存到localStorage"
                    }));
                } 
                else if (script.indexOf('$.todo.loadTodos') !== -1) {
                    // 模拟加载操作
                    console.log("模拟从本地文件加载...");
                    var todos = localStorage.getItem('uiineed-todos') || '[]';
                    callback(JSON.stringify({
                        success: true,
                        data: JSON.parse(todos)
                    }));
                }
                else if (script.indexOf('$.todo.createTodoLayers') !== -1 ||
                         script.indexOf('$.todo.updateTodoLayers') !== -1) {
                    // 模拟AE图层操作
                    console.log("模拟AE图层操作...");
                    callback(JSON.stringify({
                        success: false,
                        error: "Web环境不支持AE图层操作"
                    }));
                }
                else {
                    // 默认回调
                    callback(JSON.stringify({
                        success: false,
                        error: "Web环境不支持此操作"
                    }));
                }
            };
            
            // 模拟openURLInDefaultBrowser方法
            this.openURLInDefaultBrowser = function(url) {
                window.open(url, '_blank');
            };
            
            // 模拟其他必要方法
            this.getHostEnvironment = function() {
                return this.hostEnvironment;
            };
            
            this.addEventListener = function(type, listener, obj) {
                window.addEventListener(type, listener);
            };
            
            this.dispatchEvent = function(event) {
                // 简单模拟事件分发
                var customEvent = new CustomEvent(event.type, {
                    detail: event.data ? JSON.parse(event.data) : {}
                });
                window.dispatchEvent(customEvent);
            };
        };
        
        // 创建全局csInterface实例
        window.csInterface = new CSInterface();
        
        // 添加提示信息
        window.addEventListener('DOMContentLoaded', function() {
            var infoBar = document.createElement('div');
            infoBar.style.position = 'fixed';
            infoBar.style.bottom = '0';
            infoBar.style.left = '0';
            infoBar.style.right = '0';
            infoBar.style.backgroundColor = 'rgba(255, 235, 59, 0.9)';
            infoBar.style.color = '#333';
            infoBar.style.textAlign = 'center';
            infoBar.style.padding = '5px';
            infoBar.style.fontSize = '12px';
            infoBar.style.zIndex = '9999';
            infoBar.innerHTML = '当前在GitHub Pages环境运行，部分AE功能不可用。数据保存在浏览器本地存储中。';
            document.body.appendChild(infoBar);
        });
    }
})(); 