# FeriApp - Memory Log

## 2026-06-30 — Kombai design implementation (Soft Organic theme)

### Work done
- Parsed `.kombai/canvas/feriapp.canvas` (3 Kombai variants: Marketplace, Dashboard, Auth) and extracted the full HTML for each.
- Built the complete FeriApp frontend from the Kombai "Soft Organic" design using Next.js 16 (App Router), Tailwind CSS v4, TypeScript strict, `@tabler/icons-react`, and `motion` for animations.
- Implemented the 3 designed screens faithfully:
  - `/auth` — login/register with animated tab switching.
  - `/marketplace` — customer home with search + category reel + featured products.
  - `/dashboard` — vendor home with animated credit count-up, SVG progress ring, stall management links.
- Generated the missing pages following the same design philosophy:
  - Customer: `/orders`, `/coupons`, `/profile`, `/product/[id]`.
  - Vendor: `/store` (CRUD products w/ bottom-sheet form), `/vendor-orders` (status workflow), `/credit` (request/pay credit + history), `/reports` (bar chart + top products), `/vendor-profile`.
- Created a single editable mock-data file `src/data/mock-data.ts` (no database) with typed data + helper selectors.
- Wired up all navigation (customer & vendor bottom navs, FABs, root redirect to `/auth`).

### Challenges → Solutions
- **Canvas file not valid JSON**: it has `//` comment header lines. Solution: strip leading comment lines before `JSON.parse`.
- **Kombai HTML used CDN libs (GSAP, Motion, Locomotive, Lenis)**: not ideal for Next.js. Solution: replaced with the `motion` npm package (React + vanilla APIs) and CSS transitions; dropped smooth-scroll libs to keep the bundle lean.
- **Tabler icons via webfont CDN** → switched to `@tabler/icons-react` (tree-shakeable, type-safe). Category icons stored as string names in mock data and mapped via `src/components/icons.ts`.
- **`cloneElement` + `useId` for label association**: `cloneElement` generic typing failed with `ReactNode` children → fixed with `isValidElement<{ id?: string }>(child)` narrowing.
- **Biome a11y rules**: decorative SVGs needed `aria-hidden`, chevron SVGs needed `role="img"` + `aria-label`, labels needed `htmlFor`/`id` association.

### Verification
- `pnpm build` ✓ (15 routes, all static except `/product/[id]`).
- `pnpm lint` (biome check) ✓ clean.
- All 13 routes return HTTP 200 (root returns 307 → `/auth`).

### Tech / conventions
- Package manager: **pnpm** (per AGENTS.md).
- Design tokens in `globals.css` via `@theme`: `--color-ghost-white #F8F8FF`, `--color-light-sea-green #20B2AA`, `--color-oxford-navy #003262`, `--color-hairline #d0d0cc`.
- Fonts: Outfit (headings) + Nunito Sans (body) via `next/font/google`.
- Mobile-first, max-width 375px per screen.
- All user-facing text in **Spanish**; code/identifiers in **English**.

## 2026-06-30 — Auth role selector, patente removal, responsive navs

### Work done
- Removed "Patente Municipal" everywhere (auth register form, vendor profile, `Vendor` type + data) - feriantes are informal entrepreneurs, no municipal patent required. Register RUT field is now full-width.
- Added a **role selector** (Cliente / Feriante) on `/auth` (both login & register tabs). Selecting a role sets the post-submit redirect: `cliente` -> `/marketplace`, `feriante` -> `/dashboard`, so both perspectives can be demoed.
- Fixed responsiveness on larger devices (tablets): all fixed navs (`CustomerBottomNav`, `VendorBottomNav`, marketplace `TopNav`) now use `left-1/2 -translate-x-1/2 w-full max-w-[375px]` to stay centered in the mobile column instead of stretching full-width. Route group layouts gained `sm:border-x sm:shadow-[...]` to delineate the app column.

### Verification
- `pnpm build` ✓, `pnpm lint` ✓.
- Runtime: `/auth` renders role selector (Cliente/Feriante + hints), no Patente; `/vendor-profile` no longer shows Patente.

## 2026-06-30 — Role-aware navigation (separate cliente vs feriante access)

### Work done
- Added `RoleProvider` (`src/components/RoleProvider.tsx`): React Context + `localStorage` persistence of the selected role (`cliente` | `feriante`), wrapped in the root layout. Exposes `useRole()`.
- Auth page now reads/writes the role via `useRole()` (persisted across navigation/reloads) instead of local state.
- `CustomerBottomNav` is role-aware: shows the clean 4-item nav (Inicio/Pedidos/Cupones/Perfil) for **cliente**, and adds the "Mi Puesto" FAB -> `/dashboard` only for **feriante** browsing the marketplace. Clients can no longer reach vendor management.
- `VendorBottomNav` FAB changed from "Tienda" -> `/store` to **"Mercado" -> `/marketplace`** (light-sea-green, shopping-bag icon) so a feriante can also buy. Store management stays reachable from the dashboard's "Editar Productos" card.

### Challenge -> Solution
- **No shared role state**: pages are independent so the auth role selector didn't persist. Solution: a Context provider in the root layout persisting to `localStorage`, consumed by both navs. SSR defaults to `cliente` (no localStorage); the FAB appears after hydration when the saved role is `feriante` (minor, acceptable flash).

### Verification
- `pnpm build` ✓, `pnpm lint` ✓, all 12 routes 200.
- Runtime (curl): vendor nav shows "Mercado"; customer nav (default cliente) omits "Mi Puesto".
