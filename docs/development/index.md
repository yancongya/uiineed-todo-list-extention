# 开发文档

欢迎来到 UINeed Todo AE 扩展的开发文档。本文档为开发者提供技术细节、架构说明和贡献指南。

## 🏗️ 项目架构

### 技术栈

#### 前端技术
- **Vue.js 2.x**: 响应式UI框架
- **HTML5/CSS3**: 现代Web标准
- **JavaScript ES6+**: 现代JavaScript特性
- **CSS Grid/Flexbox**: 响应式布局

#### AE集成技术
- **Adobe CEP (Common Extensibility Platform)**: 扩展开发框架
- **ExtendScript**: AE脚本引擎
- **CSInterface**: CEP与ExtendScript通信接口

### 项目结构

```
Uiineed-Todo-List-For-AE/
├── CSXS/                    # CEP配置文件
│   └── manifest.xml         # 扩展清单文件
├── jsx/                     # ExtendScript文件
│   └── index.jsx           # 主要脚本逻辑
├── public/                  # 静态资源
│   ├── css/                # 样式文件
│   │   └── style.css       # 主样式文件
│   ├── js/                 # JavaScript文件
│   │   ├── app.js          # Vue应用主文件
│   │   └── github-pages-adapter.js # GitHub Pages适配器
│   ├── img/                # 图片资源
│   └── front/              # 前端组件
├── lib/                    # 第三方库
│   └── CSInterface.js      # Adobe CEP接口库
├── docs/                   # VitePress文档
├── index.html              # 主HTML文件
├── README.md               # 项目说明
└── LICENSE                 # 开源协议
```

## 🔧 开发环境搭建

### 前置要求

- **Adobe After Effects** CC 2018 或更高版本
- **Node.js** 14.0 或更高版本（用于文档开发）
- **Git** 版本控制工具
- **代码编辑器** (推荐 VS Code)

### 环境配置

#### 1. 克隆项目
```bash
git clone https://github.com/yancongya/Uiineed-Todo-List-For-AE.git
cd Uiineed-Todo-List-For-AE
```

#### 2. 安装到AE扩展目录
```bash
# Windows
cp -r . "C:\Program Files (x86)\Common Files\Adobe\CEP\extensions\Uiineed-Todo-List-For-AE"

# macOS
cp -r . "/Library/Application Support/Adobe/CEP/extensions/Uiineed-Todo-List-For-AE"
```

#### 3. 启用CEP调试模式
```bash
# Windows
REG ADD HKEY_CURRENT_USER\Software\Adobe\CSXS.11 /v PlayerDebugMode /t REG_STRING /d 1

# macOS
defaults write com.adobe.CSXS.11 PlayerDebugMode 1
```

#### 4. 文档开发环境（可选）
```bash
cd docs
npm install
npm run dev
```

## 📝 核心模块说明

### 1. CEP配置 (CSXS/manifest.xml)

```xml
<?xml version="1.0" encoding="UTF-8"?>
<ExtensionManifest Version="7.0" ExtensionBundleId="Uiineed.Todo.List.For.AE">
  <ExtensionList>
    <Extension Id="Uiineed.Todo.List.For.AE" Version="1.0.0" />
  </ExtensionList>
  <ExecutionEnvironment>
    <HostList>
      <Host Name="AEFT" Version="15.0" />
    </HostList>
    <LocaleList>
      <Locale Code="All" />
    </LocaleList>
    <RequiredRuntimeList>
      <RequiredRuntime Name="CSXS" Version="11.0" />
    </RequiredRuntimeList>
  </ExecutionEnvironment>
  <DispatchInfoList>
    <Extension Id="Uiineed.Todo.List.For.AE">
      <DispatchInfo>
        <Resources>
          <MainPath>./index.html</MainPath>
          <ScriptPath>./jsx/index.jsx</ScriptPath>
        </Resources>
        <Lifecycle>
          <AutoVisible>true</AutoVisible>
        </Lifecycle>
        <UI>
          <Type>Panel</Type>
          <Menu>UINeed Todo@烟囱鸭</Menu>
          <Geometry>
            <Size>
              <Height>580</Height>
              <Width>350</Width>
            </Size>
            <MinSize>
              <Height>200</Height>
              <Width>250</Width>
            </MinSize>
            <MaxSize>
              <Height>2000</Height>
              <Width>800</Width>
            </MaxSize>
          </Geometry>
          <Icons>
            <Icon Type="Normal">./public/img/icon_normal.png</Icon>
            <Icon Type="RollOver">./public/img/icon_rollover.png</Icon>
            <Icon Type="DarkNormal">./public/img/icon_dark_normal.png</Icon>
            <Icon Type="DarkRollOver">./public/img/icon_dark_rollover.png</Icon>
          </Icons>
        </UI>
      </DispatchInfo>
    </Extension>
  </DispatchInfoList>
</ExtensionManifest>
```

