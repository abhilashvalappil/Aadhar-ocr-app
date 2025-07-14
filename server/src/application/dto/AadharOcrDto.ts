export interface AadhaarUploadFields {
  aadhaarFront?: Express.Multer.File[];
  aadhaarBack?: Express.Multer.File[];
}

export interface AadhaarOCRRequestDTO {
  frontImageBuffer: Buffer;
  backImageBuffer: Buffer;
}

export interface AadhaarOCRResponseDTO {
  name: string;
  dob: string;
  gender: string;
  aadhaarNumber: string;
  address: string;
  pincode: string;
}