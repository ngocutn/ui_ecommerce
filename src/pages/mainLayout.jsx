import { Fragment } from "react";
import { Outlet } from "react-router-dom";
import HeaderHome from "../components/headerHome";

const MainLayout = () => {
  return (
    <Fragment>
      <HeaderHome></HeaderHome>
      <div className="w-[80%] mx-auto">
        <Outlet></Outlet>
      </div>
    </Fragment>
  );
};

export default MainLayout;
