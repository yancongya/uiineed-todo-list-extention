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
        try {
            var todos = JSON.parse(decodeURIComponent(todosStr));
            var path = this.getStoragePath();
            var file = new File(path + "todo.list");
            
            file.open("w");
            file.write(JSON.stringify(todos, null, 2));
            file.close();
            
            return JSON.stringify({success: true});
        } catch (e) {
            return JSON.stringify({success: false, error: e.message});
        }
    },
    
    /**
     * 加载待办事项
     * @returns {string} - JSON字符串形式的结果对象，包含待办事项数组或错误信息
     */
    loadTodos: function() {
        try {
            var path = this.getStoragePath();
            var file = new File(path + "todo.list");
            
            if (!file.exists) {
                return JSON.stringify({success: true, data: []});
            }
            
            file.open("r");
            var content = file.read();
            file.close();
            
            return JSON.stringify({
                success: true, 
                data: JSON.parse(content)
            });
        } catch (e) {
            return JSON.stringify({success: false, error: e.message});
        }
    },
    
    /**
     * 获取存储路径
     * @returns {string} - 待办事项存储的文件夹路径
     */
    getStoragePath: function() {
        // 使用扩展根目录而不是用户文档
        var extensionPath = new File($.fileName).parent.parent.absoluteURI + "/";
        // 返回解码后的路径，避免显示URL编码
        return decodeURI(extensionPath);
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