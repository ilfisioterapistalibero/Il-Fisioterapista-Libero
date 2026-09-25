// il fisioterapista libero — script.js
(function () {
  var root = document.documentElement;
  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var finePointer = window.matchMedia('(pointer: fine)').matches;

  // Anno corrente nel footer
  var yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // ---------- menu mobile ----------
  var toggle = document.querySelector('.menu-toggle');
  if (toggle) {
    var setMenu = function (open) {
      root.classList.toggle('menu-open', open);
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
    // tornando indietro, la pagina non deve restare con il menu aperto e bloccata
    window.addEventListener('pageshow', function () { setMenu(false); });
  }

  // ---------- modulo: stato di invio ----------
  document.querySelectorAll('form').forEach(function (form) {
    form.addEventListener('submit', function () {
      var btn = form.querySelector('button[type="submit"]');
      if (btn) {
        btn.classList.add('is-loading');
        btn.firstChild.textContent = 'Invio in corso…';
      }
    });
  });

  // ---------- parole che compaiono una alla volta ----------
  function splitWords(el, cls) {
    var count = 0;
    (function walk(node) {
      Array.prototype.slice.call(node.childNodes).forEach(function (n) {
        if (n.nodeType === 3) {
          var frag = document.createDocumentFragment();
          n.textContent.split(/(\s+)/).forEach(function (part) {
            if (!part) return;
            if (/^\s+$/.test(part)) { frag.appendChild(document.createTextNode(' ')); return; }
            var w = document.createElement('span');
            w.className = cls;
            w.style.setProperty('--i', count++);
            if (cls === 'w') {
              var inner = document.createElement('span');
              inner.textContent = part;
              w.appendChild(inner);
            } else {
              w.textContent = part;
            }
            frag.appendChild(w);
          });
          n.parentNode.replaceChild(frag, n);
        } else if (n.nodeType === 1 && n.tagName !== 'BR') {
          walk(n);
        }
      });
    })(el);
    return count;
  }

  var quoteWords = [];
  var quoteEl = document.querySelector('.quote blockquote');
  if (!reduceMotion) {
    document.querySelectorAll('h1.reveal').forEach(function (h) {
      splitWords(h, 'w');
      h.classList.add('split');
    });
    if (quoteEl) {
      splitWords(quoteEl, 'qw');
      quoteWords = quoteEl.querySelectorAll('.qw');
      quoteEl.classList.add('is-split');
    }
  }

  // ---------- numeri che contano ----------
  function countUp(el) {
    var to = parseFloat(el.getAttribute('data-to'));
    var start = null;
    var dur = 1600;
    function frame(t) {
      if (!start) start = t;
      var p = Math.min((t - start) / dur, 1);
      var eased = 1 - Math.pow(2, -10 * p);
      el.textContent = Math.round(to * (p === 1 ? 1 : eased));
      if (p < 1) requestAnimationFrame(frame);
    }
    el.textContent = '0';
    requestAnimationFrame(frame);
  }

  // ---------- comparsa durante lo scorrimento ----------
  var items = document.querySelectorAll('.reveal, .draw, .count');
  if (reduceMotion || !('IntersectionObserver' in window)) {
    items.forEach(function (el) { el.classList.add('is-visible'); });
  } else {
    document.querySelectorAll('.reveal').forEach(function (el) {
      var siblings = el.parentElement ? el.parentElement.querySelectorAll(':scope > .reveal') : [];
      var i = Array.prototype.indexOf.call(siblings, el);
      if (i > 0) el.style.setProperty('--d', Math.min(i * 0.09, 0.45) + 's');
    });
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        var el = entry.target;
        el.classList.add('is-visible');
        if (el.classList.contains('count')) countUp(el);
        io.unobserve(el);
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.1 });
    items.forEach(function (el) { io.observe(el); });

    // rete di sicurezza: se un browser (es. quello interno di un'app) non attiva
    // le comparse, mostra comunque tutto ciò che è sullo schermo
    var revealVisibleNow = function () {
      document.querySelectorAll('.reveal:not(.is-visible), .draw:not(.is-visible)').forEach(function (el) {
        if (el.getBoundingClientRect().top < window.innerHeight) el.classList.add('is-visible');
      });
    };
    setTimeout(revealVisibleNow, 1200);
    var pending = false;
    window.addEventListener('scroll', function () {
      if (pending) return;
      pending = true;
      setTimeout(function () { pending = false; revealVisibleNow(); }, 400);
    }, { passive: true });
  }

  // ---------- scorrimento: header, barra di avanzamento, CTA mobile, citazione, parallasse ----------
  var header = document.getElementById('site-header');
  var sticky = document.getElementById('sticky-cta');
  var hero = document.querySelector('.hero, .page-hero');

  var progress = document.createElement('div');
  progress.className = 'scroll-progress';
  progress.setAttribute('aria-hidden', 'true');
  document.body.appendChild(progress);

  var ticking = false;
  function onScroll() {
    var y = window.scrollY;
    var vh = window.innerHeight;
    var max = document.documentElement.scrollHeight - vh;

    if (header) header.classList.toggle('is-scrolled', y > 8);
    progress.style.transform = 'scaleX(' + (max > 0 ? y / max : 0) + ')';

    if (sticky) {
      var threshold = hero ? hero.offsetHeight * 0.6 : 300;
      var nearBottom = y > max - 260;
      sticky.classList.toggle('is-visible', y > threshold && !nearBottom);
    }

    if (quoteWords.length) {
      var r = quoteEl.getBoundingClientRect();
      var p = (vh * 0.88 - r.top) / (r.height + vh * 0.3);
      p = Math.max(0, Math.min(1, p));
      var lit = Math.round(p * quoteWords.length);
      for (var i = 0; i < quoteWords.length; i++) {
        quoteWords[i].classList.toggle('lit', i < lit);
      }
    }

    if (hero && !reduceMotion && y < vh * 1.5) {
      hero.style.setProperty('--sy', y.toFixed(1));
    }
    ticking = false;
  }
  window.addEventListener('scroll', function () {
    if (!ticking) { ticking = true; requestAnimationFrame(onScroll); }
  }, { passive: true });
  window.addEventListener('resize', onScroll);
  onScroll();

  // ---------- icone animate: girano solo quando la card è visibile ----------
  var animCards = document.querySelectorAll('.fcard, .tcard');
  if ('IntersectionObserver' in window) {
    var vio = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) { e.target.classList.toggle('in-view', e.isIntersecting); });
    });
    animCards.forEach(function (el) { vio.observe(el); });
  } else {
    animCards.forEach(function (el) { el.classList.add('in-view'); });
  }

  if (reduceMotion || !finePointer) return;

  // ---------- profondità che segue il mouse (hero) ----------
  if (hero) {
    var tx = 0, ty = 0, cx = 0, cy = 0, running = false;
    var loop = function () {
      cx += (tx - cx) * 0.08;
      cy += (ty - cy) * 0.08;
      hero.style.setProperty('--mx', cx.toFixed(3));
      hero.style.setProperty('--my', cy.toFixed(3));
      if (Math.abs(tx - cx) > 0.001 || Math.abs(ty - cy) > 0.001) {
        requestAnimationFrame(loop);
      } else {
        running = false;
      }
    };
    window.addEventListener('pointermove', function (e) {
      tx = (e.clientX / window.innerWidth) * 2 - 1;
      ty = (e.clientY / window.innerHeight) * 2 - 1;
      if (!running) { running = true; requestAnimationFrame(loop); }
    }, { passive: true });
  }

  // ---------- luce che segue il cursore + inclinazione 3D ----------
  document.querySelectorAll('.spot').forEach(function (card) {
    var tilt = card.classList.contains('tilt');
    card.addEventListener('pointermove', function (e) {
      var r = card.getBoundingClientRect();
      var x = e.clientX - r.left;
      var y = e.clientY - r.top;
      card.style.setProperty('--x', x + 'px');
      card.style.setProperty('--y', y + 'px');
      if (tilt) {
        card.style.setProperty('--rx', ((y / r.height - 0.5) * -7).toFixed(2) + 'deg');
        card.style.setProperty('--ry', ((x / r.width - 0.5) * 7).toFixed(2) + 'deg');
      }
    });
    card.addEventListener('pointerleave', function () {
      card.style.removeProperty('--x');
      card.style.removeProperty('--y');
      card.style.removeProperty('--rx');
      card.style.removeProperty('--ry');
    });
  });
})();
