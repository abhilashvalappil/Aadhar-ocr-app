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

export class GoogleVisionOCRService {
  private client: ImageAnnotatorClient;

  constructor() {
    let clientConfig: any = {};

    if (process.env.GOOGLE_APPLICATION_CREDENTIALS_JSON_BASE64) {
      // Production: Use base64 credentials
      const credentialsJson = Buffer.from(
        process.env.GOOGLE_APPLICATION_CREDENTIALS_JSON_BASE64, 
        'base64'
      ).toString('utf-8');
      
      const credentials = JSON.parse(credentialsJson);
      clientConfig = {
        credentials: credentials,
        projectId: credentials.project_id
      };
    } else {
      // Development: Use file
      clientConfig = {
        keyFilename: path.join(__dirname, '../config/credentials/aadhaar-ocr-service.json'),
      };
    }

    this.client = new ImageAnnotatorClient(clientConfig);
  }

  async extractTextFromBuffer(buffer: Buffer): Promise<string> {
    const [result] = await this.client.textDetection({ image: { content: buffer } });
    const detections = result.textAnnotations;
    return detections?.[0]?.description || '';
  }
}