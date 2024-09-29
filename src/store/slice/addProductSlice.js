import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { API_URL } from "../../constants";

const addProductSlice = createSlice({
  name: "addProduct",
  initialState: {
    newProduct: {},
    productImages: [],
    isLoading: false,
    error: null,
    message: null,
    statusCode: null,
    errorUpload: null,
    messageUpload: null,
  },
  reducers: {
    addProductRequest: (state, action) => {
      state.product = {};
      state.isLoading = true;
      state.statusCode = action.payload;
    },
    addProductSuccess: (state, action) => {
      state.product = action.payload;
      state.isLoading = false;
      state.message = "Product added successfully";
    },
    addProductError: (state, action) => {
      state.isLoading = false;
      state.error = action.payload.message;
      state.statusCode = action.payload.statusCode;
    },

    uploadFileRequest: (state, action) => {
      state.isLoading = true;
      state.errorUpload = null;
    },
    uploadFileSuccess: (state, action) => {
      state.productImages = action.payload;
      state.isLoading = false;
      state.errorUpload = null;
      state.messageUpload = "Upload file successfully";
    },
    uploadFileError: (state, action) => {
      state.productImages = null;
      state.isLoading = false;
      state.errorUpload = action.payload;
    },

    setProductImages: (state, action) => {
      state.productImages = action.payload;
    },

    // addProductRequest: (state, action) => {
    //   state.product = {};
    //   state.isLoading = true;
    // },
    // addProductSuccess: (state, action) => {
    //   state.product = action.payload;
    //   state.isLoading = false;
    //   state.message = "Product added successfully";
    // },
    // addProductError: (state, action) => {
    //   state.product = {};
    //   state.isLoading = false;
    //   state.error = action.payload;
    // },

    clearAllErrors: (state, action) => {
      state.error = null;
      state.message = null;
    },
  },
});

export const addProduct = (productData) => async (dispatch) => {
  dispatch(addProductSlice.actions.addProductRequest());

  try {
    const token = localStorage.getItem("token");

    const { data } = await axios.post(`${API_URL}/products`, productData, {
      headers: { Authorization: "Bearer " + token },
      "Content-Type": "application/json",
    });

    dispatch(addProductSlice.actions.addProductSuccess(data.data));
  } catch (e) {
    dispatch(
      addProductSlice.actions.addProductError({
        message: e.response?.data?.message || "Something went wrong",
        statusCode: e.response?.status || 500, // Thêm status code vào payload, mặc định là 500 nếu không có
      })
    );
  }
};

export const uploadFile = (files) => async (dispatch) => {
  dispatch(addProductSlice.actions.uploadFileRequest());

  try {
    const token = localStorage.getItem("token");

    const uploadPromises = files.map(async (file) => {
      const formData = new FormData();
      formData.append("file", file);

      const { data } = await axios.post(
        `${API_URL}/files/upload?folder=products`,
        formData,
        {
          headers: {
            Authorization: `bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      return data.data;
    });

    const results = await Promise.all(uploadPromises);
    dispatch(addProductSlice.actions.uploadFileSuccess(results));
  } catch (e) {
    dispatch(
      addProductSlice.actions.uploadFileError(e.response?.data?.message)
    );
  }
};

export const { setCollectionData } = addProductSlice.actions;
export default addProductSlice.reducer;
