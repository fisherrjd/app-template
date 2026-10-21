# app-template

A personal starting point for web apps: Vue 3 + Vite + TypeScript, Tailwind v4,
shadcn-vue components and **Jade's theme** from
[`@fisherrjd/ui`](https://github.com/fisherrjd/ui): one look, recolored and
refonted per app in `vite.config.ts`. Clone it, rename it, delete what you
don't need.

**Stack:** Vue 3 · Vite · TypeScript · Tailwind v4 (`@tailwindcss/vite`, CSS-first) ·
shadcn-vue (reka-ui) · `@lucide/vue` icons · vue-sonner toasts · bun · nix devshell

## Start a new app from this

```sh
gh repo create myapp --template fisherrjd/app-template --public --clone
cd myapp
```

Or without a GitHub repo:

```sh
git clone https://github.com/fisherrjd/app-template myapp
cd myapp
rm -rf .git && git init
```

Rename checklist:

- [ ] `package.json` → `name`
- [ ] `default.nix` → `name = "..."`
- [ ] `index.html` → `<title>`
- [ ] `src/App.vue` → brand text in the sidebar and top bar
- [ ] `public/favicon.svg` → replace the placeholder mark
- [ ] `vite.config.ts` → `PORT` (one unique port per app; used by dev and preview)
- [ ] `vite.config.ts` → `ui({ … })`: this app's colors, fonts and style (find
      them in `/styleguide`'s theme lab)

Then:

```sh
direnv allow   # builds the nix devshell (bun + pog scripts)
dev            # installs deps if needed, starts vite on PORT (default :3000)
```

## Scripts

Pog scripts from the devshell (each has a `bun run` equivalent):

| script    | does                                  |
| --------- | ------------------------------------- |
| `dev`     | vite dev server (`bun run dev`)       |
| `build`   | typecheck + build to `./dist`         |
| `preview` | serve the production build            |
| `check`   | typecheck only (`bun run typecheck`)  |
| `ui-update` | pull the latest shared styles/components (`@fisherrjd/ui`) and typecheck |

The server binds `0.0.0.0` on `PORT` (set in `vite.config.ts`, default 3000)
for both dev and preview, with `allowedHosts: true` — so it's reachable as
`<host>:PORT` over tailscale from any machine.

## Shared UI: `@fisherrjd/ui`

The look every app shares lives in its own repo,
[fisherrjd/ui](https://github.com/fisherrjd/ui), installed as a git
dependency. It holds the theme engine (seed colors → every token), base
styles and utilities (`card-hover`, `md-prose`, `rise-in`, page transitions),
the shadcn-vue primitives, and the theme runtime (`useTheme`, `ThemeToggle`,
pre-paint, the theme lab).

**Change the theme once, every app picks it up:**

1. In `~/github/projects/ui`: `dev` opens its styleguide playground. Edit
   `styles/` or `src/components/ui/` and watch it repaint. Push to main.
2. In each app: `ui-update`, check it, commit `bun.lock`.

Apps only move when you run `ui-update` — `bun.lock` pins the exact commit,
so nothing changes under an app by surprise.

Imports:

```ts
import { Button } from '@fisherrjd/ui/button'          // any primitive: @fisherrjd/ui/<name>
import { THEME, ThemeToggle, useTheme } from '@fisherrjd/ui/theme'
import { cn } from '@/lib/utils'                         // re-exported from @fisherrjd/ui/utils
```

`src/assets/index.css` imports the shared stylesheet; app-only CSS goes below
it. Need a primitive to look different in one app only? Copy it into
`src/components/` and import that copy there, or pass a `class`.

## Theming

One structure (sidebar + top bar, mono numbers and labels), any colors and
fonts. Each app sets its look in `vite.config.ts`:

```ts
ui()                                                    // evergreen, line, dark
ui({ palette: 'gold', fonts: { heading: 'Cinzel' }, style: 'hud', radius: 0 })
ui({ palette: 'crimson', colors: { neutral: '#1a1c22' }, defaultMode: 'light' })
ui({ palette: 'evergreen', lockMode: true })            // pinned dark: no toggle
```

- **colors:** 4 seeds (primary, accent, neutral, danger). Every other color is
  derived for dark and light, with readable contrast built in. Start from a
  palette (evergreen, lime, crimson, ember, lagoon, cobalt, gold, synth,
  blueprint, dusk) and override any seed.
- **fonts:** heading, body, mono. Any Google Fonts family.
- **style:**
  - `line`: hairlines, flat.
  - `block`: 2px outlines, hard shadows.
  - `hud`: console panels, corner brackets, glow.

**Find a look:** run `dev` and open **`/styleguide`** (dev only, never in a build). Its theme lab repaints the whole app
live (palettes, color pickers, fonts, style, radius, mode) and prints the
`ui({ … })` line to paste back here.

In app code, use theme tokens rather than Tailwind palette colors:
`text-success`, `bg-warning`, `text-primary-text`, `bg-chart-3`, `font-heading`.
That way pattern components follow the app's colors. The full token list is
in the ui README.

## Pattern library

Two kinds of reusable components:

- **Shared, from `@fisherrjd/ui`:** used by every app, updated with
  `ui-update`, never copied.
  - `AppShell` and `PageHeader` (`@fisherrjd/ui/layout`): the sidebar + top
    bar frame and page titles.
  - `EmptyState`, `ErrorState`, `ConfirmDialog` (`@fisherrjd/ui/states`).
  - `StatCard`, `LinkTile`, `Panel`, `Pipeline`, `ActivityFeed`, `BarChart`,
    `ProgressMeter`, `Sparkline`, `UserAvatar` (`@fisherrjd/ui/dashboard`):
    the home dashboard at `/` is built from these.
  - The shadcn primitives.
- **Domain patterns, here:** copied with the template, kept only by apps
  that use them. Each folder has a styleguide section, and the example pages
  compose them. A pattern a second app needs belongs in the ui repo instead.

| folder                      | components                                                        | example page |
| --------------------------- | ----------------------------------------------------------------- | ------------ |
| `components/project/`       | KanbanBoard (touch drag & drop), StatusBadge, PullRequestItem, NotesPanel, FreshnessDot, SaveIndicator, Checklist | `/project` |
| `components/forms/`         | FormField, SettingsSection, TagInput                              | `/settings` |
| `components/data/`          | DataTable (sort/pagination/slots), SearchInput, FilterBar         | styleguide |
| `components/content/`       | MarkdownView (marked + DOMPurify, `.md-prose` tokens), ArticleCard, PostMeta | `/blog` |

Demo data stays in the views; components only take props/v-model, so they lift
straight into real apps. Kanban and notes persist to localStorage until a
backend replaces them. For a new app, delete the folders (and routes) you
don't need.

Note: `crypto.randomUUID` is unavailable over plain http (e.g. tailnet) — use
`uid()` from `src/lib/utils.ts` for client-side ids.

## The styleguide never ships

`/styleguide` (theme lab, swatches, pattern demos) is a workshop for `dev`
only. Its route (`src/router.ts`), nav link (`src/App.vue`) and the lab link in
Settings are all behind `import.meta.env.DEV`, so a production build doesn't
contain the page at all. Keep that pattern for anything else that's dev-only.

## Adding components

shadcn-vue primitives are added in the ui repo (`add <component>` there), so
every app gets them. Included set: button, card, input, textarea, label,
select, checkbox, switch, dialog, dropdown-menu, tabs, table, badge,
separator, skeleton, sonner, tooltip.

## Backend proxy

When the app grows an API, uncomment the `/api` proxy block in
`vite.config.ts` and point `VITE_BACKEND` at it.
