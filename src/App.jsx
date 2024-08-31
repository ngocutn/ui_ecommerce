import { createBrowserRouter, RouterProvider } from "react-router-dom";

import MainPage from "./pages/mainPage";
import AddProduct from "./pages/addProduct";
import ListProduct from "./pages/listProduct";
import MainProductPage from "./pages/mainProductPage";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
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
    // {
    //   path: "mainpage",
    //   element: <MainPage />,
    // },
    // {
    //   path: "add-product",
    //   element: <AddProduct />,
    // },
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
