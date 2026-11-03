/**
 * ATELIER AURA SURVEY MASTERCLASS - CONFIGURATION & CONTROLLER
 * 
 * Instructions:
 * Edit the values below in the CONFIG object to customize your landing page.
 * All buttons and dynamic elements will automatically update with these values.
 */

const CONFIG = {
  WHATSAPP_LINK: "PLACEHOLDER_WHATSAPP_LINK",
  BRAND_NAME: "PLACEHOLDER_BRAND_NAME",
  HOST_NAME: "PLACEHOLDER_HOST_NAME",
  COUNTDOWN_SECONDS: 180
};

document.addEventListener("DOMContentLoaded", () => {
  // 1. Initialize Brand, Host, and WhatsApp Links
  applyConfig();

  // 2. Initialize Rolling Countdown Timer
  initRollingCountdown(CONFIG.COUNTDOWN_SECONDS);

  // 3. Initialize Lightbox for Testimonials
  initLightbox();

  // 4. Initialize Scroll Reveal Animations
  initScrollAnimations();
});

/**
 * Injects CONFIG values into all matching DOM elements and buttons.
 */
function applyConfig() {
  // Update all elements with data-config attributes
  const configElements = document.querySelectorAll("[data-config]");
  configElements.forEach((el) => {
    const key = el.getAttribute("data-config");
    if (CONFIG[key] !== undefined) {
      el.textContent = CONFIG[key];
    }
  });

  // Attach WhatsApp Link to all CTA buttons
  const ctaButtons = document.querySelectorAll(".js-whatsapp-btn");
  ctaButtons.forEach((btn) => {
    btn.setAttribute("href", CONFIG.WHATSAPP_LINK);
    btn.setAttribute("target", "_blank");
    btn.setAttribute("rel", "noopener noreferrer");
    
    // Fallback click handler ensuring prompt navigation
    btn.addEventListener("click", (e) => {
      if (!CONFIG.WHATSAPP_LINK || CONFIG.WHATSAPP_LINK === "PLACEHOLDER_WHATSAPP_LINK") {
        console.warn("Please configure your actual WhatsApp link in js/main.js (CONFIG.WHATSAPP_LINK).");
      }
    });
  });

  // Update document title if placeholder is present
  if (document.title.includes("PLACEHOLDER_BRAND_NAME")) {
    document.title = document.title.replace("PLACEHOLDER_BRAND_NAME", CONFIG.BRAND_NAME);
  }
}

/**
 * Rolling Countdown Timer:
 * Starts at COUNTDOWN_SECONDS on every page load and counts down to 00:00.
 * When it hits 00:00, displays "Registration is closing. Join now." without disabling CTA.
 */
function initRollingCountdown(initialSeconds) {
  const minutesEl = document.getElementById("countdown-minutes");
  const secondsEl = document.getElementById("countdown-seconds");
  const noticeEl = document.getElementById("countdown-notice");

  if (!minutesEl || !secondsEl) return;

  let remaining = parseInt(initialSeconds, 10);
  if (isNaN(remaining) || remaining <= 0) remaining = 180;

  function render(secs) {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    minutesEl.textContent = String(m).padStart(2, "0");
    secondsEl.textContent = String(s).padStart(2, "0");
  }

  render(remaining);

  const timerInterval = setInterval(() => {
    remaining--;

    if (remaining <= 0) {
      clearInterval(timerInterval);
      render(0);
      if (noticeEl) {
        noticeEl.textContent = "Registration is closing. Join now.";
        noticeEl.style.color = "var(--color-accent-gold)";
      }
    } else {
      render(remaining);
    }
  }, 1000);
}

/**
 * Accessible Modal Lightbox for Testimonials
 * Uses the native <dialog> element according to Modern Web Guidelines:
 * - Declarative closedby="any" with programmatic fallback for non-supporting browsers
 * - Escape key dismiss built-in
 * - Focus management and page inert state handled by browser
 */
function initLightbox() {
  const dialog = document.getElementById("lightbox-dialog");
  const lightboxImg = document.getElementById("lightbox-img");
  const lightboxCaption = document.getElementById("lightbox-caption");
  const closeBtn = document.getElementById("lightbox-close");
  const cards = document.querySelectorAll(".js-lightbox-trigger");

  if (!dialog || !lightboxImg) return;

  // Open modal on card click
  cards.forEach((card) => {
    card.addEventListener("click", () => {
      const img = card.querySelector(".testimonial-img");
      const name = card.getAttribute("data-student-name") || "Student Result";
      const desc = card.getAttribute("data-student-quote") || "";

      if (img) {
        lightboxImg.src = img.src;
        lightboxImg.alt = img.alt;
      }
      if (lightboxCaption) {
        lightboxCaption.textContent = `${name} — ${desc}`;
      }

      // Open natively as modal
      if (typeof dialog.showModal === "function") {
        dialog.showModal();
      } else {
        dialog.setAttribute("open", "");
      }
    });

    // Keyboard accessibility for card
    card.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        card.click();
      }
    });
  });

  // Explicit Close Button handler
  if (closeBtn) {
    closeBtn.addEventListener("click", () => {
      dialog.close();
    });
  }

  // Light-Dismiss fallback for browsers without native `closedby` support
  // Based on modern-web-guidance specifications
  if (!("closedBy" in HTMLDialogElement.prototype)) {
    dialog.addEventListener("click", (event) => {
      if (event.target !== dialog) return;

      const rect = dialog.getBoundingClientRect();
      const isDialogContent =
        rect.top <= event.clientY &&
        event.clientY <= rect.top + rect.height &&
        rect.left <= event.clientX &&
        event.clientX <= rect.left + rect.width;

      if (!isDialogContent) {
        dialog.close();
      }
    });
  }
}

/**
 * Subtle Scroll Reveal (Fade-up) Animations using IntersectionObserver
 */
function initScrollAnimations() {
  const fadeElements = document.querySelectorAll(".fade-up");

  if (!("IntersectionObserver" in window)) {
    // Graceful fallback for legacy browsers: reveal immediately
    fadeElements.forEach((el) => el.classList.add("visible"));
    return;
  }

  const observer = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          obs.unobserve(entry.target);
        }
      });
    },
    {
      root: null,
      threshold: 0.12,
      rootMargin: "0px 0px -40px 0px"
    }
  );

  fadeElements.forEach((el) => observer.observe(el));
}
