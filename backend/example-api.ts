// @ts-nocheck — reference file only. Excluded from type-checking so it can't break the Next.js build.
/**
 * ============================================================================================
 *  EXAMPLE BACKEND — a small "Tasks" REST API in plain TypeScript (Node built-ins only)
 * ============================================================================================
 *
 *  Run (Node 22.6+ can strip types natively):   node docs/example-api.ts
 *  Try:  curl -s localhost:8080/v1/health
 *        curl -s -X POST localhost:8080/v1/tasks -H 'Authorization: Bearer dev-token' \
 *             -H 'Content-Type: application/json' -H 'Idempotency-Key: abc123' \
 *             -d '{"title":"learn axum","priority":"high"}'
 *
 *  This file is a teaching reference. Every section maps onto how you'd build the same thing
 *  in Rust (axum + tokio + serde + thiserror + sqlx is the common stack). Look for "RUST:" notes.
 *
 * --------------------------------------------------------------------------------------------
 *  API DESIGN PRINCIPLES THAT APPLY IN EVERY LANGUAGE
 * --------------------------------------------------------------------------------------------
 *
 *  RESOURCES & URLS
 *   1. URLs name THINGS (nouns), HTTP methods are the VERBS.
 *        GET /tasks, POST /tasks, GET /tasks/{id}, PATCH /tasks/{id}, DELETE /tasks/{id}
 *      Not: POST /createTask, GET /getTaskById?id=1
 *   2. Plural collection names, lowercase, kebab-case for multi-word: /task-lists/{id}/tasks.
 *   3. Nest at most one level. /users/{id}/tasks is fine; /users/{id}/tasks/{id}/comments/{id}
 *      usually means the child should be top-level: /comments/{id}.
 *   4. Version from day one: /v1/... . Never break a published version — add fields, don't
 *      rename/remove them. Breaking change → /v2.
 *
 *  HTTP METHOD SEMANTICS
 *   5. GET is safe (no side effects) and cacheable. Never mutate state in a GET.
 *   6. PUT = full replace, idempotent. PATCH = partial update. POST = create / non-idempotent
 *      action. DELETE = idempotent (deleting twice → second is 404 or 204, both acceptable;
 *      pick one and document it).
 *   7. Make POST safely retryable with an `Idempotency-Key` header: same key → same response,
 *      no duplicate row. Networks fail; clients WILL retry.
 *
 *  STATUS CODES (use the right ones, consistently)
 *   200 OK (body) · 201 Created (+ Location header) · 204 No Content (no body)
 *   400 malformed request · 401 not authenticated · 403 authenticated but not allowed
 *   404 not found · 409 conflict (duplicate, version mismatch) · 412 precondition failed (ETag)
 *   413 body too large · 415 wrong content-type · 422 well-formed but invalid fields
 *   429 rate limited (+ Retry-After) · 500 our bug · 503 temporarily unavailable
 *   Rule: 4xx = client's fault, they should change the request. 5xx = our fault, retry may work.
 *
 *  ERRORS
 *   8. ONE error shape for the whole API. Clients should write one error handler, not fifty.
 *        { "error": { "code": "validation_failed", "message": "...", "details": [...],
 *                     "requestId": "..." } }
 *      `code` is a stable machine-readable string (clients switch on it). `message` is for
 *      humans and may change.
 *   9. Never leak internals: no stack traces, SQL, file paths, or "user exists" hints on login.
 *      Log the full error server-side, tagged with the requestId; return the requestId to the
 *      client so a bug report can be traced.
 *  10. Model errors as a closed set of TYPES, not ad-hoc strings thrown from anywhere.
 *      (RUST: an `enum AppError` with `impl IntoResponse` — this is where Rust shines.)
 *
 *  INPUT HANDLING
 *  11. "Parse, don't validate": at the boundary, turn untrusted JSON into a typed value or
 *      reject it. After that point the rest of the code can trust its inputs.
 *      (RUST: `#[derive(Deserialize)]` + a `TryFrom` / validator step.)
 *  12. Report ALL field errors at once, not just the first one.
 *  13. Reject unknown fields or ignore them — decide, document. (serde: deny_unknown_fields)
 *  14. Limit everything: body size, string lengths, page size, array lengths. Unbounded input
 *      is a denial-of-service waiting to happen.
 *
 *  RESPONSES
 *  15. Consistent naming (pick camelCase OR snake_case for JSON and never mix).
 *  16. Timestamps: ISO-8601 in UTC ("2026-10-12T18:53:00Z"). IDs: opaque strings (UUID/ULID),
 *      never sequential ints that leak your row count and invite enumeration.
 *  17. Separate your DB model from your API model (DTO). The API is a contract; the DB schema
 *      is an implementation detail you'll want to change freely.
 *  18. Lists are always paginated and wrapped: { "data": [...], "nextCursor": "..." }.
 *      A bare top-level array can never gain metadata later without a breaking change.
 *  19. Prefer cursor pagination over offset (stable under inserts, O(1) for the DB).
 *  20. Filtering/sorting via query params: ?status=open&sort=-createdAt&limit=20
 *
 *  CONCURRENCY & CACHING
 *  21. Optimistic concurrency: return an ETag (or `version` field); clients send If-Match on
 *      update; mismatch → 412. Prevents lost updates when two clients edit at once.
 *
 *  ARCHITECTURE
 *  22. Layer it:  transport (HTTP handlers) → service (business rules) → repository (storage).
 *      Handlers parse/serialize only. Services know nothing about HTTP. Repositories know
 *      nothing about business rules. This makes each part testable alone, and lets you swap
 *      in-memory storage for Postgres without touching logic.
 *      (RUST: repository as a `trait`, injected via axum `State<Arc<AppState>>`.)
 *  23. Dependency injection over globals — pass state in, don't reach out for it.
 *  24. Config from environment variables, validated at startup. Crash early if config is bad.
 *
 *  OPERATIONS
 *  25. Every request gets a request ID (accept incoming X-Request-Id or generate one), echoed
 *      in the response and attached to every log line. Structured (JSON) logs.
 *  26. Health endpoints: /health (liveness: process is up) vs /ready (dependencies OK).
 *  27. Timeouts on everything — incoming requests and outgoing calls (DB, other APIs).
 *  28. Graceful shutdown: on SIGTERM stop accepting, finish in-flight requests, then exit.
 *  29. Rate limit per client; return 429 with Retry-After.
 *
 *  SECURITY
 *  30. Authenticate in middleware, authorize in the service (does THIS user own THIS task?).
 *      Return 404 rather than 403 for other users' resources to avoid leaking existence.
 *  31. HTTPS only in production; secrets never in code or logs; constant-time compare tokens.
 *  32. CORS: allowlist specific origins, never `*` with credentials.
 *
 *  DOCUMENTATION
 *  33. The contract IS the product. Write an OpenAPI spec (RUST: `utoipa` generates one from
 *      your types). If it isn't documented, clients will depend on accidental behavior.
 * ============================================================================================
 */

