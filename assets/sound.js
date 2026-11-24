// Il Fisioterapista Libero — sottofondo sonoro sintetizzato (nessun file audio)
// Acqua che scorre + uccellini ogni tanto, e un "tap" quando le carte girano.
// I browser permettono l'audio solo dopo un gesto del visitatore: tutto parte al primo tocco/clic.
(function () {
  var KEY = 'fl_sound';
  var enabled = true;
  try { enabled = localStorage.getItem(KEY) !== 'off'; } catch (e) {}

  var ctx = null, master = null, fx = null, started = false, birdTimer = null, waterTimer = null;
  var AMB = 0.55;    // volume del sottofondo (resta "dietro" a tutto)
  var TAP = 1.8;    // volume della bolla delle carte

  function rnd(a, b) { return a + Math.random() * (b - a); }

  function makeCtx() {
    var AC = window.AudioContext || window.webkitAudioContext;
    if (!AC) return null;
    ctx = new AC();
    // sblocco iOS: buffer silenzioso dentro il gesto
    var b = ctx.createBuffer(1, 1, 22050), s = ctx.createBufferSource();
    s.buffer = b; s.connect(ctx.destination); s.start(0);
    if (ctx.resume) ctx.resume();

    master = ctx.createGain(); master.gain.value = 0; master.connect(ctx.destination);
    fx = ctx.createGain(); fx.gain.value = enabled ? TAP : 0; fx.connect(ctx.destination);
    return ctx;
  }

  function noiseBuffer(seconds, brown) {
    var len = Math.floor(ctx.sampleRate * seconds), buf = ctx.createBuffer(2, len, ctx.sampleRate);
    for (var ch = 0; ch < 2; ch++) {
      var d = buf.getChannelData(ch), last = 0;
      for (var i = 0; i < len; i++) {
        var w = Math.random() * 2 - 1;
        if (brown) { last = (last + 0.02 * w) / 1.02; d[i] = last * 3.2; } else { d[i] = w; }
      }
    }
    return buf;
  }

  // ---------- acqua che scorre: ruscello delicato ----------
  // Un ruscello è fatto di migliaia di bollicine: ognuna è una notina breve che sale di tono.
  // Ne generiamo tante, fitte e casuali, sopra un velo leggerissimo di scroscio chiaro.
  function water() {
    var out = ctx.createGain(); out.gain.value = 4.5;
    var soft = ctx.createBiquadFilter(); soft.type = 'lowpass'; soft.frequency.value = 1900; soft.Q.value = 0.2;
    out.connect(soft); soft.connect(master);

    // velo di scroscio: rumore chiaro, filtrato in alto, molto basso
    var veil = ctx.createBufferSource(); veil.buffer = noiseBuffer(4, false); veil.loop = true;
    var vbp = ctx.createBiquadFilter(); vbp.type = 'bandpass'; vbp.frequency.value = 1500; vbp.Q.value = 0.5;
    var vg = ctx.createGain(); vg.gain.value = 0.0016;
    veil.connect(vbp); vbp.connect(vg); vg.connect(out); veil.start();
    // il velo "respira" appena, come la corrente
    var vl = ctx.createOscillator(), vlg = ctx.createGain();
    vl.frequency.value = 0.07; vlg.gain.value = 0.0005; vl.connect(vlg); vlg.connect(vg.gain); vl.start();

    // bollicine
    var panners = [];
    if (ctx.createStereoPanner) {
      [-0.55, -0.2, 0.2, 0.55].forEach(function (v) { var p = ctx.createStereoPanner(); p.pan.value = v; p.connect(out); panners.push(p); });
    }
    function droplet(t) {
      var o = ctx.createOscillator(), g = ctx.createGain();
      var big = Math.random() < 0.25;
      var f0 = big ? rnd(240, 420) : rnd(420, 900);
      var dur = big ? rnd(0.06, 0.11) : rnd(0.025, 0.055);
      var vol = big ? rnd(0.005, 0.011) : rnd(0.002, 0.007);
      o.type = 'sine';
      o.frequency.setValueAtTime(f0, t);
      o.frequency.exponentialRampToValueAtTime(f0 * rnd(1.15, 1.5), t + dur);
      g.gain.setValueAtTime(0.0001, t);
      g.gain.exponentialRampToValueAtTime(vol, t + 0.012);
      g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
      o.connect(g);
      g.connect(panners.length ? panners[Math.floor(Math.random() * panners.length)] : out);
      o.start(t); o.stop(t + dur + 0.02);
    }
    var next = ctx.currentTime + 0.1;
    function schedule() {
      var horizon = ctx.currentTime + 0.15;
      // dopo una pausa (scheda nascosta) si riparte da ora, senza raffiche di gocce arretrate
      if (next < ctx.currentTime) next = ctx.currentTime + 0.02;
      while (next < horizon) {
        droplet(next);
        // densità che ondeggia piano: la corrente non è mai uguale a se stessa
        var rate = 20 + 6 * Math.sin(ctx.currentTime * 0.09) + 3 * Math.sin(ctx.currentTime * 0.23);
        next += -Math.log(1 - Math.random()) / rate;
      }
      waterTimer = setTimeout(schedule, 60);
    }
    schedule();
  }

  // ---------- uccellini, di tanto in tanto ----------
  function bird() {
    var t = ctx.currentTime + 0.05;
    var pan = ctx.createStereoPanner ? ctx.createStereoPanner() : null;
    var hp = ctx.createBiquadFilter(); hp.type = 'highpass'; hp.frequency.value = 1400;
    var far = ctx.createBiquadFilter(); far.type = 'lowpass'; far.frequency.value = 4200;
    var out = ctx.createGain(); out.gain.value = rnd(0.3, 0.5);
    hp.connect(far); far.connect(out);
    if (pan) { pan.pan.value = rnd(-0.75, 0.75); out.connect(pan); pan.connect(master); } else out.connect(master);

    var notes = Math.floor(rnd(2, 5)), base = rnd(2400, 3600), style = Math.random();
    for (var n = 0; n < notes; n++) {
      var o = ctx.createOscillator(), g = ctx.createGain();
      o.type = 'sine';
      var dur = rnd(0.06, 0.13), f1 = base * rnd(0.92, 1.08), f2 = style < 0.5 ? f1 * rnd(1.25, 1.6) : f1 * rnd(0.7, 0.85);
      o.frequency.setValueAtTime(f1, t);
      o.frequency.exponentialRampToValueAtTime(f2, t + dur);
      // leggero trillo
      var tr = ctx.createOscillator(), trG = ctx.createGain();
      tr.frequency.value = rnd(25, 45); trG.gain.value = f1 * 0.03;
      tr.connect(trG); trG.connect(o.frequency); tr.start(t); tr.stop(t + dur + 0.05);
      g.gain.setValueAtTime(0.0001, t);
      g.gain.exponentialRampToValueAtTime(0.03, t + 0.02);
      g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
      o.connect(g); g.connect(hp);
      o.start(t); o.stop(t + dur + 0.05);
      t += dur + rnd(0.06, 0.16);
    }
    birdTimer = setTimeout(bird, rnd(11000, 24000));
  }

  // ---------- carte: scoppio delicato di una bolla di sapone ----------
  function tap(back) {
    if (!ctx || !enabled) return;
    var t = ctx.currentTime + 0.005;
    var f1 = back ? 420 : 520, f2 = back ? 1050 : 1300;
    // la "bolla": una nota rotonda che sale velocissima e svanisce
    var o = ctx.createOscillator(), g = ctx.createGain();
    o.type = 'sine';
    o.frequency.setValueAtTime(f1, t);
    o.frequency.exponentialRampToValueAtTime(f2, t + 0.04);
    g.gain.setValueAtTime(0.0001, t);
    g.gain.exponentialRampToValueAtTime(0.11, t + 0.004);
    g.gain.exponentialRampToValueAtTime(0.0001, t + 0.075);
    o.connect(g); g.connect(fx); o.start(t); o.stop(t + 0.09);
    // un riflesso più acuto, appena accennato
    var o2 = ctx.createOscillator(), g2 = ctx.createGain();
    o2.type = 'sine';
    o2.frequency.setValueAtTime(f1 * 2, t);
    o2.frequency.exponentialRampToValueAtTime(f2 * 2, t + 0.03);
    g2.gain.setValueAtTime(0.0001, t);
    g2.gain.exponentialRampToValueAtTime(0.02, t + 0.003);
    g2.gain.exponentialRampToValueAtTime(0.0001, t + 0.045);
    o2.connect(g2); g2.connect(fx); o2.start(t); o2.stop(t + 0.06);
    // il "pff" della pellicola che si rompe: un soffio brevissimo e sottile
    var n = ctx.createBufferSource(); n.buffer = noiseBuffer(0.02, false);
    var hp = ctx.createBiquadFilter(); hp.type = 'highpass'; hp.frequency.value = 5000;
    var ng = ctx.createGain();
    ng.gain.setValueAtTime(0.0001, t);
    ng.gain.exponentialRampToValueAtTime(0.025, t + 0.001);
    ng.gain.exponentialRampToValueAtTime(0.0001, t + 0.012);
    n.connect(hp); hp.connect(ng); ng.connect(fx); n.start(t); n.stop(t + 0.02);
  }

  function fadeAmbient(on) {
    if (!ctx) return;
    var t = ctx.currentTime;
    master.gain.cancelScheduledValues(t);
    master.gain.setValueAtTime(master.gain.value, t);
    master.gain.linearRampToValueAtTime(on ? AMB : 0, t + (on ? 4 : 0.6));
    fx.gain.setValueAtTime(on ? TAP : 0, t);
  }

  function start() {
    if (started) return;
    if (!makeCtx()) return;
    started = true;
    water();
    birdTimer = setTimeout(bird, rnd(3000, 7000));
    fadeAmbient(enabled);
  }

  // ---------- interruttore ----------
  var btn = document.createElement('button');
  btn.type = 'button';
  btn.className = 'sound-toggle';
  btn.innerHTML =
    '<svg class="snd-on" viewBox="0 0 24 24" aria-hidden="true"><path d="M4 9.5h3.5L12 5.5v13l-4.5-4H4z" fill="currentColor"/><path d="M15.5 9a4 4 0 0 1 0 6M18 6.5a7.5 7.5 0 0 1 0 11" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/></svg>' +
    '<svg class="snd-off" viewBox="0 0 24 24" aria-hidden="true"><path d="M4 9.5h3.5L12 5.5v13l-4.5-4H4z" fill="currentColor"/><path d="M16 9.5l5 5M21 9.5l-5 5" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/></svg>';
  function syncBtn() {
    btn.classList.toggle('is-off', !enabled);
    btn.setAttribute('aria-pressed', String(enabled));
    btn.setAttribute('aria-label', enabled ? 'Disattiva il sottofondo sonoro' : 'Attiva il sottofondo sonoro');
    btn.title = enabled ? 'Audio attivo' : 'Audio disattivato';
  }
  syncBtn();
  btn.addEventListener('click', function (e) {
    e.stopPropagation();
    enabled = !enabled;
    try { localStorage.setItem(KEY, enabled ? 'on' : 'off'); } catch (err) {}
    syncBtn();
    if (!started) start(); else fadeAmbient(enabled);
    if (enabled) tap(false);
  });
  document.body.appendChild(btn);

  // parte al primo gesto vero (mai all'apertura: l'audio resterebbe muto su iPhone)
  function firstGesture() {
    if (enabled) start();
    if (started) {
      ['touchend', 'click', 'keydown'].forEach(function (ev) { document.removeEventListener(ev, firstGesture, true); });
    }
  }
  ['touchend', 'click', 'keydown'].forEach(function (ev) { document.addEventListener(ev, firstGesture, true); });

  // scheda nascosta: silenzio
  document.addEventListener('visibilitychange', function () {
    if (!ctx) return;
    if (document.hidden) ctx.suspend(); else ctx.resume();
  });

  // ---------- la bolla su tutti i bottoni e i link ----------
  var lastUiTap = 0;
  document.addEventListener('click', function (e) {
    if (e.defaultPrevented || e.button !== 0) return;
    // un solo suono per gesto (es. etichetta + casella del modulo)
    if (performance.now() - lastUiTap < 150) return;
    var el = e.target.closest && e.target.closest('a[href], button, [role="button"], .checkbox-field');
    if (!el || el.closest('.tflip') || el.classList.contains('sound-toggle')) return; // le carte e l'interruttore hanno già il loro suono
    lastUiTap = performance.now();
    tap(false);
    // link interni: si aspetta un attimo, così la bolla si sente prima di cambiare pagina
    if (el.tagName === 'A' && enabled && ctx && !el.target && !e.metaKey && !e.ctrlKey && !e.shiftKey && !e.altKey) {
      var href = el.getAttribute('href') || '';
      if (href && href.charAt(0) !== '#' && el.origin === location.origin && !/^(mailto|tel):/i.test(href)) {
        e.preventDefault();
        setTimeout(function () { location.href = el.href; }, 120);
      }
    }
  });

  window.flSound = { tap: tap };
})();
