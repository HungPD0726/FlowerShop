---
name: react-helper
description: Build, run, test, and debug the Lá & Hoa frontend. Use for any change inside frontend/, especially Next.js routing, React components, Tailwind styling, API integration, state, forms, and browser verification. Enforces the repository's exact Next.js 14, React 18, and Tailwind CSS 3 stack.
---

# Lá & Hoa frontend helper

## Stack lock

- Use Next.js 14 App Router and React 18. Do not apply React 19 or React Compiler patterns.
- Use Tailwind CSS 3.4 and tailwind.config.ts. Do not apply Tailwind 4 setup or syntax.
- Use Cormorant Garamond through var(--font-display) and Manrope through var(--font-body).
- Use Phosphor for icons, Motion from motion/react, and the installed Radix primitives.
- Check frontend/package.json before importing a package. Reuse installed dependencies first.

## Architecture

- Keep static layout, metadata, and data composition in Server Components.
- Isolate interaction, browser APIs, Motion, stores, and TanStack Query in Client Components.
- Use TanStack Query for server state.
- Use Zustand only for auth hydration, cart, toast, wishlist/compare, and transient UI state already owned by stores.
- Preserve REST routes, request fields, response shapes, slugs, and business behavior.

## Run

Execute frontend commands from frontend/:

    npm install
    npm run dev

The app runs at http://localhost:3000. The API base comes from NEXT_PUBLIC_API_URL and defaults to http://localhost:8080/api/v1.

## Implementation guardrails

- Use next/image with a stable aspect ratio and sizes; reserve priority for the LCP image.
- Use semantic HTML, visible focus, minimum 44px touch targets, and reduced-motion fallbacks.
- Animate only transform and opacity. Do not add parallax, scroll hijacking, or magnetic pointer effects.
- Map ApiResponse.errors to form fields where available.
- Provide loading, error with retry, empty, pending, and success states for server-backed UI.
- Do not add fake products, ratings, testimonials, discounts, metrics, claims, or dead links.

## Verify

Run proportionate checks, then the full gate for completed frontend work:

    npm run lint
    npm run typecheck
    npm run test
    npm run test:e2e
    npm run build

Use Playwright for browser QA at 390x844, 768x1024, and 1440x900. Check horizontal overflow, keyboard behavior, dialogs returning focus, and critical/serious axe violations.
