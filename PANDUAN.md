# Panduan Membangun Website Mawaddah dengan Claude Code

Disusun ulang dari riwayat commit, `README.md`, dan catatan `Cara buat website seharga 10000 dollar.docx`.
Prompt bertanda **(asli)** diambil langsung dari catatan tersebut; prompt lain adalah contoh yang mencerminkan hasil tiap tahap dan bisa dipakai ulang.

## Gambaran singkat

| Bagian | Yang dipakai |
|---|---|
| Kerangka situs | **Astro 7** (situs statis, tanpa framework JS) |
| Font | Geist (teks & judul), Amiri (Arab) |
| Database (formulir STAM, portal panitia, artikel) | **Supabase**, skema SQL di `supabase/` |
| Kode | GitHub `fahmiferdiansyah/web-mawaddah` |
| Hosting | **Cloudflare Pages** (sempat mencoba Netlify dan Hostinger), domain `mawaddah.or.id` |
| Aplikasi di HP | PWA (`public/site.webmanifest`) |

---

## Tahap 0: Siapkan bahan (sebelum membuka Claude)
1. **Isi yayasan**: `VisiMisi_YMI_REVISED_FINAL.docx` (profil, visi misi, program).
2. **Logo**: folder `brand/`.
3. **Referensi desain**: Dribbble, Awwwards, Pinterest.
4. **Ceklis mutu**: `10 Ceklis Web Senilai $10.000.pdf`. Isinya 8 poin: arah desain yang tegas, font bukan Inter/Roboto, maksimal 3–5 warna, ruang lega, foto asli, animasi halus, tampilan HP yang dirancang khusus, dan kualitas teknis (cepat, kontras cukup, SEO).

## Tahap 1: Skill yang dipakai

| Skill | Gunanya | Cara pakai |
|---|---|---|
| **ui-ux-pro-max** | Otak desain: gaya, palet warna, pasangan font, aturan UX | Ketik `/ui-ux-pro-max` di awal prompt |
| **frontend-design** | Supaya desain punya karakter, tidak terlihat seperti template | Ketik `/frontend-design` atau sebut "pakai skill frontend-design" |
| *(opsional)* **hallmark** | Audit atau desain ulang supaya tidak terasa "buatan AI" | `/hallmark audit halaman beranda` |

Kalau pindah komputer, pasang lagi dari:
- https://github.com/anthropics/skills/tree/main/skills/frontend-design
- https://github.com/nextlevelbuilder/ui-ux-pro-max-skill (lewat npm, sesuai petunjuk di repo itu)

## Tahap 2: Bangun versi awal (13 Okt 2026)
Pola prompt asli (contoh steakhouse) yang diubah untuk yayasan:
```text
/ui-ux-pro-max build a website worth $10K untuk Yayasan Mawaddah Indonesia
(dakwah, pendidikan, sosial). Bahan: file VisiMisi_YMI_REVISED_FINAL.docx dan logo di folder brand/.
Pakai Astro. Harus ada animasi elegan yang ringan di semua perangkat.
Ikuti ceklis di "10 Ceklis Web Senilai $10.000.pdf".
Ask me any clarifying questions you need before building.
```
Jawab semua pertanyaan Claude (warna, menu, halaman). Hasilnya gaya "markaz": hero gelap, emas `#d3a428`, cokelat tua, kertas gading.

## Tahap 3: Poles desain
**(asli)**
```text
We need more handcrafted micro-interaction. The lower section feel a bit generic.
We don't need to make them busier, just more expensive.
```
**(asli)**
```text
Font: geist pengganti inter
```

## Tahap 4: Konten dan foto (13–15 Okt 2026)
```text
Buatkan daftar foto & video yang perlu dikumpulkan per halaman, lengkap dengan rasio dan gaya.
```
Hasilnya menjadi `DAFTAR-FOTO-VIDEO.md`.
```text
Pasang foto TABS 1–5 dan STAM dari folder Foto-Foto, dan tambahkan nomor WhatsApp admin per pesantren.
```
Untuk mengganti teks cukup sebut halaman dan isinya, misalnya: *"Ganti berita lama dengan berita pembangunan TABS Gadog Bogor"*.

## Tahap 5: Fitur database dengan Supabase (19–23 Okt 2026)
```text
Buat formulir pendaftaran STAM online yang tersimpan ke Supabase (pakai konektor Supabase).
Lalu buat portal panitia: login, lihat data pendaftar, unggah berkas (maks 2 MB),
dan artikel kabar yang harus disetujui admin dulu. Amankan dengan Row Level Security.
```
Claude membuat `supabase/schema-situs.sql`, lalu file itu dijalankan **sekali** di Supabase (SQL Editor → tempel → Run). File `supabase/tambahan-*.sql` adalah tambahan berikutnya.

## Tahap 6: Online (deploy)
```text
Simpan proyek ini ke GitHub dan siapkan deploy ke Cloudflare Pages
(build: npm run build, output: dist, Node 22), plus redirect URL lama.
```
Di dashboard Cloudflare: Pages → hubungkan repo GitHub → sambungkan domain `mawaddah.or.id`.
Mulai saat itu, **setiap push ke GitHub otomatis online**.

## Tahap 7: Landing page STAM (16 Nov 2026)
```text
/frontend-design Buat landing page khusus STAM di /stam: tema zaitun-emas dari logo STAM,
hitung mundur gelombang pendaftaran, tiket biaya, FAQ, tombol Chat Ustadz ke WhatsApp.
```

## Tahap 8: Bisa dipasang di HP (PWA, 18 Nov 2026)
```text
Jadikan situs PWA: nama aplikasi Mawaddah.or.id, ikon maskable, splash logo Mawaddah tanpa background.
```

---

## Perawatan sehari-hari
Buka folder ini di Claude Code, lalu tulis perubahannya dengan bahasa biasa, misalnya:
```text
Ganti nama Mudir STAM menjadi Ust. ..., lalu commit & push.
```
Claude sudah diatur untuk otomatis commit dan push setelah tiap tugas, jadi perubahan langsung naik ke situs.

Untuk melihat situs di komputer sendiri:
```powershell
npm install
npm run dev
```
Setelah itu buka `http://localhost:4321`.

**Jangan jalankan** `brand/gen-content.mjs` lagi, karena akan menimpa semua konten.
