-- Unggah berkas pendaftaran STAM (jalankan SEKALI di proyek Supabase situs: SQL Editor -> New query -> Run)
-- Berkas disimpan di bucket PRIVAT "berkas-stam", folder acak per pendaftar: berkas-stam/<uuid>/<jenis>.<ext>
-- Pendaftar (anon) hanya bisa MENGUNGGAH (tidak bisa melihat/menimpa/menghapus); hanya staf portal yang bisa melihat.
-- Batas 2 MB per berkas; hanya JPG/PNG/PDF.

insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values ('berkas-stam', 'berkas-stam', false, 2097152, array['image/jpeg','image/png','application/pdf'])
on conflict (id) do update
  set public = false, file_size_limit = 2097152, allowed_mime_types = excluded.allowed_mime_types;

drop policy if exists berkas_stam_unggah on storage.objects;
drop policy if exists berkas_stam_staf_baca on storage.objects;

create policy berkas_stam_unggah on storage.objects for insert to anon
  with check (bucket_id = 'berkas-stam'
    and name ~ '^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}/(ijazah|identitas|kk|pasfoto|sehat|lainnya)\.(jpg|png|pdf)$');

create policy berkas_stam_staf_baca on storage.objects for select to authenticated
  using (bucket_id = 'berkas-stam' and public.portal_peran() is not null);

-- Peta jenis berkas -> alamat file di storage
alter table public.pendaftar_stam add column if not exists berkas jsonb not null default '{}'::jsonb;

create or replace function public.daftar_stam(p jsonb)
returns text
language plpgsql
security definer
set search_path = public
as $$
declare
  v_nomor text;
  v_nik text := regexp_replace(coalesce(p->>'nik',''), '\D', '', 'g');
  v_kk text := regexp_replace(coalesce(p->>'nomor_kk',''), '\D', '', 'g');
  v_wa text := regexp_replace(coalesce(p->>'whatsapp',''), '[^0-9+]', '', 'g');
  v_berkas jsonb := coalesce(p->'berkas','{}'::jsonb);
begin
  if coalesce(p->>'website','') <> '' then
    return 'STAM-2027/0000';
  end if;
  if length(trim(coalesce(p->>'nama_lengkap',''))) < 3 then raise exception 'Nama lengkap wajib diisi'; end if;
  if length(v_nik) <> 16 then raise exception 'NIK harus 16 digit'; end if;
  if length(v_kk) <> 16 then raise exception 'Nomor KK harus 16 digit'; end if;
  if length(v_wa) < 9 then raise exception 'Nomor WhatsApp tidak valid'; end if;
  if coalesce((p->>'komitmen_setuju')::boolean,false) is not true or coalesce((p->>'pernyataan_setuju')::boolean,false) is not true then
    raise exception 'Komitmen dan pernyataan harus disetujui';
  end if;
  if jsonb_typeof(v_berkas) <> 'object' then raise exception 'Data berkas tidak valid'; end if;
  if exists (select 1 from jsonb_each_text(v_berkas) e
            where e.key !~ '^(ijazah|identitas|kk|pasfoto|sehat|lainnya)$'
               or e.value !~ '^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}/[a-z]+\.(jpg|png|pdf)$') then
    raise exception 'Data berkas tidak valid';
  end if;
  if exists (select 1 from public.pendaftar_stam where nik = v_nik) then
    raise exception 'NIK ini sudah terdaftar';
  end if;
  v_nomor := 'STAM-2027/' || lpad(nextval('public.pendaftar_stam_seq')::text, 4, '0');
  insert into public.pendaftar_stam (nomor, nama_lengkap, nama_panggilan, tempat_lahir, tanggal_lahir, jenis_kelamin, nik, nomor_kk,
    alamat, desa, kecamatan, kota, provinsi, kode_pos, whatsapp, email, status_nikah, pendidikan, pendidikan_terakhir, kemampuan,
    orang_tua, motivasi, komitmen_setuju, dokumen, berkas, pernyataan_setuju)
  values (v_nomor, trim(p->>'nama_lengkap'), nullif(trim(p->>'nama_panggilan'),''), trim(p->>'tempat_lahir'), (p->>'tanggal_lahir')::date,
    p->>'jenis_kelamin', v_nik, v_kk, trim(p->>'alamat'), nullif(trim(p->>'desa'),''), nullif(trim(p->>'kecamatan'),''),
    trim(p->>'kota'), trim(p->>'provinsi'), nullif(trim(p->>'kode_pos'),''), v_wa, nullif(trim(p->>'email'),''), p->>'status_nikah',
    coalesce(p->'pendidikan','{}'::jsonb), p->>'pendidikan_terakhir', coalesce(p->'kemampuan','{}'::jsonb),
    coalesce(p->'orang_tua','{}'::jsonb), coalesce(p->'motivasi','{}'::jsonb), true, coalesce(p->'dokumen','[]'::jsonb), v_berkas, true);
  return v_nomor;
end $$;
revoke all on function public.daftar_stam(jsonb) from public;
grant execute on function public.daftar_stam(jsonb) to anon;
