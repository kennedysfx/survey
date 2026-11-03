/**
 * ATELIER AURA SURVEY MASTERCLASS - CONFIGURATION & CONTROLLER
 * 
 * Instructions:
 * Edit the values below in the CONFIG object to customize your landing page.
 * All buttons and dynamic elements will automatically update with these values.
 */

const REGISTRATION_DEADLINE = new Date("2026-11-03T20:00:00+01:00").getTime();

function getRemainingSeconds() {
  return Math.max(0, Math.floor((REGISTRATION_DEADLINE - Date.now()) / 1000));
}

const CONFIG = {
  WHATSAPP_LINK: "https://chat.whatsapp.com/Lr0s1w5Bs5PC456R3Gpz8U",
  BRAND_NAME: "Side Hustle",
  HOST_NAME: "Coach Ken",
  COUNTDOWN_SECONDS: 180
};

document.addEventListener("DOMContentLoaded", () => {
  // 1. Initialize Brand, Host, and WhatsApp Links
  applyConfig();

  // 2. Initialize Real Deadline Countdown Timer
  initDeadlineCountdown();

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
    btn.addEventListener("click", () => {
      // Meta Pixel: record a Lead when someone taps a Join button
      if (window.fbq) fbq("track", "Lead");

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
 * Real countdown to REGISTRATION_DEADLINE (8:00 PM Nigeria time).
 * Uses the clock, so refreshing the page never resets it.
 */
function initDeadlineCountdown() {
  const hoursEl = document.getElementById("countdown-hours");
  const minutesEl = document.getElementById("countdown-minutes");
  const secondsEl = document.getElementById("countdown-seconds");
  const noticeEl = document.getElementById("countdown-notice");

  if (!minutesEl || !secondsEl) return;

  const pad = (n) => String(n).padStart(2, "0");

  function render(total) {
    const s = total % 60;
    let m = Math.floor(total / 60) % 60;
    const h = Math.floor(total / 3600);

    if (hoursEl) {
      hoursEl.textContent = pad(h);
    } else {
      // No hours box in the HTML yet: fold hours into minutes
      m = Math.floor(total / 60);
    }
    minutesEl.textContent = pad(m);
    secondsEl.textContent = pad(s);
  }

  function tick() {
    const remaining = getRemainingSeconds();
    render(remaining);

    if (remaining <= 0) {
      clearInterval(timerInterval);
      if (noticeEl) {
        noticeEl.textContent = "Registration has closed.";
        noticeEl.style.color = "var(--color-accent-gold)";
      }
    }
  }

  const timerInterval = setInterval(tick, 1000);
  tick();
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