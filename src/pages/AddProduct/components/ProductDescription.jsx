import { Controller, set, useFormContext } from "react-hook-form";
import { useEffect, useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import TextField from "@mui/material/TextField";
import {
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { GetAllBrandName } from "../../../store/slice/brandNameSlice";

const ProductDescription = () => {
  const {
    register,
    trigger,
    setError,
    setValue,
    clearErrors,
    control,
    formState: { errors },
  } = useFormContext();

  const [fileError, setFileError] = useState("");
  const dispatch = useDispatch();
  const { error, brandName: brandNameData } = useSelector(
    (state) => state.brandName
  );

  useEffect(() => {
    if (error) {
      console.log("api", error);
    }

    dispatch(GetAllBrandName());
  }, []);

  console.log("brandName", brandNameData);

  const handleChangeName = (event) => {
    const trimmedValue = event.target.value.replace(/\s\s+/g, " ");

    if (trimmedValue.length < 5) {
      setError("name", {
        type: "manual",
        message: "Minimum 5 characters required",
      });
    } else if (trimmedValue.length > 120) {
      setError("name", {
        type: "manual",
        message: "Maximum 120 characters allowed",
      });
    } else if (
      trimmedValue.length === 120 &&
      event.key !== "Backspace" &&
      event.key !== "Delete"
    ) {
      setError("name", {
        type: "manual",
        message: "Maximum 120 characters allowed",
      });
    } else {
      setValue("name", trimmedValue);
      clearErrors("name");
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

  // Upload file txt
  const handleFileUpload = (e) => {
    const textFile = e.target.files[0];
    if (textFile) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const text = event.target.result;
        const wordCount = text.split("").length;

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

  const [isNameDuplicate, setIsNameDuplicate] = useState(false);

  const duplicateName = async (event) => {
    const name = event.target.value;

    const response = await fetch(
      `https://neo4j-ecommerce.onrender.com/api/v1/products/exists?name=${name}`
    );
    const data = await response.json();

    if (data.data === true) {
      setIsNameDuplicate(true);
      setError("name", {
        type: "manual",
        message: "Product already exist",
      });
    } else {
      setIsNameDuplicate(false);
    }
  };

  return (
    <>
      <p className="text-xl font-semibold">Description</p>
      <div
        id="productDescription"
        className="flex flex-col my-3 p-4 border border-gray-200 py-2 rounded-md max-h-[500px]"
      >
        <label htmlFor="name" className="font-semibold text-gray-500">
          Product Name <span className="text-red-600">*</span>
        </label>
        <TextField
          {...register("name")}
          id="name"
          error={!!errors.name}
          size="small"
          helperText={
            errors.name && (
              <span>
                <i
                  className="text-red-500 fa fa-exclamation-circle"
                  aria-hidden="true"
                ></i>
                {` ${errors.name?.message}`}
              </span>
            )
          }
          inputProps={{ maxLength: 120 }}
          onBlur={(duplicateName, handleChangeName)}
          className="py-2 rounded-lg text-ellipsis"
        ></TextField>

        <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
          <label htmlFor="brandName" className="font-semibold text-gray-500">
            Brand Name <span className="text-red-600">*</span>
          </label>
          <Controller
            name="brandName" // Name for the form field
            control={control} // Pass control to the Controller
            defaultValue="" // Default value for the select
            render={({ field }) => (
              <Select
                id="productCategory"
                className="my-2 font-semibold rounded-lg "
                displayEmpty
                size="small"
                {...field} // Spread the field properties
              >
                {brandNameData.data?.map((brand) => (
                  <MenuItem key={brand.id} value={brand.name}>
                    <em>{brand.name}</em>
                  </MenuItem>
                ))}
              </Select>
            )}
          />
          <FormHelperText className="text-red-600">
            {errors.brandName?.message}
          </FormHelperText>
        </FormControl>

        <div className="flex justify-between mt-2">
          <label htmlFor="description" className="font-semibold text-gray-500">
            Business description <span className="text-red-600">*</span>
          </label>

          <label htmlFor="textFile" className="text-blue-400 cursor-pointer">
            <i className="fa-solid fa-arrow-up-from-bracket"></i>
            <span className="ml-2 text-sm font-semibold">Upload .txt file</span>
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
          className="my-2 relative"
          style={{ maxHeight: 643, overflowY: "auto" }}
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
          <div className="flex items-center justify-start text-sm gap-x-2">
            <i
              className="text-red-500 fa fa-exclamation-circle"
              aria-hidden="true"
            ></i>

            <p className="leading-normal text-red-500 font-nunito text-md">
              {errors.description?.message}
            </p>
          </div>
        )}
      </div>
    </>
  );
};

export default ProductDescription;
