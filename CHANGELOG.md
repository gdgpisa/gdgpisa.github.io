# Changelog 📝

All notable changes to this project are documented here.

## [Unreleased] — 2026-09-18 🚀 The Astro rewrite

The entire site was rebuilt from scratch, from Jekyll/Ruby to **Astro** — same community, much lighter stack, more modern look. 🎉

### ✨ Added
- 🏗️ Full Astro project (npm/Vite, Node 22, zero Ruby/gems)
- 🌗 Light/dark theme with manual toggle + `prefers-color-scheme` fallback, persisted per browser
- 🎈 Header shrinks into a floating rounded pill on scroll (thick border + hard shadow), inspired by devfest.gdgpisa.it's nav
- 🔴 **Live "prossimo evento" widget** on the homepage, fetching the next GDG Pisa event straight from `gdg.community.dev` (build-time snapshot + client-side refresh, graceful fallback if the call fails)
- 🎪 **DevFest Pisa** section on the homepage — this year's edition, date, theme, and last year's numbers, linking out to `devfest.gdgpisa.it`
- 🅰️ Self-hosted **Product Sans** as the site's typeface (regular/bold/italic/bold-italic)
- 🎨 New design system: CSS custom-property tokens, a bold "sticker card" style (thick outline + hard offset shadow) inspired by Hacktoberfest and devfest.gdgpisa.it, using the 4-color Google palette as accents — including a pastel tinted-panel background per homepage section, so each reads as its own zone
- 🖼️ Modern gradient-mesh hero (soft blurred color blobs + grain texture) with two call-to-action buttons, replacing the old photo-banner hero
- 👥 "Il nostro team" section on the homepage — **every** visible Hero, centered, forced into exactly 2 rows on wide viewports, with a lift+shadow hover on each photo
- 🧩 Real icon libraries throughout: **Material Symbols** (Google's own) for UI icons, **Material Design Icons (mdi)** via Iconify for social/brand marks — matching the icon set used on `links.gdgpisa.it`. Brand icons render in their official color where shown solo, monochrome where grouped with UI icons
- 📸 "Seguici sui nostri canali" section pointing at `links.gdgpisa.it` (the community's link-in-bio), replacing the old "Join us" cards
- 🌍 "Cosa è un GDG" now has a real photo (GDG Pisa business cards) and two stat boxes — world/Italy chapter counts, **fetched live at build time** from `gdg.community.dev`'s own chapter sitemap (`src/lib/chapter-stats.ts`), rounded down to the nearest 5 and shown as "X+"
- 🎙️ Icons on every button instead of a trailing "→": mic for "Proponi il tuo evento", calendar for "I nostri eventi", diversity_3 for "Unisciti alla community", group for "Vedi tutto il team", arrow_back for the Heroes page's "Torna alla home"
- 🔗 Header (both normal and scrolled-pill states) links to `devfest.gdgpisa.it` and `links.gdgpisa.it`
- ♿ WCAG **AA** color contrast audit across every text/background pair, in both themes (new `--color-link` and dark-mode role-badge tokens specifically for this)
- 🐳 `Dockerfile` for a zero-install local dev loop (build + run verified)
- 🧪 **Tests written**: Vitest unit tests for `dates.ts`/`community-event.ts` (9 tests), Playwright e2e for the upcoming-event widget, header scroll-shrink, theme toggle persistence, and all three redirects (7 tests) — all passing
- 📄 This changelog, a `TODO.md`, and a rewritten `README.md` / `CLAUDE.md`

### 🔄 Changed
- `_data/*.json` → `src/content/*` (Astro content collections, Zod-validated) and `src/data/*.ts`
- Heroes "hide without deleting" (`visible: false`) behavior carried over 1:1
- Twitter removed everywhere (site social icons + Heroes cards) — the community no longer uses it
- Heroes list sorted by surname, **all** shown both on `/heroes/` and (as a photo grid) on the homepage — no more tag filter, see Removed
- Social/channel links realigned with the canonical list at `links.gdgpisa.it` (fixed the Facebook slug, added YouTube and Meetup to the footer)
- GDG community.dev is represented by the `</>` code-brackets icon (mdi `code-tags`), not a raster logo image
- Logo lockup (icon + "GDG Pisa" wordmark) now the official vector artwork, used in the header, hero, and favicon
- **Nav simplified to just Home** — with the whole team, DevFest, and every channel already on the homepage, a multi-item nav had nothing left to point at. Heroes has a "← Torna alla home" link since it's no longer reachable from any menu

### 🗑️ Removed
- The whole blog (`_posts/`, `blog/`, `category/`, RSS feed) — no longer maintained, old post URLs now 404
- **Seminari** (`/projects/`) — the hand-maintained event archive page, component, data, and its ~46 images. Replaced by a live link to the community's channels instead of a static list that needed manual upkeep
- The Heroes/Seminari tag-filter (chips + Reset button) — simplified to a plain grid, no filtering UI
- **The mobile bottom nav bar** — once Seminari and Hall of Fame left the nav, it only had "Home" and a dead-end "Altro" button pointing nowhere; removed along with its component, CSS, and reserved body padding
- **The WTM page** (`/wtm/`) and its images — content, nav entry, and photos all removed
- PWA/offline caching (`sw.js`, Workbox, `manifest.webapp`) — already broken/stale since 2021
- OneSignal push notification leftovers — the integration itself was removed back in 2021
- `io16/` — a 2016 conference talk's slide deck, dead weight, never linked from the site
- `badge.md`, the old site search (`super-search.js`), and the entire jQuery/Bootstrap 3/Font Awesome CDN stack
- ~90 unused/duplicate images found during the migration audit
- Jekyll itself: `Gemfile`, `_config.yml`, `_layouts/`, `_includes/`, and friends

### 🐛 Fixed
- Desktop top nav was permanently `display: none` — a base CSS rule was declared *after* the media query meant to show it, so it always won the cascade
- Theme toggle's sun/moon icon didn't account for system dark-mode preference when no explicit choice was stored, so it could show the wrong icon for the actually-active theme
- No global icon sizing rule existed, so several icons (theme toggle, footer social row) rendered at their raw source size (up to 300×150) instead of a sane fixed size
- `ProjectCard.astro` pointed at the wrong image folder (before Seminari was removed entirely)
- Team photo grid didn't re-center its ragged last row (CSS grid limitation) — switched to flexbox, which does
