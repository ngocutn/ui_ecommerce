import { ChevronLeft, ChevronRight } from "lucide-react";
import React, { useState } from "react";
import ProductCard from "../../../components/product/ProductCard";

const Collection = ({ collection }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const itemsPerPage = 4;

  const nextPage = () => {
    if (currentIndex + itemsPerPage < collection.products.length) {
      setCurrentIndex(currentIndex + itemsPerPage);
    }
  };

  const prevPage = () => {
    if (currentIndex - itemsPerPage >= 0) {
      setCurrentIndex(currentIndex - itemsPerPage);
    }
  };

  const displayedItems = collection.products.slice(
    currentIndex,
    currentIndex + itemsPerPage
  );

  return (
    <div className="flex flex-col justify-between">
      <div className="flex items-center justify-between gap-x-3">
        <p className="text-[22px] font-bold">{collection.name}</p>
        <div className="flex items-center gap-x-3">
          <button
            onClick={prevPage}
            disabled={currentIndex === 0}
            className="p-2 bg-gray-100 rounded-full hover:bg-opacity-45"
          >
            <ChevronLeft></ChevronLeft>
          </button>
          <button
            onClick={nextPage}
            disabled={currentIndex + itemsPerPage >= collection.products.length}
            className="p-2 bg-gray-100 rounded-full hover:bg-opacity-45"
          >
            <ChevronRight></ChevronRight>
          </button>
        </div>
      </div>
      <ul className="grid grid-cols-4 grid-rows-1 gap-2 mt-3">
        {displayedItems.map((item, index) => (
          <ProductCard key={index} product={item}></ProductCard>
        ))}
      </ul>
    </div>
  );
};

export default Collection;
