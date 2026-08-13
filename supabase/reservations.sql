-- Run this in the Supabase SQL editor (Project → SQL → New query).
-- Uses a reservations table (not auth.users) so it will not clash with Supabase Auth.

create table if not exists public.reservations (
  id uuid primary key default gen_random_uuid(),
  first_name text not null,
  last_name text,
  email text not null,
  phone text not null,
  age integer not null check (age between 1 and 120),
  city text not null,
  interest text not null,
  speak_about text,
  consent boolean not null default false,
  masterclass_topic text,
  created_at timestamptz not null default now()
);

create index if not exists reservations_created_at_idx
  on public.reservations (created_at desc);

alter table public.reservations enable row level security;

drop policy if exists "Anyone can submit a reservation" on public.reservations;
create policy "Anyone can submit a reservation"
  on public.reservations
  for insert
  to anon, authenticated
  with check (
    char_length(trim(first_name)) > 0
    and char_length(trim(email)) > 3
    and char_length(trim(phone)) >= 10
    and char_length(trim(city)) > 0
    and consent = true
  );

-- No SELECT / UPDATE / DELETE policies for anon.
-- Visitors can submit; they cannot read other people's records.
-- View submissions in the Table Editor while logged in as the project owner.
