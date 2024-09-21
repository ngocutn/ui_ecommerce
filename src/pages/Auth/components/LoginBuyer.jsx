import React from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { Button, Checkbox, FormControlLabel, TextField } from "@mui/material";
import { Link } from "react-router-dom";
import Loading from "../../../components/Loading";
import SocialLink from "../../../components/form/SocialLink";

const schema = yup.object({
  email: yup.string().email().required("Email is required"),
  password: yup
    .string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
});

const LoginBuyer = ({ className }) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid, isLoading },
  } = useForm({
    resolver: yupResolver(schema),
    mode: "onChange",
  });

  console.log(errors.email?.message);

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className={`w-1/2 p-10 text-center ${className} login-container`}
    >
      <h1 className="text-3xl font-bold text-center">Login Buyer.</h1>

      <div className="flex flex-col mt-10 mb-4 gap-y-8">
        <TextField
          {...register("email")}
          label="Email"
          variant="outlined"
          error={!!errors.email}
          helperText={errors.email?.message}
          fullWidth
        />

        <TextField
          {...register("password")}
          label="Password"
          type="password"
          variant="outlined"
          error={!!errors.password}
          helperText={errors.password?.message}
          fullWidth
        />
      </div>

      <div className="flex items-center justify-between mb-4 text-sm cursor-pointer">
        <FormControlLabel
          control={<Checkbox defaultChecked size="small" />}
          label="Remember me"
        />
        <Link to="/buyer" className="hover:text-[#1576d2] text-[#dbdbdb]">
          Forgot password?
        </Link>
      </div>

      <Button
        type="submit"
        variant="contained"
        color="primary"
        disabled={!isValid}
        sx={{ width: "70%" }}
      >
        {isLoading ? <Loading></Loading> : "Login"}
      </Button>

      <SocialLink></SocialLink>
    </form>
  );
};

export default LoginBuyer;
