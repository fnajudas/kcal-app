/**
 * Generate PNG icons from SVG
 * Run: npm install sharp && node scripts/generate-icons.js
 */

const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const sizes = [72, 96, 128, 144, 152, 192, 384, 512];
const svgPath = path.join(__dirname, '../public/icons/icon.svg');
const outputDir = path.join(__dirname, '../public/icons');

async function generateIcons() {
    console.log('Generating PNG icons from SVG...\n');
    
    const svgBuffer = fs.readFileSync(svgPath);
    
    for (const size of sizes) {
        const outputPath = path.join(outputDir, `icon-${size}x${size}.png`);
        
        await sharp(svgBuffer)
            .resize(size, size)
            .png()
            .toFile(outputPath);
        
        console.log(`Created: icon-${size}x${size}.png`);
    }
    
    console.log('\nDone! Icons generated successfully.');
}

generateIcons().catch(console.error);
