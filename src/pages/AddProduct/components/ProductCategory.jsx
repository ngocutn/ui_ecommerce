import { useFormContext } from "react-hook-form";
import { useState, useEffect } from "react";
import {
  getCategoriesByParentId,
  getLevel1Categories,
} from "../../../service/product/api";

import FormControl from "@mui/material/FormControl";
import FormHelperText from "@mui/material/FormHelperText";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";

const ProductCategory = () => {
  const [categories, setCategories] = useState([]);
  const [subcategories, setSubcategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedSubcategory, setSelectedSubcategory] = useState("");

  useEffect(() => {
    const getCategory = async () => {
      try {
        const res = await getLevel1Categories();
        setCategories(res.data.data);
      } catch (error) {
        console.log("Error", error);
      }
    };
    getCategory();
  }, []);

  useEffect(() => {
    const fetchSubcategories = async () => {
      if (!selectedCategory) return;

      try {
        const response = await getCategoriesByParentId(selectedCategory);

        setSubcategories(response.data.data);
      } catch (error) {
        console.error("Error fetching subcategories:", error);
      }
    };

    fetchSubcategories();
  }, [selectedCategory]);

  const handleCategoryChange = (event) => {
    const categoryId = event.target.value;

    setSelectedCategory(categoryId);
  };

  useEffect(() => {
    if (selectedCategory) {
      setSelectedSubcategory("");
    }
  }, [selectedCategory]);

  useEffect(() => {
    if (selectedCategory) {
      clearErrors("categoryIds");
    }
  }, [selectedCategory]);

  useEffect(() => {
    if (selectedSubcategory) {
      clearErrors("subCategoryIds");
    }
  }, [selectedSubcategory]);

  const handleSubcategoryChange = (event) => {
    setSelectedSubcategory(event.target.value);
  };

  // ///////////////////////////////////
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
            className="rounded-lg my-2 font-semibold "
            value={selectedCategory}
            onChange={handleCategoryChange}
            displayEmpty
            size="small"
          >
            <MenuItem disabled value="">
              <em>Select a category</em>
            </MenuItem>
            {categories.map((cate) => (
              <MenuItem key={cate.id} value={cate.id}>
                {cate.name}
              </MenuItem>
            ))}
          </Select>
          {errors.categoryIds && (
            <FormHelperText className="text-[#D32F2F]">
              <i
                className="text-red-500 fa fa-exclamation-circle mr-1"
                aria-hidden="true"
              ></i>
              {errors.categoryIds.message}
            </FormHelperText>
          )}
        </FormControl>

        <label
          htmlFor="subCategoryIds"
          className="font-semibold text-gray-500 mt-2"
        >
          Product Subcategory
        </label>
        <FormControl>
          <Select
            id="productSubcategory"
            {...register("subCategoryIds")}
            className="rounded-lg my-2 font-semibold "
            displayEmpty
            value={selectedSubcategory}
            onChange={handleSubcategoryChange}
            disabled={!selectedCategory}
            size="small"
          >
            <MenuItem disabled value="">
              <em>Select a subcategory</em>
            </MenuItem>
            {subcategories.map((sub) => (
              <MenuItem key={sub.id} value={sub.id}>
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
