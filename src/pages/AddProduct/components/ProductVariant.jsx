import { useSelector } from "react-redux";
import VariantPopup from "./AddVariantPopup/VariantPopup";
import { useState } from "react";

const ProductVariant = ({ isCategory }) => {
  const { productVariants: productVariantData } = useSelector(
    (state) => state.productVariant
  );
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

      {productVariantData.length > 0 && (
        <div className="flex flex-col gap-y-5">
          {productVariantData.map((variant) => (
            <div
              key={variant.id}
              className="flex items-center px-5 py-4 border border-gray-300 rounded-md gap-x-2"
            >
              Sku: <span>{variant.sku}</span>
              {variant.variantOptions.map((option) => (
                <div className="flex items-center ">
                  {option.productType}: {option.valueName}
                </div>
              ))}
            </div>
          ))}
        </div>
      )}

      {addVariant && (
        <VariantPopup setAddVariant={setAddVariant}></VariantPopup>
      )}
    </div>
  );
};

export default ProductVariant;
