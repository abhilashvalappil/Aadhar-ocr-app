import { Router } from 'express';
import { aadhaarUpload } from '../../infrastructure/config/multer';
import { OCRController } from '../controllers/OCRController'; 

const router = Router();
const controller = new OCRController();

router.post('/aadhaar', aadhaarUpload, controller.ocrFromAadhaarImages.bind(controller));

export default router;
