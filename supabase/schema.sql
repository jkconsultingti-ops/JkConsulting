-- ================================================================
-- JK Consulting — Supabase Schema
-- Execute no SQL Editor do seu projeto Supabase
-- ================================================================

-- Habilitar extensões
create extension if not exists "uuid-ossp";

-- ----------------------------------------------------------------
-- PROFILES (espelho de auth.users com papel e dados extras)
-- ----------------------------------------------------------------
create table public.profiles (
  id          uuid primary key references auth.users(id) on delete cascade,
  name        text,
  email       text,
  phone       text,
  role        text not null check (role in ('admin', 'client', 'partner')) default 'client',
  active      boolean not null default true,
  created_at  timestamptz not null default now()
);

-- Trigger: cria profile automaticamente quando um user é criado no Supabase Auth
create or replace function public.handle_new_user()
returns trigger language plpgsql security definer as $$
begin
  insert into public.profiles (id, name, email, role)
  values (
    new.id,
    new.raw_user_meta_data->>'name',
    new.email,
    coalesce(new.raw_user_meta_data->>'role', 'client')
  );
  return new;
end;
$$;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- ----------------------------------------------------------------
-- PROJECTS
-- ----------------------------------------------------------------
create table public.projects (
  id          uuid primary key default uuid_generate_v4(),
  client_id   uuid not null references public.profiles(id) on delete cascade,
  name        text not null,
  description text,
  status      text not null check (status in ('not_started','in_progress','in_review','completed')) default 'not_started',
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now()
);

-- ----------------------------------------------------------------
-- DOCUMENTS
-- ----------------------------------------------------------------
create table public.documents (
  id          uuid primary key default uuid_generate_v4(),
  client_id   uuid not null references public.profiles(id) on delete cascade,
  project     text not null,
  name        text not null,
  path        text not null,  -- path no Supabase Storage bucket "client-documents"
  size        bigint not null default 0,
  created_at  timestamptz not null default now()
);

-- ----------------------------------------------------------------
-- INVOICES
-- ----------------------------------------------------------------
create table public.invoices (
  id          uuid primary key default uuid_generate_v4(),
  client_id   uuid not null references public.profiles(id) on delete cascade,
  number      text not null unique,
  description text not null,
  amount      numeric(12,2) not null,
  status      text not null check (status in ('sent','paid','overdue')) default 'sent',
  due_date    date not null,
  pdf_path    text,  -- path no Supabase Storage bucket "invoices"
  created_at  timestamptz not null default now()
);

-- ----------------------------------------------------------------
-- MESSAGE THREADS
-- ----------------------------------------------------------------
create table public.message_threads (
  id           uuid primary key default uuid_generate_v4(),
  client_id    uuid not null references public.profiles(id) on delete cascade,
  project_id   uuid references public.projects(id),
  project_name text not null,
  last_message text,
  updated_at   timestamptz not null default now()
);

-- ----------------------------------------------------------------
-- MESSAGES
-- ----------------------------------------------------------------
create table public.messages (
  id          uuid primary key default uuid_generate_v4(),
  thread_id   uuid not null references public.message_threads(id) on delete cascade,
  sender_id   uuid not null references public.profiles(id),
  sender_name text not null,
  content     text not null,
  created_at  timestamptz not null default now()
);

-- Trigger: atualiza last_message na thread
create or replace function public.update_thread_last_message()
returns trigger language plpgsql as $$
begin
  update public.message_threads
  set last_message = new.content, updated_at = now()
  where id = new.thread_id;
  return new;
end;
$$;

create trigger on_message_insert
  after insert on public.messages
  for each row execute function public.update_thread_last_message();

-- ----------------------------------------------------------------
-- LEADS (submetidos por parceiros)
-- ----------------------------------------------------------------
create table public.leads (
  id             uuid primary key default uuid_generate_v4(),
  partner_id     uuid not null references public.profiles(id) on delete cascade,
  company_name   text not null,
  contact_name   text not null,
  contact_email  text not null,
  contact_phone  text,
  notes          text,
  status         text not null check (status in ('submitted','contacted','proposal_sent','won','lost')) default 'submitted',
  created_at     timestamptz not null default now()
);

-- ----------------------------------------------------------------
-- COMMISSIONS
-- ----------------------------------------------------------------
create table public.commissions (
  id           uuid primary key default uuid_generate_v4(),
  partner_id   uuid not null references public.profiles(id) on delete cascade,
  lead_id      uuid references public.leads(id),
  lead_company text not null,
  amount       numeric(12,2) not null,
  status       text not null check (status in ('pending','approved','paid')) default 'pending',
  created_at   timestamptz not null default now()
);

