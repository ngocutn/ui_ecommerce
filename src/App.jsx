import { createBrowserRouter, RouterProvider } from "react-router-dom";
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
import { ToastContainer } from "react-toastify";

function App() {
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
      path: "/buyer",
      element: <BuyerLayout></BuyerLayout>,
    },
    {
      path: "/confirm",
      element: <EmailConfirm></EmailConfirm>,
    },
  ]);
  return (
    <>
      {/* <MainPage /> */}
      <RouterProvider router={router} />
      {/* <ListProduct /> */}
    </>
  );
}

export default App;
