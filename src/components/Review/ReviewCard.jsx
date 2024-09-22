import React from "react";
import StartFillIcon from "../../icon/StartFillIcon";
import ConvertDate from "../../utils/ConvertDate";
import ConvertStringType from "../../utils/ConverStringType";

const ReviewCard = ({ reviewData }) => {
  const { content, name, rating, createdAt, options } = reviewData;

  const date = ConvertDate(createdAt);

  return (
    <div className="p-4 bg-[white] rounded-lg w-full">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-x-1">
          {[...Array(rating)].map((_, index) => (
            <StartFillIcon key={index} size="14" fill="#f9609a"></StartFillIcon>
          ))}
        </div>
        <span className="text-sm text-[#949494]">{date}</span>
      </div>
      <div className="mt-8">
        <p className="text-base font-bold">{name}</p>
        <p className="text-base">{content}</p>
      </div>
      <ul className="mt-5 text-sm font-semibold list-none">
        {options.map((item, index) => (
          <li
            key={index}
            className="flex justify-between py-3 border-b border-gray-200"
          >
            <span> {ConvertStringType(item.type)}</span>
            <span>{item.value ? "Yes" : "No"}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ReviewCard;
