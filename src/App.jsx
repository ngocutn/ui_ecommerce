import {
  createBrowserRouter,
  RouterProvider,
  useLocation,
} from "react-router-dom";
import "../node_modules/swiper/swiper-bundle.min.css";

import HomePage from "./pages/HomePage/homepage";
import AddProduct from "./pages/addProduct";
import ListProduct from "./pages/listProduct";
import MainProductPage from "./pages/mainProductPage";
import MainLayout from "./pages/mainLayout";
import ProductDetails from "./pages/ProductDetail/ProductDetails";
import AddProductProvider from "./pages/AddProduct/AddProductProvider";
import BuyerLayout from "./pages/Auth/BuyerLayout";
import EmailConfirm from "./pages/Auth/EmailConfirm";
import ForgotPassword from "./pages/Auth/ForgotPassword";
import ResetPassword from "./pages/Auth/ResetPassword";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getUser } from "./store/slice/userSlice";
import SellerLayout from "./pages/Auth/seller/SellerLayout";
import ConfirmSuccess from "./pages/Auth/ConfirmSuccess";
import ConfirmFailure from "./pages/Auth/ConfirmFailure";

function App() {
  const token = localStorage.getItem("token");
  const dispatch = useDispatch();
  useEffect(() => {
    if (token) {
      dispatch(getUser(token));
    }
  }, [dispatch]);

  const router = createBrowserRouter([
    {
      path: "/admin",
      element: <MainProductPage />,
      children: [
        {
          index: true,
          element: <ListProduct />,
        },
        {
          path: "add-product",
          element: <AddProductProvider />,
        },
        {
          path: "new-product",
          element: <AddProduct />,
        },
      ],
    },
    {
      path: "/",
      element: <MainLayout />,
      children: [
        {
          index: true,
          element: <HomePage />,
        },
        {
          path: "/products/:id",
          element: <ProductDetails />,
        },
      ],
    },
    {
      path: "test",
      element: <AddProductProvider />,
    },
    {
      path: "/login",
      element: <BuyerLayout></BuyerLayout>,
    },
    {
      path: "/seller",
      element: <SellerLayout></SellerLayout>,
    },
    {
      path: "/confirm/:email",
      element: <EmailConfirm></EmailConfirm>,
    },
    {
      path: "/forgot",
      element: <ForgotPassword></ForgotPassword>,
    },
    {
      path: "/reset",
      element: <ResetPassword></ResetPassword>,
    },
    {
      path: "/confirm-success",
      element: <ConfirmSuccess></ConfirmSuccess>,
    },
    {
      path: "/confirm-failure",
      element: <ConfirmFailure></ConfirmFailure>,
    },
  ]);

  return (
    <>
      <RouterProvider router={router} />
      {/* <ListProduct /> */}
    </>
  );
}

export default App;
