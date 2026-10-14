import { defineCollection } from 'astro:content';
import { z } from 'astro/zod';
import { glob } from 'astro/loaders';

/**
 * Program — setiap file .md menjadi satu halaman di /<nama-file>/
 * (mis. air-bersih.md → mawaddah.or.id/air-bersih/) dan otomatis masuk menu.
 */
const program = defineCollection({
  loader: glob({ pattern: '**/[^_]*.md', base: './src/content/program' }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      menu: z.string(), // label singkat di menu
      pilar: z.enum(['sosial', 'dakwah', 'pendidikan']),
      ringkasan: z.string(),
      urutan: z.number().default(99),
      unggulan: z.boolean().default(false),
      ikon: z.enum(['book', 'moon', 'heart', 'cap', 'users', 'sprout', 'drop', 'mosque', 'tv', 'home', 'bowl', 'shield', 'hands']).default('heart'),
      status: z.string().optional(), // mis. "PSB Dibuka", "PMB Dibuka"
      lokasi: z.string().optional(),
      penerima: z.string().optional(),
      jadwal: z.string().optional(),
      target: z.number().optional(),
      terkumpul: z.number().optional(),
      donasi: z.boolean().default(true), // tampilkan tombol donasi
      foto: image().optional(),
      fotoAlt: z.string().default(''),
      wa: z.string().optional(), // nomor WhatsApp admin PSB (format 62...)
    }),
});

const berita = defineCollection({
  loader: glob({ pattern: '**/[^_]*.md', base: './src/content/berita' }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      tanggal: z.coerce.date(),
      kategori: z.enum(['Dakwah', 'Pendidikan', 'Sosial', 'Kabar Yayasan']),
      ringkasan: z.string(),
      penulis: z.string().default('Tim Media Mawaddah'),
      foto: image().optional(),
      fotoAlt: z.string().default(''),
    }),
});

export const collections = { program, berita };
