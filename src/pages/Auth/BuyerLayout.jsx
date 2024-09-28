import React, { useEffect } from "react";
import LoginBuyer from "./components/LoginBuyer";
import RegisterBuyer from "./components/RegisterBuyer";
import BuyerAuth from "../../utils/BuyerAuth";
import { useSelector, useDispatch } from "react-redux";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { clearAllError } from "../../store/slice/userSlice";

const BuyerLayout = () => {
  useEffect(() => {
    const cleanup = BuyerAuth();
    return () => {
      cleanup;
    };
  }, []);
  const dispatch = useDispatch();
  const { message } = useSelector((state) => state.user);

  useEffect(() => {
    toast.success(message);
  }, [message]);

  return (
    <div className="relative flex items-center justify-center w-full h-screen">
      <div className="absolute top-0 left-0 m-5 size-20">
        <img
          src="https://media.licdn.com/dms/image/v2/C4E0BAQGx-TFoWYNJcg/company-logo_200_200/company-logo_200_200/0/1659539191896?e=1733356800&v=beta&t=6Q59ItomXoSc2VXB7_RWGddV0P5FLE6FcCQPVCuJDIM"
          alt=""
          className="object-cover w-full h-full mb-10"
        />
      </div>

      <div className="container">
        <LoginBuyer className={"absolute top-0 left-0 bg-white"}></LoginBuyer>
        <RegisterBuyer
          className={"absolute top-0 left-0 bg-white"}
        ></RegisterBuyer>
        <div className="overlay-container">
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
