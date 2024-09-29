import { X } from "lucide-react";
import React, { useEffect, useState } from "react";
import StartFillIcon from "../../icon/StartFillIcon";
import CustomizedSelects from "../../components/Select";
import ReviewCard from "../../components/Review/ReviewCard";
import { Button } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllReview,
  getAllReviewFilter,
} from "../../store/slice/reviewSlice";
import Loading from "../../components/Loading";
import AddReviewModal from "./AddReviewModal";

const ReviewsModal = ({ setIsShow, isShow, productId }) => {
  const [rating, setRating] = useState(0);
  const [sort, setSort] = useState("ASC");
  const [page, setPage] = useState(0);
  const [open, setOpen] = useState(false);

  const dispatch = useDispatch();
  const {
    isLoading,
    error,
    reviews: reviewData,
  } = useSelector((state) => state.reviews);

  useEffect(() => {
    if (isShow && productId) {
      if (rating == 0) {
        dispatch(getAllReview(productId, page, sort));
      } else {
        dispatch(getAllReviewFilter(productId, page, rating));
      }
    }
  }, [isShow, productId, page, sort, rating]);

  const handleOpenModal = () => {
    setOpen(true);
    // setIsShow(false);
  };

  const { avgRating, countOfReviews } = reviewData;
  const avgRatingFormatted = Math.round(avgRating * 10) / 10;

  return (
    <div
      className={`bg-[#f6f6f6] fixed p-5 rounded-lg overflow-hidden top-0 right-0 z-40 mr-5 sm:w-[90%] h-auto max-h-[90vh] overflow-y-scroll my-8 ${
        isShow ? "animate-slideInRight" : "animate-slideOut"
      } tb:w-[90%]`}
    >
      <div className="flex items-center justify-between font-bold">
        <span className="text-base">Reviews ({countOfReviews})</span>
        <X onClick={() => setIsShow(!isShow)} className="cursor-pointer" />
      </div>
      <div className="flex items-center justify-between px-4 py-2 mt-5 bg-white rounded-lg">
        <span className="text-base font-bold">Overall rating</span>
        <div className="flex items-center gap-x-2">
          <span className="text-lg font-semibold">{avgRatingFormatted}</span>
          <StartFillIcon fill={"#f9619b"}></StartFillIcon>
        </div>
      </div>

      <div className="flex items-center w-full mt-5 gap-x-4">
        <CustomizedSelects Value={rating} setValue={setRating} valueType={0}>
          <option aria-label="Read All" value={0}>
            Read all
          </option>
          <option value={1}>1 star</option>
          <option value={2}>2 star</option>
          <option value={3}>3 star</option>
          <option value={4}>4 star</option>
          <option value={5}>5 star</option>
        </CustomizedSelects>
        <CustomizedSelects Value={sort} setValue={setSort} valueType={"desc"}>
          <option value={"ASC"}>Day asc</option>
          <option value={"DESC"}>Day desc</option>
        </CustomizedSelects>
      </div>
      <div className="mt-5 min-w-[500px] sm:w-[90%] w-full flex flex-col items-center justify-center gap-y-5">
        {isLoading ? (
          <Loading color="#000"></Loading>
        ) : reviewData.reviews ? (
          reviewData.reviews.map((review) => (
            <ReviewCard key={review.id} reviewData={review}></ReviewCard>
          ))
        ) : (
          <p>No reviews</p>
        )}

        {!isLoading &&
          reviewData.reviews &&
          reviewData.reviews.length >= 20 && (
            <p
              className="mt-5 cursor-pointer hover:underline"
              onClick={() => setPage((prevPage) => prevPage + 1)}
            >
              See more
            </p>
          )}
      </div>

      <Button
        className="w-full py-3 mt-5 text-[12px] font-semibold text-white bg-black rounded-lg"
        onClick={handleOpenModal}
      >
        Write a review
      </Button>
      {open && (
        <AddReviewModal
          setOpen={setOpen}
          open={open}
          productId={productId}
        ></AddReviewModal>
      )}
    </div>
  );
};

export default ReviewsModal;
