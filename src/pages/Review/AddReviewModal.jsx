import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProductById } from "../../store/slice/productSlice";
import { Button, Rating, TextField, Typography } from "@mui/material";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from "react-toastify";
import { addReview } from "../../store/slice/reviewSlice";
import { Link } from "react-router-dom";

const schema = yup.object({
  name: yup.string().required("Name is required"),
  email: yup
    .string()
    .email()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
  content: yup
    .string()
    .min(6, "Content must be at least 6 characters")
    .required("Content required"),
  title: yup
    .string()
    .min(6, "Title must be at least 6")
    .required("title is required"),
});

const AddReviewModal = ({ setOpen, open, productId }) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    resolver: yupResolver(schema),
    mode: "onChange",
  });
  const [value, setValue] = useState(0);
  const [recommendation, setRecommendation] = useState("");
  const [delivery, setDelivery] = useState("");
  const [token, setToken] = useState("");

  const dispatch = useDispatch();
  const { product: productData } = useSelector((state) => state.product);

  const { error, message, reviews } = useSelector((state) => state.reviews);

  useEffect(() => {
    if (productId) {
      dispatch(getProductById(productId));
    }
    const token = localStorage.getItem("token");
    setToken(token);
  }, []);

  useEffect(() => {
    if (error) {
      console.log(error);
    }

    if (message) {
      toast.success(message);
      setOpen(false);
    }
  }, [error, message]);

  const { data } = productData;

  const handleClick = (value) => {
    setRecommendation(value); // Lấy giá trị đã click và lưu vào state
    console.log("Selected:", value);
  };

  const handleClickDelivery = (value) => {
    setDelivery(value); // Lấy giá trị đã click và lưu vào state
    console.log("Selected:", value);
  };

  const onSubmit = (data) => {
    const form = {
      content: data.content,
      rating: value,
      name: data.name,
      email: data.email,
      title: data.title,
      options: [
        {
          type: "RECOMMENDED",
          value: recommendation,
        },
        {
          type: "DELIVERY",
          value: delivery,
        },
      ],
    };

    console.log(form);

    dispatch(addReview(productId, form, token));
  };

  return (
    <div
      className={`bg-[#f6f6f6] fixed p-5 rounded-lg overflow-hidden top-0 right-0 z-40 mr-5 sm:w-[90%] h-auto max-h-[90vh] overflow-y-scroll my-8 ${
        open ? "animate-slideInRight" : "animate-slideOut"
      } w-[35%]`}
    >
      <div className="flex p-3 bg-white rounded-md gap-x-3">
        <div className="size-20">
          <img src={data?.images[0]} alt="" />
        </div>
        <div>
          <h1 className="font-semibold">{data?.name}</h1>
          <p className="text-[12px] font-semibold text-gray-400">
            {data?.brandName}
          </p>
          <div className="flex gap-x-3">
            <span className={`${data?.discountedPrice ? "line-through" : ""}`}>
              ${data?.sellingPrice}
            </span>
            <span>-</span>
            {data?.discountedPrice && (
              <span className="font-semibold">${data?.discountedPrice}</span>
            )}
          </div>
        </div>
      </div>
      {token ? (
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col mt-10 gap-y-8"
        >
          <TextField
            {...register("name")}
            error={!!errors.name}
            helperText={errors.name?.message}
            required
            id="outlined-required"
            label="Name"
            defaultValue=""
          />
          <TextField
            {...register("email")}
            error={!!errors.email}
            helperText={errors.email?.message}
            required
            id="outlined-required"
            label="Email"
            defaultValue=""
          />

          <div>
            <Typography>Score</Typography>
            <Rating
              name="simple-controlled"
              value={value}
              onChange={(event, newValue) => {
                setValue(newValue);
              }}
            />
          </div>

          <TextField
            {...register("title")}
            error={!!errors.title}
            helperText={errors.title?.message}
            required
            id="outlined-required"
            label="Title"
            defaultValue=""
          />

          <TextField
            {...register("content")}
            error={!!errors.content}
            helperText={errors.content?.message}
            id="outlined-multiline-static"
            label="Review"
            multiline
            rows={4}
          />

          <div>
            <h1 className="font-semibold">Recommended</h1>
            <div className="flex mt-3 gap-x-4">
              <div
                className={`px-4 py-2 inline-block transition-all rounded-lg cursor-pointer hover:shadow-md ${
                  recommendation === "Yes"
                    ? "bg-blue-500 text-white font-bold"
                    : "bg-white"
                } select-none`}
                onClick={() => handleClick("Yes")}
              >
                Yes
              </div>
              <div
                className={`px-4 py-2 inline-block transition-all rounded-lg cursor-pointer hover:shadow-md ${
                  recommendation === "No"
                    ? "bg-blue-500 text-white font-bold"
                    : "bg-white"
                } select-none`}
                onClick={() => handleClick("No")}
              >
                No
              </div>
            </div>
          </div>

          <div>
            <h1 className="font-semibold">
              This your order arrive within the time mentioned?
            </h1>
            <div className="flex mt-3 gap-x-4">
              <div
                className={`px-4 py-2 inline-block transition-all rounded-lg cursor-pointer hover:shadow-md ${
                  delivery === "Yes"
                    ? "bg-blue-500 text-white font-bold"
                    : "bg-white"
                } select-none`}
                onClick={() => handleClickDelivery("Yes")}
              >
                Yes
              </div>
              <div
                className={`px-4 py-2 inline-block transition-all rounded-lg cursor-pointer hover:shadow-md ${
                  delivery === "No"
                    ? "bg-blue-500 text-white font-bold"
                    : "bg-white"
                } select-none`}
                onClick={() => handleClickDelivery("No")}
              >
                No
              </div>
            </div>
          </div>
          <div className="grid grid-cols-2 grid-rows-1 gap-3">
            <Button className="bg-[#4192d3] text-white" type="submit">
              Submit
            </Button>
            <Button
              variant="outlined"
              className="text-black border-2 border-gray-300"
              onClick={() => setOpen(false)}
            >
              Cancel
            </Button>
          </div>
        </form>
      ) : (
        <div className="flex flex-col items-center justify-center mt-12">
          <h1 className="text-center">
            Please login before add review for this product!
          </h1>
          <Link
            to={"/login"}
            className="w-full py-2 mt-5 text-center text-white bg-blue-500 rounded-md"
          >
            Login
          </Link>
        </div>
      )}
    </div>
  );
};

export default AddReviewModal;
