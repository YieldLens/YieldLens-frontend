# YieldLens-frontend — Minor Issues Backlog (8 Issues)

Sized strictly as **100 pts (Trivial / Good First Issue)** in Drips Wave criteria.

---

## #1: Add aria-label attributes to pool sort buttons and time-range selector tabs

- **Labels**: `complexity:trivial, frontend, accessibility, good first issue`

- **Complexity**: `100 pts` (Trivial)


### Summary
Ensure accessibility screen readers announce button purposes for pool table sort headers and chart time toggles (24h, 7d, 30d).

### Requirements
- Add `aria-label="Sort by APY descending"` and `aria-label="Show 7-day historical chart"`.
- Include `aria-selected="true"` on active timeframe tab.
- Test keyboard tab accessibility.

---

## #2: Add OpenGraph metadata, title template, and favicon to app/layout.tsx

- **Labels**: `complexity:trivial, frontend, seo`

- **Complexity**: `100 pts` (Trivial)


### Summary
Configure comprehensive page metadata for YieldLens analytics dashboard in Next.js App Router.

### Requirements
- Set title template: `%s | YieldLens - Stellar DEX Analytics`.
- Add description and OpenGraph banner image preview.
- Add SVG favicon link in `layout.tsx`.

---

## #3: Add accessible alt text to token pair icons and protocol logos

- **Labels**: `complexity:trivial, frontend, accessibility`

- **Complexity**: `100 pts` (Trivial)


### Summary
Ensure all asset images (`XLM`, `USDC`, `EURC`) and DEX logos have proper accessible `alt` text.

### Requirements
- Set `alt="XLM token icon"` and `alt="Soroswap protocol logo"`.
- Specify explicit `width` and `height` on Next.js `<Image>` components to eliminate layout shifts (CLS).
- Verify zero missing-alt warnings.

---

## #4: Document chart component prop types with TypeScript interfaces and descriptions

- **Labels**: `complexity:trivial, frontend, documentation, good first issue`

- **Complexity**: `100 pts` (Trivial)


### Summary
Add TypeScript interfaces and JSDoc documentation to `YieldChart`, `PoolCard`, and `MetricBadge` components.

### Requirements
- Document all props (`dataPoints`, `timeframe`, `highlightColor`, `onSelect`).
- Export prop types for external component reusability.
- Verify `npm run build` succeeds without type warnings.

---

## #5: Add empty-state message with retry button when no liquidity pools match active filters

- **Labels**: `complexity:trivial, frontend, ui/ux`

- **Complexity**: `100 pts` (Trivial)


### Summary
Provide helpful feedback when search query or filter criteria return zero liquidity pools.

### Requirements
- Render friendly empty-state card: "No liquidity pools found matching your search criteria."
- Provide a "Clear Filters" button that resets filter state.
- Test responsiveness across mobile and desktop views.

---

## #6: Standardize tooltip animations and transitions across APY performance charts

- **Labels**: `complexity:trivial, frontend, ui/ux`

- **Complexity**: `100 pts` (Trivial)


### Summary
Ensure chart hover tooltips exhibit smooth fade and positioning transitions.

### Requirements
- Configure tooltip transition duration (150ms) using CSS / Tailwind transitions.
- Ensure tooltips remain within chart canvas boundaries on mobile devices.
- Verify high contrast readability on dark theme.

---

## #7: Add Vitest smoke test verifying dashboard header and navigation links render correctly

- **Labels**: `complexity:trivial, frontend, testing, good first issue`

- **Complexity**: `100 pts` (Trivial)


### Summary
Add basic smoke test to prevent regressions in top-level navigation layout.

### Requirements
- Create `src/components/__tests__/Header.test.tsx` using Vitest and Testing Library.
- Verify brand logo, "Pools", and "Analytics" links are rendered in the DOM.
- Verify test passes with `npm test`.

---

## #8: Adjust table horizontal scroll indicators for mobile viewports below 640px

- **Labels**: `complexity:trivial, frontend, ui/ux`

- **Complexity**: `100 pts` (Trivial)


### Summary
Ensure wide liquidity pool comparison tables display a subtle gradient shadow or scroll indicator on mobile devices.

### Requirements
- Add scroll container styling with CSS overflow indicators.
- Ensure sticky left column for pool token pair names on horizontal scroll.
- Test layout on simulated mobile screens (375px - 430px).

---
