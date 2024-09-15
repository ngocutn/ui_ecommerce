import { useFormContext } from "react-hook-form";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import ProductDescription from "./components/ProductDescription";
import ProductCategory from "./components/ProductCategory";
import ProductIventory from "./components/ProductInventory";
import ProductSellType from "./components/ProductSellType";
import ProductVariant from "./components/ProductVariant";
import ProductImage from "./components/ProductImage";
import ProductShipping from "./components/ProductShipping";
import ProductPricing from "./components/ProductPricing";

import ProductHeading from "./components/ProductHeading";
import ProductBtn from "./components/ProductButton";

const NewProduct = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const [discardButton, setDiscardButton] = useState(false);
  const handleDiscardButton = () => {
    setDiscardButton(!discardButton);
  };

  // const isFormValid = formState.isValid;

  const {
    formState: { errors, isValid },
  } = useFormContext();

  return (
    // <Stack>
    //   <TextField
    //     {...register("name")}
    //     label="name"
    //     error={!!errors.name}
    //     helperText={errors.name?.message}
    //   ></TextField>
    //   <TextField {...register("email")} label="email"></TextField>
    // </Stack>
    <div id="add-product" className="my-16 mr-12">
      <ProductHeading />
      <div id="add-prd-body" className="flex gap-2 my-4">
        <div className="w-1/2 m-3">
          <ProductDescription />
          <ProductCategory />
          <ProductIventory />
          <ProductSellType />
          <ProductVariant />
        </div>
        <div className="w-1/2 m-3">
          <ProductImage />
          <ProductShipping />
          <ProductPricing />
          <ProductBtn />
        </div>
      </div>
    </div>
  );
};

export default NewProduct;
