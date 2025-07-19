 import React from "react";
import type { AadharData } from "../dto/types";

interface Props {
  data: AadharData;
  onClear: () => void;
}

const ExtractedInfo: React.FC<Props> = ({ data, onClear }) => {
  const handleCopy = () => {
    const formatted = Object.entries(data)
      .map(([key, value]) => `${key.replace(/([A-Z])/g, " $1")}: ${value || "--"}`)
      .join("\n");

    navigator.clipboard.writeText(formatted)
      .then(() => alert("Copied to clipboard!"))
      .catch(() => alert("Failed to copy."));
  };

  return (
    <div className="bg-white shadow p-6 rounded-md w-full">
      <h2 className="text-lg font-semibold mb-4">📄 Extracted Aadhar Information</h2>

      {Object.entries(data).map(([key, value]) => (
        <div key={key} className="mb-2">
          <p className="text-sm font-medium capitalize">
            {key.replace(/([A-Z])/g, " $1")}:
          </p>
          <p className="text-gray-700">{value || "--"}</p>
        </div>
      ))}

      <div className="flex gap-3 mt-4">
        <button
          onClick={handleCopy}
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
        >
          Copy Data
        </button>
        <button
          onClick={onClear}
          className="bg-blue-300 text-gray-800 px-4 py-2 rounded hover:bg-gray-400"
        >
          Clear Data
        </button>
      </div>
    </div>
  );
};

export default ExtractedInfo;
