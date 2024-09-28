import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const productVariantSlice = createSlice({
  name: "productVariant",
  initialState: {
    variantOptions: [],
    variantValues: [],
    primaryVariant: null,
    variantImages: [],
    productVariants: [],
    variantImageUrl: null,
    isLoading: false,
    error: null,
    message: null,
  },
  reducers: {
    setVariantOptions: (state, action) => {
      state.variantOptions = action.payload;
    },

    setVariantValues: (state, action) => {
      state.variantValues = action.payload;
    },

    setPrimaryVariant: (state, action) => {
      state.primaryVariant = action.payload;
    },

    setVariantImages: (state, action) => {
      state.variantImages = Array.isArray(action.payload)
        ? [...action.payload]
        : [];
    },

    setProductVariants: (state, action) => {
      state.productVariants = [...action.payload];
    },

    // uploadFileRequest: (state, action) => {
    //   state.isLoading = true;
    //   state.error = null;
    // },
    // uploadFileSuccess: (state, action) => {
    //   state.variantImageUrl = action.payload;
    //   state.isLoading = false;
    //   state.error = null;
    //   state.message = "Upload file successfully";
    // },
    // uploadFileError: (state, action) => {
    //   state.variantImageUrl = null;
    //   state.isLoading = false;
    //   state.error = action.payload;
    // },

    uploadFileRequest: (state, action) => {
      state.isLoading = true;
      state.error = null;
    },
    uploadFileSuccess: (state, action) => {
      state.variantImages = action.payload;
      state.isLoading = false;
      state.error = null;
      state.message = "Upload file successfully";
    },
    uploadFileError: (state, action) => {
      state.variantImages = null;
      state.isLoading = false;
      state.error = action.payload;
    },

    clearAllErrors: (state, action) => {
      state.error = null;
      state.message = null;
    },
  },
});

export const uploadImage = (file) => async (dispatch) => {
  dispatch(productVariantSlice.actions.uploadFileRequest());

  try {
    const formData = new FormData();
    formData.append("file", file);

    const res = await axios.post(
      `https://neo4j-ecommerce.onrender.com/api/v1/files/upload?folder=products`,
      formData,
      { headers: { "Content-Type": "multipart/form-data" } }
    );

    dispatch(productVariantSlice.actions.uploadFileSuccess(res.data.data));
    dispatch(productVariantSlice.actions.clearAllErrors());
  } catch (e) {
    dispatch(
      productVariantSlice.actions.uploadFileError(e.response?.data?.message)
    );
  }
};

export const uploadFile = (files) => async (dispatch) => {
  dispatch(productVariantSlice.actions.uploadFileRequest());

  try {
    const token = localStorage.getItem("token");

    const uploadPromises = files.map(async (file) => {
      const formData = new FormData();
      formData.append("file", file.images);

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
    dispatch(productVariantSlice.actions.uploadFileSuccess(results));
  } catch (e) {
    dispatch(
      productVariantSlice.actions.uploadFileError(e.response?.data?.message)
    );
  }
};

export const {
  setVariantOptions,
  setVariantValues,
  setPrimaryVariant,
  setVariantImages,
  setProductVariants,
} = productVariantSlice.actions;

export default productVariantSlice.reducer;
