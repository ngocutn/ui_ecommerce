import { useFormContext } from "react-hook-form";

const ProductIventory = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext();
  return (
    <div>
      <p className="text-xl font-semibold mt-7">Inventory</p>
      <div
        id="productInventory"
        className="flex gap-4 p-4 py-2 my-3 border rounded-md 2"
      >
        <div className="flex flex-col w-1/3">
          <label
            htmlFor="quantityAvailable"
            className="font-semibold text-gray-500"
          >
            Quantity
          </label>
          <input
            type="number"
            step="1"
            onKeyDown={(e) => {
              if (e.key === "." || e.key === "-" || e.key === ",") {
                e.preventDefault();
              }
            }}
            id="quantityAvailable"
            {...register("quantityAvailable")}
            className={`border-2 2 p-2 rounded-lg my-2 ${
              errors.quantityAvailable ? "border-red-500" : "2"
            }`}
          />
          {errors?.quantityAvailable && (
            <div className="flex items-center">
              <i
                className="text-red-500 fa fa-exclamation-circle"
                aria-hidden="true"
              ></i>

              <p className="px-2 leading-normal text-red-500 font-nunito text-md">
                {errors.quantityAvailable?.message}
              </p>
            </div>
          )}
        </div>
        <div className="flex flex-col w-2/3">
          <label htmlFor="SKU" className="font-semibold text-gray-500">
            SKU (Optional)
          </label>
          <input
            type="text"
            id="SKU"
            {...register("SKU")}
            className="p-2 my-2 border-2 rounded-lg 2"
          />
        </div>
      </div>
    </div>
  );
};

export default ProductIventory;
