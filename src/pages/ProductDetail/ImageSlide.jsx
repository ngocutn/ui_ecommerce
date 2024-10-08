import { useEffect, useState } from "react";
import Banner from "../HomePage/components/slideImage";
import ImageZoom from "../../utils/ImageZoom.js";

const ImageSlide = ({ images, isLoading }) => {
  const [viewImage, setViewImage] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);

  const handleViewImage = (index) => {
    setActiveIndex(index);
    setViewImage(true);
  };

  const handleButtonClose = () => {
    setViewImage(false);
  };
  return (
    <div className="w-[60%] h-[70vh] sm:w-[100%] tb:w-full bg-white rounded-lg relative shadow-primary">
      <div className="w-full h-full select-none">
        <Banner
          slides={images}
          customWidth={"w-full"}
          customHeight={"h-full"}
          onImageClick={handleViewImage}
          isCover={false}
          isHover={true}
        ></Banner>
      </div>

      {viewImage && (
        <div
          className="fixed left-0 top-0 z-[20] h-full w-full bg-white"
          onClick={handleButtonClose}
        >
          <div
            className="h-full w-full relative"
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
