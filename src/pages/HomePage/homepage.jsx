import HeaderHome from "../../components/headerHome";
import Banner from "./components/slideImage";
import TopCategory from "./components/topCategory";
import PopularProduct from "./components/popularProduct";
import { useEffect, useState } from "react";
import { getBannerByQuantity } from "../../service/product/api";
import download from "../../assets/image/download.webp";
import ProductCollection from "./ProductCollection";
import { useSelector } from "react-redux";

function HomePage() {
  const [slideImages, setSlideImages] = useState([]);

  useEffect(() => {
    const getBanner = async () => {
      try {
        const res = await getBannerByQuantity(4);

        setSlideImages(res.data.data);
      } catch (error) {}
    };
    getBanner();
  }, []);

  return (
    <div className="pt-[130px]">
      <Banner
        slides={slideImages}
        customWidth="desktop-up:w-80% tablet-range:w-[750px] sm:w-[350px]"
        customHeight="desktop-up:h-[450px] tablet-range:h-[400px] sm:h-[200px] in-xl:h-[360px]"
        isCover={true}
        isHover={false}
      >
        <div className="absolute top-[70%] left-[10%] h-auto z-10 text-sm sm:text-[10px] sm:top-[60%] shadow-md overflow-hidden rounded-lg group">
          <button className="p-5 transition-all duration-200 ease-in-out bg-white sm:p-2 hover:bg-black hover:text-white">
            <i className="mr-4 fa fa-shopping-cart" aria-hidden="true"></i>
            Start Shopping
          </button>
        </div>
      </Banner>
      <TopCategory></TopCategory>
      <PopularProduct></PopularProduct>
      <ProductCollection></ProductCollection>

      <div className="flex justify-center gap-5 mt-10">
        <div className="w-[40%] flex flex-col items-stretch bg-[#f2f1ed] p-4 rounded-xl justify-between">
          <div className="text-lg">
            <p className="font-bold">Special treat with your 1st order</p>
            <p className="font-semibold ">Join our newsletter to claim it</p>
          </div>
          <div className="flex justify-between">
            <input
              type="text"
              placeholder="Email address"
              className="text-base border-2 border-gray-300 rounded-lg p-2 mt-2 w-[70%]"
            />
            <button className="bg-[#ffbfcc] text-white font-semibold text-base rounded-xl px-4 py-3 mt-2 hover:bg-opacity-70">
              Subscribe
            </button>
          </div>
        </div>
        <div className="w-[60%]">
          <img src={download} alt="" className="w-full rounded-xl" />
        </div>
      </div>
    </div>
  );
}

export default HomePage;
