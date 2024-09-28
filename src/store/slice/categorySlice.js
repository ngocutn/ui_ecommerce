import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const categorySlice = createSlice({
  name: "category",
  initialState: {
    categories: [],
    subCategories: [],
    variantOptional: [],
    specification: [],
    primaryVariantOptions: null,
    isLoading: false,
    error: null,
    message: null,
  },
  reducers: {
    getAllCategoriesRequest: (state, action) => {
      state.categories = [];
      state.isLoading = true;
      state.error = null;
    },
    getAllCategoriesSuccess: (state, action) => {
      state.categories = action.payload;
      state.isLoading = false;
      state.error = null;
    },
    getAllCategoriesError: (state, action) => {
      state.categories = [];
      state.isLoading = false;
      state.error = action.payload;
    },

    getAllSubCategoriesRequest: (state, action) => {
      state.subCategories = [];
      state.isLoading = true;
      state.error = null;
    },
    getAllSubCategoriesSuccess: (state, action) => {
      state.subCategories = action.payload;
      state.isLoading = false;
      state.error = null;
    },
    getAllSubCategoriesError: (state, action) => {
      state.subCategories = [];
      state.isLoading = false;
      state.error = action.payload;
    },

    setVariantOptions: (state, action) => {
      state.variantOptional = action.payload;
    },

    setPrimaryVariantOptions: (state, action) => {
      state.primaryVariantOptions = action.payload;
    },

    setSpecification: (state, action) => {
      state.specification = action.payload;
    },

    clearAllErrors: (state, action) => {
      state.error = null;
    },
  },
});

export const getAllCategories = () => async (dispatch) => {
  dispatch(categorySlice.actions.getAllCategoriesRequest());

  try {
    const res = await axios.get(
      "https://neo4j-ecommerce.onrender.com/api/v1/categories/level/1"
    );

    dispatch(categorySlice.actions.getAllCategoriesSuccess(res.data.data));
    dispatch(categorySlice.actions.clearAllErrors());
  } catch (e) {
    dispatch(
      categorySlice.actions.getAllCategoriesError(e.response?.data?.message)
    );
  }
};

export const getAllSubCategories = (categoryId) => async (dispatch) => {
  dispatch(categorySlice.actions.getAllSubCategoriesRequest());

  try {
    const res = await axios.get(
      `https://neo4j-ecommerce.onrender.com/api/v1/categories/parent?parentId=${categoryId}`
    );

    dispatch(categorySlice.actions.getAllSubCategoriesSuccess(res.data.data));
    dispatch(categorySlice.actions.clearAllErrors());
  } catch (e) {
    dispatch(
      categorySlice.actions.getAllSubCategoriesError(e.response?.data?.message)
    );
  }
};

export const { setVariantOptions, setPrimaryVariantOptions, setSpecification } =
  categorySlice.actions;
export default categorySlice.reducer;
