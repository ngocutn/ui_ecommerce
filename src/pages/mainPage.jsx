import PopularProduct from "../components/popularProduct";
import Header from "../components/header";
import TopCategory from "../components/topCate";
import { useState } from "react";

function MainPage() {
  const urlImg = [
    {
      url: "https://images.unsplash.com/photo-1712510795837-683b93b2b95e?q=80&w=1780&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      url: "https://images.unsplash.com/photo-1498015583783-4abcab4a760a?q=80&w=1935&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      url: "https://images.unsplash.com/photo-1724178920096-f5aff9d9e8e6?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      url: "https://images.unsplash.com/photo-1723927689937-13cf4350a4aa?q=80&w=1964&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [buttonBanner, setButtonBanner] = useState(false);

  const enterBanner = () => {
    setButtonBanner(true);
  };

  const leaveBanner = () => {
    setButtonBanner(false);
  };

  const prevImg = () => {
    const firstImg = currentIndex === 0;
    const newImg = firstImg ? urlImg.length - 1 : currentIndex - 1;
    setCurrentIndex(newImg);
  };

  const nextImg = () => {
    const lastImg = currentIndex === urlImg.length - 1;
    const newImg = lastImg ? 0 : currentIndex + 1;
    setCurrentIndex(newImg);
  };

  const toImg = (index) => {
    setCurrentIndex(index);
  };
  return (
    <>
      <Header></Header>
      {/* banner */}
      <div
        id="banner"
        className="h-[550px] w-[1180px] mx-auto my-4"
        onMouseLeave={leaveBanner}
      >
        <div
          style={{ backgroundImage: `url(${urlImg[currentIndex].url})` }}
          className="w-full h-full bg-center bg-cover relative rounded-3xl"
          onMouseOver={enterBanner}
        >
          {buttonBanner && (
            <div className="w-full absolute top-[50%] -translate-y-1/2 px-4">
              <button onClick={prevImg}>
                <i
                  class="fa fa-chevron-left bg-gray-300 hover:bg-gray-100 transition-shadow p-4 rounded-full mr-2"
                  aria-hidden="true"
                ></i>
              </button>
              <button onClick={nextImg} className="float-right">
                <i
                  class="fa fa-chevron-right bg-gray-300 hover:bg-gray-100 p-4 rounded-full"
                  aria-hidden="true"
                ></i>
              </button>
            </div>
          )}
          <div className="absolute top-[70%] left-[10%] h-auto">
            <button className="bg-white p-5 rounded-lg hover:bg-gray-300">
              <i class="fa fa-shopping-cart mr-4" aria-hidden="true"></i>
              Start Shopping
            </button>
          </div>
          <div className="absolute bottom-[5%] left-[10%] flex gap-3">
            {urlImg.map((item, index) => {
              return (
                <div key={index} onClick={() => toImg(index)}>
                  <i
                    class={`fa fa-circle cursor-pointer ${
                      currentIndex === index
                        ? "text-white"
                        : "text-white opacity-60"
                    }`}
                    aria-hidden="true"
                  ></i>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* top categories */}
      <div id="top-categories" className="flex justify-between px-4">
        <h1 className="font-bold text-2xl ">Top categories</h1>
        <span className="text-xl text-gray-500 cursor-pointer hover:bg-gray-400 hover:text-white p-2">
          See all
        </span>
      </div>
      <TopCategory></TopCategory>

      {/* popular product */}
      <PopularProduct></PopularProduct>
    </>
  );
}

export default MainPage;
