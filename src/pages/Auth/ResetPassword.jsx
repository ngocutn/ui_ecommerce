import React from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import { Button, TextField } from "@mui/material";
import { ArrowLeft, KeyRound, LockKeyhole } from "lucide-react";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import * as yup from "yup";
import WaveBg from "../../components/WaveBg";
import { useDispatch, useSelector } from "react-redux";
import Loading from "../../components/Loading";

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

  const onSubmit = (data) => {
    console.log(data);

    // const formData = new FormData();
    // formData.append("email", data.email);

    // dispatch(forgotPassword(formData));
  };

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
              type="password"
              variant="outlined"
              error={!!errors.password}
              helperText={errors.password?.message}
              fullWidth
              size="small"
            />
            <TextField
              {...register("confirmPassword")}
              label="Confirm Password"
              type="password"
              variant="outlined"
              error={!!errors.confirmPassword}
              helperText={errors.confirmPassword?.message}
              fullWidth
              size="small"
            />

            <Button
              className="bg-[#3195e4] text-white mt-2 font-semibold"
              fullWidth
              sx={{ fontSize: "12px" }}
              type="submit"
            >
              {isLoading ? <Loading></Loading> : "Confirm"}
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
    </div>
  );
};

export default ResetPassword;
