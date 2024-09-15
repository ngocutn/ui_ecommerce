import React, { useState, useEffect } from "react";
import { array } from "yup";

const ImageModal = ({ files, images, onClose, onSelect }) => {
  const [fileList, setFileList] = useState(files);
  const [imageList, setImageList] = useState(images);
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(
    () => {
      if (images.length > 0) {
        setFileList(files);
        setImageList(images);
        setSelectedImage(images[0]);
      }
    },
    [images],
    [files]
  );

  const handleImageClick = (url) => {
    const selectedIndex = imageList.indexOf(url);
    const firstIndex = 0;

    if (selectedIndex !== -1 && selectedIndex !== firstIndex) {
      const newImageList = [...imageList];
      const newFileList = [...fileList];

      [newImageList[firstIndex], newImageList[selectedIndex]] = [
        newImageList[selectedIndex],
        newImageList[firstIndex],
      ];

      [newFileList[firstIndex], newFileList[selectedIndex]] = [
        newFileList[selectedIndex],
        newFileList[firstIndex],
      ];

      setImageList(newImageList);
      setFileList(newFileList);
      setSelectedImage(newImageList[firstIndex]);
      console.log("preview", newImageList);
    }
  };

  const handleAddClick = () => {
    if (selectedImage) {
      onSelect(selectedImage, imageList, fileList);
    }
    onClose();
    console.log("add", imageList);
    console.log("add file", fileList);
  };

  const handleDeleteClick = (url) => {
    const indexToRemove = imageList.indexOf(url);

    // const newImageList = imageList.filter((image) => image !== url);
    // const newFileList = fileList.filter((_, index) => index !== indexToRemove);
    const newImageList = imageList.filter(
      (_, index) => index !== indexToRemove
    );

    const files = Array.from(fileList);
    const newFileList = files.filter((_, index) => index !== indexToRemove);
    console.log("file list", files);

    setFileList(newFileList);
    setImageList(newImageList);
    if (selectedImage === url) {
      setSelectedImage(newImageList.length > 0 ? newImageList[0] : null);
    }

    console.log("delete", newImageList);
    console.log("delete file", newFileList);
  };

  return (
    <div className="w-full fixed inset-0 bg-gray-500 bg-opacity-75 flex justify-center items-center">
      <div className="w-3/4 h-1/2 bg-white p-6 rounded-lg relative">
        <h2 className="text-xl font-bold mb-4">Product Image</h2>
        <div className="w-full flex flex-col desktop-up:flex-row gap-4">
          {selectedImage && (
            <div className="flex-1 flex justify-center items-center">
              <img
                src={selectedImage}
                className="max-w-full max-h-64 object-contain rounded-lg border-2 border-gray-300"
                alt="Selected"
              />
            </div>
          )}
          <div className="w-full desktop-up:w-1/2 grid grid-cols-5 gap-2">
            {imageList.map((image, index) => (
              <div key={index} className="w-24 h-24 relative">
                <img
                  src={image}
                  className="w-full h-full object-cover cursor-pointer border-2 border-transparent hover:border-blue-500 rounded-lg"
                  onClick={() => handleImageClick(image)}
                />
                <button
                  type="button"
                  onClick={() => handleDeleteClick(image)}
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

export default ImageModal;
