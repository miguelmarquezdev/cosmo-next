create extension if not exists "uuid-ossp";
do $$ begin create type public.user_role as enum ('admin','staff','client'); exception when duplicate_object then null; end $$;
do $$ begin create type public.lead_status as enum ('new','contacted','qualified','quoted','negotiation','won','lost'); exception when duplicate_object then null; end $$;
create table if not exists public.profiles(id uuid primary key references auth.users(id) on delete cascade,full_name text,phone text,company text,role user_role not null default 'client',avatar_url text,created_at timestamptz default now());
create table if not exists public.leads(id uuid primary key default uuid_generate_v4(),user_id uuid references auth.users(id) on delete set null,name text not null,email text not null,phone text,company text,service text not null,website text,goals text,contact_preference text,source text default 'website',status lead_status default 'new',assigned_to uuid references public.profiles(id),created_at timestamptz default now());
create table if not exists public.services(id uuid primary key default uuid_generate_v4(),name text not null,slug text unique not null,description text,active boolean default true);
create table if not exists public.quotes(id uuid primary key default uuid_generate_v4(),lead_id uuid references public.leads(id),client_id uuid references public.profiles(id),number text unique not null,title text not null,currency text default 'PEN',subtotal numeric default 0,tax numeric default 0,total numeric default 0,status text default 'draft',valid_until date,notes text,created_at timestamptz default now());
create table if not exists public.projects(id uuid primary key default uuid_generate_v4(),client_id uuid references public.profiles(id),quote_id uuid references public.quotes(id),service_id uuid references public.services(id),name text not null,status text default 'planning',progress integer default 0 check(progress between 0 and 100),start_date date,due_date date,manager_id uuid references public.profiles(id),created_at timestamptz default now());
create table if not exists public.tasks(id uuid primary key default uuid_generate_v4(),project_id uuid references public.projects(id) on delete cascade,title text not null,description text,status text default 'todo',priority text default 'medium',assigned_to uuid references public.profiles(id),due_date date,created_at timestamptz default now());
create table if not exists public.messages(id uuid primary key default uuid_generate_v4(),project_id uuid references public.projects(id) on delete cascade,sender_id uuid references public.profiles(id),body text not null,created_at timestamptz default now());
create table if not exists public.blog_posts(id uuid primary key default uuid_generate_v4(),title text not null,slug text unique not null,excerpt text,content_md text,content_json jsonb,cover_url text,status text default 'draft',author_id uuid references public.profiles(id),published_at timestamptz,created_at timestamptz default now());
create or replace function public.handle_new_user() returns trigger language plpgsql security definer set search_path=public as $$
begin
  insert into public.profiles(id,full_name,phone,company,avatar_url)
  values(new.id,new.raw_user_meta_data->>'full_name',new.raw_user_meta_data->>'phone',new.raw_user_meta_data->>'company',coalesce(new.raw_user_meta_data->>'avatar_url',new.raw_user_meta_data->>'picture'))
  on conflict(id) do update set avatar_url=coalesce(excluded.avatar_url,public.profiles.avatar_url);
  if coalesce(new.raw_user_meta_data->>'lead_service','') <> '' then
    insert into public.leads(user_id,name,email,phone,company,service,website,goals,contact_preference)
    values(new.id,coalesce(new.raw_user_meta_data->>'full_name',new.email),new.email,new.raw_user_meta_data->>'phone',new.raw_user_meta_data->>'company',new.raw_user_meta_data->>'lead_service',new.raw_user_meta_data->>'lead_website',new.raw_user_meta_data->>'lead_goals',new.raw_user_meta_data->>'lead_contact_preference');
  end if;
  return new;
end; $$;
drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created after insert on auth.users for each row execute procedure public.handle_new_user();
create or replace function public.is_admin() returns boolean language sql stable security definer set search_path=public as $$select exists(select 1 from public.profiles where id=auth.uid() and role in('admin','staff'))$$;
alter table public.profiles enable row level security;alter table public.leads enable row level security;alter table public.quotes enable row level security;alter table public.projects enable row level security;alter table public.tasks enable row level security;alter table public.messages enable row level security;alter table public.blog_posts enable row level security;
drop policy if exists "lead insert" on public.leads;create policy "lead insert" on public.leads for insert to anon,authenticated with check(true);
drop policy if exists "lead own select" on public.leads;create policy "lead own select" on public.leads for select to authenticated using(user_id=auth.uid() or public.is_admin());
drop policy if exists "profile own" on public.profiles;create policy "profile own" on public.profiles for select to authenticated using(id=auth.uid() or public.is_admin());
drop policy if exists "projects own" on public.projects;create policy "projects own" on public.projects for select to authenticated using(client_id=auth.uid() or public.is_admin());
drop policy if exists "admin leads" on public.leads;create policy "admin leads" on public.leads for all to authenticated using(public.is_admin()) with check(public.is_admin());
drop policy if exists "admin projects" on public.projects;create policy "admin projects" on public.projects for all to authenticated using(public.is_admin()) with check(public.is_admin());
drop policy if exists "blog public" on public.blog_posts;create policy "blog public" on public.blog_posts for select using(status='published' or public.is_admin());
insert into public.services(name,slug,description) values('SEO','seo','Posicionamiento orgánico'),('Diseño web','diseno-web','Sitios y aplicaciones'),('Meta Ads','meta-ads','Publicidad en Meta'),('Google Ads','google-ads','Publicidad en Google'),('Branding','branding','Identidad de marca'),('Contenido y video','contenido-video','Producción audiovisual'),('Capacitación','capacitacion','Cursos y mentorías') on conflict(slug) do nothing;drop policy if exists "profile own update" on public.profiles;
create policy "profile own update" on public.profiles for update to authenticated using(id=auth.uid()) with check(id=auth.uid());
