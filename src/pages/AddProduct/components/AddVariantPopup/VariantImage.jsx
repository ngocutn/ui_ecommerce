import { CircleX } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ImageUploader from "../../../../components/ImagePopup/ImageUploader";
import {
  setVariantImages,
  uploadImage,
} from "../../../../store/slice/productVariantSlice";

const VariantImage = () => {
  const dispatch = useDispatch();
  const [variantTypeValue, setVariantTypeValue] = useState([]);
  const [file, setFile] = useState("");
  const [variantImage, setVariantImage] = useState({});
  const [selectedValue, setSelectedValue] = useState("");
  const {
    variantOptions,
    variantValues,
    primaryVariant,
    variantImageUrl,
    isLoading,
    error,
  } = useSelector((state) => state.productVariant);

  const handleRemoveImage = (valueName, imageUrl) => {
    setVariantImage((prev) => {
      return prev.map((variant) => {
        if (variant.valueName === valueName) {
          return {
            ...variant,
            images: variant.images.filter((image) => image !== imageUrl),
          };
        }

        return variant;
      });
    });
  };

  useEffect(() => {
    const currentVariant = variantValues.find(
      (v) => v.variantType === primaryVariant
    );
    setVariantTypeValue(currentVariant ? currentVariant.values : []);
  }, [variantValues, primaryVariant]);

  useEffect(() => {
    if (file) {
      dispatch(uploadImage(file));
      setFile(null);
    }
  }, [file, dispatch]);

  useEffect(() => {
    const initialState = variantTypeValue.map((value) => ({
      valueName: value,
      images: [],
    }));

    setVariantImage(initialState);
  }, [variantTypeValue, dispatch]);

  useEffect(() => {
    dispatch(setVariantImages(variantImage));
  }, [variantImage]);

  useEffect(() => {
    if (variantImageUrl && selectedValue) {
      setVariantImage((prev) =>
        prev.map((value) => {
          if (value.valueName === selectedValue) {
            return {
              ...value,
              images: [...value.images, variantImageUrl], // Thêm ảnh vào đúng valueName
            };
          }
          return value;
        })
      );
    }
  }, [variantImageUrl]);

  return (
    <div className="p-3 mt-8 rounded-md outline-dashed outline-offset-2 outline-gray-300">
      <h1 className="mb-5 font-bold text-text1">Variants images</h1>
      <div className="flex flex-col gap-y-4">
        {variantTypeValue?.map((value) => {
          // Tìm variantImage tương ứng với value hiện tại
          const currentVariantImage = variantImage.find(
            (img) => img.valueName === value
          );
          return (
            <div className="flex w-full gap-x-10" key={value}>
              <div className="w-1/3 p-2 border border-gray-300 rounded-md h-fit">
                {value}
              </div>
              <div
                className="grid w-full grid-cols-5 p-4 border border-gray-300 rounded-md gap-x-3"
                onClick={() => setSelectedValue(value)}
              >
                {currentVariantImage?.images?.length > 0 ? (
                  currentVariantImage.images.map((image, index) => (
                    <div
                      key={index}
                      className="w-full h-[150px] relative border-4 border-blue-400 overflow-hidden rounded-2xl"
                    >
                      <CircleX
                        className="absolute top-0 right-0 cursor-pointer hover:opacity-50"
                        onClick={() => {
                          handleRemoveImage(value, image);
                        }}
                      ></CircleX>
                      <img
                        src={image}
                        alt=""
                        className="object-contain w-full h-full"
                      />
                    </div>
                  ))
                ) : (
                  <ImageUploader setFile={setFile} />
                )}
                {/* Thêm ảnh uploader nếu đã có hình ảnh */}
                {currentVariantImage?.images?.length < 5 &&
                  currentVariantImage?.images?.length > 0 && (
                    <ImageUploader setFile={setFile} />
                  )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default VariantImage;
