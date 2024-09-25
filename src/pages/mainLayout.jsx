import { Fragment, useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import HeaderHome from "../components/headerHome";

const MainLayout = () => {
  const location = useLocation();
  const [isShow, setIsShow] = useState(false);

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
    </div>
  );
};

export default MainLayout;
