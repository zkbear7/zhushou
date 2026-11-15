# Repository Guidelines

## Project Structure & Module Organization

This repository is a static, single-page PWA deployed through GitHub Pages.

- `index.html`: Complete UI, inline CSS/JavaScript, schedule data, and application logic.
- `sw.js`: Service worker, offline cache, and release history. Keep `CACHE_NAME` synchronized with `index.html`.
- `manifest.json`: PWA metadata and icons.
- `README.md`: Feature overview and deployment instructions.
- `CLAUDE.md`: Detailed domain constraints, schedule history, and implementation notes.

There are no committed source, asset, or test subdirectories. Do not introduce a framework or bundler for a small change unless explicitly requested.

## Development & Validation

No package manager or build step is required. Preview the site over HTTP so service-worker behavior is representative:

```powershell
python -m http.server 8000
```

Open `http://localhost:8000`, then test navigation, today's schedule, task persistence, browser console output, and tablet-width rendering.

For every user-visible release:

1. Update the applicable date/schedule data in `index.html`.
2. Add a version comment and increment `CACHE_NAME` in `sw.js`.
3. Run `git diff --check`.
4. If present, run the workspace smoke checks:

```powershell
node F:/考研/_work/check_site_js.mjs
node F:/考研/_work/test_fanyi_panel.mjs
node F:/考研/_work/_v130_render_test.mjs
```

No committed automated test suite or coverage target currently exists. Treat the manual PWA smoke test as mandatory.

## Coding Style & Naming Conventions

Use two-space JavaScript indentation and match the surrounding HTML/CSS style. Keep schedule constants in `UPPER_SNAKE_CASE`, functions and variables in `camelCase`, and date keys as `YYYY-MM-DD`. Preserve concise Chinese UI copy. Centralize recurring dates and rules in existing data arrays or lookup objects instead of duplicating literals.

## Commit & Pull Request Guidelines

Commits follow `vNNN: concise summary`, for example `v189: deduplicate daily high math 880 choice review`. Stage `index.html` and `sw.js` together for releases. Pull requests should summarize behavior changes, list tested dates and day types, link relevant issues, and include before/after screenshots for layout changes.

## Agent-Specific Instructions

Read `CLAUDE.md` before editing schedules or study-plan rules. Preserve unrelated plan content, verify intervening empty or partial days, and report any intentionally deferred items.
