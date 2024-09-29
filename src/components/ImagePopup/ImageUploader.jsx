import { ImagePlus } from "lucide-react";
import React, { useRef } from "react";

const ImageUploader = ({ setFiles }) => {
  const fileInputRef = useRef(null);

  const handleClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (event) => {
    const uploadedFiles = Array.from(event.target.files).map((file) => ({
      file, // Store original file for later use
      preview: URL.createObjectURL(file), // Create preview URL
    }));

    // Append new files to the existing state
    setFiles((prevFiles) => [...prevFiles, ...uploadedFiles]);
  };

  return (
    <div>
      <div
        onClick={handleClick}
        className="w-full h-[150px] outline-dashed outline-offset-2 outline-gray-300 rounded-lg flex items-center justify-center"
      >
        <ImagePlus
          stroke="#e7e7e7"
          size={50}
          className="cursor-pointer"
        ></ImagePlus>
      </div>
      <input
        type="file"
        accept="image/*"
        ref={fileInputRef}
        onChange={handleFileChange}
        style={{ display: "none" }} // Ẩn thẻ input
      />
    </div>
  );
};

export default ImageUploader;
