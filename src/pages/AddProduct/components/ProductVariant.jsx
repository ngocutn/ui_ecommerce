const ProductVariant = () => {
  return (
    <div>
      <p className="text-xl font-semibold mt-7">Variant</p>
      <div className="flex justify-between p-4 my-3 font-semibold border rounded-md 2">
        <span>Product Variants</span>
        <span className="text-blue-700 cursor-pointer hover:text-gray-500">
          + Add Variant
        </span>
      </div>
    </div>
  );
};

export default ProductVariant;
