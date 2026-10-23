/**
 * DATA YAYASAN — satu-satunya tempat untuk mengganti informasi kontak,
 * rekening, dan angka capaian. Nilai bertanda [PLACEHOLDER] wajib diganti.
 */
export const site = {
  name: 'Yayasan Mawaddah Indonesia',
  short: 'Mawaddah',
  tagline: 'Wadah dakwah, pendidikan, dan sosial — dari Graha Mawaddah untuk seluruh Indonesia.',
  description:
    'Yayasan Mawaddah Indonesia berdiri sejak 2016 sebagai wadah kegiatan dakwah, pendidikan, dan sosial: Wesal TV, wakaf mushaf Al-Qur’an, pembangunan masjid dan sumur, serta pesantren Taisiru Ar-Rahman Boarding School.',
  founded: 2016,
  building: 'Graha Mawaddah',
  legal: 'SK Kemenkumham AHU-0020237.AH.01.04 Tahun 2016',
  address: 'Jl. Swadaya 1 No. 59, Kel. Pondok Ranggon, Kec. Cipayung, Jakarta Timur, DKI Jakarta — Indonesia',
  addressShort: 'Pondok Ranggon, Cipayung, Jakarta Timur',
  mapsUrl: 'https://maps.app.goo.gl/wMNvcvbWGjp1DyCD6',
  email: 'mawaddah.or.id@gmail.com',
  phone: '0813-1777-3437',
  whatsapp: '6281317773437',
  hours: 'Senin–Sabtu, 08.00–16.00 WIB', // [PLACEHOLDER]
  social: [
    { label: 'Instagram @mawaddah.or.id', icon: 'instagram', href: 'https://instagram.com/mawaddah.or.id' },
    { label: 'YouTube Wesal TV', icon: 'youtube', href: 'https://youtube.com/' }, // [PLACEHOLDER]
    { label: 'Facebook', icon: 'facebook', href: 'https://facebook.com/' }, // [PLACEHOLDER]
  ],
} as const;

/** Menu "Tentang Kami" */
export const tentangMenu = [
  { href: '/profil/', label: 'Profil Yayasan', desc: 'Sejarah, legalitas, dan Graha Mawaddah' },
  { href: '/pengurus/', label: 'Pengurus', desc: 'Struktur organisasi yayasan' },
  { href: '/rekening/', label: 'Rekening Resmi', desc: 'Satu-satunya rekening donasi yayasan' },
  { href: '/berita/', label: 'Kabar & Kegiatan', desc: 'Laporan dan cerita dari lapangan' },
  { href: '/galeri/', label: 'Galeri', desc: 'Dokumentasi kegiatan' },
  { href: '/faq/', label: 'Tanya Jawab (FAQ)', desc: 'Pertanyaan seputar donasi & program' },
  { href: '/kontak/', label: 'Kontak & Alamat', desc: 'Kantor pusat di Jakarta Timur' },
] as const;

/** Tautan bantuan di footer */
export const bantuanMenu = [
  { href: '/rekening/', label: 'Rekening Resmi' },
  { href: '/donasi/', label: 'Cara Berdonasi' },
  { href: '/faq/', label: 'Tanya Jawab (FAQ)' },
  { href: '/kontak/', label: 'Hubungi Kami' },
] as const;

/**
 * Rekening resmi yayasan.
 * Bank dan nama pemilik rekening sudah dikonfirmasi oleh yayasan.
 */
export const rekening = [
  { bank: 'Bank Syariah Indonesia', kode: 'BSI', nomor: '7098570009', atasNama: 'Yayasan Mawaddah Indonesia', peruntukan: 'Donasi Operasional Yayasan' },
  { bank: 'Bank Syariah Indonesia', kode: 'BSI', nomor: '7112111225', atasNama: 'Yayasan Mawaddah Indonesia', peruntukan: 'Wakaf Mushaf Al-Qur’an' },
  { bank: 'Bank Syariah Indonesia', kode: 'BSI', nomor: '7112111241', atasNama: 'Yayasan Mawaddah Indonesia', peruntukan: 'Wakaf Pesantren' },
] as const;

/** Pendaftaran STAM: rekening biaya pendaftaran & admin khusus STAM */
export const stamInfo = {
  rekening: '7112111257',
  atasNama: 'Yayasan Mawaddah Indonesia',
  adminWa: '6285710463077',
  adminTampil: '+62 857-1046-3077',
} as const;

