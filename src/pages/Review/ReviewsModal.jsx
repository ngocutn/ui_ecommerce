import { X } from "lucide-react";
import React, { useState } from "react";
import StartFillIcon from "../../icon/StartFillIcon";
import CustomizedSelects from "../../components/Select";
import ReviewCard from "../../components/Review/ReviewCard";
import { Button } from "@mui/material";

const ReviewsModal = ({ setIsShow, isShow }) => {
  const [rating, setRating] = useState(0);
  const [sort, setSort] = useState("desc");

  return (
    <div
      className={`bg-[#efeeeb] fixed p-5 rounded-lg overflow-hidden top-0 right-0 z-20 mr-5 w-1/3 h-auto my-8 ${
        isShow ? "animate-slideInRight" : "animate-slideOut"
      }`}
    >
      <div className="flex items-center justify-between font-bold">
        <span className="text-base">Reviews (92)</span>
        <X onClick={() => setIsShow(!isShow)} className="cursor-pointer" />
      </div>
      <div className="flex items-center justify-between px-4 py-2 mt-5 bg-white rounded-lg">
        <span className="text-base font-bold">Overall rating</span>
        <div className="flex items-center gap-x-2">
          <span className="text-lg font-semibold">4.9</span>
          <StartFillIcon fill={"#f9619b"}></StartFillIcon>
        </div>
      </div>

      <div className="flex items-center w-full mt-5 gap-x-4">
        <CustomizedSelects Value={rating} setValue={setRating} valueType={0}>
          <option aria-label="Read All" value="read all">
            Read all
          </option>
          <option value={1}>1 star</option>
          <option value={2}>2 star</option>
          <option value={3}>3 star</option>
          <option value={4}>4 star</option>
          <option value={5}>5 star</option>
        </CustomizedSelects>
        <CustomizedSelects Value={sort} setValue={setSort} valueType={"desc"}>
          <option value={"desc"}>Day desc</option>
          <option value={"asc"}>Day asc</option>
        </CustomizedSelects>
      </div>
      <div className="h-full max-h-[400px] overflow-scroll scroll-smooth overflow-x-auto over mt-5">
        <ReviewCard></ReviewCard>
        <ReviewCard></ReviewCard>
        <ReviewCard></ReviewCard>
      </div>

      <Button className="w-full py-3 mt-5 text-[12px] font-semibold text-white bg-black">
        Write a review
      </Button>
    </div>
  );
};

export default ReviewsModal;
