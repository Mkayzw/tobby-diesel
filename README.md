# Tobby Diesels Zimbabwe — website

Static marketing site for Tobby Diesels (ECU repair, common rail testing, key coding, diesel service — Kwekwe, Midlands).

No framework, no build step: plain HTML, CSS and a small vanilla JS file. Any static host can serve it.

## Structure

```text
index.html          page content + SEO meta + schema.org LocalBusiness data
styles.css          design tokens (top of file), layout, components, responsive rules
script.js           mobile menu, scroll reveal, before/after slider, quote form → WhatsApp
assets/favicon.svg
assets/img/         photos cropped from the business's posters
```

## Editing common things

- **Phone / WhatsApp number** — search `263784747570` (appears in `index.html` and `script.js`).
- **Prices** — search `$30`, `$150`, `$1,000` and `$3,000` in `index.html`.
- **Colours** — change the variables in `:root` at the top of `styles.css`.

## The quote form

There is no backend. On submit, `script.js` builds a message and opens
`https://wa.me/263784747570?text=...`, so the customer sends it from their own WhatsApp.
Nothing is stored on the site.

## Run locally

```bash
python3 -m http.server 8000
# open http://localhost:8000
```

## Deploy

**GitHub Pages:** push to GitHub → repo *Settings → Pages* → Source: *Deploy from a branch* → `main` / root. Live at `https://<user>.github.io/<repo>/` in about a minute.

**Netlify / Cloudflare Pages / Vercel:** import the repo, leave the build command empty, publish directory `/`.

A custom domain (e.g. `tobbydiesels.co.zw`) can be pointed at any of these from the host's domain settings.
