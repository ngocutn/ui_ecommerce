import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const productSlice = createSlice({
  name: "product",
  initialState: {
    product: {},
    message: null,
    error: null,
    isLoading: false,
  },
  reducers: {
    getProductRequest: (state, action) => {
      state.product = {};
      state.isLoading = true;
      state.error = null;
      state.message = null;
    },
    getProductSuccess: (state, action) => {
      state.product = action.payload;
      state.isLoading = false;
      state.error = null;
    },
    getProductError: (state, action) => {
      state.product = {};
      state.isLoading = false;
      state.error = action.payload;
      state.message = null;
    },

    //clear error
    clearAllErrors(state, action) {
      state.error = null;
    },
  },
});

//Get product
export const getProductById = (productId) => async (dispatch) => {
  dispatch(productSlice.actions.getProductRequest());

  try {
    const { data } = await axios.get(
      `https://neo4j-ecommerce.onrender.com/api/v1/products/${productId}`
    );
    dispatch(productSlice.actions.getProductSuccess(data));
    dispatch(productSlice.actions.clearAllErrors());
  } catch (error) {
    dispatch(
      productSlice.actions.getProductError(
        error.response?.data?.message || "Something went wrong"
      )
    );
  }
};

export default productSlice.reducer;
