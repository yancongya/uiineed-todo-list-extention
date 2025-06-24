// 自定义主题配置
import DefaultTheme from 'vitepress/theme'
import './style.css'
import { onMounted, watch, nextTick } from 'vue'
import { useRoute } from 'vitepress'

export default {
  extends: DefaultTheme,
  enhanceApp({ app, router, siteData }) {
    // 全局组件注册或其他应用级配置
  },
  setup() {
    const route = useRoute()
    
    // 页面切换动画
    const initPageTransition = () => {
      const content = document.querySelector('.VPContent')
      if (content) {
        content.style.opacity = '0'
        content.style.transform = 'translateY(20px)'
        
        nextTick(() => {
          content.style.transition = 'all 0.3s cubic-bezier(0.33, 1, 0.68, 1)'
          content.style.opacity = '1'
          content.style.transform = 'translateY(0)'
        })
      }
    }
    
    // 监听路由变化
    watch(
      () => route.path,
      () => {
        nextTick(() => {
          initPageTransition()
          initScrollAnimations()
          initInteractiveElements()
        })
      },
      { immediate: true }
    )
    
    onMounted(() => {
      initScrollAnimations()
      initInteractiveElements()
      initThemeToggle()
      initProgressBar()
    })
  }
}

// 滚动动画
function initScrollAnimations() {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  }
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1'
        entry.target.style.transform = 'translateY(0)'
      }
    })
  }, observerOptions)
  
  // 观察需要动画的元素
  const animatedElements = document.querySelectorAll(
    '.vp-doc h1, .vp-doc h2, .vp-doc h3, .vp-doc p, .VPFeature'
  )
  
  animatedElements.forEach(el => {
    el.style.opacity = '0'
    el.style.transform = 'translateY(30px)'
    el.style.transition = 'all 0.6s cubic-bezier(0.33, 1, 0.68, 1)'
    observer.observe(el)
  })
}

// 交互元素增强
function initInteractiveElements() {
  // 按钮波纹效果
  const buttons = document.querySelectorAll('.VPButton')
  buttons.forEach(button => {
    button.addEventListener('click', createRipple)
  })
  
  // 卡片悬停效果
  const features = document.querySelectorAll('.VPFeature')
  features.forEach(feature => {
    feature.addEventListener('mouseenter', () => {
      feature.style.transform = 'translateY(-8px) scale(1.02)'
    })
    
    feature.addEventListener('mouseleave', () => {
      feature.style.transform = 'translateY(0) scale(1)'
    })
  })
  
  // 导航链接动画
  const navLinks = document.querySelectorAll('.VPNavBarMenuLink')
  navLinks.forEach(link => {
    link.addEventListener('mouseenter', () => {
      link.style.transform = 'translateY(-2px)'
    })
    
    link.addEventListener('mouseleave', () => {
      link.style.transform = 'translateY(0)'
    })
  })
}

// 波纹效果
function createRipple(event) {
  const button = event.currentTarget
  const ripple = document.createElement('span')
  const rect = button.getBoundingClientRect()
  const size = Math.max(rect.width, rect.height)
  const x = event.clientX - rect.left - size / 2
  const y = event.clientY - rect.top - size / 2
  
  ripple.style.width = ripple.style.height = size + 'px'
  ripple.style.left = x + 'px'
  ripple.style.top = y + 'px'
  ripple.classList.add('ripple')
  
  // 添加波纹样式
  if (!document.querySelector('.ripple-style')) {
    const style = document.createElement('style')
    style.className = 'ripple-style'
    style.textContent = `
      .ripple {
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.6);
        transform: scale(0);
        animation: ripple-animation 0.6s linear;
        pointer-events: none;
      }
      
      @keyframes ripple-animation {
        to {
          transform: scale(4);
          opacity: 0;
        }
      }
    `
    document.head.appendChild(style)
  }
  
  button.appendChild(ripple)
  
  setTimeout(() => {
    ripple.remove()
  }, 600)
}

// 主题切换动画
function initThemeToggle() {
  const themeToggle = document.querySelector('.VPSwitchAppearance')
  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      document.documentElement.style.transition = 'color-scheme 0.3s ease'
      setTimeout(() => {
        document.documentElement.style.transition = ''
      }, 300)
    })
  }
}

// 阅读进度条
function initProgressBar() {
  // 创建进度条
  const progressBar = document.createElement('div')
  progressBar.className = 'reading-progress'
  progressBar.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    width: 0%;
    height: 3px;
    background: linear-gradient(90deg, var(--vp-c-brand), var(--vp-c-brand-light));
    z-index: 1000;
    transition: width 0.1s ease;
  `
  document.body.appendChild(progressBar)
  
  // 更新进度
  function updateProgress() {
    const scrollTop = window.pageYOffset
    const docHeight = document.documentElement.scrollHeight - window.innerHeight
    const scrollPercent = (scrollTop / docHeight) * 100
    progressBar.style.width = Math.min(scrollPercent, 100) + '%'
  }
  
  window.addEventListener('scroll', updateProgress)
  updateProgress()
}

// 平滑滚动到锚点
function initSmoothScroll() {
  document.addEventListener('click', (e) => {
    const target = e.target.closest('a[href^="#"]')
    if (target) {
      e.preventDefault()
      const id = target.getAttribute('href').slice(1)
      const element = document.getElementById(id)
      if (element) {
        element.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        })
      }
    }
  })
}

// 键盘导航支持
function initKeyboardNavigation() {
  document.addEventListener('keydown', (e) => {
    // Ctrl/Cmd + K 打开搜索
    if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
      e.preventDefault()
      const searchButton = document.querySelector('.DocSearch-Button')
      if (searchButton) {
        searchButton.click()
      }
    }
    
    // ESC 关闭侧边栏（移动端）
    if (e.key === 'Escape') {
      const sidebar = document.querySelector('.VPSidebar')
      if (sidebar && sidebar.classList.contains('open')) {
        const backdrop = document.querySelector('.VPSidebarBackdrop')
        if (backdrop) {
          backdrop.click()
        }
      }
    }
  })
}

// 初始化所有功能
if (typeof window !== 'undefined') {
  window.addEventListener('DOMContentLoaded', () => {
    initSmoothScroll()
    initKeyboardNavigation()
  })
}