### 2. ExtendScript模块 (jsx/index.jsx)

```javascript
// 全局命名空间
$.todo = {
    // 保存任务数据
    saveTodos: function(todosData) {
        try {
            var file = new File(this.getDataPath());
            var parentFolder = file.parent;
            
            if (!parentFolder.exists) {
                parentFolder.create();
            }
            
            file.open('w');
            file.encoding = 'UTF-8';
            file.write(todosData);
            file.close();
            
            return file.exists.toString();
        } catch (e) {
            return 'Error: ' + e.toString();
        }
    },
    
    // 加载任务数据
    loadTodos: function() {
        try {
            var file = new File(this.getDataPath());
            
            if (!file.exists) {
                return '{"todos":[], "slogan":"让创意更有序，让工作更高效"}';
            }
            
            file.open('r');
            file.encoding = 'UTF-8';
            var content = file.read();
            file.close();
            
            return content;
        } catch (e) {
            return '{"todos":[], "slogan":"让创意更有序，让工作更高效"}';
        }
    },
    
    // 获取数据文件路径
    getDataPath: function() {
        var userDocuments = Folder.myDocuments;
        return userDocuments.fullName + '/uiineed-todo-list/todos.json';
    }
};
```

### 3. Vue应用 (public/js/app.js)

```javascript
const { createApp } = Vue;

createApp({
    data() {
        return {
            todos: [],
            slogan: '让创意更有序，让工作更高效',
            newTodo: '',
            filter: 'all',
            editingTodo: null
        };
    },
    
    computed: {
        filteredTodos() {
            switch (this.filter) {
                case 'active':
                    return this.todos.filter(todo => !todo.completed);
                case 'completed':
                    return this.todos.filter(todo => todo.completed);
                default:
                    return this.todos;
            }
        }
    },
    
    methods: {
        addTodo() {
            if (this.newTodo.trim()) {
                this.todos.push({
                    id: Date.now(),
                    text: this.newTodo.trim(),
                    completed: false,
                    createdAt: new Date().toISOString()
                });
                this.newTodo = '';
                this.saveTodos();
            }
        },
        
        toggleTodo(todo) {
            todo.completed = !todo.completed;
            if (todo.completed) {
                todo.completedAt = new Date().toISOString();
            } else {
                delete todo.completedAt;
            }
            this.saveTodos();
        },
        
        removeTodo(todo) {
            const index = this.todos.indexOf(todo);
            if (index > -1) {
                this.todos.splice(index, 1);
                this.saveTodos();
            }
        },
        
        saveTodos() {
            const data = {
                todos: this.todos,
                slogan: this.slogan
            };
            
            if (typeof csInterface !== 'undefined') {
                csInterface.evalScript(`$.todo.saveTodos('${JSON.stringify(data)}')`);
            } else {
                localStorage.setItem('uiineed-todos', JSON.stringify(data));
            }
        },
        
        loadTodos() {
            if (typeof csInterface !== 'undefined') {
                csInterface.evalScript('$.todo.loadTodos()', (result) => {
                    try {
                        const data = JSON.parse(result);
                        this.todos = data.todos || [];
                        this.slogan = data.slogan || '让创意更有序，让工作更高效';
                    } catch (e) {
                        console.error('Failed to parse todos data:', e);
                    }
                });
            } else {
                const saved = localStorage.getItem('uiineed-todos');
                if (saved) {
                    try {
                        const data = JSON.parse(saved);
                        this.todos = data.todos || [];
                        this.slogan = data.slogan || '让创意更有序，让工作更高效';
                    } catch (e) {
                        console.error('Failed to parse saved todos:', e);
                    }
                }
            }
        }
    },
    
    mounted() {
        this.loadTodos();
    }
}).mount('#app');
```

