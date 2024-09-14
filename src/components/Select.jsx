import * as React from "react";
import { styled } from "@mui/material/styles";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import NativeSelect from "@mui/material/NativeSelect";
import InputBase from "@mui/material/InputBase";

const BootstrapInput = styled(InputBase)(({ theme }) => ({
  "label + &": {
    marginTop: theme.spacing(3),
  },
  "& .MuiInputBase-input": {
    borderRadius: 10,
    position: "relative",
    backgroundColor: theme.palette.background.paper,
    border: "1px solid #ced4da",
    fontSize: 16,
    padding: "10px 26px 10px 12px",
    transition: theme.transitions.create(["border-color", "box-shadow"]),
    // Use the system font instead of the default Roboto font.
    fontFamily: [
      "-apple-system",
      "BlinkMacSystemFont",
      '"Segoe UI"',
      "Roboto",
      '"Helvetica Neue"',
      "Arial",
      "sans-serif",
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
      "OpenSans",
    ].join(","),
    "&:focus": {
      borderRadius: 4,
      borderColor: "#80bdff",
      boxShadow: "0 0 0 0.2rem rgba(0,123,255,.25)",
    },
  },
}));

export default function CustomizedSelects({
  children,
  Value,
  setValue,
  valueType,
}) {
  const handleChange = (event) => {
    setValue(event.target.value);
  };
  return (
    <div className="w-full">
      <FormControl sx={{ m: 1 }} variant="standard" className="w-full">
        <NativeSelect
          id="demo-customized-select-native"
          value={Value}
          onChange={handleChange}
          input={<BootstrapInput />}
        >
          {/* <option aria-label="Read All" value="read all">
            Read all
          </option>
          <option value={1}>Ten</option>
          <option value={2}>Twenty</option>
          <option value={3}>Thirty</option>
          <option value={4}>Thirty</option>
          <option value={5}>Thirty</option> */}
          {children}
        </NativeSelect>
      </FormControl>
    </div>
  );
}
