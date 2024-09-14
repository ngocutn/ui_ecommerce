import { useState } from "react";
import Banner from "../HomePage/components/slideImage";

const ImageSlide = () => {
  const [viewImage, setViewImage] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);

  const handleViewImage = (index) => {
    setActiveIndex(index);
    setViewImage(true);
  };

  const handleButtonClose = () => {
    setViewImage(false);
  };

  const slideImages = [
    {
      url: "https://images.unsplash.com/photo-1509721434272-b79147e0e708?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1500&q=80",
      caption: "Slide 1",
    },
    {
      url: "https://images.unsplash.com/photo-1506710507565-203b9f24669b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1536&q=80",
      caption: "Slide 2",
    },
    {
      url: "https://images.unsplash.com/photo-1536987333706-fc9adfb10d91?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1500&q=80",
      caption: "Slide 3",
    },
    {
      url: "https://images.unsplash.com/photo-1506710507565-203b9f24669b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1536&q=80",
      caption: "Slide 2",
    },
  ];
  return (
    <div className="w-2/3 h-[70vh]">
      <div className="w-full h-full">
        <Banner
          slides={slideImages}
          customWidth={"w-full"}
          customHeight={"h-full"}
          onImageClick={handleViewImage}
        ></Banner>
      </div>

      {viewImage && (
        <div
          className="fixed left-0 top-0 z-[2] flex h-full w-screen items-center justify-center overflow-hidden bg-black bg-opacity-20 shadow-custom"
          onClick={handleButtonClose}
        >
          <div
            className="mt-[90px] w-[80%] h-[75vh] relative"
            onClick={(e) => e.stopPropagation()}
          >
            <Banner
              slides={slideImages}
              customWidth={"w-[80%]"}
              customHeight={"h-[75vh]"}
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
