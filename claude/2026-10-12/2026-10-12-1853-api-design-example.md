# API design example backend

**Prompt:** Make a single TypeScript file showing off a backend, with notes at the top on API design
principles that apply in any language. The goal is to learn before hand-writing a Rust backend. No
dependencies; type errors don't matter.

**Done:**

- Added `backend/example-api.ts` (since moved to `docs/example-api.ts`): a zero-dependency "Tasks"
  REST API on `node:http`.
- The header lists 33 language-agnostic API design principles. The code goes config → domain → DTOs
  → typed errors/Result → parsing → repository → service → router/middleware → handlers →
  server/shutdown, with `RUST:` notes mapping each part to axum/serde/thiserror/sqlx.
- Smoke-tested with node and curl (health, 201 create, 422 with all field errors, pagination, 401).
