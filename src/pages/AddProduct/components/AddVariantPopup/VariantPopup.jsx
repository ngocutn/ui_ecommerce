import { CircleX } from "lucide-react";
import VariantName from "./VariantName";
import VariantTable from "./VariantPrice";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import VariantImage from "./VariantImage";

const VariantPopup = ({ setAddVariant }) => {
  const [values, setValues] = useState({});

  const handleValuesChange = (newValues) => {
    setValues(newValues);
  };
  console.log(values);

  return (
    <div className="w-full fixed inset-0 bg-gray-500 bg-opacity-75 flex justify-center items-center z-[30]">
      <div className="w-[90%] h-[90%] bg-white p-10 rounded-lg relative overflow-y-scroll">
        <CircleX
          className="absolute cursor-pointer top-10 right-10 hover:opacity-50"
          size={30}
          onClick={() => setAddVariant(false)}
        ></CircleX>
        <p className="text-4xl font-bold text-center select-none">
          Add variant
        </p>
        <VariantName />
        <VariantImage></VariantImage>
        <VariantTable values={values} />
      </div>
    </div>
  );
};

export default VariantPopup;
