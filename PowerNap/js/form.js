/* POWERNAP — contact form: validation + Web3Forms submit.
   Set the real key in index.html -> <form data-access-key="..."> (get one free at web3forms.com).
   Using Formspree instead? Change the form `action` to your Formspree URL and remove the access_key field. */
(function () {
  'use strict';
  var form = document.getElementById('contact-form');
  if (!form) return;

  var t = function (k) { return window.PN.t(k); };
  var alertBox = document.getElementById('form-alert');
  var submitBtn = document.getElementById('form-submit');
  var PLACEHOLDER_KEY = 'YOUR_ACCESS_KEY';

  var EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

  /* each rule returns an i18n key for the error, or '' when valid */
  var rules = {
    name: function (v) { return v.trim().length >= 2 ? '' : 'v.name'; },
    email: function (v) { v = v.trim(); return !v ? 'v.emailEmpty' : EMAIL_RE.test(v) ? '' : 'v.email'; },
    phone: function (v) {
      v = v.trim(); if (!v) return '';
      var digits = v.replace(/\D/g, '');
      return /^[+\d\s()-]+$/.test(v) && digits.length >= 7 && digits.length <= 15 ? '' : 'v.phone';
    },
    company: function (v) { return v.trim().length >= 2 ? '' : 'v.company'; },
    message: function (v) { return v.trim().length >= 10 ? '' : 'v.message'; },
    consent: function (v, el) { return el.checked ? '' : 'v.consent'; }
  };

  function fieldOf(el) { return el.closest('.field'); }
  function errorEl(el) { return document.getElementById(el.getAttribute('aria-describedby')); }

  function validate(el) {
    var rule = rules[el.name];
    if (!rule) return true;
    var key = rule(el.value, el);
    var wrap = fieldOf(el), err = errorEl(el);
    if (key) {
      el.setAttribute('aria-invalid', 'true');
      el.classList.remove('is-valid');
      if (wrap) wrap.classList.add('has-error');
      if (err) { err.textContent = t(key); err.dataset.key = key; }
      return false;
    }
    el.removeAttribute('aria-invalid');
    el.classList.toggle('is-valid', !!el.value.trim() && el.type !== 'checkbox');
    if (wrap) wrap.classList.remove('has-error');
    if (err) { err.textContent = ''; delete err.dataset.key; }
    return true;
  }

  var fields = Array.prototype.slice.call(form.querySelectorAll('input, textarea, select')).filter(function (el) { return rules[el.name]; });

  fields.forEach(function (el) {
    el.addEventListener('blur', function () { if (el.type === 'checkbox' || el.value !== '' || el.hasAttribute('aria-invalid')) validate(el); });
    el.addEventListener('input', function () { if (el.hasAttribute('aria-invalid')) validate(el); });
    if (el.type === 'checkbox') el.addEventListener('change', function () { validate(el); });
  });

  /* keep visible error messages in the active language */
  document.addEventListener('langchange', function () {
    form.querySelectorAll('.field-error[data-key]').forEach(function (e) { e.textContent = t(e.dataset.key); });
    if (alertBox.dataset.mode === 'server') alertBox.textContent = t(alertBox.dataset.key);
    if (alertBox.dataset.mode === 'summary') showSummary();
  });

  function labelOf(el) {
    var l = form.querySelector('label[for="' + el.id + '"]');
    return l ? (l.querySelector('span') || l).textContent.replace('*', '').trim() : el.name;
  }

  function showSummary() {
    var invalid = fields.filter(function (el) { return el.hasAttribute('aria-invalid'); });
    alertBox.dataset.mode = 'summary';
    alertBox.innerHTML = '';
    var p = document.createElement('strong'); p.textContent = t('v.summary'); alertBox.appendChild(p);
    var ul = document.createElement('ul');
    invalid.forEach(function (el) {
      var li = document.createElement('li'), a = document.createElement('a');
      a.href = '#' + el.id; a.textContent = labelOf(el);
      a.addEventListener('click', function (e) { e.preventDefault(); el.focus(); });
      li.appendChild(a); ul.appendChild(li);
    });
    alertBox.appendChild(ul);
    alertBox.classList.add('is-visible');
  }

  function showServerError(key) {
    alertBox.dataset.mode = 'server'; alertBox.dataset.key = key;
    alertBox.textContent = t(key);
    alertBox.classList.add('is-visible');
    alertBox.focus();
  }

  function hideAlert() { alertBox.classList.remove('is-visible'); alertBox.textContent = ''; delete alertBox.dataset.mode; }

  function setLoading(on) {
    form.classList.toggle('is-loading', on);
    submitBtn.disabled = on;
    submitBtn.setAttribute('aria-busy', String(on));
    submitBtn.querySelector('span:not(.spinner)').textContent = t(on ? 'f.sending' : 'f.send');
    if (on) submitBtn.querySelector('span:not(.spinner)').removeAttribute('data-i18n');
    else submitBtn.querySelector('span:not(.spinner)').setAttribute('data-i18n', 'f.send');
  }

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    hideAlert();

    /* honeypot: bots fill it, humans can't see it — pretend success */
    if (form.elements.botcheck && form.elements.botcheck.value) { window.location.href = form.dataset.success; return; }

    var results = fields.map(validate);
    if (results.indexOf(false) > -1) {
      showSummary();
      var first = fields.filter(function (el) { return el.hasAttribute('aria-invalid'); })[0];
      if (first) first.focus();
      return;
    }

    var key = form.dataset.accessKey;
    var data = {
      access_key: key,
      subject: 'POWERNAP — new business enquiry',
      from_name: 'POWERNAP website',
      name: form.elements.name.value.trim(),
      email: form.elements.email.value.trim(),
      phone: form.elements.phone.value.trim(),
      company: form.elements.company.value.trim(),
      venue_type: form.elements.venue_type.value,
      city: form.elements.city.value.trim(),
      message: form.elements.message.value.trim(),
      botcheck: ''
    };

    setLoading(true);

    /* Demo mode until a real access key is configured */
    if (!key || key === PLACEHOLDER_KEY) {
      console.warn('[POWERNAP] Form key is a placeholder — simulating a successful send. Set data-access-key in index.html.');
      setTimeout(function () { window.location.href = form.dataset.success; }, 900);
      return;
    }

    fetch(form.getAttribute('action'), {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
      body: JSON.stringify(data)
    })
      .then(function (r) { return r.json().then(function (j) { return { ok: r.ok && j.success !== false, json: j }; }); })
      .then(function (res) {
        if (res.ok) { window.location.href = form.dataset.success; return; }
        setLoading(false);
        showServerError('v.server');
      })
      .catch(function () {
        setLoading(false);
        showServerError(navigator.onLine === false ? 'v.network' : 'v.server');
      });
  });
})();
