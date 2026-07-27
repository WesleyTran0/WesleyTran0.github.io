# Experience Timeline — Design Spec

**Date:** 2026-07-27 **Status:** Draft (awaiting date confirmation)

## Summary

Add an "experience" section to the homepage: a single reverse-chronological timeline combining work
and education into one stream (no work/edu distinction). Rendered as a vertical rail with accent
nodes, styled to match the site's existing astrodark + mono-chrome vocabulary.

## Goals

- Give visitors a quick, scannable history of Wesley's roles and education on the homepage.
- Reuse the established design language (accent-tick section header, mono chrome, astrodark tokens)
  so the section reads as part of the same system as `Hero`, `NowList`, `InfoStrip`, `SelectedWork`.
- Keep the data authoring pattern consistent with the codebase (inline typed array, like `NowList`
  and `InfoStrip` — no markdown, no new `lib/` module).

## Non-goals

- No separate `/experience` route (it lives on the homepage).
- No new keyboard shortcut / nav item.
- No work-vs-education visual differentiation (single unified stream).
- No filtering, expand/collapse, or animation — static content only.

## Placement

- Rendered in `src/app/page.tsx`, **between `<Hero />` and `<SelectedWork />`** (reading order:
  about → experience → work).
- Section wrapper gets `id="experience"` and `scroll-mt-28`, matching the other homepage sections.
- The navbar (`[1] about / [2] projects / [3] contact`) is unchanged. `useScrollSpy` continues to
  track only `about` and `work`; `experience` is not added to it.

## Component

`src/components/about/Timeline.tsx` — a server component (no client interactivity required).

### Header

Mirrors `SelectedWork`'s header structure:

- Accent tick:
  `<span className="block h-px w-5.75 -translate-y-1.25 bg-accent" aria-hidden="true" />`
- `<h2>` reading `experience` (`text-[23px] font-medium tracking-[-0.01em] text-text`)
- Right-aligned mono timestamp `as of 07-2026` (`font-mono text-sm text-muted-dim`)

### Rail + nodes

- Body is a semantic `<ol>` with a left vertical rule (`border-l border-border`), providing the
  rail. Left padding on the list leaves room for the rail + nodes.
- Each entry is an `<li>` positioned `relative`, carrying:
  - **Node dot**: an absolutely-positioned small circle sitting on the rail, `bg-accent` with a
    `bg-background` ring (via ring/border) so it reads cleanly over the line. `aria-hidden="true"`.
  - **Date**: `font-mono` `text-accent`, format `MM-YYYY`.
  - **Role**: `text-text`, medium weight.
  - **Org**: `text-muted`.
  - **Note** (optional): `text-text-soft`, one line.
- Entries render in reverse-chronological order (newest first).
- If an entry has an `href`, the role/org links out with `target="_blank" rel="noopener noreferrer"`
  and the site's standard hover-to-accent transition.

### Data model

Inlined as a typed `const` array at the top of the component (same pattern as
`NowList`/`InfoStrip`):

```ts
interface ExperienceEntry {
	date: string; // "MM-YYYY", used for display and sorting
	role: string;
	org: string;
	note?: string;
	href?: string;
}
```

Sorting: descending string compare on `date` is insufficient for `MM-YYYY` (month leads), so sort by
a derived comparable key `YYYY-MM` (or compare parsed year then month). The array will be authored
newest-first and can also be sorted defensively in the component.

## Seed content

Drawn from the existing site (`InfoStrip`, `Hero`, project frontmatter). **Dates are placeholders —
`<<TODO: confirm MM-YYYY>>` — to be confirmed by Wesley before implementation.** Shown below as the
rail it renders into (`href` in parentheses where applicable):

<!-- prettier-ignore -->
●  &lt;&lt;TODO&gt;&gt;   Security Research Intern  
│               Griffiss Institute  
│               threat research + tooling  
●  &lt;&lt;TODO&gt;&gt;   Developer · Sandbox  (sandboxnu.com)  
│               SearchNEU course catalog + notifications  
●  &lt;&lt;TODO&gt;&gt;   Competitor · NUCCDC  (nuccdc.club)  
│               blue-team cyber defense  
●  &lt;&lt;TODO&gt;&gt;   B.S. Cybersecurity  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Northeastern University · expected 2027

## Styling

Reuses existing theme tokens only — no new `@theme` colors:

- Nodes / date / links: `text-accent`, `bg-accent`
- Role: `text-text`; Org: `text-muted`; Note: `text-text-soft`
- Rail / dividers: `border-border`, `border-border-soft`; ring: `bg-background`
- Date + timestamp: `font-mono`

Single-column layout works on mobile without special handling. Prettier formatting (tabs, double
quotes, `prettier-plugin-tailwindcss` class sorting) applies.

## Accessibility

- Semantic `<ol>` / `<li>` for the chronological list.
- Decorative node dots and the accent tick are `aria-hidden="true"`.
- External links use `rel="noopener noreferrer"`.

## Verification

The repo has no test runner. Verification is:

1. `npm run build` — static export succeeds with the new section.
2. `npm run lint` — Prettier check passes.
3. Dev-server (`npm run dev`) visual check: rail alignment, dot rings over the line, header matches
   `SelectedWork`, reverse-chronological order, links open correctly.

## Open questions

- Confirm the four `MM-YYYY` dates (and whether Northeastern should show start date or expected
  graduation).
- Confirm whether any entries are missing (e.g. earlier education / roles).
