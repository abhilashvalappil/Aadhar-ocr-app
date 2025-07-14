
import { Request, Response, NextFunction } from "express";
import { AadhaarUploadFields } from "../../application/dto/AadharOcrDto";
import { AadhaarOCRUseCase } from "../../application/use-cases/AadharOcrUsecase";
import { GoogleVisionOCRService } from "../../infrastructure/services/GoogleVisionOcrService";  

export class OCRController {
    async ocrFromAadhaarImages(req:Request, res:Response,next:NextFunction): Promise<void>{
        try {
          
            const files = req.files as AadhaarUploadFields;
            const frontImage = files?.["aadhaarFront"]?.[0];
            const backImage = files?.["aadhaarBack"]?.[0];  

            
             if (!frontImage || !backImage) {
                res.status(400).json({ message: "Both front and back Aadhaar images are required." });
                return;
            }
            const ocrService = new GoogleVisionOCRService();
            const useCase = new AadhaarOCRUseCase(ocrService);
            
            const frontResult = await useCase.execute(frontImage.buffer);
            const backResult = await useCase.execute(backImage.buffer);
             res.json({
                frontText: frontResult.text,
                backText: backResult.text
            })
        } catch (error) {
            next(error)
        }
    }
}