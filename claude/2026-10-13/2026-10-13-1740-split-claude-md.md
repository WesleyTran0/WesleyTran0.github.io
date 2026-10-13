# Split CLAUDE.md

**Prompt:** Create a separate `CLAUDE.md` for the frontend and move the frontend-specific guidance
out of the root `CLAUDE.md`.

**Done:**

- New `frontend/CLAUDE.md`: stack, npm commands, static-export constraints, architecture (markdown
  content, routing, PageShell/keyboard nav), styling conventions, and Prettier rules.
- Root `CLAUDE.md` now only has the project overview, repo layout (pointing to `frontend/CLAUDE.md`),
  the deployment overview, `todo.txt` convention, and `claude/` prompt logging.
