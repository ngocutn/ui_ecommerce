import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "../node_modules/swiper/swiper-bundle.min.css";

import HomePage from "./pages/HomePage/homepage";
import AddProduct from "./pages/addProduct";
import ListProduct from "./pages/listProduct";
import MainProductPage from "./pages/mainProductPage";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <HomePage />,
    },
    {
      path: "mainpage",
      element: <MainProductPage />,
      children: [
        {
          index: true,
          element: <ListProduct />,
        },
        {
          path: "add-product",
          element: <AddProduct />,
        },
      ],
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
