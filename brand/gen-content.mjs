// Skrip sekali-jalan: membuat konten program & berita awal dari data yayasan.
import fs from 'node:fs';
const P = 'src/content/program/';
const B = 'src/content/berita/';
for (const d of [P, B]) for (const f of fs.readdirSync(d)) if (f.endsWith('.md')) fs.unlinkSync(d + f);

const fm = (o) =>
  '---\n' +
  Object.entries(o)
    .filter(([, v]) => v !== undefined)
    .map(([k, v]) => `${k}: ${typeof v === 'string' ? JSON.stringify(v) : v}`)
    .join('\n') +
  '\n---\n\n';

const items = [
  // ---------------- SOSIAL
  { slug: 'wakaf-quran', d: { title: 'Wakaf Mushaf Al-Qur’an', menu: 'Wakaf Mushaf Al-Qur’an', pilar: 'sosial', ikon: 'book', urutan: 1, unggulan: true, ringkasan: 'Menyalurkan mushaf Al-Qur’an ke masjid, pesantren, rumah Qur’an, dan pelosok negeri. Hingga kini 189.940 mushaf telah sampai ke tangan umat di seluruh Indonesia.', penerima: '189.940 mushaf telah tersalurkan', lokasi: 'Seluruh Indonesia', fotoAlt: 'Tumpukan mushaf Al-Qur’an siap disalurkan' },
    body: `Masih banyak masjid, musala, dan pesantren di pelosok Indonesia yang kekurangan mushaf. Satu mushaf yang Anda wakafkan akan dibaca berulang kali — dan pahalanya terus mengalir selama mushaf itu dibaca.

## Capaian

Alhamdulillah, hingga saat ini **189.940 mushaf Al-Qur’an** telah disalurkan Yayasan Mawaddah Indonesia ke berbagai daerah di Indonesia.

## Ke mana mushaf disalurkan

- Masjid dan musala di daerah terpencil
- Pondok pesantren dan rumah Qur’an
- Majelis taklim dan TPA
- Daerah terdampak bencana

## Cara berwakaf

Pilih program **Wakaf Mushaf Al-Qur’an** di halaman donasi, transfer ke rekening resmi yayasan, lalu konfirmasikan melalui WhatsApp. Laporan penyaluran akan kami kabarkan kepada para wakif.` },
  { slug: 'wakaf-pesantren', d: { title: 'Wakaf Pondok Pesantren', menu: 'Wakaf Pondok Pesantren', pilar: 'sosial', ikon: 'home', urutan: 2, ringkasan: 'Membangun dan mengembangkan sarana Taisiru Ar-Rahman Boarding School — asrama, ruang belajar, dan masjid — sebagai amal jariyah yang terus mengalir.', lokasi: 'Banjarnegara, Purbalingga, Cilacap, Cianjur', fotoAlt: 'Pembangunan gedung pondok pesantren' },
    body: `Pesantren adalah tempat lahirnya generasi penghafal Al-Qur’an dan penuntut ilmu. Wakaf Anda membantu kami membangun dan melengkapi sarana di Taisiru Ar-Rahman Boarding School.

## Kebutuhan pembangunan

- Asrama santri
- Ruang kelas dan perpustakaan
- Masjid dan tempat wudhu
- Dapur dan sarana air bersih

Saat ini yayasan sedang menyiapkan **TABS 4 Cilacap** dan **TABS 5 Cianjur**, sehingga kebutuhan sarana sangat mendesak.` },
  { slug: 'masjid', d: { title: 'Pembangunan Masjid', menu: 'Pembangunan Masjid', pilar: 'sosial', ikon: 'mosque', urutan: 3, ringkasan: 'Membangun dan merenovasi masjid di daerah yang membutuhkan, agar umat memiliki tempat yang layak untuk shalat, belajar, dan berkumpul.', lokasi: 'Berbagai daerah di Indonesia', fotoAlt: 'Masjid yang dibangun yayasan' },
    body: `Masjid adalah jantung kehidupan umat. Bersama para donatur, Yayasan Mawaddah Indonesia telah membangun masjid-masjid di berbagai daerah yang membutuhkan.

> "Barang siapa membangun masjid karena Allah, Allah akan membangunkan untuknya rumah di surga." (HR. Bukhari dan Muslim)

## Yang kami bangun

- Masjid baru di daerah yang belum memiliki tempat ibadah layak
- Renovasi masjid dan musala yang rusak
- Kelengkapan masjid: tempat wudhu, sound system, karpet, dan mushaf` },
  { slug: 'air-bersih', d: { title: 'Sarana Air Bersih', menu: 'Sarana Air Bersih', pilar: 'sosial', ikon: 'drop', urutan: 4, ringkasan: 'Membangun sumur dan sarana air bersih untuk masjid, pesantren, dan permukiman yang kesulitan air — sedekah jariyah yang manfaatnya dirasakan setiap hari.', lokasi: 'Daerah rawan kekeringan', fotoAlt: 'Warga mengambil air dari sumur wakaf' },
    body: `Air adalah kebutuhan paling dasar, namun masih banyak saudara kita yang harus berjalan jauh untuk mendapatkannya. Yayasan Mawaddah Indonesia membangun sumur dan sarana air bersih di daerah yang membutuhkan.

> "Sedekah yang paling utama adalah memberi minum air." (HR. Ahmad)

## Bentuk bantuan

- Sumur bor dan sumur gali
- Tandon air dan instalasi pipa
- Tempat wudhu di masjid dan pesantren` },
  { slug: 'bencana', d: { title: 'Tanggap Bencana', menu: 'Tanggap Bencana', pilar: 'sosial', ikon: 'shield', urutan: 5, ringkasan: 'Hadir untuk saudara-saudara yang tertimpa musibah: bantuan logistik, kebutuhan darurat, mushaf, hingga pemulihan sarana ibadah.', lokasi: 'Lokasi bencana di Indonesia', fotoAlt: 'Relawan menyalurkan bantuan di lokasi bencana' },
    body: `Indonesia adalah negeri yang rawan bencana. Saat musibah datang, Yayasan Mawaddah Indonesia bergerak menyalurkan bantuan bagi para penyintas.

## Bentuk bantuan

- Logistik: pangan, air bersih, dan perlengkapan darurat
- Mushaf Al-Qur’an dan perlengkapan ibadah
- Pemulihan masjid, musala, dan sarana umum

Donasi tanggap bencana disimpan sebagai dana siaga agar bantuan bisa segera bergerak saat dibutuhkan.` },
  { slug: 'iftar-jamai', d: { title: 'Iftar Jama’i', menu: 'Iftar Jama’i', pilar: 'sosial', ikon: 'bowl', urutan: 6, ringkasan: 'Berbagi hidangan berbuka puasa bersama santri, jamaah masjid, dan kaum dhuafa — meraih pahala orang yang berpuasa.', jadwal: 'Bulan Ramadhan', fotoAlt: 'Jamaah berbuka puasa bersama' },
    body: `Setiap Ramadhan, Yayasan Mawaddah Indonesia menggelar **Iftar Jama’i**: buka puasa bersama santri, jamaah masjid, dan keluarga dhuafa.

> "Barang siapa memberi makan orang yang berpuasa, ia mendapat pahala seperti orang yang berpuasa itu, tanpa mengurangi pahalanya sedikit pun." (HR. Tirmidzi)

Anda dapat menitipkan paket berbuka kapan saja, dan kami salurkan di bulan Ramadhan.` },
  { slug: 'qurban', d: { title: 'Qurban', menu: 'Qurban', pilar: 'sosial', ikon: 'heart', urutan: 7, ringkasan: 'Tunaikan qurban Anda melalui Yayasan Mawaddah Indonesia. Daging qurban disalurkan kepada santri, kaum dhuafa, dan masyarakat yang membutuhkan.', jadwal: 'Idul Adha', fotoAlt: 'Penyaluran daging qurban kepada warga' },
    body: `Qurban adalah ibadah yang mendekatkan diri kepada Allah sekaligus berbagi kebahagiaan di hari raya. Yayasan Mawaddah Indonesia menerima amanah qurban Anda dan menyalurkannya kepada yang berhak.

> "Maka dirikanlah salat karena Tuhanmu dan berkurbanlah." (QS. Al-Kautsar: 2)

## Penyaluran qurban

- Hewan qurban dipilih sesuai syariat dan disembelih pada hari tasyrik
- Daging disalurkan kepada santri, keluarga dhuafa, dan warga sekitar
- Hubungi WhatsApp admin (0813-1777-3437) untuk pendaftaran dan informasi rekening qurban` },
  // ---------------- DAKWAH
  { slug: 'wesal-tv', d: { title: 'Wesal TV', menu: 'Wesal TV — TV Keluarga Islami', pilar: 'dakwah', ikon: 'tv', urutan: 1, unggulan: true, ringkasan: 'Televisi keluarga islami yang diproduksi dari Graha Mawaddah: kajian, nasihat keluarga, dan tayangan edukatif yang aman untuk seluruh anggota keluarga.', lokasi: 'Graha Mawaddah, Jakarta Timur', fotoAlt: 'Studio Wesal TV di Graha Mawaddah' },
    body: `**Wesal TV** adalah kegiatan utama dakwah media Yayasan Mawaddah Indonesia: televisi keluarga islami yang diproduksi dan disiarkan dari Graha Mawaddah.

## Tayangan

- Kajian dan nasihat para asatidz
- Program keluarga dan pendidikan anak
- Tayangan yang aman dan bermanfaat untuk seluruh keluarga

## Tim Wesal TV

- **Koordinator:** Bagus Suhardi
- **Konten Kreator:** Chaidir Iswandi
- **Operator MCR:** Tri Faisal Islami

## Dukung dakwah media

Donasi Anda membantu biaya produksi, peralatan siaran, dan operasional agar dakwah terus menjangkau lebih banyak keluarga.` },
  // ---------------- PENDIDIKAN
  { slug: 'tabs-1-banjarnegara', d: { title: 'Taisiru Ar-Rahman Boarding School 1 Banjarnegara', menu: 'TABS 1 Putra Banjarnegara', pilar: 'pendidikan', ikon: 'cap', urutan: 1, status: 'Berjalan', ringkasan: 'Pesantren berasrama untuk santri putra di Banjarnegara — pesantren pertama Yayasan Mawaddah Indonesia, berfokus pada tahfidz dan adab.', lokasi: 'Banjarnegara, Jawa Tengah', penerima: 'Santri putra', fotoAlt: 'Santri TABS 1 Banjarnegara' },
    body: `**Taisiru Ar-Rahman Boarding School (TABS) 1** adalah pesantren berasrama untuk santri putra di Banjarnegara, Jawa Tengah, dan menjadi pesantren pertama yang dikelola Yayasan Mawaddah Indonesia.

## Fokus pendidikan

- Tahfidz Al-Qur’an
- Pendidikan diniyah dan adab
- Kehidupan berasrama yang membentuk kemandirian

*Informasi jenjang, kurikulum, dan biaya akan dilengkapi oleh pengelola.*` },
  { slug: 'tabs-2-purbalingga', d: { title: 'Taisiru Ar-Rahman Boarding School 2 Purbalingga', menu: 'TABS 2 Putra Purbalingga', pilar: 'pendidikan', ikon: 'cap', urutan: 2, status: 'Berjalan', ringkasan: 'Pesantren berasrama untuk santri putra di Purbalingga, berfokus pada tahfidz Al-Qur’an, ilmu diniyah, dan adab.', lokasi: 'Purbalingga, Jawa Tengah', penerima: 'Santri putra', fotoAlt: 'Santri TABS 2 Purbalingga' },
    body: `**Taisiru Ar-Rahman Boarding School (TABS) 2** adalah pesantren berasrama untuk santri putra di Purbalingga, Jawa Tengah.

## Fokus pendidikan

- Tahfidz Al-Qur’an
- Pendidikan diniyah dan adab
- Pembinaan karakter dan kemandirian

*Informasi jenjang, kurikulum, dan biaya akan dilengkapi oleh pengelola.*` },
  { slug: 'tabs-3-purbalingga-putri', d: { title: 'Taisiru Ar-Rahman Boarding School 3 Purbalingga Putri', menu: 'TABS 3 Putri Purbalingga', pilar: 'pendidikan', ikon: 'cap', urutan: 3, status: 'Berjalan', ringkasan: 'Pesantren berasrama khusus santri putri di Purbalingga, membina generasi muslimah penghafal Al-Qur’an.', lokasi: 'Purbalingga, Jawa Tengah', penerima: 'Santri putri', fotoAlt: 'Santriwati TABS 3 Purbalingga' },
    body: `**Taisiru Ar-Rahman Boarding School (TABS) 3** adalah pesantren berasrama khusus santri putri di Purbalingga, Jawa Tengah.

## Fokus pendidikan

- Tahfidz Al-Qur’an
- Pendidikan diniyah dan adab muslimah
- Lingkungan asrama yang aman dan terjaga

*Informasi jenjang, kurikulum, dan biaya akan dilengkapi oleh pengelola.*` },
  { slug: 'tabs-4-cilacap', d: { title: 'Taisiru Ar-Rahman Boarding School 4 Cilacap', menu: 'TABS 4 Putra Cilacap', pilar: 'pendidikan', ikon: 'cap', urutan: 4, unggulan: true, status: 'PSB Dibuka', ringkasan: 'Pesantren baru untuk santri putra di Cilacap. Penerimaan Santri Baru (PSB) sedang dibuka.', lokasi: 'Cilacap, Jawa Tengah', penerima: 'Santri putra', fotoAlt: 'Lokasi TABS 4 Cilacap' },
    body: `**Taisiru Ar-Rahman Boarding School (TABS) 4** di Cilacap, Jawa Tengah, saat ini **membuka Penerimaan Santri Baru (PSB)** untuk santri putra.

Informasi pendaftaran ada di halaman [Penerimaan Santri Baru](/psb/), atau tanyakan langsung melalui WhatsApp admin.

## Dukung pembangunan

Sebagai pesantren yang baru dibuka, TABS 4 masih membutuhkan dukungan sarana. Salurkan wakaf Anda melalui program [Wakaf Pondok Pesantren](/wakaf-pesantren/).` },
  { slug: 'tabs-5-cianjur', d: { title: 'Taisiru Ar-Rahman Boarding School 5 Cianjur', menu: 'TABS 5 Putra Cianjur', pilar: 'pendidikan', ikon: 'cap', urutan: 5, unggulan: true, status: 'PSB Dibuka', ringkasan: 'Pesantren baru untuk santri putra di Cianjur. Penerimaan Santri Baru (PSB) sedang dibuka.', lokasi: 'Cianjur, Jawa Barat', penerima: 'Santri putra', fotoAlt: 'Lokasi TABS 5 Cianjur' },
    body: `**Taisiru Ar-Rahman Boarding School (TABS) 5** di Cianjur, Jawa Barat, saat ini **membuka Penerimaan Santri Baru (PSB)** untuk santri putra.

Informasi pendaftaran ada di halaman [Penerimaan Santri Baru](/psb/), atau tanyakan langsung melalui WhatsApp admin.

## Dukung pembangunan

Sebagai pesantren yang baru dibuka, TABS 5 masih membutuhkan dukungan sarana. Salurkan wakaf Anda melalui program [Wakaf Pondok Pesantren](/wakaf-pesantren/).` },
  { slug: 'rumah-quran', d: { title: 'Rumah Qur’an', menu: 'Rumah Qur’an', pilar: 'pendidikan', ikon: 'book', urutan: 6, ringkasan: 'Tempat belajar membaca dan menghafal Al-Qur’an bagi anak-anak dan masyarakat sekitar, dibina oleh pengajar yang amanah.', fotoAlt: 'Anak-anak belajar di Rumah Qur’an' },
    body: `Rumah Qur’an Mawaddah adalah tempat belajar Al-Qur’an untuk anak-anak dan masyarakat, dari mengenal huruf hijaiyah hingga menghafal.

## Program

- Tahsin: memperbaiki bacaan
- Tahfidz: menghafal Al-Qur’an
- Pembinaan adab dan akhlak

*Lokasi dan jadwal Rumah Qur’an akan dilengkapi oleh pengelola.*` },
];
for (const it of items) fs.writeFileSync(P + it.slug + '.md', fm(it.d) + it.body + '\n');

