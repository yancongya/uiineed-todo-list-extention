// 关于我面板组件
// 使用立即执行函数确保代码尽快执行
(function() {
  // 添加自定义样式
  const customStyles = document.createElement('style');
  customStyles.textContent = `
    .custom-alert-overlay {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-color: rgba(0, 0, 0, 0.5);
      display: flex;
      justify-content: center;
      align-items: center;
      z-index: 9999;
    }
    .custom-alert {
      background-color: white;
      border-radius: 8px;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
      overflow: hidden;
      max-width: 90%;
    }
    .custom-alert-title {
      padding: 16px;
      font-size: 18px;
      font-weight: bold;
      border-bottom: 1px solid #eee;
      text-align: center;
    }
    .custom-alert-content {
      padding: 16px;
    }
    .custom-alert-buttons {
      padding: 12px 16px;
      display: flex;
      justify-content: center;
      border-top: 1px solid #eee;
    }
    .custom-alert-btn {
      padding: 8px 16px;
      border: none;
      border-radius: 4px;
      cursor: pointer;
      font-size: 14px;
      transition: background-color 0.3s;
    }
    .custom-alert-btn.confirm {
      background-color: #646cff;
      color: white;
    }
    .custom-alert-btn.confirm:hover {
      background-color: #535bf2;
    }
  `;
  document.head.appendChild(customStyles);

  // 主函数，在DOM加载完成后执行
  function initAboutPanel() {
  // 创建关于我面板的HTML结构
  const aboutPanelHTML = `
    <div id="about-panel-overlay" style="position: fixed; top: 0; left: 0; width: 100%; height: 100%; background-color: rgba(0, 0, 0, 0.5); display: none; justify-content: center; align-items: center; z-index: 9999;">
      <div id="about-panel" style="background-color: white; border-radius: 12px; box-shadow: 0 8px 24px rgba(0, 0, 0, 0.2); width: 360px; max-width: 90%; overflow: hidden; animation: fadeIn 0.3s ease;">
        <div style="padding: 20px; text-align: center; position: relative;">
          <button id="about-panel-close" style="position: absolute; top: 10px; right: 10px; background: none; border: none; font-size: 20px; cursor: pointer; color: #999;">&times;</button>
          <img src="/doc/author.gif" alt="作者头像" style="width: 100px; height: 100px; border-radius: 50%; margin: 10px auto 20px; object-fit: cover; border: 3px solid #646cff;">
          <h3 style="margin: 0 0 10px; font-size: 20px; color: #333;">烟囱鸭 & Rico</h3>
          <p style="margin: 0 0 20px; font-size: 14px; color: #666; line-height: 1.5;">专注于AE扩展开发，致力于提升设计师工作效率</p>
          
          <div style="display: flex; justify-content: center; gap: 24px; margin-top: 20px;">
            <a href="https://github.com/yancongya" target="_blank" style="text-decoration: none; color: #333;">
              <div style="display: flex; flex-direction: column; align-items: center;">
                <svg height="28" width="28" viewBox="0 0 16 16" style="fill: #333;">
                  <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"></path>
                </svg>
                <span style="font-size: 14px; margin-top: 8px; font-weight: 500;">GitHub</span>
              </div>
            </a>
            <a href="mailto:contact@example.com" style="text-decoration: none; color: #333;">
              <div style="display: flex; flex-direction: column; align-items: center;">
                <svg height="28" width="28" viewBox="0 0 24 24" style="fill: #333;">
                  <path d="M20 4H4C2.9 4 2.01 4.9 2.01 6L2 18C2 19.1 2.9 20 4 20H20C21.1 20 22 19.1 22 18V6C22 4.9 21.1 4 20 4ZM20 8L12 13L4 8V6L12 11L20 6V8Z"/>
                </svg>
                <span style="font-size: 14px; margin-top: 8px; font-weight: 500;">邮箱</span>
              </div>
            </a>
            <a href="https://space.bilibili.com/" target="_blank" style="text-decoration: none; color: #333;">
              <div style="display: flex; flex-direction: column; align-items: center;">
                <svg height="28" width="28" viewBox="0 0 24 24" style="fill: #333;">
                  <path d="M17.813 4.653h.854c1.51.054 2.769.578 3.773 1.574 1.004.995 1.524 2.249 1.56 3.76v7.36c-.036 1.51-.556 2.769-1.56 3.773s-2.262 1.524-3.773 1.56H5.333c-1.51-.036-2.769-.556-3.773-1.56S.036 18.858 0 17.347v-7.36c.036-1.511.556-2.765 1.56-3.76 1.004-.996 2.262-1.52 3.773-1.574h.774l-1.174-1.12a1.234 1.234 0 0 1-.373-.906c0-.356.124-.658.373-.907l.027-.027c.267-.249.573-.373.92-.373.347 0 .653.124.92.373L9.653 4.44c.071.071.134.142.187.213h4.267a.836.836 0 0 1 .16-.213l2.853-2.747c.267-.249.573-.373.92-.373.347 0 .662.151.929.4.267.249.391.551.391.907 0 .355-.124.657-.373.906L17.813 4.653zM5.333 7.24c-.746.018-1.373.276-1.88.773-.506.498-.769 1.13-.786 1.894v7.52c.017.764.28 1.395.786 1.893.507.498 1.134.756 1.88.773h13.334c.746-.017 1.373-.275 1.88-.773.506-.498.769-1.129.786-1.893v-7.52c-.017-.765-.28-1.396-.786-1.894-.507-.497-1.134-.755-1.88-.773H5.333zM8 11.107c.373 0 .684.124.933.373.25.249.383.569.4.96v1.173c-.017.391-.15.711-.4.96-.249.25-.56.374-.933.374s-.684-.125-.933-.374c-.25-.249-.383-.569-.4-.96V12.44c.017-.391.15-.711.4-.96.249-.249.56-.373.933-.373zm8 0c.373 0 .684.124.933.373.25.249.383.569.4.96v1.173c-.017.391-.15.711-.4.96-.249.25-.56.374-.933.374s-.684-.125-.933-.374c-.25-.249-.383-.569-.4-.96V12.44c.017-.391.15-.711.4-.96.249-.249.56-.373.933-.373z"/>
                </svg>
                <span style="font-size: 14px; margin-top: 8px; font-weight: 500;">哔哩哔哩</span>
              </div>
            </a>
          </div>
          
          <div style="margin-top: 25px; padding-top: 15px; border-top: 1px solid #eee;">
            <button id="about-panel-close-btn" style="background-color: #646cff; color: white; border: none; border-radius: 4px; padding: 8px 20px; font-size: 14px; cursor: pointer; transition: background-color 0.3s;">关闭</button>
          </div>
        </div>
      </div>
    </div>
  `;
  
  // 添加动画样式
  const animationStyle = document.createElement('style');
  animationStyle.textContent = `
    @keyframes fadeIn {
      from { opacity: 0; transform: translateY(-20px); }
      to { opacity: 1; transform: translateY(0); }
    }
  `;
  document.head.appendChild(animationStyle);

  // 将面板添加到文档中
  document.body.insertAdjacentHTML('beforeend', aboutPanelHTML);

  // 获取DOM元素
  const aboutPanelOverlay = document.getElementById('about-panel-overlay');
  const closeButton = document.getElementById('about-panel-close');
  const closeButtonBottom = document.getElementById('about-panel-close-btn');

  // 添加关闭按钮事件
  closeButton.addEventListener('click', function() {
    aboutPanelOverlay.style.display = 'none';
  });
  
  // 添加底部关闭按钮事件
  closeButtonBottom.addEventListener('click', function() {
    aboutPanelOverlay.style.display = 'none';
  });

  // 点击遮罩层关闭面板
  aboutPanelOverlay.addEventListener('click', function(e) {
    if (e.target === aboutPanelOverlay) {
      aboutPanelOverlay.style.display = 'none';
    }
  });

  // 添加ESC键关闭面板
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && aboutPanelOverlay.style.display === 'block') {
      aboutPanelOverlay.style.display = 'none';
    }
  });

  // 在DOM加载完成后，直接绑定点击事件到关于我图标
  console.log('关于我面板脚本已加载');
  
  // 使用MutationObserver监听DOM变化，确保在元素加载后绑定事件
  const observer = new MutationObserver(function(mutations) {
    // 尝试查找关于我图标
    const authorImages = document.querySelectorAll('img[src*="author.gif"]');
    if (authorImages.length > 0) {
      console.log('找到关于我图标:', authorImages.length, '个');
      
      // 为每个找到的图标添加点击事件
      authorImages.forEach(img => {
        // 获取最近的a标签父元素
        const linkParent = img.closest('a');
        if (linkParent) {
          console.log('为关于我图标添加点击事件');
          
          // 移除原有的点击事件（如果有）
          linkParent.removeEventListener('click', showAboutPanel);
          
          // 添加新的点击事件
          linkParent.addEventListener('click', showAboutPanel);
        }
      });
      
      // 找到元素后停止观察
      observer.disconnect();
    }
  });
  
  // 定义显示面板的函数
  function showAboutPanel(e) {
    console.log('关于我按钮被点击');
    e.preventDefault();
    aboutPanelOverlay.style.display = 'flex';
  }
  
  // 开始观察文档变化
  observer.observe(document.body, {
    childList: true,
    subtree: true
  });
  
  // 同时保留原来的点击事件监听，作为备用方案
  document.addEventListener('click', function(e) {
    const target = e.target;
    
    // 检查是否点击了关于我图标或其父元素
    if ((target.tagName === 'IMG' && target.src.includes('author.gif')) ||
        target.closest('a[aria-label="关于我"]')) {
      showAboutPanel(e);
    }
  });
}

