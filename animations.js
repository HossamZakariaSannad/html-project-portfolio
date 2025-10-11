// ============================================
// MODERN PORTFOLIO JAVASCRIPT - HOSSAM ZAKARIA
// ============================================

document.addEventListener("DOMContentLoaded", function () {
  // ===== INITIALIZATION =====
  initializeApp();

  function initializeApp() {
    initLoader();
    initNavigation();
    initScrollEffects();
    initAnimations();
    initTypingEffect();
    initCounters();
    initContactForm();
    initParticles();
    initCursor();
  }

  // ===== LOADING SCREEN =====
  function initLoader() {
    const loader = document.querySelector(".loader-overlay");
    const body = document.body;

    // Hide loader after page loads
    window.addEventListener("load", () => {
      setTimeout(() => {
        loader.classList.add("hidden");
        body.style.overflow = "visible";

        // Remove loader from DOM after animation
        setTimeout(() => {
          if (loader) loader.remove();
        }, 500);
      }, 1000);
    });

    // Hide body scroll during loading
    body.style.overflow = "hidden";
  }

  // ===== NAVIGATION =====
  function initNavigation() {
    const navbar = document.getElementById("navbar");
    const hamburger = document.getElementById("hamburger");
    const navMenu = document.getElementById("nav-menu");
    const navLinks = document.querySelectorAll(".nav-link");

    // Navbar scroll effect
    let lastScroll = 0;
    window.addEventListener("scroll", () => {
      const currentScroll = window.pageYOffset;

      if (currentScroll > 100) {
        navbar.classList.add("scrolled");
      } else {
        navbar.classList.remove("scrolled");
      }

      lastScroll = currentScroll;
    });

    // Mobile menu toggle
    hamburger?.addEventListener("click", () => {
      hamburger.classList.toggle("active");
      navMenu.classList.toggle("active");
      document.body.classList.toggle("menu-open");
    });

    // Close mobile menu on link click
    navLinks.forEach((link) => {
      link.addEventListener("click", (e) => {
        e.preventDefault(); // Prevent default immediate jump

        // Scroll smoothly to target section
        const targetId = link.getAttribute("href").substring(1);
        const targetSection = document.getElementById(targetId);

        if (!targetSection) return;

        targetSection.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });

        // Update active link immediately
        updateActiveNavLink(targetId);

        // Close mobile menu after scroll delay (~ time depends on scroll length)
        // Here 500ms is arbitrary, adjust if needed
        setTimeout(() => {
          hamburger?.classList.remove("active");
          navMenu.classList.remove("active");
          document.body.classList.remove("menu-open");
        }, 500);
      });
    });

    // Active link highlighting
    const sections = document.querySelectorAll("section[id]");
    const observerOptions = {
      threshold: 0.3,
      rootMargin: "-100px 0px -100px 0px",
    };

    const navObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const id = entry.target.getAttribute("id");
          updateActiveNavLink(id);
        }
      });
    }, observerOptions);

    sections.forEach((section) => navObserver.observe(section));

    function updateActiveNavLink(activeId) {
      navLinks.forEach((link) => {
        const href = link.getAttribute("href").substring(1);
        if (href === activeId) {
          link.classList.add("active");
        } else {
          link.classList.remove("active");
        }
      });
    }
  }

  // ===== SCROLL EFFECTS =====
  function initScrollEffects() {
    // Scroll progress bar
    const scrollProgress = document.querySelector(".scroll-progress");

    window.addEventListener("scroll", () => {
      const windowHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      const scrolled = (window.pageYOffset / windowHeight) * 100;
      scrollProgress.style.width = scrolled + "%";
    });

    // Back to top button
    const backToTop = document.getElementById("back-to-top");

    window.addEventListener("scroll", () => {
      if (window.pageYOffset > 500) {
        backToTop?.classList.add("visible");
      } else {
        backToTop?.classList.remove("visible");
      }
    });

    backToTop?.addEventListener("click", () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });

    // Smooth scroll for navigation links
    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
      anchor.addEventListener("click", function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute("href"));
        if (target) {
          target.scrollIntoView({
            behavior: "smooth",
            block: "start",
          });
        }
      });
    });
  }

  // ===== ANIMATIONS =====
  function initAnimations() {
    const animateElements = document.querySelectorAll(".animate-on-scroll");

    const animationObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setTimeout(() => {
              entry.target.classList.add("animate");
            }, 100);
            animationObserver.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px",
      }
    );

    animateElements.forEach((el) => animationObserver.observe(el));
  }

  // ===== TYPING EFFECT =====
  function initTypingEffect() {
    const typingText = document.getElementById("typing-text");
    if (!typingText) return;

    const phrases = [
      "Full-Stack Developer",
      "MERN Stack Expert",
      "Django Specialist",
      "Problem Solver",
      "Code Enthusiast",
    ];

    let currentPhrase = 0;
    let currentChar = 0;
    let isDeleting = false;
    let typeSpeed = 100;

    function typeEffect() {
      const current = phrases[currentPhrase];

      if (isDeleting) {
        typingText.textContent = current.substring(0, currentChar - 1);
        currentChar--;
        typeSpeed = 50;
      } else {
        typingText.textContent = current.substring(0, currentChar + 1);
        currentChar++;
        typeSpeed = 100;
      }

      if (!isDeleting && currentChar === current.length) {
        typeSpeed = 2000;
        isDeleting = true;
      } else if (isDeleting && currentChar === 0) {
        isDeleting = false;
        currentPhrase = (currentPhrase + 1) % phrases.length;
        typeSpeed = 500;
      }

      setTimeout(typeEffect, typeSpeed);
    }

    typeEffect();
  }

  // ===== COUNTER ANIMATION =====
  function initCounters() {
    const counters = document.querySelectorAll(".stat-number");

    const counterObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const counter = entry.target;
            const target = parseInt(counter.getAttribute("data-target"));
            const duration = 2000;
            const increment = target / (duration / 16);
            let current = 0;

            const updateCounter = () => {
              current += increment;
              if (current < target) {
                counter.textContent = Math.floor(current) + "+";
                requestAnimationFrame(updateCounter);
              } else {
                counter.textContent = target + "+";
              }
            };

            updateCounter();
            counterObserver.unobserve(counter);
          }
        });
      },
      { threshold: 0.5 }
    );

    counters.forEach((counter) => counterObserver.observe(counter));
  }

  // ===== CONTACT FORM =====
  function initContactForm() {
    const form = document.getElementById("contact-form");
    if (!form) return;

    const inputs = form.querySelectorAll("input, textarea");

    // Form validation and styling
    inputs.forEach((input) => {
      input.addEventListener("focus", () => {
        input.parentElement.classList.add("focused");
      });

      input.addEventListener("blur", () => {
        if (!input.value) {
          input.parentElement.classList.remove("focused");
        }
      });

      input.addEventListener("input", () => {
        if (input.value) {
          input.parentElement.classList.add("filled");
        } else {
          input.parentElement.classList.remove("filled");
        }
      });
    });

    // Form submission
    form.addEventListener("submit", function (e) {
      e.preventDefault();

      const submitBtn = form.querySelector('button[type="submit"]');
      const originalText = submitBtn.innerHTML;

      // Show loading state
      submitBtn.innerHTML =
        '<i class="ri-loader-4-line"></i><span>Sending...</span>';
      submitBtn.style.animation = "spin 1s linear infinite";
      submitBtn.disabled = true;

      // Simulate form submission (replace with actual form submission)
      setTimeout(() => {
        // Reset button
        submitBtn.innerHTML = originalText;
        submitBtn.style.animation = "";
        submitBtn.disabled = false;

        // Show success message
        showNotification("Message sent successfully!", "success");
        form.reset();

        // Remove form classes
        inputs.forEach((input) => {
          input.parentElement.classList.remove("focused", "filled");
        });
      }, 2000);
    });
  }

  // ===== PARTICLES BACKGROUND =====
  function initParticles() {
    const canvas = document.getElementById("particles-canvas");
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    let particles = [];
    let mouse = { x: undefined, y: undefined };

    // Resize canvas
    function resizeCanvas() {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    }

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    // Mouse events
    window.addEventListener("mousemove", (e) => {
      mouse.x = e.x;
      mouse.y = e.y;
    });

    window.addEventListener("mouseleave", () => {
      mouse.x = undefined;
      mouse.y = undefined;
    });

    // Particle class
    class Particle {
      constructor(x, y, directionX, directionY, size, color) {
        this.x = x;
        this.y = y;
        this.directionX = directionX;
        this.directionY = directionY;
        this.size = size;
        this.color = color;
      }

      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2, false);
        ctx.fillStyle = this.color;
        ctx.fill();
      }

      update() {
        if (this.x > canvas.width || this.x < 0) {
          this.directionX = -this.directionX;
        }
        if (this.y > canvas.height || this.y < 0) {
          this.directionY = -this.directionY;
        }

        // Mouse interaction
        let dx = mouse.x - this.x;
        let dy = mouse.y - this.y;
        let distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < 100) {
          if (mouse.x < this.x && this.x < canvas.width - this.size * 10) {
            this.x += 10;
          }
          if (mouse.x > this.x && this.x > this.size * 10) {
            this.x -= 10;
          }
          if (mouse.y < this.y && this.y < canvas.height - this.size * 10) {
            this.y += 10;
          }
          if (mouse.y > this.y && this.y > this.size * 10) {
            this.y -= 10;
          }
        }

        this.x += this.directionX;
        this.y += this.directionY;
        this.draw();
      }
    }

    // Initialize particles
    function initParticlesArray() {
      particles = [];
      let numberOfParticles = Math.floor(
        (canvas.height * canvas.width) / 15000
      );

      for (let i = 0; i < numberOfParticles; i++) {
        let size = Math.random() * 2 + 1;
        let x = Math.random() * (canvas.width - size * 2) + size;
        let y = Math.random() * (canvas.height - size * 2) + size;
        let directionX = Math.random() * 2 - 1;
        let directionY = Math.random() * 2 - 1;
        let color = "rgba(0, 255, 204, 0.3)";

        particles.push(new Particle(x, y, directionX, directionY, size, color));
      }
    }

    // Animation loop
    function animateParticles() {
      requestAnimationFrame(animateParticles);
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach((particle) => {
        particle.update();
      });

      connectParticles();
    }

    // Connect nearby particles
    function connectParticles() {
      for (let a = 0; a < particles.length; a++) {
        for (let b = a; b < particles.length; b++) {
          let distance = Math.sqrt(
            Math.pow(particles[a].x - particles[b].x, 2) +
              Math.pow(particles[a].y - particles[b].y, 2)
          );

          if (distance < 120) {
            ctx.strokeStyle = `rgba(0, 255, 204, ${0.2 - distance / 600})`;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(particles[a].x, particles[a].y);
            ctx.lineTo(particles[b].x, particles[b].y);
            ctx.stroke();
          }
        }
      }
    }

    initParticlesArray();
    animateParticles();

    window.addEventListener("resize", () => {
      resizeCanvas();
      initParticlesArray();
    });
  }

  // ===== CUSTOM CURSOR =====
  function initCursor() {
    const cursor = document.querySelector(".custom-cursor");
    const cursorDot = document.querySelector(".cursor-dot");
    const cursorOutline = document.querySelector(".cursor-outline");

    if (!cursor) return;

    // Only enable on desktop
    if (window.innerWidth < 768) {
      cursor.style.display = "none";
      return;
    }

    let mouseX = 0;
    let mouseY = 0;
    let outlineX = 0;
    let outlineY = 0;

    document.addEventListener("mousemove", (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;

      cursorDot.style.left = mouseX + "px";
      cursorDot.style.top = mouseY + "px";
    });

    // Smooth outline follow
    function animateCursor() {
      outlineX += (mouseX - outlineX) * 0.1;
      outlineY += (mouseY - outlineY) * 0.1;

      cursorOutline.style.left = outlineX + "px";
      cursorOutline.style.top = outlineY + "px";

      requestAnimationFrame(animateCursor);
    }
    animateCursor();

    // Hover effects
    const hoverElements = document.querySelectorAll(
      "a, button, .btn, .social-link, .project-link"
    );

    hoverElements.forEach((el) => {
      el.addEventListener("mouseenter", () => {
        cursorOutline.style.transform = "translate(-20px, -20px) scale(1.5)";
        cursorDot.style.transform = "translate(-4px, -4px) scale(0.5)";
      });

      el.addEventListener("mouseleave", () => {
        cursorOutline.style.transform = "translate(-20px, -20px) scale(1)";
        cursorDot.style.transform = "translate(-4px, -4px) scale(1)";
      });
    });
  }

  // ===== UTILITY FUNCTIONS =====
  function showNotification(message, type = "info") {
    const notification = document.createElement("div");
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
            <div class="notification-content">
                <i class="ri-check-line"></i>
                <span>${message}</span>
            </div>
        `;

    document.body.appendChild(notification);

    setTimeout(() => {
      notification.classList.add("show");
    }, 100);

    setTimeout(() => {
      notification.classList.remove("show");
      setTimeout(() => {
        document.body.removeChild(notification);
      }, 300);
    }, 3000);
  }

  // ===== PERFORMANCE OPTIMIZATIONS =====

  // Throttle function for scroll events
  function throttle(func, wait) {
    let timeout;
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout);
        func(...args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  }

  // Debounce function for resize events
  function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout);
        func(...args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  }

  // Use throttled scroll events
  window.addEventListener(
    "scroll",
    throttle(() => {
      // Scroll-dependent functions are already handled above
    }, 16)
  );

  // Use debounced resize events
  window.addEventListener(
    "resize",
    debounce(() => {
      // Resize-dependent functions are already handled above
    }, 250)
  );
});

// ===== CSS ANIMATIONS =====
const style = document.createElement("style");
style.textContent = `
    @keyframes spin {
        from { transform: rotate(0deg); }
        to { transform: rotate(360deg); }
    }
    
    .notification {
        position: fixed;
        top: 20px;
        right: 20px;
        background: var(--gradient-primary);
        color: var(--background-dark);
        padding: 1rem 1.5rem;
        border-radius: var(--border-radius-lg);
        box-shadow: var(--shadow-xl);
        transform: translateX(100%);
        transition: all 0.3s ease;
        z-index: 10000;
        font-weight: 600;
    }
    
    .notification.show {
        transform: translateX(0);
    }
    
    .notification-content {
        display: flex;
        align-items: center;
        gap: 0.5rem;
    }
    
    .menu-open {
        overflow: hidden;
    }
    
    @media (max-width: 768px) {
        .custom-cursor {
            display: none !important;
        }
        
        .particles-container {
            display: none;
        }
    }
`;
document.head.appendChild(style);
