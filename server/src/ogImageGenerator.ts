import puppeteer from 'puppeteer';

export async function generateOgImage(title: string, content: string, imageUrl: string): Promise<Buffer> {
  try {
    // Launch a headless browser
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    // Set the content of the page
    const htmlContent = `
      <html>
        <head>
          <style>
            body {
              width: 1200px;
              height: 630px;
              margin: 0;
              display: flex;
              flex-direction: column;
              align-items: center;
              justify-content: center;
              font-family: 'Helvetica Neue', Arial, sans-serif;
              background-color: #f4f4f4;
              color: #333;
              text-align: left; /* Align text to the left */
              box-sizing: border-box;
              padding: 20px;
            }
            .container {
              width: 100%;
              max-width: 1100px;
              box-sizing: border-box;
            }
            .title {
              font-size: 48px;
              color: #222;
              margin: 0 0 20px 0;
            }
            .content {
              font-size: 24px;
              color: #555;
              margin: 0 0 20px 0;
              overflow: hidden;
              text-overflow: ellipsis;
              white-space: nowrap;
            }
            img {
              max-width: 300px;
              height: auto;
              object-fit: cover;
              border-radius: 8px;
              padding-bottom: 20px;
            }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="title">${title}</div>
            <div class="image-wrapper">
              <img src="${imageUrl}" alt="Image"/>
            </div>
            <div class="content">${content}</div>
          </div>
        </body>
      </html>
    `;
    
    console.log('Setting page content');
    await page.setContent(htmlContent);

    // Capture a screenshot
    console.log('Taking screenshot');
    const buffer = await page.screenshot({ type: 'png' });

    // Close the browser
    console.log('Closing browser');
    await browser.close();

    return buffer;
  } catch (error) {
    console.error('Error generating OG image:', error);
    throw error;
  }
}
