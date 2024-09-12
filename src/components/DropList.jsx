import { Boxes, ChevronDown, ChevronUp } from "lucide-react";
import { useState } from "react";
import { motion } from "framer-motion";

const DropList = ({ children }) => {
  const [isShow, setIsShow] = useState(false);

  const handleToggle = () => {
    setIsShow(!isShow);
    console.log(isShow);
  };

  return (
    <div className="flex flex-col w-full bg-[rgb(235_234_232)] rounded-lg px-6 shadow-md">
      <div
        className="flex items-center justify-between w-full px-3 py-3 text-lg font-semibold"
        onClick={handleToggle}
      >
        <div className="flex items-center select-none gap-x-3">
          <Boxes />
          Specification
        </div>

        <span>{isShow ? <ChevronDown /> : <ChevronUp />}</span>
      </div>
      <ul
        className={`${
          isShow ? "flex" : "hidden"
        } flex-col w-full px-2 py-8 pt-2 ease-in-out transition-all duration-500 `}
      >
        {/* <li className="py-3 border-b border-gray-300 first:pt-0">Display</li>
        <li className="py-3 border-b border-gray-300">Display</li>
        <li className="py-3 border-b border-gray-300 last:border-b-0">
          Display
        </li> */}
        {children}
      </ul>
    </div>
  );
};

export default DropList;
