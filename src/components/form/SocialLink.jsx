import { Facebook, Linkedin } from "lucide-react";
import React from "react";

const SocialLink = () => {
  return (
    <div className="flex flex-col items-center mt-9">
      <p className="text-[15px]">or use your account</p>

      <div className="flex items-center mt-3 cursor-pointer gap-x-5">
        <div className="p-2 border border-gray-200 rounded-full hover:bg-gray-100">
          <Facebook size={16}></Facebook>
        </div>
        <div className="p-2 border border-gray-200 rounded-full hover:bg-gray-100">
          <Linkedin size={16}></Linkedin>
        </div>
      </div>
    </div>
  );
};

export default SocialLink;
