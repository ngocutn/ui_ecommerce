import { yupResolver } from "@hookform/resolvers/yup";
import { Button, TextField } from "@mui/material";
import { ArrowLeft, LockKeyhole } from "lucide-react";
import React, { useEffect, useState } from "react";
import { Form, useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import * as yup from "yup";
import WaveBg from "../../components/WaveBg";
import { useDispatch, useSelector } from "react-redux";
import Loading from "../../components/Loading";
import { forgotPassword } from "../../store/slice/userSlice";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; // Import toastify styles

const schema = yup.object({
  email: yup.string().email().required("Email is required"),
});

const ForgotPassword = () => {
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
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (error) {
      toast.error(error);
    }
    if (message) {
      toast.success(message);
      setLoading(false);
    }
  }, [error, message, setLoading]);

  // Form submit handler
  const onSubmit = (data) => {
    setLoading(true);
    dispatch(forgotPassword(data.email));
  };

  return (
    <div className="flex items-center justify-center w-full h-screen">
      <div className="absolute top-0 left-0 m-5 size-20 sm:size-10">
        <img
          src="https://media.licdn.com/dms/image/v2/C4E0BAQGx-TFoWYNJcg/company-logo_200_200/company-logo_200_200/0/1659539191896?e=1733356800&v=beta&t=6Q59ItomXoSc2VXB7_RWGddV0P5FLE6FcCQPVCuJDIM"
          alt=""
          className="object-cover w-full h-full"
        />
      </div>
      <div className="bg-white rounded-lg sm:w-[90%] sm:pb-20 shadow-primary w-[50%] p-10 pb-36 flex items-center justify-center flex-col relative overflow-hidden">
        <div className="p-5 bg-[#3195e4] rounded-full">
          <LockKeyhole size={28} color="#fff"></LockKeyhole>
        </div>
        <div className="mt-10 text-center">
          <h1 className="text-3xl font-bold text-[#3195e4]">
            Forgot Your Password?
          </h1>
          <p className="mt-5 text-gray-400">Enter your email to reset it</p>

          <form onSubmit={handleSubmit(onSubmit)} className="mt-5">
            <TextField
              {...register("email")}
              fullWidth
              label="Email"
              id="fullWidth"
              size="small"
              error={!!errors.email}
              helperText={errors.email?.message}
            />

            <Button
              className={` text-white mt-4 font-semibold ${
                loading ? "bg-gray-300" : "bg-[#3195e4]"
              }`}
              fullWidth
              sx={{ fontSize: "12px" }}
              type="submit"
              disabled={loading}
            >
              {isLoading ? (
                <div className="p-2 border-4 border-white rounded-full border-b-transparent animate-spin"></div>
              ) : (
                <span>Login</span>
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

export default ForgotPassword;
