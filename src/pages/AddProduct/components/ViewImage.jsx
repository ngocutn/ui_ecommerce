import { useEffect, useState } from "react";
import { useFormContext } from "react-hook-form";
import { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import ImagePopup from "../../../components/ImagePopup/imagePopup";
import { useDispatch, useSelector } from "react-redux";
import { Files } from "lucide-react";
import { uploadFile } from "../../../store/slice/addProductSlice";

const ViewImage = () => {
  const [files, setFiles] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const dispatch = useDispatch();
  const { error, productImages } = useSelector((state) => state.addProduct);

  const handleReplace = () => {
    setShowModal(true);
  };

  const replaceImage = (updatedFileList) => {
    setFiles(updatedFileList);
    setShowModal(false);
  };
  const onDrop = useCallback((acceptedFiles) => {
    if (acceptedFiles?.length) {
      setFiles((prevFiles) => [
        ...prevFiles,
        ...acceptedFiles.map((file) =>
          Object.assign(file, { preview: URL.createObjectURL(file) })
        ),
      ]);
      return;
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "image/png": [".png"],
      "image/jpeg": [".jpeg"],
      "image/jpg": [".jpg"],
    },
    maxSize: 10 * 1024 * 1024,
    maxFiles: 10,
  });

  const removeImage = (name) => {
    setFiles((prevFiles) => prevFiles.filter((file) => file.name !== name));
  };

  const {
    formState: { errors },
  } = useFormContext();

  useEffect(() => {
    if (files.length > 0) {
      console.log("load");
      dispatch(uploadFile(files));
    }
  }, [files, dispatch]);

  useEffect(() => {
    return () => {
      files.forEach((file) => URL.revokeObjectURL(file.preview));
    };
  }, [files]);

  console.log("files", files);
  console.log("productImages", productImages);

  return (
    <div>
      <p className="text-xl font-semibold">
        Product Image <span className="text-red-600">*</span>
      </p>
      <div
        id="viewImage"
        className="w-full h-[200px] flex items-center justify-between gap-3 my-3 px-6 border 2 py-4 rounded-md"
      >
        <div
          {...getRootProps()}
          className={`border-2 border-dashed border-blue-400 cursor-pointer 2 rounded-md flex items-center justify-center h-[160px] ${
            files.length > 1 ? "w-1/3" : "w-full"
          } ${files.length === 1 ? "w-1/2 " : ""}`}
        >
          <input {...getInputProps()} />
          {isDragActive ? (
            <p>Drop the files here ...</p>
          ) : (
            <div className="flex flex-col items-center gap-5 text-center text-gray-500">
              <i className="fa-solid fa-xl fa-images"></i>
              <span className="px-2 text-gray-500">
                <span className="font-semibold text-blue-400 underline">
                  Click to upload
                </span>{" "}
                or drag and drop <br />
                <i className="mt-3">(Allow maximum 10 files)</i>
              </span>
            </div>
          )}
        </div>

        {files.length > 0 && (
          <div
            className={`${
              files.length === 1 ? "w-full" : "w-2/3"
            } h-[160px] grid grid-cols-2 gap-1 `}
          >
            {files.slice(0, 3).map((image, index) => (
              <div
                key={index}
                className={`relative group ${index === 0 ? "row-span-2" : ""} ${
                  files.length === 1 ? "col-span-2" : "w-full"
                } ${files.length >= 3 && index > 0 ? "h-[80px]" : "h-[160px]"}`}
              >
                <img
                  src={image.preview}
                  alt={image.name}
                  // onLoad={() => URL.revokeObjectURL(image.preview)}
                  className="object-cover w-full h-full rounded-md"
                />
                {index === 0 && (
                  <div className="absolute inset-0 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 group-hover:bg-black group-hover:bg-opacity-60">
                    <button
                      type="button"
                      onClick={() => handleReplace()}
                      className="px-2 py-1 m-1 text-sm text-black bg-white rounded-md hover:bg-gray-200"
                    >
                      Replace
                    </button>
                    <button
                      type="button"
                      onClick={() => removeImage(image.name)}
                      className="px-2 py-1 m-1 text-sm text-black bg-white rounded-md hover:bg-gray-200"
                    >
                      Remove
                    </button>
                  </div>
                )}
                {index === 2 && files.length > 3 && (
                  <div
                    className="absolute inset-0 flex items-center justify-center text-xl font-bold text-white bg-gray-500 cursor-pointer bg-opacity-60"
                    onClick={() => handleReplace()}
                  >
                    +{files.length - 3}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
        {showModal && (
          <ImagePopup
            files={files}
            onClose={() => setShowModal(false)}
            onSelect={replaceImage}
          />
        )}
      </div>
    </div>
  );
};

export default ViewImage;
