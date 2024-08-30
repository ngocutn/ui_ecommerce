import SideBar from "../components/sideBar";

function AddProduct() {
  return (
    <div id="add-product" className="flex h-screen">
      <div className="w-1/5">
        <SideBar></SideBar>
      </div>
      <div className="w-4/5 pl-20 pr-8 py-4 flex-col gap-4">
        <div className="flex gap-5 items-center float-right">
          <i class="fa fa-bell-o cursor-pointer" aria-hidden="true"></i>
          <i
            class="fa fa-question-circle-o cursor-pointer"
            aria-hidden="true"
          ></i>
          <button className="border-2 border-gray-300 rounded-lg p-2 font-semibold hover:bg-gray-300 hover:text-white">
            View Shop
          </button>
        </div>

        <div className="my-16 mr-12">
          <div className="flex gap-7">
            <button className="border border-gray-400 px-4 py-1 rounded-md text-gray-400 hover:bg-gray-400 hover:text-white">
              <i class="fa fa-long-arrow-left " aria-hidden="true"></i>
            </button>
            <div>
              <p className="text-gray-500 font-semibold">
                Back to product list
              </p>
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
                  className="border-2 border-gray-300 py-2 rounded-lg my-2"
                />
                <label htmlFor="" className="text-gray-500 font-semibold">
                  Business description
                </label>
                <textarea
                  type="text"
                  id="productName"
                  className="border-2 border-gray-300 py-2 rounded-lg my-2"
                />
              </div>

              <p className="text-xl font-semibold">Category</p>
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

              <p className="text-xl font-semibold">Description</p>
              <div className="flex gap-4 my-3 p-4 border-2 border-gray-300 py-2 rounded-md">
                <div className="flex flex-col w-1/3">
                  <label htmlFor="" className="text-gray-500 font-semibold">
                    Quantity
                  </label>
                  <input
                    type="number"
                    id="productName"
                    className="border-2 border-gray-300 py-2 rounded-lg my-2"
                  />
                </div>
                <div className="flex flex-col w-2/3">
                  <label htmlFor="" className="text-gray-500 font-semibold">
                    SKU (Optional)
                  </label>
                  <input
                    type="text"
                    id="productName"
                    className="border-2 border-gray-300 py-2 rounded-lg my-2"
                  />
                </div>
              </div>

              <p className="text-xl font-semibold">Description</p>
              <div className="flex flex-col my-3 p-4 border-2 border-gray-300 py-2 rounded-md">
                <label>
                  <input type="checkbox" />
                  My Value
                </label>
                <label>
                  <input
                    type="checkbox"
                    className="border-2 border-gray-300 p-2 rounded-lg my-2"
                  />
                  My Value
                </label>
                <label>
                  <input type="checkbox" />
                  My Value
                </label>
              </div>
            </div>

            <div className="w-1/2 m-3  ">
              <p className="text-xl font-semibold">Description</p>
              <div className="flex flex-col my-3 p-4 border-2 border-gray-300 py-2 rounded-md">
                <label htmlFor="" className="text-gray-500 font-semibold">
                  Product Name
                </label>
                <input
                  type="text"
                  id="productName"
                  className="border-2 border-gray-300 py-2 rounded-lg my-2"
                />
                <label htmlFor="" className="text-gray-500 font-semibold">
                  Business description
                </label>
                <textarea
                  type="text"
                  id="productName"
                  className="border-2 border-gray-300 py-2 rounded-lg my-2"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddProduct;
