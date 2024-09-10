import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Scrollbar } from "swiper/modules";
import { useState } from "react";

const Banner = ({ slides }) => {
  const [buttonBanner, setButtonBanner] = useState(false);

  const enterBanner = () => {
    setButtonBanner(true);
  };

  const leaveBanner = () => {
    setButtonBanner(false);
  };

  return (
    <div
      className="mt-[180px]  w-[1180px] mx-auto relative"
      onMouseLeave={leaveBanner}
      onMouseEnter={enterBanner}
    >
      <Swiper
        modules={[Navigation, Pagination, Scrollbar]}
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
            return `<span class="${className} bg-white w-3 h-3 rounded-full inline-block mx-1"></span>`;
          },
        }}
        scrollbar={{ draggable: true }}
        loop={true}
        className="h-[550px]"
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={index}>
            <img
              src={slide.url}
              alt={slide.caption}
              className="w-full h-full bg-center bg-cover relative rounded-3xl"
            />
          </SwiperSlide>
        ))}

        {/* For CSS */}
        <div
          className={`swiper-button-next mx-5 ${
            buttonBanner ? "text-white" : "hidden"
          }`}
        ></div>
        <div
          className={`swiper-button-prev mx-5 ${
            buttonBanner ? "text-white" : "hidden"
          }`}
        ></div>

        <div className="custom-pagination absolute bottom-[5%] left-[10%] z-10"></div>

        <div className="absolute top-[70%] left-[10%] h-auto z-10">
          <button className="bg-white p-5 rounded-lg hover:bg-gray-300">
            <i className="fa fa-shopping-cart mr-4" aria-hidden="true"></i>
            Start Shopping
          </button>
        </div>
      </Swiper>
    </div>
  );
};
export default Banner;
