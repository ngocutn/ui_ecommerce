import { useState, useEffect } from "react";
import { getLevel1Categories } from "../../../service/product/api";

function TopCategory() {
  const [category, setCategory] = useState([]);

  useEffect(() => {
    const getCategory = async () => {
      try {
        const res = await getLevel1Categories();
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
    <div className="w-[80%] mx-auto mt-12">
      <div id="top-categories" className="flex justify-between">
        <h1 className="font-bold text-xl ">Top categories</h1>
        <span className="text-base text-gray-500 cursor-pointer hover:bg-gray-400 hover:text-white p-2">
          See all
        </span>
      </div>
      <div className="flex text-base justify-between w-full my-3">
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
