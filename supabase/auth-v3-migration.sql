-- Ejecuta este archivo si ya instalaste schema.sql anteriormente.
create or replace function public.handle_new_user() returns trigger
language plpgsql security definer set search_path=public as $$
begin
  insert into public.profiles(id,full_name,phone,company,avatar_url)
  values(
    new.id,
    new.raw_user_meta_data->>'full_name',
    new.raw_user_meta_data->>'phone',
    new.raw_user_meta_data->>'company',
    coalesce(new.raw_user_meta_data->>'avatar_url',new.raw_user_meta_data->>'picture')
  )
  on conflict(id) do update
    set avatar_url=coalesce(excluded.avatar_url,public.profiles.avatar_url);

  if coalesce(new.raw_user_meta_data->>'lead_service','') <> '' then
    insert into public.leads(user_id,name,email,phone,company,service,website,goals,contact_preference)
    values(
      new.id,
      coalesce(new.raw_user_meta_data->>'full_name',new.email),
      new.email,
      new.raw_user_meta_data->>'phone',
      new.raw_user_meta_data->>'company',
      new.raw_user_meta_data->>'lead_service',
      new.raw_user_meta_data->>'lead_website',
      new.raw_user_meta_data->>'lead_goals',
      new.raw_user_meta_data->>'lead_contact_preference'
    );
  end if;
  return new;
end; $$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
after insert on auth.users
for each row execute procedure public.handle_new_user();

drop policy if exists "profile own update" on public.profiles;
create policy "profile own update" on public.profiles
for update to authenticated
using(id=auth.uid()) with check(id=auth.uid());
