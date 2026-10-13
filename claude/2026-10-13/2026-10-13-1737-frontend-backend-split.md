# Frontend/backend monorepo split

**Prompt:** Move the Next.js app into `frontend/`, update the deploy workflow, then run
`cargo new backend`.

**Done:**

- `git mv`'d the Next.js app (`src`, `public`, configs, `package*.json`, `.npmrc`, Prettier files,
  `design_spec.md`) into `frontend/`. Left `CLAUDE.md`, `README.md`, `todo.txt`, `claude/`,
  `_config.yml`, `.vscode/`, `.github/` at the root.
- Moved the TS reference backend to `docs/example-api.ts` so `backend/` was free for Cargo.
- `deploy.yml`: `working-directory: frontend`, npm cache keyed on `frontend/package-lock.json`,
  artifact path `frontend/build`, and a `paths` filter so it only runs on frontend/workflow changes.
- `.gitignore`: `/build` and `/out` → `/frontend/build` and `/frontend/out`.
- Updated `CLAUDE.md` with the new repo layout.
- Verified `npm ci && npm run build` in `frontend/` succeeds.
- Ran `cargo new backend`.
