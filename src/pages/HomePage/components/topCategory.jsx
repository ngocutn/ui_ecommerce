import { useState, useEffect } from "react";
import { getLevel1Categories } from "../../../service/product/api";
import { Skeleton } from "@mui/material";
import CateItemSkeleton from "../../../components/skeleton/CateItemSkeleton";

// import image1 from "../../../assets/image/airpods-alt-svgrepo-com.png";

function TopCategory() {
  const [category, setCategory] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const getCategory = async () => {
      try {
        setIsLoading(true);
        const res = await getLevel1Categories();

        setCategory(res.data.data);
      } catch (error) {
      } finally {
        setIsLoading(false);
      }
    };
    getCategory();
  }, []);

  return (
    <div className="mx-auto mt-12">
      <div id="top-categories" className="flex justify-between">
        <h1 className="text-xl font-bold ">Top categories</h1>
        <span className="p-2 text-base text-gray-500 cursor-pointer hover:bg-gray-400 hover:text-white">
          See all
        </span>
      </div>
      <div className="flex justify-between w-full my-3 text-base">
        {isLoading ? (
          <>
            {Array.from({ length: 10 }).map((_, index) => (
              <CateItemSkeleton key={index} />
            ))}
          </>
        ) : (
          category.slice(0, 10).map((item) => (
            <div className="flex flex-col items-center">
              <div className="w-[70px] h-[70px] rounded-full bg-gray-200 p-4 hover:bg-gray-100 cursor-pointer">
                <img
                  src={item.icon}
                  alt="image"
                  className="object-cover w-full h-full"
                />
                {/* {item.icon} */}
              </div>
              <p className="mt-2 font-semibold text-center">{item.name}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default TopCategory;