import { createServer, type IncomingMessage, type ServerResponse } from "node:http";
import { randomUUID, timingSafeEqual, createHash } from "node:crypto";

// ============================================================================================
// 1. CONFIG — read once at startup, validated, then passed around (never read env ad-hoc).
//    RUST: a `Config` struct built in main() with `std::env::var`, or the `envy`/`config` crates.
// ============================================================================================

interface Config {
	port: number;
	apiToken: string;
	maxBodyBytes: number;
	requestTimeoutMs: number;
	rateLimitPerMinute: number;
}

function loadConfig(): Config {
	const port = Number(process.env.PORT ?? 8080);
	if (!Number.isInteger(port) || port <= 0) throw new Error(`invalid PORT: ${process.env.PORT}`);
	return {
		port,
		apiToken: process.env.API_TOKEN ?? "dev-token",
		maxBodyBytes: 64 * 1024,
		requestTimeoutMs: 10_000,
		rateLimitPerMinute: 120
	};
}

// ============================================================================================
// 2. DOMAIN MODEL — the internal representation. Not what we send over the wire.
//    RUST: plain structs + enums. `Priority` becomes `enum Priority { Low, Medium, High }`.
// ============================================================================================

const PRIORITIES = ["low", "medium", "high"] as const;
type Priority = (typeof PRIORITIES)[number];

const STATUSES = ["open", "done"] as const;
type Status = (typeof STATUSES)[number];

interface Task {
	id: string;
	ownerId: string;
	title: string;
	priority: Priority;
	status: Status;
	version: number; // bumps on every write — powers ETag / optimistic concurrency
	createdAt: Date;
	updatedAt: Date;
}

