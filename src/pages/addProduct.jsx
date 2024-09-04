import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { set, useForm } from "react-hook-form";
import * as yup from "yup";
import axios from "axios";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { yupResolver } from "@hookform/resolvers/yup";
import SideBar from "../components/sideBar";
import { Button, colors } from "@mui/material";
import {
  getAllCategories,
  getLevel1Categories,
  getCategoriesByParentId,
  postProduct,
} from "../service/product/api";

import ImageModal from "../components/imageModal";
import PopUp from "../components/popUp";

function AddProduct() {
  //Validation schema
  const schema = yup
    .object({
      name: yup.string().required("Title is required"),
      // .min(5, "Tên phải có ít nhất 5 ký tự")
      // .max(120, "Tên không được vượt quá 120 ký tự"),
      description: yup
        .string()
        .required("Description is required")
        .min(200, "Description must be at least 200 characters")
        .max(1000, "Description must be less than 1000 characters"),
      categoryIds: yup.string().required("Please select a category"),
      subCategoryIds: yup.string().required("Please select a category"),
      quantityAvailable: yup
        .number()
        .required("Quantity is required")
        .typeError("Quantity must be a numb er")
        .positive("Quantity must be a positive number")
        .max(9999, "Number must be less than 9999")
        .required("Number of items is required"),
      originalPrice: yup
        .number()
        .typeError("Price must be a number")
        .positive("Price must be a positive number")
        .required("Price is required"),
      sellingPrice: yup
        .number()
        .typeError("Price must be a number")
        .positive("Price must be a positive number")
        .required("Price is required"),
      // images: yup.array().of(yup.string().required("Please upload an image")),
    })
    .required();

  // useForm
  const {
    trigger,
    formState,
    setError,
    clearErrors,
    setValue,
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

  // Handle validation
  const [fileError, setFileError] = useState("");

  const handleChangeName = (event) => {
    if (event.target.value.length < 5) {
      setError("name", {
        type: "manual",
        message: "Minimum 5 characters required",
      });
    } else if (event.target.value.length > 120) {
      setError("name", {
        type: "manual",
        message: "Maximum 120 characters allowed",
      });
    } else if (
      event.target.value.length === 120 &&
      event.key !== "Backspace" &&
      event.key !== "Delete"
    ) {
      setError("name", {
        type: "manual",
        message: "Maximum 120 characters allowed",
      });
    } else {
      setValue("name", event.target.value);
      clearErrors("name");
    }
    if (event.target.value.length === 0) {
      setError("name", {
        type: "manual",
        message: "Name is not allowed to be empty",
      });
    }
  };

  const handleChangeDescription = (event) => {
    const description = event.target.value.trim();
    if (description.length === 0) {
      setError("description", {
        type: "manual",
        message: "Description is not allowed to be empty",
      });
    } else if (description.length < 200) {
      setError("description", {
        type: "manual",
        message: "Minimum 200 characters required",
      });
    } else if (
      description.length === 1000 &&
      event.key !== "Backspace" &&
      event.key !== "Delete"
    ) {
      setError("description", {
        type: "manual",
        message: "Maximum 1000 characters allowed",
      });
    } else {
      setDescriptionValue(description);
      clearErrors("description");
    }
    trigger("description");
  };

  const handleFractionInput = (e) => {
    const value = e.target.value;
    const floatValue = parseFloat(value);
    if (isNaN(floatValue)) {
      e.target.value = "";
    } else if (
      floatValue.toString().split(".")[1] &&
      floatValue.toString().split(".")[1].length > 2
    ) {
      e.target.value = floatValue.toFixed(2);
    }
  };

  // Upload file txt
  const handleFileUpload = (e) => {
    const textFile = e.target.files[0];
    if (textFile) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const text = event.target.result;
        const wordCount = text.split(/\s+/).length;
        console.log("Word count:", wordCount);

        if (wordCount > 1000) {
          setFileError(
            "The file contains more than 1000 words. Please upload a smaller file."
          );
          setDescriptionValue("");
        } else {
          setFileError("");
          setDescriptionValue(text);
        }
      };
      reader.readAsText(textFile);
    }
  };

  // ReactQuill
  const [descriptionValue, setDescriptionValue] = useState("");
  const modules = {
    toolbar: [
      ["bold", "italic", "underline"],
      [{ list: "ordered" }, { list: "bullet" }],
    ],
  };

  const handleQuillChange = (name, value) => {
    setValue(name, value, { shouldValidate: true });
  };

  // Handel Category
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

  // Handle Product Button
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const [discardButton, setDiscardButton] = useState(false);
  const handleDiscardButton = () => {
    setDiscardButton(!discardButton);
  };

  // Handel Shipping
  const [selectedValue, setSelectedValue] = useState("");

  const handleChange = (event) => {
    setSelectedValue(event.target.value);
  };

  // Handel Duplicate Name
  const [isNameDuplicate, setIsNameDuplicate] = useState(false);

  const duplicateName = async (event) => {
    const name = event.target.value;

    const response = await fetch(
      `https://neo4j-ecommerce.onrender.com/api/v1/products/exists?name=${name}`
    );
    const data = await response.json();
    console.log("data name", data.data);

    if (data.data === true) {
      setIsNameDuplicate(true);
    } else {
      setIsNameDuplicate(false);
    }
  };

  // Handle Image

  const [selectedImages, setSelectedImages] = useState([]);
  const [selectedFiles, setSelectedFiles] = useState([]);

  const [replaceIndex, setReplaceIndex] = useState(null);

  const [showModal, setShowModal] = useState(false);

  const onSelectFile = (e) => {
    const selectedFile = e.target.files;
    setSelectedFiles(selectedFile);

    console.log("selectedFile", selectedFile);

    const selectedFilesArray = Array.from(selectedFile).map((file) =>
      URL.createObjectURL(file)
    );

    setSelectedImages((prevImages) => {
      const newImages = [...prevImages, ...selectedFilesArray].slice(0, 10);
      return newImages;
    });
  };

  const removeImage = () => {
    setSelectedImages((prevImages) => prevImages.slice(1));
    // setSelectedFiles((prevFiles) => prevFiles.slice(1));

    const [fst, ...remain] = selectedFiles;
    // const files = selectedFiles.slice(1);
    setSelectedFiles(remain);

    console.log("selectedFiles Remove", selectedFiles);
  };

  const replaceImage = (newImageUrl, updatedImageList, updatedFileList) => {
    // setSelectedImages((prevImages) =>
    //   prevImages.map((img, index) =>
    //     index === replaceIndex ? newImageUrl : img
    //   )
    // );
    setSelectedImages(updatedImageList);
    setSelectedFiles(updatedFileList);
    // setSelectedFiles(updatedImageList);
    console.log("updatedImageList", updatedImageList);
    console.log("updatedFileList", updatedFileList);

    setShowModal(false);

    console.log("selectedFiles replace", selectedFiles);
  };

  const handleReplace = (index) => {
    setReplaceIndex(index);
    setShowModal(true);
  };

  // Handle submit
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

  const isFormValid = formState.isValid;
  console.log("isFormValid", isFormValid);

  return (
    <div id="add-product" className="my-16 mr-12">
      <div id="add-prd-header" className="flex gap-6">
        <button
          className="border-2 border-gray-200 px-5 py-1 rounded-md text-gray-500 hover:bg-gray-200 hover:text-white"
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
        <div id="add-prd-body" className="flex my-4 gap-2">
          <div className="w-1/2 m-3">
            {/* Descriptiom */}
            <p className="text-xl font-semibold">Description</p>
            <div
              id="productDescription"
              className="flex flex-col h-[280px] my-3 p-4 border border-gray-200 py-2 rounded-md "
            >
              <label htmlFor="name" className="text-gray-500 font-semibold">
                Product Name
              </label>
              <input
                {...register("name", { required: true })}
                type="text"
                id="name"
                maxLength={120}
                onChange={handleChangeName}
                onBlur={duplicateName}
                className={`border-2 2 p-2 rounded-lg my-2 text-ellipsis ${
                  errors.name || isNameDuplicate ? "border-red-500" : "2"
                }`}
              />
              {isNameDuplicate && (
                <p className="text-red-500">Product already exist</p>
              )}

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

              <div className="flex justify-between">
                <label
                  htmlFor="description"
                  className="text-gray-500 font-semibold"
                >
                  Business description
                </label>

                <label
                  htmlFor="textFile"
                  className="cursor-pointer text-blue-400"
                >
                  <i class="fa-solid fa-arrow-up-from-bracket"></i>
                  <span className="ml-2 font-semibold text-sm">
                    Upload .txt file
                  </span>
                  <input
                    id="textFile"
                    name="textFile"
                    type="file"
                    accept=".txt"
                    onChange={handleFileUpload}
                    className="hidden"
                  />
                </label>
                {fileError && <p className="text-red-600">{fileError}</p>}
              </div>

              <ReactQuill
                className="h-[90px] my-2 relative"
                theme="snow"
                id="description"
                name="description"
                value={descriptionValue}
                onChange={(value) => {
                  setDescriptionValue(value);
                  handleChangeDescription;
                  handleQuillChange("description", value);
                }}
                modules={modules}
              />

              {errors?.description && (
                <div className="flex items-center mt-9 text-sm">
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
            <div
              id="productCategory"
              className="flex flex-col my-3 p-4 border 2 py-2 rounded-md"
            >
              <label
                htmlFor="categoryIds"
                className="text-gray-500 font-semibold"
              >
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
            <div
              id="productInventory"
              className="flex gap-4 my-3 p-4 border 2 py-2 rounded-md"
            >
              <div className="flex flex-col w-1/3">
                <label
                  htmlFor="quantityAvailable"
                  className="text-gray-500 font-semibold"
                >
                  Quantity
                </label>
                <input
                  type="number"
                  step="1"
                  onKeyPress={(e) => {
                    if (e.key === "." || e.key === "," || e.key === "-") {
                      e.preventDefault();
                    }
                  }}
                  id="quantityAvailable"
                  {...register("quantityAvailable")}
                  className={`border-2 2 p-2 rounded-lg my-2 ${
                    errors.quantityAvailable ? "border-red-500" : "2"
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
                  className="border-2 2 p-2 rounded-lg my-2"
                />
              </div>
            </div>

            <p className="text-xl font-semibold mt-7">Selling Type</p>
            <div
              id="productSellType"
              className="flex flex-col my-3 p-4 border 2 py-2 rounded-md font-semibold"
            >
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

            <p className="text-xl font-semibold mt-7">Variant</p>
            <div className="flex justify-between my-3 p-4 border 2 rounded-md font-semibold">
              <span>Product Variants</span>
              <span className="text-blue-700 hover:text-gray-500 cursor-pointer">
                + Add Variant
              </span>
            </div>
          </div>

          <div className="w-1/2 m-3">
            <p className="text-xl font-semibold">Product Image</p>
            <div
              id="productImage"
              className="w-full h-[200px] flex items-center justify-between gap-3 my-3 px-6 border 2 py-4 rounded-md"
            >
              <label
                className={`border-2 border-dashed border-blue-400 cursor-pointer 2 rounded-md flex items-center justify-center h-[160px] ${
                  selectedImages.length > 1 ? "w-1/3" : "w-full"
                } ${selectedImages.length === 1 ? "w-1/2 " : ""}`}
              >
                <div className="flex flex-col gap-5 text-center text-gray-500 items-center">
                  <i class="fa-solid fa-xl fa-images"></i>
                  <span className="text-gray-500 px-2">
                    <span className="text-blue-400 underline font-semibold">
                      Click to upload
                    </span>{" "}
                    or drag and drop
                  </span>
                </div>
                <input
                  type="file"
                  name="images"
                  multiple
                  accept="image/png, image/jpg, image/jpeg"
                  className="hidden"
                  {...register("images", { onChange: onSelectFile })}
                />
              </label>

              {selectedImages.length > 0 && (
                <div
                  className={`${
                    selectedImages.length === 1 ? "w-full" : "w-2/3"
                  } h-[160px] grid grid-cols-2 gap-1 `}
                >
                  {selectedImages.slice(0, 3).map((image, index) => (
                    <div
                      key={index}
                      className={`relative group ${
                        index === 0 ? "row-span-2" : ""
                      } ${
                        selectedImages.length === 1 ? "col-span-2" : "w-full"
                      } ${
                        selectedImages.length >= 3 && index > 0
                          ? "h-[80px]"
                          : "h-[160px]"
                      }`}
                    >
                      <img
                        src={image}
                        className="w-full h-full object-cover rounded-md"
                      />
                      {index === 0 && (
                        <div className="absolute inset-0 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 group-hover:bg-black group-hover:bg-opacity-60">
                          <button
                            type="button"
                            onClick={() => handleReplace(index)}
                            className="bg-white py-1 px-2 m-1 text-sm text-black rounded-md hover:bg-gray-200"
                          >
                            Replace
                          </button>
                          <button
                            type="button"
                            onClick={() => removeImage(index)}
                            className="bg-white py-1 px-2 m-1 text-sm text-black rounded-md hover:bg-gray-200"
                          >
                            Remove
                          </button>
                        </div>
                      )}
                      {index === 2 && selectedImages.length > 3 && (
                        <div
                          className="absolute inset-0 flex items-center justify-center bg-gray-500 bg-opacity-60 text-white text-xl font-bold cursor-pointer"
                          onClick={() => handleReplace(index)}
                        >
                          +{selectedImages.length - 3}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}

              {showModal && (
                <ImageModal
                  files={selectedFiles}
                  images={selectedImages}
                  onClose={() => setShowModal(false)}
                  onSelect={replaceImage}
                />
              )}
            </div>

            <p className="text-xl font-semibold">Shipping and Delivery</p>
            <div
              id="productDelivery"
              className="flex flex-col my-3 p-4 border 2 py-2 rounded-md"
            >
              <label htmlFor="weight" className="text-gray-500 font-semibold">
                Items weight
              </label>
              <div className="border-2 2 p-2 rounded-lg my-2 flex flex-nowrap">
                <input
                  onInput={handleFractionInput}
                  type="number"
                  step="0.01"
                  id="weight"
                  {...register("weight")}
                  className="outline-none w-[90%]"
                />
                <select
                  id="unitWeight"
                  // onInput={handleFractionInput}
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
                <div className="flex flex-col w-[30%] ">
                  <label
                    htmlFor="length"
                    className="text-gray-500 font-semibold"
                  >
                    Length
                  </label>
                  <div className="border-2 2 p-1 rounded-lg my-2  flex flex-nowrap">
                    <input
                      onInput={handleFractionInput}
                      type="number"
                      step="0.01"
                      id="length"
                      {...register("length")}
                      className="outline-none ml-2 py-1 w-[70%]"
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
                  <div className="border-2 2 p-1 rounded-lg my-2  flex flex-nowrap">
                    <input
                      onInput={handleFractionInput}
                      type="number"
                      step="0.01"
                      id="breadth"
                      {...register("breadth")}
                      className="outline-none ml-2 py-1 w-[70%]"
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
                  <div className="border-2 2 p-1 rounded-lg my-2  flex flex-nowrap">
                    <input
                      onInput={handleFractionInput}
                      type="number"
                      step="0.01"
                      id="width"
                      {...register("width")}
                      className="outline-none ml-2 py-1 w-[70%]"
                    />
                    <span className="float-right py-1">
                      {selectedValue || "in"}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <p className="text-xl font-semibold mt-7">Pricing</p>
            <div
              id="productPricing"
              className="flex flex-col my-3 p-4 border 2 py-2 rounded-md"
            >
              <div className="flex gap-4">
                <div className="flex flex-col w-1/2">
                  <label
                    htmlFor="originalPrice"
                    className="text-gray-500 font-semibold"
                  >
                    MSRP Price
                  </label>

                  <div
                    className={`border-2 2 p-1 rounded-lg my-2 flex items-center  ${
                      errors.originalPrice ? "border-red-500" : "2"
                    }`}
                  >
                    <i
                      className="fa fa-usd bg-gray-200 py-2 px-3 rounded-sm"
                      aria-hidden="true"
                    ></i>
                    <input
                      onInput={handleFractionInput}
                      type="number"
                      step="0.01"
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
                <div className="flex flex-col w-1/2 ">
                  <label
                    htmlFor="discountedPrice"
                    className="text-gray-500 font-semibold"
                  >
                    Sale Price
                  </label>
                  <div
                    className={`border-2 2 p-1 rounded-lg my-2 flex items-center  ${
                      errors.discountedPrice ? "border-red-500" : "2"
                    }`}
                  >
                    <i
                      className="fa fa-usd bg-gray-200 py-2 px-3 rounded-sm"
                      aria-hidden="true"
                    ></i>
                    <input
                      onInput={handleFractionInput}
                      type="number"
                      step="0.01"
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
                className={`border-2 2 p-1 rounded-lg my-2 flex items-center  ${
                  errors.sellingPrice ? "border-red-500" : "2"
                }`}
              >
                <i
                  className="fa fa-usd bg-gray-200 py-2 px-3 rounded-sm"
                  aria-hidden="true"
                ></i>
                <input
                  onInput={handleFractionInput}
                  type="number"
                  step="0.01"
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

            <div id="add-prd-button" className="flex justify-between mt-5">
              <button
                type="button"
                className="border-2 2 rounded-lg p-3 font-semibold hover:bg-gray-300 hover:text-white"
                onClick={handleDiscardButton}
              >
                Discard
              </button>
              <button
                type="submit"
                disabled={!isFormValid}
                className={`border-2 ${
                  isFormValid
                    ? loading
                      ? "bg-gray-300 text-white"
                      : "bg-blue-700 text-white"
                    : "bg-gray-300 text-white"
                } rounded-lg p-3 font-semibold`}
              >
                {loading ? "Loading..." : "Add Product"}
              </button>

              {discardButton && (
                <PopUp
                  title="Do you want to discard this product?"
                  rightButton="Discard"
                  onCancel={handleDiscardButton}
                  onDiscard={() => navigate("/")}
                />
              )}
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}

export default AddProduct;
