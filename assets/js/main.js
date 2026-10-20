/**
 * ChemSymphoria 2026–27 · Main JavaScript
 * Handles: Navigation, Scroll Reveal, Molecular Canvas Animation
 */

(function () {
  'use strict';

  /* ─── Navigation ─────────────────────────────────────────── */
  const nav = document.querySelector('.nav');
  const navToggle = document.querySelector('.nav__toggle');
  const navMobile = document.querySelector('.nav__mobile');
  const navLinks = document.querySelectorAll('.nav__link, .nav__mobile-link');
  const currentPath = window.location.pathname.split('/').pop() || 'index.html';

  // Scroll-aware nav background
  if (nav) {
    const onScroll = () => {
      nav.classList.toggle('scrolled', window.scrollY > 40);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  // Active link
  navLinks.forEach(link => {
    const href = link.getAttribute('href');
    if (href && (href === currentPath || (currentPath === '' && href === 'index.html'))) {
      link.classList.add('active');
    }
  });

  // Mobile menu toggle
  if (navToggle && navMobile) {
    navToggle.addEventListener('click', () => {
      const isOpen = navMobile.classList.toggle('open');
      navToggle.classList.toggle('open', isOpen);
      navToggle.setAttribute('aria-expanded', isOpen);
      document.body.style.overflow = isOpen ? 'hidden' : '';
    });

    // Close on link click
    navMobile.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        navMobile.classList.remove('open');
        navToggle.classList.remove('open');
        navToggle.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
      });
    });

    // Close on backdrop click
    navMobile.addEventListener('click', e => {
      if (e.target === navMobile) {
        navMobile.classList.remove('open');
        navToggle.classList.remove('open');
        document.body.style.overflow = '';
      }
    });
  }

  /* ─── Scroll Reveal ──────────────────────────────────────── */
  const revealElements = document.querySelectorAll('.reveal');

  if (revealElements.length && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          revealObserver.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    });

    revealElements.forEach(el => revealObserver.observe(el));
  } else {
    revealElements.forEach(el => el.classList.add('visible'));
  }

  /* ─── Molecular Canvas Animation ────────────────────────── */
  const canvas = document.getElementById('hero-canvas');
  if (canvas && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    const ctx = canvas.getContext('2d');
    let width, height, nodes, animFrame;

    const COLORS = {
      teal:   'rgba(10, 191, 191,',
      amber:  'rgba(245, 166, 35,',
      violet: 'rgba(139, 92, 246,',
      white:  'rgba(232, 237, 247,'
    };

    const colorKeys = Object.keys(COLORS);

    function resize() {
      width  = canvas.width  = canvas.offsetWidth;
      height = canvas.height = canvas.offsetHeight;
    }

    function randomColor() {
      return COLORS[colorKeys[Math.floor(Math.random() * colorKeys.length)]];
    }

    class Node {
      constructor() { this.reset(true); }
      reset(init) {
        this.x   = Math.random() * width;
        this.y   = init ? Math.random() * height : -20;
        this.vx  = (Math.random() - 0.5) * 0.3;
        this.vy  = (Math.random() - 0.5) * 0.3;
        this.r   = Math.random() * 3 + 1.5;
        this.col = randomColor();
        this.alpha = 0;
        this.targetAlpha = Math.random() * 0.7 + 0.3;
        this.pulse = Math.random() * Math.PI * 2;
        this.pulseSpeed = Math.random() * 0.02 + 0.005;
      }
      update() {
        this.x += this.vx;
        this.y += this.vy;
        this.pulse += this.pulseSpeed;
        this.alpha += (this.targetAlpha - this.alpha) * 0.03;
        if (this.x < -50 || this.x > width + 50 || this.y < -50 || this.y > height + 50) {
          this.reset(false);
        }
      }
      draw() {
        const pulsedAlpha = this.alpha * (0.7 + 0.3 * Math.sin(this.pulse));
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
        ctx.fillStyle = this.col + pulsedAlpha + ')';
        ctx.fill();
      }
    }

    function drawConnections() {
      const maxDist = 120;
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < maxDist) {
            const opacity = (1 - dist / maxDist) * 0.15;
            ctx.beginPath();
            ctx.moveTo(nodes[i].x, nodes[i].y);
            ctx.lineTo(nodes[j].x, nodes[j].y);
            ctx.strokeStyle = nodes[i].col + opacity + ')';
            ctx.lineWidth = 0.8;
            ctx.stroke();
          }
        }
      }
    }

    function init() {
      resize();
      const count = Math.floor((width * height) / 15000);
      nodes = Array.from({ length: Math.min(count, 60) }, () => new Node());
    }

    function animate() {
      ctx.clearRect(0, 0, width, height);
      drawConnections();
      nodes.forEach(n => { n.update(); n.draw(); });
      animFrame = requestAnimationFrame(animate);
    }

    const ro = new ResizeObserver(() => {
      cancelAnimationFrame(animFrame);
      init();
      animate();
    });
    ro.observe(canvas);

    init();
    animate();
  }

  /* ─── Schedule Tabs ──────────────────────────────────────── */
  const scheduleTabs = document.querySelectorAll('.schedule-tab, .schedule-day-tab');
  const scheduleDays = document.querySelectorAll('.schedule-day');

  if (scheduleTabs.length) {
    scheduleTabs.forEach(tab => {
      tab.addEventListener('click', () => {
        const target = tab.dataset.day;
        scheduleTabs.forEach(t => t.classList.remove('active'));
        scheduleDays.forEach(d => d.classList.remove('active'));
        tab.classList.add('active');
        document.getElementById('day-' + target)?.classList.add('active');
      });
    });
  }

  /* ─── Contact Form ───────────────────────────────────────── */
  const contactForm = document.getElementById('contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
      e.preventDefault();
      const btn = contactForm.querySelector('button[type="submit"]');
      const originalText = btn.textContent;
      btn.textContent = 'Message sent! ✓';
      btn.disabled = true;
      btn.style.background = '#0ABFBF';
      setTimeout(() => {
        btn.textContent = originalText;
        btn.disabled = false;
        btn.style.background = '';
        contactForm.reset();
      }, 3000);
    });
  }

  /* ─── Speaker Card Hover Enhancement ────────────────────── */
  document.querySelectorAll('.speaker-card, .advisory-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
      this.style.zIndex = '10';
    });
    card.addEventListener('mouseleave', function() {
      this.style.zIndex = '';
    });
  });

  /* ─── Smooth Anchor Scroll ───────────────────────────────── */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        const navH = nav ? nav.offsetHeight : 72;
        const top = target.getBoundingClientRect().top + window.scrollY - navH - 16;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    });
  });

})();