-- ----------------------------------------------------------------
-- TICKETS
-- ----------------------------------------------------------------
create table public.tickets (
  id          uuid primary key default uuid_generate_v4(),
  partner_id  uuid not null references public.profiles(id) on delete cascade,
  number      text not null unique,
  title       text not null,
  description text not null,
  category    text not null check (category in ('technical','commercial','commission','collaboration','other')),
  priority    text not null check (priority in ('low','medium','high')) default 'medium',
  status      text not null check (status in ('open','in_progress','waiting','resolved','closed')) default 'open',
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now()
);

-- ----------------------------------------------------------------
-- PARTNER RESOURCES (materiais para download)
-- ----------------------------------------------------------------
create table public.partner_resources (
  id          uuid primary key default uuid_generate_v4(),
  name        text not null,
  description text,
  path        text not null,  -- path no Supabase Storage bucket "partner-resources"
  type        text not null,  -- ex: pdf, pptx
  size        bigint not null default 0,
  created_at  timestamptz not null default now()
);

-- ================================================================
-- ROW LEVEL SECURITY
-- ================================================================

alter table public.profiles           enable row level security;
alter table public.projects           enable row level security;
alter table public.documents          enable row level security;
alter table public.invoices           enable row level security;
alter table public.message_threads    enable row level security;
alter table public.messages           enable row level security;
alter table public.leads              enable row level security;
alter table public.commissions        enable row level security;
alter table public.tickets            enable row level security;
alter table public.partner_resources  enable row level security;

-- Helper: verifica papel do usuário logado
create or replace function public.get_user_role()
returns text language sql security definer stable as $$
  select role from public.profiles where id = auth.uid();
$$;

-- PROFILES
create policy "users_own_profile" on public.profiles
  for all using (id = auth.uid());
create policy "admin_all_profiles" on public.profiles
  for all using (get_user_role() = 'admin');

-- PROJECTS
create policy "client_own_projects" on public.projects
  for select using (client_id = auth.uid());
create policy "admin_all_projects" on public.projects
  for all using (get_user_role() = 'admin');

-- DOCUMENTS
create policy "client_own_docs" on public.documents
  for select using (client_id = auth.uid());
create policy "admin_all_docs" on public.documents
  for all using (get_user_role() = 'admin');

-- INVOICES
create policy "client_own_invoices" on public.invoices
  for select using (client_id = auth.uid());
create policy "admin_all_invoices" on public.invoices
  for all using (get_user_role() = 'admin');

-- THREADS
create policy "client_own_threads" on public.message_threads
  for select using (client_id = auth.uid());
create policy "admin_all_threads" on public.message_threads
  for all using (get_user_role() = 'admin');

-- MESSAGES
create policy "thread_participants_messages" on public.messages
  for all using (
    sender_id = auth.uid()
    or exists (
      select 1 from public.message_threads t
      where t.id = thread_id and (t.client_id = auth.uid() or get_user_role() = 'admin')
    )
  );

-- LEADS
create policy "partner_own_leads" on public.leads
  for all using (partner_id = auth.uid());
create policy "admin_all_leads" on public.leads
  for all using (get_user_role() = 'admin');

-- COMMISSIONS
create policy "partner_own_commissions" on public.commissions
  for select using (partner_id = auth.uid());
create policy "admin_all_commissions" on public.commissions
  for all using (get_user_role() = 'admin');

-- TICKETS
create policy "partner_own_tickets" on public.tickets
  for all using (partner_id = auth.uid());
create policy "admin_all_tickets" on public.tickets
  for all using (get_user_role() = 'admin');

-- PARTNER RESOURCES (qualquer parceiro autenticado pode ler)
create policy "partners_read_resources" on public.partner_resources
  for select using (get_user_role() in ('partner', 'admin'));
create policy "admin_manage_resources" on public.partner_resources
  for all using (get_user_role() = 'admin');

-- ================================================================
-- STORAGE BUCKETS (criar manualmente no painel do Supabase)
-- ================================================================
-- 1. "client-documents" — private, RLS ativa (admin upload, client download)
-- 2. "invoices"         — private, RLS ativa (admin upload, client download)
-- 3. "partner-resources"— private, RLS ativa (admin upload, partner download)
