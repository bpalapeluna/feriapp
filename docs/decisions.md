# FeriApp - Decisions

## D1 - Replace Kombai CDN libraries with npm packages
- **Context**: The Kombai canvas HTML loaded GSAP, Motion, Locomotive Scroll, and Lenis via CDN `<script>` tags, and Tabler icons via a webfont CSS CDN.
- **Options**: (a) Keep CDN imports; (b) Install npm equivalents.
- **Decision**: Install `motion` (npm) and `@tabler/icons-react`; drop GSAP/Locomotive/Lenis.
- **Reasons**: CDN scripts conflict with Next.js App Router / React 19 hydration and bundling; npm packages are tree-shakeable, type-safe, and lintable. `motion` covers the entrance/progress animations the design needed. Smooth-scroll libs were non-essential and added weight.

## D2 - Single editable mock-data file instead of a database
- **Context**: No database available; user wants to easily change/add test data.
- **Decision**: All data + TypeScript types live in `src/data/mock-data.ts` with helper selectors. Formatting utilities split into `src/lib/format.ts`.
- **Reasons**: Single source of truth the user can edit; types keep the app type-safe; selectors centralize query logic so swapping in a real API later only requires reimplementing the selectors.

## D3 - Route groups for customer vs vendor
- **Context**: Two roles with different bottom navigation and layouts.
- **Decision**: Use Next.js route groups `(customer)` and `(vendor)`, each with its own layout providing the role-specific `BottomNav`.
- **Reasons**: Clean separation, shared layout per role, no URL pollution (groups don't appear in the path). The FAB on each nav crosses roles (customer -> `/dashboard`, vendor -> `/store`).

## D4 - Category icons stored as strings, mapped to components
- **Context**: Mock data should be plain editable data, not import icon components.
- **Decision**: Categories store an `icon` string (e.g. `"IconApple"`); `src/components/icons.ts` maps names to `@tabler/icons-react` components.
- **Reasons**: Keeps mock data serializable/editable while staying type-safe at render time.

## D5 - Decorative SVG accessibility
- **Context**: Biome `noSvgWithoutTitle` flags raw SVGs without alt text.
- **Decision**: Progress-ring SVGs use `aria-hidden="true"` (decorative, value shown in adjacent text); chevron SVGs use `role="img"` + `aria-label`.
- **Reasons**: Meets a11y rules without duplicating information for screen readers.
