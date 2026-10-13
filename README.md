# Website Yayasan Mawaddah Indonesia

Situs statis (Astro 7) untuk Yayasan Mawaddah Indonesia: dakwah, pendidikan, dan sosial.

**Arah desain:** gaya "markaz" — hero gelap penuh lebar dengan judul putih + emas, tombol pil emas, pita angka cokelat, bagian bergantian terang/gelap,
baris waktu shalat, dan judul tebal dengan garis emas pendek. Palet: emas `#d3a428` dan cokelat tua di atas kertas gading (token di `src/styles/global.css`).

| Peran | Font |
|---|---|
| Judul, subjudul, angka, teks | **Geist** (tebal untuk judul) |
| Arab | **Amiri** |

## Menjalankan

```bash
npm install
npm run dev       # http://localhost:4321
npm run build     # hasil siap-unggah di folder dist/
```

Hosting gratis: **Netlify / Vercel / Cloudflare Pages** (build `npm run build`, output `dist`), atau unggah isi `dist/` ke cPanel.

## Peta situs

| Menu | Alamat |
|---|---|
| Tentang Kami | `/profil/` · `/pengurus/` · `/rekening/` · `/berita/` · `/galeri/` · `/faq/` · `/kontak/` |
| Program Sosial | `/sosial/` · `/wakaf-quran/` · `/wakaf-pesantren/` · `/masjid/` · `/air-bersih/` · `/bencana/` · `/iftar-jamai/` · `/qurban/` |
| Program Dakwah | `/dakwah/` · `/wesal-tv/` |
| Haji & Umrah | `/haji-umrah/` (Almaz Tour — data di `src/data/site.ts` → `almaz`) |
| Program Pendidikan | `/pendidikan/` · `/tabs-1-banjarnegara/` · `/tabs-2-purbalingga/` · `/tabs-3-purbalingga-putri/` · `/tabs-4-cilacap/` · `/tabs-5-cianjur/` · `/rumah-quran/` · `/psb/` |
| Lainnya | `/program/` (semua program + filter) · `/donasi/` |

Redirect otomatis: `/tentang` → `/profil`, `/struktur` → `/pengurus`, `/alamat` → `/kontak`, `/ifthor-jamai` → `/iftar-jamai`, `/sarana-air-bersih` → `/air-bersih`.

## Yang masih perlu dilengkapi

| Apa | Di mana |
|---|---|
| **Nomor rekening asli** | `src/data/site.ts` → `rekening` |
| **Gambar QRIS** | `src/pages/rekening.astro` dan `src/pages/donasi.astro` (blok `.qris`) |
| Email aktif, jam layanan, tautan media sosial, nomor SK | `src/data/site.ts` → `site` |
| Detail pesantren (jenjang, biaya, kurikulum) | `src/content/program/tabs-*.md` |
| Alur dan persyaratan PSB | `src/pages/psb.astro` (array `alur`) |
| Berita contoh | `src/content/berita/*.md` (ganti dengan berita asli) |
| Foto kegiatan | lihat di bawah |
| **Foto hero beranda** (opsional) | simpan sebagai `src/assets/foto/hero.jpg` — otomatis jadi latar hero |
| Data Almaz Tour (WA, izin, alamat) | `src/data/site.ts` → `almaz` — dicek ulang oleh Almaz Tour |

Semua nilai contoh ditandai `[PLACEHOLDER]`. Cari dengan: `grep -rn PLACEHOLDER src`.

## Menambah program atau berita

Salin salah satu file di `src/content/program/` atau `src/content/berita/`, lalu ubah isinya.
Nama file menjadi alamat halaman (`air-bersih.md` → `/air-bersih/`), dan program baru **otomatis masuk mega menu**
sesuai `pilar` (`sosial` / `dakwah` / `pendidikan`). Field yang tersedia tertulis di `src/content.config.ts`.

## Memasang foto asli

Tanpa foto, setiap bingkai menampilkan placeholder bertekstur girih. Saat `npm run dev`, setiap placeholder diberi label "Foto: …" supaya mudah dilacak.

1. Simpan foto di `src/assets/foto/`.
2. Program atau berita: tambahkan di frontmatter `foto: ../../assets/foto/nama.jpg` dan `fotoAlt: "deskripsi"`.
3. Bingkai lain (hero, galeri, dll.): impor foto lalu kirim lewat prop `image` ke komponen `<Media>`.

Foto otomatis dikompres ke WebP dalam beberapa ukuran saat build.

## Catatan teknis

- JS global sekitar 1–2 KB (gzip), tanpa framework. Font di-host sendiri.
- Animasi: judul muncul kata demi kata, bingkai terbuka seperti tirai, garis mihrab tergambar sendiri, ayat terungkap dari kanan ke kiri, angka menghitung naik, dan transisi antarhalaman.
  Semuanya menghormati `prefers-reduced-motion`, dan konten tetap tampil tanpa JavaScript.
- Menu dropdown bisa dipakai dengan mouse, keyboard (Enter/Esc), dan layar sentuh. Menu seluler memakai `<dialog>` dengan akordeon.
- SEO: meta, Open Graph, JSON-LD `NGO`, sitemap, robots.txt.
- `brand/` berisi aset logo transparan serta skrip `crop.mjs` dan `gen-content.mjs` (pembuat konten awal; **jangan dijalankan ulang** karena akan menimpa konten).
