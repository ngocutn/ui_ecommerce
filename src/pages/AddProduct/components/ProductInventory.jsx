import { useFormContext } from "react-hook-form";
import TextField from "@mui/material/TextField";

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
            Quantity <span className="text-red-600">*</span>
          </label>

          <TextField
            id="quantityAvailable"
            {...register("quantityAvailable")}
            type="number"
            inputProps={{ step: "1" }}
            onKeyDown={(e) => {
              if (e.key === "." || e.key === "-" || e.key === ",") {
                e.preventDefault();
              }
            }}
            error={!!errors.quantityAvailable}
            helperText={
              errors.quantityAvailable && (
                <span>
                  <i
                    className="text-red-500 fa fa-exclamation-circle"
                    aria-hidden="true"
                  ></i>
                  {` ${errors.quantityAvailable?.message}`}
                </span>
              )
            }
            className="rounded-lg py-2"
            size="small"
          ></TextField>
        </div>

        <div className="flex flex-col w-2/3">
          <label htmlFor="SKU" className="font-semibold text-gray-500">
            SKU (Optional)
          </label>

          <TextField
            type="text"
            id="SKU"
            {...register("SKU")}
            className="rounded-lg py-2"
            size="small"
          ></TextField>
        </div>
      </div>
    </div>
  );
};

export default ProductIventory;
