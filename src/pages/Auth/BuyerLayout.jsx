import React, { useEffect, useState } from "react";
import LoginBuyer from "./components/LoginBuyer";
import RegisterBuyer from "./components/RegisterBuyer";
import BuyerAuth from "../../utils/BuyerAuth";
import { useSelector, useDispatch } from "react-redux";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { clearAllError } from "../../store/slice/userSlice";
import { useNavigate } from "react-router-dom";

const BuyerLayout = () => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const cleanup = BuyerAuth();
    return () => {
      cleanup;
    };
  }, []);

  const dispatch = useDispatch();
  const navigateTo = useNavigate();

  const {
    error,
    message,
    user: userData,
    isLoading,
  } = useSelector((state) => state.user);

  useEffect(() => {
    if (error) {
      console.log(error);
      toast.error(error);
    }

    if (message) {
      toast.success(message);
      navigateTo("/");
    }

    return () => {
      dispatch(clearAllError());
    };
  }, [dispatch, error, message]);

  return (
    <div className="relative flex items-center justify-center w-full h-screen">
      <div className="absolute top-0 left-0 m-5 size-20">
        <img
          src="https://media.licdn.com/dms/image/v2/C4E0BAQGx-TFoWYNJcg/company-logo_200_200/company-logo_200_200/0/1659539191896?e=1733356800&v=beta&t=6Q59ItomXoSc2VXB7_RWGddV0P5FLE6FcCQPVCuJDIM"
          alt=""
          className="object-cover w-full h-full mb-10"
        />

        <button
          className="hidden px-5 py-2 -mt-10 text-white bg-blue-400 rounded-md shadow-md sm:block"
          onClick={() => setShow(!show)}
        >
          Register
        </button>
      </div>

      <div className="container sm:w-[90%]">
        <LoginBuyer
          className={`absolute top-0 left-0 bg-white sm:w-full ${
            show ? "sm:z-0 sm:opacity-0" : ""
          }`}
        ></LoginBuyer>
        <RegisterBuyer
          className={`absolute top-0 left-0 bg-white sm:w-full ${
            show ? "sm:z-30 sm:opacity-100 py-16" : ""
          }`}
        ></RegisterBuyer>
        <div className="overlay-container sm:hidden">
          <div className="overlay">
            <div className="w-1/2 overlay-panel overlay-left">
              <h1 className="text-[40px] font-semibold text-white drop-shadow-md">
                Hello <br /> friends
              </h1>
              <p className="my-4 text-white">
                If you have an account, login here and have fun
              </p>
              <button className="bg-[#1b75d3] w-full py-2 font-bold text-white rounded-3xl border-2 border-white login-button">
                Login
              </button>
            </div>
            <div className="w-1/2 overlay-panel overlay-right">
              <h1 className="text-[40px] font-semibold text-white drop-shadow-md">
                Start your <br />
                journey now
              </h1>
              <p className="my-4 text-white">
                If you dont have an account yet, join us and start your jouney
              </p>
              <button className="bg-[#1b75d3] w-full py-2 font-bold text-white rounded-3xl border-2 border-white register-button">
                Register
              </button>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default BuyerLayout;
