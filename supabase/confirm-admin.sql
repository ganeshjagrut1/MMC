-- Confirms the admin email AND sets the password in one shot.
-- Supabase Dashboard -> SQL Editor -> paste -> Run.
set search_path = extensions, public, auth;

update auth.users
   set email_confirmed_at = now(),
       encrypted_password = crypt('Mauli@Admin2026', gen_salt('bf')),
       confirmation_token = '',
       updated_at = now()
 where email = 'collegemaulimedical@gmail.com';

-- Should show one row with a non-null confirmed_at:
select email, email_confirmed_at
from auth.users
where email = 'collegemaulimedical@gmail.com';
