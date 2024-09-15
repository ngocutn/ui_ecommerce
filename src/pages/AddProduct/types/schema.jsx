import * as yup from "yup";

export const schema = yup
  .object({
    name: yup
      .string()
      .required("Name is not allowed to be empty")
      .min(5, "Minimum 5 characters required")
      .max(120, "Maximum 120 characters allowed"),
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
      .typeError("Quantity must be a number")
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
