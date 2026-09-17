# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

Jekyll static site for GDG Pisa (gdgpisa.it), hosted on GitHub Pages. Material Design theme (based on hcz-jekyll-blog / Bootstrap Material Design), PWA-enabled via Workbox.

## Commands

Build/serve locally (Ruby + Bundler required):

```bash
bundle install          # install gems (first time / after Gemfile change)
bundle exec jekyll serve # serve at http://127.0.0.1:4000 with auto-regenerate
```

Docker alternative:

```bash
docker run --rm -it -p 4000:4000 -v "$PWD":/srv/jekyll jekyll/jekyll jekyll serve
```

No test suite, linter, or JS/CSS build step exists in this repo — verification is "does it build and render correctly locally."

### Updating the Service Worker

After changing cached assets, regenerate `sw.js` with [Workbox CLI](https://developers.google.com/web/tools/workbox/modules/workbox-cli):

```bash
workbox generateSW static/js/workbox-config.js
```

If generation errors about invalid config, remove the `ignoreURLParametersMatching` key from `static/js/workbox-config.js`.

## Architecture

- `_config.yml` — Jekyll site config (title, url, analytics, pagination, Workbox precache settings, plugin list).
- `_data/*.json` — structured content consumed by page layouts, not Markdown:
  - `projects.json` → `/projects` page (rendered via `_layouts/project.html`)
  - `heroes.json` → `/heroes` page (rendered via `_layouts/heroes.html`)
  - `social.json` → social icon buttons
  - `urls.json` → navigation bar entries
- `_layouts/default.html` is the base layout every other layout extends (header + main + footer wrapper). `page.html`, `post.html`, `posts_by_category.html`, `project.html`, `heroes.html` each add structure on top of it for their content type.
- `_includes/` holds the actual HTML fragments used by layouts (`header.html`, `footer.html`, `main.html`, `navigation.html`, `meta.html`, `css.html`, `js.html`, `analytics.html`, `social_links.html`, `share-page.html`, plus tag partials `project_tags.html` / `heroes_tags.html`). When changing a layout, check which includes it pulls in.
- `_posts/` — blog posts, one file per post, filename pattern `YYYY-MM-DD-slug.md`. Front matter:
  ```yaml
  ---
  layout: post
  title: <TITLE>
  date: <YYYY-MM-DD HH:MM:SS>
  categories: <space separated categories>
  ---
  ```
  Every category used must have a matching file under `category/` or the category page will 404.
- `category/` — one file per taxonomy category; required for each category referenced by a post.
- Root `.md` files (`about.md`, `projects.md`, `heroes.md`, `feedbackform.md`, etc.) are standalone pages driven by front matter (`layout`, `permalink`) rather than a generated collection.
- `feedbackform.md` is a redirect-only page (`redirect_to:` front matter) behind the `bit.ly/gdgfback` shortlink used on printed/event materials — update the `redirect_to` value here to repoint it, not the shortlink itself.
- `static/css` — Bootstrap Material Design + `main.css` + `.scss` partials (files starting with `---` front matter get compiled by Jekyll into `static/css/_site`).
- `static/js` — vendored JS libraries plus site-specific scripts (`main.js`, `projects.js`, `super-search.js`, `ui-scripts.js`, `workbox-config.js`).
- `sw.js` / `sw.js.map` / `workbox-*.js` — generated Workbox service worker artifacts; do not hand-edit `sw.js`, regenerate it (see Commands above).
- `manifests/`, `manifest.webapp` — PWA manifest files.

## Notes

- File naming across the repo mixes `-` and `_` (known inconsistency, not yet cleaned up) — match the convention of the specific directory you're editing rather than introducing a third style.
- This is a public open-source community site; PRs are expected to build locally before submission and to avoid unrelated diff noise (see `.github/CONTRIBUTING.md`).
