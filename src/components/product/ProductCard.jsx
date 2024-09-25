import React from "react";
import StartFillIcon from "../../icon/StartFillIcon";
import { PlusIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";

const ProductCard = ({ product, children }) => {
  const {
    id,
    name,
    brandName,
    sumSoldQuantity,
    primaryImage,
    sellingPrice,
    discountedPrice,
    avgRating,
  } = product;

  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/products/${id}`);
  };

  const rating = Math.round(avgRating * 10) / 10;

  return (
    <div
      key={id}
      className="w-[100%] border border-gray-200 h-auto text-lg cursor-pointer group hover:bg-white hover:shadow-card transiton-all duration-100 hover:-translate-y-1 rounded-lg overflow-hidden"
      onClick={handleClick}
      anges
    >
      <div className="flex items-center justify-center w-full p-2 overflow-hidden bg-white h-fit">
        <img
          src={primaryImage}
          alt="Product Image"
          className="object-cover w-[80%] h-[80%] transition duration-300 group-hover:scale-110"
        />
      </div>
      <div className="px-3 py-8">
        <p className="overflow-hidden text-xl font-bold text-nowrap text-ellipsis">
          {name}
        </p>
        <p className="text-gray-500 text-base mb-[8px] text-ellipsis text-nowrap overflow-hidden">
          {brandName}
        </p>
        <div className="flex items-center gap-2 mt-3">
          <div className="w-3/4 ">
            <div className="flex gap-2 items-center text-[13px] font-bold">
              <div className="flex items-end justify-center gap-x-2">
                <StartFillIcon fill={"#f59d60"} size={24}></StartFillIcon>
                <span className="pr-2 text-base border-r-2">{rating}</span>
              </div>
              <span className="px-3 py-1 text-sm font-medium bg-gray-200 rounded-md">
                {sumSoldQuantity} Sold
              </span>
            </div>
            <div className="flex gap-4 mt-2">
              {sellingPrice && (
                <p
                  className={`text-gray-500 ${
                    discountedPrice ? "line-through" : ""
                  }`}
                >
                  $ {sellingPrice}
                </p>
              )}
              {discountedPrice && (
                <p className="font-bold">$ {discountedPrice}</p>
              )}
            </div>
          </div>
          <button className="flex items-center justify-center w-10 h-10 p-1 ml-auto bg-black rounded-full hover:scale-110">
            <PlusIcon color="#fff"></PlusIcon>
          </button>
        </div>
      </div>
      {children}
    </div>
  );
};

export default ProductCard;