// ============================================================================================
// 3. API MODEL (DTOs) — the public contract. Separate from the domain model on purpose:
//    `ownerId` and `version` are internal and are NOT exposed here.
//    RUST: `#[derive(Serialize)] #[serde(rename_all = "camelCase")] struct TaskResponse { .. }`
//          plus `impl From<Task> for TaskResponse`.
// ============================================================================================

interface TaskResponse {
	id: string;
	title: string;
	priority: Priority;
	status: Status;
	createdAt: string; // ISO-8601 UTC
	updatedAt: string;
}

interface ListResponse<T> {
	data: T[];
	nextCursor: string | null;
}

function toResponse(t: Task): TaskResponse {
	return {
		id: t.id,
		title: t.title,
		priority: t.priority,
		status: t.status,
		createdAt: t.createdAt.toISOString(),
		updatedAt: t.updatedAt.toISOString()
	};
}

// ============================================================================================
// 4. ERRORS — a closed set of error kinds, each mapping to exactly one status + stable code.
//    RUST:
//      #[derive(thiserror::Error, Debug)]
//      enum AppError {
//          #[error("validation failed")] Validation(Vec<FieldError>),
//          #[error("not found")]         NotFound,
//          #[error("version conflict")]  PreconditionFailed,
//          #[error(transparent)]         Internal(#[from] anyhow::Error),
//          ...
//      }
//      impl IntoResponse for AppError { fn into_response(self) -> Response { ... } }
//    Then every handler returns `Result<Json<T>, AppError>` and you use `?` everywhere.
// ============================================================================================

interface FieldError {
	field: string;
	message: string;
}

type AppError =
	| { kind: "bad_request"; message: string }
	| { kind: "validation_failed"; details: FieldError[] }
	| { kind: "unauthorized" }
	| { kind: "not_found"; resource: string }
	| { kind: "conflict"; message: string }
	| { kind: "precondition_failed" }
	| { kind: "payload_too_large" }
	| { kind: "unsupported_media_type" }
	| { kind: "rate_limited"; retryAfterSec: number }
	| { kind: "internal"; cause: unknown }; // cause is LOGGED, never sent to the client

// Exhaustive mapping: if you add a new error kind and forget it here, TS (and rustc) yells.
function errorToHttp(e: AppError): { status: number; message: string; details?: FieldError[] } {
	switch (e.kind) {
		case "bad_request":
			return { status: 400, message: e.message };
		case "validation_failed":
			return { status: 422, message: "One or more fields are invalid.", details: e.details };
		case "unauthorized":
			return { status: 401, message: "Missing or invalid credentials." };
		case "not_found":
			return { status: 404, message: `${e.resource} not found.` };
		case "conflict":
			return { status: 409, message: e.message };
		case "precondition_failed":
			return { status: 412, message: "Resource was modified; refetch and retry." };
		case "payload_too_large":
			return { status: 413, message: "Request body too large." };
		case "unsupported_media_type":
			return { status: 415, message: "Content-Type must be application/json." };
		case "rate_limited":
			return { status: 429, message: "Too many requests." };
		case "internal":
			return { status: 500, message: "Internal server error." }; // generic on purpose
	}
}

// Result type instead of throwing for EXPECTED failures. Exceptions are for bugs.
// RUST: this is literally `Result<T, AppError>`.
type Result<T> = { ok: true; value: T } | { ok: false; error: AppError };
const Ok = <T>(value: T): Result<T> => ({ ok: true, value });
const Err = <T = never>(error: AppError): Result<T> => ({ ok: false, error });

// ============================================================================================
// 5. INPUT PARSING — "parse, don't validate". Untrusted `unknown` in, typed value or ALL
//    field errors out. Nothing past this layer ever sees raw JSON.
//    RUST: `#[derive(Deserialize)] #[serde(deny_unknown_fields)] struct CreateTask { .. }`
//          then a `validate()` (or the `validator` crate) for length/range rules.
// ============================================================================================

interface CreateTaskInput {
	title: string;
	priority: Priority;
}

// PATCH: every field optional. `undefined` = "don't touch".
interface UpdateTaskInput {
	title?: string;
	priority?: Priority;
	status?: Status;
}

const TITLE_MAX = 200;

function isObject(v: unknown): v is Record<string, unknown> {
	return typeof v === "object" && v !== null && !Array.isArray(v);
}

function checkUnknownFields(body: Record<string, unknown>, allowed: string[], errs: FieldError[]) {
	for (const key of Object.keys(body)) {
		if (!allowed.includes(key)) errs.push({ field: key, message: "unknown field" });
	}
}

