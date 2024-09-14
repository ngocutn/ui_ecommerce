import { Fragment } from "react";
import { Outlet, useLocation } from "react-router-dom";
import HeaderHome from "../components/headerHome";

const MainLayout = () => {
  const location = useLocation();

  return (
    <div className="h-full">
      <HeaderHome></HeaderHome>

      <div className={location.pathname === "/" ? "bg-white" : "bg-bgGray"}>
        <div className="w-[85%] mx-auto">
          <Outlet></Outlet>
        </div>
      </div>
    </div>
  );
};

export default MainLayout;
