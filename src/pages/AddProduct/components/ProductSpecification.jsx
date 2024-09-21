import { useFormContext } from "react-hook-form";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Accordion from "@mui/material/Accordion";

const ProductSpecification = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <div>
      <p className="text-xl font-semibold mt-7">Specification</p>
      <Accordion
        className=" px-2 my-3 border rounded-md"
        sx={{
          boxShadow: "none",
        }}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          className="font-semibold "
        >
          Specification
        </AccordionSummary>
        <AccordionDetails>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
          malesuada lacus ex, sit amet blandit leo lobortis eget.
        </AccordionDetails>
      </Accordion>

      <Accordion
        className=" px-2 my-3 border rounded-md"
        sx={{
          backgroundColor: "transparent",
          "&:before": { display: "none" },
          boxShadow: "none",
        }}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          className="font-semibold "
        >
          Dimension
        </AccordionSummary>
        <AccordionDetails>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
          malesuada lacus ex, sit amet blandit leo lobortis eget.
        </AccordionDetails>
      </Accordion>

      <Accordion
        className=" px-2 my-3 border rounded-md"
        sx={{
          boxShadow: "none",
          backgroundColor: "transparent",
          "&:before": { display: "none" },
        }}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          className="font-semibold "
        >
          Camera
        </AccordionSummary>
        <AccordionDetails>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
          malesuada lacus ex, sit amet blandit leo lobortis eget.
        </AccordionDetails>
      </Accordion>
    </div>
  );
};

export default ProductSpecification;
