import { CircleX } from "lucide-react";
import VariantName from "./VariantName";
import VariantTable from "./VariantPrice";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import VariantImage from "./VariantImage";

const VariantPopup = ({ setAddVariant }) => {
  const [values, setValues] = useState({});
  const dispatch = useDispatch();
  const { variantValues } = useSelector((state) => state.productVariant);

  const handleValuesChange = (newValues) => {
    setValues(newValues);
  };

  return (
    <div className="w-full fixed inset-0 bg-gray-500 bg-opacity-75 flex justify-center items-center z-[30]">
      <div className="w-[75%] h-[90%] bg-white p-10 rounded-lg relative overflow-y-scroll">
        <CircleX
          className="absolute cursor-pointer top-10 right-10 hover:opacity-50"
          size={30}
          onClick={() => setAddVariant(false)}
        ></CircleX>
        <p className="text-3xl text-[#3195e4] font-bold text-center select-none">
          Add variant
        </p>
        <VariantName />
        <VariantImage></VariantImage>
        {variantValues[0]?.values.length > 0 ? (
          <VariantTable setAddVariant={setAddVariant} />
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};

export default VariantPopup;
