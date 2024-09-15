import { useFormContext } from "react-hook-form";

const ProductPricing = () => {
  const handleFractionInput = (e) => {
    const value = e.target.value;
    const floatValue = parseFloat(value);
    if (isNaN(floatValue)) {
      e.target.value = "";
    } else if (
      floatValue.toString().split(".")[1] &&
      floatValue.toString().split(".")[1].length > 2
    ) {
      e.target.value = floatValue.toFixed(2);
    }
  };
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <div>
      <p className="text-xl font-semibold mt-7">Pricing</p>
      <div
        id="productPricing"
        className="flex flex-col p-4 py-2 my-3 border rounded-md 2"
      >
        <div className="flex gap-4">
          <div className="flex flex-col w-1/2">
            <label
              htmlFor="originalPrice"
              className="font-semibold text-gray-500"
            >
              MSRP Price
            </label>

            <div
              className={`border-2 2 p-1 rounded-lg my-2 flex items-center  ${
                errors.originalPrice ? "border-red-500" : "2"
              }`}
            >
              <i
                className="px-3 py-2 bg-gray-200 rounded-sm fa fa-usd"
                aria-hidden="true"
              ></i>
              <input
                onInput={handleFractionInput}
                type="number"
                step="0.01"
                id="originalPrice"
                {...register("originalPrice")}
                className="outline-none ml-2 w-[80%]"
              />
            </div>
            {errors?.originalPrice && (
              <div className="flex items-center">
                <i
                  className="text-red-500 fa fa-exclamation-circle"
                  aria-hidden="true"
                ></i>

                <p className="px-2 leading-normal text-red-500 font-nunito text-md">
                  {errors.originalPrice?.message}
                </p>
              </div>
            )}
          </div>
          <div className="flex flex-col w-1/2 ">
            <label
              htmlFor="discountedPrice"
              className="font-semibold text-gray-500"
            >
              Sale Price
            </label>
            <div
              className={`border-2 2 p-1 rounded-lg my-2 flex items-center  ${
                errors.discountedPrice ? "border-red-500" : "2"
              }`}
            >
              <i
                className="px-3 py-2 bg-gray-200 rounded-sm fa fa-usd"
                aria-hidden="true"
              ></i>
              <input
                onInput={handleFractionInput}
                type="number"
                step="0.01"
                id="discountedPrice"
                {...register("discountedPrice")}
                className="outline-none ml-2 w-[80%]"
              />
            </div>
            {errors?.discountedPrice && (
              <div className="flex items-center">
                <i
                  className="text-red-500 fa fa-exclamation-circle"
                  aria-hidden="true"
                ></i>

                <p className="px-2 leading-normal text-red-500 font-nunito text-md">
                  {errors.discountedPrice?.message}
                </p>
              </div>
            )}
          </div>
        </div>
        <label htmlFor="sellingPrice" className="font-semibold text-gray-500">
          Price
        </label>
        <div
          className={`border-2 2 p-1 rounded-lg my-2 flex items-center  ${
            errors.sellingPrice ? "border-red-500" : "2"
          }`}
        >
          <i
            className="px-3 py-2 bg-gray-200 rounded-sm fa fa-usd"
            aria-hidden="true"
          ></i>
          <input
            onInput={handleFractionInput}
            type="number"
            step="0.01"
            id="sellingPrice"
            {...register("sellingPrice")}
            className="outline-none ml-2 w-[90%]"
          />
        </div>
        {errors?.sellingPrice && (
          <div className="flex items-center">
            <i
              className="text-red-500 fa fa-exclamation-circle"
              aria-hidden="true"
            ></i>

            <p className="px-2 leading-normal text-red-500 font-nunito text-md">
              {errors.sellingPrice?.message}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductPricing;
