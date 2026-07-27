# Experience timeline — plan + implementation

**Prompt:** Approve the spec (fold the earlier edit into its log), load the next superpowers step,
and implement.

## What I did

- Folded the table→rail edit note into the spec log entry.
- Invoked **writing-plans**; wrote `docs/superpowers/plans/2026-07-27-experience-timeline.md`
  (2 tasks, adapted to the repo's no-test-runner reality — verification is build + lint + visual).
- Implemented inline:
  - Created `src/components/about/Timeline.tsx` — server component, inline typed
    `ExperienceEntry[]`, vertical accent rail with background-ringed nodes, reverse-chronological
    sort via a `YYYY-MM` key.
  - Rendered `<Timeline />` in `src/app/page.tsx` between `Hero` and `SelectedWork`.
- Verified: `npm run format` + `npm run lint` clean; `npm run build` succeeds; the static
  `build/index.html` contains `id="experience"`, entries in order (06-2025 → 09-2024 → 01-2024 →
  09-2023), the `as of 07-2026` timestamp, node rings, and 2 external links with `noopener`.
- Added a todo: `(A) ... confirm/replace guessed MM-YYYY dates ... +bug`.

## Notes / open items

- Timeline dates are best-guess placeholders (`// TODO: confirm` in the component). Awaiting Wesley's
  real MM-YYYY values.
- **Not committed** — on `main`, no commit explicitly requested. Working tree also holds prior
  uncommitted work (CLAUDE.md, README, todo.txt, docs/, claude/ logs) plus gitignored build/.next.
