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

## Deploy (Docker → GHCR → Coolify)

Every push to `main` runs `.github/workflows/deploy.yml`:

1. **build** — builds the `Dockerfile` (nginx:alpine serving the static files) and pushes
   `ghcr.io/mkayzw/tobby-diesel:latest` and `:<commit-sha>`.
2. **deploy** — calls Coolify's API to redeploy every resource tagged `tobby-diesel`.

One-time setup:

- Repo **Settings → Secrets and variables → Actions**:
  - secret `COOLIFY_TOKEN` (Coolify API token)
  - variable `COOLIFY_URL` (e.g. `https://coolify.example.com`, no trailing slash)
- In Coolify: create a **Docker Image** resource using `ghcr.io/mkayzw/tobby-diesel:latest`,
  port **80**, give it the tag **`tobby-diesel`**, and attach the domain.
- If the GHCR package is private, give Coolify registry credentials, or make the package public.

Test the container locally:

```bash
docker build -t tobby-diesel . && docker run --rm -p 8080:80 tobby-diesel
# open http://localhost:8080
```
