# 📻 Tamil Islamic Voice — Live Islamic Radio Website

A modern, responsive, premium-quality radio station website for **Tamil Islamic Voice**.
Built with **HTML5, CSS3, JavaScript, Bootstrap 5** — PHP/MySQL optional — featuring a
beautiful Islamic-themed design in **green, white and gold**, autoplay live streaming with
browser fallback, PWA offline support and full SEO optimisation.

> **Tagline:** *Listen to Islamic Knowledge Anywhere, Anytime*

---

## ✨ Features

### Radio Player
- 🔴 **Autoplay** main live stream on page load
- 👆 **"Tap to Listen Live"** big-button fallback when the browser blocks autoplay
- ▶️ / ⏸ Play & Pause (hero player + section player stay in sync)
- 🔊 Volume slider + mute button (preferences saved in localStorage)
- 🎚 Buffering / loading indicator
- 📊 Animated equalizer (bars dance only while playing)
- 🔴 Pulsing LIVE badge + "Now Playing Live" status
- 🚦 5 **sister stations** (Muslim Vaanoli, Hira FM, Bisme Radio, SLBC Muslim, Katugastota Muslim Radio) — switching stations automatically stops the previous stream

### Design & UX
- 🕌 Islamic-themed green / white / gold palette, arabesque pattern backgrounds
- 💎 Glassmorphism cards & sticky glass navbar
- 🌙 Dark / light mode toggle (persists, respects system preference)
- 📱 Fully responsive (Bootstrap 5 grid + custom breakpoints)
- 🎬 AOS scroll animations + native IntersectionObserver fallback
- ⏳ Branded loading screen
- 🧭 Floating buttons: WhatsApp · Scroll-to-top · Live radio
- ♿ Accessibility: skip links, ARIA labels, focus rings, `prefers-reduced-motion`

### Content
- 🎥 YouTube section — latest uploads from **Tamil Muslim TV** embedded via real channel ID
- 📖 About Us (mission, vision, values, programmes)
- 💌 Contact section — WhatsApp, email, address, form (opens WhatsApp/email pre-filled), Google Map of Trincomalee
- 🤲 Donate section (contact-based support — no online payment processing)
- 🗂 Separate pages: `about.html`, `contact.html`, `privacy.html` (incl. Terms)

### Technology
- 🚀 PWA ready — `manifest.json` + `service-worker.js` (offline app shell, cache-first assets)
- 🔍 SEO — meta/OG/Twitter tags, JSON-LD `RadioStation` schema, `robots.txt`, `sitemap.xml`
- ⚡ Performance — preconnects, lazy-loaded iframes/images, minified CDN deps, no jQuery
- ✅ W3C-valid semantic HTML, well-commented code, clean folder structure

---

## 📁 Folder Structure

```
Tamil-Islamic-Voice/
│
├── index.html            ← Main page (hero, player, stations, YouTube, about, donate, contact)
├── about.html            ← About Us page
├── contact.html          ← Contact page (form + map)
├── privacy.html          ← Privacy Policy + Terms of Use
│
├── css/
│   ├── style.css         ← Full design system (themes, glass, player, sections…)
│   └── responsive.css    ← Mobile/tablet breakpoints
│
├── js/
│   ├── player.js         ← Radio engine: autoplay, fallback, stations, volume, buffering
│   ├── app.js            ← UI: loader, theme, scrollspy, form, service worker
│   └── animation.js      ← AOS init + reveal fallback animations
│
├── images/               ← logo.png, hero-banner.png (generated brand assets)
├── icons/                ← favicon.svg
├── assets/               ← Extra resources (see assets/README.md)
├── fonts/                ← Self-hosted fonts (optional, see fonts/README.md)
│
├── manifest.json         ← PWA manifest
├── service-worker.js     ← Offline cache strategy
├── robots.txt            ← Search engine rules
├── sitemap.xml           ← XML sitemap
└── README.md             ← This file
```

---

## 🚀 Quick Start

### Option A — Any static host (fastest)
Upload the whole `Tamil-Islamic-Voice/` folder to any web hosting (Netlify, Vercel,
Cloudflare Pages, cPanel/File Manager, Hostinger, GitHub Pages…). No build step needed.

> ⚠️ The **service worker** (offline/PWA) only activates over `https://` or `localhost`.
> Opening `index.html` directly from disk works, but PWA features stay dormant.

