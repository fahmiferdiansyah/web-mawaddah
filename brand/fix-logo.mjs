// Membangun ulang logo horizontal dari logo-original.webp tanpa memotong hati (lobus kiri) maupun huruf.
import sharp from 'sharp';
const src = 'brand/logo-original.webp';
async function toAlpha(buf) {
  const { data, info } = await sharp(buf).removeAlpha().raw().toBuffer({ resolveWithObject: true });
  const out = Buffer.alloc(info.width * info.height * 4);
  for (let i = 0, j = 0; i < data.length; i += 3, j += 4) {
    const r = data[i], g = data[i + 1], b = data[i + 2];
    let a = Math.max(255 - r, 255 - g, 255 - b) / 255;
    if (a < 0.04) a = 0;
    const f = (c) => (a === 0 ? 0 : Math.max(0, Math.min(255, Math.round((c - 255 * (1 - a)) / a))));
    out[j] = f(r); out[j + 1] = f(g); out[j + 2] = f(b); out[j + 3] = Math.round(a * 255);
  }
  return sharp(out, { raw: { width: info.width, height: info.height, channels: 4 } }).png().toBuffer();
}
const SPLIT = Number(process.argv[2] ?? 566); // baris pemisah antara hati dan tulisan
const all = await toAlpha(await sharp(src).png().toBuffer());
// Ujung bawah hati (x 400–440) menjorok sampai baris ~582 di antara huruf; pisahkan per-piksel, bukan per-baris.
const TIP = { x0: 400, x1: 440, y1: 584 };
async function keep(buf, test) {
  const { data, info } = await sharp(buf).raw().toBuffer({ resolveWithObject: true });
  for (let y = 0; y < info.height; y++) for (let x = 0; x < info.width; x++) if (!test(x, y)) data[(y * info.width + x) * 4 + 3] = 0;
  return sharp(data, { raw: { width: info.width, height: info.height, channels: 4 } }).png().toBuffer();
}
const inTip = (x, y) => x >= TIP.x0 && x <= TIP.x1 && y < TIP.y1;
const allMark = await keep(all, (x, y) => y < SPLIT || inTip(x, y));
const allWord = await keep(all, (x, y) => y >= SPLIT && !inTip(x, y));
const crop = async (box, img = all) => sharp(await sharp(img).extract(box).png().toBuffer()).trim({ threshold: 1 }).png().toBuffer();
const mark = await crop({ left: 150, top: 240, width: 724, height: TIP.y1 - 240 }, allMark);
const word = await crop({ left: 150, top: SPLIT, width: 724, height: 740 - SPLIT }, allWord);
const mm = await sharp(mark).metadata(), wm = await sharp(word).metadata();
console.log('mark', mm.width, mm.height, 'word', wm.width, wm.height);
const H = 150, PAD = 10, gap = 24;
const m = await sharp(mark).resize({ height: H - 2 * PAD }).toBuffer({ resolveWithObject: true });
const wH = Math.round((H - 2 * PAD) * 0.62);
const w = await sharp(word).resize({ height: wH }).toBuffer({ resolveWithObject: true });
const width = PAD + m.info.width + gap + w.info.width + PAD;
const comp = [
  { input: m.data, left: PAD, top: PAD },
  { input: w.data, left: PAD + m.info.width + gap, top: Math.round((H - wH) / 2) },
];
const base = () => sharp({ create: { width, height: H, channels: 4, background: { r: 0, g: 0, b: 0, alpha: 0 } } }).composite(comp);
await base().webp({ quality: 92 }).toFile('src/assets/logo-horizontal.webp');
await base().png().toFile('brand/logo-horizontal.png');
console.log('horizontal', width, H);
