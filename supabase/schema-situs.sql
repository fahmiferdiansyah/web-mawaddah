-- Skema database situs mawaddah.or.id (pendaftar STAM, portal staf, artikel kabar)
-- Jalankan SEKALI di proyek Supabase baru: SQL Editor -> New query -> tempel -> Run.

-- ========== 1. PENDAFTAR STAM ==========
create sequence if not exists public.pendaftar_stam_seq;

create table if not exists public.pendaftar_stam (
  id uuid primary key default gen_random_uuid(),
  nomor text unique not null,
  created_at timestamptz not null default now(),
  status text not null default 'Baru' check (status in ('Baru','Administrasi','Lulus Administrasi','Tidak Lulus')),
  hasil_seleksi text check (hasil_seleksi in ('Diterima','Tidak Diterima')),
  catatan_panitia text,
  nama_lengkap text not null,
  nama_panggilan text,
  tempat_lahir text not null,
  tanggal_lahir date not null,
  jenis_kelamin text not null,
  nik text not null,
  nomor_kk text not null,
  alamat text not null,
  desa text, kecamatan text, kota text not null, provinsi text not null, kode_pos text,
  whatsapp text not null,
  email text,
  status_nikah text,
  pendidikan jsonb not null default '{}'::jsonb,
  pendidikan_terakhir text,
  kemampuan jsonb not null default '{}'::jsonb,
  orang_tua jsonb not null default '{}'::jsonb,
  motivasi jsonb not null default '{}'::jsonb,
  komitmen_setuju boolean not null,
  dokumen jsonb not null default '[]'::jsonb,
  pernyataan_setuju boolean not null
);
alter table public.pendaftar_stam enable row level security;
revoke all on public.pendaftar_stam from anon, authenticated;
revoke all on sequence public.pendaftar_stam_seq from anon, authenticated;

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
  if exists (select 1 from public.pendaftar_stam where nik = v_nik) then
    raise exception 'NIK ini sudah terdaftar';
  end if;
  v_nomor := 'STAM-2027/' || lpad(nextval('public.pendaftar_stam_seq')::text, 4, '0');
  insert into public.pendaftar_stam (nomor, nama_lengkap, nama_panggilan, tempat_lahir, tanggal_lahir, jenis_kelamin, nik, nomor_kk,
    alamat, desa, kecamatan, kota, provinsi, kode_pos, whatsapp, email, status_nikah, pendidikan, pendidikan_terakhir, kemampuan,
    orang_tua, motivasi, komitmen_setuju, dokumen, pernyataan_setuju)
  values (v_nomor, trim(p->>'nama_lengkap'), nullif(trim(p->>'nama_panggilan'),''), trim(p->>'tempat_lahir'), (p->>'tanggal_lahir')::date,
    p->>'jenis_kelamin', v_nik, v_kk, trim(p->>'alamat'), nullif(trim(p->>'desa'),''), nullif(trim(p->>'kecamatan'),''),
    trim(p->>'kota'), trim(p->>'provinsi'), nullif(trim(p->>'kode_pos'),''), v_wa, nullif(trim(p->>'email'),''), p->>'status_nikah',
    coalesce(p->'pendidikan','{}'::jsonb), p->>'pendidikan_terakhir', coalesce(p->'kemampuan','{}'::jsonb),
    coalesce(p->'orang_tua','{}'::jsonb), coalesce(p->'motivasi','{}'::jsonb), true, coalesce(p->'dokumen','[]'::jsonb), true);
  return v_nomor;
end $$;
revoke all on function public.daftar_stam(jsonb) from public;
grant execute on function public.daftar_stam(jsonb) to anon;

-- ========== 2. STAF PORTAL ==========
create table if not exists public.portal_staf (
  user_id uuid primary key references auth.users(id) on delete cascade,
  nama text not null,
  peran text not null check (peran in ('admin','panitia','pengurus')),
  created_at timestamptz not null default now()
);
alter table public.portal_staf enable row level security;
revoke all on public.portal_staf from anon, authenticated;

create or replace function public.portal_peran() returns text
language sql stable security definer set search_path = public as
$$ select peran from public.portal_staf where user_id = auth.uid() $$;
revoke all on function public.portal_peran() from public, anon;
grant execute on function public.portal_peran() to authenticated;

grant select on public.portal_staf to authenticated;
create policy staf_baca on public.portal_staf for select to authenticated
  using (user_id = auth.uid() or public.portal_peran() = 'admin');

create or replace function public.portal_daftar_staf() returns table(user_id uuid, email text, nama text, peran text)
language plpgsql stable security definer set search_path = public, auth as $$
begin
  if public.portal_peran() is distinct from 'admin' then raise exception 'Khusus admin'; end if;
  return query select s.user_id, u.email::text, s.nama, s.peran from public.portal_staf s join auth.users u on u.id = s.user_id order by s.created_at;
end $$;

create or replace function public.portal_set_staf(p_email text, p_nama text, p_peran text) returns void
language plpgsql security definer set search_path = public, auth as $$
declare v_id uuid;
begin
  if public.portal_peran() is distinct from 'admin' then raise exception 'Khusus admin'; end if;
  if p_peran not in ('admin','panitia','pengurus','nonaktif') then raise exception 'Peran tidak valid'; end if;
  select id into v_id from auth.users where lower(email) = lower(trim(p_email));
  if v_id is null then raise exception 'Akun dengan email itu belum dibuat di Supabase Auth'; end if;
  if p_peran = 'nonaktif' then
    if v_id = auth.uid() then raise exception 'Tidak bisa menonaktifkan diri sendiri'; end if;
    delete from public.portal_staf where user_id = v_id;
  else
    insert into public.portal_staf(user_id, nama, peran) values (v_id, coalesce(nullif(trim(p_nama),''), p_email), p_peran)
    on conflict (user_id) do update set peran = excluded.peran, nama = coalesce(nullif(trim(p_nama),''), public.portal_staf.nama);
  end if;
