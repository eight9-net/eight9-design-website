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
- **Vuex 4** for state (`src/store.js`) — holds site info, contact form actions, and a stubbed product loader
- **Vue Router 4** (`src/router/index.js`) — single route (`/`) pointing to `LandingView`
- **Bootstrap 5** — imported via SCSS in `src/assets/custom.scss`, with `$primary: #126f82` overriding the default theme color
- **Font Awesome** — icons registered globally in `src/main.js` and used as `<font-awesome-icon>`
- **Axios** — wrapped in `src/http.js`, which handles error logging and exports named API methods

The app layout is `App.vue` → `SiteHeader` + `<router-view>` + `SiteFooter`. The single view is `LandingView`, which composes `LandingBox` (service cards) and `ContactSection` (contact form).

The `@` alias resolves to `src/`, and `~bootstrap` resolves to `node_modules/bootstrap` (for SCSS imports).

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
