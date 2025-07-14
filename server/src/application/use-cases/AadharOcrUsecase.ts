import { GoogleVisionOCRService } from "../../infrastructure/services/GoogleVisionOcrService";

export class AadhaarOCRUseCase {
  constructor(private ocrService: GoogleVisionOCRService) {}

  async execute(imageBuffer: Buffer) {
    const text = await this.ocrService.extractTextFromBuffer(imageBuffer);
    return { text };
  }
}
