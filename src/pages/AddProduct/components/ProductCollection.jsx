import { Controller, useFormContext } from "react-hook-form";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import Chip from "@mui/material/Chip";
import Checkbox from "@mui/material/Checkbox";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getAllCollection } from "../../../store/slice/collectionSlice";

const ProductCollection = () => {
  const {
    register,
    control,
    formState: { errors },
  } = useFormContext();

  const dispatch = useDispatch();
  const { error, isLoading, collections } = useSelector(
    (state) => state.productCollection
  );

  useEffect(() => {
    if (error) {
      console.log(error);
    }

    dispatch(getAllCollection());
  }, [error, dispatch]);

  console.log("collections", collections);

  return (
    <div>
      <p className="text-xl font-semibold mt-7">Collection</p>

      <Controller
        name="collections" // Set the name for the form field
        control={control} // Pass control from react-hook-form
        defaultValue={[]} // Set default value to an empty array
        render={({ field: { onChange, value } }) => (
          <Autocomplete
            className="w-full my-3 border rounded-md"
            multiple
            id="productCollection"
            options={collections}
            disableCloseOnSelect
            value={value} // Controlled value
            limitTags={3}
            renderOption={(props, option, { selected }) => {
              const { key, ...optionProps } = props;
              return (
                <li key={option.id} {...optionProps}>
                  <Checkbox style={{ marginRight: 8 }} checked={selected} />
                  {option.name}
                </li>
              );
            }}
            renderTags={(value, getTagProps) =>
              value.map((option, index) => (
                <Chip
                  key={option.id}
                  label={option.name}
                  {...getTagProps({ index })}
                  sx={{ backgroundColor: "#0559fe", color: "#fff" }}
                />
              ))
            }
            renderInput={(params) => (
              <TextField
                {...params}
                placeholder="Collections"
                sx={{
                  "& .MuiOutlinedInput-root": {
                    "& fieldset": {
                      border: "none",
                    },
                  },
                }}
              />
            )}
          />
        )}
      />
    </div>
  );
};

export default ProductCollection;
