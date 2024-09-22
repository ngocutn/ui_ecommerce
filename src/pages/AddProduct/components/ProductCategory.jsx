import { useFormContext } from "react-hook-form";
import { useState, useEffect } from "react";
import FormControl from "@mui/material/FormControl";
import FormHelperText from "@mui/material/FormHelperText";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllCategories,
  getAllSubCategories,
  setVariantOptions,
} from "../../../store/slice/categorySlice";

const ProductCategory = () => {
  const [category, setCategory] = useState("");
  const [subCategory, setSubCategory] = useState("");

  const dispatch = useDispatch();
  const {
    error,
    categories: categoriesData,
    subCategories: subCategoriesData,
  } = useSelector((state) => state.category);

  useEffect(() => {
    if (error) {
      console.log("API error", error);
    }

    dispatch(getAllCategories());
  }, [error, dispatch]);

  useEffect(() => {
    if (error) {
      console.log("API error", error);
    }

    if (category) {
      dispatch(getAllSubCategories(category));
    }
  }, [error, dispatch, category]);

  useEffect(() => {
    if (error) {
      console.log("API error", error);
    }

    if (subCategory) {
      dispatch(setVariantOptions(subCategory.variantOptions));
    }
  }, [subCategory]);

  console.log("categories: ", categoriesData);
  console.log("sub categories: ", subCategoriesData);
  console.log("categoryId: ", category);
  console.log("subCategory: ", subCategory.variantOptions);

  const {
    register,
    clearErrors,
    formState: { errors },
  } = useFormContext();

  return (
    <div>
      <p className="text-xl font-semibold mt-7">Category</p>
      <div
        id="productCategory"
        className="flex flex-col p-4 py-2 my-3 border rounded-md 2"
      >
        <label htmlFor="categoryIds" className="font-semibold text-gray-500">
          Product Category <span className="text-red-600">*</span>
        </label>

        <FormControl error={!!errors.categoryIds}>
          <Select
            id="productCategory"
            {...register("categoryIds")}
            className="my-2 font-semibold rounded-lg "
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            displayEmpty
            size="small"
          >
            <MenuItem disabled value="">
              <em>Select a category</em>
            </MenuItem>
            {categoriesData.map((cate) => (
              <MenuItem key={cate.id} value={cate.id}>
                {cate.name}
              </MenuItem>
            ))}
          </Select>
          {errors.categoryIds && (
            <FormHelperText className="text-[#D32F2F]">
              <i
                className="mr-1 text-red-500 fa fa-exclamation-circle"
                aria-hidden="true"
              ></i>
              {errors.categoryIds.message}
            </FormHelperText>
          )}
        </FormControl>

        <label
          htmlFor="subCategoryIds"
          className="mt-2 font-semibold text-gray-500"
        >
          Product Subcategory
        </label>
        <FormControl>
          <Select
            id="productSubcategory"
            {...register("subCategoryIds")}
            className="my-2 font-semibold rounded-lg "
            displayEmpty
            value={subCategory}
            onChange={(e) => setSubCategory(e.target.value)}
            disabled={!category}
            size="small"
          >
            <MenuItem disabled value="">
              <em>Select a subcategory</em>
            </MenuItem>
            {subCategoriesData.map((sub) => (
              <MenuItem key={sub.id} value={sub}>
                {sub.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>
    </div>
  );
};

export default ProductCategory;
