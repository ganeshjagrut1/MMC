-- =============================================================
--  STORAGE — file uploads (images & PDFs) for the admin panel
--  Supabase Dashboard -> SQL Editor -> New query -> paste -> Run
--
--  Creates a public "uploads" bucket:
--    • anyone can READ files (so they display on the public site)
--    • only logged-in admins can UPLOAD / REPLACE / DELETE
-- =============================================================

-- 1) Create the bucket (public read)
insert into storage.buckets (id, name, public)
values ('uploads', 'uploads', true)
on conflict (id) do update set public = true;

-- 2) Policies on storage.objects for this bucket
drop policy if exists "uploads public read"   on storage.objects;
drop policy if exists "uploads admin insert"  on storage.objects;
drop policy if exists "uploads admin update"  on storage.objects;
drop policy if exists "uploads admin delete"  on storage.objects;

create policy "uploads public read" on storage.objects
  for select using (bucket_id = 'uploads');

create policy "uploads admin insert" on storage.objects
  for insert to authenticated with check (bucket_id = 'uploads');

create policy "uploads admin update" on storage.objects
  for update to authenticated using (bucket_id = 'uploads');

create policy "uploads admin delete" on storage.objects
  for delete to authenticated using (bucket_id = 'uploads');
