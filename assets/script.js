// il fisioterapista libero — script.js
(function () {
  // Anno corrente nel footer
  var yearEl = document.getElementById('year');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

  // Chiusura automatica dello scroll fluido per chi preferisce meno movimento
  // è già gestita via CSS (prefers-reduced-motion), qui solo un fallback
  // per browser che non supportano scroll-behavior: smooth su <html>.
  var supportsNativeSmoothScroll = 'scrollBehavior' in document.documentElement.style;
  if (!supportsNativeSmoothScroll) {
    document.querySelectorAll('a[href^="#"]').forEach(function (link) {
      link.addEventListener('click', function (e) {
        var targetId = link.getAttribute('href').slice(1);
        var target = document.getElementById(targetId);
        if (target) {
          e.preventDefault();
          target.scrollIntoView();
        }
      });
    });
  }
})();
