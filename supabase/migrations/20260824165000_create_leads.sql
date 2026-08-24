create table if not exists public.leads (
  id uuid primary key default gen_random_uuid(),
  name text not null check (char_length(trim(name)) between 1 and 120),
  email text not null check (char_length(trim(email)) between 3 and 320),
  whatsapp text not null check (char_length(trim(whatsapp)) between 8 and 40),
  source text not null default 'guia_glass_skin',
  consent_marketing boolean not null default true,
  created_at timestamptz not null default now()
);

create index if not exists leads_created_at_idx on public.leads (created_at desc);
create index if not exists leads_email_idx on public.leads (lower(email));

alter table public.leads enable row level security;

revoke all on table public.leads from anon, authenticated;
grant insert on table public.leads to anon, authenticated;

drop policy if exists "public can submit ebook leads" on public.leads;
create policy "public can submit ebook leads"
on public.leads
for insert
to anon, authenticated
with check (
  source = 'guia_glass_skin'
  and consent_marketing = true
  and char_length(trim(name)) between 1 and 120
  and char_length(trim(email)) between 3 and 320
  and char_length(trim(whatsapp)) between 8 and 40
);

comment on table public.leads is
  'Contatos captados pelo guia Glass Skin no site da Areum.';

