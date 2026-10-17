# POWERNAP — plan strony wizytówki

Landing page firmy wynajmującej powerbanki. Jedna strona przewijana z góry na dół, bez logowania, z formularzem kontaktowym. Czysty HTML + CSS + JS, bez frameworków i bez kroku budowania.

---

## 1. Kierunek wizualny

| Element | Decyzja |
|---|---|
| Tło | `#FAFAF8` (prawie biel), sekcje naprzemiennie `#FFFFFF` / `#F3F3F0` |
| Akcent | `#0A0A0A` (czerń) — przyciski, nagłówki, ikony |
| Kolor sygnałowy | jeden, oszczędnie: np. limonkowy `#C8F560` (stan „naładowany”, badge, focus ring) |
| Obramowania | `1px solid rgba(0,0,0,.08)`, zaokrąglenia 16–24px na kartach, pigułki na przyciskach |
| Typografia | **Inter Tight** / **Space Grotesk** (nagłówki, 700–800, ciasny tracking `-0.03em`) + **Inter** (tekst). Self-hosted `woff2`, `font-display: swap` |
| Skala nagłówków | płynna przez `clamp()`: H1 `clamp(2.75rem, 8vw, 7.5rem)`, H2 `clamp(2rem, 5vw, 4.5rem)` |
| Odstępy | sekcje `clamp(80px, 12vw, 160px)` w pionie, kontener max 1280px, gutter 16px (mobile) → 32px → 48px |
| Przyciski | min. wysokość 48px; primary: czarne tło / biały tekst; secondary: obrys 1px; hover = lekkie uniesienie + zmiana tła; widoczny `:focus-visible` (2px ring w kolorze sygnałowym + offset) |
| Animacje | fade + translateY(24px) przy wejściu sekcji (IntersectionObserver), 600ms ease-out; wszystko wyłączone przy `prefers-reduced-motion` |

Inspiracja chargo.io: duży hero z produktem, kroki „1-2-3”, mocne liczby, sekcje kart, jasny podział na użytkownika i partnera biznesowego.

---

## 2. Struktura strony (kolejność sekcji)

### 0. Baner cookies
Dolny pasek: krótka informacja + **Akceptuj wszystkie** / **Tylko niezbędne** / **Ustawienia** (modal z przełącznikami: niezbędne — zawsze, analityczne, marketingowe). Zgoda zapisana w `localStorage`; skrypty analityczne ładowane dopiero po zgodzie. Link „Ustawienia cookies” w stopce otwiera modal ponownie.

### 1. Header (sticky)
- Logo **POWERNAP** (tekstowe, SVG) po lewej.
- Nawigacja: Jak to działa · Stacje · Płatności · Lokalizacje · Cennik · Pomoc · **Dla biznesu** (przycisk).
- Po przewinięciu: tło z `backdrop-filter: blur`, cienka dolna linia.
- Mobile (<900px): przycisk hamburger (min. 48×48) → pełnoekranowe menu, `aria-expanded`, zamykanie Esc / kliknięciem linku, blokada scrolla body, focus trap.
- Link „Przejdź do treści” (skip link) dla klawiatury.

### 2. Hero
- H1: np. **„Bateria pada? Weź POWERNAP.”**
- Podtytuł: wypożycz powerbank w kilka sekund, oddaj w dowolnej stacji w mieście.
- CTA: **Znajdź stację** (scroll do mapy) + **Jak to działa** (secondary).
- Wizual: zdjęcie/render stacji z powerbankami (WebP/AVIF, `fetchpriority="high"`).
- Pasek liczb pod spodem: „120+ stacji · 3 kable w każdym powerbanku · 24/7”.

### 3. Jak działa wypożyczanie
Trzy/cztery kroki w kartach z numerem:
1. **Znajdź stację** — mapa lub aplikacja.
2. **Zeskanuj kod QR** — telefonem, bez rejestracji.
3. **Ładuj w drodze** — USB-C, Lightning, micro-USB w zestawie.
4. **Oddaj gdziekolwiek** — w dowolnej stacji sieci.

### 4. Nasze stacje (maszyny)
- Dwa modele, np. **Stacja 8** (kawiarnie, sklepy) i **Stacja 24** (galerie, dworce) — karta ze zdjęciem i parametrami.
- Cechy powerbanka: pojemność (np. 5000 mAh), szybkie ładowanie, 3 wbudowane kable, wskaźnik LED.

### 5. Wideo full-width (100vw)
- `<video autoplay muted loop playsinline preload="none" poster="...">` z dwoma źródłami: **WebM (VP9/AV1)** i **MP4 (H.264)**, 1080p i wersja 720p dla mobile (`media` / wybór w JS).
- Waga docelowo < 3 MB, bez ścieżki audio, długość 8–15 s.
- Leniwe ładowanie: start dopiero, gdy sekcja wejdzie w viewport; pauza poza viewportem.
- `prefers-reduced-motion` → sam poster + przycisk „Odtwórz”.
- Przycisk pauzy (WCAG 2.2.2), `aria-label`.
- Uwaga: szerokość przez `width: 100%` w kontenerze pełnej szerokości (nie `100vw`, które na Windows powoduje poziomy scroll przez pasek przewijania).

