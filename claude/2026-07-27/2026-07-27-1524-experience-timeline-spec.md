# Experience timeline — design spec

**Prompt:** Make a plan for a work + education timeline section, thematically appropriate to the
site.

## What I did

- Ran the brainstorming flow: read the remaining about-section components (`NowList`, `InfoStrip`,
  `SelectedWork`, `Footer`, `HelpModal`) to match the visual vocabulary, then asked clarifying
  questions.
- Decisions captured: **homepage section** (between Hero and Featured Work, no new nav item);
  **single combined stream** (no work/edu distinction); **real seed content** drafted from the site;
  **vertical rail + accent nodes** visual style; **MM-YYYY** date granularity.
- Wrote the design spec to `docs/superpowers/specs/2026-07-27-experience-timeline-design.md` —
  placement, the `Timeline.tsx` server component, inline typed data array, seed content, styling
  tokens, a11y, and verification (build + lint + visual, since there's no test runner).

## Follow-up edit

- Replaced the seed-content markdown table with a rail-style ASCII mockup (per user preference), no
  code fence / bounding box; guarded with `<!-- prettier-ignore -->` so it survives `npm run lint`.
- User approved the spec and asked to proceed to the implementation plan + build.

## Notes / open items

- Dates are `<<TODO>>` placeholders pending Wesley's confirmation (MM-YYYY, and whether Northeastern
  shows start vs. expected-2027 grad).
- Did **not** commit — on `main` and no commit requested. Spec awaiting user review before writing
  the implementation plan.
