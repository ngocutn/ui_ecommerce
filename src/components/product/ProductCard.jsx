import React from "react";
import StartFillIcon from "../../icon/StartFillIcon";
import { PlusIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";

const ProductCard = ({ product, children }) => {
  const {
    id,
    name,
    quantityAvailable,
    primaryImage,
    sellingPrice,
    categories,
  } = product;

  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/products/${id}`);
  };

  return (
    <div
      key={id}
      className="w-[280px] h-auto text-lg cursor-pointer group hover:bg-white hover:shadow-card transiton-all duration-200 hover:-translate-x-1 hover:-translate-y-1 rounded-lg overflow-hidden"
      onClick={handleClick}
      anges
    >
      <div className="w-full h-[250px] overflow-hidden flex justify-center items-center bg-white mt-2">
        <img
          src={primaryImage}
          alt="Product Image"
          className="object-cover w-[80%] h-[80%] transition duration-300 group-hover:scale-110"
        />
      </div>
      <div className="p-3">
        <p className="font-bold text-nowrap  text-ellipsis overflow-hidden">
          {name}
        </p>
        <p className="text-gray-500 text-lg mb-[8px] text-ellipsis text-nowrap overflow-hidden">
          {name}
        </p>
        <div className="flex items-center gap-2">
          <div className="w-3/4 ">
            <div className="flex gap-2 items-center text-[13px] font-bold">
              <div className="flex items-end justify-center gap-x-2">
                <StartFillIcon fill={"#f59d60"} size={24}></StartFillIcon>
                <span className="pr-2 text-base border-r-2">
                  {quantityAvailable}
                </span>
              </div>
              <span className="px-3 py-1 text-sm font-medium bg-gray-200 rounded-md">
                {quantityAvailable} Sold
              </span>
            </div>
            <div className="flex gap-4 mt-2">
              <p className="text-gray-500 line-through">$ {sellingPrice}</p>
              <p className="font-bold">$ {sellingPrice}</p>
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
