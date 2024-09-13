import { Fragment } from "react";
import { Outlet } from "react-router-dom";
import HeaderHome from "../components/headerHome";

const MainLayout = () => {
  return (
    <div className="h-full">
      <HeaderHome></HeaderHome>
      <div className=" bg-bgGray">
        <div className="w-[85%] mx-auto">
          <Outlet></Outlet>
        </div>
      </div>
    </div>
  );
};

export default MainLayout;