## 🎨 样式系统

### CSS变量系统

```css
:root {
    /* 颜色系统 */
    --primary-color: #667eea;
    --primary-light: #764ba2;
    --secondary-color: #f093fb;
    --background-color: #ffffff;
    --surface-color: #f8f9fa;
    --text-primary: #2c3e50;
    --text-secondary: #6c757d;
    --border-color: #e9ecef;
    --shadow-color: rgba(0, 0, 0, 0.1);
    
    /* 尺寸系统 */
    --border-radius: 8px;
    --padding-sm: 8px;
    --padding-md: 16px;
    --padding-lg: 24px;
    --font-size-sm: 12px;
    --font-size-md: 14px;
    --font-size-lg: 16px;
    
    /* 动画系统 */
    --transition-fast: 0.15s ease;
    --transition-normal: 0.3s ease;
    --transition-slow: 0.5s ease;
}

/* 深色主题 */
[data-theme="dark"] {
    --background-color: #1a1a1a;
    --surface-color: #2d2d2d;
    --text-primary: #ffffff;
    --text-secondary: #b0b0b0;
    --border-color: #404040;
    --shadow-color: rgba(0, 0, 0, 0.3);
}
```

### 响应式设计

```css
/* 移动端适配 */
@media (max-width: 480px) {
    .todo-item {
        padding: var(--padding-sm);
        font-size: var(--font-size-sm);
    }
    
    .todo-input {
        font-size: var(--font-size-md);
    }
}

/* 高分辨率适配 */
@media (-webkit-min-device-pixel-ratio: 2) {
    .icon {
        background-size: contain;
    }
}
```

## 🔌 API接口

### CSInterface通信

```javascript
// 调用ExtendScript函数
csInterface.evalScript('$.todo.saveTodos(data)', callback);

// 监听AE事件
csInterface.addEventListener('com.adobe.csxs.events.ApplicationActivate', function(event) {
    // 应用激活时的处理
});

// 获取应用信息
const appInfo = csInterface.getHostEnvironment();
```

### 数据格式规范

```typescript
interface TodoItem {
    id: number;
    text: string;
    completed: boolean;
    createdAt: string;
    completedAt?: string;
    priority?: 'low' | 'medium' | 'high';
    category?: string;
}

interface TodoData {
    todos: TodoItem[];
    slogan: string;
    settings?: {
        theme: 'light' | 'dark' | 'auto';
        animations: boolean;
        autoSave: boolean;
    };
}
```

## 🧪 测试

### 单元测试

```javascript
// 测试任务创建
function testAddTodo() {
    const app = new TodoApp();
    const initialCount = app.todos.length;
    
    app.addTodo('Test todo');
    
    assert(app.todos.length === initialCount + 1);
    assert(app.todos[app.todos.length - 1].text === 'Test todo');
}

// 测试数据持久化
function testDataPersistence() {
    const app = new TodoApp();
    app.addTodo('Persistent todo');
    app.saveTodos();
    
    const newApp = new TodoApp();
    newApp.loadTodos();
    
    assert(newApp.todos.some(todo => todo.text === 'Persistent todo'));
}
```

### 集成测试