const news = [
  { slug: 'psb-tabs-4-dan-5', d: { title: 'Penerimaan Santri Baru TABS 4 Cilacap dan TABS 5 Cianjur Resmi Dibuka', tanggal: '2026-09-20', kategori: 'Pendidikan', ringkasan: 'Yayasan Mawaddah Indonesia membuka pendaftaran santri baru untuk dua pesantren terbarunya: Taisiru Ar-Rahman Boarding School 4 Cilacap dan 5 Cianjur.', fotoAlt: 'Calon santri bersama orang tua' },
    body: `Setelah TABS 1 Banjarnegara, TABS 2 Purbalingga, dan TABS 3 Purbalingga Putri, Yayasan Mawaddah Indonesia kini membuka **Penerimaan Santri Baru (PSB)** untuk **TABS 4 Cilacap** dan **TABS 5 Cianjur**.

Orang tua yang ingin mendaftarkan putranya dapat melihat informasi di halaman [PSB](/psb/) atau menghubungi admin melalui WhatsApp di 0813-1777-3437.

*Catatan: berita contoh — lengkapi dengan tanggal dan detail resmi.*` },
  { slug: 'wakaf-mushaf-189940', d: { title: '189.940 Mushaf Al-Qur’an Telah Tersalurkan ke Seluruh Indonesia', tanggal: '2026-08-15', kategori: 'Sosial', ringkasan: 'Melalui program Wakaf Mushaf Al-Qur’an, ratusan ribu mushaf telah sampai ke masjid, pesantren, dan rumah Qur’an di berbagai penjuru negeri.', fotoAlt: 'Penyerahan mushaf di sebuah masjid' },
    body: `Alhamdulillah, berkat kepercayaan para wakif, Yayasan Mawaddah Indonesia telah menyalurkan **189.940 mushaf Al-Qur’an** ke seluruh Indonesia.

Setiap mushaf yang dibaca menjadi pahala jariyah bagi para wakifnya. Program ini terus berjalan, dan Anda dapat ikut berwakaf melalui halaman [Wakaf Mushaf Al-Qur’an](/wakaf-quran/).

*Catatan: berita contoh — lengkapi dengan detail resmi.*` },
  { slug: 'wesal-tv-graha-mawaddah', d: { title: 'Wesal TV: Dakwah Keluarga dari Graha Mawaddah', tanggal: '2026-07-01', kategori: 'Dakwah', ringkasan: 'Mengenal Wesal TV, televisi keluarga islami yang diproduksi dari Graha Mawaddah, Jakarta Timur.', fotoAlt: 'Studio produksi Wesal TV' },
    body: `**Wesal TV** adalah kegiatan utama dakwah media Yayasan Mawaddah Indonesia. Dari studio di Graha Mawaddah, tim Wesal TV memproduksi tayangan islami yang aman dan bermanfaat bagi seluruh keluarga.

Selengkapnya di halaman [Wesal TV](/wesal-tv/).

*Catatan: berita contoh — lengkapi dengan detail resmi.*` },
];
for (const n of news) fs.writeFileSync(B + n.slug + '.md', fm(n.d) + n.body + '\n');
console.log('program', items.length, 'berita', news.length);
