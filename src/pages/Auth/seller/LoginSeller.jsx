import { yupResolver } from "@hookform/resolvers/yup";
import { Button, Checkbox, FormControlLabel, TextField } from "@mui/material";
import React from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import * as yup from "yup";
import Loading from "../../../components/Loading";
import SocialLink from "../../../components/form/SocialLink";

const schema = yup.object({
  email: yup.string().email().required("Email is required"),
  password: yup
    .string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
});

const LoginSeller = ({ className }) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid, isLoading },
  } = useForm({
    resolver: yupResolver(schema),
    mode: "onChange",
  });

  const dispatch = useDispatch();
  const navigateTo = useNavigate();
  const { error, message, user: userData } = useSelector((state) => state.user);

  const onSubmit = (data) => {
    const formData = new FormData();

    formData.append("email", data.email);
    formData.append("password", data.password);

    // dispatch(Login(formData));
    // reset();
  };

  // useEffect(() => {
  //   if (error) {
  //     console.log(error);
  //   }

  //   if (message) {
  //     console.log("user data", userData);
  //     navigateTo("/");
  //   }
  // }, [error, message, dispatch]);

  // useEffect(() => {
  //   if (userData) {
  //     userData.user?.roles.find((user) => user.roles === "ROLE_USER");
  //   } else {
  //     toast.error("User not found");

  //     dispatch(clearUserInfor());
  //   }
  // }, [userData]);

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className={`w-1/2 h-full p-10 text-center ${className} login-container overflow-y-scroll`}
    >
      <h1 className="text-3xl font-bold text-center">Login Seller.</h1>

      <div className="flex flex-col mt-6 mb-4 gap-y-7">
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
      {error && <p className="p-0 m-0 text-red-400 text-start">{error}</p>}

      <div className="flex items-center justify-between mb-4 text-sm cursor-pointer">
        <FormControlLabel
          control={<Checkbox defaultChecked size="small" />}
          label="Remember me"
        />
        <Link to="/forgot" className="hover:text-[#1576d2] text-[#dbdbdb]">
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

export default LoginSeller;
