import { useFormContext } from "react-hook-form";
import { useState, useEffect } from "react";
import {
  getCategoriesByParentId,
  getLevel1Categories,
} from "../../../service/product/api";

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
          Product Category
        </label>
        <select
          id="productCategory"
          {...register("categoryIds")}
          className={`border-2 2 p-2 rounded-lg my-2 font-semibold ${
            errors.categoryIds ? "border-red-500" : "2"
          }`}
          value={selectedCategory}
          onChange={handleCategoryChange}
        >
          <option value="">Select a category</option>
          {categories.map((cate) => (
            <option key={cate.id} value={cate.id}>
              {cate.name}
            </option>
          ))}
        </select>
        {errors?.categoryIds && (
          <div className="flex items-center">
            <i
              className="text-red-500 fa fa-exclamation-circle"
              aria-hidden="true"
            ></i>

            <p className="px-2 leading-normal text-red-500 font-nunito text-md">
              {errors.categoryIds?.message}
            </p>
          </div>
        )}

        <label htmlFor="subCategoryIds" className="font-semibold text-gray-500">
          Product Subcategory
        </label>
        <select
          id="productSubcategory"
          {...register("subCategoryIds")}
          className={`border-2 2 p-2 rounded-lg my-2 font-semibold ${
            errors.subCategoryIds ? "border-red-500" : "2"
          }`}
          value={selectedSubcategory}
          onChange={handleSubcategoryChange}
          disabled={!selectedCategory}
        >
          <option value="">Select a subcategory</option>
          {subcategories.map((sub) => (
            <option key={sub.id} value={sub.id}>
              {sub.name}
            </option>
          ))}
        </select>
        {errors?.subCategoryIds && (
          <div className="flex items-center">
            <i
              className="text-red-500 fa fa-exclamation-circle"
              aria-hidden="true"
            ></i>

            <p className="px-2 leading-normal text-red-500 font-nunito text-md">
              {errors.subCategoryIds?.message}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductCategory;
