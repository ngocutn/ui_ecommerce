import PopularProduct from "../components/popularProduct";
import imgProduct from "../assets/image/goku.jpg";
import Header from "../components/header";
import { useState } from "react";

function MainPage() {
  // const popProducts = [
  //   {
  //       productImage: { imgProduct },
  //     productName: "Product Name will be here",
  //     brandName: "Brand Name",
  //     evaluation: 4.7,
  //     quantitySold: 7.2345,
  //     price: 24.5,
  //     discount: 24.5,
  //   },
  //   {
  //       productImage: { imgProduct },
  //     productName: "Product Name will be here 2",
  //     brandName: "Brand Name",
  //     evaluation: 4.7,
  //     quantitySold: 7.2345,
  //     price: 24.5,
  //     discount: 24.5,
  //   },
  // ];

  // const listPopProduct = popProducts.map((popProduct) => (
  //   <li>{popProduct.productName}</li>
  // ));

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
  return (
    <>
      <Header></Header>
      {/* <ol>{listPopProduct}</ol>; */}
      {/* banner */}
      <div className="w-full h-[280px] max-w-[780px] m-auto">
        <div
          style={{ backgroundImage: `url(${urlImg[currentIndex].url})` }}
          className="w-full h-full bg-center bg-cover duration-500"
        ></div>
        <button onClick={prevImg}>Last</button>
        <button onClick={nextImg}>Next</button>
      </div>
      {/* top categories */}
      {/* popular product */}
      <PopularProduct
        productImage={imgProduct}
        productName="Product Name will be here"
        brandName="Brand Name"
        evaluation="4,7"
        quantitySold="7,2345"
        price="24,5"
        discount="24,5"
      ></PopularProduct>
    </>
  );
}

export default MainPage;
