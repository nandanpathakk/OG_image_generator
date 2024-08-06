"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateOgImage = void 0;
const puppeteer_1 = __importDefault(require("puppeteer"));
function generateOgImage(title, content, imageUrl) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            // Launch a headless browser
            const browser = yield puppeteer_1.default.launch();
            const page = yield browser.newPage();
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
            yield page.setContent(htmlContent);
            // Capture a screenshot
            console.log('Taking screenshot');
            const buffer = yield page.screenshot({ type: 'png' });
            // Close the browser
            console.log('Closing browser');
            yield browser.close();
            return buffer;
        }
        catch (error) {
            console.error('Error generating OG image:', error);
            throw error;
        }
    });
}
exports.generateOgImage = generateOgImage;
