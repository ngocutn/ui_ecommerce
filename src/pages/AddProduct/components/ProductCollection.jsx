import { Controller, useFormContext } from "react-hook-form";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import Chip from "@mui/material/Chip";
import Checkbox from "@mui/material/Checkbox";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import {
  getAllCollection,
  setCollectionData,
} from "../../../store/slice/collectionSlice";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import CheckBoxIcon from "@mui/icons-material/CheckBox";

const ProductCollection = () => {
  const {
    control,
    formState: { errors },
  } = useFormContext();

  const dispatch = useDispatch();
  const { error, collections } = useSelector(
    (state) => state.productCollection
  );

  const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
  const checkedIcon = <CheckBoxIcon fontSize="small" />;
  const [selectedCollections, setSelectedCollections] = useState([]);

  useEffect(() => {
    if (error) {
      console.log(error);
    }

    dispatch(getAllCollection());
  }, [error, dispatch]);

  const handleAddCollection = (newCollection) => {
    setSelectedCollections(newCollection);
    dispatch(setCollectionData(selectedCollections));
  };

  return (
    <div>
      <p className="text-xl font-semibold mt-7">Collection</p>

      <Controller
        name="selectedCollections" // Tên trường sẽ chứa array các giá trị
        control={control} // Kết nối với control
        defaultValue={[]} // Giá trị mặc định là một array rỗng
        render={({ field: { onChange, value } }) => (
          <Autocomplete
            multiple
            id="checkboxes-tags-demo"
            options={collections.results}
            disableCloseOnSelect
            getOptionLabel={(option) => option?.name}
            onChange={(event, newValue) => {
              onChange(newValue); // Cập nhật giá trị khi chọn
            }}
            value={value} // Gán giá trị hiện tại
            renderOption={(props, option, { selected }) => {
              const { key, ...optionProps } = props;
              return (
                <li key={key} {...optionProps}>
                  <Checkbox
                    icon={icon}
                    checkedIcon={checkedIcon}
                    style={{ marginRight: 8 }}
                    checked={selected}
                  />
                  {option.name}
                </li>
              );
            }}
            style={{ width: 500 }}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Checkboxes"
                placeholder="Favorites"
              />
            )}
          />
        )}
      />

      {errors.selectedCollections && (
        <p className="text-red-500">{errors.selectedCollections.message}</p>
      )}
    </div>
  );
};

export default ProductCollection;
