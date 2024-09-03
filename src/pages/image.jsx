import React, { useState } from "react";

const ImageUploader = () => {
  const [selectedImages, setSelectedImages] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [replaceIndex, setReplaceIndex] = useState(null);

  const onSelectFile = (e) => {
    const selectedFile = e.target.files;
    console.log(selectedFile);

    const selectedFilesArray = Array.from(selectedFile).map((file) =>
      URL.createObjectURL(file)
    );
    console.log(selectedFilesArray);

    setSelectedImages((prevImages) => {
      const newImages = [...prevImages, ...selectedFilesArray].slice(0, 10);
      return newImages;
    });
  };

  const removeImage = (indexToRemove) => {
    setSelectedImages((prevImages) =>
      prevImages.filter((_, index) => index !== indexToRemove)
    );
  };

  const replaceImage = (newImageUrl) => {
    setSelectedImages((prevImages) =>
      prevImages.map((img, index) =>
        index === replaceIndex ? newImageUrl : img
      )
    );
    setShowModal(false);
  };

  const handleReplace = (index) => {
    setReplaceIndex(index);
    setShowModal(true);
  };

  return (
    <div className="flex flex-col my-3 p-4 border-2 border-gray-300 py-2 rounded-md">
      <label className="cursor-pointer w-full">
        Click to upload or drag and drop
        <input
          type="file"
          name="images"
          onChange={onSelectFile}
          multiple
          accept="image/png, image/jpg, image/jpeg"
          className="hidden"
        />
      </label>

      <div className="flex flex-wrap mt-2 space-x-2">
        {selectedImages.length < 10 && (
          <div className="w-24 h-24 border-2 border-dashed border-gray-300 rounded-md flex items-center justify-center">
            <span className="text-gray-500">+</span>
          </div>
        )}
        {selectedImages.slice(0, 3).map((image, index) => (
          <div key={index} className="relative w-24 h-24">
            <img
              src={image}
              alt={`product-${index}`}
              className="w-full h-full object-cover rounded-md"
            />
            {index === 0 && (
              <div className="absolute inset-0 flex items-center justify-center bg-gray-500 bg-opacity-50 space-x-1">
                <button
                  onClick={() => handleReplace(index)}
                  className="bg-white py-1 px-2 m-1 text-sm text-black rounded-md hover:bg-gray-200"
                >
                  Replace
                </button>
                <button
                  onClick={() => removeImage(index)}
                  className="bg-white py-1 px-2 m-1 text-sm text-black rounded-md hover:bg-gray-200"
                >
                  Remove
                </button>
              </div>
            )}
            {index === 2 && selectedImages.length > 3 && (
              <div className="absolute inset-0 flex items-center justify-center bg-gray-500 bg-opacity-50 text-white text-xl font-bold">
                +{selectedImages.length - 3}
              </div>
            )}
          </div>
        ))}
      </div>

      {showModal && (
        <ImageModal
          images={selectedImages}
          onClose={() => setShowModal(false)}
          onSelect={replaceImage}
        />
      )}
    </div>
  );
};

const ImageModal = ({ images, onClose, onSelect }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-4 rounded-md max-w-sm w-full">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Select an Image</h2>
          <button onClick={onClose} className="text-red-500 font-bold">
            X
          </button>
        </div>
        <div className="grid grid-cols-3 gap-2">
          {images.map((image, index) => (
            <div
              key={index}
              className="w-24 h-24 cursor-pointer"
              onClick={() => onSelect(image)}
            >
              <img
                src={image}
                alt={`modal-img-${index}`}
                className="w-full h-full object-cover rounded-md"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ImageUploader;
