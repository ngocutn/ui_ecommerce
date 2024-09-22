import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

const VariantTable = ({ values }) => {
  const columns = Object.keys(values).filter((key) => values[key].length > 0);
  console.log("columns", columns);
  console.log("values", values);

  if (columns.length === 0) {
    return null; // Không hiển thị gì nếu không có giá trị
  }

  const rows = [];
  const maxRows = Math.max(
    values.Color?.length || 0,
    values.Ram?.length || 0,
    values.Storage?.length || 0
  );

  for (let i = 0; i < maxRows; i++) {
    rows.push({
      color: values.Color?.[i % values.Color.length] || "",
      ram: values.Ram?.[i % values.Ram.length] || "",
      storage: values.Storage?.[i % values.Storage.length] || "",
    });
  }
  console.log("rows", rows);

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            {columns.map((column) => (
              <TableCell key={column}>{column}</TableCell>
            ))}
            <TableCell>SKU</TableCell>
            <TableCell>Quantity</TableCell>
            <TableCell>Price</TableCell>
            <TableCell>Sale Price</TableCell>
            <TableCell>MRSPPrice</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {/* {values[columns[0]].map((_, index) => (
            <TableRow key={index}>
              {columns.map((column) => (
                <TableCell key={column}>{values[column][index]}</TableCell>
              ))}
            </TableRow>
          ))}
           */}
          {rows.map((row, index) => (
            <TableRow key={index}>
              <TableCell>{row.color}</TableCell>
              <TableCell>{row.ram}</TableCell>
              <TableCell>{row.storage}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default VariantTable;
