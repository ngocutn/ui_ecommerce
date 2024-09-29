import { toast, ToastContainer } from "react-toastify";
import SideBar from "../components/sideBar";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { clearAllErrors } from "../store/slice/addProductSlice";
import { setCurrentPath } from "../store/slice/routerSlice";
function MainProductPage() {
  const { productImages, statusCode, error, message, isLoading } = useSelector(
    (state) => state.addProduct
  );

  const { user } = useSelector((state) => state.user);

  const dispatch = useDispatch();
  const navigation = useNavigate();
  const pathName = useLocation();

  console.log("pathName", pathName);

  useEffect(() => {
    if (error) {
      console.log("error", error);
    }

    if (dispatch) {
      toast.success(message);
    }

    if (statusCode === 409) {
      toast.error("Product with the same name already exists");
      console.log(statusCode, message);
    }

    dispatch(clearAllErrors());
  }, [message, error]);

  // useEffect(() => {
  //   console.log(user.user);
  //   if (user) {
  //     const isUser = user?.user?.roles.includes("ROLE_SELLER");
  //     console.log("isUser", isUser);
  //     console.log("isUser", user);
  //   }
  // }, []);

  useEffect(() => {
    if (!user?.user?.roles.includes("ROLE_SELLER")) {
      navigation("/");
    }

    dispatch(setCurrentPath(pathName.pathname));
  }, [dispatch, pathName]);

  return (
    <div id="main-product" className="flex h-screen">
      <div className="w-1/5">
        <SideBar></SideBar>
      </div>
      <div className="flex-col w-4/5 gap-4 px-10 py-4">
        <div className="flex items-center float-right gap-5">
          <i className="cursor-pointer fa-regular fa-bell"></i>
          <i className="cursor-pointer fa-regular fa-circle-question"></i>
          <button className="p-2 font-semibold border-2 border-gray-200 rounded-lg hover:bg-gray-200 hover:text-white">
            View Shop
          </button>
        </div>
        <Outlet></Outlet>
      </div>
      <ToastContainer></ToastContainer>
    </div>
  );
}

export default MainProductPage;
