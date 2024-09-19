import { useEffect, useState } from "react";
import ProductCard from "../../components/product/ProductCard";
import ImageSlide from "./ImageSlide";
import ProductInfor from "./ProductInfor";
import { getAllProducts } from "../../service/product/api";
import ReviewsModal from "../Review/ReviewsModal";
import { useNavigate, useOutletContext, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getProductById } from "../../store/slice/productSlice";
import { Skeleton } from "@mui/material";
import ProductInfoSkeleton from "../../components/skeleton/ProductInfoSkeleton";
import ProductCardSkeleton from "../../components/skeleton/ProductCardSkeleton";

const ProductDetails = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [productData, setProductData] = useState([]);
  const { isShow, setIsShow } = useOutletContext();
  const [Images, setImages] = useState([]);

  const dispatch = useDispatch();
  const { message, product, error, isLoading } = useSelector(
    (state) => state.product
  );

  const handleVariantChange = (variantImages) => {
    setImages(variantImages);
  };

  const productId = useParams();
  console.log(productId.id);

  //get product by id
  useEffect(() => {
    if (error) {
      console.log("API", error);
    }

    if (message) {
      console.log(message);
    }

    if (productId) {
      dispatch(getProductById(productId.id));
    }
  }, [dispatch, productId.id, productId]);

  useEffect(() => {
    if (product?.data?.images) {
      setImages(product.data.images);
    }
  }, [dispatch, product]);

  //get all products
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

  console.log("product", productData);
  console.log(Images);

  return (
    <div className="pb-10">
      <div className="flex items-start pt-[140px] gap-x-7 relative">
        {isLoading ? (
          <Skeleton
            variant="rounded"
            width="70%"
            height={500}
            animation="wave"
          ></Skeleton>
        ) : (
          <ImageSlide
            images={Images ? Images : product?.data?.images}
            isLoading={isLoading}
          ></ImageSlide>
        )}
        {product && product.data ? (
          !isLoading ? (
            <ProductInfor
              product={product.data}
              setIsShow={setIsShow}
              isShow={isShow}
              onVariantChange={handleVariantChange}
            />
          ) : (
            <ProductInfoSkeleton></ProductInfoSkeleton>
          )
        ) : (
          "No data available"
        )}
      </div>
      {isShow && (
        <ReviewsModal setIsShow={setIsShow} isShow={isShow}></ReviewsModal>
      )}
      <div className="pt-16">
        <h1 className="mb-3 text-2xl font-bold">You may also like</h1>
        <div className="grid grid-cols-4 gap-10">
          {productData
            .slice(0, 4)
            .map((item) =>
              isLoading ? (
                <ProductCardSkeleton></ProductCardSkeleton>
              ) : (
                <ProductCard key={item.id} product={item}></ProductCard>
              )
            )}
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
