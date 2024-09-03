import React, { useState, useEffect } from "react";

const ImageModal = ({ images, onClose, onSelect }) => {
  const [imageList, setImageList] = useState(images);
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    if (images.length > 0) {
      setImageList(images);
      setSelectedImage(images[0]);
    }
  }, [images]);

  const handleImageClick = (url) => {
    const selectedIndex = imageList.indexOf(url);
    const firstIndex = 0;

    if (selectedIndex !== -1 && selectedIndex !== firstIndex) {
      const newImageList = [...imageList];

      [newImageList[firstIndex], newImageList[selectedIndex]] = [
        newImageList[selectedIndex],
        newImageList[firstIndex],
      ];

      setImageList(newImageList);
      setSelectedImage(newImageList[firstIndex]);
      console.log("preview", newImageList);
    }
  };

  const handleAddClick = () => {
    if (selectedImage) {
      onSelect(selectedImage, imageList);
    }
    onClose();
    console.log("add", imageList);
  };

  return (
    <div className="w-full fixed inset-0 bg-gray-500 bg-opacity-75 flex justify-center items-center">
      <div className="w-3/4 h-3/4 bg-white p-6 rounded-lg relative">
        <h2 className="text-xl font-bold mb-4">Product Image</h2>
        <div className="w-full flex flex-col lg:flex-row gap-4">
          {selectedImage && (
            <div className="flex-1 flex justify-center items-center">
              <img
                src={selectedImage}
                className="max-w-full max-h-64 object-contain rounded-lg border-2 border-gray-300"
                alt="Selected"
              />
            </div>
          )}
          <div className="w-full lg:w-1/2 grid grid-cols-5 gap-2">
            {imageList.map((image, index) => (
              <div key={index} className="w-24 h-24">
                <img
                  src={image}
                  className="w-full h-full object-cover cursor-pointer border-2 border-transparent hover:border-blue-500 rounded-lg"
                  onClick={() => handleImageClick(image)}
                  alt={`Thumbnail ${index}`}
                />
              </div>
            ))}
          </div>
        </div>
        <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 ">
          <button
            onClick={handleAddClick}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
          >
            Add
          </button>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 ml-2"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default ImageModal;
