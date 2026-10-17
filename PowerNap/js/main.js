/* POWERNAP — UI behaviour: header, mobile menu, reveal, active nav, lazy video */
(function () {
  'use strict';
  var t = function (k) { return window.PN ? window.PN.t(k) : k; };
  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* Year */
  var year = document.getElementById('year');
  if (year) year.textContent = new Date().getFullYear();

  /* Header shadow on scroll */
  var header = document.querySelector('.site-header');
  function onScroll() { if (header) header.classList.toggle('is-scrolled', window.scrollY > 8); }
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });

  /* Mobile menu */
  var burger = document.querySelector('.burger');
  var nav = document.getElementById('site-nav');
  var mq = window.matchMedia('(min-width: 1020px)');

  function setMenu(open) {
    if (!burger || !nav) return;
    burger.setAttribute('aria-expanded', String(open));
    burger.setAttribute('aria-label', t(open ? 'a11y.menuClose' : 'a11y.menu'));
    nav.classList.toggle('is-open', open);
    document.body.classList.toggle('no-scroll', open);
    if (!mq.matches) {
      /* hidden menu must not be reachable by keyboard */
      nav.querySelectorAll('a').forEach(function (a) { a.tabIndex = open ? 0 : -1; });
    }
  }
  if (burger && nav) {
    setMenu(false);
    burger.addEventListener('click', function () { setMenu(burger.getAttribute('aria-expanded') !== 'true'); });
    nav.addEventListener('click', function (e) { if (e.target.closest('a')) setMenu(false); });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && burger.getAttribute('aria-expanded') === 'true') { setMenu(false); burger.focus(); }
    });
    mq.addEventListener('change', function () {
      if (mq.matches) { setMenu(false); nav.querySelectorAll('a').forEach(function (a) { a.removeAttribute('tabindex'); }); }
      else setMenu(false);
    });
    document.addEventListener('langchange', function () {
      burger.setAttribute('aria-label', t(burger.getAttribute('aria-expanded') === 'true' ? 'a11y.menuClose' : 'a11y.menu'));
    });
  }

  /* Reveal on scroll */
  var reveals = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && !reduceMotion) {
    var ro = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        /* toggled both ways so the animation replays when scrolling back up as well */
        en.target.classList.toggle('is-visible', en.isIntersecting);
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -6% 0px' });
    reveals.forEach(function (el) { ro.observe(el); });
  } else {
    reveals.forEach(function (el) { el.classList.add('is-visible'); });
  }

  /* Active nav link */
  var links = Array.prototype.slice.call(document.querySelectorAll('.nav__link[href^="#"]'));
  var map = {};
  links.forEach(function (a) { map[a.getAttribute('href').slice(1)] = a; });
  if ('IntersectionObserver' in window && links.length) {
    var so = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (!en.isIntersecting) return;
        links.forEach(function (a) { a.classList.remove('is-active'); a.removeAttribute('aria-current'); });
        var link = map[en.target.id];
        if (link) { link.classList.add('is-active'); link.setAttribute('aria-current', 'true'); }
      });
    }, { rootMargin: '-45% 0px -50% 0px' });
    Object.keys(map).forEach(function (id) { var s = document.getElementById(id); if (s) so.observe(s); });
  }

  /* Lazy looping video */
  var video = document.getElementById('loop-video');
  var toggle = document.getElementById('video-toggle');
  if (video) {
    var loaded = false, userPaused = false;
    var small = window.matchMedia('(max-width: 720px)').matches;

    function load() {
      if (loaded) return;
      loaded = true;
      var suffix = small ? '-sm' : '';
      var webm = video.getAttribute('data-src-webm' + suffix) || video.getAttribute('data-src-webm');
      var mp4 = video.getAttribute('data-src-mp4' + suffix) || video.getAttribute('data-src-mp4');
      [['video/webm', webm], ['video/mp4', mp4]].forEach(function (s) {
        var el = document.createElement('source'); el.src = s[1]; el.type = s[0]; video.appendChild(el);
      });
      video.load();
    }
    function setToggle(paused) {
      toggle.setAttribute('aria-pressed', String(paused));
      toggle.setAttribute('aria-label', t(paused ? 'vid.play' : 'vid.pause'));
    }
    video.addEventListener('playing', function () { video.style.opacity = 1; toggle.hidden = false; });
    video.addEventListener('error', function () { toggle.hidden = true; }, true);
    video.style.opacity = 0;

    toggle.addEventListener('click', function () {
      if (video.paused) { userPaused = false; video.play().catch(function () {}); setToggle(false); }
      else { userPaused = true; video.pause(); setToggle(true); }
    });
    document.addEventListener('langchange', function () { setToggle(video.paused); });

    if (reduceMotion) {
      /* respect the preference: poster only, user can opt in with the button */
      load(); userPaused = true; toggle.hidden = false; setToggle(true);
    }
    if ('IntersectionObserver' in window) {
      new IntersectionObserver(function (entries) {
        entries.forEach(function (en) {
          if (en.isIntersecting) {
            load();
            if (!userPaused) video.play().catch(function () {});
          } else if (loaded) video.pause();
        });
      }, { threshold: 0.25, rootMargin: '200px 0px' }).observe(video.parentElement);
    }
  }
})();
