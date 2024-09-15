import { useFormContext } from "react-hook-form";
import { useState } from "react";

const ProductShipping = () => {
  const [selectedValue, setSelectedValue] = useState("");

  const handleChange = (event) => {
    setSelectedValue(event.target.value);
  };

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
      <p className="text-xl font-semibold">Shipping and Delivery</p>
      <div
        id="productDelivery"
        className="flex flex-col p-4 py-2 my-3 border rounded-md 2"
      >
        <label htmlFor="weight" className="font-semibold text-gray-500">
          Items weight
        </label>
        <div className="flex p-2 my-2 border-2 rounded-lg 2 flex-nowrap">
          <input
            onInput={handleFractionInput}
            type="number"
            step="0.01"
            id="weight"
            {...register("weight")}
            className="outline-none w-[90%]"
          />
          <select
            id="unitWeight"
            // onInput={handleFractionInput}
            {...register("unitWeight")}
            className="float-right outline-none"
          >
            <option value="kg">kg</option>
            <option value="pound">Ibs</option>
          </select>
        </div>
        <div className="flex justify-between">
          <label className="my-3 font-semibold">Package Size</label>
          <select
            id="packageUnit"
            {...register("packageUnit")}
            className="outline-none"
            value={selectedValue}
            onChange={handleChange}
          >
            <option value="inch">in</option>
            <option value="met">m</option>
            <option value="cm">cm</option>
          </select>
        </div>
        <div className="flex justify-between">
          <div className="flex flex-col w-[30%] ">
            <label htmlFor="length" className="font-semibold text-gray-500">
              Length
            </label>
            <div className="flex p-1 my-2 border-2 rounded-lg 2 flex-nowrap">
              <input
                onInput={handleFractionInput}
                type="number"
                step="0.01"
                id="length"
                {...register("length")}
                className="outline-none ml-2 py-1 w-[70%]"
              />
              <span className="float-right py-1">{selectedValue || "in"}</span>
            </div>
          </div>
          <div className="flex flex-col w-[30%]">
            <label htmlFor="breadth" className="font-semibold text-gray-500">
              Breadth
            </label>
            <div className="flex p-1 my-2 border-2 rounded-lg 2 flex-nowrap">
              <input
                onInput={handleFractionInput}
                type="number"
                step="0.01"
                id="breadth"
                {...register("breadth")}
                className="outline-none ml-2 py-1 w-[70%]"
              />
              <span className="float-right py-1">{selectedValue || "in"}</span>
            </div>
          </div>
          <div className="flex flex-col w-[30%]">
            <label htmlFor="width" className="font-semibold text-gray-500">
              Width
            </label>
            <div className="flex p-1 my-2 border-2 rounded-lg 2 flex-nowrap">
              <input
                onInput={handleFractionInput}
                type="number"
                step="0.01"
                id="width"
                {...register("width")}
                className="outline-none ml-2 py-1 w-[70%]"
              />
              <span className="float-right py-1">{selectedValue || "in"}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductShipping;
