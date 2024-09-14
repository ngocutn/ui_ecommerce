import { useEffect, useState } from "react";
import { getAllProducts } from "../../../service/product/api";
import ProductCard from "../../../components/product/ProductCard";

function PopularProduct() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [productData, setProductData] = useState([]);

  useEffect(() => {
    const getProducts = async () => {
      try {
        const res = await getAllProducts();
        console.log("res", res);
        setProductData(res.data.data);
      } catch (error) {
        console.log("Error", error);
      }
    };
    getProducts();
  }, []);

  const currentProducts = productData.slice(
    currentIndex * 4,
    (currentIndex + 1) * 4
  );

  const prevImg = () => {
    const firstImg = currentIndex === 0;
    const newImg = firstImg ? productData.length - 1 : currentIndex - 1;
    setCurrentIndex(newImg);
  };
  console.log(currentIndex);

  const nextImg = () => {
    const lastImg = currentIndex === productData.length - 1;
    const newImg = lastImg ? 0 : currentIndex + 1;
    setCurrentIndex(newImg);
  };

  return (
    <div id="popularProduct" className="w-[80%] mx-auto mt-12">
      <div className="flex items-center justify-between w-full h-auto m-auto">
        <h1 className="text-xl font-bold">Popular Product 2023</h1>
        <div>
          <button onClick={prevImg}>
            <i
              class="fa fa-chevron-left bg-gray-300 hover:bg-gray-100 p-4 rounded-full mr-2"
              aria-hidden="true"
            ></i>
          </button>
          <button onClick={nextImg}>
            <i
              class="fa fa-chevron-right bg-gray-300 hover:bg-gray-100 p-4 rounded-full"
              aria-hidden="true"
            ></i>
          </button>
        </div>
      </div>

      <div id="product" className="flex justify-start w-full h-auto gap-9 mt-5">
        {currentProducts.map((item) => (
          <ProductCard product={item}></ProductCard>
        ))}
      </div>
    </div>
  );
}

export default PopularProduct;
