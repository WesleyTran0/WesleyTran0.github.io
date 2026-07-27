# Experience Timeline Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development
> (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use
> checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add an "experience" section to the homepage — a single reverse-chronological
work+education timeline rendered as a vertical accent rail with nodes.

**Architecture:** One new server component (`Timeline.tsx`) holding its data inline as a typed
`const` array (same pattern as `NowList`/`InfoStrip`), rendered on the homepage between `Hero` and
`SelectedWork`. No new routes, nav items, or client-side JS.

**Tech Stack:** Next.js 15 (App Router, static export), React 19 server component, Tailwind CSS v4
(existing `@theme` tokens only), TypeScript, Prettier.

## Global Constraints

- Static export only — server component, no `"use client"`, no runtime data fetching.
- Reuse existing `@theme` tokens (`text-accent`, `text-text`, `text-muted`, `text-text-soft`,
  `bg-accent`, `bg-background`, `border-border`, `border-border-soft`, `font-mono`). Do **not** add
  new theme colors or hardcode hex.
- Prettier: tabs, double quotes, no trailing commas, `printWidth` 100; run `npm run format`.
- Path alias `@/*` → `src/*`.
- No test runner exists; verification is `npm run build`, `npm run lint`, and a dev-server visual
  check.
- Dates are best-guess placeholders marked `// TODO: confirm` — see Task 1 data.

---

### Task 1: Create the `Timeline` component

**Files:**

- Create: `src/components/about/Timeline.tsx`

**Interfaces:**

- Consumes: nothing (self-contained; data inlined).
- Produces: `export default function Timeline()` — a server component rendering a
  `<section id="experience">`. Imported by Task 2.

- [ ] **Step 1: Write the component**

```tsx
interface ExperienceEntry {
	date: string; // "MM-YYYY", used for display and sorting
	role: string;
	org: string;
	note?: string;
	href?: string;
}

// TODO: confirm all dates (MM-YYYY) with Wesley — current values are best guesses.
const entries: ExperienceEntry[] = [
	{
		date: "06-2025",
		role: "Security Research Intern",
		org: "Griffiss Institute",
		note: "threat research + tooling"
	},
	{
		date: "09-2024",
		role: "Competitor",
		org: "NUCCDC",
		note: "blue-team cyber defense",
		href: "https://nuccdc.club/"
	},
	{
		date: "01-2024",
		role: "Developer",
		org: "Sandbox",
		note: "SearchNEU course catalog + notifications",
		href: "https://www.sandboxnu.com/"
	},
	{
		date: "09-2023",
		role: "B.S. Cybersecurity",
		org: "Northeastern University",
		note: "expected 2027"
	}
];

function sortKey(date: string): string {
	const [month, year] = date.split("-");
	return `${year}-${month}`;
}

export default function Timeline() {
	const sorted = [...entries].sort((a, b) => (sortKey(a.date) < sortKey(b.date) ? 1 : -1));

	return (
		<section id="experience" className="scroll-mt-28 pb-10">
			<div className="mb-7 flex items-baseline justify-between">
				<div className="flex items-baseline gap-3">
					<span className="block h-px w-5.75 -translate-y-1.25 bg-accent" aria-hidden="true" />
					<h2 className="m-0 text-[23px] font-medium tracking-[-0.01em] text-text">experience</h2>
				</div>
				<span className="font-mono text-sm text-muted-dim">as of 07-2026</span>
			</div>

			<ol className="m-0 flex list-none flex-col gap-7 border-l border-border py-1 pl-7">
				{sorted.map((entry) => {
					const heading = (
						<>
							<span className="font-medium text-text">{entry.role}</span>
							<span className="text-muted"> · {entry.org}</span>
						</>
					);
					return (
						<li key={`${entry.date}-${entry.org}`} className="relative">
							<span
								aria-hidden="true"
								className="absolute top-1.5 -left-[calc(1.75rem+4.5px)] h-2.5 w-2.5 rounded-full border-2 border-background bg-accent"
							/>
							<div className="mb-1 font-mono text-[13px] tracking-[0.04em] text-accent">
								{entry.date}
							</div>
							<div className="text-lg leading-[1.4]">
								{entry.href ? (
									<a
										href={entry.href}
										target="_blank"
										rel="noopener noreferrer"
										className="transition-colors hover:text-accent"
									>
										{heading}
									</a>
								) : (
									heading
								)}
							</div>
							{entry.note && (
								<div className="mt-0.5 leading-[1.5] text-text-soft">{entry.note}</div>
							)}
						</li>
					);
				})}
			</ol>
		</section>
	);
}
```

- [ ] **Step 2: Format**

Run: `npm run format` Expected: file reformatted to Prettier style, no errors.

- [ ] **Step 3: Lint check**

Run: `npm run lint` Expected: "All matched files use Prettier code style!"

- [ ] **Step 4: Commit**

```bash
git add src/components/about/Timeline.tsx
git commit -m "feat: add experience timeline component"
```

---

### Task 2: Render the timeline on the homepage

**Files:**

- Modify: `src/app/page.tsx`

**Interfaces:**

- Consumes: `Timeline` default export from Task 1.
- Produces: nothing (leaf integration).

- [ ] **Step 1: Import and render `Timeline` between `Hero` and `SelectedWork`**

Add the import alongside the existing ones and place `<Timeline />` between `<Hero />` and
`<SelectedWork />`:

```tsx
import Hero from "@/components/about/Hero";
import Timeline from "@/components/about/Timeline";
import SelectedWork from "@/components/about/SelectedWork";
import PageShell from "@/components/PageShell";
import { getFeaturedProjects } from "@/lib/projects";

export default function Home() {
	const featured = getFeaturedProjects();
	return (
		<PageShell>
			<main className="mx-auto max-w-3xl px-7">
				<Hero />
				<Timeline />
				<SelectedWork projects={featured} />
			</main>
		</PageShell>
	);
}
```

- [ ] **Step 2: Build (static export)**

Run: `npm run build` Expected: build succeeds, homepage exported, no type errors.

- [ ] **Step 3: Lint check**

Run: `npm run lint` Expected: "All matched files use Prettier code style!"

- [ ] **Step 4: Visual check**

Run: `npm run dev`, open `http://localhost:3000`. Expected: an "experience" section appears below
the hero and above Featured Work; accent tick + `experience` heading + `as of 07-2026` on the right;
a vertical rail with accent node dots (each ringed by the page background so it sits cleanly on the
line); entries newest-first (Griffiss → NUCCDC → Sandbox → Northeastern); NUCCDC and Sandbox names
link out in a new tab.

- [ ] **Step 5: Commit**

```bash
git add src/app/page.tsx
git commit -m "feat: render experience timeline on homepage"
```

---

## Post-implementation

- Update `todo.txt` if any follow-ups surface (e.g. confirming dates → `(A) ... +bug` if wrong).
- Write a `claude/2026-07-27/` log entry for the implementation prompt.
- Replace the four `// TODO: confirm` dates once Wesley provides the real `MM-YYYY` values.
