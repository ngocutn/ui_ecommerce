import React, { useEffect, useState } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import {
  Button,
  Checkbox,
  FormControlLabel,
  Grid,
  TextField,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import Loading from "../../../components/Loading";
import SocialLink from "../../../components/form/SocialLink";
import { useDispatch, useSelector } from "react-redux";
import { clearAllError, Register } from "../../../store/slice/userSlice";
import EyeIcon from "../../../icon/EyeIcon";
import { toast } from "react-toastify";

const schema = yup.object({
  firstName: yup
    .string()
    .matches(/^\S(.*\S)?$/, "First name is not valid!")
    .required("First name is required"),
  lastName: yup
    .string()
    .matches(/^\S(.*\S)?$/, "Last name is not valid!")
    .required("Last name is required"),
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
    reset,
    formState: { errors, isValid, isLoading },
  } = useForm({
    resolver: yupResolver(schema),
    mode: "onChange",
  });

  const dispatch = useDispatch();
  const navigatioTo = useNavigate();
  const { error, message, isConfirm } = useSelector((state) => state.user);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [email, setEmail] = useState("");

  const onSubmit = (data) => {
    const formData = new FormData();

    formData.append("firstName", data.firstName);
    formData.append("lastName", data.lastName);
    formData.append("email", data.email);
    setEmail(data.email);
    formData.append("password", data.password);
    const roles = ["ROLE_SELLER"];

    roles.forEach((role) => {
      formData.append("roles[]", role); // Thêm với tên khóa là "roles[]"
    });

    dispatch(Register(formData));
  };

  useEffect(() => {
    if (error) {
      console.log("error", error);
    }

    if (isConfirm) {
      navigatioTo(`/confirm/${email}`);
      reset();
    }

    if (message) {
      toast.success(message);
    }
  }, [error, message, dispatch]);

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className={`w-1/2 p-10 text-center register-container ${className} max-h-[500px] overflow-y-scroll`}
    >
      <h1 className="text-3xl font-bold text-center">Register Buyer.</h1>

      <div className="flex flex-col mt-8 mb-4 gap-y-2">
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <TextField
              {...register("firstName")}
              label="First Name"
              variant="outlined"
              error={!!errors.firstName}
              helperText={errors.firstName?.message || " "}
              fullWidth
              sx={{
                "& .MuiInputBase-input": {
                  fontSize: "14px", // Điều chỉnh kích thước font
                },
              }}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              {...register("lastName")}
              label="Last Name"
              variant="outlined"
              error={!!errors.lastName}
              helperText={errors.lastName?.message || " "}
              fullWidth
              sx={{
                "& .MuiInputBase-input": {
                  fontSize: "14px",
                },
              }}
            />
          </Grid>
        </Grid>

        <TextField
          {...register("email")}
          label="Email"
          variant="outlined"
          error={!!errors.email}
          helperText={errors.email?.message || " "}
          fullWidth
          sx={{
            "& .MuiInputBase-input": {
              fontSize: "14px",
            },
          }}
        />

        <TextField
          {...register("password")}
          label="Password"
          type={showPassword ? "text" : "password"}
          variant="outlined"
          error={!!errors.password}
          helperText={errors.password?.message || " "}
          fullWidth
          InputProps={{
            endAdornment: (
              <EyeIcon
                showPassword={showPassword}
                toggleShowPassword={() => setShowPassword(!showPassword)}
              />
            ),
          }}
          sx={{
            "& .MuiInputBase-input": {
              fontSize: "14px",
            },
          }}
        />

        <TextField
          {...register("confirmPassword")}
          label="Confirm Password"
          type={showConfirmPassword ? "text" : "password"}
          variant="outlined"
          error={!!errors.confirmPassword}
          helperText={errors.confirmPassword?.message || " "}
          fullWidth
          InputProps={{
            endAdornment: (
              <EyeIcon
                showPassword={showConfirmPassword}
                toggleShowPassword={() =>
                  setShowConfirmPassword(!showConfirmPassword)
                }
              />
            ),
          }}
          sx={{
            "& .MuiInputBase-input": {
              fontSize: "14px",
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
        {isLoading ? (
          <div className="p-2 border-4 border-white rounded-full border-b-transparent animate-spin"></div>
        ) : (
          <span>Register</span>
        )}
      </Button>

      <SocialLink></SocialLink>
    </form>
  );
};

export default RegisterBuyer;
