/** Pemetaan pilar/kategori → nada & emblem placeholder, supaya visual konsisten. */
export const pilarVisual = {
  sosial: { tone: 'blush', emblem: 'heart' },
  dakwah: { tone: 'plum', emblem: 'tv' },
  pendidikan: { tone: 'rose', emblem: 'cap' },
} as const;

export const kategoriVisual = {
  Dakwah: { tone: 'plum', emblem: 'tv' },
  Pendidikan: { tone: 'rose', emblem: 'cap' },
  Sosial: { tone: 'blush', emblem: 'book' },
  'Kabar Yayasan': { tone: 'sand', emblem: 'sprout' },
} as const;
