import { useEffect, useState } from "react";
import { getAllProducts, getTopProducts } from "../../../service/product/api";
import ProductCard from "../../../components/product/ProductCard";
import { ChevronLeft, ChevronRight, Heart } from "lucide-react";
import HeartIcon from "../../../icon/HeartIcon";
import ProductCardSkeleton from "../../../components/skeleton/ProductCardSkeleton";
import { useDispatch, useSelector } from "react-redux";
import { getPopularProduct } from "../../../store/slice/productSlice";

function PopularProduct() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [productData, setProductData] = useState([]);
  const [isLike, setIsLike] = useState(false);
  const dispatch = useDispatch();
  const { isLoading, error, message, popularProduct } = useSelector(
    (state) => state.product
  );

  useEffect(() => {
    // const getProducts = async () => {
    //   try {
    //     setIsLoading(true);
    //     const res = await getTopProducts();
    //     setProductData(res.data.data);
    //   } catch (error) {
    //   } finally {
    //     setIsLoading(false);
    //   }
    // };
    // getProducts();
  }, []);

  const currentProducts = popularProduct?.slice(
    currentIndex * 4,
    (currentIndex + 1) * 4
  );

  useEffect(() => {
    if (error) {
      console.log("api", error);
    }

    dispatch(getPopularProduct());
  }, [dispatch]);

  console.log("PopularProduct", popularProduct);

  const prevImg = () => {
    const firstImg = currentIndex === 0;
    const newImg = firstImg ? popularProduct.length / 4 - 1 : currentIndex - 1;
    setCurrentIndex(newImg);
  };
  //

  const nextImg = () => {
    const lastImg = currentIndex === popularProduct.length / 4 - 1;
    const newImg = lastImg ? 0 : currentIndex + 1;
    setCurrentIndex(newImg);
  };

  return (
    <div id="popularProduct" className="mx-auto mt-12">
      <div className="flex items-center justify-between w-full h-auto m-auto">
        <h1 className="text-xl font-bold">Popular Product 2023</h1>
        <div className="flex gap-x-3">
          <button
            onClick={prevImg}
            className="p-2 bg-gray-100 rounded-full hover:bg-opacity-45"
          >
            <ChevronLeft></ChevronLeft>
          </button>
          <button
            onClick={nextImg}
            className="p-2 bg-gray-100 rounded-full hover:bg-opacity-45"
          >
            <ChevronRight></ChevronRight>
          </button>
        </div>
      </div>
      <div
        id="product"
        className="grid grid-cols-4 grid-rows-1 gap-2 mt-3 sm:grid-cols-1 sm:gap-y-6 tb:grid-cols-2 tb:gap-4"
      >
        {isLoading ? (
          <>
            {Array.from({ length: 4 }).map((_, index) => (
              <ProductCardSkeleton key={index}></ProductCardSkeleton>
            ))}
          </>
        ) : (
          currentProducts
            .slice(0, 5)
            .map((item, index) => (
              <ProductCard key={index} product={item}></ProductCard>
            ))
        )}
      </div>
    </div>
  );
}

export default PopularProduct;
