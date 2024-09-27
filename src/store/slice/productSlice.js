import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const productSlice = createSlice({
  name: "product",
  initialState: {
    product: {},
    productCategory: [],
    popularProduct: [],
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

    getAllProductByCategoryRequest: (state, action) => {
      state.productCategory = [];
      state.isLoading = true;
      state.error = null;
    },
    getAllProductByCategorySuccess: (state, action) => {
      state.productCategory = action.payload;
      state.isLoading = false;
      state.error = null;
      state.message = "Get all product by category successfully";
    },
    getAllProductByCategoryError: (state, action) => {
      state.productCategory = [];
      state.isLoading = false;
      state.error = action.payload;
      state.message = null;
    },

    getPopularProductRequest: (state, action) => {
      state.popularProduct = [];
      state.isLoading = true;
      state.error = null;
      state.message = null;
    },
    getPopularProductSuccess: (state, action) => {
      state.popularProduct = action.payload;
      state.isLoading = false;
      state.error = null;
      state.message = "Get popular product successfully";
    },
    getPopularProductError: (state, action) => {
      state.popularProduct = [];
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

//Get all product by category
export const getProductByCategory = (cateId, productId) => async (dispatch) => {
  dispatch(productSlice.actions.getAllProductByCategoryRequest());

  try {
    const res = await axios.get(
      `https://neo4j-ecommerce.onrender.com/api/v1/categories/${cateId}/products?productId=${productId}`
    );

    dispatch(
      productSlice.actions.getAllProductByCategorySuccess(res.data.data)
    );
    dispatch(productSlice.actions.clearAllErrors());
  } catch (e) {
    dispatch(
      productSlice.actions.getAllProductByCategoryError(
        e.response?.data?.message || "Something went wrong"
      )
    );
  }
};

//get popular product
export const getPopularProduct = () => async (dispatch) => {
  dispatch(productSlice.actions.getPopularProductRequest());

  try {
    const res = await axios.get(
      `https://neo4j-ecommerce.onrender.com/api/v1/products/top-selling?page=0&size=20`
    );

    dispatch(
      productSlice.actions.getPopularProductSuccess(res.data.data.result)
    );
    dispatch(productSlice.actions.clearAllErrors());
  } catch (e) {
    dispatch(
      productSlice.actions.getPopularProductError(
        e.response?.data?.message || "Something went wrong"
      )
    );
  }
};

export default productSlice.reducer;
