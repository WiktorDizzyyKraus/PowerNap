/* POWERNAP — i18n
   Base language is PL (written directly in the HTML so it works without JS and is indexable).
   EN strings live below; the original PL text is cached on first switch so toggling back is lossless. */
(function () {
  'use strict';

  var STORAGE_KEY = 'pn-lang';
  var SUPPORTED = ['pl', 'en'];

  var EN = {
    'meta.title': 'POWERNAP — power bank rental | Rent, charge, return',
    'meta.desc': 'POWERNAP — rent a power bank in seconds from a station in your city. No sign-up, pay by card at the machine\'s terminal, return at any station.',
    'a11y.skip': 'Skip to content',
    'a11y.home': 'POWERNAP — home',
    'a11y.nav': 'Main navigation',
    'a11y.lang': 'Language',
    'a11y.menu': 'Open menu',
    'a11y.menuClose': 'Close menu',

    'nav.how': 'How it works', 'nav.pricing': 'Pricing', 'nav.business': 'Business',

    'hero.eyebrow': 'Power bank rental',
    'hero.title': 'Phone dying?<br>Take a <mark>POWERNAP</mark>.',
    'hero.lead': 'Tap your card on the station\'s terminal and a power bank slides out right away. Charge on the go and return it at any station in the city.',
    'hero.cta1': 'Find a station', 'hero.cta2': 'How it works',
    'hero.imgalt': 'POWERNAP station with power banks',
    'hero.s1v': '120+', 'hero.s1l': 'stations in the city',
    'hero.s2v': '3-in-1', 'hero.s2l': 'cables in every power bank',
    'hero.s3l': 'station availability',
    'hero.s4v': '10 s', 'hero.s4l': 'average rental time',

    'how.eyebrow': 'How it works', 'how.title': 'Four steps. Zero stress.',
    'how.lead': 'No account, no app, no QR codes. Just a contactless card or phone.',
    'how.s1t': 'Find a station', 'how.s1p': 'Check the map on this page. Stations are in cafés, malls, train stations and hotels.',
    'how.s2t': 'Tap your card on the terminal', 'how.s2p': 'Every station has a built-in POS terminal. Tap your card or phone and a power bank slides out automatically.',
    'how.s3t': 'Charge on the go', 'how.s3p': 'USB-C, Lightning and micro-USB cables are built in. Keep your phone charging in your pocket.',
    'how.s4t': 'Return anywhere', 'how.s4p': 'Slide the power bank into any free slot at any station. You are charged automatically to the same card.',

    'st.eyebrow': 'Our machines', 'st.title': 'Stations always within reach.',
    'st.lead': 'Two models for any place: from a small café to a large train station.',
    'st.a1alt': 'Nap 8 station', 'st.a2alt': 'Nap 24 station',
    'st.a1t': 'For cafés and shops', 'st.a1p': 'A compact station for a counter or wall. Takes up about as much space as a coffee machine.',
    'st.b1t': 'For malls and stations', 'st.b1p': 'A freestanding unit for heavy traffic. Handles dozens of rentals per hour.',
    'st.pay': 'Payment', 'st.payv': 'POS terminal', 'st.slots': 'Slots', 'st.size': 'Dimensions', 'st.power': 'Power', 'st.net': 'Connectivity',
    'ft.1t': '5000 mAh', 'ft.1p': 'Enough to fully charge most phones.',
    'ft.2t': 'Three cables included', 'ft.2p': 'USB-C, Lightning and micro-USB built into the body.',
    'ft.3t': 'Safe cells', 'ft.3p': 'Protection against overheating and overcharging.',

    'vid.label': 'POWERNAP video', 'vid.title': 'Power where you need it.',
    'vid.pause': 'Pause video', 'vid.play': 'Play video',

    'pay.eyebrow': 'Payments', 'pay.title': 'Pay with one tap.',
    'pay.c1': 'No sign-up and no app. A contactless card or phone is all you need.',
    'pay.c2': 'A POS terminal in every machine: tap your card and the power bank slides out within seconds.',
    'pay.c3': 'We hold a deposit on your card at rental, we don\'t charge it. It is released in full after return.',
    'pay.c4': 'Payments are encrypted and handled by a certified operator. Invoices on request.',
    'pay.methods': 'Accepted payment methods',

    'map.eyebrow': 'Locations', 'map.title': 'Find the nearest station.',
    'map.lead': 'Pick a city, select a station from the list or the map and check opening hours.',
    'map.filter': 'City filter', 'map.maplabel': 'POWERNAP stations map', 'map.loading': 'Loading map…',
    'map.note': 'Map: © OpenStreetMap. The list next to the map works without it too.',
    'map.all': 'All', 'map.open247': 'Open 24/7', 'map.hours': 'Open', 'map.fail': 'The map could not be loaded. Use the list of stations.',
    'map.slots': 'slots',

    'ret.eyebrow': 'Return', 'ret.title': 'Return it wherever is convenient.',
    'ret.t1': 'Find any station', 'ret.t1p': 'It doesn\'t have to be the one where you rented the power bank.',
    'ret.t2': 'Slide it into a free slot', 'ret.t2p': 'A green light and a sound confirm the power bank was accepted.',
    'ret.t3': 'Done', 'ret.t3p': 'Your deposit goes back to your card and the fee is charged automatically to the same card.',
    'ret.faq': 'Frequently asked about returns',
    'ret.q1': 'What if the station is full?', 'ret.a1': 'Choose another station nearby. We stop the rental clock for up to 15 minutes when you report the problem to Support.',
    'ret.q2': 'What if I don\'t return the power bank?', 'ret.a2': 'After 5 days the rental turns into a purchase for PLN 99. The power bank is yours and there\'s nothing to return.',
    'ret.q3': 'Can I return it after the venue closes?', 'ret.a3': 'Yes, if the station is in a place open around the clock. Check availability in the locations list.',

    'pr.eyebrow': 'Pricing', 'pr.title': 'Simple and fair.',
    'pr.lead': 'No subscription and no hidden fees. You only pay for the time you actually use.',
    'pr.p1n': 'Start', 'pr.p1u': '/ 30 min', 'pr.p1d': 'For a quick top-up on the go.',
    'pr.p1a': 'Each additional hour: PLN 3', 'pr.p1b': 'Cables included', 'pr.p1c': 'Return at any station',
    'pr.p2n': 'Day', 'pr.p2u': '/ 24 h', 'pr.p2d': 'For a full day out, without counting minutes.',
    'pr.p2a': 'Maximum charge per day', 'pr.p2b': 'Charge as much as you like', 'pr.p2c': 'Return at any station',
    'pr.pop': 'Most popular',
    'pr.p3n': 'Purchase', 'pr.p3u': 'after 5 days', 'pr.p3d': 'If you don\'t return it, the power bank is yours.',
    'pr.p3a': 'Charged automatically', 'pr.p3b': 'No extra penalties', 'pr.p3c': 'Invoice on request',
    'pr.ask': 'Ask for details',
    'pr.note': 'Prices include VAT. A PLN 99 deposit is held on your card and released after the power bank is returned.',

    'help.eyebrow': 'Support', 'help.title': 'Need help?',
    'help.lead': 'You\'ll find answers to common questions below. If that\'s not enough, we\'re here for you.',
    'help.phone': 'Phone', 'help.hours': 'Support hours', 'help.hoursv': 'Daily 8:00–22:00',
    'faq.q1': 'Do I need to create an account?', 'faq.a1': 'No. Tap your card on the station\'s terminal and a power bank slides out right away.',
    'faq.q2': 'How much does a rental cost?', 'faq.a2': 'The first 30 minutes cost PLN 3, and a full day costs at most PLN 15.',
    'faq.q3': 'Where can I return the power bank?', 'faq.a3': 'At any POWERNAP station, regardless of where you rented it.',
    'faq.q4': 'Will the power bank fit my phone?', 'faq.a4': 'Yes. It has built-in USB-C, Lightning and micro-USB cables, so it works with most phones.',
    'faq.q5': 'What if the power bank doesn\'t work?', 'faq.a5': 'Return it to any station and write to us. We won\'t charge you for faulty equipment.',
    'faq.q6': 'How do I get an invoice?', 'faq.a6': 'We issue invoices on request. Write to us with the number from your payment confirmation.',

    'biz.eyebrow': 'For business', 'biz.title': 'Got a business? Write to us.',
    'biz.lead': 'We\'ll place a station in your venue, handle operations and share the revenue.',
    'biz.c1': 'Station and installation free of charge', 'biz.c2': 'Commission on every rental',
    'biz.c3': 'More guests who stay longer in your venue', 'biz.c4': 'Service, charging and swapping power banks handled by us',

    'f.name': 'Full name', 'f.email': 'E-mail', 'f.phone': 'Phone', 'f.optional': '(optional)',
    'f.company': 'Company / venue name', 'f.type': 'Venue type', 'f.type0': 'Choose…',
    'f.type1': 'Café / restaurant', 'f.type2': 'Shop / shopping mall', 'f.type3': 'Hotel / hostel',
    'f.type4': 'Station / airport', 'f.type5': 'Other', 'f.city': 'City',
    'f.message': 'Message', 'f.msgph': 'Briefly describe your venue and what you need.',
    'f.consent': 'I consent to the processing of my data to answer this message, in line with the <a href="polityka-prywatnosci.html">privacy policy</a>.',
    'f.send': 'Send message', 'f.sending': 'Sending…',
    'f.fine': 'Fields marked * are required. We reply within 1–2 business days.',

    'ft.serv': 'Service', 'ft.price': 'Pricing', 'ft.loc': 'Locations', 'ft.biz': 'Business',
    'ft.station': 'Write about a station', 'ft.coop': 'Partnership', 'ft.help': 'Help',
    'ft.privacy': 'Privacy policy', 'ft.terms': 'Terms and conditions', 'ft.cookies': 'Cookie settings',
    'ft.rights': 'All rights reserved.', 'ft.up': 'Back to top ↑',

    'ck.text': 'We use necessary cookies so the site works. With your consent we may also use analytics and marketing cookies. <a href="polityka-prywatnosci.html">Learn more</a>.',
    'ck.accept': 'Accept all', 'ck.reject': 'Necessary only', 'ck.settings': 'Settings',
    'ck.title': 'Cookie settings', 'ck.intro': 'Choose which cookies we may use. You can change this at any time in the footer.',
    'ck.nec': 'Necessary', 'ck.necd': 'Required for the site to work (e.g. remembering your choices). Always on.',
    'ck.ana': 'Analytics', 'ck.anad': 'Help us understand how the site is used. Not used at the moment.',
    'ck.mkt': 'Marketing', 'ck.mktd': 'Used to personalise ads. Not used at the moment.',
    'ck.save': 'Save choices',

    'thx.title': 'Thank you!', 'thx.p': 'Your message has been sent. We\'ll get back to you within 1–2 business days.',
    'thx.back': 'Back to home page', 'thx.meta': 'Thank you — POWERNAP',
    'nf.title': 'Page not found', 'nf.p': 'The page you\'re looking for doesn\'t exist or has been moved.', 'nf.meta': 'Page not found — POWERNAP',
    'leg.back': '← Back to home page'
  };

  /* Strings that exist only in JS: PL + EN */
  var JS_PL = {
    'a11y.menu': 'Otwórz menu', 'a11y.menuClose': 'Zamknij menu',
    'vid.pause': 'Wstrzymaj film', 'vid.play': 'Odtwórz film',
    'map.all': 'Wszystkie', 'map.open247': 'Czynne 24/7', 'map.hours': 'Czynne', 'map.slots': 'slotów',
    'map.fail': 'Nie udało się załadować mapy. Skorzystaj z listy stacji.',
    'f.sending': 'Wysyłanie…',
    'v.name': 'Podaj imię i nazwisko (min. 2 znaki).',
    'v.email': 'Podaj poprawny adres e-mail, np. jan@firma.pl.',
    'v.emailEmpty': 'Podaj adres e-mail.',
    'v.phone': 'Podaj poprawny numer telefonu (7–15 cyfr).',
    'v.company': 'Podaj nazwę firmy lub lokalu.',
    'v.message': 'Napisz wiadomość (min. 10 znaków).',
    'v.consent': 'Zgoda jest wymagana, aby wysłać wiadomość.',
    'v.summary': 'Popraw zaznaczone pola, aby wysłać wiadomość:',
    'v.server': 'Nie udało się wysłać wiadomości. Spróbuj ponownie za chwilę lub napisz na kontakt@powernap.example.',
    'v.network': 'Brak połączenia z internetem. Sprawdź sieć i spróbuj ponownie.'
  };
  var JS_EN = {
    'v.name': 'Enter your full name (min. 2 characters).',
    'v.email': 'Enter a valid e-mail address, e.g. john@company.com.',
    'v.emailEmpty': 'Enter your e-mail address.',
    'v.phone': 'Enter a valid phone number (7–15 digits).',
    'v.company': 'Enter your company or venue name.',
    'v.message': 'Write a message (min. 10 characters).',
    'v.consent': 'Consent is required to send the message.',
    'v.summary': 'Please fix the highlighted fields to send your message:',
    'v.server': 'We couldn\'t send your message. Try again in a moment or write to kontakt@powernap.example.',
    'v.network': 'No internet connection. Check your network and try again.'
  };

  var lang = 'pl';
  try {
    var saved = localStorage.getItem(STORAGE_KEY);
    if (SUPPORTED.indexOf(saved) > -1) lang = saved;
  } catch (e) { /* storage unavailable */ }

  function t(key) {
    if (lang === 'en') {
      if (EN[key] != null) return EN[key];
      if (JS_EN[key] != null) return JS_EN[key];
    }
    if (JS_PL[key] != null) return JS_PL[key];
    return key;
  }

  function cache(el, name, current) {
    el._pl = el._pl || {};
    if (!(name in el._pl)) el._pl[name] = current;
    return el._pl[name];
  }

  function apply(root) {
    root = root || document;
    var nodes = root.querySelectorAll('[data-i18n], [data-i18n-html], [data-i18n-attr]');
    nodes.forEach(function (el) {
      var key = el.getAttribute('data-i18n');
      if (key) {
        var pl = cache(el, 'text', el.textContent);
        el.textContent = lang === 'en' && EN[key] != null ? EN[key] : pl;
      }
      var hkey = el.getAttribute('data-i18n-html');
      if (hkey) {
        var plh = cache(el, 'html', el.innerHTML);
        el.innerHTML = lang === 'en' && EN[hkey] != null ? EN[hkey] : plh;
      }
      var attrs = el.getAttribute('data-i18n-attr');
      if (attrs) {
        attrs.split(';').forEach(function (pair) {
          var parts = pair.split(':');
          var attr = parts[0].trim(), k = parts[1].trim();
          var plA = cache(el, 'a:' + attr, el.getAttribute(attr));
          el.setAttribute(attr, lang === 'en' && EN[k] != null ? EN[k] : plA);
        });
      }
    });
    document.querySelectorAll('[data-lang-btn]').forEach(function (b) {
      b.setAttribute('aria-pressed', String(b.getAttribute('data-lang-btn') === lang));
    });
  }

  function setLang(next) {
    if (SUPPORTED.indexOf(next) < 0 || next === lang) return;
    lang = next;
    try { localStorage.setItem(STORAGE_KEY, lang); } catch (e) { /* ignore */ }
    document.documentElement.lang = lang;
    apply(document);
    document.dispatchEvent(new CustomEvent('langchange', { detail: { lang: lang } }));
  }

  window.PN = window.PN || {};
  window.PN.t = t;
  window.PN.applyI18n = apply;
  window.PN.getLang = function () { return lang; };
  window.PN.setLang = setLang;

  document.documentElement.lang = lang;
  function init() {
    apply(document);
    document.querySelectorAll('[data-lang-btn]').forEach(function (b) {
      b.addEventListener('click', function () { setLang(b.getAttribute('data-lang-btn')); });
    });
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
