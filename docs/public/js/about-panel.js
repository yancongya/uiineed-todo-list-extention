// 关于我面板组件
// 使用立即执行函数确保代码尽快执行

// 自定义弹窗函数 - 参考index.html样式
function showCustomAlert(title, message) {
  // 创建弹窗HTML
  const alertHTML = `
    <div class="custom-alert-overlay" style="
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-color: rgba(0, 0, 0, 0.5);
      display: flex;
      justify-content: center;
      align-items: center;
      z-index: 10000;
    ">
      <div class="custom-alert" style="
        background-color: var(--vp-c-bg);
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        border: 1px solid var(--vp-c-border);
        width: 280px;
        max-width: 90%;
        padding: 15px;
        animation: popIn 0.3s forwards;
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
      ">
        <div class="custom-alert-title" style="
          font-size: 18px;
          font-weight: 600;
          margin-bottom: 10px;
          color: var(--vp-c-text-1);
          text-align: center;
        ">${title}</div>
        <div class="custom-alert-content" style="
          font-size: 16px;
          line-height: 1.5;
          margin-bottom: 15px;
          color: var(--vp-c-text-2);
          text-align: center;
        ">${message}</div>
        <div class="custom-alert-buttons" style="
          display: flex;
          justify-content: center;
          gap: 10px;
        ">
          <button class="custom-alert-btn confirm" style="
            padding: 8px 16px;
            border-radius: 4px;
            border: none;
            font-size: 14px;
            cursor: pointer;
            transition: all 0.2s;
            font-weight: 500;
            background-color: #4a7bff;
            color: white;
          ">确定</button>
        </div>
      </div>
    </div>
  `;

  // 添加到页面
  document.body.insertAdjacentHTML('beforeend', alertHTML);

  // 获取元素并绑定事件
  const overlay = document.querySelector('.custom-alert-overlay:last-child');
  const confirmBtn = overlay.querySelector('.confirm');

  confirmBtn.addEventListener('click', () => {
    overlay.querySelector('.custom-alert').style.animation = 'popOut 0.3s forwards';
    setTimeout(() => {
      document.body.removeChild(overlay);
    }, 300);
  });

  // ESC键关闭
  const escHandler = (e) => {
    if (e.key === 'Escape') {
      confirmBtn.click();
      document.removeEventListener('keydown', escHandler);
    }
  };
  document.addEventListener('keydown', escHandler);

  // 自动聚焦确定按钮
  confirmBtn.focus();
}

// 备用复制方法
function fallbackCopyTextToClipboard(text) {
  const textArea = document.createElement("textarea");
  textArea.value = text;
  textArea.style.top = "0";
  textArea.style.left = "0";
  textArea.style.position = "fixed";
  document.body.appendChild(textArea);
  textArea.focus();
  textArea.select();

  try {
    const successful = document.execCommand('copy');
    if (successful) {
      showCustomAlert('复制成功', '已复制到剪贴板: ' + text);
    } else {
      showCustomAlert('复制失败', '请手动复制: ' + text);
    }
  } catch (err) {
    console.error('复制失败:', err);
    showCustomAlert('复制失败', '请手动复制: ' + text);
  }

  document.body.removeChild(textArea);
}

// 全局函数：复制邮箱
window.copyEmail = function() {
  const email = '2655283737@qq.com';
  if (navigator.clipboard && window.isSecureContext) {
    navigator.clipboard.writeText(email).then(() => {
      showCustomAlert('邮箱已复制到剪贴板', email);
    }).catch(err => {
      console.error('复制失败:', err);
      fallbackCopyTextToClipboard(email);
    });
  } else {
    fallbackCopyTextToClipboard(email);
  }
};

// 全局函数：复制微信号
window.copyWechat = function() {
  const wechat = 'Tycon3';
  if (navigator.clipboard && window.isSecureContext) {
    navigator.clipboard.writeText(wechat).then(() => {
      showCustomAlert('微信号已复制到剪贴板', wechat);
    }).catch(err => {
      console.error('复制失败:', err);
      fallbackCopyTextToClipboard(wechat);
    });
  } else {
    fallbackCopyTextToClipboard(wechat);
  }
};

