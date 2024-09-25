import HeaderHome from "../../components/headerHome";
import Banner from "./components/slideImage";
import TopCategory from "./components/topCategory";
import PopularProduct from "./components/popularProduct";
import { useEffect, useState } from "react";
import { getBannerByQuantity } from "../../service/product/api";
import Footer from "../../components/Footer";

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
        customHeight="desktop-up:h-[550px] tablet-range:h-[400px] sm:h-[200px] in-xl:h-[450px]"
        isCover={true}
        isHover={false}
      >
        <div className="absolute top-[70%] left-[10%] h-auto z-10 text-sm sm:text-[10px] sm:top-[60%]">
          <button className="p-5 bg-white rounded-lg sm:p-2 hover:bg-gray-300">
            <i className="mr-4 fa fa-shopping-cart" aria-hidden="true"></i>
            Start Shopping
          </button>
        </div>
      </Banner>
      <TopCategory></TopCategory>
      <PopularProduct></PopularProduct>
      <Footer></Footer>
    </div>
  );
}

export default HomePage;
