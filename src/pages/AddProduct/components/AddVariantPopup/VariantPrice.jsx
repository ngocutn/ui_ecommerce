import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useDispatch, useSelector } from "react-redux";
import {
  Button,
  Checkbox,
  FormControl,
  Input,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  TextField,
} from "@mui/material";
import { useCallback, useEffect, useState } from "react";
import { setProductVariants } from "../../../../store/slice/productVariantSlice";
import ConvertStringType from "../../../../utils/ConverStringType";

const VariantTable = ({ values }) => {
  const dispatch = useDispatch();
  const {
    isLoading,
    error,
    variantValues,
    variantOptions,
    variantImages,
    primaryVariant,
  } = useSelector((state) => state.productVariant);

  const generateCombinations = useCallback((variants) => {
    const result = [];

    const generate = (current, index) => {
      if (index === variants.length) {
        result.push(current);
        return;
      }

      const variant = variants[index];

      if (variant.values.length === 0) {
        generate(current, index + 1);
      } else {
        variant.values.forEach((value) => {
          generate([...current, value], index + 1);
        });
      }
    };

    generate([], 0);
    return result;
  }, []);

  const [dataTable, setDataTable] = useState([]);
  const [combinations, setCombinations] = useState([]);
  const [combinationUpdate, setCombinationUpdate] = useState([]);
  const [productVariantOptions, setProductVariantOptions] = useState({});
  const [productVariantImage, setProductVariantImage] = useState([]);

  useEffect(() => {
    if (variantValues.length > 0) {
      const newCombinations = generateCombinations(variantValues);
      setCombinations(newCombinations);
      setCombinationUpdate(newCombinations.map(() => ["", "", "", "", ""]));
      setDataTable(variantValues);
    }
  }, [variantValues, generateCombinations]);

  useEffect(() => {
    const initialOptions = variantOptions.map((option) => {
      return {
        productType: option,
        valueName: "",
      };
    });
    setProductVariantOptions(initialOptions);
  }, [variantOptions]);

  const handleInputChange = (e, rowIndex, colIndex) => {
    setCombinationUpdate((prevCombinations) =>
      prevCombinations.map((combo, idx) =>
        idx === rowIndex
          ? combo.map((value, i) =>
              i === colIndex ? e.target.value.trim() : value
            )
          : combo
      )
    );
  };

  const createVariantOptions = (options, combinations) => {
    return combinations.map((combination) => {
      return options.map((product, index) => ({
        ...product,
        valueName: combination[index] || "",
      }));
    });
  };

  const variantOptionsUpdate = createVariantOptions(
    productVariantOptions,
    combinations
  );

  const getVariantImages = (variantImages, variantOptions) => {
    // Tạo một bản đồ để tra cứu hình ảnh theo valueName
    const imageMap = variantImages?.reduce((acc, { valueName, images }) => {
      acc[valueName] = images || []; // Nếu không có images, gán là mảng rỗng
      return acc;
    }, {});

    console.log("imgMap", imageMap);

    // Lấy hình ảnh từ variantOptions
    return variantOptions.map((option) => {
      const { valueName } = option; // Lấy valueName từ option
      return imageMap[valueName] || []; // Trả về hình ảnh tương ứng hoặc mảng rỗng
    });
  };

  const updatedVariantImages = getVariantImages(
    variantImages,
    variantOptionsUpdate
  );

  console.log("updatedVariantImages", updatedVariantImages);

  const productVariantData = (combinations) => {
    return combinations.map((combination, index) => ({
      sku: combination[0] || "",
      quantityAvailable: combination[1] || 0,
      sellingPrice: combination[2] || 0,
      discountPrice: combination[3] || 0,
      originalPrice: combination[4] || 0,
      soldQuantity: 0,
      images: updatedVariantImages,
      variantOptions: variantOptionsUpdate[index],
    }));
  };

  const transformedData = productVariantData(combinationUpdate);

  const updatedData = transformedData.map((item) => {
    const { variantOptions } = item;
    const images = getVariantImages(variantImages, variantOptions);
    return {
      ...item,
      images: images.flat(), // Kết hợp tất cả hình ảnh vào một mảng duy nhất
    };
  });

  const handleSave = () => {
    dispatch(setProductVariants(updatedData));
  };

  console.log("transformedData", updatedData);
  console.log("variantOptionsUpdate", variantOptionsUpdate);
  console.log("combination", combinations);
  console.log("productVariantOptions", variantOptionsUpdate);
  console.log("variantImage", variantImages);

  return (
    <div>
      <TableContainer component={Paper} className="mt-10">
        <Table>
          <TableHead>
            <TableRow>
              {dataTable.map((variant, index) => (
                <TableCell key={index} className="px-4 py-2 font-bold">
                  {ConvertStringType(variant.variantType)}
                </TableCell>
              ))}
              <TableCell className="font-bold ">SKU</TableCell>
              <TableCell className="font-bold ">Quantity</TableCell>
              <TableCell className="font-bold ">Price</TableCell>
              <TableCell className="font-bold ">Sale Price</TableCell>
              <TableCell className="font-bold ">MRSP Price</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {combinations?.map((combination, index) => (
              <TableRow key={index}>
                {combination.map((value, idx) => (
                  <TableCell key={idx}>{value || ""}</TableCell>
                ))}
                {/* Placeholder cells for SKU, Quantity, Price, etc. */}
                <TableCell>
                  {/* <TextField
                    required
                    id="standard-required"
                    variant="standard"
                    onChange={(e) => handleInputChange(e, index, 0)}
                  /> */}
                  <TextField
                    label="Sku"
                    id="outlined-size-small"
                    size="small"
                    type="number"
                    slotProps={{
                      inputLabel: {
                        shrink: true,
                      },
                    }}
                    required
                    onChange={(e) => handleInputChange(e, index, 0)}
                  />
                </TableCell>
                <TableCell>
                  {/* <TextField
                    defaultValue={"0"}
                    id="standard-number"
                    type="number"
                    variant="standard"
                    slotProps={{
                      inputLabel: {
                        shrink: true,
                      },
                    }}
                    onChange={(e) => handleInputChange(e, index, 1)}
                  /> */}
                  <TextField
                    defaultValue={"0"}
                    label="Quantity"
                    id="outlined-size-small"
                    size="small"
                    type="number"
                    required
                    slotProps={{
                      inputLabel: {
                        shrink: true,
                      },
                    }}
                    onChange={(e) => handleInputChange(e, index, 1)}
                  />
                </TableCell>
                <TableCell>
                  {/* <Input
                    id="standard-adornment-amount"
                    type="number"
                    defaultValue={"0"}
                    startAdornment={
                      <InputAdornment position="start">$</InputAdornment>
                    }
                    onChange={(e) => handleInputChange(e, index, 2)}
                  /> */}
                  <FormControl fullWidth sx={{ m: 1 }} size="small" required>
                    <InputLabel htmlFor="outlined-adornment-amount">
                      Price
                    </InputLabel>
                    <OutlinedInput
                      id="outlined-adornment-amount"
                      startAdornment={
                        <InputAdornment position="start">$</InputAdornment>
                      }
                      label="Price"
                      defaultValue={"0"}
                      type="number"
                      onChange={(e) => handleInputChange(e, index, 2)}
                    />
                  </FormControl>
                </TableCell>
                <TableCell>
                  {/* <Input
                    id="standard-adornment-amount"
                    type="number"
                    defaultValue={"0"}
                    startAdornment={
                      <InputAdornment position="start">$</InputAdornment>
                    }
                    onChange={(e) => handleInputChange(e, index, 3)}
                  /> */}
                  <FormControl fullWidth sx={{ m: 1 }} size="small" required>
                    <InputLabel htmlFor="outlined-adornment-amount">
                      Sale price
                    </InputLabel>
                    <OutlinedInput
                      id="outlined-adornment-amount"
                      startAdornment={
                        <InputAdornment position="start">$</InputAdornment>
                      }
                      label="Sale price"
                      defaultValue={"0"}
                      type="number"
                      onChange={(e) => handleInputChange(e, index, 2)}
                    />
                  </FormControl>
                </TableCell>
                <TableCell>
                  {/* <Input
                    id="standard-adornment-amount"
                    type="number"
                    defaultValue={"0"}
                    startAdornment={
                      <InputAdornment position="start">$</InputAdornment>
                    }
                    onChange={(e) => handleInputChange(e, index, 4)}
                  /> */}
                  <FormControl fullWidth sx={{ m: 1 }} size="small" required>
                    <InputLabel htmlFor="outlined-adornment-amount">
                      MRSP price
                    </InputLabel>
                    <OutlinedInput
                      id="outlined-adornment-amount"
                      startAdornment={
                        <InputAdornment position="start">$</InputAdornment>
                      }
                      label="MRSP price"
                      defaultValue={"0"}
                      type="number"
                      onChange={(e) => handleInputChange(e, index, 2)}
                    />
                  </FormControl>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <div className="flex items-center justify-end w-full">
        <Button
          onClick={handleSave}
          className="bg-[#4192d3] text-white text-[12px] font-semibold px-7 py-2 mt-4 hover:bg-opacity-80"
        >
          Save
        </Button>
      </div>
    </div>
  );
};

export default VariantTable;
