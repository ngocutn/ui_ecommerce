import VariantPopup from "./AddVariantPopup/VariantPopup";
import { useState } from "react";

const ProductVariant = ({ isCategory }) => {
  const [addVariant, setAddVariant] = useState(false);

  const handleSetAddVariant = () => {
    if (isCategory) {
      setAddVariant(true);
    }
  };

  console.log(isCategory);

  return (
    <div>
      <p className="text-xl font-semibold mt-7">Variant</p>
      <div className="flex justify-between p-4 my-3 font-semibold border rounded-md 2">
        <span>Product Variants</span>
        <span
          className={`cursor-pointer hover:text-gray-500 ${
            isCategory ? "text-blue-700" : "text-gray-300 hover:text-gray-300"
          }`}
          onClick={() => handleSetAddVariant()}
        >
          + Add Variant
        </span>
      </div>

      {addVariant && (
        <VariantPopup setAddVariant={setAddVariant}></VariantPopup>
      )}
    </div>
  );
};

export default ProductVariant;
