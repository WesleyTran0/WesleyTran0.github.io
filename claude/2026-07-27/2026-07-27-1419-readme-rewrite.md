# README rewrite + claude/ log convention

**Prompt:** Rewrite the README for the Next.js site. Establish a logging convention: on changes and
commits, write a per-prompt overview into `claude/<date>/<date>-<time>-<3-word-desc>.md`.

## What I did

- Rewrote **`README.md`** from stale SvelteKit boilerplate to describe the actual Next.js 15 site:
  stack, dev/build scripts, how to add project/blog markdown content, and GitHub Pages deployment.
- Marked the README `+bug` item done in **`todo.txt`** (`x 2026-07-27 ...`).
- Established the **`claude/` prompt-log convention** — added it to `CLAUDE.md` and created this
  folder (`claude/2026-07-27/`), including a retroactive entry for the previous prompt.

## Notes

- Log file naming: `claude/<YYYY-MM-DD>/<YYYY-MM-DD>-<HHMM>-<short-desc>.md`.
