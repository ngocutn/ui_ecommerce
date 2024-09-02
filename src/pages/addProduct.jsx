import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { set, useForm } from "react-hook-form";
import * as yup from "yup";
import axios from "axios";

import { yupResolver } from "@hookform/resolvers/yup";
import SideBar from "../components/sideBar";
import { Button, colors } from "@mui/material";
import {
  getAllCategories,
  getLevel1Categories,
  getCategoriesByParentId,
  postProduct,
} from "../service/product/api";

function AddProduct() {
  const schema = yup
    .object({
      name: yup
        .string()
        .required("Tiêu đề không được để trống")
        .min(5, "Tên phải có ít nhất 5 ký tự")
        .max(120, "Tên không được vượt quá 120 ký tự"),
      description: yup
        .string()
        .required("Mô tả không được để trống")
        .min(200, "Mô tả phải có ít nhất 200 ký tự")
        .max(1000, "Mô tả không được vượt quá 1000 ký tự"),
      categoryIds: yup.string().required("Please select a category"),
      subCategoryIds: yup.string().required("Please select a category"),
      quantityAvailable: yup
        .number()
        .typeError("Price must be a number")
        .positive("Price must be a positive number")
        .required("Số lượng là bắt buộc")
        .max(9999, "Giá trị cao nhất là 9999")
        .required("Số lượng là bắt buộc"),
      originalPrice: yup
        .number()
        .typeError("Price must be a number")
        .positive("Price must be a positive number")
        .required("Giá gốc là bắt buộc"),
      sellingPrice: yup
        .number()
        .typeError("Price must be a number")
        .positive("Price must be a positive number")
        .required("Giá bán là bắt buộc"),
    })

    .required();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    mode: "onChange",
    defaultValues: {
      sellingType: "STORE",
    },
  });

  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [subcategories, setSubcategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedSubcategory, setSelectedSubcategory] = useState("");
  const [selectedValue, setSelectedValue] = useState("");

  const [discardButton, setDiscardButton] = useState(false);

  const handleDiscardButton = () => {
    setDiscardButton(!discardButton);
  };

  const handleChange = (event) => {
    setSelectedValue(event.target.value);
  };

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

  const handleSubcategoryChange = (event) => {
    setSelectedSubcategory(event.target.value);
  };

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
      ...otherFields
    } = data;

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

    console.log(request);

    const formData = new FormData();
    const jsonBlob = new Blob([JSON.stringify(request)], {
      type: "application/json",
    });
    formData.append("request", jsonBlob);

    return axios({
      method: "post",
      url: `https://neo4j-ecommerce.onrender.com/api/v1/products`,
      data: formData,
    }).then((res) => {
      console.log("res in onSubmit", res);
    });
  };

  return (
    <div id="add-product" className="my-16 mr-12">
      <div className="flex gap-7">
        <button
          className="border border-gray-400 px-4 py-1 rounded-md text-gray-400 hover:bg-gray-400 hover:text-white"
          onClick={handleDiscardButton}
        >
          <i className="fa fa-long-arrow-left" aria-hidden="true"></i>
        </button>
        <div>
          <p className="text-gray-500 font-semibold">Back to product list</p>
          <p className="text-2xl font-bold">Add new product</p>
        </div>
      </div>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex my-4">
          <div className="w-1/2 m-3">
            <p className="text-xl font-semibold">Description</p>
            <div className="flex flex-col my-3 p-4 border-2 border-gray-300 py-2 rounded-md ">
              <label htmlFor="name" className="text-gray-500 font-semibold">
                Product Name
              </label>
              <input
                type="text"
                id="name"
                {...register("name")}
                className={`border-2 border-gray-300 p-2 rounded-lg my-2 text-ellipsis ${
                  errors.name ? "border-red-500" : "border-gray-300"
                }`}
              />
              {errors?.name && (
                <div className="flex items-center">
                  <i
                    class="fa fa-exclamation-circle text-red-500"
                    aria-hidden="true"
                  ></i>

                  <p className="px-2 font-nunito text-md leading-normal text-red-500">
                    {errors.name?.message}
                  </p>
                </div>
              )}

              <label
                htmlFor="description"
                className="text-gray-500 font-semibold"
              >
                Business description
              </label>
              <textarea
                id="description"
                {...register("description")}
                className={`border-2 border-gray-300 p-2 rounded-lg my-2 ${
                  errors.description ? "border-red-500" : "border-gray-300"
                }`}
              />
              {errors?.description && (
                <div className="flex items-center">
                  <i
                    class="fa fa-exclamation-circle text-red-500"
                    aria-hidden="true"
                  ></i>

                  <p className="px-2 font-nunito text-md leading-normal text-red-500">
                    {errors.description?.message}
                  </p>
                </div>
              )}
            </div>

            <p className="text-xl font-semibold mt-7">Category</p>
            <div className="flex flex-col my-3 p-4 border-2 border-gray-300 py-2 rounded-md">
              <label
                htmlFor="categoryIds"
                className="text-gray-500 font-semibold"
              >
                Product Category
              </label>
              <select
                id="productCategory"
                {...register("categoryIds")}
                className={`border-2 border-gray-300 p-2 rounded-lg my-2 font-semibold ${
                  errors.categoryIds ? "border-red-500" : "border-gray-300"
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
                    class="fa fa-exclamation-circle text-red-500"
                    aria-hidden="true"
                  ></i>

                  <p className="px-2 font-nunito text-md leading-normal text-red-500">
                    {errors.categoryIds?.message}
                  </p>
                </div>
              )}

              <label
                htmlFor="subCategoryIds"
                className="text-gray-500 font-semibold"
              >
                Product Subcategory
              </label>
              <select
                id="productSubcategory"
                {...register("subCategoryIds")}
                className={`border-2 border-gray-300 p-2 rounded-lg my-2 font-semibold ${
                  errors.subCategoryIds ? "border-red-500" : "border-gray-300"
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
                    class="fa fa-exclamation-circle text-red-500"
                    aria-hidden="true"
                  ></i>

                  <p className="px-2 font-nunito text-md leading-normal text-red-500">
                    {errors.subCategoryIds?.message}
                  </p>
                </div>
              )}
            </div>

            <p className="text-xl font-semibold mt-7">Inventory</p>
            <div className="flex gap-4 my-3 p-4 border-2 border-gray-300 py-2 rounded-md">
              <div className="flex flex-col w-1/3">
                <label
                  htmlFor="quantityAvailable"
                  className="text-gray-500 font-semibold"
                >
                  Quantity
                </label>
                <input
                  type="number"
                  id="quantityAvailable"
                  {...register("quantityAvailable")}
                  className={`border-2 border-gray-300 p-2 rounded-lg my-2 ${
                    errors.quantityAvailable
                      ? "border-red-500"
                      : "border-gray-300"
                  }`}
                />
                {errors?.quantityAvailable && (
                  <div className="flex items-center">
                    <i
                      class="fa fa-exclamation-circle text-red-500"
                      aria-hidden="true"
                    ></i>

                    <p className="px-2 font-nunito text-md leading-normal text-red-500">
                      {errors.quantityAvailable?.message}
                    </p>
                  </div>
                )}
              </div>
              <div className="flex flex-col w-2/3">
                <label htmlFor="SKU" className="text-gray-500 font-semibold">
                  SKU (Optional)
                </label>
                <input
                  type="text"
                  id="SKU"
                  {...register("SKU")}
                  className="border-2 border-gray-300 p-2 rounded-lg my-2"
                />
              </div>
            </div>

            <p className="text-xl font-semibold mt-7">Selling Type</p>
            <div className="flex flex-col my-3 p-4 border-2 border-gray-300 py-2 rounded-md font-semibold">
              <label htmlFor="sellingType" className="my-1">
                <input
                  type="radio"
                  id="storeSelling"
                  {...register("sellingType")}
                  value="STORE"
                />
                <span className="ml-2">In-store selling only</span>
              </label>
              <label className="my-1">
                <input
                  type="radio"
                  id="onlineSelling"
                  {...register("sellingType")}
                  value="ONLINE"
                />
                <span className="ml-2">Online selling only</span>
              </label>
              <label className="my-1">
                <input
                  type="radio"
                  id="bothSelling"
                  {...register("sellingType")}
                  value="BOTH"
                />
                <span className="ml-2">Available both in-store and online</span>
              </label>
            </div>

            <p className="text-xl font-semibold">Variant</p>
            <div className="flex justify-between my-3 p-4 border-2 border-gray-300 rounded-md font-semibold">
              <span>Product Variants</span>
              <span className="text-blue-700 hover:text-gray-500 cursor-pointer">
                + Add Variant
              </span>
            </div>
          </div>

          <div className="w-1/2 m-3">
            <p className="text-xl font-semibold">Shipping and Delivery</p>
            <div className="flex flex-col my-3 p-4 border-2 border-gray-300 py-2 rounded-md">
              <label htmlFor="weight" className="text-gray-500 font-semibold">
                Items weight
              </label>
              <div className="border-2 border-gray-300 p-2 rounded-lg my-2">
                <input
                  type="number"
                  id="weight"
                  {...register("weight")}
                  className="outline-none w-[90%]"
                />
                <select
                  id="unitWeight"
                  {...register("unitWeight")}
                  className="float-right outline-none"
                >
                  <option value="kg">kg</option>
                  <option value="pound">Ibs</option>
                </select>
              </div>
              <div className="flex justify-between">
                <label className="font-semibold my-3">Package Size</label>
                <select
                  id="packageUnit"
                  {...register("packageUnit")}
                  className="outline-none"
                  value={selectedValue}
                  onChange={handleChange}
                >
                  <option value="inch">in</option>
                  <option value="met">m</option>
                  <option value="cm">cm</option>
                </select>
              </div>
              <div className="flex justify-between">
                <div className="flex flex-col w-[30%]">
                  <label
                    htmlFor="length"
                    className="text-gray-500 font-semibold"
                  >
                    Length
                  </label>
                  <div className="border-2 border-gray-300 p-1 rounded-lg my-2">
                    <input
                      type="number"
                      id="length"
                      {...register("length")}
                      className="outline-none ml-2 py-1 w-[80%]"
                    />
                    <span className="float-right py-1">
                      {selectedValue || "in"}
                    </span>
                  </div>
                </div>
                <div className="flex flex-col w-[30%]">
                  <label
                    htmlFor="breadth"
                    className="text-gray-500 font-semibold"
                  >
                    Breadth
                  </label>
                  <div className="border-2 border-gray-300 p-1 rounded-lg my-2">
                    <input
                      type="number"
                      id="breadth"
                      {...register("breadth")}
                      className="outline-none ml-2 py-1 w-[80%]"
                    />
                    <span className="float-right py-1">
                      {selectedValue || "in"}
                    </span>
                  </div>
                </div>
                <div className="flex flex-col w-[30%]">
                  <label
                    htmlFor="width"
                    className="text-gray-500 font-semibold"
                  >
                    Width
                  </label>
                  <div className="border-2 border-gray-300 p-1 rounded-lg my-2">
                    <input
                      type="number"
                      id="width"
                      {...register("width")}
                      className="outline-none ml-2 py-1 w-[80%]"
                    />
                    <span className="float-right py-1">
                      {selectedValue || "in"}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <p className="text-xl font-semibold mt-7">Pricing</p>
            <div className="flex flex-col my-3 p-4 border-2 border-gray-300 py-2 rounded-md">
              <div className="flex gap-4">
                <div className="flex flex-col w-1/2">
                  <label
                    htmlFor="originalPrice"
                    className="text-gray-500 font-semibold"
                  >
                    MSRP Price
                  </label>
                  <div
                    className={`border-2 border-gray-300 p-1 rounded-lg my-2  ${
                      errors.originalPrice
                        ? "border-red-500"
                        : "border-gray-300"
                    }`}
                  >
                    <i
                      className="fa fa-usd bg-gray-200 py-2 px-3 rounded-sm"
                      aria-hidden="true"
                    ></i>
                    <input
                      type="number"
                      id="originalPrice"
                      {...register("originalPrice")}
                      className="outline-none ml-2 w-[80%]"
                    />
                  </div>
                  {errors?.originalPrice && (
                    <div className="flex items-center">
                      <i
                        class="fa fa-exclamation-circle text-red-500"
                        aria-hidden="true"
                      ></i>

                      <p className="px-2 font-nunito text-md leading-normal text-red-500">
                        {errors.originalPrice?.message}
                      </p>
                    </div>
                  )}
                </div>
                <div className="flex flex-col w-1/2">
                  <label
                    htmlFor="discountedPrice"
                    className="text-gray-500 font-semibold"
                  >
                    Sale Price
                  </label>
                  <div
                    // className="border-2 border-gray-300 p-1 rounded-lg my-2"
                    className={`border-2 border-gray-300 p-1 rounded-lg my-2  ${
                      errors.discountedPrice
                        ? "border-red-500"
                        : "border-gray-300"
                    }`}
                  >
                    <i
                      className="fa fa-usd bg-gray-200 py-2 px-3 rounded-sm"
                      aria-hidden="true"
                    ></i>
                    <input
                      type="number"
                      id="discountedPrice"
                      {...register("discountedPrice")}
                      className="outline-none ml-2 w-[80%]"
                    />
                  </div>
                  {errors?.discountedPrice && (
                    <div className="flex items-center">
                      <i
                        class="fa fa-exclamation-circle text-red-500"
                        aria-hidden="true"
                      ></i>

                      <p className="px-2 font-nunito text-md leading-normal text-red-500">
                        {errors.discountedPrice?.message}
                      </p>
                    </div>
                  )}
                </div>
              </div>
              <label
                htmlFor="sellingPrice"
                className="text-gray-500 font-semibold"
              >
                Price
              </label>
              <div
                className={`border-2 border-gray-300 p-1 rounded-lg my-2  ${
                  errors.sellingPrice ? "border-red-500" : "border-gray-300"
                }`}
              >
                <i
                  className="fa fa-usd bg-gray-200 py-2 px-3 rounded-sm"
                  aria-hidden="true"
                ></i>
                <input
                  type="number"
                  id="sellingPrice"
                  {...register("sellingPrice")}
                  className="outline-none ml-2 w-[90%]"
                />
              </div>
              {errors?.sellingPrice && (
                <div className="flex items-center">
                  <i
                    class="fa fa-exclamation-circle text-red-500"
                    aria-hidden="true"
                  ></i>

                  <p className="px-2 font-nunito text-md leading-normal text-red-500">
                    {errors.sellingPrice?.message}
                  </p>
                </div>
              )}
            </div>

            <div className="flex justify-between mt-5">
              <button
                type="button"
                className="border-2 border-gray-300 rounded-lg p-3 font-semibold hover:bg-gray-300 hover:text-white"
                onClick={handleDiscardButton}
              >
                Discard
              </button>
              <button
                type="submit"
                className="border-2 bg-blue-700 rounded-lg p-3 font-semibold hover:bg-gray-300 text-white"
              >
                Add Product
              </button>

              {discardButton && (
                <div className="fixed left-0 top-0 z-[2] flex h-full w-screen items-center justify-center overflow-hidden bg-black bg-opacity-30 shadow-custom">
                  <div className="h-auto w-[35%] rounded-xl bg-white px-[10px] py-[25px] border-2 border-blue-600 ">
                    <p className="text-center text-xl font-semibold leading-normal">
                      Do you want to discard this product?
                    </p>
                    <div className="flex justify-center mt-5 gap-6">
                      <button
                        type="button"
                        onClick={handleDiscardButton}
                        className="border-2 border-gray-300 rounded-lg p-3 font-semibold hover:bg-gray-300 hover:text-white"
                      >
                        Cancel
                      </button>
                      <button
                        type="button"
                        onClick={() => navigate("/")}
                        className="border-2 bg-blue-700 rounded-lg p-3 font-semibold hover:bg-gray-300 text-white"
                      >
                        Discard
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}

export default AddProduct;
