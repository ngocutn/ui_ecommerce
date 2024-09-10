import { useState, useEffect } from "react";
import { getAllCategories } from "../../../service/product/api";

function TopCategory() {
  const [category, setCategory] = useState([]);

  useEffect(() => {
    const getCategory = async () => {
      try {
        const res = await getAllCategories();
        console.log("res", res);
        setCategory(res.data.data);
      } catch (error) {
        console.log("Error", error);
      }
    };
    getCategory();
  }, []);

  console.log("cate2", category);

  return (
    <div className="ml-7 mr-9 mt-8">
      <div id="top-categories" className="flex justify-between px-4">
        <h1 className="font-bold text-2xl ">Top categories</h1>
        <span className="text-xl text-gray-500 cursor-pointer hover:bg-gray-400 hover:text-white p-2">
          See all
        </span>
      </div>
      <div className="flex gap-5 w-9 ml-4 my-3">
        {category.slice(0, 10).map((item, index) => {
          return (
            <div className="flex flex-col items-center">
              <div className="w-[70px] h-[70px] rounded-full bg-gray-200 p-4 hover:bg-gray-100 cursor-pointer">
                {/* <img src={item.image} alt="" /> */}
                {/* {item.icon} */}
              </div>
              <p className="text-center mt-2 font-semibold">{item.name}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default TopCategory;
