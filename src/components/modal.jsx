import React from "react";
import { useNavigate } from "react-router-dom";

const ModalNotification = ({
  handleBtn,
  onCancel,
  lebelBtnLeft,
  lebelBtnRight,
  message,
}) => {
  return (
    <div className="fixed left-0 top-0 z-[2] flex h-full w-screen items-center justify-center overflow-hidden bg-black bg-opacity-30 shadow-custom">
      <div className="h-auto w-[35%] rounded-xl bg-white px-[10px] py-[25px] border-2 border-blue-600 ">
        <p className="text-center text-xl font-semibold leading-normal">
          {message}
        </p>
        <p className="text-center">{}</p>
        <div className="flex justify-center mt-5 gap-6">
          <button
            type="button"
            onClick={onCancel}
            className="border-2 border-gray-300 rounded-lg p-3 font-semibold hover:bg-gray-300 hover:text-white"
          >
            {lebelBtnLeft}
          </button>
          <button
            type="button"
            onClick={handleBtn}
            className="border-2 bg-blue-700 rounded-lg p-3 font-semibold hover:bg-gray-300 text-white"
          >
            {lebelBtnRight}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ModalNotification;
