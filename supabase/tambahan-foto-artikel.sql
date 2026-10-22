-- Unggah foto artikel Kabar (jalankan SEKALI di proyek Supabase situs: SQL Editor -> New query -> Run)
-- Bucket publik "foto-artikel" (foto tampil di situs). Hanya staf portal yang boleh mengunggah,
-- ke folder miliknya sendiri: foto-artikel/<user-id>/<waktu>.jpg. Batas 2 MB; JPG/PNG/WebP.

insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values ('foto-artikel', 'foto-artikel', true, 2097152, array['image/jpeg','image/png','image/webp'])
on conflict (id) do update
  set public = true, file_size_limit = 2097152, allowed_mime_types = excluded.allowed_mime_types;

drop policy if exists foto_artikel_insert on storage.objects;
drop policy if exists foto_artikel_delete on storage.objects;

create policy foto_artikel_insert on storage.objects for insert to authenticated
  with check (bucket_id = 'foto-artikel' and (storage.foldername(name))[1] = auth.uid()::text and public.portal_peran() is not null);

create policy foto_artikel_delete on storage.objects for delete to authenticated
  using (bucket_id = 'foto-artikel' and ((storage.foldername(name))[1] = auth.uid()::text or public.portal_peran() = 'admin'));
