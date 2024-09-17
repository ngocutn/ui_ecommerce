import HeaderHome from "../../components/headerHome";
import Banner from "./components/slideImage";
import TopCategory from "./components/topCategory";
import PopularProduct from "./components/popularProduct";
import { useEffect, useState } from "react";
import { getBannerByQuantity } from "../../service/product/api";

function HomePage() {
  const [slideImages, setSlideImages] = useState([]);

  useEffect(() => {
    const getBanner = async () => {
      try {
        const res = await getBannerByQuantity(4);
        console.log("res", res);
        setSlideImages(res.data.data);
      } catch (error) {
        console.log("Error", error);
      }
    };
    getBanner();
  }, []);

  return (
    <div className="pt-[130px]">
      <Banner
        slides={slideImages}
        customWidth="desktop-up:w-[1100px] tablet-range:w-[750px] sm:w-[350px]"
        customHeight="desktop-up:h-[550px] tablet-range:h-[400px] sm:h-[200px]"
      >
        <div className="absolute top-[70%] left-[10%] h-auto z-10 text-sm sm:text-[10px] sm:top-[60%]">
          <button className="bg-white p-5 sm:p-2 rounded-lg hover:bg-gray-300">
            <i className="fa fa-shopping-cart mr-4" aria-hidden="true"></i>
            Start Shopping
          </button>
        </div>
      </Banner>
      <TopCategory></TopCategory>
      <PopularProduct></PopularProduct>
    </div>
  );
}

export default HomePage;