### Option B — Local development (XAMPP / PHP)
```bash
# 1. Copy the folder into your web root, e.g.:
#    C:\xampp\htdocs\Tamil-Islamic-Voice
# 2. Start Apache, then visit:
http://localhost/Tamil-Islamic-Voice/
```

### Option C — With the optional PHP contact handler
The contact form currently opens WhatsApp / the visitor's email app with a pre-filled
message (zero backend, zero data stored — privacy-friendly). If you prefer server-side
mail, drop this into `contact.html`'s form action and create `send-mail.php`:

```php
<?php
// send-mail.php (optional PHP backend — requires a mail() capable host)
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $name    = htmlspecialchars($_POST['name'] ?? '');
    $email   = filter_var($_POST['email'] ?? '', FILTER_VALIDATE_EMAIL);
    $subject = htmlspecialchars($_POST['subject'] ?? '');
    $message = htmlspecialchars($_POST['message'] ?? '');

    $to      = 'tamilislamicvoice@gmail.com';
    $headers = "From: $email\r\nReply-To: $email\r\nContent-Type: text/plain; charset=UTF-8";
    $body    = "Name: $name\nEmail: $email\nSubject: $subject\n\n$message";

    if ($email && mail($to, "[TIV] $subject", $body, $headers)) {
        header('Location: contact.html?sent=1');
    } else {
        header('Location: contact.html?error=1');
    }
    exit;
}
```

MySQL is not required by this site; it would only be needed if you later add a
programme schedule, listener requests or a CMS (e.g. store data via a PHP API).

---

## 🎛 Customisation

### Change station / stream URLs
Open `js/player.js` and edit the config at the top:

```js
const MAIN_STREAM = 'https://stream.zeno.fm/v6mwdn1kcd0uv';
const STATIONS = [
  { name: 'Muslim Vaanoli', desc: '…', src: 'https://stream.muslimvanoli.com:1035/stream' },
  // …
];
```

### Change colours
All colours are CSS variables in `css/style.css` → section **01. Design tokens**.
The light theme is `:root`, the dark theme is `[data-theme="dark"]`.

### Update contact details
Search & replace across all HTML files: `94757374750`, `tamilislamicvoice@gmail.com`,
`Trincomalee`, and the WhatsApp `wa.me` links.

### Replace YouTube channel
`js/` does not hold the channel — it's in each HTML file's YouTube section. Replace the
embed `list=UC751kXgEpAI29cwsI5YTeHw` with your channel ID, and the
`@tamilmuslimtvchannel` / subscribe links with your own.

### Deploy checklist
- [ ] Replace `https://tamilislamicvoice.online/` with your real domain in every HTML
      page (canonical, OG tags, `robots.txt`, `sitemap.xml`)
- [ ] Update the `og:image` URLs to absolute URLs
- [ ] (Optional) Add `apple-touch-icon.png` (180×180) and proper 192/512 PWA icons
- [ ] Bump `CACHE_VERSION` in `service-worker.js` after every update
- [ ] Submit `sitemap.xml` in Google Search Console

---

## 🧰 Tech Stack

| Layer | Choice |
|-------|--------|
| Markup | HTML5 (semantic, W3C-valid) |
| Styling | CSS3 custom properties, glassmorphism, flexbox/grid |
| Framework | Bootstrap 5.3 (CDN) |
| Icons | Font Awesome 6 + Bootstrap Icons |
| Fonts | Google Fonts — Poppins & Amiri |
| Scripts | Vanilla JavaScript (no jQuery) |
| Animations | AOS 2.3.4 + CSS keyframes + IntersectionObserver |
| Streaming | HTML5 `<audio>` (Zeno.fm & partner streams) |
| PWA | Manifest + Service Worker (offline) |
| Backend | None required (PHP optional for contact mail) |

---

## 📄 Credits & Contact

- **Radio:** Tamil Islamic Voice — live at [stream.zeno.fm/v6mwdn1kcd0uv](https://stream.zeno.fm/v6mwdn1kcd0uv)
- **YouTube:** [Tamil Muslim TV](https://www.youtube.com/@tamilmuslimtvchannel)
- **WhatsApp:** +94 75 737 4750
- **Email:** tamilislamicvoice@gmail.com
- **Address:** Siraj Nagar, Thampalagamam, Trincomalee, Sri Lanka

---

Designed with ❤️ for the Ummah. *JazakAllahu Khairan for listening.*
