/* POWERNAP — locations list + lazy Leaflet map (OpenStreetMap tiles) */
(function () {
  'use strict';
  var listEl = document.getElementById('loc-list');
  var filterEl = document.getElementById('city-filter');
  var mapEl = document.getElementById('map');
  var placeholder = document.getElementById('map-placeholder');
  if (!listEl || !mapEl) return;

  var t = function (k) { return window.PN.t(k); };
  var locations = [], city = 'all', map = null, markers = {}, selected = null;

  function el(tag, cls, text) { var n = document.createElement(tag); if (cls) n.className = cls; if (text != null) n.textContent = text; return n; }

  function status(l) { return l.hours === '24/7' ? t('map.open247') : t('map.hours') + ' ' + l.hours; }

  function renderFilter() {
    var cities = ['all'].concat(locations.map(function (l) { return l.city; }).filter(function (c, i, a) { return a.indexOf(c) === i; }));
    filterEl.innerHTML = '';
    cities.forEach(function (c) {
      var b = el('button', 'chip', c === 'all' ? t('map.all') : c);
      b.type = 'button'; b.setAttribute('aria-pressed', String(c === city));
      b.addEventListener('click', function () { city = c; renderFilter(); renderList(); fit(); });
      filterEl.appendChild(b);
    });
  }

  function visible() { return locations.filter(function (l) { return city === 'all' || l.city === city; }); }

  function renderList() {
    listEl.innerHTML = '';
    visible().forEach(function (l) {
      var b = el('button', 'loc-item'); b.type = 'button';
      if (selected === l.id) b.setAttribute('aria-current', 'true');
      b.appendChild(el('strong', null, l.name));
      b.appendChild(el('span', null, l.address + ', ' + l.city));
      var s = el('span', 'loc-status', status(l) + ' · ' + l.slots + ' ' + t('map.slots'));
      b.appendChild(s);
      b.addEventListener('click', function () { select(l.id, true); });
      listEl.appendChild(b);
    });
  }

  function select(id, pan) {
    selected = id; renderList();
    if (map && markers[id]) {
      if (pan) map.setView(markers[id].getLatLng(), Math.max(map.getZoom(), 15), { animate: true });
      markers[id].openPopup();
    }
  }

  function fit() {
    if (!map) return;
    var v = visible();
    if (!v.length) return;
    map.fitBounds(v.map(function (l) { return [l.lat, l.lng]; }), { padding: [40, 40], maxZoom: 14 });
  }

  function popupHtml(l) {
    var d = document.createElement('div');
    d.appendChild(el('strong', null, l.name)); d.appendChild(document.createElement('br'));
    d.appendChild(document.createTextNode(l.address + ', ' + l.city)); d.appendChild(document.createElement('br'));
    d.appendChild(document.createTextNode(status(l)));
    return d;
  }

  function loadScript(src, cb, onerr) {
    var s = document.createElement('script'); s.src = src; s.onload = cb; s.onerror = onerr; document.head.appendChild(s);
  }

  function initMap() {
    if (!window.L) return fail();
    map = L.map(mapEl, { scrollWheelZoom: false, tap: true }).setView([52.0, 19.5], 6);
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19, attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(map);
    var icon = L.divIcon({ className: '', html: '<div class="pn-pin"></div>', iconSize: [28, 28], iconAnchor: [14, 28], popupAnchor: [0, -26] });
    locations.forEach(function (l) {
      var m = L.marker([l.lat, l.lng], { icon: icon, title: l.name, alt: l.name }).addTo(map);
      m.bindPopup(popupHtml(l));
      m.on('click', function () { selected = l.id; renderList(); });
      markers[l.id] = m;
    });
    placeholder.hidden = true;
    fit();
    /* wheel zoom only after the user clicks the map, so page scrolling isn't hijacked */
    map.on('focus', function () { map.scrollWheelZoom.enable(); });
    map.on('blur', function () { map.scrollWheelZoom.disable(); });
  }

  function fail() { placeholder.hidden = false; placeholder.firstElementChild.textContent = t('map.fail'); }

  function loadMap() {
    var css = document.createElement('link'); css.rel = 'stylesheet'; css.href = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css'; document.head.appendChild(css);
    loadScript('https://unpkg.com/leaflet@1.9.4/dist/leaflet.js', initMap, fail);
  }

  document.addEventListener('langchange', function () {
    renderFilter(); renderList();
    Object.keys(markers).forEach(function (id) {
      var l = locations.filter(function (x) { return x.id === id; })[0];
      if (l) markers[id].setPopupContent(popupHtml(l));
    });
  });

  fetch('data/locations.json')
    .then(function (r) { return r.json(); })
    .then(function (data) {
      locations = data;
      renderFilter(); renderList();
      if ('IntersectionObserver' in window) {
        var io = new IntersectionObserver(function (en) {
          if (en[0].isIntersecting) { io.disconnect(); loadMap(); }
        }, { rootMargin: '400px 0px' });
        io.observe(mapEl);
      } else loadMap();
    })
    .catch(fail);
})();
