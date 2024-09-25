import VariantName from "./VariantName";
import VariantTable from "./VariantPrice";
import { useState } from "react";

const VariantPopup = () => {
  const [values, setValues] = useState({});

  const handleValuesChange = (newValues) => {
    setValues(newValues);
  };
  console.log(values);

  return (
    <div className="w-full fixed inset-0 bg-gray-500 bg-opacity-75 flex justify-center items-center z-[30]">
      <div className="w-[90%] h-[90%] bg-white p-6 rounded-lg relative">
        <p className="text-4xl font-bold text-center">Add variant</p>
        <VariantName onValuesChange={handleValuesChange} />
        <VariantTable values={values} />
      </div>
    </div>
  );
};

export default VariantPopup;
