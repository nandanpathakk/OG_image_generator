import puppeteer from 'puppeteer';

// Helper function to truncate content
function truncateContent(content: string, maxLength: number): string {
  if (content.length > maxLength) {
    return content.substring(0, maxLength) + '...';
  }
  return content;
}

export async function generateOgImage(title: string, content: string, imageUrl: string): Promise<Buffer> {
  try {
    // Truncate content to a maximum length of 200 characters
    const maxContentLength = 200;
    const truncatedContent = truncateContent(content, maxContentLength);

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
            align-items: center;
            justify-content: center;
            font-family: 'Helvetica Neue', Arial, sans-serif;
            background-color: #f4f4f4;
            color: #333;
            box-sizing: border-box;
            padding: 0;
        }
        .container {
            width: 100%;
            max-width: 1100px;
            display: flex;
            align-items: center;
            justify-content: flex-start;
            box-sizing: border-box;
            padding: 10px;
            gap: 10px;
        }
        .image-wrapper {
            flex: 0 0 auto;
            display: flex;
            justify-content: center;
            align-items: center;
            margin-right: 10px;
            box-sizing: border-box;
        }
        .image-wrapper img {
            max-width: 100%;
            height: auto;
            object-fit: cover;
            border-radius: 8px;
        }
        .text-content {
            flex: 1;
            box-sizing: border-box;
            word-wrap: break-word;
            overflow: hidden;
        }
        .title {
            font-size: 48px;
            color: #222;
            margin: 0 0 20px 0;
        }
        .content {
            font-size: 24px;
            color: #555;
            margin: 0;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: normal;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="image-wrapper">
            <img src="${imageUrl}" alt="Image"/>
        </div>
        <div class="text-content">
            <div class="title">${title}</div>
            <div class="content">${truncatedContent}</div>
        </div>
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