end $$;
revoke all on function public.portal_daftar_staf() from public, anon;
revoke all on function public.portal_set_staf(text,text,text) from public, anon;
grant execute on function public.portal_daftar_staf() to authenticated;
grant execute on function public.portal_set_staf(text,text,text) to authenticated;

-- Akses pendaftar: staf boleh baca; admin/panitia boleh ubah status, hasil, catatan
grant select on public.pendaftar_stam to authenticated;
grant update (status, hasil_seleksi, catatan_panitia) on public.pendaftar_stam to authenticated;
create policy pendaftar_baca on public.pendaftar_stam for select to authenticated
  using (public.portal_peran() is not null);
create policy pendaftar_ubah on public.pendaftar_stam for update to authenticated
  using (public.portal_peran() in ('admin','panitia')) with check (public.portal_peran() in ('admin','panitia'));

-- ========== 3. ARTIKEL KABAR ==========
create table if not exists public.artikel (
  id uuid primary key default gen_random_uuid(),
  slug text unique,
  judul text not null check (length(trim(judul)) between 5 and 200),
  kategori text not null default 'Kabar Yayasan' check (kategori in ('Dakwah','Pendidikan','Sosial','Kabar Yayasan')),
  ringkasan text not null check (length(trim(ringkasan)) between 10 and 400),
  isi text not null check (length(trim(isi)) >= 20),
  foto_url text,
  penulis_id uuid not null default auth.uid() references auth.users(id),
  penulis_nama text not null default '',
  status text not null default 'draft' check (status in ('draft','menunggu','terbit','ditolak')),
  catatan_admin text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  terbit_at timestamptz
);
alter table public.artikel enable row level security;
revoke all on public.artikel from anon, authenticated;
grant select on public.artikel to anon, authenticated;
grant insert, update, delete on public.artikel to authenticated;

create policy artikel_publik on public.artikel for select to anon, authenticated using (status = 'terbit');
create policy artikel_staf_baca on public.artikel for select to authenticated
  using (public.portal_peran() = 'admin' or (public.portal_peran() is not null and penulis_id = auth.uid()));
create policy artikel_staf_tulis on public.artikel for insert to authenticated
  with check (public.portal_peran() is not null and penulis_id = auth.uid());
create policy artikel_ubah on public.artikel for update to authenticated
  using (public.portal_peran() = 'admin' or (public.portal_peran() is not null and penulis_id = auth.uid() and status in ('draft','menunggu','ditolak')))
  with check (public.portal_peran() = 'admin' or (public.portal_peran() is not null and penulis_id = auth.uid()));
create policy artikel_hapus on public.artikel for delete to authenticated
  using (public.portal_peran() = 'admin' or (public.portal_peran() is not null and penulis_id = auth.uid() and status in ('draft','ditolak')));

-- Penjaga: hanya admin yang boleh menerbitkan / menolak
create or replace function public.artikel_guard() returns trigger
language plpgsql security definer set search_path = public as $$
declare v_peran text := public.portal_peran(); v_nama text;
begin
  if tg_op = 'INSERT' then
    select nama into v_nama from public.portal_staf where user_id = auth.uid();
    new.penulis_nama := coalesce(v_nama, '');
    new.penulis_id := auth.uid();
    if v_peran is distinct from 'admin' then
      if new.status not in ('draft','menunggu') then raise exception 'Artikel harus disetujui admin sebelum tayang'; end if;
      new.terbit_at := null; new.catatan_admin := null; new.slug := null;
    end if;
  else
    new.penulis_id := old.penulis_id; new.penulis_nama := old.penulis_nama; new.created_at := old.created_at;
    if v_peran is distinct from 'admin' then
      if new.status not in ('draft','menunggu') then raise exception 'Artikel harus disetujui admin sebelum tayang'; end if;
      new.slug := old.slug; new.terbit_at := old.terbit_at; new.catatan_admin := old.catatan_admin;
    end if;
  end if;
  new.updated_at := now();
  if new.status = 'terbit' then
    if new.terbit_at is null then new.terbit_at := now(); end if;
    if new.slug is null then
      new.slug := trim(both '-' from regexp_replace(lower(new.judul), '[^a-z0-9]+', '-', 'g')) || '-' || substr(replace(gen_random_uuid()::text,'-',''),1,6);
    end if;
  end if;
  return new;
end $$;
revoke execute on function public.artikel_guard() from public, anon, authenticated;
drop trigger if exists artikel_guard_trg on public.artikel;
create trigger artikel_guard_trg before insert or update on public.artikel for each row execute function public.artikel_guard();

-- ========== 4. ADMIN PERTAMA ==========
-- Buat dulu akun di Authentication -> Users -> Add user (centang Auto Confirm User),
-- lalu ganti email di bawah, hapus tanda -- di depan, dan jalankan:
-- insert into public.portal_staf(user_id, nama, peran)
--   select id, 'Nama Anda', 'admin' from auth.users where email = 'GANTI@email.com';
