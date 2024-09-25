import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const reviewSlice = createSlice({
  name: "reviews",
  initialState: {
    reviews: {},
    isLoading: false,
    error: null,
    message: null,
  },
  reducers: {
    getAllReviewRequest: (state, action) => {
      state.reviews = {};
      state.isLoading = true;
      state.error = null;
      state.message = null;
    },
    getAllReviewSuccess: (state, action) => {
      state.reviews = action.payload;
      state.isLoading = false;
      state.error = null;
      state.message = "Get all review successfully";
    },
    getAllReviewError: (state, action) => {
      state.reviews = {};
      state.isLoading = false;
      state.error = action.payload;
      state.message = null;
    },

    clearAllErrors: (state, action) => {
      state.error = null;
      state.message = null;
    },
  },
});

export const getAllReview =
  (productId, page = 0, sort = "ASC") =>
  async (dispatch) => {
    dispatch(reviewSlice.actions.getAllReviewRequest());

    try {
      const res = await axios.get(
        `https://neo4j-ecommerce.onrender.com/api/v1/products/${productId}/reviews?page=${page}&sortBy=updatedAt&sortOrder=${sort}`
      );

      dispatch(reviewSlice.actions.getAllReviewSuccess(res.data.data.result));
      dispatch(reviewSlice.actions.clearAllErrors());
    } catch (e) {
      dispatch(
        reviewSlice.actions.getAllReviewError(e.response?.data?.message)
      );
    }
  };

export const getAllReviewFilter =
  (productId, page = 0, rating) =>
  async (dispatch) => {
    dispatch(reviewSlice.actions.getAllReviewRequest());

    try {
      const res = await axios.get(
        `https://neo4j-ecommerce.onrender.com/api/v1/products/${productId}/reviews/filter?rating=${rating}&page=${page}`
      );

      dispatch(reviewSlice.actions.getAllReviewSuccess(res.data.data.result));
      dispatch(reviewSlice.actions.clearAllErrors());
    } catch (e) {
      dispatch(
        reviewSlice.actions.getAllReviewError(e.response?.data?.message)
      );
    }
  };

export default reviewSlice.reducer;
