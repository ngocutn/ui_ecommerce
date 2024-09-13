import { useEffect, useState } from "react";
import ProductCard from "../../components/product/ProductCard";
import ImageSlide from "./ImageSlide";
import ProductInfor from "./ProductInfor";
import { getAllProducts } from "../../service/product/api";

const ProductDetails = () => {
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
  console.log(productData);

  return (
    <div>
      <div className="flex items-start pt-[140px] gap-x-7">
        <ImageSlide></ImageSlide>
        <ProductInfor></ProductInfor>
      </div>
      <div className="pt-16">
        <h1 className="mb-3 text-xl font-bold">You may also like</h1>
        <div className="flex flex-wrap items-center justify-between">
          {productData.slice(0, 4).map((product) => (
            <ProductCard product={product}></ProductCard>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
