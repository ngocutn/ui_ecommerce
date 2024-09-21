import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Scrollbar } from "swiper/modules";
import { useEffect, useState } from "react";
import ImageZoom from "../../../utils/ImageZoom";

const Banner = ({
  slides,
  children,
  customWidth,
  customHeight,
  onImageClick,
  indexSlide,
  isCover,
  isHover,
}) => {
  const [buttonBanner, setButtonBanner] = useState(false);
  const [currentImageSrc, setCurrentImageSrc] = useState("");

  const enterBanner = () => {
    setButtonBanner(true);
  };

  const leaveBanner = () => {
    setButtonBanner(false);
  };

  const handleMouseMove = (src) => {
    setCurrentImageSrc(src);
  };

  useEffect(() => {
    if (isHover) {
      if (currentImageSrc) {
        const cleanup = ImageZoom();
        return () => {
          cleanup;
        };
      }
    }
  }, [currentImageSrc]);

  return (
    <div
      className={`mx-auto ${customHeight} relative ${customWidth} cursor-pointer ${
        isHover ? "hover-enabled" : "hover-disabled"
      } select-none`}
      onMouseLeave={leaveBanner}
      onMouseEnter={enterBanner}
      style={{
        "--url": `${currentImageSrc}`,
        "--zoom-x": "0%",
        "--zoom-y": "0%",
        "--display": "none",
      }}
      id="image-container"
    >
      <Swiper
        modules={[Navigation, Pagination]}
        slidesPerView={1}
        navigation={{
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
        }}
        pagination={{
          clickable: true,
          el: ".custom-pagination",
          renderBullet: (index, className) => {
            return `<span class="${className} bg-white w-3 h-3 sm:w-2 sm:h-2 rounded-full inline-block mx-1"></span>`;
          },
        }}
        loop={true}
        className={`${customHeight} rounded-3xl`}
        initialSlide={indexSlide || 0}
        id="imageZoom"
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={index}>
            <img
              src={slide}
              alt={slide}
              className={`${customHeight} w-full ${
                isCover ? "object-cover" : "object-contain"
              } relative`}
              onClick={() => onImageClick(index)}
              onMouseMove={() => handleMouseMove(slide)}
            />
          </SwiperSlide>
        ))}

        {/* For CSS */}
        <div
          className={`swiper-button-next mx-5 sm:hidden tablet-range:hidden ${
            buttonBanner ? "text-white" : "hidden"
          }`}
        ></div>
        <div
          className={`swiper-button-prev mx-5 sm:hidden tablet-range:hidden ${
            buttonBanner ? "text-white" : "hidden"
          }`}
        ></div>

        <div className="custom-pagination absolute bottom-[5%] left-[10%] z-10"></div>
        {children}
      </Swiper>
      <div
        className="w-[70%] h-[70vh] bg-white rounded-2xl absolute top-0 right-[-72%] z-10 overflow-hidden "
        id="image-wrapper"
      >
        <img
          className="object-cover w-full h-full"
          alt="image"
          id="image"
          src={currentImageSrc}
        />
      </div>
    </div>
  );
};
export default Banner;
