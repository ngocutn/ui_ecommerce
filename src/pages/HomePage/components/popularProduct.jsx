import { useEffect, useState } from "react";
import { getAllProducts, getTopProducts } from "../../../service/product/api";
import ProductCard from "../../../components/product/ProductCard";
import { Heart } from "lucide-react";
import HeartIcon from "../../../icon/HeartIcon";
import ProductCardSkeleton from "../../../components/skeleton/ProductCardSkeleton";

function PopularProduct() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [productData, setProductData] = useState([]);
  const [isLike, setIsLike] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const getProducts = async () => {
      try {
        setIsLoading(true);
        const res = await getTopProducts();
        console.log("res", res);
        setProductData(res.data.data);
      } catch (error) {
        console.log("Error", error);
      } finally {
        setIsLoading(false);
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
    const newImg = firstImg ? productData.length / 4 - 1 : currentIndex - 1;
    setCurrentIndex(newImg);
  };
  console.log(currentIndex);

  const nextImg = () => {
    const lastImg = currentIndex === productData.length / 4 - 1;
    const newImg = lastImg ? 0 : currentIndex + 1;
    setCurrentIndex(newImg);
  };

  return (
<<<<<<<<< Temporary merge branch 1
    <div id="popularProduct" className="mx-auto mt-12 ">
=========
    <div id="popularProduct" className="mx-auto mt-12">
>>>>>>>>> Temporary merge branch 2
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

      <div id="product" className="flex justify-start w-full h-auto mt-5 gap-9">
        {isLoading ? (
          <>
            {Array.from({ length: 4 }).map((_, index) => (
              <ProductCardSkeleton></ProductCardSkeleton>
            ))}
          </>
        ) : (
          currentProducts.map((item) => (
            <ProductCard product={item}>
              <div
                className={`absolute top-1 left-1 p-3 rounded-full cursor-pointer bg-white`}
                onClick={() => setIsLike(!isLike)}
              >
                {isLike ? <HeartIcon /> : <Heart />}
              </div>
            </ProductCard>
          ))
        )}
      </div>
    </div>
  );
}

export default PopularProduct;
