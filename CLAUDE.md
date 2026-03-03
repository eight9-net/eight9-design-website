# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Repository Structure

This is a monorepo with two top-level directories:

- `web/` — Vue 3 single-page application (the Eight9 Design Network marketing website)
- `lambda/` — AWS Lambda function for the contact form email backend

## Web App Commands

All commands run from the `web/` directory:

```bash
npm run dev      # Start dev server on 0.0.0.0:5027 with HMR
npm run build    # Production build (output to web/dist/)
npm run preview  # Preview the production build locally
```

There are no tests or linting scripts configured.

## Architecture

### Web (`web/`)

Vue 3 + Vite SPA. New components use Composition API with `<script setup>`; older components still use Options API — both coexist. Key stack:

- **Tailwind CSS v4** + **DaisyUI v5** — configured via `@tailwindcss/vite` in `vite.config.js`; CSS entry point is `src/style.scss` which uses `@use "tailwindcss"` and `@plugin "daisyui"` with the `business` theme
- **Brand colours** — defined in `src/style.scss` via `@plugin "daisyui/theme"`; primary is cyan (#00d4ff), secondary is blue (#0077ff), accent is steel-blue (#00aaff), base colours are dark navy (#0a0f1e–#0d1a2e)
- **CSS utilities** — `fixed-bg` (parallax background attachment), `logo-bg` (diagonal navy gradient), `scroll-target` (−132 px anchor offset for sticky header), `.headline` (Noto Serif Georgian font)
- **Font** — "Noto Serif Georgian" (Google Fonts) applied via `.headline` class
- **Pinia** for state (`src/stores/`) — `contact.js` holds the contact form store (`useContactStore`)
- **Vue Router** (`src/router/index.js`) — uses hash history (`createWebHashHistory`); routes are nested under `MainLayout`; routes: `/` → `LandingView`, `/services` → `Services.vue`, `/sample` → `Sample.vue` (dev reference page)
- **Font Awesome v7** — icons registered globally in `src/main.js` and used as `<font-awesome-icon :icon="['fas', 'icon-name']" />`; the full list of registered icons is in `main.js`
- **VueUse** — used for `vElementHover` directive in `DropdownMenu.vue`
- **Axios** — wrapped in `src/https.js`, which handles error logging and exports named API methods

#### App layout

`App.vue` is a bare `<router-view />` wrapper. Layout lives in `src/layouts/MainLayout.vue`, which composes `SiteHeader` + `<router-view>` + `SiteFooter`. All routes are children of `MainLayout`.

#### Global components & properties

Registered in `src/main.js`:
- **Global components**: `ContentLeftSection`, `ContentRightSection`, `ContentFullSection`, `ContactButton` — usable in any template without importing
- **`siteProperties`** — injected via `app.provide('siteProperties', ...)` and `app.config.globalProperties.siteProperties`; contains `companyName`, `companyNameShort`, `contactEmail`, `contactPhone`, `contactPhoneFormatted`, `companyAddress`

#### Content section components

`ContentLeftSection` and `ContentRightSection` render a two-column layout (text + background image). `ContentFullSection` renders full-width content over a fixed/parallax background image. All three are globally registered and accept these core props:

- `name` (String, required) — used as CSS class prefix for the section
- `id` (String, required) — scroll anchor target id
- `image` (String, required) — filename resolved from `/images/` via `useGetImageUrl`
- `title` (String, required), `preTitle` (String, optional)
- `button` (Boolean, default true), `buttonText` (String), `buttonRoute` (Object, default `{ name: 'home', hash: '#ContactUs' }`)
- `bgClasses` (String) — background position/size classes; `ContentFullSection` defaults to `'fixed-bg'`

`ContentFullSection` also accepts `contentClasses`, `backdropClasses`, `containerClasses`, `sectionClasses`, `titleClasses` for fine-grained style control.

#### Other components (manual import required)

- **`Gallery`** — image grid with lightbox modal; props: `images` (Array of `{ src, alt, url? }`), `cols` (String default `'2'`), `labels` (Boolean). Items with a `url` open in a new tab instead of the lightbox.
- **`Carousel`** — fade-transition carousel; props: `slides` (Array of `{ image, label, title, overlay? }`), `autoplay` (Boolean), `interval` (Number ms), `height` (String Tailwind class), `imageClasses` (String)
- **`LandingBox`** — DaisyUI card for a service category; prop: `cat` (Object with `icon`, `title`, `items[]`); shows up to 5 items with a "Show More" toggle
- **`DropdownMenu`** — hover-activated DaisyUI `<details>` dropdown used in the navbar; uses `vElementHover` from VueUse

#### Composables (`src/composables/utils.js`)

- `useGetImageUrl(file)` — resolves `/images/` paths via Vite's `import.meta.url`
- `useGetFileUrl(file)` — resolves `/files/` paths the same way
- `useFormatPhone(str)` — formats a raw phone string for display

#### Mobile nav

`SiteHeader.vue` uses DaisyUI's `<details>`/`<summary>` dropdown pattern for mobile. `isOpen` ref tracks toggle state to swap the hamburger/close icon. `NavigationMenu` is used for both mobile dropdown and desktop navbar.

### Lambda (`lambda/`)

`contactLambda.js` is an AWS Lambda handler (Node.js) deployed to API Gateway at:
```
https://nmesql59ql.execute-api.us-west-1.amazonaws.com/contactLambda
```

It uses AWS SES (`us-west-1`) to send contact form emails. It supports multiple client apps via the `app_key` field in the POST body (`eight9`, `awcs`, `mam`, `atlas`, `scada`). Spam protection uses a honeypot field — any submission with a non-empty `honeypot` value is silently discarded.

The Lambda has no `package.json`; the AWS SDK (`@aws-sdk/client-ses`) is provided by the Lambda runtime environment.

### Contact Form Flow

`ContactSection.vue` → `useContactStore` action `doSendContactForm` → `https.js` `sendContactForm` → POST to Lambda → SES email.

The form POSTs JSON with `app_key: 'eight9'` hardcoded in `https.js`. Optional extra fields (`address`, `company`, `title`, etc.) are appended to the email body if present in the Lambda payload.
