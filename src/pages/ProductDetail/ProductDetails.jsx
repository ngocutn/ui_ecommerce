import { useEffect, useState } from "react";
import ProductCard from "../../components/product/ProductCard";
import ImageSlide from "./ImageSlide";
import ProductInfor from "./ProductInfor";
import { getAllProducts } from "../../service/product/api";
import ReviewsModal from "../Review/ReviewsModal";
import { useOutletContext, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  getProductByCategory,
  getProductById,
} from "../../store/slice/productSlice";
import { Skeleton } from "@mui/material";
import ProductInfoSkeleton from "../../components/skeleton/ProductInfoSkeleton";
import ProductCardSkeleton from "../../components/skeleton/ProductCardSkeleton";
import { ToastContainer } from "react-toastify";

const ProductDetails = () => {
  const { isShow, setIsShow } = useOutletContext();
  const [Images, setImages] = useState([]);
  const [cateId, setCateId] = useState("");

  const dispatch = useDispatch();
  const { message, product, error, isLoading, productCategory } = useSelector(
    (state) => state.product
  );

  const handleVariantChange = (variantImages) => {
    setImages(variantImages);
  };

  const productId = useParams();

  //get product by id
  useEffect(() => {
    if (error) {
      console.log("api", error);
    }

    if (message) {
      console.log("message", message);
    }

    if (productId) {
      dispatch(getProductById(productId.id));

      product.categories?.map((cate) => {
        if (cate.isFeatured) {
          const categoryId = cate[1].id;
        }
        const categoryId = cate[0].id;
        setCateId(categoryId);
      });

      dispatch(getProductByCategory(product.categories, productId.id));
    }
  }, [dispatch, productId.id, productId]);

  useEffect(() => {
    if (product?.data?.images) {
      setImages(product.data.images);
    }
  }, [dispatch, product]);

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
        <ReviewsModal
          setIsShow={setIsShow}
          isShow={isShow}
          productId={productId.id}
        ></ReviewsModal>
      )}
      <div className="pt-16">
        <h1 className="mb-3 text-2xl font-bold">You may also like</h1>
        <div className="grid grid-cols-4 gap-10">
          {/* {productData
            .slice(0, 4)
            .map((item) =>
              isLoading ? (
                <ProductCardSkeleton></ProductCardSkeleton>
              ) : (
                <ProductCard key={item.id} product={item}></ProductCard>
              )
            )} */}
        </div>
      </div>
      <ToastContainer></ToastContainer>
    </div>
  );
};

export default ProductDetails;
