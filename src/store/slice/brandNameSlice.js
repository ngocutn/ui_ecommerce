import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const BrandNameSlice = createSlice({
  name: "brandName",
  initialState: {
    brandName: [],
    isLoading: false,
    error: null,
    message: null,
  },
  reducers: {
    getAllRequest: (state, action) => {
      state.brandName = [];
      state.isLoading = true;
      state.error = null;
      state.message = null;
    },
    getAllSuccess: (state, action) => {
      state.brandName = action.payload;
      state.isLoading = false;
      state.error = null;
      state.message = "Get all brand names successfully";
    },
    getAllError: (state, action) => {
      state.brandName = [];
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

export const GetAllBrandName = () => async (dispatch) => {
  dispatch(BrandNameSlice.actions.getAllRequest());

  try {
    const res = await axios.get(
      "https://neo4j-ecommerce.onrender.com/api/v1/brands"
    );

    dispatch(BrandNameSlice.actions.getAllSuccess(res.data));
    dispatch(BrandNameSlice.actions.clearAllErrors());
  } catch (err) {
    dispatch(BrandNameSlice.actions.getAllError(err.response.data.message));
  }
};

export default BrandNameSlice.reducer;