// 如果DOM已加载完成，立即执行初始化
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initAboutPanel);
} else {
  // DOM已经加载完成，直接执行
  initAboutPanel();
}

// 添加全局点击事件处理，确保在任何情况下都能捕获点击
window.addEventListener('load', function() {
  console.log('Window loaded, adding global click handler');
  
  // 直接在window上添加点击事件，确保能捕获所有点击
  setTimeout(function() {
    const authorLinks = document.querySelectorAll('a[aria-label="关于我"]');
    console.log('找到关于我链接数量:', authorLinks.length);
    
    authorLinks.forEach(link => {
      console.log('为关于我链接添加直接点击事件');
      link.onclick = function(e) {
        e.preventDefault();
        console.log('关于我链接被点击');
        document.getElementById('about-panel-overlay').style.display = 'block';
        return false;
      };
    });
    
    // 查找所有author.gif图片并添加点击事件
    const authorImages = document.querySelectorAll('img[src*="author.gif"]');
    console.log('找到关于我图片数量:', authorImages.length);
    
    authorImages.forEach(img => {
      console.log('为关于我图片添加直接点击事件');
      img.style.cursor = 'pointer';
      img.onclick = function(e) {
        e.preventDefault();
        e.stopPropagation();
        console.log('关于我图片被点击');
        document.getElementById('about-panel-overlay').style.display = 'block';
        return false;
      };
    });
  }, 1000);
});

})();