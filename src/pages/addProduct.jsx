import SideBar from "../components/sideBar";
import { Button, colors } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

function AddProduct() {
  const navigate = useNavigate();

  const [selectedValue, setSelectedValue] = useState("");
  const handleChange = (event) => {
    setSelectedValue(event.target.value);
  };

  return (
    <div id="add-product" className="my-16 mr-12">
      <div className="flex gap-7">
        <button
          className="border border-gray-400 px-4 py-1 rounded-md text-gray-400 hover:bg-gray-400 hover:text-white"
          onClick={() => navigate("/")}
        >
          <i class="fa fa-long-arrow-left " aria-hidden="true"></i>
        </button>
        <div>
          <p className="text-gray-500 font-semibold">Back to product list</p>
          <p className="text-2xl font-bold">Add new product</p>
        </div>
      </div>

      <div className="flex my-4">
        <div className="w-1/2 m-3  ">
          <p className="text-xl font-semibold">Description</p>
          <div className="flex flex-col my-3 p-4 border-2 border-gray-300 py-2 rounded-md">
            <label htmlFor="" className="text-gray-500 font-semibold">
              Product Name
            </label>
            <input
              type="text"
              id="productName"
              className="border-2 border-gray-300 p-2 rounded-lg my-2"
            />
            <label htmlFor="" className="text-gray-500 font-semibold">
              Business description
            </label>
            <textarea
              type="text"
              id="productDescription"
              className="border-2 border-gray-300 p-2 rounded-lg my-2"
            />
          </div>

          <p className="text-xl font-semibold mt-7">Category</p>
          <div className="flex flex-col my-3 p-4 border-2 border-gray-300 py-2 rounded-md">
            <label htmlFor="" className="text-gray-500 font-semibold">
              Product Category
            </label>
            <select className="border-2 border-gray-300 p-2 rounded-lg my-2 font-semibold">
              <option value="fruit">Fruit</option>

              <option value="vegetable">Vegetable</option>

              <option value="meat">Meat</option>
            </select>
            <label htmlFor="" className="text-gray-500 font-semibold">
              Product Category
            </label>
            <select className="border-2 border-gray-300 p-2 rounded-lg my-2 font-semibold">
              <option value="fruit">Fruit</option>
              <option value="vegetable">Vegetable</option>
              <option value="meat">Meat</option>
            </select>
          </div>

          <p className="text-xl font-semibold mt-7">Description</p>
          <div className="flex gap-4 my-3 p-4 border-2 border-gray-300 py-2 rounded-md">
            <div className="flex flex-col w-1/3">
              <label htmlFor="" className="text-gray-500 font-semibold">
                Quantity
              </label>
              <input
                type="number"
                id="productQuantity"
                className="border-2 border-gray-300 p-2 rounded-lg my-2"
              />
            </div>
            <div className="flex flex-col w-2/3">
              <label htmlFor="" className="text-gray-500 font-semibold">
                SKU (Optional)
              </label>
              <input
                type="text"
                id="productSKU"
                className="border-2 border-gray-300 p-2 rounded-lg my-2"
              />
            </div>
          </div>

          <p className="text-xl font-semibold mt-7">Selling Type</p>
          <div className="flex flex-col my-3 p-4 border-2 border-gray-300 py-2 rounded-md font-semibold">
            <label className="my-1">
              <input type="radio" name="sellingOption" value="in-store" />
              <span className="ml-2">In-store selling only</span>
            </label>
            <label className="my-1">
              <input type="radio" name="sellingOption" value="online" />
              <span className="ml-2">Online selling only</span>
            </label>
            <label className="my-1">
              <input type="radio" name="sellingOption" value="both" />
              <span className="ml-2">Available both in-store and online</span>
            </label>
          </div>

          <p className="text-xl font-semibold">Variant</p>
          <div className="flex justify-between my-3 p-4 border-2 border-gray-300 rounded-md font-semibold">
            <span>Product Variants</span>
            <span className="text-blue-700 hover:text-gray-500 cursor-pointer">
              + Add Variant
            </span>
          </div>
        </div>

        <div className="w-1/2 m-3  ">
          <p className="text-xl font-semibold">Shipping and Delivery</p>
          <div className="flex flex-col my-3 p-4 border-2 border-gray-300 py-2 rounded-md ">
            <label htmlFor="" className="text-gray-500 font-semibold">
              Items weight
            </label>
            <div className="border-2 border-gray-300 p-2 rounded-lg my-2">
              <input
                type="text"
                id="productWeight"
                className="outline-none w-[90%]"
              />
              <select name="" id="" className="float-right outline-none">
                <option value="kg">kg</option>
                <option value="Ibs">Ibs</option>
              </select>
            </div>
            <div className="flex justify-between">
              <p className="font-semibold my-3">Package Size</p>
              <select
                name=""
                id=""
                className="outline-none"
                value={selectedValue}
                onChange={handleChange}
              >
                <option value="in">in</option>
                <option value="m">m</option>
                <option value="cm">cm</option>
              </select>
            </div>
            <div className="flex justify-between">
              <div className="flex flex-col w-[30%]">
                <label htmlFor="" className="text-gray-500 font-semibold">
                  Length
                </label>
                <div className="border-2 border-gray-300 p-1 rounded-lg my-2">
                  <input
                    type="number"
                    id="productPrice"
                    className="outline-none	ml-2 py-1 w-[80%]"
                  />
                  <span className="float-right py-1">
                    {selectedValue ? `${selectedValue}` : "in"}
                  </span>
                </div>
              </div>
              <div className="flex flex-col w-[30%]">
                <label htmlFor="" className="text-gray-500 font-semibold">
                  Breadth
                </label>
                <div className="border-2 border-gray-300 p-1 rounded-lg my-2">
                  <input
                    type="number"
                    id="productPrice"
                    className="outline-none	ml-2 py-1 w-[80%]"
                  />
                  <span className="float-right py-1">
                    {selectedValue ? `${selectedValue}` : "in"}
                  </span>
                </div>
              </div>
              <div className="flex flex-col w-[30%]">
                <label htmlFor="" className="text-gray-500 font-semibold">
                  Width
                </label>
                <div className="border-2 border-gray-300 p-1 rounded-lg my-2">
                  <input
                    type="number"
                    id="productPrice"
                    className="outline-none	ml-2 py-1 w-[80%]"
                  />
                  <span className="float-right py-1">
                    {selectedValue ? `${selectedValue}` : "in"}
                  </span>
                </div>
              </div>
            </div>
          </div>
          <p className="text-xl font-semibold mt-7">Pricing</p>
          <div className="flex flex-col my-3 p-4 border-2 border-gray-300 py-2 rounded-md">
            <div className="flex gap-4">
              <div className="flex flex-col w-1/2">
                <label htmlFor="" className="text-gray-500 font-semibold">
                  MSRP Price
                </label>
                <div className="border-2 border-gray-300 p-1 rounded-lg my-2">
                  <i
                    class="fa fa-usd bg-gray-200 py-2 px-3 rounded-sm"
                    aria-hidden="true"
                  ></i>
                  <input
                    type="number"
                    id="mspr-price"
                    className="outline-none	ml-2 w-[80%] "
                  />
                </div>
              </div>
              <div className="flex flex-col  w-1/2">
                <label htmlFor="" className="text-gray-500 font-semibold">
                  Sale Price
                </label>
                <div className="border-2 border-gray-300 p-1 rounded-lg my-2">
                  <i
                    class="fa fa-usd bg-gray-200 py-2 px-3 rounded-sm"
                    aria-hidden="true"
                  ></i>
                  <input
                    type="number"
                    id="sale-price"
                    className="outline-none	ml-2 w-[80%] "
                  />
                </div>
              </div>
            </div>
            <label htmlFor="" className="text-gray-500 font-semibold">
              Price
            </label>
            <div className="border-2 border-gray-300 p-1 rounded-lg my-2">
              <i
                class="fa fa-usd bg-gray-200 py-2 px-3 rounded-sm"
                aria-hidden="true"
              ></i>
              <input
                type="number"
                id="productPrice"
                className="outline-none	ml-2 w-[90%] "
              />
            </div>
          </div>
          <div className="flex justify-between mt-5">
            <button className="border-2 border-gray-300 rounded-lg p-3 font-semibold hover:bg-gray-300 hover:text-white">
              Discard
            </button>
            <button className="border-2 bg-blue-700 rounded-lg p-3 font-semibold hover:bg-gray-300 text-white">
              Add button
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddProduct;
