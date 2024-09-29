import React from "react";
import StartFillIcon from "../../icon/StartFillIcon";
import { Heart, PlusIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";

const ProductCard = ({ product, children }) => {
  const {
    id,
    name,
    brandName,
    sumSoldQuantity,
    minSellingPrice,
    maxSellingPrice,
    minDiscountedPrice,
    maxDiscountedPrice,
    avgRating,
    image,
  } = product;

  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/products/${id}`);
  };

  const rating = Math.round(avgRating * 10) / 10;

  return (
    <div className="relative max-h-[450px]">
      <div
        key={id}
        className="w-[100%] border border-gray-200 h-auto text-lg cursor-pointer group hover:bg-white hover:shadow-card transiton-all duration-100 hover:-translate-y-1 rounded-lg overflow-hidden"
        onClick={handleClick}
      >
        <div
          className="flex items-center justify-center w-full p-2 overflow-hidden bg-white h-fit"
          style={{ height: "240px" }}
        >
          <img
            src={image}
            alt="Product Image"
            className="object-contain transition duration-300 group-hover:scale-110"
            style={{ width: "90%", height: "90%" }}
          />
        </div>
        <div className="h-[205px] px-3 py-5 ">
          <p className="overflow-hidden text-[16px] font-bold text-nowrap text-ellipsis">
            {name}
          </p>
          <p className="text-gray-500 text-[14px] mb-[8px] text-ellipsis text-nowrap overflow-hidden">
            {brandName}
          </p>
          <div className="flex items-center gap-2 mt-3">
            <div className="w-3/4 ">
              <div className="flex items-center gap-2 font-bold">
                <div className="flex items-center justify-center gap-x-1">
                  <StartFillIcon fill={"#f59d60"} size={20}></StartFillIcon>
                  <span className="pr-2 border-r-2 text-[14px]">
                    {rating ? rating : "0.0"}
                  </span>
                </div>
                <span className="px-3 py-1 text-sm font-medium bg-gray-200 rounded-md">
                  {sumSoldQuantity} Sold
                </span>
              </div>
              <div className="flex flex-col mt-2 gap-y-1">
                <div
                  className={`flex items-center gap-x-2 text-[16px] ${
                    minDiscountedPrice || maxDiscountedPrice
                      ? "line-through"
                      : ""
                  }`}
                >
                  <span>${minSellingPrice}</span>
                  <span>-</span>
                  <span>${maxSellingPrice}</span>
                </div>
                <div>
                  {maxDiscountedPrice || minDiscountedPrice ? (
                    <div className={`flex items-center gap-x-2`}>
                      <span className=" text-[16px] font-semibold">
                        ${minDiscountedPrice}
                      </span>
                      <span>-</span>
                      <span className=" text-[16px] font-semibold">
                        ${maxDiscountedPrice}
                      </span>
                    </div>
                  ) : (
                    <></>
                  )}
                </div>
              </div>
            </div>
            <button className="flex items-center justify-center w-10 h-10 p-1 ml-auto bg-black rounded-full hover:scale-110">
              <PlusIcon color="#fff"></PlusIcon>
            </button>
          </div>
        </div>
        <div className="absolute p-2 bg-gray-100 rounded-full top-2 left-2 hover:bg-opacity-60 hover:scale-110 hover:text-[#f4629a]">
          <Heart></Heart>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
