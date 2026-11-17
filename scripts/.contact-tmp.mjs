import sharp from "sharp";
import { readdirSync } from "node:fs"; import { join } from "node:path";
const [dir, out] = process.argv.slice(2);
const files = readdirSync(dir).filter(f => /\.(jpe?g|png|webp)$/i.test(f)).sort();
const W = 300, H = 225, cols = 6, rows = Math.ceil(files.length / cols);
const tiles = await Promise.all(files.map(async (f, i) => {
  const img = await sharp(join(dir, f)).rotate().resize(W, H, { fit: "contain", background: "#222" }).toBuffer();
  const label = Buffer.from(`<svg width="${W}" height="22"><rect width="${W}" height="22" fill="#000a"/><text x="4" y="16" font-size="14" fill="#fff" font-family="sans-serif">${i + 1}: ${f.slice(-24).replace(/&/g,"")}</text></svg>`);
  return [{ input: img, left: (i % cols) * W, top: Math.floor(i / cols) * H }, { input: label, left: (i % cols) * W, top: Math.floor(i / cols) * H }];
}));
await sharp({ create: { width: cols * W, height: rows * H, channels: 3, background: "#111" } }).composite(tiles.flat()).jpeg({ quality: 70 }).toFile(out);
console.log(out, files.length);
