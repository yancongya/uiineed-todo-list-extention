/**
 * UINeed-Todo-AE ExtendScript
 * AE待办事项扩展的ExtendScript实现
 */

// 全局命名空间
$.todo = {
    /**
     * 保存待办事项到文件
     * @param {string} todosStr - JSON字符串形式的待办事项数组(经过URL编码)
     * @returns {string} - JSON字符串形式的结果对象
     */
    saveTodos: function(todosStr) {
        var path = "";
        var filePath = "";
        try {
            var todos = JSON.parse(decodeURIComponent(todosStr));
            path = this.getStoragePath();
            if (path.indexOf("ERROR_IN_GETSTORAGEPATH") === 0) { // Check for error from getStoragePath
                 return JSON.stringify({success: false, error: "getStoragePath 失败: " + path});
            }

            filePath = path + "todo.list";
            var file = new File(filePath);
            
            var parentFolder = file.parent;
            if (!parentFolder.exists) {
                if (!parentFolder.create()) { // Try to create parent folder if it somehow wasn't
                     return JSON.stringify({success: false, error: "无法创建父文件夹。路径: " + decodeURI(parentFolder.fsName) });
                }
            }

            file.encoding = "UTF-8";
            if (!file.open("w")) {
                return JSON.stringify({success: false, error: "无法打开文件进行写入。路径: " + decodeURI(file.fsName) + ". 错误: " + file.error});
            }
            
            var writeSuccess = file.write(JSON.stringify(todos, null, 2));
            if (!writeSuccess) {
                 var writeError = file.error;
                 file.close(); // Attempt to close even if write failed
                 return JSON.stringify({success: false, error: "写入文件失败。路径: " + decodeURI(file.fsName) + ". 错误: " + writeError});
            }
            
            var closeSuccess = file.close();
            if (!closeSuccess) {
                 return JSON.stringify({success: false, error: "关闭文件失败。路径: " + decodeURI(file.fsName) + ". 错误: " + file.error});
            }

            // Final check: Does the file actually exist on disk after all operations reported success?
            if (!file.exists) {
                return JSON.stringify({success: false, error: "文件写入操作均报告成功，但文件在关闭后实际不存在。路径: " + decodeURI(file.fsName)});
            }
            
            return JSON.stringify({success: true, path: decodeURI(file.fsName)});
        } catch (e) {
            return JSON.stringify({success: false, error: "保存时发生异常: " + e.toString() + ". 尝试的文件路径: " + (filePath ? decodeURI(filePath) : (path ? decodeURI(path) + "todo.list" : "未知")) });
        }
    },
    
    /**
     * 加载待办事项
     * @returns {string} - JSON字符串形式的结果对象，包含待办事项数组或错误信息
     */
    loadTodos: function() {
        var path = "";
        var filePath = "";
        try {
            path = this.getStoragePath();
            if (path.indexOf("ERROR_IN_GETSTORAGEPATH") === 0) {
                return JSON.stringify({success: false, error: "getStoragePath 失败: " + path, data:[]});
            }

            filePath = path + "todo.list";
            var file = new File(filePath);
            
            var parentFolder = file.parent;
            if (!parentFolder.exists) {
                return JSON.stringify({success: true, data: [], message: "父文件夹 " + decodeURI(parentFolder.fsName) + " 不存在，因此 todo.list 文件也不存在。" });
            }

            if (!file.exists) {
                return JSON.stringify({success: true, data: [], message: "文件不存在于路径: " + decodeURI(file.fsName)});
            }
            
            file.encoding = "UTF-8";
            if (!file.open("r")) {
                return JSON.stringify({success: false, error: "无法打开文件进行读取。路径: " + decodeURI(file.fsName) + ". 错误: " + file.error, data: []});
            }
            var content = file.read();
            var readError = file.error;
            file.close();

            if (readError) {
                 return JSON.stringify({success: false, error: "读取文件时出错。路径: " + decodeURI(file.fsName) + ". 错误: " + readError, data: []});
            }
            
            return JSON.stringify({
                success: true, 
                data: JSON.parse(content),
                path: decodeURI(file.fsName)
            });
        } catch (e) {
            return JSON.stringify({success: false, error: "加载时发生异常: " + e.toString() + ". 尝试的文件路径: " + (filePath ? decodeURI(filePath) : (path ? decodeURI(path) + "todo.list" : "未知")), data: []});
        }
    },
    
    /**
     * 获取存储路径
     * @returns {string} - 待办事项存储的文件夹路径
     */
    getStoragePath: function() {
        try {
            var userDocuments = Folder.myDocuments;
            if (!userDocuments || !userDocuments.exists) {
                return "ERROR_IN_GETSTORAGEPATH: Folder.myDocuments is not valid or does not exist.";
            }

            var appFolderName = "uiineed-todo-list";
            var targetFolderPath = userDocuments.fsName + "/" + appFolderName; // Use / for Folder constructor
            var targetFolder = new Folder(targetFolderPath);

            if (!targetFolder.exists) {
                if (!targetFolder.create()) {
                    return "ERROR_IN_GETSTORAGEPATH: Failed to create folder '" + decodeURI(targetFolder.fsName) + "'. Error: " + targetFolder.error;
                }
            }
            
            var fsPath = targetFolder.fsName; // Get the system-specific path
            // Ensure the path ends with a forward slash for consistent concatenation
            if (fsPath.charAt(fsPath.length - 1) !== '/') {
                fsPath += '/';
            }
            return fsPath; // e.g., "C:/Users/User/Documents/uiineed-todo-list/"
        } catch (e) {
            return "ERROR_IN_GETSTORAGEPATH: Exception during path retrieval: " + e.toString();
        }
    },
    
    openStorageFolder: function() {
        try {
            var storagePath = this.getStoragePath(); // This will end with a slash
            if (storagePath.indexOf("ERROR_IN_GETSTORAGEPATH") === 0) {
                return JSON.stringify({success: false, error: "获取存储路径失败: " + storagePath});
            }
            
            // storagePath is a folder path, remove trailing slash if Folder constructor prefers no slash for existing check
            var folderToCheckPath = storagePath;
            if (folderToCheckPath.charAt(folderToCheckPath.length - 1) === '/') {
                folderToCheckPath = folderToCheckPath.substring(0, folderToCheckPath.length - 1);
            }
            var folder = new Folder(folderToCheckPath);

            if (folder.exists) {
                folder.execute(); // Opens the folder
                return JSON.stringify({success: true, path: decodeURI(folder.fsName)});
            } else {
                return JSON.stringify({success: false, error: "文件夹不存在: " + decodeURI(folder.fsName)});
            }
        } catch (e) {
            return JSON.stringify({success: false, error: "打开文件夹时发生异常: " + e.toString()});
        }
    },
    
    /**
     * 创建单个待办事项图层
     * @param {string} todoStr - JSON字符串形式的待办事项对象(经过URL编码)
     * @returns {string} - JSON字符串形式的结果对象
     */
    createTodoLayer: function(todoStr) {
        try {
            var todo = JSON.parse(decodeURIComponent(todoStr));
            var comp = app.project.activeItem;
            
            if (!comp || !(comp instanceof CompItem)) {
                return JSON.stringify({
                    success: false, 
                    error: "请先创建或选择一个合成"
                });
            }
            
            // 创建文本图层
            var textLayer = comp.layers.addText(todo.title);
            
            // 设置样式
            var textProp = textLayer.property("Source Text");
            var textDocument = textProp.value;
            
            // 根据完成状态设置样式
            if (todo.completed) {
                textDocument.fillColor = [0, 0.7, 0]; // 绿色表示已完成
                textDocument.strikeThru = true;
            } else {
                textDocument.fillColor = [0, 0, 0]; // 黑色表示未完成
            }
            
            // 设置字体大小
            textDocument.fontSize = 24;
            textProp.setValue(textDocument);
            
            // 添加效果控制器存储ID
            var effectsProperty = textLayer.property("ADBE Effect Parade");
            var sliderEffect = effectsProperty.addProperty("ADBE Slider Control");
            sliderEffect.name = "ID";
            sliderEffect.property("Slider").setValue(todo.id);
            
            return JSON.stringify({success: true});
        } catch (e) {
            return JSON.stringify({success: false, error: e.message});
        }
    },
    
    /**
     * 创建所有待办事项图层
     * @param {string} todosStr - JSON字符串形式的待办事项数组(经过URL编码)
     * @returns {string} - JSON字符串形式的结果对象
     */
    createTodoLayers: function(todosStr) {
        try {
            var todos = JSON.parse(decodeURIComponent(todosStr));
            var comp = app.project.activeItem;
            
            if (!comp || !(comp instanceof CompItem)) {
                return JSON.stringify({
                    success: false, 
                    error: "请先创建或选择一个合成"
                });
            }
            
            // 创建待办事项合成
            var todoComp;
            var todoCompName = "待办事项列表";
            
            // 检查是否已存在待办事项合成
            for (var i = 1; i <= app.project.numItems; i++) {
                if (app.project.item(i).name === todoCompName && app.project.item(i) instanceof CompItem) {
                    todoComp = app.project.item(i);
                    break;
                }
            }
            
            // 如果不存在，创建新合成
            if (!todoComp) {
                todoComp = app.project.items.addComp(todoCompName, 1280, 720, 1, 10, 30);
            }
            
            // 清除现有图层
            while (todoComp.layers.length > 0) {
                todoComp.layers[1].remove();
            }
            
            // 添加标题图层
            var titleLayer = todoComp.layers.addText("✅ 待办事项列表");
            var titleTextProp = titleLayer.property("Source Text");
            var titleTextDocument = titleTextProp.value;
            titleTextDocument.fontSize = 40;
            titleTextDocument.fillColor = [0.1, 0.4, 0.8]; // 蓝色
            titleTextDocument.font = "SimHei"; // 黑体
            titleTextProp.setValue(titleTextDocument);
            titleLayer.position.setValue([todoComp.width/2, 60]);
            
            // 显示未完成项数量
            var activeTodos = todos.filter(function(todo) {
                return !todo.completed && !todo.removed;
            });
            
            var statsLayer = todoComp.layers.addText("当前共有 " + activeTodos.length + " 项待办事项");
            var statsTextProp = statsLayer.property("Source Text");
            var statsTextDocument = statsTextProp.value;
            statsTextDocument.fontSize = 24;
            statsTextDocument.fillColor = [0.5, 0.5, 0.5]; // 灰色
            statsTextProp.setValue(statsTextDocument);
            statsLayer.position.setValue([todoComp.width/2, 110]);
            
            // 创建文本图层
            var yPos = 160;
            var todoItems = todos.filter(function(todo) {
                return !todo.removed;
            });
            
            for (var i = 0; i < todoItems.length; i++) {
                var todo = todoItems[i];
                var prefix = todo.completed ? "✓ " : "□ ";
                var textLayer = todoComp.layers.addText(prefix + todo.title);
                
                // 设置样式
                var textProp = textLayer.property("Source Text");
                var textDocument = textProp.value;
                
                // 根据完成状态设置样式
                if (todo.completed) {
                    textDocument.fillColor = [0, 0.7, 0]; // 绿色表示已完成
                    textDocument.strikeThru = true;
                } else {
                    textDocument.fillColor = [0, 0, 0]; // 黑色表示未完成
                }
                
                // 设置字体大小
                textDocument.fontSize = 24;
                textDocument.font = "Microsoft YaHei"; // 微软雅黑
                textProp.setValue(textDocument);
                
                // 设置位置
                textLayer.position.setValue([150, yPos]);
                
                // 添加效果控制器存储ID
                var effectsProperty = textLayer.property("ADBE Effect Parade");
                var sliderEffect = effectsProperty.addProperty("ADBE Slider Control");
                sliderEffect.name = "ID";
                sliderEffect.property("Slider").setValue(todo.id);
                
                // 递增位置
                yPos += 50;
            }
            
            // 将创建的合成添加到当前合成中
            if (comp !== todoComp) {
                var layer = comp.layers.add(todoComp);
                layer.position.setValue([comp.width/2, comp.height/2]);
            }
            
            return JSON.stringify({success: true});
        } catch (e) {
            return JSON.stringify({success: false, error: e.message});
        }
    },
    
    /**
     * 更新待办事项状态
     * @param {string} todoStr - JSON字符串形式的待办事项对象(经过URL编码)
     * @param {boolean} completed - 完成状态
     * @returns {string} - JSON字符串形式的结果对象
     */
    updateTodoStatus: function(todoStr, completed) {
        try {
            var todo = JSON.parse(decodeURIComponent(todoStr));
            var comp = app.project.activeItem;
            
            if (!comp || !(comp instanceof CompItem)) {
                return JSON.stringify({
                    success: false, 
                    error: "请先创建或选择一个合成"
                });
            }
            
            // 查找对应ID的图层
            var found = false;
            for (var i = 1; i <= comp.layers.length; i++) {
                var layer = comp.layers[i];
                
                // 检查是否有ID效果控制器
                if (layer.property("ADBE Effect Parade") && 
                    layer.property("ADBE Effect Parade").canAddProperty("ADBE Slider Control")) {
                    
                    // 遍历效果寻找ID控制器
                    for (var j = 1; j <= layer.property("ADBE Effect Parade").numProperties; j++) {
                        var effect = layer.property("ADBE Effect Parade").property(j);
                        if (effect.name === "ID" && 
                            effect.property("Slider").value === todo.id) {
                            
                            // 找到匹配图层，更新样式
                            var textProp = layer.property("Source Text");
                            var textDocument = textProp.value;
                            
                            // 更新文本内容（移除或添加前缀）
                            var text = textDocument.text;
                            if (text.indexOf("□ ") === 0) {
                                text = text.substring(2);
                            }
                            if (text.indexOf("✓ ") === 0) {
                                text = text.substring(2);
                            }
                            
                            text = (completed ? "✓ " : "□ ") + text;
                            textDocument.text = text;
                            
                            // 更新样式
                            if (completed) {
                                textDocument.fillColor = [0, 0.7, 0]; // 绿色表示已完成
                                textDocument.strikeThru = true;
                            } else {
                                textDocument.fillColor = [0, 0, 0]; // 黑色表示未完成
                                textDocument.strikeThru = false;
                            }
                            
                            textProp.setValue(textDocument);
                            found = true;
                            break;
                        }
                    }
                }
                
                if (found) break;
            }
            
            if (!found) {
                return JSON.stringify({
                    success: false, 
                    error: "未找到ID为" + todo.id + "的待办事项图层"
                });
            }
            
            return JSON.stringify({success: true});
        } catch (e) {
            return JSON.stringify({success: false, error: e.message});
        }
    },
    
    /**
     * 更新所有待办事项图层状态
     * @param {string} todosStr - JSON字符串形式的待办事项数组(经过URL编码)
     * @returns {string} - JSON字符串形式的结果对象
     */
    updateTodoLayers: function(todosStr) {
        try {
            // 重新创建所有图层可能更简单且更可靠
            return this.createTodoLayers(todosStr);
        } catch (e) {
            return JSON.stringify({success: false, error: e.message});
        }
    }
};

// 初始化函数，确保存储路径存在
(function() {
    $.todo.getStoragePath();
})(); 