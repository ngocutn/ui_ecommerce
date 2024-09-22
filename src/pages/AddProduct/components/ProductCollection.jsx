import { useFormContext } from "react-hook-form";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Chip from "@mui/material/Chip";
import MenuItem from "@mui/material/MenuItem";
import Checkbox from "@mui/material/Checkbox";
import ListItemText from "@mui/material/ListItemText";
import Select from "@mui/material/Select";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import OutlinedInput from "@mui/material/OutlinedInput";
import { useState } from "react";

const collections = [
  "Oliver Hansen",
  "Van Henry",
  "April Tucker",
  "Ralph Hubbard",
  "Omar Alexander",
  "Carlos Abbott",
  "Miriam Wagner",
  "Bradley Wilkerson",
  "Virginia Andrews",
  "Kelly Snyder",
];
// function getStyles(name, collection, theme) {
//   return {
//     fontWeight: collection.includes(name)
//       ? theme.typography.fontWeightMedium
//       : theme.typography.fontWeightRegular,
//   };
// }
const ProductCollection = () => {
  // const theme = useTheme();
  // const [collection, setCollection] = useState([]);

  // const handleChange = (event) => {
  //   const {
  //     target: { value },
  //   } = event;
  //   setCollection(typeof value === "string" ? value.split(",") : value);
  // };

  // const handleDelete = (chipToDelete) => () => {
  //   setChipData((chips) =>
  //     chips.filter((chip) => chip.key !== chipToDelete.key)
  //   );
  // };

  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <div>
      <p className="text-xl font-semibold mt-7">Collection</p>

      <Autocomplete
        className="w-full my-3 border rounded-md"
        multiple
        id="productCollection"
        options={collections}
        disableCloseOnSelect
        limitTags={3}
        renderOption={(props, option, { selected }) => {
          const { key, ...optionProps } = props;
          return (
            <li key={key} {...optionProps}>
              <Checkbox style={{ marginRight: 8 }} checked={selected} />
              {option}
            </li>
          );
        }}
        renderTags={(value, getTagProps) =>
          value.map((option, index) => (
            <Chip
              label={option}
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
      {/* </div> */}
    </div>
  );
};

export default ProductCollection;
