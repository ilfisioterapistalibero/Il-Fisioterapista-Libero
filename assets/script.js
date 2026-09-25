// il fisioterapista libero — script.js
(function () {
  var root = document.documentElement;

  // Anno corrente nel footer
  var yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // Header: ombra quando si scorre
  var header = document.getElementById('site-header');
  var sticky = document.getElementById('sticky-cta');
  var hero = document.querySelector('.hero, .page-hero');

  function onScroll() {
    var y = window.scrollY;
    if (header) header.classList.toggle('is-scrolled', y > 8);
    if (sticky) {
      // la CTA mobile compare solo dopo la prima schermata
      var threshold = hero ? hero.offsetHeight * 0.6 : 300;
      var nearBottom = window.innerHeight + y > document.body.scrollHeight - 260;
      sticky.classList.toggle('is-visible', y > threshold && !nearBottom);
    }
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // Menu mobile
  var toggle = document.querySelector('.menu-toggle');
  if (toggle) {
    var setMenu = function (open) {
      root.classList.toggle('menu-open', open);
      document.body.classList.toggle('menu-open', open);
      toggle.setAttribute('aria-expanded', String(open));
      toggle.setAttribute('aria-label', open ? 'Chiudi il menu' : 'Apri il menu');
    };
    toggle.addEventListener('click', function () {
      setMenu(toggle.getAttribute('aria-expanded') !== 'true');
    });
    document.querySelectorAll('.main-nav a').forEach(function (a) {
      a.addEventListener('click', function () { setMenu(false); });
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') setMenu(false);
    });
  }

  // Comparsa degli elementi durante lo scorrimento
  var items = document.querySelectorAll('.reveal');
  if (!('IntersectionObserver' in window)) {
    items.forEach(function (el) { el.classList.add('is-visible'); });
    return;
  }
  // piccolo ritardo a cascata tra elementi fratelli
  items.forEach(function (el) {
    var siblings = el.parentElement ? el.parentElement.querySelectorAll(':scope > .reveal') : [];
    var i = Array.prototype.indexOf.call(siblings, el);
    if (i > 0) el.style.setProperty('--d', Math.min(i * 0.08, 0.4) + 's');
  });
  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        io.unobserve(entry.target);
      }
    });
  }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });
  items.forEach(function (el) { io.observe(el); });
})();
