import React from "react";
import StartFillIcon from "../../icon/StartFillIcon";

const ReviewCard = () => {
  return (
    <div className="p-4 bg-[white] rounded-lg mt-5">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-x-1">
          <StartFillIcon size="14"></StartFillIcon>
          <StartFillIcon size="14"></StartFillIcon>
          <StartFillIcon size="14"></StartFillIcon>
          <StartFillIcon size="14"></StartFillIcon>
          <StartFillIcon size="14"></StartFillIcon>
        </div>
        <span className="text-sm text-[#949494]">Jul 25, 2024</span>
      </div>
      <div className="mt-8">
        <p className="text-base font-bold">Sinead</p>
        <p className="text-base">
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Earum,
          adipisci.
        </p>
      </div>
      <ul className="mt-5 text-sm font-semibold list-none">
        <li className="flex justify-between py-3 border-b border-gray-200">
          <span>Recommend</span>
          <span>10 - I'll recommend to everyone!</span>
        </li>
        <li className="flex justify-between py-3 border-b border-gray-200">
          <span>Fitting</span>
          <span>True to size</span>
        </li>
        <li className="flex justify-between py-3 border-b border-gray-200">
          <span>Shipping</span>
          <span>Yes</span>
        </li>
      </ul>
    </div>
  );
};

export default ReviewCard;
