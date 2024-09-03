import React from "react";
import { useNavigate } from "react-router-dom";

const PopUp = ({ title, rightButton, onDiscard, onCancel }) => {
  return (
    <div className="fixed left-0 top-0 z-[2] flex h-full w-screen items-center justify-center overflow-hidden bg-black bg-opacity-30 shadow-custom">
      <div className="h-auto w-[35%] rounded-xl bg-white px-[10px] py-[25px] border-2 border-blue-400">
        <p className="text-center text-xl font-semibold leading-normal">
          {title}
        </p>
        <div className="flex justify-center mt-5 gap-6">
          <button
            type="button"
            onClick={onCancel}
            className="border-2 rounded-lg p-3 font-semibold hover:bg-gray-300 hover:text-white"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={onDiscard}
            className="border-2 bg-blue-500 rounded-lg p-3 font-semibold hover:bg-gray-300 text-white"
          >
            {rightButton}
          </button>
        </div>
      </div>
    </div>
  );
};

export default PopUp;
