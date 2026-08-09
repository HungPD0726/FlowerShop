# Skill conflict matrix

Read this file when combining project and generic visual skills.

| Source skill | Useful guidance | Conflicting guidance | Lá & Hoa resolution |
| --- | --- | --- | --- |
| design-taste-frontend | Audit-first, design dials, asymmetry, image strategy, accessibility | Defaults to Tailwind 4 and treats dark mode as mandatory | Keep Tailwind 3 and the locked light theme |
| redesign-existing-projects | Preserve stack, audit states/content, targeted improvements | Suggests inertia scrolling, parallax stacks, split scroll, and strong glass effects | Use its audit and fix priority; reject cinematic scroll behavior |
| ui-ux-flower-ecommerce | Delivery, variant, card, cart, checkout, and admin domain rules | Previous palette, typography, and glass treatment were outdated | Use the updated project tokens and editorial direction |
| minimalist-ui | Warm editorial typography, restrained surfaces, Phosphor, subtle motion | Prefers sharp CTAs and forbids pill primary actions | Keep restrained surfaces; allow brand pill CTAs |
| high-end-visual-design | Spacing tension, component hierarchy, transform-safe motion | Prescribes magnetic interactions and mandatory reveal choreography | Use only low-intensity polish with reduced motion |
| imagegen-frontend-web | Section-level art direction and coherent campaign imagery | Produces visual references, not production UI or product data | Use only when new campaign imagery/reference comps are requested |
| industrial-brutalist-ui | Dense data hierarchy and strict grids | Mechanical visual identity conflicts with botanical storefront | Do not use for storefront; use only if admin is explicitly re-directed |
| react-19 | Modern React 19 patterns | Repository is React 18 | Do not invoke |
| tailwind-4 | Tailwind 4 conventions | Repository is Tailwind 3.4 | Do not invoke |

## Minimal skill set by task

- Full redesign: la-hoa-frontend-redesign, redesign-existing-projects, design-taste-frontend, ui-ux-flower-ecommerce, react-helper, Playwright.
- Targeted page polish: la-hoa-frontend-redesign, ui-ux-flower-ecommerce, react-helper.
- New campaign imagery: add imagegen-frontend-web and imagegen.
- Admin-only work: la-hoa-frontend-redesign, react-helper; use storefront decoration sparingly.
- QA-only work: react-helper and Playwright.
