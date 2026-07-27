# wesleytran.dev — design spec

A single-page personal portfolio. Astrodark theme, Figtree as primary type, JetBrains Mono for
terminal-flavored chrome. Slim centered content column on a wide page.

## stack assumptions

- React (Next.js or Vite-based) + Tailwind CSS v4
- Single page, anchor-linked sections
- Keyboard navigation via a global `keydown` listener
- Contact will be a modal (built later, leave a placeholder hook)

---

## colors (astrodark palette)

These map onto Tailwind theme tokens. Use them via `var(--color-*)` or Tailwind utility classes.

```css
@theme {
	/* surfaces */
	--color-background: #1a1d23; /* page bg */
	--color-surface: #111317; /* nav, footer */
	--color-surface-alt: #1e222a; /* card hover bg */
	--color-surface-raised: #23272f; /* kbd badge bg */

	/* text */
	--color-text: #adb0bb; /* primary readable text */
	--color-text-soft: #9b9fa9; /* body paragraphs */
	--color-muted: #696c76; /* eyebrows, keys, tags */
	--color-muted-dim: #595c66; /* very secondary */
	--color-inactive: #494d56; /* rare, lowest priority */

	/* borders */
	--color-border: #3a3e47;
	--color-border-soft: rgba(58, 62, 71, 0.5);

	/* accent (canonical astrodark blue) */
	--color-accent: #50a4e9;
	--color-accent-light: #7bbcf0;
	--color-accent-dark: #3a7eb8;

	/* secondary palette colors (used sparingly) */
	--color-purple: #cc83e3;
	--color-green: #75ad47;
	--color-orange: #eb8332;
	--color-cyan: #00b298;
	--color-red: #f8747e;

	/* tag colors borrowed from astrodark icon palette */
	--color-tag-rust: #dea584;
	--color-tag-ts: #519aba;
}
```

**Rules**:

- Never use pure black or pure white. The deepest is `#111317`, the brightest text is `#adb0bb`.
- Accent blue is the _only_ primary accent. Other palette colors (green, purple, cyan, orange) are
  reserved for semantic tags (status indicators, category coloring) — never decoration.

---

## typography

```css
@theme {
	--font-sans: "Figtree", system-ui, sans-serif;
	--font-mono: "JetBrains Mono", ui-monospace, monospace;
}
```

Load both via Google Fonts. Figtree weights: 400, 500, 600. JetBrains Mono weights: 400, 500.

**Type scale**:

| Use                    | Size | Weight | Line-height | Letter-spacing | Font |
| ---------------------- | ---- | ------ | ----------- | -------------- | ---- |
| Intro one-liner        | 22px | 400    | 1.45        | -0.01em        | sans |
| Section title          | 18px | 500    | 1.5         | -0.01em        | sans |
| Card title             | 17px | 500    | 1.3         | -0.01em        | sans |
| Body paragraph         | 15px | 400    | 1.7         | 0              | sans |
| Now row text           | 14px | 400    | 1.55        | 0              | sans |
| Nav item               | 13px | 400    | 1.5         | 0              | sans |
| Card description       | 13px | 400    | 1.55        | 0              | sans |
| Footer text            | 12px | 400    | 1.5         | 0              | sans |
| Info row (key/value)   | 12px | 400    | 2.0         | 0              | mono |
| Eyebrow / section meta | 11px | 400    | 1.5         | 0.04em         | mono |
| Card numbers / tags    | 10px | 400    | 1.5         | 0.04em         | mono |
| Now row tags           | 10px | 400    | 1.5         | 0.04em         | mono |

Mono is used only for: eyebrow status, info strip (location/studying/etc), section meta
(counts/dates), card numbers, card tags, now-row tags. Everything else is Figtree.

---

## layout

- Page background: full viewport, `--color-background`
- Nav and footer: full-width `--color-surface`, with bottom/top border
- Content column: `max-width: 540px`, horizontally centered, `padding: 0 24px`
- Hero padding: `64px` top, `48px` bottom
- Section padding: `48px` top, `32px` bottom

---

## sections

The page top-to-bottom: nav → ASCII rule → hero (intro + bio + now + info) → selected work grid →
footer.

