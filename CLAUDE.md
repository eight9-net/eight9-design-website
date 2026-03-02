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

Vue 3 + Vite SPA using the Options API (not Composition API). Key stack:
- **Tailwind CSS v4** + **DaisyUI v5** — configured via `@tailwindcss/vite` plugin in `vite.config.js`; CSS entry point is `src/assets/main.scss` which contains `@import "tailwindcss"`, `@plugin "daisyui"`, and the `@theme` block
- **Brand colour** — `--color-primary: #126f82` defined in `@theme` in `main.scss`; overrides DaisyUI's default primary so all `btn-primary`, `text-primary`, etc. use the teal brand colour
- **Vuex 4** for state (`src/store.js`) — holds site info and contact form actions
- **Vue Router 5** (`src/router/index.js`) — single route (`/`) pointing to `LandingView`
- **Font Awesome v7** — icons registered globally in `src/main.js` and used as `<font-awesome-icon :icon="['fas', 'icon-name']" />`
- **Axios** — wrapped in `src/http.js`, which handles error logging and exports named API methods

The app layout is `App.vue` → `SiteHeader` + `<router-view>` + `SiteFooter`. The single view is `LandingView`, which composes `LandingBox` (service cards) and `ContactSection` (contact form).

The `@` alias resolves to `src/`.

#### Mobile nav

Bootstrap's JS-based collapse was replaced with a Vue `isMenuOpen` boolean in `SiteHeader.vue`. The mobile menu is toggled via `@click="isMenuOpen = !isMenuOpen"` and shown with `v-show="isMenuOpen"`.

### Lambda (`lambda/`)

`contactLambda.js` is an AWS Lambda handler (Node.js) deployed to API Gateway at:
```
https://nmesql59ql.execute-api.us-west-1.amazonaws.com/contactLambda
```

It uses AWS SES (`us-west-1`) to send contact form emails. It supports multiple client apps via the `app_key` field in the POST body (`eight9`, `awcs`, `mam`, `atlas`, `scada`). Spam protection uses a honeypot field — any submission with a non-empty `honeypot` value is silently discarded.

The Lambda has no `package.json`; the AWS SDK (`@aws-sdk/client-ses`) is provided by the Lambda runtime environment.

### Contact Form Flow

`ContactSection.vue` → Vuex action `do_submit_contact` → `http.js` `send_contact_form` → POST to Lambda → SES email to the configured sender address.

The form POSTs JSON with `app_key: 'eight9'` hardcoded. Optional extra fields (`address`, `company`, `title`, etc.) are appended to the email body if present in the Lambda payload.
