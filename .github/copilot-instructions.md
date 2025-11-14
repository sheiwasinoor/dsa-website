<!-- .github/copilot-instructions.md -->
Short, actionable guidance for AI coding agents working on this Nuxt 4 starter.

Overview
- Project type: Nuxt 4 application using Vue 3. Key entry is `app/app.vue` (global app shell).
- Build tooling: scripts in `package.json` use `nuxt` commands (`dev`, `build`, `generate`, `preview`).
- Postinstall: `postinstall` runs `nuxt prepare` to generate runtime types and internal imports — do not remove.

Quick commands
- Install deps: `npm install` (pnpm/yarn/bun also supported in README).
- Dev server: `npm run dev` (serves at `http://localhost:3000`).
- Build: `npm run build` and preview with `npm run preview`.
- Static generation: `npm run generate`.

Important files to inspect/edit
- `app/app.vue` — global app shell; currently renders `<NuxtRouteAnnouncer/>` and `<NuxtWelcome/>`.
- `nuxt.config.ts` — Nuxt configuration. Note `compatibilityDate` and `devtools.enabled` are set here.
- `package.json` — scripts and dependencies (`nuxt`, `vue`, `vue-router`).
- `tsconfig.json` — references several `./.nuxt/*.json` tsconfig fragments; `.nuxt` is generated output, avoid editing directly.
- `public/` — static assets served as-is (e.g., `public/robots.txt`).

Project-specific conventions & constraints (observable)
- The project is configured as an ES module package (`"type": "module"` in `package.json`).
- `nuxt prepare` is run after installs — TypeScript type generation and auto-imports depend on it. Always run package manager's install script before `dev`.
- `tsconfig.json` delegates to `.nuxt` tsconfigs. If editing TypeScript settings, prefer `nuxt.config.ts` or upstream tsconfig fragments rather than directly modifying `.nuxt`.
- `app/app.vue` is the app entrypoint — prefer making global layout changes there rather than editing generated layout files.

Patterns worth following (examples from repo)
- Global shell: `app/app.vue` contains only essential global components. Add global UI that must appear on every page here.
- Devtools enabled: `nuxt.config.ts` has `devtools: { enabled: true }`. Feature flags and dev-only modules may rely on this.

What to avoid
- Do not edit files in `.nuxt/` — they are generated and overwritten by builds.
- Avoid removing `postinstall: "nuxt prepare"` from `package.json` unless you know how to re-generate Nuxt auto-import/type artifacts.

How to approach typical tasks
- Add a page: create a file under `pages/` (or add route-composables) and run `npm run dev` — Nuxt will hot-reload.
- Change global behavior: edit `app/app.vue` or `nuxt.config.ts` and restart dev server if you change configuration values.
- Type errors: run `npm run dev` after `npm install`; check `.nuxt/tsconfig.*.json` for generated references.

Integration points & dependencies
- Main runtime deps: `nuxt`, `vue`, `vue-router`. Treat changes to these carefully — update `postinstall`/prepare steps as needed.
- No backend or external services are referenced in the repo files scanned. If adding integrations, note they will likely be configured via `nuxt.config.ts` or runtime environment variables.

If you make a change
- Run `npm install` (if dependencies changed) then `npm run dev` locally to verify.
- For config changes in `nuxt.config.ts`, restart the dev server to pick up changes.

When in doubt
- Inspect `app/app.vue`, `nuxt.config.ts`, and `package.json` first — they define the app shell, runtime configuration, and scripts.

If anything important is missing from this file (CI, environment usage, custom modules, or tests), ask the maintainers to add those artifacts so the guidance can be updated.

End of instructions — please ask for clarifications or to expand examples for a specific task.
