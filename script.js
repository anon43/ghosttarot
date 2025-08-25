// Mobile Menu Toggle
const mobileMenuBtn = document.getElementById("mobile-menu-btn")
const mobileMenu = document.getElementById("mobile-menu")
const mobileMenuClose = document.getElementById("mobile-menu-close")
const mobileMenuLinks = document.querySelectorAll(".mobile-menu-link")

function openMobileMenu() {
  mobileMenu.classList.remove("hidden")
  document.body.style.overflow = "hidden"
  // Add stagger animation to menu items
  const menuItems = document.querySelectorAll(".mobile-menu-item")
  menuItems.forEach((item, index) => {
    item.style.animationDelay = `${0.1 + index * 0.1}s`
  })
}

function closeMobileMenu() {
  mobileMenu.classList.add("hidden")
  document.body.style.overflow = "auto"
}

mobileMenuBtn.addEventListener("click", openMobileMenu)

if (mobileMenuClose) {
  mobileMenuClose.addEventListener("click", closeMobileMenu)
}

mobileMenuLinks.forEach((link) => {
  link.addEventListener("click", closeMobileMenu)
})

// Close menu when clicking outside its area
mobileMenu.addEventListener("click", (e) => {
  if (e.target === mobileMenu) {
    closeMobileMenu()
  }
})

// Smooth Scrolling Function
function scrollToSection(sectionId) {
  const section = document.getElementById(sectionId)
  if (section) {
    section.scrollIntoView({
      behavior: "smooth",
      block: "start",
    })
  }
}

// Telegram Contact Function
function openTelegram() {
  // Замените @yourusername на ваш реальный Telegram username
  window.open("https://t.me/Ghost111Ghost", "_blank")
}

// Intersection Observer for Animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px",
}

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("fade-in-up")
      entry.target.style.animationDelay = "0.2s"
    }
  })
}, observerOptions)

// Observe all sections for animations
document.addEventListener("DOMContentLoaded", () => {
  const sections = document.querySelectorAll("section")
  sections.forEach((section) => {
    observer.observe(section)
  })

  // Add loading animation to cards
  const cards = document.querySelectorAll(".service-card, .review-card, .mystical-card")
  cards.forEach((card, index) => {
    card.classList.add("loading")
    setTimeout(() => {
      card.classList.add("loaded")
    }, index * 100)
  })

  // Parallax effect for floating cards
  const floatingCards = document.querySelectorAll(".floating-card")

  window.addEventListener("scroll", () => {
    const scrolled = window.pageYOffset
    const rate = scrolled * -0.5

    floatingCards.forEach((card, index) => {
      const speed = (index + 1) * 0.3
      card.style.transform = `translateY(${rate * speed}px) rotate(${scrolled * 0.01}deg)`
    })
  })

  // Add mystical hover effects to service cards
  const serviceCards = document.querySelectorAll(".service-card")
  serviceCards.forEach((card) => {
    card.addEventListener("mouseenter", () => {
      card.style.boxShadow = "0 25px 50px rgba(236, 72, 153, 0.4)"
    })

    card.addEventListener("mouseleave", () => {
      card.style.boxShadow = ""
    })
  })

  // Typing effect for hero title (optional enhancement)
  const heroTitle = document.querySelector("h1")
  if (heroTitle) {
    heroTitle.style.opacity = "0"
    setTimeout(() => {
      heroTitle.style.opacity = "1"
      heroTitle.classList.add("glow-animation")
    }, 500)
  }

  // Add click effects to buttons
  const buttons = document.querySelectorAll("button")
  buttons.forEach((button) => {
    button.addEventListener("click", function (e) {
      const ripple = document.createElement("span")
      const rect = this.getBoundingClientRect()
      const size = Math.max(rect.width, rect.height)
      const x = e.clientX - rect.left - size / 2
      const y = e.clientY - rect.top - size / 2

      ripple.style.width = ripple.style.height = size + "px"
      ripple.style.left = x + "px"
      ripple.style.top = y + "px"
      ripple.classList.add("ripple")

      this.appendChild(ripple)

      setTimeout(() => {
        ripple.remove()
      }, 600)
    })
  })

  // Mobile-specific optimizations
  const isMobile = window.innerWidth <= 768

  if (isMobile) {
    // Disable heavy animations on mobile
    const heavyAnimations = document.querySelectorAll(".glow-animation, .mystical-pulse")
    heavyAnimations.forEach((element) => {
      element.style.animation = "none"
    })

    // Optimize touch interactions
    const touchElements = document.querySelectorAll("button, .service-card, .review-card")
    touchElements.forEach((element) => {
      element.style.cursor = "pointer"
      element.addEventListener("touchstart", function () {
        this.style.transform = "scale(0.98)"
      })
      element.addEventListener("touchend", function () {
        this.style.transform = ""
      })
    })

    // Improve scroll performance
    let ticking = false
    function updateScrollEffects() {
      const nav = document.querySelector("nav")
      if (window.scrollY > 50) {
        nav.style.background = "rgba(0, 0, 0, 0.98)"
        nav.style.backdropFilter = "blur(20px)"
      } else {
        nav.style.background = "rgba(0, 0, 0, 0.95)"
        nav.style.backdropFilter = "blur(10px)"
      }
      ticking = false
    }

    window.addEventListener("scroll", () => {
      if (!ticking) {
        requestAnimationFrame(updateScrollEffects)
        ticking = true
      }
    })
  }
})