/** Legalitas yayasan */
export const legalitas = [
  { label: 'Akta Pendirian', value: 'Akta Notaris Nomor 02, tanggal 8 April 2016', note: 'Notaris Hitler Masya Patrianagara, S.H.' },
  { label: 'Pengesahan Badan Hukum', value: 'SK Menkumham Nomor AHU-0020237.AH.01.04', note: 'Tanggal 13 April 2016' },
  { label: 'Akta Perubahan', value: 'Akta Notaris Nomor 10, tanggal 24 April 2026', note: 'Notaris Hitler Masya Patrianagara, S.H.' },
  { label: 'SK Perubahan', value: 'SK Kemenkumham Nomor AHU-0016127.AH.01.12 Tahun 2026', note: 'Persetujuan perubahan data yayasan' },
] as const;

/**
 * Mitra terafiliasi: biro haji & umrah. Data dari situs resmi mereka (almaztour.id) —
 * mohon dicek ulang oleh pihak Almaz Tour sebelum situs dipublikasikan.
 */
export const almaz = {
  brand: 'Almaz Tour',
  company: 'PT Alif Mazaya Nusantara',
  formerly: 'Alif Tour · Wesal Travel',
  since: 2012,
  ppiu: '313',
  akreditasi: 'A',
  tagline: 'Lebih aman, nyaman, dan berkesan.',
  site: 'https://almaztour.id/',
  paket: 'https://almaztour.id/',
  /** Salam pembuka WhatsApp — menyebut bahwa info berasal dari web Mawaddah */
  pesan: 'Assalamu’alaikum, saya tahu info dari website Yayasan Mawaddah. Saya ingin bertanya tentang paket umrah/haji Almaz Tour.',
  email: 'almaztour.official@gmail.com',
  whatsapp: [
    { name: 'CS Almaz - Ishaq', label: '0812-1000-9948', wa: '6281210009948' },
    { name: 'CS Almaz - Abdurrozaq', label: '0821-3000-838', wa: '628213000838' },
  ],
  officeCibubur: 'Perumahan Citragrand Cibubur CBD AR01 No. 35, Kelurahan Jatirangga, Kecamatan Jatisampurna, Kota Bekasi, Jawa Barat 17434',
  officeMaps: 'https://maps.app.goo.gl/fsG2Ca7inhXUuaaW8',
  officePusat: 'Refah Residence Dramaga, Blok R4, Jl. Raya Babengket, Ciampea, Dramaga, Bogor',
  layanan: [
    { icon: 'kaaba', title: 'Umrah', text: 'Paket umrah sesuai sunnah dengan pembimbing Ahlussunnah wal Jama’ah.' },
    { icon: 'plane', title: 'Haji Khusus', text: 'Pendampingan jamaah haji khusus dengan layanan yang lebih nyaman dan terarah.' },
    { icon: 'map-pin', title: 'Wisata Halal', text: 'Perjalanan wisata halal ke luar negeri untuk keluarga dan rombongan.' },
    { icon: 'hands', title: 'Badal Umrah & Haji', text: 'Layanan badal umrah dan badal haji bagi yang berhalangan.' },
    { icon: 'calendar', title: 'Tabungan & Cicilan', text: 'Tabungan umrah dan cicilan agar berangkat lebih ringan.' },
  ],
} as const;

/** Visi, misi, nilai, tujuan, dan pilar — dari dokumen VisiMisi_YMI_REVISED_FINAL */
export const visi =
  'Terwujudnya generasi Islam yang unggul dalam iman, ilmu, dan amal — sebagai pilar kemajuan umat menuju masyarakat yang diridhai Allah Subhanahu wa Ta’ala.';

export const misi = [
  'Menyelenggarakan pendidikan Islam yang berkualitas, berakidah shahih, dan integratif berdasarkan Al-Qur’an dan As-Sunnah sesuai manhaj salafus shalih.',
  'Membentuk generasi Qur’ani yang hafizh, berakhlak mulia, berilmu, dan siap berdakwah serta berkontribusi di tengah umat.',
  'Mengembangkan kompetensi pendidik dan tenaga kependidikan secara profesional, terprogram, dan berkelanjutan.',
  'Menyelenggarakan program dakwah, pembinaan keluarga, dan pelayanan sosial yang berdampak nyata bagi masyarakat.',
  'Membangun tata kelola yayasan yang profesional, transparan, akuntabel, dan mandiri secara finansial.',
  'Menjalin kemitraan strategis dengan berbagai pihak untuk memperluas jangkauan manfaat pendidikan dan dakwah Islam.',
] as const;

