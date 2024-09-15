import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Scrollbar } from "swiper/modules";
import { useState } from "react";

const Banner = ({
  slides,
  children,
  customWidth,
  customHeight,
  onImageClick,
  indexSlide,
}) => {
  const [buttonBanner, setButtonBanner] = useState(false);

  const enterBanner = () => {
    setButtonBanner(true);
  };

  const leaveBanner = () => {
    setButtonBanner(false);
  };

  return (
    <div
      className={`mx-auto ${customHeight} relative ${customWidth} cursor-pointer`}
      onMouseLeave={leaveBanner}
      onMouseEnter={enterBanner}
    >
      <Swiper
        modules={[Navigation, Pagination]}
        slidesPerView={1}
        // onSlideChange={() => console.log("slide change")}
        // onSwiper={(swiper) => console.log(swiper)}
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
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={index}>
            <img
              src={slide}
              alt={slide}
              className={`${customHeight} w-full bg-center bg-cover relative`}
              onClick={() => onImageClick(index)}
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
    </div>
  );
};
export default Banner;
