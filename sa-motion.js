/**
 * ╔══════════════════════════════════════════════════════════╗
 * ║       SatheAchi.com — Premium Motion Design Engine       ║
 * ║   Apple-Inspired Animation & Transition System v2.0      ║
 * ╚══════════════════════════════════════════════════════════╝
 */

(function () {
  'use strict';

  /* ════════════════════════════════════════
     1. PAGE TRANSITION SYSTEM
     Silky smooth cross-page fade + slide
  ════════════════════════════════════════ */

  function injectTransitionOverlay() {
    // Disabled overlay injection to ensure instant page render without blocking
  }

  function navigateTo(url) {
    window.location.href = url;
  }

  function initPageTransitions() {
    // Instant native navigation without artificial delay
  }

  function playPageEntrance() {
    // Animate body content in immediately
    document.body.classList.add('sa-body-entered');
  }

  // Handle browser back/forward cache
  window.addEventListener('pageshow', function (e) {
    document.body.classList.add('sa-body-entered');
  });


  /* ════════════════════════════════════════
     2. BOTTOM NAV — GPU-Composited, Stable
     Never flickers, never re-renders
  ════════════════════════════════════════ */

  function initBottomNav() {
    const nav = document.querySelector('.sa-bottom-nav');
    if (!nav) return;

    // Let CSS handle positioning and transforms

    const items = nav.querySelectorAll('.sa-bn-item');
    const currentFile = window.location.pathname.split('/').pop() || 'index.html';

    // Set correct active tab based on current URL
    items.forEach(item => {
      const href = (item.getAttribute('href') || '').split('/').pop();
      item.classList.toggle('active', href === currentFile || (currentFile === '' && href === 'index.html'));
    });

    // Tap feedback — mark active immediately before transition
    items.forEach(item => {
      item.addEventListener('pointerdown', function () {
        items.forEach(i => i.classList.remove('active'));
        this.classList.add('active');
        this.classList.add('sa-bn-tapped');
      });
      item.addEventListener('pointerup', function () {
        this.classList.remove('sa-bn-tapped');
      });
      item.addEventListener('pointerleave', function () {
        this.classList.remove('sa-bn-tapped');
      });
    });

    // Floating appearance animation on load
    nav.classList.add('sa-bn-ready');
  }


  /* ════════════════════════════════════════
     3. STAGGERED PRODUCT CARD REVEAL
     IntersectionObserver — 60fps safe
  ════════════════════════════════════════ */

  function initCardReveal() {
    // Disabled post-render card translation to ensure solid, instantaneous page display without grid shudder
  }


  /* ════════════════════════════════════════
     4. SECTION SCROLL REVEAL
     Smooth fade-up as sections enter view
  ════════════════════════════════════════ */

  function initSectionReveal() {
    // Disabled artificial 30px shift on page load to prevent whole-page shaking
  }


  /* ════════════════════════════════════════
     5. BUTTON MICRO-INTERACTIONS
     Native haptic-style press feel
  ════════════════════════════════════════ */

  function initMicroInteractions() {
    function addPress(selector, cls) {
      document.addEventListener('pointerdown', function (e) {
        const el = e.target.closest(selector);
        if (el) el.classList.add(cls);
      }, { passive: true });

      ['pointerup', 'pointerleave', 'pointercancel'].forEach(evt => {
        document.addEventListener(evt, function (e) {
          const el = e.target.closest(selector);
          if (el) el.classList.remove(cls);
        }, { passive: true });
      });
    }

    addPress('.sa-btn-primary', 'sa-press-primary');
    addPress('.sa-icon-btn', 'sa-press-icon');
    addPress('.sa-search-btn', 'sa-press-icon');
    addPress('.sa-prod-card', 'sa-press-card');
    addPress('.sa-cat-card', 'sa-press-card');
    addPress('.add-to-cart-btn, .sa-atc-btn', 'sa-press-primary');
  }


  /* ════════════════════════════════════════
     6. HERO BANNER PARALLAX (subtle)
  ════════════════════════════════════════ */

  function initHeroParallax() {
    const heroImg = document.querySelector('.sa-hero-img img');
    if (!heroImg || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    let ticking = false;
    window.addEventListener('scroll', function () {
      if (!ticking) {
        requestAnimationFrame(function () {
          const scrollY = window.scrollY;
          if (scrollY < 400) {
            heroImg.style.transform = 'translateY(' + (scrollY * 0.08) + 'px)';
          }
          ticking = false;
        });
        ticking = true;
      }
    }, { passive: true });
  }


  /* ════════════════════════════════════════
     7. HEADER REVEAL ANIMATION
  ════════════════════════════════════════ */

  function initHeaderReveal() {
    const header = document.querySelector('.sa-header');
    if (!header) return;

    // Dynamic Island Search Interaction handled primarily by script.js
    const searchInput = document.getElementById('saSearch');
    const headerInner = document.querySelector('.sa-header-inner');
    if (searchInput && headerInner) {
      searchInput.addEventListener('focus', () => {
        headerInner.classList.add('island-active');
      });
      // Allow document click in script.js to close smoothly without interrupting clicks
    }
  }


  /* ════════════════════════════════════════
     MASTER INIT
  ════════════════════════════════════════ */

  function init() {
    injectTransitionOverlay();
    initPageTransitions();
    playPageEntrance();
    initBottomNav();
    initCardReveal();
    initSectionReveal();
    initMicroInteractions();
    initHeroParallax();
    initHeaderReveal();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
