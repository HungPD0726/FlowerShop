---
name: ui-ux-flower-ecommerce
description: Design and refine storefront, cart, checkout, auth, account, and admin experiences for the Lá & Hoa flower shop. Use when UI decisions depend on the brand, flower-delivery business rules, product variants, delivery scheduling, cards, inventory, or Vietnamese commerce content.
---

# Lá & Hoa flower-commerce UI

## Brand lock

- Direction: light botanical editorial with asymmetry, large flower photography, restrained ornament, and warm whitespace.
- Canvas: #FBF4EE.
- Surface: #FFFDFB.
- Ink: #2D221E.
- Muted: #786660.
- Line: #F0D4C8.
- Dusty rose accent: #9B3F50; hover #7E3040; soft #FCEBE5.
- Display: Cormorant Garamond. Body and controls: Manrope.
- Large containers: 28px. Media/cards: 20px. Inputs: 12px. Primary actions may use pill geometry.
- Keep one light theme. Do not invent a dark mode.

Treat frontend/src/app/globals.css and frontend/tailwind.config.ts as the runtime source of truth if tokens change.

## Commerce truth

- Render products, prices, discounts, ratings, inventory, coupons, revenue, and order metrics only from APIs.
- Preserve variant stock, delivery date, valid time slot, greeting card, anonymous sender, address, payment, and order semantics.
- Show a two-hour delivery claim only where current business content explicitly supports it.
- Do not add fake promotions, testimonials, social links, newsletter claims, or unsupported features.
- Keep Vietnamese as the primary language and avoid mixed English labels.

## Storefront patterns

- Use an editorial product rhythm rather than repeated equal-card grids.
- Keep quick-add reachable on touch and expose pending/out-of-stock feedback.
- Use a desktop filter rail and mobile drawer with URL-synchronized filters.
- Keep the order summary sticky only where it does not obscure fields or mobile actions.
- Use local campaign imagery; use API imagery for products.

## Cart and checkout

- Keep quantity updates pending per line and recover from API errors.
- Validate fields inline and preserve real radio semantics for payment methods.
- Keep delivery and greeting options adjacent to the item or checkout context they affect.
- Confirm coupons through the existing order workflow; never imply a discount before backend confirmation.

## Account and admin

- Account remains editorial but compact and task-focused.
- Admin uses the same tokens with sans-serif typography, lower decoration, responsive tables/cards, and real API data.
- Do not add users, reports, staffing, or other modules without backend support.

## Accessibility and responsive gate

- Minimum 44px touch targets and visible focus indicators.
- Dialogs and drawers require focus trap, Escape, labels, and focus return.
- Respect prefers-reduced-motion and animate only transform/opacity.
- Verify keyboard-only operation and no critical/serious axe findings.
- Check 390x844, 768x1024, and 1440x900 with no horizontal overflow.
