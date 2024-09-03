import SideBar from "../components/sideBar";
import { useNavigate } from "react-router-dom";
import { Outlet } from "react-router-dom";
function MainProductPage() {
  const navigate = useNavigate();
  return (
    <div id="main-product" className="flex h-screen">
      <div className="w-1/5">
        <SideBar></SideBar>
      </div>
      <div className="w-4/5 pl-20 pr-8 py-4 flex-col gap-4">
        <div className="flex gap-5 items-center float-right">
          <i class="fa-regular fa-bell cursor-pointer"></i>
          <i class="fa-regular fa-circle-question cursor-pointer"></i>
          <button className="border-2 border-gray-200 rounded-lg p-2 font-semibold hover:bg-gray-200 hover:text-white">
            View Shop
          </button>
        </div>
        <Outlet></Outlet>
      </div>
    </div>
  );
}

export default MainProductPage;
