create table if not exists public.army_applications (
  id uuid primary key default gen_random_uuid(),
  name text not null check (char_length(trim(name)) between 2 and 120),
  whatsapp text not null check (char_length(regexp_replace(whatsapp, '\\D', '', 'g')) between 10 and 15),
  city text not null check (char_length(trim(city)) between 2 and 120),
  state text not null check (state ~ '^[A-Z]{2}$'),
  channels text[] not null check (
    cardinality(channels) between 1 and 6
    and channels <@ array['Instagram', 'TikTok', 'WhatsApp', 'Clientes', 'Amigos', 'Outros']::text[]
  ),
  instagram text check (instagram is null or char_length(trim(instagram)) <= 120),
  tiktok text check (tiktok is null or char_length(trim(tiktok)) <= 120),
  other_channel text check (other_channel is null or char_length(trim(other_channel)) <= 160),
  motivation text not null check (char_length(trim(motivation)) between 8 and 600),
  source text not null default 'areum_army' check (source = 'areum_army'),
  consent_privacy boolean not null check (consent_privacy = true),
  utm jsonb not null default '{}'::jsonb,
  status text not null default 'pending' check (status in ('pending', 'approved', 'declined')),
  created_at timestamptz not null default now()
);

create index if not exists army_applications_created_at_idx
  on public.army_applications (created_at desc);

alter table public.army_applications enable row level security;

revoke all on table public.army_applications from anon, authenticated;
grant insert on table public.army_applications to anon, authenticated;

drop policy if exists "public can submit army applications" on public.army_applications;
create policy "public can submit army applications"
on public.army_applications
for insert
to anon, authenticated
with check (
  source = 'areum_army'
  and status = 'pending'
  and consent_privacy = true
  and cardinality(channels) between 1 and 6
);

comment on table public.army_applications is
  'Candidaturas submetidas pelo formulario publico da AREUM ARMY.';
