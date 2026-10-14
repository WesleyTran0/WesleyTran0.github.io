# Untrack backend/target

**Prompt:** Stop tracking `backend/target` in git; also asked whether `models.rs` + `models/` is a
good place to define the backend's database schema (answered in chat, no code changes).

**Done:**
- Added `/backend/target` to the root `.gitignore` under a `# Rust` section.
- Ran `git rm -r --cached backend/target` (34 files removed from the index, still on disk).
  Not committed.
