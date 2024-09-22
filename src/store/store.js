import { configureStore } from "@reduxjs/toolkit";
import productReducer from "./slice/productSlice";
import reviewReducer from "./slice/reviewSlice";

export const store = configureStore({
  reducer: {
    product: productReducer,
    reviews: reviewReducer,
  },
});
