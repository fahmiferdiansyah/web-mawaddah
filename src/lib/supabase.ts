import { createClient } from '@supabase/supabase-js';

import { SUPABASE_URL, SUPABASE_KEY, SESI_KEY } from './config';
export { SUPABASE_URL, SUPABASE_KEY };

export const supabase = createClient(SUPABASE_URL, SUPABASE_KEY, {
  auth: { persistSession: true, storageKey: SESI_KEY },
});

export const esc = (s: unknown) =>
  String(s ?? '').replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]!);

/** Markdown ringan yang aman: judul (##), daftar (-), **tebal**, *miring*, tautan [teks](https://…), paragraf. */
export function mdRingan(src: string): string {
  const inline = (t: string) =>
    esc(t)
      .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
      .replace(/\*(.+?)\*/g, '<em>$1</em>')
      .replace(/\[([^\]]+)\]\((https?:\/\/[^\s)]+)\)/g, '<a href="$2" target="_blank" rel="noopener nofollow">$1</a>');
  const out: string[] = [];
  let list: string[] = [];
  const flush = () => { if (list.length) { out.push('<ul>' + list.map((l) => `<li>${inline(l)}</li>`).join('') + '</ul>'); list = []; } };
  for (const raw of src.replace(/\r/g, '').split('\n')) {
    const line = raw.trim();
    if (!line) { flush(); continue; }
    if (/^[-*] /.test(line)) { list.push(line.slice(2)); continue; }
    flush();
    if (line.startsWith('### ')) out.push(`<h3>${inline(line.slice(4))}</h3>`);
    else if (line.startsWith('## ')) out.push(`<h2>${inline(line.slice(3))}</h2>`);
    else out.push(`<p>${inline(line)}</p>`);
  }
  flush();
  return out.join('\n');
}

export const tgl = (iso: string) =>
  new Date(iso).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' });
