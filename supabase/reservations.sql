-- Paste into the Supabase SQL editor and click Run.
-- Project → SQL → New query
-- https://supabase.com/dashboard/project/buntgvxzvryixnyrolcn/sql/new

create table if not exists public.reservations (
  id uuid primary key default gen_random_uuid(),
  first_name text not null,
  last_name text,
  email text not null,
  phone text not null,
  age integer not null,
  city text not null,
  interest text not null,
  speak_about text,
  consent boolean not null default false,
  masterclass_topic text,
  created_at timestamptz not null default now()
);

alter table public.reservations add column if not exists first_name text;
alter table public.reservations add column if not exists last_name text;
alter table public.reservations add column if not exists email text;
alter table public.reservations add column if not exists phone text;
alter table public.reservations add column if not exists age integer;
alter table public.reservations add column if not exists city text;
alter table public.reservations add column if not exists interest text;
alter table public.reservations add column if not exists speak_about text;
alter table public.reservations add column if not exists consent boolean not null default false;
alter table public.reservations add column if not exists masterclass_topic text;
alter table public.reservations add column if not exists created_at timestamptz not null default now();

create index if not exists reservations_created_at_idx
  on public.reservations (created_at desc);

grant usage on schema public to anon, authenticated;
grant insert on table public.reservations to anon, authenticated;
revoke select, update, delete on table public.reservations from anon, authenticated;

alter table public.reservations enable row level security;
alter table public.reservations force row level security;

do $$
declare
  rec record;
begin
  for rec in
    select policyname
    from pg_policies
    where schemaname = 'public'
      and tablename = 'reservations'
      and cmd = 'INSERT'
  loop
    execute format(
      'drop policy if exists %I on public.reservations',
      rec.policyname
    );
  end loop;
end $$;

create policy "Anyone can submit a reservation"
  on public.reservations
  for insert
  to anon, authenticated
  with check (
    char_length(trim(first_name)) > 0
    and char_length(trim(email)) > 3
    and char_length(trim(phone)) >= 10
    and char_length(trim(city)) > 0
    and consent is true
  );

notify pgrst, 'reload schema';
