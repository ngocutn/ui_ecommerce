import { useState } from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import Grid from "@mui/material/Grid2";

const variantOptions = ["Color", "Ram", "Storage"];

const VariantName = ({ onValuesChange }) => {
  const [values, setValues] = useState({});
  onValuesChange(values);

  const handleChange = (option, newValue) => {
    setValues((prevValues) => ({
      ...prevValues,
      [option]: newValue,
    }));
  };

  const [selectedVariant, setSelectedVariant] = useState("");
  const handleRadioChange = (option) => {
    setSelectedVariant(option);
  };

  console.log(values);
  return (
    <div className="flex flex-col items-center">
      <p className="self-start">Primary Variant</p>
      {variantOptions.map((option) => (
        <Grid container className="w-[70%] flex items-center my-3">
          <Grid size={1}>
            <input
              type="radio"
              name="variant"
              checked={selectedVariant === option}
              onChange={() => handleRadioChange(option)}
            />
          </Grid>
          <Grid size={1}>
            <p className="text-base font-semibold">{option}</p>
          </Grid>
          <Grid size={10}>
            <Autocomplete
              size="small"
              multiple
              freeSolo
              options={[]}
              value={values[option] || []}
              onChange={(event, newValue) => {
                handleChange(option, newValue);
              }}
              renderInput={(params) => (
                <TextField {...params} variant="outlined" />
              )}
            />
          </Grid>
        </Grid>
      ))}
      <div className="flex"></div>
    </div>
  );
};

export default VariantName;
