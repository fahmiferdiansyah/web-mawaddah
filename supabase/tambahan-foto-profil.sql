-- Penyimpanan foto profil staf (jalankan SEKALI di proyek Supabase situs: SQL Editor -> New query -> Run)
-- Foto disimpan di bucket "avatar" pada folder berisi ID pengguna: avatar/<user-id>/foto.jpg
-- Bucket publik (foto boleh dilihat siapa saja lewat tautan), tetapi hanya staf yang
-- bisa mengunggah, dan hanya ke folder miliknya sendiri. Batas 1 MB; hanya JPG/PNG/WebP.

insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values ('avatar', 'avatar', true, 1048576, array['image/jpeg','image/png','image/webp'])
on conflict (id) do update
  set public = true, file_size_limit = 1048576, allowed_mime_types = excluded.allowed_mime_types;

drop policy if exists avatar_select_own on storage.objects;
drop policy if exists avatar_insert_own on storage.objects;
drop policy if exists avatar_update_own on storage.objects;
drop policy if exists avatar_delete_own on storage.objects;

create policy avatar_select_own on storage.objects for select to authenticated
  using (bucket_id = 'avatar' and (storage.foldername(name))[1] = auth.uid()::text);

create policy avatar_insert_own on storage.objects for insert to authenticated
  with check (bucket_id = 'avatar' and (storage.foldername(name))[1] = auth.uid()::text and public.portal_peran() is not null);

create policy avatar_update_own on storage.objects for update to authenticated
  using (bucket_id = 'avatar' and (storage.foldername(name))[1] = auth.uid()::text)
  with check (bucket_id = 'avatar' and (storage.foldername(name))[1] = auth.uid()::text);

create policy avatar_delete_own on storage.objects for delete to authenticated
  using (bucket_id = 'avatar' and (storage.foldername(name))[1] = auth.uid()::text);
