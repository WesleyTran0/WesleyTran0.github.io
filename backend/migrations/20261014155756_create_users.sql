create extension if not exists citext;

create table users (
    id uuid primary key default gen_random_uuid(),
    email citext not null unique,
    password_hash text not null,
    email_verified boolean not null default false,
    created_at timestamptz not null default now()
);

create table email_verifications (
    token_hash text primary key,
    user_id uuid not null references users(id) on delete cascade,
    expires_at timestamptz not null
);

create table sessions (
    token_hash text primary key,
    user_id uuid not null references users(id) on delete cascade,
    expires_at timestamptz not null
);