function parseTitle(v: unknown, errs: FieldError[]): string | undefined {
	if (typeof v !== "string") return void errs.push({ field: "title", message: "must be a string" });
	const t = v.trim();
	if (t.length === 0) return void errs.push({ field: "title", message: "must not be empty" });
	if (t.length > TITLE_MAX)
		return void errs.push({ field: "title", message: `max ${TITLE_MAX} characters` });
	return t;
}

function parseEnum<T extends string>(
	field: string,
	v: unknown,
	allowed: readonly T[],
	errs: FieldError[]
): T | undefined {
	if (typeof v === "string" && (allowed as readonly string[]).includes(v)) return v as T;
	errs.push({ field, message: `must be one of: ${allowed.join(", ")}` });
}

function parseCreateTask(body: unknown): Result<CreateTaskInput> {
	if (!isObject(body)) return Err({ kind: "bad_request", message: "Body must be a JSON object." });
	const errs: FieldError[] = [];
	checkUnknownFields(body, ["title", "priority"], errs);
	const title = parseTitle(body.title, errs);
	// Defaults belong in ONE place and should be documented.
	const priority =
		body.priority === undefined ? "medium" : parseEnum("priority", body.priority, PRIORITIES, errs);
	if (errs.length) return Err({ kind: "validation_failed", details: errs }); // report ALL errors
	return Ok({ title: title!, priority: priority! });
}

function parseUpdateTask(body: unknown): Result<UpdateTaskInput> {
	if (!isObject(body)) return Err({ kind: "bad_request", message: "Body must be a JSON object." });
	const errs: FieldError[] = [];
	checkUnknownFields(body, ["title", "priority", "status"], errs);
	const out: UpdateTaskInput = {};
	if ("title" in body) out.title = parseTitle(body.title, errs);
	if ("priority" in body) out.priority = parseEnum("priority", body.priority, PRIORITIES, errs);
	if ("status" in body) out.status = parseEnum("status", body.status, STATUSES, errs);
	if (Object.keys(body).length === 0)
		errs.push({ field: "", message: "at least one field is required" });
	if (errs.length) return Err({ kind: "validation_failed", details: errs });
	return Ok(out);
}

interface ListQuery {
	status?: Status;
	limit: number;
	cursor?: string;
}

function parseListQuery(q: URLSearchParams): Result<ListQuery> {
	const errs: FieldError[] = [];
	const out: ListQuery = { limit: 20 };
	const status = q.get("status");
	if (status !== null) out.status = parseEnum("status", status, STATUSES, errs);
	const limit = q.get("limit");
	if (limit !== null) {
		const n = Number(limit);
		// Cap page size — never let a client ask for a million rows.
		if (!Number.isInteger(n) || n < 1 || n > 100)
			errs.push({ field: "limit", message: "must be an integer 1–100" });
		else out.limit = n;
	}
	out.cursor = q.get("cursor") ?? undefined;
	if (errs.length) return Err({ kind: "validation_failed", details: errs });
	return Ok(out);
}

// ============================================================================================
// 6. REPOSITORY — storage behind an interface. Business logic never knows if it's a Map,
//    Postgres, or a mock in a test.
//    RUST:
//      #[async_trait] trait TaskRepo: Send + Sync {
//          async fn insert(&self, t: Task) -> Result<(), AppError>;
//          async fn get(&self, owner: &str, id: &str) -> Result<Option<Task>, AppError>;
//          ...
//      }
//    In-memory impl: `RwLock<HashMap<String, Task>>`. Real impl: `sqlx::PgPool`.
// ============================================================================================

interface TaskRepo {
	insert(task: Task): Promise<void>;
	get(ownerId: string, id: string): Promise<Task | null>;
	update(task: Task): Promise<void>;
	delete(ownerId: string, id: string): Promise<boolean>;
	list(ownerId: string, q: ListQuery): Promise<{ items: Task[]; nextCursor: string | null }>;
}

class InMemoryTaskRepo implements TaskRepo {
	private tasks = new Map<string, Task>();

	async insert(task: Task) {
		this.tasks.set(task.id, structuredClone(task)); // clone: callers can't mutate storage
	}

	async get(ownerId: string, id: string) {
		const t = this.tasks.get(id);
		// Scope every query by owner — authorization at the data layer as defense in depth.
		return t && t.ownerId === ownerId ? structuredClone(t) : null;
	}

