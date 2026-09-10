// Ceremony — vanilla JS behaviors (replaces the Framer / Framer-Motion runtime)
(function () {
  "use strict";

  /* ---------- Header: solid background once the page scrolls ---------- */
  var header = document.getElementById("siteHeader");
  function onScroll() {
    if (window.scrollY > 12) {
      header.classList.add("is-scrolled");
    } else {
      header.classList.remove("is-scrolled");
    }
  }
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });

  /* ---------- Mobile nav toggle ---------- */
  var navToggle = document.getElementById("navToggle");
  var navMobile = document.getElementById("navMobile");
  function closeMobileNav() {
    navToggle.setAttribute("aria-expanded", "false");
    navMobile.classList.remove("is-open");
  }
  navToggle.addEventListener("click", function () {
    var isOpen = navToggle.getAttribute("aria-expanded") === "true";
    navToggle.setAttribute("aria-expanded", String(!isOpen));
    navMobile.classList.toggle("is-open", !isOpen);
  });
  navMobile.querySelectorAll("a").forEach(function (link) {
    link.addEventListener("click", closeMobileNav);
  });

  /* ---------- Hero image reveal on load ---------- */
  var hero = document.getElementById("hero");
  window.addEventListener("load", function () {
    requestAnimationFrame(function () {
      hero.classList.add("is-loaded");
    });
  });

  /* ---------- Scroll-reveal (replaces Framer's appear / whileInView) ---------- */
  var revealEls = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window) {
    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -8% 0px" }
    );
    revealEls.forEach(function (el) {
      observer.observe(el);
    });
  } else {
    revealEls.forEach(function (el) {
      el.classList.add("is-visible");
    });
  }

  /* ---------- FAQ accordion ---------- */
  document.querySelectorAll(".faq-item").forEach(function (item) {
    var question = item.querySelector(".faq-question");
    question.addEventListener("click", function () {
      var isOpen = item.classList.contains("is-open");
      document.querySelectorAll(".faq-item.is-open").forEach(function (openItem) {
        if (openItem !== item) {
          openItem.classList.remove("is-open");
          openItem.querySelector(".faq-question").setAttribute("aria-expanded", "false");
        }
      });
      item.classList.toggle("is-open", !isOpen);
      question.setAttribute("aria-expanded", String(!isOpen));
    });
  });

  /* ---------- RSVP form (demo only — no backend wired up) ---------- */
  var rsvpForm = document.getElementById("rsvpForm");
  var rsvpNote = document.getElementById("rsvpNote");
  rsvpForm.addEventListener("submit", function (event) {
    event.preventDefault();
    if (!rsvpForm.checkValidity()) {
      rsvpForm.reportValidity();
      return;
    }
    rsvpNote.classList.add("is-visible");
    rsvpForm.reset();
  });
})();
