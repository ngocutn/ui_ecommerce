import React, { useState } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import { Button, TextField } from "@mui/material";
import { ArrowLeft, KeyRound, LockKeyhole } from "lucide-react";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import {
  Link,
  useNavigate,
  useParams,
  useSearchParams,
} from "react-router-dom";
import * as yup from "yup";
import WaveBg from "../../components/WaveBg";
import { useDispatch, useSelector } from "react-redux";
import { clearAllError, resetPassword } from "../../store/slice/userSlice";
import { toast, ToastContainer } from "react-toastify";
import EyeIcon from "../../icon/EyeIcon";

const schema = yup.object({
  password: yup
    .string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
  confirmPassword: yup
    .string()
    .oneOf(
      [yup.ref("password"), null],
      "Confirm Passwords must match Password"
    ),
});

const ResetPassword = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    mode: "onChange",
  });

  const { isLoading, error, message } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [searchParams] = useSearchParams();
  const email = searchParams.get("email");
  const navigateTo = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const onSubmit = (data) => {
    const formData = new FormData();

    formData.append("email", email.trim());
    formData.append("newPassword", data.password.trim());
    formData.append("confirmPassword", data.confirmPassword.trim());
    const url = new URL(window.location.href);
    const token = url.searchParams.get("token");

    dispatch(resetPassword(formData, token));
  };

  useEffect(() => {
    if (error) {
      console.log(error);
      toast.error(message);
    }

    if (message) {
      toast.success("Reset Password Successfully");
      navigateTo("/login");
    }

    return () => {
      dispatch(clearAllError());
    };
  }, [dispatch, error, message]);

  return (
    <div className="flex items-center justify-center w-full h-screen">
      <div className="absolute top-0 left-0 m-5 size-20">
        <img
          src="https://media.licdn.com/dms/image/v2/C4E0BAQGx-TFoWYNJcg/company-logo_200_200/company-logo_200_200/0/1659539191896?e=1733356800&v=beta&t=6Q59ItomXoSc2VXB7_RWGddV0P5FLE6FcCQPVCuJDIM"
          alt=""
          className="object-cover w-full h-full"
        />
      </div>
      <div className="bg-white rounded-lg shadow-primary w-[50%] p-10 pb-36 flex items-center justify-center flex-col relative overflow-hidden">
        <div className="p-5 bg-[#3195e4] rounded-full">
          <KeyRound size={28} color="#fff"></KeyRound>
        </div>
        <div className="mt-10 text-center">
          <h1 className="text-3xl font-bold text-[#3195e4]">
            Reset Your Password
          </h1>
          <p className="mt-5 text-gray-400">
            Enter your password and confirm password to reset it
          </p>

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col mt-5 gap-y-5"
          >
            <TextField
              {...register("password")}
              label="Password"
              type={showPassword ? "text" : "password"}
              variant="outlined"
              error={!!errors.password}
              helperText={errors.password?.message}
              fullWidth
              size="small"
              InputProps={{
                endAdornment: (
                  <EyeIcon
                    showPassword={showPassword}
                    toggleShowPassword={() => setShowPassword((prev) => !prev)}
                  />
                ),
              }}
            />
            <TextField
              {...register("confirmPassword")}
              label="Confirm Password"
              type={showConfirmPassword ? "text" : "password"}
              variant="outlined"
              error={!!errors.confirmPassword}
              helperText={errors.confirmPassword?.message}
              fullWidth
              size="small"
              InputProps={{
                endAdornment: (
                  <EyeIcon
                    showPassword={showConfirmPassword}
                    toggleShowPassword={() =>
                      setShowConfirmPassword((prev) => !prev)
                    }
                  />
                ),
              }}
            />

            <Button
              className="bg-[#3195e4] text-white mt-2 font-semibold"
              fullWidth
              sx={{ fontSize: "12px" }}
              type="submit"
              disabled={isLoading}
            >
              {isLoading ? (
                <div className="p-2 border-4 border-white rounded-full border-b-transparent animate-spin"></div>
              ) : (
                <span>Confirm</span>
              )}
            </Button>
          </form>
          <Link to="/login" className="z-20 flex items-center mt-3 group">
            <ArrowLeft
              size={18}
              className="group-hover:text-[#3195e4]"
            ></ArrowLeft>
            <span className="group-hover:text-[#3195e4] group-hover:underline">
              Back to login page
            </span>
          </Link>
        </div>
        <WaveBg></WaveBg>
      </div>
      <ToastContainer></ToastContainer>
    </div>
  );
};

export default ResetPassword;