	async update(task: Task) {
		this.tasks.set(task.id, structuredClone(task));
	}

	async delete(ownerId: string, id: string) {
		const t = this.tasks.get(id);
		if (!t || t.ownerId !== ownerId) return false;
		return this.tasks.delete(id);
	}

	// Cursor pagination: cursor encodes the sort key of the last item seen. Opaque to clients
	// (base64) so you can change its contents later without breaking anyone.
	// SQL equivalent: WHERE (created_at, id) < ($1, $2) ORDER BY created_at DESC, id DESC LIMIT $3
	async list(ownerId: string, q: ListQuery) {
		let items = [...this.tasks.values()]
			.filter((t) => t.ownerId === ownerId && (!q.status || t.status === q.status))
			.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime() || b.id.localeCompare(a.id));

		if (q.cursor) {
			const [ts, id] = Buffer.from(q.cursor, "base64url").toString().split("|");
			const idx = items.findIndex((t) => t.createdAt.getTime() === Number(ts) && t.id === id);
			items = idx >= 0 ? items.slice(idx + 1) : [];
		}

		const page = items.slice(0, q.limit);
		const last = page.at(-1);
		const nextCursor =
			items.length > q.limit && last
				? Buffer.from(`${last.createdAt.getTime()}|${last.id}`).toString("base64url")
				: null;
		return { items: page.map((t) => structuredClone(t)), nextCursor };
	}
}

// ============================================================================================
// 7. SERVICE — business rules. Knows nothing about HTTP (no req/res, no status codes).
//    Could be called from a CLI, a queue worker, or a test just as easily.
//    RUST: `struct TaskService { repo: Arc<dyn TaskRepo> }` with async methods returning
//          `Result<Task, AppError>`.
// ============================================================================================

class TaskService {
	private repo: TaskRepo;
	constructor(repo: TaskRepo) {
		this.repo = repo;
	}

	async create(ownerId: string, input: CreateTaskInput): Promise<Result<Task>> {
		const now = new Date();
		const task: Task = {
			id: randomUUID(), // opaque, non-sequential ID
			ownerId,
			title: input.title,
			priority: input.priority,
			status: "open",
			version: 1,
			createdAt: now,
			updatedAt: now
		};
		await this.repo.insert(task);
		return Ok(task);
	}

	async get(ownerId: string, id: string): Promise<Result<Task>> {
		const t = await this.repo.get(ownerId, id);
		// Another user's task → 404, not 403. Don't confirm it exists.
		return t ? Ok(t) : Err({ kind: "not_found", resource: "Task" });
	}

	async update(
		ownerId: string,
		id: string,
		input: UpdateTaskInput,
		expectedVersion?: number
	): Promise<Result<Task>> {
		const found = await this.get(ownerId, id);
		if (!found.ok) return found;
		const t = found.value;

		if (expectedVersion !== undefined && expectedVersion !== t.version)
			return Err({ kind: "precondition_failed" });

		// Example business rule lives HERE, not in the handler.
		if (t.status === "done" && input.title !== undefined)
			return Err({ kind: "conflict", message: "Cannot rename a completed task." });

		const updated: Task = {
			...t,
			...Object.fromEntries(Object.entries(input).filter(([, v]) => v !== undefined)),
			version: t.version + 1,
			updatedAt: new Date()
		};
		await this.repo.update(updated);
		return Ok(updated);
	}

	async delete(ownerId: string, id: string): Promise<Result<void>> {
		return (await this.repo.delete(ownerId, id))
			? Ok(undefined)
			: Err({ kind: "not_found", resource: "Task" });
	}

	async list(ownerId: string, q: ListQuery) {
		return Ok(await this.repo.list(ownerId, q));
	}
}

// ============================================================================================
// 8. HTTP PLUMBING — the stuff axum/tower give you for free in Rust. Shown here so you can
//    see what a framework is actually doing.
// ============================================================================================

interface Ctx {
	req: IncomingMessage;
	res: ServerResponse;
	url: URL;
	params: Record<string, string>;
	requestId: string;
	userId?: string; // set by auth middleware
}

type Handler = (ctx: Ctx) => Promise<void>;

