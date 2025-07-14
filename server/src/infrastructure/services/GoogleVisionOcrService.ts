import { ImageAnnotatorClient } from '@google-cloud/vision';
import path from 'path';

export class GoogleVisionOCRService {
  private client: ImageAnnotatorClient;

  constructor() {
    this.client = new ImageAnnotatorClient({
      keyFilename: path.join(__dirname, '../config/credentials/aadhaar-ocr-service.json'),
    });
  }

  async extractTextFromBuffer(buffer: Buffer): Promise<string> {
    const [result] = await this.client.textDetection({ image: { content: buffer } });
    const detections = result.textAnnotations;
    return detections?.[0]?.description || '';
  }
}
