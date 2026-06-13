create extension if not exists pgcrypto;

create table if not exists general_enquiries (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  phone text not null,
  email text,
  city text,
  requirement text,
  source_page text,
  created_at timestamptz default now()
);

create table if not exists custom_enquiries (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  phone text not null,
  email text,
  city text,
  project_type text,
  brief text,
  created_at timestamptz default now()
);

create table if not exists architect_enquiries (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  firm_name text,
  phone text not null,
  email text,
  city text,
  project_type text,
  project_scale text,
  created_at timestamptz default now()
);

create table if not exists contact_leads (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  phone text not null,
  email text,
  city text,
  message text,
  created_at timestamptz default now()
);

create table if not exists experience_appointments (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  phone text not null,
  email text,
  preferred_date date,
  time_slot text,
  message text,
  created_at timestamptz default now()
);

create table if not exists newsletter (
  id uuid primary key default gen_random_uuid(),
  email text unique not null,
  created_at timestamptz default now()
);

alter table general_enquiries enable row level security;
alter table custom_enquiries enable row level security;
alter table architect_enquiries enable row level security;
alter table contact_leads enable row level security;
alter table experience_appointments enable row level security;
alter table newsletter enable row level security;

create policy "anon_insert_general_enquiries" on general_enquiries for insert to anon with check (true);
create policy "anon_insert_custom_enquiries" on custom_enquiries for insert to anon with check (true);
create policy "anon_insert_architect_enquiries" on architect_enquiries for insert to anon with check (true);
create policy "anon_insert_contact_leads" on contact_leads for insert to anon with check (true);
create policy "anon_insert_experience_appointments" on experience_appointments for insert to anon with check (true);
create policy "anon_insert_newsletter" on newsletter for insert to anon with check (true);
