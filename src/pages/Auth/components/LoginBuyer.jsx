import React, { useEffect, useState } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { set, useForm } from "react-hook-form";
import {
  Button,
  Checkbox,
  FormControlLabel,
  TextField,
  InputAdornment,
  IconButton,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import Loading from "../../../components/Loading";
import SocialLink from "../../../components/form/SocialLink";
import { useDispatch, useSelector } from "react-redux";

import {
  clearUserInfor,
  Login,
  setIsAuthenticated,
} from "../../../store/slice/userSlice";
import { toast } from "react-toastify";
import EyeIcon from "../../../icon/EyeIcon";

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
    formState: { errors, isValid },
  } = useForm({
    resolver: yupResolver(schema),
    mode: "onChange",
  });

  const dispatch = useDispatch();
  const navigateTo = useNavigate();
  const [isShowError, setIsShowError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const {
    error,
    message,
    user: userData,
    isLoading,
  } = useSelector((state) => state.user);

  const onSubmit = (data) => {
    dispatch(Login(data));
  };

  useEffect(() => {
    if (error) {
      console.log(error);
      setIsShowError(true);
      setErrorMessage(error);
    }

    if (message) {
      console.log("user data", userData);
      navigateTo("/");
    }
  }, [error, message, dispatch]);

  useEffect(() => {
    if (userData) {
      userData.user?.roles.find((user) => user.roles === "ROLE_USER");
    } else {
      toast.error("User not found");

      dispatch(clearUserInfor());
    }
  }, [userData]);
  const handleInputChange = () => {
    setIsShowError(false);
    setErrorMessage("");
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className={`w-1/2 h-full p-10 text-center ${className} login-container overflow-y-scroll`}
    >
      <h1 className="text-3xl font-bold text-center">Login Buyer.</h1>

      <div className="flex flex-col mt-6 mb-4 gap-y-7">
        <TextField
          {...register("email")}
          label="Email"
          variant="outlined"
          error={!!errors.email}
          helperText={errors.email?.message}
          fullWidth
          onChange={handleInputChange}
        />
        <TextField
          {...register("password")}
          label="Password"
          type={showPassword ? "text" : "password"}
          variant="outlined"
          error={!!errors.password}
          helperText={errors.password?.message}
          fullWidth
          onChange={handleInputChange}
          InputProps={{
            endAdornment: (
              <EyeIcon
                showPassword={showPassword}
                toggleShowPassword={() => setShowPassword(!showPassword)}
              />
            ),
          }}
        />
      </div>
      {isShowError && (
        <p className="p-0 m-0 text-red-400 text-start">{errorMessage}</p>
      )}
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
        disabled={!isValid || isLoading}
        sx={{ width: "70%" }}
      >
        {isLoading ? <Loading></Loading> : "Login"}
      </Button>

      <SocialLink></SocialLink>
    </form>
  );
};

export default LoginBuyer;
