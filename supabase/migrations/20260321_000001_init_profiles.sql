-- SOS Vidas (Nexus Automação)
-- Etapa 3: schema inicial do projeto no Supabase FUNIL_IA

create extension if not exists pgcrypto;

create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = timezone('utc'::text, now());
  return new;
end;
$$;

create table if not exists public.profiles (
  id uuid primary key references auth.users (id) on delete cascade,
  nome_completo text not null,
  cpf text not null unique,
  email text not null,
  cep text not null,
  logradouro text not null,
  numero text not null,
  bairro text not null,
  cidade text not null,
  estado text not null,
  is_subscribed boolean not null default false,
  kiwify_subscriber_id text,
  subscription_status text,
  created_at timestamptz not null default timezone('utc'::text, now()),
  updated_at timestamptz not null default timezone('utc'::text, now()),
  constraint profiles_subscription_status_check
    check (subscription_status is null or subscription_status in ('active', 'canceled', 'past_due', 'pending'))
);

create index if not exists idx_profiles_email on public.profiles (email);
create index if not exists idx_profiles_subscription_status on public.profiles (subscription_status);
create index if not exists idx_profiles_is_subscribed on public.profiles (is_subscribed);

create trigger set_profiles_updated_at
before update on public.profiles
for each row
execute function public.set_updated_at();

alter table public.profiles enable row level security;

create policy "profiles_select_own"
on public.profiles
for select
using (auth.uid() = id);

create policy "profiles_update_own"
on public.profiles
for update
using (auth.uid() = id)
with check (auth.uid() = id);

create policy "profiles_insert_own"
on public.profiles
for insert
to authenticated
with check (auth.uid() = id);

comment on table public.profiles is 'Perfil principal do usuário do app SOS Vidas.';
comment on column public.profiles.is_subscribed is 'Controle principal de acesso liberado por assinatura.';
comment on column public.profiles.subscription_status is 'active, canceled, past_due ou pending.';
