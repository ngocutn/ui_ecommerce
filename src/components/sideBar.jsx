import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { clearUserInfor, setIsAuthenticated } from "../store/slice/userSlice";

function SideBar() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [subMenuOpen, setSubMenuOpen] = useState({
    page: false,
    myshop: false,
    business: false,
    settings: false,
  });

  const [selectedOption, setSelectedOption] = useState("");

  const toggleSubMenu = (menu) => {
    setSubMenuOpen((prev) => {
      const allClosed = Object.keys(prev).reduce((acc, key) => {
        acc[key] = false;
        return acc;
      }, {});
      return { ...allClosed, [menu]: !prev[menu] };
    });
  };

  const handleOptionClick = (option) => {
    setSelectedOption(option);
  };

  const handleLogout = () => {
    const token = localStorage.getItem("token");

    if (token) {
      localStorage.removeItem("token");
      dispatch(clearUserInfor());
      dispatch(setIsAuthenticated(false));
      navigate("/");
    } else {
      navigate("/");
    }
  };

  return (
    <div className="sidebar flex-1 sm:w-1/5 fixed border-r border-[#d3d4d6] h-full left-0 pl-[1.5rem] pr-[1.5rem] flex flex-col gap-[1.5rem]">
      <div
        className="flex items-center text-4xl font-black text-blue-600 cursor-pointer logo"
        onClick={() => navigate("/")}
      >
        <img
          className="w-[5rem] h-[5rem] md:w-[5rem] md:h-[5rem]"
          src="https://media.licdn.com/dms/image/v2/C4E0BAQGx-TFoWYNJcg/company-logo_200_200/company-logo_200_200/0/1659539191896?e=1733356800&v=beta&t=6Q59ItomXoSc2VXB7_RWGddV0P5FLE6FcCQPVCuJDIM"
          alt=""
        />
        ccessed
      </div>
      <div className="searchbar border rounded-lg px-[1rem] py-[.8rem]  flex flex-nowrap items-center">
        <i class="fa-solid fa-magnifying-glass pr-[.5rem] text-l"></i>
        <input type="text" className="outline-none" placeholder="Search" />
      </div>

      <nav className="flex flex-col gap-[1rem]">
        <div className="searchbar_item text-gray-500 font-medium text-[17px]">
          <button
            onClick={() => toggleSubMenu("page")}
            className={`flex imt justify-between w-full px-2 py-2 ${
              subMenuOpen.page ? "text-black" : "text-gray-500"
            } hover:shadow-md focus:outline-none`}
          >
            <span>
              <i
                class={`fa-solid fa-house-user mr-2 ${
                  subMenuOpen.page ? "text-blue-600" : "text-gray-500"
                }`}
              ></i>
              Page manager
            </span>
            <i
              className={`fas fa-angle-down transform ${
                subMenuOpen.page ? "rotate-180" : ""
              } transition-transform duration-300`}
            ></i>
          </button>
          {subMenuOpen.page && (
            <div
              className={`sub-menu pl-12 flex flex-col gap-[0.75rem] mt-[1rem]`}
            >
              <a
                href="add-product"
                className={`block py-2 hover:shadow-md ${
                  selectedOption === "Products"
                    ? "text-blue-600"
                    : "text-gray-500"
                }`}
                onClick={() => handleOptionClick("Products")}
              >
                Products
              </a>
              <a
                href="#"
                className={`block py-2 hover:shadow-md ${
                  selectedOption === "Order" ? "text-blue-600" : "text-gray-500"
                }`}
                onClick={() => handleOptionClick("Order")}
              >
                Order
              </a>
              <a
                href="#"
                className={`block py-2 hover:shadow-md ${
                  selectedOption === "Customers"
                    ? "text-blue-600"
                    : "text-gray-500"
                }`}
                onClick={() => handleOptionClick("Customers")}
              >
                Customers
              </a>
            </div>
          )}
        </div>
        <div className="searchbar_item text-gray-500 font-medium text-[17px]">
          <button
            onClick={() => toggleSubMenu("myshop")}
            className={`flex imt justify-between w-full px-2 py-2 ${
              subMenuOpen.myshop ? "text-black" : "text-gray-500"
            } hover:shadow-md focus:outline-none`}
          >
            <span>
              <i
                class={`fa-solid fa-store mr-2 ${
                  subMenuOpen.myshop ? "text-blue-600" : "text-gray-500"
                }`}
              ></i>
              My shop
            </span>
            <i
              className={`fas fa-angle-down transform ${
                subMenuOpen.myshop ? "rotate-180" : ""
              } transition-transform duration-300`}
            ></i>
          </button>
          {subMenuOpen.myshop && (
            <div
              className={`sub-menu pl-12 flex flex-col gap-[0.75rem] mt-[1rem]`}
            >
              <a
                href="#"
                className={`block py-2 hover:shadow-md ${
                  selectedOption === "Shop" ? "text-blue-600" : "text-gray-500"
                }`}
                onClick={() => handleOptionClick("Shop")}
              >
                Shop
              </a>
              <a
                href="#"
                className={`block py-2 hover:shadow-md ${
                  selectedOption === "Order" ? "text-blue-600" : "text-gray-500"
                }`}
                onClick={() => handleOptionClick("Order")}
              >
                Order
              </a>
              <a
                href="#"
                className={`block py-2 hover:shadow-md ${
                  selectedOption === "Customers"
                    ? "text-blue-600"
                    : "text-gray-500"
                }`}
                onClick={() => handleOptionClick("Customers")}
              >
                Customers
              </a>
            </div>
          )}
        </div>
        <div className="searchbar_item text-gray-500 font-medium text-[17px]">
          <button
            onClick={() => toggleSubMenu("business")}
            className={`flex imt justify-between w-full px-2 py-2 ${
              subMenuOpen.business ? "text-black" : "text-gray-500"
            } hover:shadow-md focus:outline-none`}
          >
            <span>
              <i
                class={`fa-solid fa-chart-simple mr-2 ${
                  subMenuOpen.business ? "text-blue-600" : "text-gray-500"
                }`}
              ></i>
              Business analytics
            </span>
            <i
              className={`fas fa-angle-down transform ${
                subMenuOpen.business ? "rotate-180" : ""
              } transition-transform duration-300`}
            ></i>
          </button>
          {subMenuOpen.business && (
            <div
              className={`sub-menu pl-12 flex flex-col gap-[0.75rem] mt-[1rem]`}
            >
              <a
                href="#"
                className={`block py-2 hover:shadow-md ${
                  selectedOption === "Stats" ? "text-blue-600" : "text-gray-500"
                }`}
                onClick={() => handleOptionClick("Stats")}
              >
                Stats
              </a>
              <a
                href="#"
                className={`block py-2 hover:shadow-md ${
                  selectedOption === "Insights"
                    ? "text-blue-600"
                    : "text-gray-500"
                }`}
                onClick={() => handleOptionClick("Insights")}
              >
                Insights
              </a>
              <a
                href="#"
                className={`block py-2 hover:shadow-md ${
                  selectedOption === "Dashboards"
                    ? "text-blue-600"
                    : "text-gray-500"
                }`}
                onClick={() => handleOptionClick("Dashboards")}
              >
                Dashboards
              </a>
            </div>
          )}
        </div>
        <div className="searchbar_item  text-gray-500 font-medium text-[17px]">
          <a
            href="#"
            className={`block py-2 px-2 hover:shadow-md ${
              selectedOption === "Promotion" ? "text-black" : "text-gray-500"
            }`}
            onClick={() => handleOptionClick("Promotion")}
          >
            <i
              class={`fa-solid fa-tag mr-2 ${
                selectedOption === "Promotion"
                  ? "text-blue-600"
                  : "text-gray-500"
              }`}
            ></i>
            Promotion
          </a>
        </div>
        <div className="searchbar_item  text-gray-500 font-medium text-[17px]">
          <a
            href="#"
            className={`block py-2 px-2 hover:shadow-md ${
              selectedOption === "Message" ? "text-black" : "text-gray-500"
            }`}
            onClick={() => handleOptionClick("Message")}
          >
            <i
              class={`fa-solid fa-comment-dots mr-2 ${
                selectedOption === "Message" ? "text-blue-600" : "text-gray-500"
              }`}
            ></i>
            Message
          </a>
        </div>
        <div className="searchbar_item text-gray-500 font-medium text-[17px]">
          <button
            onClick={() => toggleSubMenu("settings")}
            className={`flex imt justify-between w-full px-2 py-2 ${
              subMenuOpen.settings ? "text-black" : "text-gray-500"
            } hover:shadow-md focus:outline-none`}
          >
            <span>
              <i
                class={`fa-solid fa-gear mr-2 ${
                  subMenuOpen.settings ? "text-blue-600" : "text-gray-500"
                }`}
              ></i>
              Settings
            </span>
            <i
              className={`fas fa-angle-down transform ${
                subMenuOpen.settings ? "rotate-180" : ""
              } transition-transform duration-300`}
            ></i>
          </button>
          {subMenuOpen.settings && (
            <div
              className={`sub-menu pl-12 flex flex-col gap-[0.75rem] mt-[1rem]`}
            >
              <a
                href="#"
                className={`block py-2 hover:shadow-md ${
                  selectedOption === "Settings"
                    ? "text-blue-600"
                    : "text-gray-500"
                }`}
                onClick={() => handleOptionClick("Settings")}
              >
                Settings
              </a>
              <a
                href="#"
                className={`block py-2 hover:shadow-md ${
                  selectedOption === "Customers"
                    ? "text-blue-600"
                    : "text-gray-500"
                }`}
                onClick={() => handleOptionClick("Customers")}
              >
                Customers
              </a>
            </div>
          )}
        </div>
      </nav>
      <div className="flex items-center mt-auto mb-[1rem]">
        <img
          className="rounded-full w-[3rem] h-[3rem] mr-2 cursor-pointer"
          src="https://i.pravatar.cc/150?img=3"
          alt=""
        />
        <a className="flex flex-col" href="#">
          <span className="text-lg font-semibold">Jonathon Treat</span>
          <span className="text-gray-500">lana@treat.com</span>
        </a>
        <i
          className="ml-auto text-lg text-gray-500 cursor-pointer fa-solid fa-arrow-right-from-bracket"
          onClick={handleLogout}
        ></i>
      </div>
    </div>
  );
}

export default SideBar;
