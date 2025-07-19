import React, { useState } from "react";
import FileUpload from "./FileUpload";  
import ExtractedInfo from "./ExtractedInfo"; 
import type { AadharData } from "../dto/types"; 
import { fetchDataFromAadharPhotos } from "../api/api";
import { showErrorToast } from "../utils/toastUtils";
import {
  extractName,
  extractAadharNumber,
  extractDOB,
  extractGender,
  extractAddress,
  extractPincode
} from '../utils/aadharExtractors';
import isValidAadharText from "../utils/isValidAadhar";


const AadharOCRExtractor: React.FC = () => {
  const [frontImage, setFrontImage] = useState<File | null>(null);
  const [backImage, setBackImage] = useState<File | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [aadharData, setAadharData] = useState<AadharData>({
    name: "",
    number: "",
    dob: "",
    gender: "",
    address: "",
    pincode: "",
  });

  const handleExtract = async() => {

     if (!frontImage && !backImage) {
        showErrorToast("Both images are required");
        return;
      } else if (!frontImage) {
        showErrorToast("Front image is required");
        return;
      } else if (!backImage) {
        showErrorToast("Back image is required");
        return;
      }

    const formData = new FormData();
    formData.append("aadhaarFront", frontImage);
    formData.append("aadhaarBack", backImage);

    setLoading(true);

    const response = await fetchDataFromAadharPhotos(formData);

     if (!response || !response.frontText || !response.backText) {
      showErrorToast("Could not extract Aadhaar details");
      setLoading(false);
      return;
    }

    // Aadhaar validation
    const isAadharFront = isValidAadharText(response.frontText);
    const isAadharBack = isValidAadharText(response.backText);

    if (!isAadharFront || !isAadharBack) {
      showErrorToast("Uploaded images do not appear to be Aadhaar cards");
      setLoading(false);
      return;
    }
    
     if (response && response.frontText && response.backText) {
      setAadharData({
        name: extractName(response.frontText),
        number: extractAadharNumber(response.frontText),
        dob: extractDOB(response.frontText),
        gender: extractGender(response.frontText),
        address: extractAddress(response.backText),
        pincode: extractPincode(response.backText)
      });
    }
    setLoading(false);
  };

  const handleClear = () => {
    setFrontImage(null);
    setBackImage(null);
    setAadharData({ name: "", number: "", dob: "", gender: "", address: "", pincode: "" });
    localStorage.removeItem("aadharData");
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4 md:p-0">
      <h1 className="text-center text-2xl font-bold text-white bg-blue-600 p-4 rounded mb-16">
        Aadhar Card OCR Extractor
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-6xl mx-auto">
        <div className="bg-white shadow p-6 rounded-md">
          <h2 className="text-lg font-semibold mb-4">📤 Upload Aadhar Card Images</h2>
          <FileUpload label="Front Side of Aadhar Card" image={frontImage} onImageChange={setFrontImage} />
          <div className="my-4"></div>
          <FileUpload label="Back Side of Aadhar Card" image={backImage} onImageChange={setBackImage} />
          <button
              onClick={handleExtract}
              className="w-full mt-6 bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
              disabled={loading}
            >
              {loading ? 'Extracting...' : 'Extract Aadhar Information'}
            </button>
        </div>

        <ExtractedInfo
          data={aadharData}
          onClear={handleClear}
        />
      </div>
    </div>
  );
};

export default AadharOCRExtractor;
