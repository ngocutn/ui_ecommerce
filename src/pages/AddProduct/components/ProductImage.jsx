import { useState } from "react";
import { useFormContext } from "react-hook-form";
import ImageModal from "../../../components/ImagePopup/imageModal";

const ProductImage = () => {
  const [selectedImages, setSelectedImages] = useState([]);
  const [selectedFiles, setSelectedFiles] = useState([]);

  const [replaceIndex, setReplaceIndex] = useState(null);

  const [showModal, setShowModal] = useState(false);

  const onSelectFile = (e) => {
    const selectedFile = e.target.files;
    setSelectedFiles(selectedFile);

    const selectedFilesArray = Array.from(selectedFile).map((file) =>
      URL.createObjectURL(file)
    );

    setSelectedImages((prevImages) => {
      const newImages = [...prevImages, ...selectedFilesArray].slice(0, 10);
      return newImages;
    });
  };

  const removeImage = () => {
    setSelectedImages((prevImages) => prevImages.slice(1));
    // setSelectedFiles((prevFiles) => prevFiles.slice(1));

    const [fst, ...remain] = selectedFiles;
    // const files = selectedFiles.slice(1);
    setSelectedFiles(remain);
  };

  const replaceImage = (newImageUrl, updatedImageList, updatedFileList) => {
    // setSelectedImages((prevImages) =>
    //   prevImages.map((img, index) =>
    //     index === replaceIndex ? newImageUrl : img
    //   )
    // );
    setSelectedImages(updatedImageList);
    setSelectedFiles(updatedFileList);
    // setSelectedFiles(updatedImageList);

    setShowModal(false);
  };

  const handleReplace = (index) => {
    setReplaceIndex(index);
    setShowModal(true);
  };

  const {
    register,
    formState: { errors },
  } = useFormContext();

  console.log("selecteImage", selectedImages);

  return (
    <div>
      <p className="text-xl font-semibold">
        Product Image <span className="text-red-600">*</span>
      </p>
      <div
        id="productImage"
        className="w-full h-[200px] flex items-center justify-between gap-3 my-3 px-6 border 2 py-4 rounded-md"
      >
        <label
          className={`border-2 border-dashed border-blue-400 cursor-pointer 2 rounded-md flex items-center justify-center h-[160px] ${
            selectedImages.length > 1 ? "w-1/3" : "w-full"
          } ${selectedImages.length === 1 ? "w-1/2 " : ""}`}
        >
          <div className="flex flex-col items-center gap-5 text-center text-gray-500">
            <i className="fa-solid fa-xl fa-images"></i>
            <span className="px-2 text-gray-500">
              <span className="font-semibold text-blue-400 underline">
                Click to upload
              </span>{" "}
              or drag and drop
            </span>
          </div>
          <input
            type="file"
            name="images"
            multiple
            accept="image/png, image/jpg, image/jpeg"
            className="hidden"
            {...register("images", { onChange: onSelectFile })}
          />
        </label>

        {selectedImages.length > 0 && (
          <div
            className={`${
              selectedImages.length === 1 ? "w-full" : "w-2/3"
            } h-[160px] grid grid-cols-2 gap-1 `}
          >
            {selectedImages.slice(0, 3).map((image, index) => (
              <div
                key={index}
                className={`relative group ${index === 0 ? "row-span-2" : ""} ${
                  selectedImages.length === 1 ? "col-span-2" : "w-full"
                } ${
                  selectedImages.length >= 3 && index > 0
                    ? "h-[80px]"
                    : "h-[160px]"
                }`}
              >
                <img
                  src={image}
                  className="object-cover w-full h-full rounded-md"
                />
                {index === 0 && (
                  <div className="absolute inset-0 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 group-hover:bg-black group-hover:bg-opacity-60">
                    <button
                      type="button"
                      onClick={() => handleReplace(index)}
                      className="px-2 py-1 m-1 text-sm text-black bg-white rounded-md hover:bg-gray-200"
                    >
                      Replace
                    </button>
                    <button
                      type="button"
                      onClick={() => removeImage(index)}
                      className="px-2 py-1 m-1 text-sm text-black bg-white rounded-md hover:bg-gray-200"
                    >
                      Remove
                    </button>
                  </div>
                )}
                {index === 2 && selectedImages.length > 3 && (
                  <div
                    className="absolute inset-0 flex items-center justify-center text-xl font-bold text-white bg-gray-500 cursor-pointer bg-opacity-60"
                    onClick={() => handleReplace(index)}
                  >
                    +{selectedImages.length - 3}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {showModal && (
          <ImageModal
            files={selectedFiles}
            images={selectedImages}
            onClose={() => setShowModal(false)}
            onSelect={replaceImage}
          />
        )}
      </div>
    </div>
  );
};

export default ProductImage;