```javascript
// 测试AE集成
function testAEIntegration() {
    // 模拟AE环境
    global.csInterface = {
        evalScript: function(script, callback) {
            // 模拟ExtendScript执行
            callback('success');
        }
    };
    
    const app = new TodoApp();
    app.saveTodos();
    
    // 验证ExtendScript调用
    assert(mockEvalScript.called);
}
```

## 📦 构建与发布

### 构建脚本

```bash
#!/bin/bash
# build.sh

# 清理构建目录
rm -rf dist/
mkdir dist/

# 复制核心文件
cp -r CSXS/ dist/
cp -r jsx/ dist/
cp -r public/ dist/
cp -r lib/ dist/
cp index.html dist/
cp README.md dist/
cp LICENSE dist/

# 压缩资源文件
cd dist/
zip -r ../UINeed-Todo-AE-v1.0.0.zip .

echo "Build completed: UINeed-Todo-AE-v1.0.0.zip"
```

### 版本发布流程

1. **更新版本号**
   - 修改 `manifest.xml` 中的版本号
   - 更新 `package.json` 版本号
   - 更新文档中的版本引用

2. **测试验证**
   - 运行所有测试用例
   - 在多个AE版本中测试
   - 验证核心功能正常

3. **创建发布**
   - 提交代码到主分支
   - 创建Git标签
   - 生成发布包
   - 发布到GitHub Releases

## 🤝 贡献指南

### 开发流程

1. **Fork项目**
2. **创建功能分支**
   ```bash
   git checkout -b feature/new-feature
   ```
3. **开发和测试**
4. **提交代码**
   ```bash
   git commit -m "feat: add new feature"
   ```
5. **推送分支**
   ```bash
   git push origin feature/new-feature
   ```
6. **创建Pull Request**

### 代码规范

#### JavaScript规范
```javascript
// 使用const/let，避免var
const todos = [];
let currentFilter = 'all';

// 函数命名使用驼峰命名法
function addNewTodo(text) {
    // 函数体
}

// 对象属性使用简洁语法
const todo = {
    id,
    text,
    completed: false
};
```

#### CSS规范
```css
/* 使用BEM命名规范 */
.todo-list {
    /* 块级元素 */
}

.todo-list__item {
    /* 元素 */
}

.todo-list__item--completed {
    /* 修饰符 */
}

/* 使用CSS变量 */
.button {
    background-color: var(--primary-color);
    border-radius: var(--border-radius);
}
```

### 提交信息规范

```
type(scope): description

[optional body]

[optional footer]
```

**类型说明**：
- `feat`: 新功能
- `fix`: 修复bug
- `docs`: 文档更新
- `style`: 代码格式调整
- `refactor`: 代码重构
- `test`: 测试相关
- `chore`: 构建工具或辅助工具的变动

**示例**：
```
feat(ui): add dark theme support

Implement dark theme with CSS variables and theme switcher.
Includes automatic theme detection based on system preferences.

Closes #123
```

## 📚 参考资源

### Adobe CEP文档
- [CEP开发指南](https://github.com/Adobe-CEP/CEP-Resources)
- [ExtendScript工具指南](https://extendscript.docsforadobe.dev/)
- [After Effects脚本指南](https://ae-scripting.docsforadobe.dev/)

### 前端技术文档
- [Vue.js官方文档](https://vuejs.org/)
- [MDN Web文档](https://developer.mozilla.org/)
- [CSS Grid指南](https://css-tricks.com/snippets/css/complete-guide-grid/)

### 开发工具
- [VS Code CEP扩展](https://marketplace.visualstudio.com/items?itemName=Adobe.extendscript-debug)
- [ExtendScript Debugger](https://marketplace.visualstudio.com/items?itemName=Adobe.extendscript-debug)
- [CEP HTML Extension](https://github.com/Adobe-CEP/CEP-Resources/tree/master/CEP_9.x)

---

感谢您对 UINeed Todo AE 扩展开发的关注和贡献！如果您有任何技术问题或建议，欢迎通过 [GitHub Issues](https://github.com/yancongya/Uiineed-Todo-List-For-AE/issues) 与我们交流。