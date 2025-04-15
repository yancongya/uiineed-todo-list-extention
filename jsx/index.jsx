// UINeed Todo ExtendScript入口文件

// 创建全局命名空间
$.todo = {
    /**
     * 测试函数 - 显示一个简单的提示
     * @returns {String} 测试消息
     */
    test: function() {
        alert("UINeed Todo ExtendScript加载成功!");
        return "ExtendScript连接成功";
    },
    
    /**
     * 从文件中获取待办事项
     * 初期仍使用传入的数据，后期会从文件读取
     * @param {String} todosStr 待办事项JSON字符串
     * @returns {String} 同样的JSON字符串返回
     */
    getTodos: function(todosStr) {
        try {
            // 这里只是简单地返回相同的数据
            // 后期会实现从文件读取
            return todosStr;
        } catch(e) {
            alert("获取待办事项时出错: " + e.message);
            return "[]";
        }
    },
    
    /**
     * 保存待办事项到文件
     * 初期仍打印传入的数据而不保存到文件
     * @param {String} todosStr 待办事项JSON字符串
     * @returns {String} 成功消息
     */
    saveTodos: function(todosStr) {
        try {
            var todos = JSON.parse(decodeURIComponent(todosStr));
            // 在控制台输出数据，但不保存到文件
            $.writeln("待办事项将被保存:");
            $.writeln(JSON.stringify(todos, null, 2));
            
            // 后期实现文件保存
            
            return "success";
        } catch(e) {
            alert("保存待办事项时出错: " + e.message);
            return "error: " + e.message;
        }
    },
    
    /**
     * 创建待办事项文本图层
     * @param {String} todosStr 待办事项JSON字符串
     * @returns {String} 成功或失败消息
     */
    createTodoLayers: function(todosStr) {
        try {
            var todos = JSON.parse(decodeURIComponent(todosStr));
            
            // 检查是否有激活的合成
            var activeItem = app.project.activeItem;
            if (!activeItem || !(activeItem instanceof CompItem)) {
                return "错误：请先创建或选择一个合成";
            }
            
            // 为每个待办事项创建一个文本图层
            var layersCreated = 0;
            for (var i = 0; i < todos.length; i++) {
                var todo = todos[i];
                if (todo.removed) continue; // 跳过已删除的项目
                
                var textLayer = activeItem.layers.addText(todo.title);
                
                // 设置图层位置
                var textProp = textLayer.property("ADBE Text Properties").property("ADBE Text Document");
                var textDocument = textProp.value;
                
                // 根据完成状态设置不同颜色
                if (todo.completed) {
                    textDocument.fillColor = [0, 0.8, 0]; // 绿色表示已完成
                } else {
                    textDocument.fillColor = [1, 1, 1]; // 白色表示未完成
                }
                
                textProp.setValue(textDocument);
                
                // 设置图层位置（从上到下排列）
                textLayer.position.setValue([activeItem.width / 2, 100 + i * 40]);
                
                layersCreated++;
            }
            
            return "成功创建了 " + layersCreated + " 个待办事项图层";
        } catch(e) {
            alert("创建待办事项图层时出错: " + e.message);
            return "error: " + e.message;
        }
    }
};

// 告知已加载
$.writeln("UINeed Todo ExtendScript已加载!"); 