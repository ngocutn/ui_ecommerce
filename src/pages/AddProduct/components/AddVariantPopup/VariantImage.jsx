import { CircleX } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ImageUploader from "../../../../components/ImagePopup/ImageUploader";
import { uploadFile } from "../../../../store/slice/productVariantSlice";

const VariantImage = () => {
  const dispatch = useDispatch();
  const [variantTypeValue, setVariantTypeValue] = useState([]);
  const [fileReview, setFileReview] = useState({});
  const [variantImage, setVariantImage] = useState({});
  const [selectedValue, setSelectedValue] = useState("");
  const { variantValues, primaryVariant, variantImageUrl, error } = useSelector(
    (state) => state.productVariant
  );

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

  // useEffect(() => {
  //   return () => {
  //     fileReview.forEach((file) => {
  //       if (file.preview) {
  //         URL.revokeObjectURL(file.preview);
  //       }
  //     });
  //   };
  // }, [fileReview]);

  // console.log("files", filePreview);

  useEffect(() => {
    const initialState = variantTypeValue.map((value) => ({
      valueName: value,
      images: [],
    }));

    setVariantImage(initialState);
    setFileReview(initialState);
  }, [variantTypeValue, dispatch]);

  // useEffect(() => {
  //   if (filePreview && selectedValue) {
  //     setVariantImage((prev) =>
  //       prev.map((value) => {
  //         if (value.valueName === selectedValue) {
  //           return {
  //             ...value,
  //             images: [...filePreview], // Thêm ảnh vào đúng valueName
  //           };
  //         }
  //         return value;
  //       })
  //     );

  //   }
  // }, [filePreview]);

  useEffect(() => {
    if (error) {
      console.log(error);
    }

    dispatch(uploadFile(fileReview));
  }, [fileReview]);

  console.log("selecteds", selectedValue);
  console.log("setVariantImage", variantImage);
  console.log("setFileReview", fileReview);

  return (
    <div className="p-3 mt-8 rounded-md outline-dashed outline-offset-2 outline-gray-300">
      <h1 className="mb-5 font-bold text-text1">Variants images</h1>
      <div className="flex flex-col gap-y-4">
        {variantTypeValue?.map((value) => {
          const currentVariantImage = fileReview.find(
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
                {currentVariantImage?.images.length > 0 ? (
                  currentVariantImage.images.map((image, index) => (
                    <div
                      key={index}
                      className="w-full h-[150px] relative border-4 border-blue-400 overflow-hidden rounded-2xl"
                    >
                      <CircleX
                        className="absolute top-0 right-0 cursor-pointer hover:opacity-50"
                        onClick={() => {
                          handleRemoveImage(image, index);
                        }}
                      ></CircleX>
                      <img
                        src={image.preview}
                        alt=""
                        className="object-contain w-full h-full"
                      />
                    </div>
                  ))
                ) : (
                  <ImageUploader
                    setVariantImage={setFileReview}
                    selectedValue={selectedValue}
                  />
                )}
                {/* Thêm ảnh uploader nếu đã có hình ảnh */}
                {currentVariantImage?.images.length < 5 &&
                  currentVariantImage?.images.length > 0 && (
                    <ImageUploader
                      setVariantImage={setFileReview}
                      selectedValue={selectedValue}
                    />
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
