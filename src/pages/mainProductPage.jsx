import SideBar from "../components/sideBar";
import { Outlet } from "react-router-dom";
function MainProductPage() {
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
    </div>
  );
}

export default MainProductPage;
