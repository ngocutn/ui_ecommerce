import React, { useEffect } from "react";
import loadingBg from "../../assets/loading-bg.gif";
import { Link, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { SendEmail } from "../../store/slice/userSlice";

const EmailConfirm = () => {
  const { email } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(SendEmail(email));
  }, []);

  return (
    <div className="flex flex-col items-center justify-center w-full h-screen -mt-10">
      <div className="absolute top-0 left-0 m-5 size-20">
        <img
          src="https://media.licdn.com/dms/image/v2/C4E0BAQGx-TFoWYNJcg/company-logo_200_200/company-logo_200_200/0/1659539191896?e=1733356800&v=beta&t=6Q59ItomXoSc2VXB7_RWGddV0P5FLE6FcCQPVCuJDIM"
          alt=""
          className="object-cover w-full h-full"
        />
      </div>
      <div className="w-[70%] flex flex-col items-center">
        <img src={loadingBg} alt="" />
        <div className="w-[80%] text-center text-3xl font-semibold">
          To complete the process, please check <br /> your email for validation
          request.
          <p className="mt-6 text-sm font-normal">
            <span>Back to </span>
            <Link to={"/"} className="text-blue-300 underline">
              Homepage
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default EmailConfirm;
