import fs from 'fs';
import { generateOgImage } from './ogImageGenerator';

async function testOgImage() {
  try {
    const buffer = await generateOgImage('Test Title', 'Test Content', 'https://via.placeholder.com/300');
    fs.writeFileSync('test-og-image.png', buffer);
    console.log('OG image generated and saved as test-og-image.png');
  } catch (error) {
    console.error('Error during test:', error);
  }
}

testOgImage();
