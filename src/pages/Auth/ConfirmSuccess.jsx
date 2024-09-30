import React from "react";
import success from "../../assets/success.png";
import { Button } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";

const ConfirmSuccess = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="absolute top-0 left-0 m-5 size-20 sm:size-10">
        <img
          src="https://media.licdn.com/dms/image/v2/C4E0BAQGx-TFoWYNJcg/company-logo_200_200/company-logo_200_200/0/1659539191896?e=1733356800&v=beta&t=6Q59ItomXoSc2VXB7_RWGddV0P5FLE6FcCQPVCuJDIM"
          alt=""
          className="object-cover w-full h-full"
        />
      </div>
      <div className="flex flex-col items-center justify-center">
        <img src={success} alt="" />
        <h1 className="text-4xl font-[800] uppercase text-[#4192d3]">
          congratulations
        </h1>
        <p className="mt-2 text-gray-400">
          Confirm Successfully, wellcome to website
        </p>
        <Button
          onClick={() => navigate("/login")}
          className="px-5 py-2 mt-10 text-white bg-[#4192d3] rounded-md hover:bg-opacity-80 hover:shadow-lg"
          startIcon={
            <i
              className="text-green-500 fa fa-check-circle"
              aria-hidden="true"
            ></i>
          }
        >
          Login
        </Button>
      </div>
    </div>
  );
};

export default ConfirmSuccess;
