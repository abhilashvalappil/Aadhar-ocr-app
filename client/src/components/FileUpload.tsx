import React from "react";

interface FileUploadProps {
  label: string;
  image: File | null;
  onImageChange: (file: File) => void;
}

const FileUpload: React.FC<FileUploadProps> = ({ label, image, onImageChange }) => {
  return (
    <div className="border border-dashed border-gray-300 p-4 rounded-md text-center w-full">
      <p className="font-medium mb-2">{label}</p>
      <input
        type="file"
        accept="image/*"
        onChange={(e) => e.target.files && onImageChange(e.target.files[0])}
        className="hidden"
        id={label}
      />
      <label htmlFor={label} className="cursor-pointer text-blue-600 underline">
        Click to upload or drag and drop
      </label>
      {image && (
        <div className="mt-4">
          <img src={URL.createObjectURL(image)} alt={label} className="w-full max-h-52 object-contain mx-auto" />
        </div>
      )}
    </div>
  );
};

export default FileUpload;
