import { Fragment, useEffect, useState } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import HeaderHome from "../components/headerHome";
import Footer from "../components/Footer";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentPath } from "../store/slice/routerSlice";
import { getUser } from "../store/slice/userSlice";

const MainLayout = () => {
  const location = useLocation();
  const [isShow, setIsShow] = useState(false);
  const { isAuthenticated, user: userData } = useSelector(
    (state) => state.user
  );

  const dispatch = useDispatch();
  const navigation = useNavigate();
  const { currentPath } = useSelector((state) => state.router);

  useEffect(() => {
    dispatch(setCurrentPath("/"));
    dispatch(getUser());
  }, []);

  useEffect(() => {
    console.log("user", userData);
    if (userData?.user?.roles.includes("ROLE_SELLER")) {
      navigation("/admin");
    }
  }, [dispatch, currentPath]);

  return (
    <div className="h-full">
      <HeaderHome></HeaderHome>

      <div className={location.pathname === "/" ? "bg-white" : "bg-bgGray"}>
        <div className="w-[80%] mx-auto">
          <Outlet context={{ isShow, setIsShow }}></Outlet>
        </div>
      </div>

      {isShow ? (
        <div
          className="fixed top-0 bottom-0 left-0 right-0 z-30 bg-black bg-opacity-25"
          onClick={() => setIsShow(!isShow)}
        ></div>
      ) : (
        ""
      )}

      <Footer></Footer>
    </div>
  );
};

export default MainLayout;
