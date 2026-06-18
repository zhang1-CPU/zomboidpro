document.addEventListener("DOMContentLoaded", () => {
  const backToTop = document.getElementById("backToTop");
  const faqItems = document.querySelectorAll("[data-faq]");
  const navLinks = document.querySelectorAll(
    '.site-nav a[href^="#"], .footer-links a[href^="#"], .hero-actions a[href^="#"], .product-cta a[href^="#"]'
  );
  const hamburgerBtn = document.getElementById("hamburgerBtn");
  const mainNav = document.getElementById("mainNav");
  const readingProgress = document.getElementById("readingProgress");
  const dropdowns = document.querySelectorAll(".nav-dropdown");

  // Smooth scrolling
  navLinks.forEach((link) => {
    link.addEventListener("click", (e) => {
      const href = link.getAttribute("href");
      if (!href || href === "#") return;
      const target = document.querySelector(href);
      if (!target) return;
      e.preventDefault();
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  });

  // Back to top
  const toggleBackToTop = () => {
    if (!backToTop) return;
    backToTop.style.display = window.scrollY > 500 ? "block" : "none";
  };
  window.addEventListener("scroll", toggleBackToTop, { passive: true });
  toggleBackToTop();
  if (backToTop) {
    backToTop.addEventListener("click", () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

  // Reading progress bar
  const updateProgress = () => {
    if (!readingProgress) return;
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
    readingProgress.style.width = progress + "%";
  };
  window.addEventListener("scroll", updateProgress, { passive: true });
  updateProgress();

  // FAQ accordion
  faqItems.forEach((item) => {
    item.addEventListener("click", () => {
      const isActive = item.classList.contains("active");
      faqItems.forEach((other) => {
        other.classList.remove("active");
        const toggle = other.querySelector(".faq-toggle");
        if (toggle) toggle.textContent = "+";
      });
      if (!isActive) {
        item.classList.add("active");
        const toggle = item.querySelector(".faq-toggle");
        if (toggle) toggle.textContent = "−";
      }
    });
  });

  // Mobile hamburger toggle
  if (hamburgerBtn && mainNav) {
    hamburgerBtn.addEventListener("click", () => {
      const isOpen = mainNav.style.display === "flex";
      mainNav.style.display = isOpen ? "none" : "flex";
      mainNav.style.flexDirection = "column";
      mainNav.style.gap = "0.5rem";
      mainNav.style.padding = "0.5rem 0";
      mainNav.style.width = "100%";
      hamburgerBtn.textContent = isOpen ? "☰" : "✕";
    });
  }

  // Dropdown toggle (click for mobile, hover for desktop)
  dropdowns.forEach((dropdown) => {
    const btn = dropdown.querySelector(".dropbtn");
    if (!btn) return;
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      e.stopPropagation();
      dropdown.classList.toggle("open");
    });
    dropdown.addEventListener("mouseleave", () => {
      dropdown.classList.remove("open");
    });
  });

  // Close dropdowns when clicking outside
  document.addEventListener("click", (e) => {
    dropdowns.forEach((dropdown) => {
      if (!dropdown.contains(e.target)) {
        dropdown.classList.remove("open");
      }
    });
  });

  // IntersectionObserver reveal animation
  const revealTargets = document.querySelectorAll(
    ".feature-card, .card, .highlight-card, .mini-card, .trait-card, .final-cta, .callout, .content-box, .news-card"
  );
  revealTargets.forEach((el) => {
    el.style.opacity = "0";
    el.style.transform = "translateY(14px)";
    el.style.transition = "opacity 0.45s ease, transform 0.45s ease";
  });

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = "1";
          entry.target.style.transform = "translateY(0)";
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
  );
  revealTargets.forEach((el) => observer.observe(el));

  // Giscus comment system integration
  const commentsContainer = document.getElementById("giscus-comments");
  if (commentsContainer) {
    const script = document.createElement("script");
    script.src = "https://giscus.app/client.js";
    script.setAttribute("data-repo", "zhang1-CPU/zhang1-CPU.github.io");
    script.setAttribute("data-repo-id", "R_kgDOOAa5WQ");
    script.setAttribute("data-category", "Comments");
    script.setAttribute("data-category-id", "DIC_kwDOOAa5Wc4CjgQk");
    script.setAttribute("data-mapping", "pathname");
    script.setAttribute("data-strict", "0");
    script.setAttribute("data-reactions-enabled", "1");
    script.setAttribute("data-emit-metadata", "0");
    script.setAttribute("data-input-position", "bottom");
    script.setAttribute("data-theme", "transparent_dark");
    script.setAttribute("data-lang", "en");
    script.setAttribute("data-loading", "lazy");
    script.crossOrigin = "anonymous";
    script.async = true;
    commentsContainer.appendChild(script);
  }
});
