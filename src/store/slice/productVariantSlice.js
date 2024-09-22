import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const productVariantSlice = createSlice({
  name: "productVariant",
  initialState: {
    variantOptions: [],
    variantValues: [],
    primaryVariant: null,
    variantImage: [],
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

    setVariantImage: (state, action) => {
      state.variantImage = action.payload;
    },

    uploadFileRequest: (state, action) => {
      state.variantImage = [];
      state.isLoading = true;
      state.error = null;
    },
    uploadFileSuccess: (state, action) => {
      state.variantImage = [...state.variantImage, action.payload];
      state.isLoading = false;
      state.error = null;
      state.message = "Upload file successfully";
    },
    uploadFileError: (state, action) => {
      state.variantImage = [];
      state.isLoading = false;
      state.error = action.payload;
    },

    clearAllErrors: (state, action) => {
      state.error = null;
      state.message = null;
    },
  },
});

export const uploadImage = (fileName) => async (dispatch) => {
  dispatch(productVariantSlice.actions.uploadFileRequest());

  try {
    const formData = new FormData();
    formData.append("file", fileName);

    const res = await axios.post(
      `https://neo4j-ecommerce.onrender.com/api/v1/files/upload?folder=products`,
      formData,
      { headers: { "Content-Type": "multipart/form-data" } }
    );

    dispatch(productVariantSlice.actions.uploadFileSuccess(res.data.data));
    dispatch(productVariantSlice.actions.clearAllErrors());
  } catch (e) {
    dispatch(
      productVariantSlice.actions.uploadFileError(e.responst.data.message)
    );
  }
};

export const { setVariantOptions, setVariantValues, setPrimaryVariant } =
  productVariantSlice.actions;

export default productVariantSlice.reducer;
