# TODO 🧭

Open items after the Jekyll → Astro rewrite. Roughly in the order they'd make sense to tackle.

## 🧪 Testing
- [ ] Vitest unit tests for `src/lib/dates.ts` and `src/lib/community-event.ts` (mocked fetch: success / empty / network error)
- [ ] Playwright e2e: home renders the upcoming-event widget (mock the community.dev API route so CI never depends on the live external service)
- [ ] Playwright e2e: header shrinks into a pill after scrolling (`body.scrolled` toggled, computed style actually changes)
- [ ] Playwright e2e: light/dark theme toggle actually flips `data-theme` and persists across reload
- [ ] Playwright e2e: `/telegram`, `/feedbackform`, `/gassistant` redirects land on the right URL

## 🚢 CI/CD
- [ ] `.github/workflows/ci.yml` — lint/type-check (`astro check`) + build + Vitest + Playwright on every PR
- [ ] `.github/workflows/deploy.yml` — build + `actions/deploy-pages` on push to `main`
- [ ] ⚠️ **Needs explicit go-ahead before flipping the switch**: change GitHub Pages source from "Deploy from a branch" (legacy Jekyll build) to "GitHub Actions", once `deploy.yml` has a proven green run
- [ ] Re-check the custom domain (`gdgpisa.it`) and HTTPS cert survive the Pages source switch

## 🎨 Design polish
- [ ] Real favicon set (apple-touch-icon, PNG sizes) beyond the current SVG-only favicon
- [ ] Optional: winter snow easter egg (`static/js/winter.js` in the old repo) ported as a small seasonal script, if wanted

## 📈 Later / nice to have
- [ ] Analytics: Universal Analytics is dead since July 2024 and was intentionally **not** replaced yet — decide on GA4 vs. a privacy-friendly option (Plausible/Umami) if tracking is wanted again
- [ ] Consider a real sitemap submission to Google Search Console after deploy (the old `/sitemap.xml` was actually a mislabeled RSS feed, now replaced by a proper `@astrojs/sitemap` output at a different path)
- [ ] `.jekyll-cache/` and `_site/` on disk are root-owned leftovers from the old Docker-based Jekyll workflow — harmless (gitignored) but worth `sudo rm -rf .jekyll-cache _site` when convenient
- [ ] `.github/CONTRIBUTING.md` and issue/PR templates still describe the old Jekyll workflow — worth a pass once the new stack settles
- [ ] If a real Instagram feed (not just a link-out) is ever wanted, it needs a Meta Developer app + long-lived Instagram Business/Graph API token — can't be wired up without those credentials
- [ ] The DevFest homepage section (date, theme, last year's stats) is hand-written, not live-fetched — `devfest.gdgpisa.it` is a static site with no public API (unlike community.dev). Update it once a year when the new edition's details are known
