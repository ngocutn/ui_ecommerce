import { FileSlidersIcon } from "lucide-react";
import { useState, useEffect } from "react";

const ImagePopup = ({ files, onClose, onSelect }) => {
  const [fileList, setFileList] = useState(files);
  const [selectedImage, setSelectedImage] = useState(files[0].preview);

  const handleImageClick = (url) => {
    const selectedIndex = fileList.indexOf(url);

    if (selectedIndex !== -1 && selectedIndex !== 0) {
      const newFileList = [...fileList];

      [newFileList[0], newFileList[selectedIndex]] = [
        newFileList[selectedIndex],
        newFileList[0],
      ];

      setFileList(newFileList);
      setSelectedImage(newFileList[0].preview);
    }
  };

  const handleAddClick = () => {
    if (selectedImage) {
      onSelect(fileList);
    }
    onClose();
  };

  const handleDeleteClick = (name) => {
    setFileList((prevFiles) => prevFiles.filter((file) => file.name !== name));
  };

  return (
    <div className="w-full fixed inset-0 bg-gray-500 bg-opacity-75 flex justify-center items-center z-[30]">
      <div className="w-3/4 h-1/2 bg-white p-6 rounded-lg relative">
        <h2 className="text-xl font-bold mb-4">Product Image</h2>
        <div className="w-full flex flex-col min-md:flex-row gap-4">
          {selectedImage && (
            <div className="flex-1 flex justify-center items-center">
              <img
                src={selectedImage}
                className="max-w-full max-h-64 object-contain rounded-lg border-2 border-gray-300"
                alt="Selected"
              />
            </div>
          )}
          <div className="w-full min-md:w-1/2 grid grid-cols-5 gap-2">
            {fileList.map((image, index) => (
              <div key={index} className="w-24 h-24 relative">
                <img
                  src={image.preview}
                  className="w-full h-full object-cover cursor-pointer border-2 border-transparent hover:border-blue-500 rounded-lg"
                  onClick={() => handleImageClick(image)}
                />
                <button
                  type="button"
                  onClick={() => handleDeleteClick(image.name)}
                  className="absolute top-0 right-0 py-2 px-3 bg-gray-200 text-sm rounded-full hover:bg-gray-500 hover:text-white"
                >
                  X
                </button>
              </div>
            ))}
          </div>
        </div>
        <div className="absolute bottom-6 right-5 ">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 border-2 border-gray-200 text-gray-500 rounded-lg hover:bg-gray-200 "
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleAddClick}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 ml-2"
          >
            Choose Primary
          </button>
        </div>
      </div>
    </div>
  );
};

export default ImagePopup;
