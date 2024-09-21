import { useForm, FormProvider } from "react-hook-form";
import { schema } from "./types/schema";
import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";
import axios from "axios";
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
import { View } from "lucide-react";
import ViewImage from "./components/ViewImage";
import { Switch } from "@mui/material";
import ProductCollection from "./components/ProductCollection";
import ProductSpecification from "./components/ProductSpecification";

const AddProdcutProvider = () => {
  const methods = useForm({
    mode: "all",
    resolver: yupResolver(schema),
    defaultValues: {
      sellingType: "STORE",
    },
  });

  const [loading, setLoading] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState([]);

  // Switch button
  const [checked, setChecked] = useState(true);

  const handleChange = (event) => {
    setChecked(event.target.checked);
  };

  // Submit form

  const onSubmit = async (data) => {
    const {
      name,
      description,
      weight,
      unitWeight,
      length,
      breadth,
      width,
      packageUnit,
      categoryIds,
      subCategoryIds,
      quantityAvailable,
      sellingPrice,
      originalPrice,
      discountedPrice,
      images,
      ...otherFields
    } = data;
    console.log("data", data);

    const request = {
      ...otherFields,
      name: name.trim(),
      description: description.trim(),
      quantityAvailable: parseInt(quantityAvailable),
      sellingPrice: parseFloat(sellingPrice),
      originalPrice: parseFloat(originalPrice),
      discountedPrice: parseFloat(discountedPrice),
      categoryIds: [categoryIds, subCategoryIds],
      productDimension: {
        width: parseFloat(width),
        weight: parseFloat(weight),
        length: parseFloat(length),
        breadth: parseFloat(breadth),
        unitWeight,
        packageUnit,
      },
    };

    setLoading(true);

    const res = await addProduct(request);
    setLoading(false);
    console.log("res 3333", res);

    if (res.status === 201) {
      alert(res.data.message);
      navigate("/admin");
    } else {
      alert(res.response.data.message);
    }
  };

  const addProduct = async (request) => {
    const formData = new FormData();
    const jsonBlob = new Blob([JSON.stringify(request)], {
      type: "application/json",
    });
    formData.append("request", jsonBlob);

    for (let i = 0; i < selectedFiles.length; i++) {
      formData.append("files", selectedFiles[i]);
    }

    console.log("formData", formData);
    console.log("files", selectedFiles);

    return axios({
      method: "post",
      url: `https://neo4j-ecommerce.onrender.com/api/v1/products`,
      data: formData,
    })
      .then((response) => {
        console.log("response", response);
        return response;
      })
      .catch((error) => {
        console.log("error", error);
        return error;
      });
  };

  return (
    <FormProvider {...methods}>
      <div id="add-product" className="my-16 mr-12">
        <ProductHeading />
        <form onSubmit={methods.handleSubmit(onSubmit)}>
          <div id="add-prd-body" className="flex gap-2 my-4">
            <div className="w-1/2 m-3">
              <ProductDescription />
              <ProductCategory />
              <ProductSellType />
              <div className="flex justify-between items-center mt-7">
                <p className="text-xl font-semibold">Have variant?</p>
                <Switch
                  checked={checked}
                  onChange={handleChange}
                  className="transition duration-75"
                />
              </div>

              {checked ? (
                <ProductVariant />
              ) : (
                <>
                  <ProductIventory />
                  <ProductPricing />
                </>
              )}
            </div>
            <div className="w-1/2 m-3">
              <ViewImage />
              <ProductShipping />
              <ProductSpecification />
              <ProductCollection />
              <ProductBtn />
            </div>
          </div>
        </form>
      </div>
    </FormProvider>
  );
};

export default AddProdcutProvider;
