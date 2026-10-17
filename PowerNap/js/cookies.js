/* POWERNAP — cookie consent. Choice is stored in localStorage ('pn-consent').
   Load optional scripts only after consent: listen for the 'cookie-consent' event or call PN.hasConsent('analytics'). */
(function () {
  'use strict';
  var KEY = 'pn-consent';
  var t = function (k) { return window.PN.t(k); };

  function read() {
    try { var v = JSON.parse(localStorage.getItem(KEY)); return v && typeof v === 'object' ? v : null; } catch (e) { return null; }
  }
  function write(c) {
    try { localStorage.setItem(KEY, JSON.stringify(c)); } catch (e) { /* ignore */ }
    document.dispatchEvent(new CustomEvent('cookie-consent', { detail: c }));
  }
  window.PN.hasConsent = function (cat) { var c = read(); return !!(c && c[cat]); };

  var banner = document.createElement('div');
  banner.className = 'cookie-banner';
  banner.setAttribute('role', 'region');
  banner.setAttribute('aria-label', 'Cookies');
  banner.innerHTML =
    '<p data-i18n-html="ck.text">Używamy niezbędnych plików cookies, aby strona działała. Za Twoją zgodą możemy też użyć cookies analitycznych i marketingowych. <a href="polityka-prywatnosci.html">Dowiedz się więcej</a>.</p>' +
    '<div class="cookie-actions">' +
    '<button type="button" class="btn btn--light" data-act="all" data-i18n="ck.accept">Akceptuję wszystkie</button>' +
    '<button type="button" class="btn btn--secondary" data-act="reject" data-i18n="ck.reject">Tylko niezbędne</button>' +
    '<button type="button" class="btn btn--secondary" data-act="settings" data-i18n="ck.settings">Ustawienia</button>' +
    '</div>';

  var dialog = document.createElement('dialog');
  dialog.className = 'cookie-dialog';
  dialog.setAttribute('aria-labelledby', 'ck-title');
  dialog.innerHTML =
    '<form method="dialog" id="ck-form">' +
    '<h2 id="ck-title" data-i18n="ck.title">Ustawienia cookies</h2>' +
    '<p class="muted" data-i18n="ck.intro">Wybierz, z jakich plików cookies możemy korzystać. Zmienisz to w każdej chwili w stopce strony.</p>' +
    row('necessary', 'ck.nec', 'Niezbędne', 'ck.necd', 'Wymagane do działania strony (np. zapamiętanie Twoich wyborów). Zawsze włączone.', true) +
    row('analytics', 'ck.ana', 'Analityczne', 'ck.anad', 'Pomagają zrozumieć, jak korzystasz ze strony. Obecnie nieużywane.', false) +
    row('marketing', 'ck.mkt', 'Marketingowe', 'ck.mktd', 'Służą do personalizacji reklam. Obecnie nieużywane.', false) +
    '<div class="cookie-actions">' +
    '<button type="button" class="btn btn--primary" data-act="save" data-i18n="ck.save">Zapisz wybór</button>' +
    '<button type="button" class="btn btn--secondary" data-act="all" data-i18n="ck.accept">Akceptuję wszystkie</button>' +
    '</div></form>';

  function row(id, k1, t1, k2, t2, locked) {
    return '<div class="cookie-row"><div><strong data-i18n="' + k1 + '">' + t1 + '</strong><span data-i18n="' + k2 + '">' + t2 + '</span></div>' +
      '<label class="switch"><span class="visually-hidden" data-i18n="' + k1 + '">' + t1 + '</span>' +
      '<input type="checkbox" name="' + id + '"' + (locked ? ' checked disabled' : '') + '><i></i></label></div>';
  }

  document.body.appendChild(banner);
  document.body.appendChild(dialog);
  window.PN.applyI18n(banner);
  window.PN.applyI18n(dialog);

  var lastFocus = null;

  function showBanner() { requestAnimationFrame(function () { banner.classList.add('is-visible'); }); }
  function hideBanner() { banner.classList.remove('is-visible'); }

  function openSettings() {
    var c = read() || {};
    dialog.querySelector('[name=analytics]').checked = !!c.analytics;
    dialog.querySelector('[name=marketing]').checked = !!c.marketing;
    lastFocus = document.activeElement;
    if (typeof dialog.showModal === 'function') dialog.showModal(); else dialog.setAttribute('open', '');
  }
  function closeSettings() {
    if (typeof dialog.close === 'function') dialog.close(); else dialog.removeAttribute('open');
    if (lastFocus && document.contains(lastFocus)) lastFocus.focus();
  }

  function handle(act) {
    if (act === 'all') write({ necessary: true, analytics: true, marketing: true });
    else if (act === 'reject') write({ necessary: true, analytics: false, marketing: false });
    else if (act === 'save') write({ necessary: true, analytics: dialog.querySelector('[name=analytics]').checked, marketing: dialog.querySelector('[name=marketing]').checked });
    else if (act === 'settings') { openSettings(); return; }
    hideBanner();
    if (dialog.open) closeSettings();
  }

  [banner, dialog].forEach(function (root) {
    root.addEventListener('click', function (e) {
      var b = e.target.closest('[data-act]');
      if (b) handle(b.getAttribute('data-act'));
    });
  });
  dialog.addEventListener('click', function (e) { if (e.target === dialog) closeSettings(); });

  document.querySelectorAll('[data-cookie-settings]').forEach(function (b) { b.addEventListener('click', openSettings); });

  if (!read()) showBanner();
})();