### 1. nav

- Layout: flex justify-between, brand left, links right
- Padding: `16px 24px`
- Background: `--color-surface`
- Border-bottom: `1px solid --color-border-soft`
- Font: Figtree 13px

**Brand**: `wesley tran.` — period in `--color-accent`, font-weight 500.

**Links**: gap 24px between items. Each item is `[N] label`:

- `[N]` in `--color-accent`, weight 500
- label in `--color-muted` by default, `--color-text` on hover and when active
- 6px gap between bracket-number and label text

Active state is set based on which section is currently in view (use IntersectionObserver). Default
is `[1] about`.

```jsx
<nav>
	<span className="brand">
		wesley tran<span className="accent">.</span>
	</span>
	<ul>
		<li className="active">
			<span className="key">[1]</span> about
		</li>
		<li>
			<span className="key">[2]</span> work
		</li>
		<li>
			<span className="key">[3]</span> contact
		</li>
	</ul>
</nav>
```

### 2. decorative rule

A long em-dash line that sits below the nav. Purely visual texture — overflow hidden, user-select
none.

- Background: `--color-surface` (matches nav)
- Color: `--color-muted-dim`
- Font-size: 11px
- Padding: `8px 24px`
- Content: long string of em-dashes (around 200 chars to ensure overflow)
- Border-bottom: `1px solid --color-border-soft`

### 3. hero (`#about`)

The hero is the about section. ID this as `#about` for anchor jumps.

#### eyebrow status pill

Above the intro one-liner. Mono 11px:

- Green dot (6px circle, `--color-green`)
- 8px gap
- `//` in `--color-accent`
- Status text in `--color-muted`: "open to summer 2026 internships"
- 32px bottom margin

#### intro one-liner

22px Figtree, weight 400, color `--color-text`, line-height 1.45, letter-spacing -0.01em, 32px
bottom margin:

> hi, i'm wesley — a cs & cybersecurity student in boston who spends most of his time a few layers
> below where things usually break.

The em-dash should be `--color-accent`.

#### bio paragraphs

Two paragraphs, 15px Figtree, color `--color-text-soft`, line-height 1.7, 22px bottom margin between
paragraphs:

1. "i'm a third-year at northeastern, splitting time between _sandbox_, the student-run software
   consultancy where i ship full-stack work for real clients, and _ccdc + ctf club_, where my team
   recently took first at the ncae regional competition."
2. "i'm drawn to the layers most people skip past: writing my own dns resolver in rust, building tcp
   from scratch with reno-style congestion control, exploiting 32-bit binaries with rop chains.
   **arch linux** on a thinkpad, **astronvim** for everything, a proxmox homelab i tinker with on
   weekends."

Markup rules:

- `<strong>` → `--color-text`, weight 500
- `<em>` → `--color-accent`, normal style (not italic),
  `border-bottom: 1px dotted rgba(80,164,233,0.3)`. On hover, border becomes solid `--color-accent`.
  These should eventually link to the related thing (sandbox → sandbox.northeastern.edu; ccdc →
  relevant page).

#### "now" list

Lives between the bio and the info strip. Prefaced by an italic caption: "a few things on my mind
lately:" in `--color-muted`, 13px, italic, 16px bottom margin.

The list itself is a series of rows. Each row:

- Two-column grid: 80px (label) + 1fr (text)
- 11.2px (0.7rem) padding top/bottom
- Bottom border `--color-border-soft`, also a top border on the first row

Each label is mono 10px uppercase, with a semantic color:

