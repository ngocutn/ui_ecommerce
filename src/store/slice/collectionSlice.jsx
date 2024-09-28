import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const collectionSlice = createSlice({
  name: "collection",
  initialState: {
    collections: [],
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

    clearAllError: (state, action) => {
      (state.error = null), (state.message = null);
    },
  },
});

export const getAllCollection = () => async (dispatch) => {
  dispatch(collectionSlice.actions.getAllCollectionRequest());

  try {
    const res = await axios.get(
      `https://neo4j-ecommerce.onrender.com/api/v1/categories/featured?isFeatured=true`
    );

    dispatch(collectionSlice.actions.getAllCollectionSuccess(res.data.data));
    dispatch(collectionSlice.actions.clearAllError());
  } catch (e) {
    dispatch(
      collectionSlice.actions.getAllCollectionError(e.response.data.message)
    );
  }
};

export default collectionSlice.reducer;