export const nilai = [
  { nama: 'Ikhlas', makna: 'Bekerja semata-mata mengharap ridha Allah Ta’ala, tanpa pamrih dan riya’.' },
  { nama: 'Amanah', makna: 'Mengemban setiap tanggung jawab dengan kejujuran, integritas tinggi, dan dapat dipercaya.' },
  { nama: 'Ihsan', makna: 'Memberikan yang terbaik dalam setiap pekerjaan dan pelayanan, seolah-olah Allah senantiasa melihat.' },
  { nama: 'Akhlakul Karimah', makna: 'Menjadikan akhlak mulia sebagai cermin seluruh sikap, ucapan, dan perbuatan dalam berkhidmat.' },
  { nama: 'Ta’awun', makna: 'Membangun sinergi, kerja sama, dan gotong royong dalam kebaikan dan ketakwaan kepada Allah.' },
  { nama: 'Istiqamah', makna: 'Konsisten, teguh, dan berkesinambungan dalam menjalankan amanah, program, dan nilai-nilai yayasan.' },
] as const;

export const tujuan = [
  'Terwujudnya peserta didik yang beriman, hafizh Al-Qur’an, berakhlak mulia, dan berdaya saing di setiap jenjang pendidikan yang dinaungi yayasan.',
  'Tercapainya standar mutu pendidikan nasional (8 SNP) di seluruh unit lembaga yang berada di bawah naungan Yayasan Mawaddah Indonesia.',
  'Meningkatnya kapasitas dan kompetensi seluruh SDM yayasan melalui program pembinaan, pelatihan, dan evaluasi yang terstruktur dan berkelanjutan.',
  'Terwujudnya kemandirian finansial yayasan yang ditopang oleh unit usaha halal, produktif, dan dikelola secara amanah.',
  'Meningkatnya jangkauan dakwah dan pelayanan sosial yayasan yang terprogram, terukur, dan berdampak nyata bagi masyarakat sekitar.',
] as const;

export const pilarPengembangan = [
  { nama: 'Pendidikan', program: ['PAUD/TK', 'SD, SMP, SMA', 'Tahfizh Al-Qur’an', 'Bahasa Arab', 'Literasi dan Teknologi'] },
  { nama: 'Dakwah', program: ['Kajian rutin', 'Pembinaan remaja', 'Pembinaan keluarga', 'Dakwah digital'] },
  { nama: 'Sosial Kemanusiaan', program: ['Santunan dhuafa', 'Beasiswa pendidikan', 'Layanan kemanusiaan', 'Program wakaf dan sedekah'] },
  { nama: 'Ekonomi Umat', program: ['Unit usaha yayasan', 'Kantin sehat', 'Koperasi syariah', 'Pelatihan kewirausahaan'] },
  { nama: 'Pengembangan SDM', program: ['Pelatihan guru', 'Pengembangan kepemimpinan', 'Sertifikasi kompetensi', 'Pembinaan karakter islami'] },
] as const;

export const motto = ['Berilmu', 'Beramal', 'Berdakwah', 'Berkhidmat untuk Umat'] as const;

/** Capaian — angka asli dari yayasan */
export const capaian = [
  { angka: 189940, suffix: '', label: 'Mushaf Al-Qur’an tersalurkan', note: 'ke seluruh Indonesia' },
  { angka: 5, suffix: '', label: 'Taisiru Ar-Rahman Boarding School', note: '3 berjalan · 2 baru · PSB dibuka di 4 pesantren' },
  { angka: Math.max(new Date().getFullYear(), 2026) - 2016, sejak: 2016, suffix: '+', label: 'Tahun berkhidmat', note: 'sejak 2016' },
  { angka: 1, suffix: '', label: 'Televisi keluarga islami', note: 'Wesal TV' },
] as const;

export const pilar = {
  sosial: {
    nama: 'Sosial',
    arab: 'رعاية',
    href: '/sosial/',
    lead: 'Wakaf mushaf, masjid, sumur air bersih, hingga tanggap bencana — kebaikan yang dirasakan langsung oleh umat.',
  },
  dakwah: {
    nama: 'Dakwah',
    arab: 'دعوة',
    href: '/dakwah/',
    lead: 'Menyapa keluarga Indonesia melalui Wesal TV, televisi keluarga islami dari Graha Mawaddah.',
  },
  pendidikan: {
    nama: 'Pendidikan',
    arab: 'تعليم',
    href: '/pendidikan/',
    lead: 'Mencetak generasi Qur’ani melalui Taisiru Ar-Rahman Boarding School dan Rumah Qur’an.',
  },
} as const;
export type PilarKey = keyof typeof pilar;

export const waLink = (text: string) =>
  `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(text)}`;

export const waLinkTo = (wa: string, text: string) =>
  `https://wa.me/${wa}?text=${encodeURIComponent(text)}`;

export const rupiah = (n: number) =>
  new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(n);

export const tanggal = (d: Date) =>
  new Intl.DateTimeFormat('id-ID', { day: 'numeric', month: 'long', year: 'numeric' }).format(d);
