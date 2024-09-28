import { useFormContext } from "react-hook-form";
import TextField from "@mui/material/TextField";
import { InputAdornment } from "@mui/material";
import { useEffect } from "react";

const ProductPricing = () => {
  const {
    register,
    formState: { errors },
    setError,
    clearErrors,
    getValues,
  } = useFormContext();

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

  const validatePrices = () => {
    const { originalPrice, discountedPrice, sellingPrice } = getValues();

    if (!originalPrice || !sellingPrice) {
      if (!originalPrice) {
        setError("originalPrice", { message: "MSRP Price is required" });
      }
      if (!sellingPrice) {
        setError("sellingPrice", { message: "Price is required" });
      }
      return;
    }

    if (discountedPrice) {
      if (Number(originalPrice) >= Number(discountedPrice)) {
        setError("originalPrice", {
          message: "MSRP Price must be less than Sale Price",
        });
      } else if (Number(discountedPrice) >= Number(sellingPrice)) {
        setError("discountedPrice", {
          message: "Sale Price must be less than Price",
        });
      } else if (Number(originalPrice) >= Number(sellingPrice)) {
        setError("originalPrice", {
          message: "MRSP Price must be less than Price",
        });
      } else {
        clearErrors(["originalPrice", "discountedPrice", "sellingPrice"]);
      }
    } else {
      if (Number(originalPrice) >= Number(sellingPrice)) {
        setError("originalPrice", { message: "MSRP must be less than Price" });
      } else {
        clearErrors(["originalPrice", "sellingPrice"]);
      }
    }
  };

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
              MSRP Price <span className="text-red-600">*</span>
            </label>

            <TextField
              id="originalPrice"
              {...register("originalPrice")}
              type="number"
              size="small"
              onInput={handleFractionInput}
              onBlur={validatePrices}
              inputProps={{ step: "0.01" }}
              className="py-2 rounded-lg"
              sx={{
                "& .MuiInputBase-root": {
                  paddingLeft: "6px",
                },
              }}
              error={!!errors.originalPrice}
              slotProps={{
                input: {
                  startAdornment: (
                    <InputAdornment position="start">
                      <i
                        className="px-3 py-2 text-black bg-gray-200 rounded-sm fa fa-usd"
                        aria-hidden="true"
                      ></i>
                    </InputAdornment>
                  ),
                },
              }}
              helperText={
                errors.originalPrice && (
                  <span>
                    <i
                      className="text-red-500 fa fa-exclamation-circle"
                      aria-hidden="true"
                    ></i>
                    {` ${errors.originalPrice?.message}`}
                  </span>
                )
              }
            ></TextField>
          </div>
          <div className="flex flex-col w-1/2 ">
            <label
              htmlFor="discountedPrice"
              className="font-semibold text-gray-500"
            >
              Sale Price
            </label>
            <TextField
              id="discountedPrice"
              {...register("discountedPrice")}
              type="number"
              size="small"
              onInput={handleFractionInput}
              onBlur={validatePrices}
              inputProps={{ step: "0.01" }}
              className="py-2 rounded-lg"
              sx={{
                "& .MuiInputBase-root": {
                  paddingLeft: "6px",
                },
              }}
              error={!!errors.discountedPrice}
              slotProps={{
                input: {
                  startAdornment: (
                    <InputAdornment position="start">
                      <i
                        className="px-3 py-2 text-black bg-gray-200 rounded-sm fa fa-usd"
                        aria-hidden="true"
                      ></i>
                    </InputAdornment>
                  ),
                },
              }}
              helperText={
                errors.discountedPrice && (
                  <span>
                    <i
                      className="text-red-500 fa fa-exclamation-circle"
                      aria-hidden="true"
                    ></i>
                    {` ${errors.discountedPrice?.message}`}
                  </span>
                )
              }
            ></TextField>
          </div>
        </div>

        <label htmlFor="sellingPrice" className="font-semibold text-gray-500">
          Price <span className="text-red-600">*</span>
        </label>

        <TextField
          id="sellingPrice"
          type="number"
          {...register("sellingPrice")}
          size="small"
          onInput={handleFractionInput}
          onBlur={validatePrices}
          inputProps={{ step: "0.01" }}
          className="py-2 rounded-lg"
          sx={{
            "& .MuiInputBase-root": {
              paddingLeft: "6px",
            },
          }}
          error={!!errors.sellingPrice}
          slotProps={{
            input: {
              startAdornment: (
                <InputAdornment position="start">
                  <i
                    className="px-3 py-2 text-black bg-gray-200 rounded-sm fa fa-usd"
                    aria-hidden="true"
                  ></i>
                </InputAdornment>
              ),
            },
          }}
          helperText={
            errors.sellingPrice && (
              <span>
                <i
                  className="text-red-500 fa fa-exclamation-circle"
                  aria-hidden="true"
                ></i>
                {` ${errors.sellingPrice?.message}`}
              </span>
            )
          }
        ></TextField>
      </div>
    </div>
  );
};

export default ProductPricing;
