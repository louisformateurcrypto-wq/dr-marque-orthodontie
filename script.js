/* ============================================
   Dr Antoine MARQUE — Orthodontiste Compiègne
   script.js
   ============================================ */

/* ---- Navbar scroll ---- */
(function () {
  const navbar = document.querySelector('.navbar');
  if (!navbar) return;

  function onScroll() {
    navbar.classList.toggle('scrolled', window.scrollY > 20);
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
})();

/* ---- Mobile burger menu ---- */
(function () {
  const burger = document.querySelector('.nav-burger');
  const mobileNav = document.querySelector('.nav-mobile');
  if (!burger || !mobileNav) return;

  burger.addEventListener('click', function () {
    const isOpen = mobileNav.classList.toggle('open');
    burger.classList.toggle('active', isOpen);
    burger.setAttribute('aria-expanded', String(isOpen));
    document.body.style.overflow = isOpen ? 'hidden' : '';
  });

  // Close on link click
  mobileNav.querySelectorAll('a').forEach(function (link) {
    link.addEventListener('click', function () {
      mobileNav.classList.remove('open');
      burger.classList.remove('active');
      burger.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
    });
  });

  // Close on outside click
  document.addEventListener('click', function (e) {
    if (!navbar.contains(e.target) && !mobileNav.contains(e.target)) {
      mobileNav.classList.remove('open');
      burger.classList.remove('active');
      burger.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
    }
  });
})();

/* ---- Scroll reveal ---- */
(function () {
  if (!('IntersectionObserver' in window)) {
    document.querySelectorAll('.reveal').forEach(function (el) {
      el.classList.add('visible');
    });
    return;
  }

  const observer = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
  );

  document.querySelectorAll('.reveal').forEach(function (el) {
    observer.observe(el);
  });
})();

/* ---- Active nav link on scroll ---- */
(function () {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-links a[href^="#"]');
  if (!sections.length || !navLinks.length) return;

  const observer = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          const id = entry.target.getAttribute('id');
          navLinks.forEach(function (link) {
            link.classList.toggle('active-link', link.getAttribute('href') === '#' + id);
          });
        }
      });
    },
    { threshold: 0.35 }
  );

  sections.forEach(function (section) {
    observer.observe(section);
  });
})();

/* ---- Reviews carousel infinite loop ---- */
(function () {
  var track = document.getElementById('reviewsTrack');
  if (track) {
    track.innerHTML = track.innerHTML + track.innerHTML;
  }
})();

/* ---- Smooth anchor scroll ---- */
(function () {
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      const target = document.querySelector(this.getAttribute('href'));
      if (!target) return;
      e.preventDefault();
      const navbarHeight = document.querySelector('.navbar')
        ? document.querySelector('.navbar').offsetHeight
        : 72;
      const top = target.getBoundingClientRect().top + window.scrollY - navbarHeight - 8;
      window.scrollTo({ top: top, behavior: 'smooth' });
    });
  });
})();
