import { ChevronLeft, ChevronRight } from "lucide-react";
import React from "react";

const ProductCollection = () => {
  return (
    <div className="mt-10">
      <div className="flex justify-between">
        <p className="text-[22px] font-bold">Furniture Collections</p>
        <div className="flex gap-x-3">
          <button
            // onClick={prevImg}
            className="p-2 bg-gray-100 rounded-full hover:bg-opacity-45"
          >
            <ChevronLeft></ChevronLeft>
          </button>
          <button
            // onClick={nextImg}
            className="p-2 bg-gray-100 rounded-full hover:bg-opacity-45"
          >
            <ChevronRight></ChevronRight>
          </button>
        </div>
      </div>
      <div></div>
    </div>
  );
};

export default ProductCollection;
