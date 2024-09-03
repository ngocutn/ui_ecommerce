import React, { useState } from "react";

function SideBar() {
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

  return (
    <div className="sidebar border-r border-[#d3d4d6] h-full left-0 pl-[1.5rem] pr-[1.5rem] flex flex-col gap-[1.5rem]">
      <div className="logo">
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/f/fe/Shopee.svg"
          alt=""
        />
      </div>
      <div className="searchbar border rounded-lg px-[1rem] py-[.8rem]">
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
                href="#"
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
        <div className="searchbar_item  text-gray-500 font-medium text-[17px]">
          <a
            href="#"
            className={`block py-2 px-2 hover:shadow-md ${
              selectedOption === "Promotion" ? "text-blue-600" : "text-gray-500"
            }`}
            onClick={() => handleOptionClick("Promotion")}
          >
            <i class="fa-solid fa-tag mr-2"></i>Promotion
          </a>
        </div>
        <div className="searchbar_item  text-gray-500 font-medium text-[17px]">
          <a
            href="#"
            className={`block py-2 px-2 hover:shadow-md ${
              selectedOption === "Message" ? "text-blue-600" : "text-gray-500"
            }`}
            onClick={() => handleOptionClick("Message")}
          >
            <i class="fa-solid fa-comment-dots mr-2"></i>Message
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
    </div>
  );
}

export default SideBar;
