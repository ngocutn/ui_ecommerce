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
import ProductShipping from "./components/ProductShipping";
import ProductPricing from "./components/ProductPricing";
import ProductHeading from "./components/ProductHeading";
import ProductBtn from "./components/ProductButton";
import ViewImage from "./components/ViewImage";
import { Switch } from "@mui/material";
import ProductCollection from "./components/ProductCollection";
import ProductSpecification from "./components/ProductSpecification";
import { useSelector } from "react-redux";

const AddProdcutProvider = () => {
  const methods = useForm({
    mode: "all",
    resolver: yupResolver(schema),
    defaultValues: {
      sellingType: "STORE",
      collections: [],
    },
  });

  const [loading, setLoading] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState([]);
  const { specification: specificationData } = useSelector(
    (state) => state.category
  );
  const { primaryVariant } = useSelector((state) => state.productVariant);
  const { productImages } = useSelector((state) => state.addProduct);

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
      specification,
      collections,
      sku,
      ...otherFields
    } = data;

    console.log("collections", collections);

    const formattredSpecification = (specificationData, specification) => {
      if (specificationData.length !== specification.length) {
        console.error(
          "Specification data and values arrays are not of the same length."
        );
        return [];
      }

      const formattedSpecifications = specificationData.map(
        (specName, index) => {
          return {
            name: specName,
            value: specification[index],
          };
        }
      );

      return formattedSpecifications;
    };

    const categories = [categoryIds, subCategoryIds.id];
    const collectionIds = data.selectedCollections.map((collection) => {
      return collection.id;
    });

    const request = {
      sku: sku.trim(),
      name: name.trim(),
      description: description.trim(),
      quantityAvailable: parseInt(quantityAvailable),
      sellingPrice: parseFloat(sellingPrice),
      originalPrice: parseFloat(originalPrice),
      discountedPrice: parseFloat(discountedPrice),
      categoryIds: categories.concat(collectionIds),
      hasVariants: checked,
      productDimension: {
        width: parseFloat(width),
        weight: parseFloat(weight),
        length: parseFloat(length),
        breadth: parseFloat(breadth),
        unitWeight,
        packageUnit,
      },
      productImages: productImages ? productImages : [],
      hasSpecification: specification.length > 0 ? true : false,
      specifications: formattredSpecification(specificationData, specification),
      primaryVariantType: checked ? primaryVariant : "",
      hasCollection: collections.length > 0 ? true : false,
      reviewOptions: [
        {
          type: "RECOMMENDED",
          value: ["YES", "NO"],
        },
        {
          type: "DELIVERY",
          value: ["DELAY", "ONTIME"],
        },
      ],
    };

    console.log("data", request);
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
              <div className="flex items-center justify-between mt-7">
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
