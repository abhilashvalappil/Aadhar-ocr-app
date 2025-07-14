import { AadhaarOCRResponseDTO } from "../../application/dto/AadharOcrDto";

export interface IocrService {
  processImages(
    frontImage: Buffer,
    backImage: Buffer
  ): Promise<AadhaarOCRResponseDTO | { message: string }>;
}