import { CircleX } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ImageUploader from "../../../../components/ImagePopup/ImageUploader";
import { uploadImage } from "../../../../store/slice/productVariantSlice";

const VariantImage = () => {
  const dispatch = useDispatch();
  const [variantTypeValue, setVariantTypeValue] = useState([]);
  const [file, setFile] = useState("");
  const {
    variantOptions,
    variantValues,
    primaryVariant,
    variantImage,
    isLoading,
    error,
  } = useSelector((state) => state.productVariant);

  useEffect(() => {
    setVariantTypeValue(variantValues[primaryVariant]);
  }, [variantValues, primaryVariant]);

  useEffect(() => {
    if (error) {
      console.log("api error:", error);
    }

    if (file) {
      dispatch(uploadImage(file));
      setFile(null);
    }
  }, [file]);

  console.log("object", { variantOptions, variantValues, primaryVariant });
  console.log("setVariantTypeValue", variantTypeValue);
  console.log("file", file);
  console.log("variantImage", variantImage);

  return (
    <div className="p-3 mt-8 rounded-md outline-dashed outline-offset-2 outline-gray-300">
      <h1 className="mb-5 font-bold text-text1">Variants images</h1>
      <div className="flex flex-col gap-y-4">
        {variantTypeValue?.map((value) => (
          <div className="flex w-full gap-x-10">
            <div className="w-1/3 p-2 border border-gray-300 rounded-md h-fit">
              {value}
            </div>
            <div className="grid w-full grid-cols-5 p-4 border border-gray-300 rounded-md gap-x-3">
              {variantImage.length > 0 ? (
                <div className="w-full h-[150px] relative border-4 border-blue-400 overflow-hidden rounded-2xl">
                  <CircleX className="absolute top-0 right-0 cursor-pointer hover:opacity-50"></CircleX>
                  <img
                    src="https://firebasestorage.googleapis.com/v0/b/ecom-accessed.appspot.com/o/products%2F1726325152681-iphone-15-pro-max_3.png?alt=media"
                    alt=""
                    className="object-contain w-full h-full"
                  />
                </div>
              ) : (
                <ImageUploader setFile={setFile}></ImageUploader>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default VariantImage;
