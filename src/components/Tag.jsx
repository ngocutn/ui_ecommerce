import { CircleX } from "lucide-react";
import React from "react";

const Tag = ({ item, value, handleDetele }) => {
  return (
    <div className="px-3 py-1 flex items-center gap-x-1 bg-[#2a56e8] rounded-lg text-white">
      <span>{value}</span>
      <CircleX
        size={16}
        className="cursor-pointer hover:opacity-55"
        onClick={() => handleDetele(item, value)}
      ></CircleX>
    </div>
  );
};

export default Tag;
