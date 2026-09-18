# GDG Pisa's public website 🌎

[![License](https://img.shields.io/badge/license-MIT%20License-brightgreen.svg)](https://opensource.org/licenses/MIT)

Welcome to the Google Developer Group Pisa public website 🚀 Built with [Astro](https://astro.build/) — fast, mobile-first, and easy to run locally with just Node.js (no Ruby, no gems 🙌).

The website is publicly available at **[https://gdgpisa.it/](https://gdgpisa.it/)**.

Feel free to fork ⸑ or star ⭐️ this repo! Contributions are really appreciated — have a look at the [Contributing Guidelines](.github/CONTRIBUTING.md) or at our [Issues](https://github.com/gdgpisa/gdgpisa.github.io/issues).

**Don't know where to start?** 🤔 Have a look at our [**help wanted**](https://github.com/gdgpisa/gdgpisa.github.io/issues?q=is%3Aissue+is%3Aopen+label%3A%22help+wanted%22) or [**good first issue**](https://github.com/gdgpisa/gdgpisa.github.io/issues?q=is%3Aissue+is%3Aopen+label%3A%22good+first+issue%22) tickets.

## Features ✨

- ⚡ **Astro** — ships (almost) zero JS by default, fast builds, npm/Vite dev server
- 📱 **Mobile-first, single-page-first** — most content lives on the homepage, so there's no nav to duplicate or keep in sync
- 🎈 Header shrinks into a floating pill on scroll
- 🌗 **Light & dark theme** — follows system preference, with a manual toggle
- 🔴 **Live "next event" widget** — pulls the upcoming event straight from [gdg.community.dev](https://gdg.community.dev/gdg-pisa/), no manual updates needed
- 🎪 **DevFest Pisa** callout linking to [devfest.gdgpisa.it](https://devfest.gdgpisa.it/)
- 🅰️ **Google's Product Sans** as the site's typeface
- 🧩 Real icon libraries — Google's **Material Symbols** for UI icons, **Material Design Icons** for social/brand marks
- ♿ **WCAG AA** color contrast across light and dark themes

## Getting started 🛠

You only need [Node.js](https://nodejs.org/) 22+ — no Ruby, no Bundler, no gems.

```bash
git clone https://github.com/gdgpisa/gdgpisa.github.io.git
cd gdgpisa.github.io
npm install
npm run dev
```

The site will be available at **http://localhost:4321/** with hot reload. 🔥

### 🐳 Docker, if you'd rather not install Node locally

```bash
docker build -t gdgpisa-site .
docker run --rm -p 4321:4321 gdgpisa-site
```

### Useful scripts 📜

| Command | What it does |
|---|---|
| `npm run dev` | Start the local dev server with hot reload |
| `npm run build` | Build the production site into `dist/` |
| `npm run preview` | Preview the production build locally |
| `npm run check` | Type-check the whole project |
| `npm run test:unit` | Run Vitest unit tests |
| `npm run test:e2e` | Run Playwright end-to-end tests |

## Project structure 🗺

```
src/
├── content/            📄 structured data (heroes.json)
├── content.config.ts   🔗 Astro content collections + Zod schemas
├── data/               🧭 navigation & social links (TypeScript)
├── lib/                🧠 pure logic: date formatting, live event fetch, chapter stats
├── layouts/            🏗️ page shells (BaseLayout, PageLayout)
├── components/         🧩 Header, HeroCard, UpcomingEvent, Icon, BrandIcon, ...
├── scripts/            🖱️ small client-side islands (theme toggle logic)
├── styles/             🎨 design tokens, fonts, resets, global styles
└── pages/              📑 routes (home, heroes, redirects, 404)
public/
├── fonts/product-sans/ 🅰️ self-hosted Product Sans font files
└── static/img/         🖼️ every image the site actually uses
```

- **Heroes** (`/heroes/`) — the Hall of Fame, sourced from `src/content/heroes/heroes.json`. Not in the nav (the homepage already shows the whole team) but linked from there and still a real page. Add someone new by adding an entry there (and their photo in `public/static/img/heroes/`); set `"visible": false` to hide someone without deleting their record.
- **Prossimo evento** — the homepage widget fetches live data from the (unofficial, public) community.dev API for chapter `854` — see `src/lib/community-event.ts`. It always has a graceful fallback if that call fails.
- **Chapter stats** — the "Cosa è un GDG" world/Italy chapter-count boxes are fetched at build time from community.dev's chapter sitemap — see `src/lib/chapter-stats.ts`. Falls back to a static value if the fetch fails.
- **Icons** — `Icon.astro` wraps Google's Material Symbols (generic UI icons); `BrandIcon.astro` wraps Material Design Icons (mdi, via Iconify) for social/brand marks, with the real brand color by default or `monochrome` to match surrounding text.

## Contributing 🤝

Feel free to contribute to this project! Have a look at our [Contribution guidelines](.github/CONTRIBUTING.md) if you're not sure how to proceed.

Open an [issue](https://github.com/gdgpisa/gdgpisa.github.io/issues/new) or submit a [pull request](https://github.com/gdgpisa/gdgpisa.github.io/pulls) ❤️ — see [CHANGELOG.md](CHANGELOG.md) for what's already shipped and [TODO.md](TODO.md) for what's still open.

## License 📄

This project is licensed under the MIT License — see the [LICENSE](LICENSE) file for details.