function sendJson(ctx: Ctx, status: number, body?: unknown, headers: Record<string, string> = {}) {
	ctx.res.writeHead(status, {
		...(body !== undefined && { "Content-Type": "application/json; charset=utf-8" }),
		"X-Request-Id": ctx.requestId,
		...headers
	});
	ctx.res.end(body === undefined ? undefined : JSON.stringify(body));
}

function sendError(ctx: Ctx, e: AppError) {
	const { status, message, details } = errorToHttp(e);
	if (e.kind === "internal") log("error", ctx.requestId, "internal error", { cause: String(e.cause) });
	const headers: Record<string, string> =
		e.kind === "rate_limited" ? { "Retry-After": String(e.retryAfterSec) } : {};
	// THE one error envelope used by every endpoint.
	sendJson(
		ctx,
		status,
		{ error: { code: e.kind, message, ...(details && { details }), requestId: ctx.requestId } },
		headers
	);
}

// Structured logs: one JSON object per line, always tagged with requestId.
// RUST: `tracing` + `tracing-subscriber` with JSON formatter; `#[instrument]` on handlers.
function log(level: string, requestId: string, msg: string, extra: object = {}) {
	console.log(JSON.stringify({ ts: new Date().toISOString(), level, requestId, msg, ...extra }));
}

// Read body with a hard size cap and content-type check.
// RUST: axum's `Json<T>` extractor + `DefaultBodyLimit` layer does all of this.
async function readJson(ctx: Ctx, maxBytes: number): Promise<Result<unknown>> {
	const ct = ctx.req.headers["content-type"] ?? "";
	if (!ct.startsWith("application/json")) return Err({ kind: "unsupported_media_type" });
	const chunks: Buffer[] = [];
	let size = 0;
	for await (const chunk of ctx.req) {
		size += chunk.length;
		if (size > maxBytes) return Err({ kind: "payload_too_large" });
		chunks.push(chunk);
	}
	try {
		return Ok(JSON.parse(Buffer.concat(chunks).toString("utf8")));
	} catch {
		return Err({ kind: "bad_request", message: "Malformed JSON." });
	}
}

// ETag = hash of id+version. Clients send it back in If-Match for safe updates.
const etagOf = (t: Task) => `"${createHash("sha1").update(`${t.id}:${t.version}`).digest("hex")}"`;

// --- Tiny router ----------------------------------------------------------------------------
// RUST: Router::new().route("/v1/tasks/:id", get(get_task).patch(update_task).delete(...))

interface Route {
	method: string;
	pattern: RegExp;
	keys: string[];
	handler: Handler;
	auth: boolean;
}

class Router {
	routes: Route[] = [];

	add(method: string, path: string, handler: Handler, opts = { auth: true }) {
		const keys: string[] = [];
		const pattern = new RegExp(
			"^" + path.replace(/:(\w+)/g, (_, k) => (keys.push(k), "([^/]+)")) + "/?$"
		);
		this.routes.push({ method, pattern, keys, handler, auth: opts.auth });
	}

	match(method: string, pathname: string) {
		let pathMatched = false;
		for (const r of this.routes) {
			const m = r.pattern.exec(pathname);
			if (!m) continue;
			pathMatched = true;
			if (r.method !== method) continue;
			const params = Object.fromEntries(r.keys.map((k, i) => [k, decodeURIComponent(m[i + 1])]));
			return { route: r, params };
		}
		// Path exists but wrong method → 405, not 404.
		return { route: null, methodNotAllowed: pathMatched };
	}
}

// --- Middleware -----------------------------------------------------------------------------
// RUST: tower layers — TraceLayer, TimeoutLayer, RequestIdLayer, a custom auth extractor.

// Constant-time token compare: prevents timing attacks that guess the token byte by byte.
function safeEqual(a: string, b: string) {
	const ab = Buffer.from(a), bb = Buffer.from(b);
	return ab.length === bb.length && timingSafeEqual(ab, bb);
}

// Fixed-window rate limiter per client. Production: token bucket in Redis, or `tower_governor`.
function makeRateLimiter(perMinute: number) {
	const windows = new Map<string, { start: number; count: number }>();
	return (clientKey: string): AppError | null => {
		const now = Date.now();
		const w = windows.get(clientKey);
		if (!w || now - w.start >= 60_000) {
			windows.set(clientKey, { start: now, count: 1 });
			return null;
		}
		if (++w.count > perMinute)
			return { kind: "rate_limited", retryAfterSec: Math.ceil((w.start + 60_000 - now) / 1000) };
		return null;
	};
}

