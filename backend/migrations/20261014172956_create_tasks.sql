create table tasks (
    id uuid primary key default gen_random_uuid(),
    user_id uuid not null references users(id) on delete cascade,
    title text not null check (length(title) between 1 and 200),
    done boolean not null default false,
    due_at timestamptz,
    created_at timestamptz not null default now()
);

create index tasks_user_id_idx on tasks (user_id);