### 6. Płatności
- Metody: Apple Pay, Google Pay, BLIK, karta (Visa/Mastercard).
- Krótko: kaucja / preautoryzacja, opłata naliczana dopiero po zwrocie, faktura na e-mail.
- Ikony metod jako SVG z tekstem alternatywnym.

### 7. Mapa z lokalizacjami
- Leaflet + OpenStreetMap (bez klucza API), ładowana dopiero przy zbliżeniu do sekcji.
- Lista lokalizacji obok mapy (na mobile pod mapą) z filtrem po mieście — lista działa też bez JS/mapy (dostępność).
- Dane w `data/locations.json` (nazwa, adres, godziny, współrzędne).
- Mapa ładuje kafelki z zewnętrznego serwera → wspomnieć w polityce prywatności.

### 8. Zwrot powerbanka
- Oddajesz w dowolnej stacji; wsuwasz do wolnego slotu, potwierdzenie w telefonie.
- Co jeśli stacja jest pełna? Co jeśli nie oddam? (np. po 5 dniach powerbank przechodzi na własność za opłatą X zł).
- Format: kroki + mini-FAQ (akordeon `<details>`).

### 9. Cennik
- 2–3 karty: **Start** (np. 3 zł za pierwsze 30 min), **Dzień** (maks. 15 zł / 24 h), **Zakup** (po przekroczeniu limitu).
- Wyróżniona karta „najpopularniejsza” — czarne tło.
- Dopisek: ceny brutto, bez abonamentu.

### 10. Support / FAQ
- Akordeon FAQ (6–8 pytań) — natywne `<details>/<summary>`.
- Kafelki kontaktu: telefon, e-mail, czat/WhatsApp, godziny pracy.
- Dane strukturalne `FAQPage` (JSON-LD).

### 11. Masz biznes? Napisz do nas (formularz)
- Lewa kolumna: korzyści dla partnera (darmowa stacja, prowizja, więcej klientów w lokalu).
- Prawa: formularz:
  - Imię i nazwisko*, E-mail*, Telefon, Nazwa firmy*, Typ lokalu (select), Miasto, Wiadomość*, zgoda RODO* (checkbox z linkiem do polityki).
  - Honeypot (ukryte pole) przeciw botom.
- Walidacja: natywna HTML5 + własna w JS — komunikaty pod polem po polsku, `aria-invalid`, `aria-describedby`, walidacja przy `blur` i przy wysyłce, fokus na pierwszym błędnym polu, podsumowanie błędów w `role="alert"`.
- Stany: domyślny, focus, błąd (czerwona ramka + ikona + tekst), poprawny, **wysyłanie** (przycisk z loaderem, `disabled`), **błąd serwera** (komunikat + ponów).
- Wysyłka: `fetch` do usługi formularzy (np. Formspree / Web3Forms) lub własnego endpointu — **do ustalenia**. Bez backendu → przekierowanie do strony podziękowania.

### 12. Footer
- Duży znak **POWERNAP** na całą szerokość.
- Kolumny:
  - **Serwis:** Jak to działa · Cennik · Lokalizacje
  - **Biznes:** Napisz o stację · Współpraca
  - **Pomoc:** FAQ · Support
  - **Boring stuff:** Polityka prywatności · Regulamin · Ustawienia cookies
- Dane kontaktowe: nazwa firmy, adres, NIP, e-mail, telefon.
- Social media, © 2026 POWERNAP.

---

## 3. Podstrony / dodatkowe pliki

| Plik | Cel |
|---|---|
| `dziekujemy.html` | Strona po wysłaniu formularza: potwierdzenie, czas odpowiedzi, powrót na stronę główną, `noindex` |
| `polityka-prywatnosci.html` | RODO: administrator, cele, podstawy prawne, cookies, mapa (OSM), formularz, prawa użytkownika |
| `regulamin.html` | Zasady wypożyczenia, opłaty, zwrot, reklamacje |
| `404.html` | Prosta strona błędu w tym samym stylu |

Treści prawne będą **szablonem do weryfikacji przez prawnika**.

---

## 4. Struktura plików

```
PowerNap/
├── index.html
├── dziekujemy.html
├── polityka-prywatnosci.html
├── regulamin.html
├── 404.html
├── robots.txt
├── sitemap.xml
├── site.webmanifest
├── css/
│   └── styles.css          (tokeny, reset, layout, komponenty, sekcje, utilities)
├── js/
│   ├── main.js             (menu, scroll, animacje, wideo, akordeony)
│   ├── form.js             (walidacja + wysyłka)
│   ├── cookies.js          (baner + zgody)
│   └── map.js              (Leaflet, ładowany leniwie)
├── data/
│   └── locations.json
└── assets/
    ├── fonts/              (woff2)
    ├── img/                (AVIF/WebP + fallback, logo.svg, favicon, og-image 1200×630)
    ├── icons/              (SVG)
    └── video/              (hero-loop.webm, hero-loop.mp4, poster.webp)
```