// Idempotency: remember (user, key) → response for POSTs so retries don't create duplicates.
// Production: store in DB/Redis with a TTL (e.g. 24h), and also hash the request body so the
// same key with a DIFFERENT body is rejected with 422.
const idempotencyCache = new Map<string, { status: number; body: unknown; headers: Record<string, string> }>();

// ============================================================================================
// 9. HANDLERS — thin. Parse input → call service → map result to HTTP. That's it.
//    RUST:
//      async fn create_task(
//          State(app): State<Arc<AppState>>,
//          AuthUser(user): AuthUser,
//          Json(body): Json<CreateTask>,
//      ) -> Result<(StatusCode, HeaderMap, Json<TaskResponse>), AppError> { ... }
// ============================================================================================

function buildRouter(svc: TaskService, cfg: Config): Router {
	const r = new Router();

	// Liveness: "the process is running." No auth, no dependencies checked.
	r.add("GET", "/v1/health", async (ctx) => sendJson(ctx, 200, { status: "ok" }), { auth: false });

	// Readiness: "I can serve traffic" — would ping the DB here. Load balancers use this.
	r.add("GET", "/v1/ready", async (ctx) => sendJson(ctx, 200, { status: "ready" }), { auth: false });

	// GET /v1/tasks?status=open&limit=20&cursor=...
	r.add("GET", "/v1/tasks", async (ctx) => {
		const q = parseListQuery(ctx.url.searchParams);
		if (!q.ok) return sendError(ctx, q.error);
		const res = await svc.list(ctx.userId!, q.value);
		if (!res.ok) return sendError(ctx, res.error);
		const body: ListResponse<TaskResponse> = {
			data: res.value.items.map(toResponse),
			nextCursor: res.value.nextCursor
		};
		sendJson(ctx, 200, body);
	});

	// POST /v1/tasks  → 201 + Location header
	r.add("POST", "/v1/tasks", async (ctx) => {
		const idemKey = ctx.req.headers["idempotency-key"] as string | undefined;
		const cacheKey = idemKey && `${ctx.userId}:${idemKey}`;
		if (cacheKey && idempotencyCache.has(cacheKey)) {
			const cached = idempotencyCache.get(cacheKey)!;
			return sendJson(ctx, cached.status, cached.body, { ...cached.headers, "Idempotent-Replay": "true" });
		}

		const body = await readJson(ctx, cfg.maxBodyBytes);
		if (!body.ok) return sendError(ctx, body.error);
		const input = parseCreateTask(body.value);
		if (!input.ok) return sendError(ctx, input.error);

		const res = await svc.create(ctx.userId!, input.value);
		if (!res.ok) return sendError(ctx, res.error);

		const headers = { Location: `/v1/tasks/${res.value.id}`, ETag: etagOf(res.value) };
		const out = toResponse(res.value);
		if (cacheKey) idempotencyCache.set(cacheKey, { status: 201, body: out, headers });
		sendJson(ctx, 201, out, headers);
	});

	// GET /v1/tasks/:id
	r.add("GET", "/v1/tasks/:id", async (ctx) => {
		const res = await svc.get(ctx.userId!, ctx.params.id);
		if (!res.ok) return sendError(ctx, res.error);
		const etag = etagOf(res.value);
		// Conditional GET: client already has this version → 304, no body. Saves bandwidth.
		if (ctx.req.headers["if-none-match"] === etag) return sendJson(ctx, 304, undefined, { ETag: etag });
		sendJson(ctx, 200, toResponse(res.value), { ETag: etag });
	});

	// PATCH /v1/tasks/:id   (optional If-Match for optimistic concurrency)
	r.add("PATCH", "/v1/tasks/:id", async (ctx) => {
		const body = await readJson(ctx, cfg.maxBodyBytes);
		if (!body.ok) return sendError(ctx, body.error);
		const input = parseUpdateTask(body.value);
		if (!input.ok) return sendError(ctx, input.error);

		let expectedVersion: number | undefined;
		const ifMatch = ctx.req.headers["if-match"];
		if (ifMatch) {
			const current = await svc.get(ctx.userId!, ctx.params.id);
			if (!current.ok) return sendError(ctx, current.error);
			if (etagOf(current.value) !== ifMatch) return sendError(ctx, { kind: "precondition_failed" });
			expectedVersion = current.value.version;
		}

		const res = await svc.update(ctx.userId!, ctx.params.id, input.value, expectedVersion);
		if (!res.ok) return sendError(ctx, res.error);
		sendJson(ctx, 200, toResponse(res.value), { ETag: etagOf(res.value) });
	});

	// DELETE /v1/tasks/:id  → 204 No Content
	r.add("DELETE", "/v1/tasks/:id", async (ctx) => {
		const res = await svc.delete(ctx.userId!, ctx.params.id);
		if (!res.ok) return sendError(ctx, res.error);
		sendJson(ctx, 204);
	});

	return r;
}

