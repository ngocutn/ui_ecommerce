import { useFormContext } from "react-hook-form";

const ProductSellType = () => {
  const { register } = useFormContext();

  return (
    <div>
      <p className="text-xl font-semibold mt-7">
        Selling Type <span className="text-red-600">*</span>
      </p>
      <div
        id="productSellType"
        className="flex flex-col p-4 py-2 my-3 font-semibold border rounded-md 2"
      >
        <label htmlFor="sellingType" className="my-1">
          <input
            type="radio"
            id="storeSelling"
            {...register("sellingType")}
            value="STORE"
          />
          <span className="ml-2">In-store selling only</span>
        </label>
        <label className="my-1">
          <input
            type="radio"
            id="onlineSelling"
            {...register("sellingType")}
            value="ONLINE"
          />
          <span className="ml-2">Online selling only</span>
        </label>
        <label className="my-1">
          <input
            type="radio"
            id="bothSelling"
            {...register("sellingType")}
            value="BOTH"
          />
          <span className="ml-2">Available both in-store and online</span>
        </label>
      </div>
    </div>
  );
};

export default ProductSellType;
