const sharp = require('sharp');
const path = require('path');
const fs = require('fs');

const inputPath = path.join(__dirname, 'images', 'banner-original.jpg');
const outputPath = path.join(__dirname, 'images', 'banner.jpg');

// Ensure the images folder exists
if (!fs.existsSync(path.join(__dirname, 'images'))) {
  fs.mkdirSync(path.join(__dirname, 'images'));
}

console.log('Optimizing and cropping banner image...');

sharp(inputPath)
  .resize(1400, 500, {
    fit: 'cover',
    position: 'center' // crops to center
  })
  .jpeg({ quality: 85, progressive: true })
  .toFile(outputPath)
  .then(info => {
    console.log(`\x1b[32m✔ Banner image successfully created at ${outputPath}\x1b[0m`);
    console.log(`Original Size: ~${(fs.statSync(inputPath).size / 1024).toFixed(1)} KB`);
    console.log(`Optimized Size: ${(info.size / 1024).toFixed(1)} KB`);
    console.log(`Dimensions: ${info.width}x${info.height}px`);
  })
  .catch(err => {
    console.error('\x1b[31m✖ Error resizing image:\x1b[0m', err);
    process.exit(1);
  });