// ============================================================================================
// 10. SERVER + MIDDLEWARE PIPELINE + GRACEFUL SHUTDOWN
//     RUST:
//       let app = Router::new()...
//           .layer(TraceLayer::new_for_http())
//           .layer(TimeoutLayer::new(Duration::from_secs(10)))
//           .with_state(state);
//       axum::serve(listener, app).with_graceful_shutdown(shutdown_signal()).await?;
// ============================================================================================

function main() {
	const cfg = loadConfig(); // crash at startup if misconfigured — not on the first request

	// Dependency wiring ("composition root"). Swap InMemoryTaskRepo → PostgresTaskRepo here
	// and nothing else changes.
	const repo = new InMemoryTaskRepo();
	const svc = new TaskService(repo);
	const router = buildRouter(svc, cfg);
	const rateLimit = makeRateLimiter(cfg.rateLimitPerMinute);

	const server = createServer(async (req, res) => {
		const started = performance.now();
		const url = new URL(req.url ?? "/", "http://localhost");
		// Accept an upstream request id (from a load balancer / other service) or make one.
		const incomingId = req.headers["x-request-id"];
		const requestId = typeof incomingId === "string" && incomingId.length <= 128 ? incomingId : randomUUID();
		const ctx: Ctx = { req, res, url, params: {}, requestId };

		res.on("finish", () =>
			log("info", requestId, "request", {
				method: req.method,
				path: url.pathname, // log the path, NOT the query (may contain secrets/PII)
				status: res.statusCode,
				durationMs: Math.round(performance.now() - started),
				userId: ctx.userId
			})
		);

		try {
			const limited = rateLimit(req.socket.remoteAddress ?? "unknown");
			if (limited) return sendError(ctx, limited);

			const m = router.match(req.method ?? "GET", url.pathname);
			if (!m.route) {
				return m.methodNotAllowed
					? sendJson(ctx, 405, { error: { code: "method_not_allowed", message: "Method not allowed.", requestId } })
					: sendError(ctx, { kind: "not_found", resource: "Route" });
			}
			ctx.params = m.params;

			if (m.route.auth) {
				// Authentication (who are you?) happens here. Authorization (may you touch THIS
				// task?) happens in the service/repo via ownerId scoping.
				// Real world: verify a JWT or look up a session; here one token = one demo user.
				const header = req.headers.authorization ?? "";
				const token = header.startsWith("Bearer ") ? header.slice(7) : "";
				if (!safeEqual(token, cfg.apiToken)) return sendError(ctx, { kind: "unauthorized" });
				ctx.userId = "user_demo";
			}

			await m.route.handler(ctx);
		} catch (cause) {
			// Last line of defense: an unexpected throw is a BUG → 500 with a generic message,
			// full details only in the logs. The server stays up.
			// RUST: a panic-catching layer (`CatchPanicLayer`); but mostly `?` + AppError::Internal.
			if (!res.headersSent) sendError(ctx, { kind: "internal", cause });
			else res.destroy();
		}
	});

	// Timeouts: a slow or malicious client can't hold a connection forever.
	server.requestTimeout = cfg.requestTimeoutMs;
	server.headersTimeout = cfg.requestTimeoutMs;

	server.listen(cfg.port, () => log("info", "-", `listening on :${cfg.port}`));

	// Graceful shutdown: stop accepting new connections, let in-flight requests finish,
	// close DB pools, then exit. Force-exit if it takes too long.
	const shutdown = (signal: string) => {
		log("info", "-", `received ${signal}, shutting down`);
		server.close(() => {
			log("info", "-", "shutdown complete");
			process.exit(0);
		});
		server.closeIdleConnections();
		setTimeout(() => process.exit(1), 10_000).unref();
	};
	process.on("SIGTERM", () => shutdown("SIGTERM"));
	process.on("SIGINT", () => shutdown("SIGINT"));
}

main();
