# TODO 🧭

Open items now that the Astro site is live on gdgpisa.it.

## 🚢 CI
- [ ] `.github/workflows/ci.yml` — `astro check` + build + Vitest + Playwright on every PR (deploy already runs unit tests + build on `main`)

## 🎨 Design polish
- [ ] Real favicon set (apple-touch-icon, PNG sizes) beyond the current SVG-only favicon

## 🔗 Broken links
- [ ] `/gassistant` points to `assistant.google.com/services/a/uid/00000087670de15f`, which 404s on Google's own server — Google discontinued Conversational Actions in June 2023, so this link is permanently dead. Decide: drop the redirect, or point it somewhere else

## 📈 Later / nice to have
- [ ] Analytics: Universal Analytics is dead since July 2024 and was intentionally **not** replaced — decide on GA4 vs. a privacy-friendly option (Plausible/Umami) if tracking is wanted again
- [ ] Submit `https://gdgpisa.it/sitemap-index.xml` to Google Search Console (the old `/sitemap.xml` was a mislabeled RSS feed)
- [ ] Delete `public/sw.js` (kill switch for the old Jekyll service worker) around mid-2027, once returning visitors have picked it up
- [ ] If a real Instagram feed (not just a link-out) is ever wanted, it needs a Meta Developer app + long-lived Instagram Business/Graph API token

## 🔁 Recurring
- [ ] Once a year: update the hand-written DevFest homepage section (date, theme, last year's stats) — `devfest.gdgpisa.it` has no public API
- [ ] When a new Italian GDG chapter appears, add its slug to `KNOWN_ITALIAN_CHAPTER_SLUGS` in `src/lib/chapter-stats.ts` (regular chapter slugs carry no country field, so the Italy count can't be fully automatic)

## ⚠️ Before touching GitHub Pages settings
Switching the Pages source (or similar) can clear the custom domain. `gdgpisa.it` is now a **verified domain on the gdgpisa org** (TXT `_github-pages-challenge-gdgpisa` on the Seeweb DNS) — keep that record, and re-check Settings → Pages → Custom domain right after any change.
