---
name: la-hoa-frontend-redesign
description: Orchestrate frontend redesigns for the Lá & Hoa repository. Use whenever redesigning or polishing storefront, product, cart, checkout, auth, account, admin, or editorial pages, and whenever multiple design skills conflict. Enforces the locked stack, brand direction, API preservation, accessibility, testing, and source-of-truth precedence.
---

# Lá & Hoa frontend redesign orchestrator

Use this skill as the project-level authority when generic design skills disagree.

## Read first

1. Inspect frontend/package.json, frontend/src/app/globals.css, frontend/tailwind.config.ts, and the affected route.
2. Read react-helper for implementation constraints.
3. Read ui-ux-flower-ecommerce for brand and commerce rules.
4. Read references/conflict-matrix.md when more than one visual skill applies.

## Authority order

Resolve decisions in this order:

1. The current user request and explicitly locked assumptions.
2. Existing backend contracts, live data, and working business flows.
3. Repository stack and tokens.
4. This orchestrator.
5. Specialist skills used for ideas, never as unconditional requirements.

Never let a generic skill silently change the framework, theme mode, API contract, business content, or brand.

## Required workflow

### Audit

- Inspect the current route and shared primitives before editing.
- Identify visual repetition, weak hierarchy, fake content, missing states, accessibility gaps, and responsive risks.
- Preserve working routes and existing user changes.

### Design

- State a one-line design direction and set variance, motion, and density.
- Prefer editorial asymmetry, mixed media ratios, warm whitespace, and a clear narrative spine.
- Use the brand tokens from globals.css and tailwind.config.ts.
- Avoid repeated three-card rows, generic SaaS shells, excessive pills, heavy shadows, gradients, and decorative glass everywhere.

### Implement

- Keep Next.js 14, React 18, and Tailwind CSS 3.
- Use Cormorant Garamond, Manrope, Phosphor, Motion, Radix, TanStack Query, and existing Zustand stores.
- Preserve REST requests/responses, field names, slugs, and order data.
- Use next/image with sizes and stable ratios.
- Animate only transform and opacity with reduced-motion support.
- Add loading, retry/error, empty, pending, disabled, success, and focus states.

### Verify

- Test keyboard navigation, focus return, URL state, mobile actions, and server-state failures.
- QA at 390x844, 768x1024, and 1440x900.
- Run lint, typecheck, unit/component tests, Playwright/axe, and production build.
- Do not declare Core Web Vitals targets met without measuring them.

## Explicit overrides

- Light theme is intentional; ignore generic mandatory-dark-mode rules.
- Tailwind 3 is intentional; do not use Tailwind 4 configuration.
- React 18 is intentional; do not use React 19 or React Compiler assumptions.
- Primary CTA pills are allowed; large containers and every badge must not become pills.
- Use restrained transform/opacity motion; reject scroll hijacking, parallax, magnetic pointer physics, and mandatory reveal animations.
- Use subtle blur only for overlays or sticky chrome; reject page-wide glassmorphism.
- Product and operational claims require API or approved business content.
