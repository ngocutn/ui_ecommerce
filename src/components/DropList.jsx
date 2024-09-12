import { useState } from "react";

const DropList = () => {
  const [isShow, setIsShow] = useState(false);

  const handleToggle = () => {
    setIsShow(!isShow);
    console.log(isShow);
  };

  return (
    <div className="flex flex-col w-full bg-[#ebeae8] rounded-lg">
      <div
        className="w-full px-4 py-2 text-base font-semibold "
        onClick={handleToggle}
      >
        Specification
      </div>
      <ul className={`${isShow ? "flex" : "hidden"} flex-col w-full p-4 pt-0`}>
        <li className="py-3 border-b border-gray-300 first:pt-0">Display</li>
        <li className="py-3 border-b border-gray-300">Display</li>
        <li className="py-3 border-b border-gray-300 last:border-b-0">
          Display
        </li>
      </ul>
    </div>
  );
};

export default DropList;
