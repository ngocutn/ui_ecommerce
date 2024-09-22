import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Box, Radio } from "@mui/material";
import Tag from "../../../../components/Tag";
import {
  setPrimaryVariant,
  setVariantOptions,
  setVariantValues,
} from "../../../../store/slice/productVariantSlice";

const VariantName = () => {
  const dispatch = useDispatch();
  const { variantOptions } = useSelector((state) => state.category);
  const [selectedValue, setSelectedValue] = useState(variantOptions[0]);

  //set value for each variant
  const [variantInputs, setVariantInputs] = useState({});
  const [currentInput, setCurrentInput] = useState("");

  const handleChange = (event) => {
    setSelectedValue(event.target.value);
  };

  const handleChangeInput = (e, variant) => {
    const newValue = e.target.value;

    setCurrentInput((prev) => ({
      ...prev,
      [variant]: newValue,
    }));
  };

  const handleKeyDown = (e, variant) => {
    if (e.key === "Enter") {
      const newValue = currentInput[variant];

      if (newValue) {
        setVariantInputs((prev) => ({
          ...prev,
          [variant]: [...(prev[variant] || []), newValue],
        }));

        setCurrentInput((prev) => ({
          ...prev,
          [variant]: "",
        }));

        e.target.value = "";
      }
    }
  };

  const handleDetele = (variant, valueToRemove) => {
    setVariantInputs((prev) => ({
      ...prev,
      [variant]: prev[variant]?.filter((value) => value !== valueToRemove),
    }));
  };

  useEffect(() => {
    if (variantOptions.length > 0) {
      setSelectedValue(variantOptions[0]);

      const initialInputs = variantOptions.reduce((acc, option) => {
        acc[option] = [];
        return acc;
      }, {});
      setVariantInputs(initialInputs);
    }
  }, [variantOptions]);

  useEffect(() => {
    dispatch(setPrimaryVariant(selectedValue));
    dispatch(setVariantOptions(variantOptions));
    dispatch(setVariantValues(variantInputs));
  }, [variantInputs, selectedValue]);

  console.log("variantInputs", variantInputs);
  console.log("variantOptions", variantOptions);

  return (
    <div className="flex justify-center mt-8 gap-x-10">
      <div className="p-3 rounded-md outline-dashed outline-offset-2 outline-gray-300">
        <h1 className="mb-5 font-bold text-text1">Primary Variant</h1>
        <div className="flex flex-col">
          {variantOptions.map((item, index) => (
            <div>
              <Radio
                checked={selectedValue === item}
                onChange={handleChange}
                key={index}
                value={item}
                name="radio-buttons"
              />
              <label key={index} className="text-sm font-semibold text-text1">
                {item}
              </label>
            </div>
          ))}
        </div>
      </div>
      <div className="flex-1 p-3 rounded-md outline-dashed outline-offset-2 outline-gray-300">
        <h1 className="mb-5 font-bold text-text1">Variant Type</h1>
        <div className="flex flex-col w-full gap-y-5">
          {variantOptions.map((item, index) => (
            <Box
              key={index}
              sx={{
                width: "80%",
                maxWidth: "100%",
                display: "flex",
                alignItems: "center",
              }}
            >
              <p className="w-[10%] mr-3 font-bold text-text1">{item}</p>
              <div className="flex items-center w-full px-2 py-2 overflow-hidden border rounded-md border-text1 gap-x-1">
                <div className="flex flex-wrap items-center gap-x-2 gap-y-2">
                  {variantInputs[item]?.map((value) => (
                    <Tag
                      value={value}
                      item={item}
                      handleDetele={handleDetele}
                    ></Tag>
                  ))}
                </div>
                <input
                  type="text"
                  className="border-none outline-none"
                  onChange={(e) => handleChangeInput(e, item)}
                  onKeyDown={(e) => handleKeyDown(e, item)}
                />
              </div>
            </Box>
          ))}
        </div>
      </div>
    </div>
  );
};

export default VariantName;