---

## 5. SEO, dostępność, wydajność

**SEO**
- `lang="pl"`, unikalny `<title>` i `meta description`, canonical, Open Graph + Twitter Card.
- Jeden H1, logiczna hierarchia H2/H3, semantyczne `<header> <nav> <main> <section> <footer>`.
- JSON-LD: `Organization`, `LocalBusiness`, `FAQPage`.
- `robots.txt`, `sitemap.xml`, favicony + manifest.

**Dostępność (WCAG 2.1 AA)**
- Kontrast min. 4.5:1, focus zawsze widoczny, skip link.
- Obsługa klawiaturą: menu, akordeony, modal cookies (focus trap + Esc), formularz.
- `alt` dla obrazów, `aria-label` dla ikon-przycisków, `aria-live` dla komunikatów formularza.
- Cele dotykowe min. 44–48px, `prefers-reduced-motion`.

**Wydajność**
- Obrazy: AVIF/WebP, `srcset`/`sizes`, `loading="lazy"` poza hero, jawne `width/height` (brak CLS).
- Fonty: preload 2 plików woff2, subset latin-ext (polskie znaki).
- JS z `defer`, mapa i wideo ładowane leniwie.
- Cel: Lighthouse ≥ 95 we wszystkich kategoriach.

**Responsywność — breakpointy**
- 360px (mały telefon) · 430px (duży telefon) · 768px (tablet) · 1024px · 1440px+ (szeroki monitor).
- Mobile-first, `clamp()` dla typografii, siatki `grid` z `auto-fit`, `overflow-wrap: anywhere` na długich nagłówkach, test braku poziomego scrolla.

---

## 6. To-do list

### Etap 1 — Fundament
- [ ] Struktura folderów i pustych plików
- [ ] `styles.css`: tokeny (kolory, typografia, spacing, promienie), reset, kontener, siatka
- [ ] Komponenty: przyciski (primary/secondary/ghost + stany), karty, badge, pola formularza
- [ ] Fonty self-hosted + preload

### Etap 2 — Sekcje `index.html`
- [ ] Header + nawigacja desktop + menu mobilne + skip link
- [ ] Hero z CTA i paskiem liczb
- [ ] Jak to działa (kroki)
- [ ] Nasze stacje
- [ ] Wideo full-width (WebM + MP4 + poster, przycisk pauzy)
- [ ] Płatności
- [ ] Mapa z lokalizacjami + lista + `locations.json`
- [ ] Zwrot powerbanka + mini-FAQ
- [ ] Cennik
- [ ] Support / FAQ
- [ ] Masz biznes? — formularz
- [ ] Footer z kolumnami, danymi kontaktowymi i znakiem POWERNAP

### Etap 3 — Interakcje (JS)
- [ ] Płynne przewijanie z offsetem pod sticky header + aktywny link w menu
- [ ] Animacje pojawiania się sekcji (IntersectionObserver)
- [ ] Leniwe wideo (play/pause w viewport, reduced motion)
- [ ] Leniwa mapa Leaflet
- [ ] Walidacja formularza + stany: błąd pola, wysyłanie, błąd serwera, sukces → `dziekujemy.html`
- [ ] Baner cookies + modal ustawień + ponowne otwarcie ze stopki

### Etap 4 — Podstrony i prawne
- [ ] `dziekujemy.html`
- [ ] `polityka-prywatnosci.html`
- [ ] `regulamin.html`
- [ ] `404.html`

### Etap 5 — SEO i optymalizacja
- [ ] Meta tagi, OG, canonical, JSON-LD
- [ ] `robots.txt`, `sitemap.xml`, favicony, manifest
- [ ] Optymalizacja obrazów i wideo (instrukcja ffmpeg dla własnego materiału)

### Etap 6 — Testy
- [ ] Widoki 360 / 430 / 768 / 1024 / 1440 / 1920 — brak poziomego scrolla, nic nie ucięte
- [ ] Nawigacja samą klawiaturą + czytnik ekranu (NVDA)
- [ ] Walidacja formularza — wszystkie ścieżki błędów
- [ ] Lighthouse (Performance, Accessibility, Best Practices, SEO)
- [ ] Chrome, Firefox, Safari (iOS), Edge

---

## 7. Do ustalenia z Tobą

1. **Wysyłka formularza** — Formspree / Web3Forms (darmowe, bez backendu) czy własny serwer (PHP/Node)?
2. **Treści i dane** — prawdziwe ceny, miasta i lokalizacje stacji, dane firmy (adres, NIP, telefon, e-mail). Na start użyję realistycznych placeholderów.
3. **Materiały** — czy masz zdjęcia stacji i wideo? Jeśli nie: placeholdery (np. stockowe wideo + grafiki SVG stacji).
4. **Język** — tylko polski, czy też wersja EN?
5. **Analityka** — czy podpinamy Google Analytics / Plausible (wpływa na baner cookies)?
