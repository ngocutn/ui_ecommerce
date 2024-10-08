import { configureStore } from "@reduxjs/toolkit";
import productReducer from "./slice/productSlice";
import reviewReducer from "./slice/reviewSlice";
import categoryReducer from "./slice/categorySlice";
import productVariantReducer from "./slice/productVariantSlice";
import brandNameReducer from "./slice/brandNameSlice";
import collectionReducer from "./slice/collectionSlice";
import userReducer from "./slice/userSlice";
import addProductReducer from "./slice/addProductSlice";
import routerReducer from "./slice/routerSlice";

export const store = configureStore({
  reducer: {
    product: productReducer,
    reviews: reviewReducer,
    category: categoryReducer,
    productVariant: productVariantReducer,
    brandName: brandNameReducer,
    productCollection: collectionReducer,
    user: userReducer,
    addProduct: addProductReducer,
    router: routerReducer,
  },
});
