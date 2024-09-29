// PasswordVisibilityToggle.js
import React from "react";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { IconButton, InputAdornment } from "@mui/material";

const EyeIcon = ({ showPassword, toggleShowPassword }) => {
  return (
    <InputAdornment position="end">
      <IconButton onClick={toggleShowPassword}>
        {showPassword ? <VisibilityOff /> : <Visibility />}
      </IconButton>
    </InputAdornment>
  );
};

export default EyeIcon;
