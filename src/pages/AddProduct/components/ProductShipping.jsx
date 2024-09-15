import { useFormContext } from "react-hook-form";
import { useState } from "react";
import { FormControl, MenuItem, Select, TextField } from "@mui/material";

const ProductShipping = () => {
  const [selectedValue, setSelectedValue] = useState("inch");

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

        <TextField
          id="weight"
          type="number"
          {...register("weight")}
          inputProps={{ step: "0.01" }}
          onInput={handleFractionInput}
          size="small"
          className="rounded-lg py-2"
          slotProps={{
            input: {
              endAdornment: (
                <Select
                  id="unitWeight"
                  {...register("unitWeight")}
                  size="small"
                  defaultValue={"kg"}
                  sx={{
                    border: "none",
                    "& fieldset": {
                      border: "none",
                    },
                  }}
                >
                  <MenuItem value="kg">kg</MenuItem>
                  <MenuItem value="pound">Pound</MenuItem>
                </Select>
              ),
            },
          }}
        ></TextField>

        <div className="flex justify-between">
          <label className="my-3 font-semibold">Package Size</label>
          <Select
            id="packageUnit"
            {...register("packageUnit")}
            value={selectedValue}
            onChange={handleChange}
            size="small"
            sx={{
              border: "none",
              "& fieldset": {
                border: "none",
              },
            }}
          >
            <MenuItem value="inch">in</MenuItem>
            <MenuItem value="met">m</MenuItem>
            <MenuItem value="cm">cm</MenuItem>
          </Select>
        </div>
        <div className="flex justify-between">
          <div className="flex flex-col w-[30%] ">
            <label htmlFor="length" className="font-semibold text-gray-500">
              Length
            </label>

            <TextField
              id="length"
              {...register("length")}
              type="number"
              onInput={handleFractionInput}
              inputProps={{ step: "0.01" }}
              size="small"
              className="rounded-lg py-2"
              slotProps={{
                input: { endAdornment: <span>{selectedValue || "in"}</span> },
              }}
            ></TextField>
          </div>

          <div className="flex flex-col w-[30%]">
            <label htmlFor="breadth" className="font-semibold text-gray-500">
              Breadth
            </label>
            <TextField
              id="breadth"
              {...register("breadth")}
              type="number"
              onInput={handleFractionInput}
              inputProps={{ step: "0.01" }}
              size="small"
              className="rounded-lg py-2"
              slotProps={{
                input: { endAdornment: <span>{selectedValue || "in"}</span> },
              }}
            ></TextField>
          </div>

          <div className="flex flex-col w-[30%]">
            <label htmlFor="width" className="font-semibold text-gray-500">
              Width
            </label>

            <TextField
              id="width"
              {...register("width")}
              type="number"
              onInput={handleFractionInput}
              inputProps={{ step: "0.01" }}
              size="small"
              className="rounded-lg py-2"
              slotProps={{
                input: { endAdornment: <span>{selectedValue || "in"}</span> },
              }}
            ></TextField>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductShipping;
