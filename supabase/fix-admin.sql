-- =============================================================
--  CREATE / RESET ADMIN LOGIN  (run on its own, idempotent)
--  Supabase Dashboard -> SQL Editor -> New query -> paste ALL -> Run
--
--  Login at /admin with:
--    Email:    collegemaulimedical@gmail.com
--    Password: Mauli@Admin2026
-- =============================================================

create extension if not exists pgcrypto with schema extensions;

-- Make crypt()/gen_salt() resolvable regardless of where pgcrypto lives.
set search_path = extensions, public, auth;

do $$
declare
  v_email    text := 'collegemaulimedical@gmail.com';
  v_password text := 'Mauli@Admin2026';
  v_uid uuid;
begin
  select id into v_uid from auth.users where email = v_email;

  if v_uid is null then
    -- Create a brand-new, email-confirmed user
    v_uid := gen_random_uuid();
    insert into auth.users (
      instance_id, id, aud, role, email, encrypted_password,
      email_confirmed_at, created_at, updated_at,
      raw_app_meta_data, raw_user_meta_data
    )
    values (
      '00000000-0000-0000-0000-000000000000',
      v_uid, 'authenticated', 'authenticated', v_email,
      crypt(v_password, gen_salt('bf')),
      now(), now(), now(),
      '{"provider":"email","providers":["email"]}', '{}'
    );
  else
    -- User already exists (e.g. unconfirmed): set password + confirm email
    update auth.users
       set encrypted_password = crypt(v_password, gen_salt('bf')),
           email_confirmed_at  = now(),
           confirmation_token  = '',
           updated_at          = now()
     where id = v_uid;
  end if;

  -- Ensure a matching email identity exists (required for password login)
  if not exists (
    select 1 from auth.identities where user_id = v_uid and provider = 'email'
  ) then
    insert into auth.identities (
      id, user_id, identity_data, provider, provider_id,
      last_sign_in_at, created_at, updated_at
    )
    values (
      gen_random_uuid(), v_uid,
      jsonb_build_object('sub', v_uid::text, 'email', v_email),
      'email', v_uid::text, now(), now(), now()
    );
  end if;
end $$;

-- Should return ONE row, confirmed = true, identities = 1
select
  email,
  (email_confirmed_at is not null) as confirmed,
  (select count(*) from auth.identities i
     where i.user_id = u.id and i.provider = 'email') as identities
from auth.users u
where email = 'collegemaulimedical@gmail.com';
