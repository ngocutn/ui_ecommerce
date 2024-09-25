import React from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { Button, Checkbox, FormControlLabel, TextField } from "@mui/material";
import { Link } from "react-router-dom";
import Loading from "../../../components/Loading";
import SocialLink from "../../../components/form/SocialLink";

const schema = yup.object({
  firstName: yup.string().required("First name is required"),
  lastName: yup.string().required("Last name is required"),
  email: yup.string().email().required("Email is required"),
  password: yup
    .string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password"), null], "Confirm Passwords must match Password")
    .required("Confirm Password is required"),
});

const RegisterBuyer = ({ className }) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid, isLoading },
  } = useForm({
    resolver: yupResolver(schema),
    mode: "onChange",
  });

  const onSubmit = (data) => {};
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className={`w-1/2 p-10 text-center register-container ${className} max-h-[500px] overflow-y-scroll`}
    >
      <h1 className="text-3xl font-bold text-center">Register Buyer.</h1>

      <div className="flex flex-col mt-8 mb-4 gap-y-5">
        <TextField
          {...register("firstName")}
          label="First Name"
          variant="outlined"
          error={!!errors.firstName}
          helperText={errors.firstName?.message}
          fullWidth
          sx={{
            "& .MuiInputBase-input": {
              fontSize: "14px", // Điều chỉnh kích thước font
            },
          }}
        />

        <TextField
          {...register("lastName")}
          label="Last Name"
          variant="outlined"
          error={!!errors.lastName}
          helperText={errors.lastName?.message}
          fullWidth
          sx={{
            "& .MuiInputBase-input": {
              fontSize: "14px", // Điều chỉnh kích thước font
            },
          }}
        />

        <TextField
          {...register("email")}
          label="Email"
          variant="outlined"
          error={!!errors.email}
          helperText={errors.email?.message}
          fullWidth
          sx={{
            "& .MuiInputBase-input": {
              fontSize: "14px", // Điều chỉnh kích thước font
            },
          }}
        />

        <TextField
          {...register("password")}
          label="Password"
          type="password"
          variant="outlined"
          error={!!errors.password}
          helperText={errors.password?.message}
          fullWidth
          sx={{
            "& .MuiInputBase-input": {
              fontSize: "14px", // Điều chỉnh kích thước font
            },
          }}
        />

        <TextField
          {...register("confirmPassword")}
          label="Confirm Password"
          type="password"
          variant="outlined"
          error={!!errors.confirmPassword}
          helperText={errors.confirmPassword?.message}
          fullWidth
          sx={{
            "& .MuiInputBase-input": {
              fontSize: "14px", // Điều chỉnh kích thước font
            },
          }}
        />
      </div>

      <Button
        type="submit"
        variant="contained"
        color="primary"
        disabled={!isValid}
        sx={{ width: "70%" }}
      >
        {isLoading ? <Loading></Loading> : "Register"}
      </Button>

      <SocialLink></SocialLink>
    </form>
  );
};

export default RegisterBuyer;
