import HeaderHome from "../../components/headerHome";
import Banner from "./components/slideImage";
import TopCategory from "./components/topCategory";
import PopularProduct from "./components/popularProduct";

function HomePage() {
  const slideImages = [
    "https://images.unsplash.com/photo-1509721434272-b79147e0e708?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1500&q=80",
    "https://images.unsplash.com/photo-1506710507565-203b9f24669b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1536&q=80",
    "https://images.unsplash.com/photo-1536987333706-fc9adfb10d91?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1500&q=80",
    "https://images.unsplash.com/photo-1506710507565-203b9f24669b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1536&q=80",
  ];

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
