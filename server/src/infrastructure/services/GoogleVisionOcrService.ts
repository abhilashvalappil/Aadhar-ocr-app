// import { ImageAnnotatorClient } from '@google-cloud/vision';
// import path from 'path';

// export class GoogleVisionOCRService {
//   private client: ImageAnnotatorClient;

//   constructor() {
//     this.client = new ImageAnnotatorClient({
//       keyFilename: path.join(__dirname, '../config/credentials/aadhaar-ocr-service.json'),
//     });
//   }

//   async extractTextFromBuffer(buffer: Buffer): Promise<string> {
//     const [result] = await this.client.textDetection({ image: { content: buffer } });
//     const detections = result.textAnnotations;
//     return detections?.[0]?.description || '';
//   }
// }

import { ImageAnnotatorClient } from '@google-cloud/vision';
import path from 'path';
import fs from 'fs';

export class GoogleVisionOCRService {
  private client: ImageAnnotatorClient;

  constructor() {
    // STEP 1: Decode base64 and write to a JSON file if not already exists
    const credentialsB64 = process.env.GOOGLE_APPLICATION_CREDENTIALS_JSON_BASE64;
    const credPath = path.join(__dirname, '../config/credentials/aadhaar-ocr-service.json');

    if (credentialsB64 && !fs.existsSync(credPath)) {
      const decoded = Buffer.from(credentialsB64, 'base64').toString('utf8');
      fs.mkdirSync(path.dirname(credPath), { recursive: true });
      fs.writeFileSync(credPath, decoded);
    }

    // STEP 2: Initialize Google Vision Client
    this.client = new ImageAnnotatorClient({
      keyFilename: credPath,
    });
  }

  async extractTextFromBuffer(buffer: Buffer): Promise<string> {
    const [result] = await this.client.textDetection({ image: { content: buffer } });
    const detections = result.textAnnotations;
    return detections?.[0]?.description || '';
  }
}

