# fonts/ — Fonts

This website loads its fonts from **Google Fonts** (CDN) for speed:

- **Poppins** (300–700) — body text & UI
- **Amiri** (400, 700) — Islamic-style headings & brand text

Fonts are linked in the `<head>` of every HTML page:

```html
<link href="https://fonts.googleapis.com/css2?family=Amiri:wght@400;700&family=Poppins:wght@300;400;500;600;700&display=swap" rel="stylesheet">
```

### Self-hosting (optional, for fully offline / GDPR-strict hosting)

1. Download the two font families from Google Fonts (or fonts.google.com → download).
2. Place the `.woff2` files in this `fonts/` folder.
3. Update `css/style.css` `@font-face` declarations and the `<link>` tags in each HTML page.