(function() {
  // 添加自定义样式 - 支持明暗模式
  const customStyles = document.createElement('style');
  customStyles.textContent = `
    /* 为关于我面板添加明暗模式支持 */
    :root {
      --vp-icon-filter: none;
    }

    html.dark {
      --vp-icon-filter: invert(1);
    }

    .about-panel-theme {
      transition: background-color 0.3s ease, border-color 0.3s ease, color 0.3s ease;
    }

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
      border-radius: 8px;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
      overflow: hidden;
      max-width: 90%;
      transition: background-color 0.3s ease, border-color 0.3s ease;
    }
    .custom-alert-title {
      padding: 16px;
      font-size: 18px;
      font-weight: bold;
      border-bottom: 1px solid var(--vp-c-border, #eee);
      text-align: center;
    }
    .custom-alert-content {
      padding: 16px;
    }
    .custom-alert-buttons {
      padding: 12px 16px;
      display: flex;
      justify-content: center;
      border-top: 1px solid var(--vp-c-border, #eee);
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
  // 创建关于我面板的HTML结构 - 完全参考index.html样式，在图标下方弹出
  const aboutPanelHTML = `
    <div id="about-panel" class="popup about-panel-theme" style="
      display: none;
      position: fixed;
      border-radius: 8px;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
      border: 2px solid var(--vp-c-border);
      padding: 24px;
      width: 220px;
      z-index: 9999;
      animation: popIn 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
      background-color: var(--vp-c-bg);
      color: var(--vp-c-text-1);
    ">
        <button id="about-panel-close" style="position: absolute; top: 8px; right: 8px; background: none; border: none; font-size: 18px; cursor: pointer; color: #999; z-index: 10;">&times;</button>

        <!-- 作者信息区域 -->
        <div class="author" style="
          font-size: 16px;
          font-weight: bold;
          margin: 0px 0 12px;
          display: flex;
          align-items: center;
          justify-content: flex-start;
        ">
          <img src="/doc/author.gif" alt="作者头像" style="
            margin-right: 8px;
            width: 44px;
            height: 44px;
            border-radius: 48px;
            display: inline-block;
          ">
          <span>烟囱鸭</span>
        </div>

        <!-- 描述文字 -->
        <div class="author-desc" style="
          font-size: 15px;
          line-height: 1.4;
          color: var(--vp-c-text-2);
          margin-bottom: 12px;
        ">
          简简单单喜欢探索设计和开发的动效设计师.
        </div>

        <!-- 社交媒体图标 -->
        <div class="social" style="
          margin: 12px 0;
          display: flex;
          justify-content: space-between;
          align-items: center;
        ">
          <a href="https://github.com/yancongya" target="_blank" class="social-link" style="opacity: 0.65; outline: none;">
            <img src="/doc/img/social/github.svg" class="ic-social" alt="GitHub" title="GitHub" style="
              width: auto;
              height: 20px;
              filter: var(--vp-icon-filter);
            ">
          </a>
          <a href="https://www.xiaohongshu.com/user/profile/5c009931f7e8b962bb328c6d" target="_blank" class="social-link" style="opacity: 0.65; outline: none;">
            <img src="/doc/img/social/xiaohongshu.svg" class="ic-social" alt="小红书" title="小红书" style="
              width: auto;
              height: 20px;
              filter: var(--vp-icon-filter);
            ">
          </a>
          <a href="https://space.bilibili.com/100881808?spm_id_from=333.1387.0.0" target="_blank" class="social-link" style="opacity: 0.65; outline: none;">
            <img src="/doc/img/social/bilibili.svg" class="ic-social" alt="哔哩哔哩" title="哔哩哔哩" style="
              width: auto;
              height: 20px;
              filter: var(--vp-icon-filter);
            ">
          </a>
          <a href="https://afdian.tv/a/tycon" target="_blank" class="social-link" style="opacity: 0.65; outline: none;">
            <img src="/doc/img/social/aifadian.svg" class="ic-social" alt="爱发电" title="爱发电" style="
              width: auto;
              height: 20px;
              filter: var(--vp-icon-filter);
            ">
          </a>
          <a href="javascript:void(0);" class="social-link" id="copy-email-btn" style="opacity: 0.65; outline: none; cursor: pointer;">
            <img src="/doc/img/social/mail.svg" class="ic-social" alt="邮箱" title="点击复制邮箱" style="
              width: auto;
              height: 20px;
              filter: var(--vp-icon-filter);
            ">
          </a>
        </div>

        <!-- 项目链接 -->
        <a href="https://github.com/yancongya/uiineed-todo-list-extention" target="_blank" class="inspiration" style="
          display: block;
          margin-bottom: 12px;
          text-decoration: none;
          color: #ff5858;
          font-size: 14px;
        ">
          🔖开源项目↗
        </a>

        <!-- 微信联系信息 -->
        <div class="zanshan" style="margin: 12px 0 0;">
          <p style="
            font-size: 14px;
            text-align: left;
            display: block;
            margin: 12px 0 6px;
          ">有问题可以添加微信☕</p>
          <img src="/doc/img/wechat_qrcode.jpg" alt="微信二维码" class="zanshan-qr" id="copy-wechat-btn" style="
            width: 100%;
            height: auto;
            border-radius: 8px;
            cursor: pointer;
          " title="点击复制微信号">
        </div>
      </div>
  `;
  
  // 添加动画样式 - 参考index.html样式
  const animationStyle = document.createElement('style');
  animationStyle.textContent = `
    @keyframes popIn {
      0% {
        transform: scale(0.8);
        opacity: 0;
      }
      100% {
        transform: scale(1);
        opacity: 1;
      }
    }

    @keyframes popOut {
      0% {
        transform: scale(1);
        opacity: 1;
      }
      100% {
        transform: scale(0.8);
        opacity: 0;
      }
    }

    .social-link:hover {
      opacity: 1 !important;
    }

    .social-link:hover .ic-social {
      transform: scale(1.1);
      transition: transform 0.2s ease;
    }

    .ic-social {
      transition: transform 0.2s ease;
    }

    .zanshan-qr:hover {
      transform: scale(1.05);
      transition: transform 0.2s ease;
    }

    .inspiration:hover {
      color: #ff3838 !important;
      transition: color 0.2s ease;
    }
  `;
  document.head.appendChild(animationStyle);

  // 将面板添加到文档中
  document.body.insertAdjacentHTML('beforeend', aboutPanelHTML);

  // 获取DOM元素
  const aboutPanel = document.getElementById('about-panel');
  const closeButton = document.getElementById('about-panel-close');
  const copyEmailBtn = document.getElementById('copy-email-btn');
  const copyWechatBtn = document.getElementById('copy-wechat-btn');

  // 关闭面板的函数
  function closeAboutPanel() {
    aboutPanel.style.display = 'none';
  }

  // 添加关闭按钮事件
  closeButton.addEventListener('click', closeAboutPanel);

  // 添加复制邮箱事件
  copyEmailBtn.addEventListener('click', function(e) {
    e.preventDefault();
    e.stopPropagation();
    copyEmail();
  });

  // 添加复制微信事件
  copyWechatBtn.addEventListener('click', function(e) {
    e.preventDefault();
    e.stopPropagation();
    copyWechat();
  });

  // 点击页面其他地方关闭面板
  document.addEventListener('click', function(e) {
    if (aboutPanel.style.display === 'block' &&
        !aboutPanel.contains(e.target) &&
        !e.target.closest('img[src*="author.gif"]') &&
        !e.target.closest('a[aria-label="关于我"]')) {
      closeAboutPanel();
    }
  });

  // 添加ESC键关闭面板
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && aboutPanel.style.display === 'block') {
      closeAboutPanel();
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
    e.stopPropagation();

    // 获取点击的图标元素
    const clickedElement = e.target.closest('img[src*="author.gif"]') || e.target.closest('a[aria-label="关于我"]');
    if (clickedElement) {
      const rect = clickedElement.getBoundingClientRect();

      // 计算面板位置（在图标下方）
      const panelTop = rect.bottom + window.scrollY + 8; // 8px间距
      const panelRight = window.innerWidth - rect.right - window.scrollX;

      // 设置面板位置
      aboutPanel.style.top = panelTop + 'px';
      aboutPanel.style.right = panelRight + 'px';
      aboutPanel.style.display = 'block';
    }
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
        showAboutPanel(e);
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
        showAboutPanel(e);
        return false;
      };
    });
  }, 1000);
});

})();