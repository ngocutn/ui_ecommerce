import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useDispatch, useSelector } from "react-redux";
import { Input, InputAdornment, TextField } from "@mui/material";
import { useEffect, useState } from "react";

const VariantTable = ({ values }) => {
  const dispatch = useDispatch();
  const { isLoading, error, variantValues } = useSelector(
    (state) => state.productVariant
  );
  const generateCombinations = (variants) => {
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

    generate([], 0); // Start generating combinations
    // setDataCombination(result);
    return result;
  };

  const combinations = generateCombinations(variantValues);

  const [dataTable, setDataTable] = useState([]);

  useEffect(() => {
    if (variantValues.length > 0) {
      setDataTable(variantValues);
    }
  }, [variantValues]);

  let combinationUpdate;
  const handleQuantity = (e, index) => {
    combinationUpdate = [
      ...combinations,
      combinations[index].push(e.target.value),
    ];

    // combinationUpdate.map((combinatioValue) => {
    //   combinatioValue[index]e.target.value;
    // });

    console.log(combinationUpdate);
  };

  return (
    <TableContainer component={Paper} className="mt-10">
      <Table>
        <TableHead>
          <TableRow>
            {dataTable.map((variant, index) => (
              <TableCell key={index} className="px-4 py-2">
                {variant.variantType}
              </TableCell>
            ))}
            <TableCell>SKU</TableCell>
            <TableCell>Quantity</TableCell>
            <TableCell>Price</TableCell>
            <TableCell>Sale Price</TableCell>
            <TableCell>MRSP Price</TableCell>
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
                <TextField required id="standard-required" variant="standard" />
              </TableCell>
              <TableCell>
                <TextField
                  defaultValue={"0"}
                  id="standard-number"
                  type="number"
                  variant="standard"
                  slotProps={{
                    inputLabel: {
                      shrink: true,
                    },
                  }}
                  onChange={(e) => handleQuantity(e, index)}
                />
              </TableCell>
              <TableCell>
                <Input
                  id="standard-adornment-amount"
                  type="number"
                  defaultValue={"0"}
                  startAdornment={
                    <InputAdornment position="start">$</InputAdornment>
                  }
                />
              </TableCell>
              <TableCell>
                <Input
                  id="standard-adornment-amount"
                  type="number"
                  defaultValue={"0"}
                  startAdornment={
                    <InputAdornment position="start">$</InputAdornment>
                  }
                />
              </TableCell>
              <TableCell>
                <Input
                  id="standard-adornment-amount"
                  type="number"
                  defaultValue={"0"}
                  startAdornment={
                    <InputAdornment position="start">$</InputAdornment>
                  }
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default VariantTable;
