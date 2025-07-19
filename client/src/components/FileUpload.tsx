import React from "react";
import type { ChangeEvent } from "react";
import { FiUploadCloud } from "react-icons/fi";

interface FileUploadProps {
  label: string;
  image: File | null;
  onImageChange: (file: File) => void;
}

const FileUpload: React.FC<FileUploadProps> = ({ label, image, onImageChange }) => {
  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      onImageChange(e.target.files[0]);
    }
  };

  return (
    <div className="border-2 border-dashed border-gray-300 p-8 rounded-md text-center relative group hover:border-blue-400 transition-colors w-full">
      <input
        type="file"
        id={label}
        accept="image/*"
        onChange={handleFileChange}
        className="absolute inset-0 opacity-0 cursor-pointer"
      />
      <label htmlFor={label} className="cursor-pointer flex flex-col items-center justify-center">
        <p className="mb-2 font-medium text-gray-800">{label}</p>
        <FiUploadCloud className="text-4xl text-gray-400 mb-2 group-hover:text-blue-600" />
        <p className="text-sm text-gray-500 group-hover:text-blue-500">
          Click to upload or drag and drop
        </p>
        {image && (
          <p className="mt-2 text-sm text-green-600">{image.name}</p>
        )}
      </label>

      {image && (
        <div className="mt-4">
          <img
            src={URL.createObjectURL(image)}
            alt={label}
            className="w-full max-h-52 object-contain mx-auto rounded"
          />
        </div>
      )}
    </div>
  );
};

export default FileUpload;
