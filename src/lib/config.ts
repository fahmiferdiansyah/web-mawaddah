// Kunci publishable aman di sisi klien: seluruh akses dikunci Row Level Security di database.
// Dipisah dari supabase.ts agar halaman publik bisa membaca alamat tanpa memuat pustaka Supabase.
export const SUPABASE_URL = 'https://algdzqcpjfxusssrxjjd.supabase.co';
export const SUPABASE_KEY = 'sb_publishable_S4Ua3EP0XZ0l613MldblxA_wyF3ccLR';
export const SESI_KEY = 'mawaddah-portal-auth';
export const PROFIL_KEY = 'mawaddah-profil';
export const fotoUrl = (uid: string, v: number | string = '') =>
  `${SUPABASE_URL}/storage/v1/object/public/avatar/${uid}/foto.jpg${v ? `?v=${v}` : ''}`;
