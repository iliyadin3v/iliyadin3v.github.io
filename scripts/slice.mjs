// Dev helper: downscale a tall capture and slice it into viewable tiles.
import sharp from 'sharp';
const [file, width = '760', tileH = '1500'] = process.argv.slice(2);
const W = +width, H = +tileH;
const buf = await sharp(file).resize({ width: W }).png().toBuffer();
const { height } = await sharp(buf).metadata();
const base = file.replace(/\.png$/, '');
let i = 0;
for (let y = 0; y < height; y += H) {
  await sharp(buf).extract({ left: 0, top: y, width: W, height: Math.min(H, height - y) }).jpeg({ quality: 78 }).toFile(`${base}-s${i}.jpg`);
  i++;
}
console.log(file, height, 'tiles', i);
