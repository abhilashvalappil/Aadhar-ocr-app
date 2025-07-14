import { OcrResult } from "../entities/OcrResult";

export interface OcrService {
    extractTextFromBuffer(buffer: Buffer): Promise<OcrResult>
}