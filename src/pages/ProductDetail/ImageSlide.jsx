import { useState } from "react";
import Banner from "../HomePage/components/slideImage";

const ImageSlide = ({ images, isLoading }) => {
  const [viewImage, setViewImage] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);

  console.log("images slider", images);
  console.log("image loading: ", isLoading);

  const handleViewImage = (index) => {
    setActiveIndex(index);
    setViewImage(true);
  };

  const handleButtonClose = () => {
    setViewImage(false);
  };

  return (
    <div className="w-2/3 h-[70vh] bg-white rounded-2xl">
      <div className="w-full h-full">
        {/* <Banner
          slides={images}
          customWidth={"w-full"}
          customHeight={"h-full"}
          onImageClick={handleViewImage}
        ></Banner> */}
        {isLoading ? (
          "loading..."
        ) : (
          <Banner
            slides={images}
            customWidth={"w-full"}
            customHeight={"h-full"}
            onImageClick={handleViewImage}
          ></Banner>
        )}
      </div>

      {viewImage && (
        <div
          className="fixed left-0 top-0 z-[20] flex h-full w-screen items-center justify-center overflow-hidden bg-black bg-opacity-20 shadow-custom"
          onClick={handleButtonClose}
        >
          <div
            className="mt-[90px] w-[60%] h-[70vh] relative"
            onClick={(e) => e.stopPropagation()}
          >
            <Banner
              slides={images}
              customWidth={"w-full"}
              customHeight={"h-full"}
              indexSlide={activeIndex}
            >
              <button
                type="button"
                onClick={() => handleButtonClose()}
                className="absolute z-[4] top-3 right-3 py-2 px-4 text-2xl text-black bg-gray-200 rounded-full hover:text-white"
              >
                X
              </button>
            </Banner>
          </div>
        </div>
      )}
    </div>
  );
};

export default ImageSlide;
