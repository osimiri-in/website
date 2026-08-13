-- Projects table for the dynamic Projects manager in the Catalog tool.
-- Run this once in the Supabase SQL editor.

create table if not exists projects (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  slug text unique not null,
  location text,
  type text,
  description text,
  hero_image text,
  slides text[] default '{}',
  featured boolean default false,
  sort_order int default 0,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

alter table projects enable row level security;

-- Public site can read published projects; writes go through the service role.
drop policy if exists "public_read_projects" on projects;
create policy "public_read_projects" on projects for select to anon using (true);