| Label      | Color                        | Use for                    |
| ---------- | ---------------------------- | -------------------------- |
| `BUILDING` | `--color-tag-rust` (#dea584) | active build/project work  |
| `STUDYING` | `--color-green`              | classes / learning         |
| `READING`  | `--color-purple`             | books / docs               |
| `LIFE`     | `--color-cyan`               | personal / lifestyle       |
| `WORKING`  | `--color-accent`             | (optional) active job work |

Row text: 14px Figtree, `--color-text-soft`, line-height 1.55. `<strong>` inside gets
`--color-text`, weight 500.

Sample rows:

```
BUILDING   final pass on **4700dns**, my recursive resolver. concurrent queries, retries on packet loss.
STUDYING   finals in **algorithms** (network flow, dp) and **networks** (bgp, dns security, tls).
READING    crafting interpreters by bob nystrom, and the rust reference (again).
LIFE       cooking more this semester. on a 3-day p/p/l split working toward front lever.
```

Bottom margin: 32px, before the info strip.

#### info strip

Mono 12px, line-height 2.0, top border `1px solid --color-border-soft`, 24px top padding.

Each row is a flex row: key column (110px wide) + value. Key is `--color-muted`, prefixed by `> ` in
`--color-accent`. Value is `--color-text`.

```
> location    boston, ma
> studying    cs + cybersecurity, neu '27
> working     sandbox @ northeastern
> tools       arch · astronvim · rust
```

The `+` in "cs + cybersecurity" should be `--color-accent`.

### 4. selected work (`#work`)

48px top padding, ID `#work`.

#### section header

Flex row, justify-between, baseline-aligned, 24px bottom margin.

**Title** (left): "selected work", 18px Figtree, weight 500, `--color-text`, letter-spacing -0.01em.
Preceded by an 18px-wide, 1px-tall accent rule sitting just above the baseline, with 9.6px gap.
Implement with `::before` or a flex child.

**Meta** (right): "004 · 2024–26", mono 11px, `--color-muted-dim`.

#### grid

2 columns, 1fr each. The "borders" are achieved with a 1px gap and a `--color-border-soft`
background showing through, plus a 1px outer border.

```css
.grid {
	display: grid;
	grid-template-columns: 1fr 1fr;
	gap: 1px;
	background: var(--color-border-soft);
	border: 1px solid var(--color-border-soft);
}
```

Each card has a solid `--color-background` so the grid lines show through the gap.

#### card

- Padding: `20px 20px 16px`
- Min-height: 150px
- Cursor pointer, transition background 200ms
- Display flex column

**Top row** (flex justify-between, 12px bottom margin):

- Card number (`01`, `02`, ...): mono 10px, `--color-muted-dim`
- Arrow `↗`: mono 13px, `--color-muted`. On hover, color shifts to `--color-accent` and translates
  `(2px, -2px)` (transition 200ms).

**Title**: 17px Figtree, weight 500, `--color-text`, letter-spacing -0.01em, 6px bottom margin. On
card hover: shifts to `--color-accent`.

**Description**: 13px Figtree, `--color-text-soft`, line-height 1.55, `margin-bottom: auto` so tags
push to the bottom.

**Tags**: flex row, 10px gap, mono 10px, letter-spacing 0.04em. The first tag (language tag) is
colored:

- `rust` → `--color-tag-rust`
- `typescript` → `--color-tag-ts`
- `infra` → `--color-cyan`
- otherwise → `--color-muted`

Other tags are always `--color-muted`.

**Card hover**: background shifts to `--color-surface-alt` (#1e222a). 200ms transition.

#### initial cards

```
01 — 4700dns
   recursive dns resolver in rust. cname chasing, glue records, bailiwick checking.
   [rust] [networks] [2026]

02 — homelab
   proxmox host running nextcloud, minecraft, cloudflare zero trust.
   [infra] [proxmox] [ongoing]

03 — tcp-from-scratch
   reliable transport over udp. reno congestion control, fast retransmit.
   [rust] [protocols] [2025]

04 — good dog licensing
   profile pages and submission flow at sandbox. next.js + trpc + prisma.
   [typescript] [next.js] [2025]
```

#### "view archive" link

Below the grid, right-aligned, 16px top padding. 13px Figtree, `--color-muted` with `↗` in
`--color-accent`. On hover, full text becomes `--color-accent`.

For now, links to `#` or to `/archive` if you build that route.

### 5. footer

- Padding: `20px 24px`
- Background: `--color-surface`
- Border-top: `1px solid --color-border-soft`
- Font: Figtree 12px, `--color-muted`
- Layout: flex justify-between, center-aligned

**Left**: keyboard hints. "press [1][2][3] to navigate · [?] for help".

- Each `<kbd>` badge: `--color-accent` text on `--color-surface-raised` background, 1px
  `--color-border` border, 3px border-radius, padding `1px 6px`, 11px font-size, weight 500, 2px
  horizontal margin
- Use `font-family: inherit` on kbd so it stays in Figtree
- The `?` triggers a help modal listing shortcuts (build later)

**Right**: social links. Flex row, 24px gap. "github · linkedin · email". Each item is
`--color-muted` default, `--color-accent` on hover.

---

## interactions

### keyboard navigation

Global `keydown` listener:

- `1` → scroll smooth to `#about`
- `2` → scroll smooth to `#work`
- `3` → open contact modal
- `?` → open help modal listing shortcuts

Don't trigger when focused on an input/textarea (or when modifier keys are held).

### contact modal

Placeholder for now. When triggered:

- Backdrop: `rgba(17, 19, 23, 0.85)` with blur
- Modal surface: `--color-surface` background, 1px `--color-border` border, 8px border-radius
- Centered, max-width 400px
- Same type system as the rest of the site
- Esc closes; clicking backdrop closes

Content (final):

- Heading: "get in touch" (or just an inline list — TBD)
- Email, GitHub, LinkedIn — same styling as footer links

### scroll-spy nav active state

Use `IntersectionObserver` to detect which section is in viewport. Whichever section's top is
closest to (but past) the nav line gets the active state in the nav links. Update the active class
accordingly.

### hover specs

Already documented per element above. General principle: 150–200ms transitions, color shifts toward
`--color-accent` for clickable elements, surfaces shift one step lighter (`--color-surface-alt`) on
card hover.

---

## responsive

The site is intentionally narrow even on desktop (540px content column). Mobile adjustments needed:

- Nav: at <640px, the brand and full link list might overflow. Consider hiding the keyboard `[N]`
  brackets at small sizes, or collapsing to a hamburger if the brand + 3 links don't fit.
  - Simplest path: at <500px, show nav as `[1] [2] [3]` only (numbers, no labels). Labels return
    at >=500px.
- Page padding: still 24px on mobile (the content column already fits comfortably)
- Selected work grid: collapse to single column at <500px
- Now rows: keep two-column structure but reduce label column from 80px to 70px
- Footer: stack the two halves vertically at <500px, 8px gap

The decorative em-dash rule should still overflow horizontally on mobile and be hidden — that's
correct behavior.

---

## file structure (suggested)

```
app/
  page.tsx              — single home page
  layout.tsx            — root layout, fonts, metadata
  globals.css           — theme tokens, base styles
components/
  Nav.tsx
  Hero.tsx
  NowList.tsx           — the "things on my mind" list
  InfoStrip.tsx         — the > location etc. strip
  SelectedWork.tsx      — section header + grid
  ProjectCard.tsx
  Footer.tsx
  ContactModal.tsx      — placeholder
  HelpModal.tsx         — keyboard shortcuts list
hooks/
  useKeyboardNav.ts     — global keydown handler
  useScrollSpy.ts       — IntersectionObserver for active nav state
data/
  projects.ts           — project list as data
  now.ts                — now-list rows as data
  info.ts               — info strip rows as data
```

Keep content as data (TypeScript objects in `data/`) so updating "now" or adding a project is one
diff in one file, not a markup change.

---

## what's not in scope yet

- `/archive` route for full project list
- Individual project detail pages
- Writing/blog (skipped intentionally for now)
- Help modal and contact modal content (placeholders only — wire up the trigger and an empty modal)
- Analytics
- Dark/light mode (the site is astrodark only — no theme switcher needed)

---

## quick start prompt for claude code

> read design-spec.md and implement the home page. start with `globals.css` for the theme tokens,
> then build the components in order: Nav, Hero (with NowList + InfoStrip subcomponents),
> SelectedWork (with ProjectCard), Footer. Wire up the keyboard navigation hook last. use Tailwind
> v4 utility classes where reasonable but use CSS variables directly when a Tailwind class would be
> awkward. keep content as TypeScript data in `data/`. don't build the modals yet — just stub the
> triggers.
