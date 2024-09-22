import VariantPopup from "./AddVariantPopup/VariantPopup";
import { useState } from "react";

const ProductVariant = () => {
  const [addVariant, setAddVariant] = useState(false);

  return (
    <div>
      <p className="text-xl font-semibold mt-7">Variant</p>
      <div className="flex justify-between p-4 my-3 font-semibold border rounded-md 2">
        <span>Product Variants</span>
        <span
          className="text-blue-700 cursor-pointer hover:text-gray-500"
          onClick={() => setAddVariant(true)}
        >
          + Add Variant
        </span>
      </div>

      {addVariant && <VariantPopup></VariantPopup>}

      {/* <VariantPopup></VariantPopup> */}
    </div>
  );
};

export default ProductVariant;
