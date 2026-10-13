import sharp from 'sharp';
const src = 'brand/logo-original.webp';
// white -> alpha (colour-to-alpha)
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
const W = (w, h) => ({ create: { width: w, height: h, channels: 3, background: '#ffffff' } });
// mark: heart only, mask the "Mawaddah" letters that intrude bottom-right
const markRaw = await sharp(src).extract({ left: 318, top: 258, width: 410, height: 330 })
  .composite([{ input: await sharp(W(170, 50)).png().toBuffer(), left: 240, top: 280 }]).png().toBuffer();
const mark = await toAlpha(markRaw);
const lockup = await toAlpha(await sharp(src).extract({ left: 160, top: 258, width: 692, height: 466 }).png().toBuffer());
await sharp(mark).resize({ width: 240 }).webp({ quality: 90 }).toFile('src/assets/logo-mark.webp');
await sharp(mark).resize({ width: 240 }).png().toFile('brand/logo-mark.png');
await sharp(lockup).resize({ width: 520 }).webp({ quality: 90 }).toFile('src/assets/logo-lockup.webp');
await sharp(lockup).png().toFile('brand/logo-lockup.png');
// favicons: mark centered on square
const sq = async (size, bg) => {
  const m = await sharp(mark).resize({ width: Math.round(size * 0.86), height: Math.round(size * 0.86), fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } }).toBuffer();
  return sharp({ create: { width: size, height: size, channels: 4, background: bg } }).composite([{ input: m, gravity: 'center' }]).png();
};
await (await sq(32, { r: 0, g: 0, b: 0, alpha: 0 })).toFile('public/favicon-32.png');
await (await sq(180, '#FBF6F2')).toFile('public/apple-touch-icon.png');
await (await sq(512, '#FBF6F2')).toFile('public/icon-512.png');
// OG image
const lk = await sharp(lockup).resize({ height: 380 }).toBuffer();
await sharp({ create: { width: 1200, height: 630, channels: 4, background: '#FBF6F2' } })
  .composite([{ input: lk, gravity: 'center' }]).jpeg({ quality: 88 }).toFile('public/og-image.jpg');
console.log('ok');
// --- fix mark artifact + horizontal lockup for header
const mark2Raw = await sharp(src).extract({ left: 318, top: 258, width: 410, height: 330 })
  .composite([
    { input: await sharp(W(170, 50)).png().toBuffer(), left: 240, top: 280 },
    { input: await sharp(W(45, 40)).png().toBuffer(), left: 0, top: 290 },
  ]).png().toBuffer();
const mark2 = await sharp(await toAlpha(mark2Raw)).trim().png().toBuffer();
await sharp(mark2).resize({ width: 240 }).webp({ quality: 90 }).toFile('src/assets/logo-mark.webp');
await sharp(mark2).png().toFile('brand/logo-mark.png');
const word = await sharp(await toAlpha(await sharp(src).extract({ left: 165, top: 588, width: 685, height: 134 }).png().toBuffer())).trim().png().toBuffer();
const mH = 150, m = await sharp(mark2).resize({ height: mH }).toBuffer({ resolveWithObject: true });
const w = await sharp(word).resize({ height: 92 }).toBuffer({ resolveWithObject: true });
const gap = 22, width = m.info.width + gap + w.info.width;
await sharp({ create: { width, height: mH, channels: 4, background: { r: 0, g: 0, b: 0, alpha: 0 } } })
  .composite([{ input: m.data, left: 0, top: 0 }, { input: w.data, left: m.info.width + gap, top: Math.round((mH - 92) / 2) + 4 }])
  .webp({ quality: 92 }).toFile('src/assets/logo-horizontal.webp');
await sharp({ create: { width, height: mH, channels: 4, background: { r: 0, g: 0, b: 0, alpha: 0 } } })
  .composite([{ input: m.data, left: 0, top: 0 }, { input: w.data, left: m.info.width + gap, top: Math.round((mH - 92) / 2) + 4 }])
  .png().toFile('brand/logo-horizontal.png');
console.log('horizontal', width, mH);
