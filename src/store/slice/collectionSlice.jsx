import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { API_URL } from "../../constants";

const collectionSlice = createSlice({
  name: "collection",
  initialState: {
    collections: [],
    collectionData: [],
    error: null,
    message: null,
    isLoading: false,
  },
  reducers: {
    getAllCollectionRequest: (state, action) => {
      (state.collections = []),
        (state.isLoading = true),
        (state.error = null),
        (state.message = null);
    },
    getAllCollectionSuccess: (state, action) => {
      (state.collections = action.payload),
        (state.isLoading = false),
        (state.error = null),
        (state.message = "get collection successfully");
    },
    getAllCollectionError: (state, action) => {
      (state.collections = []),
        (state.isLoading = false),
        (state.error = action.payload),
        (state.message = null);
    },

    setCollectionData: (state, action) => {
      state.collectionData = action.payload;
    },

    clearAllError: (state, action) => {
      (state.error = null), (state.message = null);
    },
  },
});

export const getAllCollection = () => async (dispatch) => {
  dispatch(collectionSlice.actions.getAllCollectionRequest());

  try {
    // const res = await axios.get(`${API_URL}/categories/featured/products`);
    const res = await axios.get(
      `${API_URL}/categories/featured?isFeatured=true`
    );

    dispatch(collectionSlice.actions.getAllCollectionSuccess(res.data.data));
    dispatch(collectionSlice.actions.clearAllError());
  } catch (e) {
    dispatch(
      collectionSlice.actions.getAllCollectionError(e.response.data.message)
    );
  }
};

export const { setCollectionData } = collectionSlice.actions;

export default collectionSlice.reducer;