// Add CSS for ripple effect
const style = document.createElement("style")
style.textContent = `
    button {
        position: relative;
        overflow: hidden;
    }
    
    .ripple {
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.3);
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

// Navbar background on scroll
window.addEventListener("scroll", () => {
  const nav = document.querySelector("nav")
  if (window.scrollY > 100) {
    nav.style.background = "rgba(0, 0, 0, 0.95)"
    nav.style.backdropFilter = "blur(20px)"
  } else {
    nav.style.background = "rgba(0, 0, 0, 0.9)"
    nav.style.backdropFilter = "blur(10px)"
  }
})

// Add mystical cursor trail effect (optional)
document.addEventListener("mousemove", (e) => {
  const trail = document.createElement("div")
  trail.className = "cursor-trail"
  trail.style.left = e.clientX + "px"
  trail.style.top = e.clientY + "px"
  document.body.appendChild(trail)

  setTimeout(() => {
    trail.remove()
  }, 1000)
})

// Add cursor trail CSS
const cursorStyle = document.createElement("style")
cursorStyle.textContent = `
    .cursor-trail {
        position: fixed;
        width: 4px;
        height: 4px;
        background: rgba(236, 72, 153, 0.6);
        border-radius: 50%;
        pointer-events: none;
        z-index: 9999;
        animation: trail-fade 1s ease-out forwards;
    }
    
    @keyframes trail-fade {
        0% {
            opacity: 1;
            transform: scale(1);
        }
        100% {
            opacity: 0;
            transform: scale(0);
        }
    }
`
document.head.appendChild(cursorStyle)

// Mobile swipe support
let startY = 0
let startX = 0

document.addEventListener("touchstart", (e) => {
  startY = e.touches[0].clientY
  startX = e.touches[0].clientX
})

document.addEventListener("touchend", (e) => {
  const endY = e.changedTouches[0].clientY
  const endX = e.changedTouches[0].clientX
  const diffY = startY - endY
  const diffX = startX - endX

  // Swipe down to close mobile menu
  if (diffY < -100 && Math.abs(diffX) < 100 && !mobileMenu.classList.contains("hidden")) {
    closeMobileMenu()
  }
})

// Handle orientation change
window.addEventListener("orientationchange", () => {
  setTimeout(() => {
    window.scrollTo(0, window.scrollY)
  }, 100)
})
