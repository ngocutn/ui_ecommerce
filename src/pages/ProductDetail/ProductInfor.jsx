import React, { useEffect } from "react";
import { Heart, Star } from "lucide-react";
import DropList from "../../components/DropList";
import { Button } from "@mui/material";
import { useState } from "react";
import HeartIcon from "../../icon/HeartIcon";
import StartFillIcon from "../../icon/StartFillIcon";
import { Link } from "react-router-dom";

const ProductInfor = ({
  setIsShow,
  isShow,
  product,
  onVariantChange,
  className,
}) => {
  const [isLike, setIsLike] = useState(false);
  const [ram, setRam] = useState();
  const [store, setStore] = useState();
  const [color, setColor] = useState();
  const [selectVariant, setSelectVarient] = useState();

  const {
    name,
    sellingPrice,
    brandName,
    discountedPrice,
    options,
    productDimension,
    avgRating,
    productVariants,
    hasVariants,
    productSpecifications,
    hasSpecification,
    countOfReviews,
    hasReviews,
  } = product;

  const rating = Math.round(avgRating * 10) / 10;

  const findProductVariant = () => {
    return productVariants.find((variant) => {
      const colorMatch = variant.variantOptions.some(
        (option) => option.productType === "COLOR" && option.valueName === color
      );
      const ramMatch = variant.variantOptions.some(
        (option) => option.productType === "RAM" && option.valueName === ram
      );
      const storageMatch = variant.variantOptions.some(
        (option) =>
          option.productType === "STORAGE" && option.valueName === store
      );

      return colorMatch && ramMatch && storageMatch;
    });
  };

  useEffect(() => {
    if (options.RAM && options.RAM.length > 0 && !ram) {
      setRam(options.RAM[0]);
    }

    if (options.STORAGE && options.STORAGE.length > 0 && !store) {
      setStore(options.STORAGE[0]);
    }
  }, [ram]);

  useEffect(() => {
    if (color && ram && store) {
      const variant = findProductVariant();
      setSelectVarient(variant);
      onVariantChange(variant?.images);
    }
  }, [color, ram, store]);

  return (
    <div
      className={`flex-1 max-w-[1/3] h-[70vh] overflow-y-scroll scrollbar-hide scroll-smooth px-2 tb:mt-10`}
    >
      <div className="flex items-start justify-between sm:flex-col sm:mt-10">
        <h1 className="text-2xl font-bold w-[80%]">{name}</h1>
        <span
          className={`text-xl font-bold ${
            selectVariant
              ? selectVariant.discountedPrice
                ? "line-through"
                : ""
              : discountedPrice
              ? "line-through"
              : ""
          }`}
        >
          {selectVariant ? selectVariant.sellingPrice : sellingPrice}
        </span>
      </div>

      {/* Discounted price */}
      <div className="flex items-start justify-between mt-1">
        <h1 className="text-xl font-bold w-[70%] text-gray-500">{brandName}</h1>
        {selectVariant && selectVariant.discountedPrice ? (
          <span className="text-2xl font-bold text-red-500">
            {selectVariant.discountedPrice}
          </span>
        ) : (
          <span className="text-2xl font-bold text-red-500">
            {discountedPrice}
          </span>
        )}
      </div>

      {/* Variant */}
      {hasVariants && (
        <div>
          <div className="w-full mt-2">
            <p className="text-base">
              color: <span className="font-bold uppercase">{color}</span>
            </p>
            {options.COLOR && (
              <div className="flex flex-wrap items-center mt-2 gap-y-2 gap-x-4">
                {options?.COLOR?.map((item) => (
                  <div
                    key={item} // Nên thêm key để tránh cảnh báo React
                    className={`size-[50px] rounded-md cursor-pointer ${
                      color === item ? "active" : ""
                    }`}
                    style={{ backgroundColor: item }} // Sử dụng inline style để áp dụng màu động
                    onClick={() => setColor(item)}
                  ></div>
                ))}
              </div>
            )}
          </div>
          <div className="mt-6">
            <p className="text-base">
              RAM: <span className="font-bold">{ram ? ram : ""}</span>
            </p>
            {options.RAM && (
              <div className="flex flex-wrap items-center w-full gap-x-5">
                {options.RAM.map((item) => (
                  <div
                    key={item}
                    className={`bg-white px-5 py-2 text-sm rounded-md mt-2 font-[300] select-none cursor-pointer ${
                      ram === item ? "active" : ""
                    }`}
                    onClick={() => setRam(item)}
                  >
                    <p>{item}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
          <div className="mt-6">
            <p className="text-base">
              Stograge: <span className="font-bold">{store ? store : ""}</span>
            </p>
            {options.STORAGE && (
              <div className="flex flex-wrap items-center w-full gap-x-3">
                {options.STORAGE.map((item) => (
                  <div
                    key={item}
                    className={`bg-white px-5 py-2 text-sm rounded-md mt-2 font-[300] select-none cursor-pointer ${
                      store === item ? "active" : ""
                    }`}
                    onClick={() => setStore(item)}
                  >
                    <p>{item}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      <div className="mt-8">
        {productDimension && (
          <DropList title={"Dimension"}>
            <li className="flex items-center justify-between py-3 border-b border-gray-300 gap-x-3 first:pt-0 last:border-b-0">
              <span className="text-base font-semibold">Breadth</span>
              <span>{productDimension.breadth}</span>
            </li>
            <li className="flex items-center justify-between py-3 border-b border-gray-300 first:pt-0 last:border-b-0">
              <span className="text-base font-semibold">Length</span>
              <span>{productDimension.length}</span>
            </li>
            <li className="flex items-center justify-between py-3 border-b border-gray-300 first:pt-0 last:border-b-0">
              <span className="text-base font-semibold">Weight</span>
              <span>{productDimension.weight}</span>
            </li>
            <li className="flex items-center justify-between py-3 border-b border-gray-300 first:pt-0 last:border-b-0">
              <span className="text-base font-semibold">Width</span>
              <span>{productDimension.width}</span>
            </li>
            <li className="flex items-center justify-between py-3 border-b border-gray-300 first:pt-0 last:border-b-0">
              <span className="text-base font-semibold">Package Unit</span>
              <span>
                {productDimension.packageUnit
                  ? productDimension.packageUnit
                  : "0"}
              </span>
            </li>
            <li className="flex items-center justify-between py-3 border-b border-gray-300 first:pt-0 last:border-b-0">
              <span className="text-base font-semibold">Unit Weight</span>
              <span>
                {productDimension.unitWeight
                  ? productDimension.unitWeight
                  : "0"}
              </span>
            </li>
          </DropList>
        )}
      </div>

      {hasSpecification && (
        <div className="mt-4">
          <DropList title={"Specification"}>
            {productSpecifications.map((item) => (
              <li className="flex items-center justify-between py-3 border-b border-gray-300 gap-x-3 first:pt-0 last:border-b-0">
                <span className="text-base font-nomal">{item.name}</span>
                <span className="text-sm">{item.value}</span>
              </li>
            ))}
          </DropList>
        </div>
      )}

      <div className="p-4 mt-6 bg-white rounded-md shadow-lg">
        <div className="flex items-center justify-between font-bold">
          <span className="text-base">
            Reviews
            {hasReviews && <span>({countOfReviews})</span>}
          </span>
          <Link className="select-none text-textSecondary hover:opacity-70">
            {hasReviews ? "Write a comment" : "Write the first one"}
          </Link>
        </div>

        <div className="flex items-center justify-between mt-4 text-textSecondary">
          <span className="font-bold select-none">
            {hasReviews ? "Overall rating" : "No reviews for this product"}
          </span>
          <div className="flex items-center gap-x-2">
            <span className="text-base font-bold select-none">
              {rating ? rating : "0.00"}
            </span>
            <StartFillIcon fill={"#f9619b"}></StartFillIcon>
          </div>
        </div>
        <Button
          variant="outlined"
          className="w-full py-2 mt-4 font-sans text-lg font-bold lowercase border-2 border-strokeColor text-textSecondary"
          onClick={() => setIsShow(!isShow)}
        >
          Show all
        </Button>
      </div>

      <div className="flex items-center mt-6 gap-x-3">
        <Button className="flex-1 py-3 text-white bg-buttonBg">
          Add to cart
        </Button>
        <div
          className={`p-3 border-2 rounded-md cursor-pointer border-buttonBg`}
          onClick={() => setIsLike(!isLike)}
        >
          {isLike ? <HeartIcon /> : <Heart />}
        </div>
      </div>
    </div>
  );
};

export default ProductInfor;
