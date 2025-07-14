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
import dotenv from 'dotenv';
dotenv.config();


export class GoogleVisionOCRService {
  private client: ImageAnnotatorClient;

  constructor() {
    const credentialsString = process.env.GOOGLE_CREDENTIAL_JSON;

    if (!credentialsString) throw new Error('Google credentials not found in env');

    const credentials = JSON.parse(credentialsString);

    this.client = new ImageAnnotatorClient({ credentials });
  }

  async extractTextFromBuffer(buffer: Buffer): Promise<string> {
    const [result] = await this.client.textDetection({ image: { content: buffer } });
    const detections = result.textAnnotations;
    return detections?.[0]?.description || '';
  }
}
