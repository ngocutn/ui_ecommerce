import * as yup from "yup";

export const schema = yup.object({
  name: yup.string().required("Name is not allowed to be empty"),
  brandName: yup.string().required("Brand Name is not allowed to be empty"),
  description: yup
    .string()
    .required("Description is required")
    .min(200, "Description must be at least 200 characters")
    .max(1000, "Description must be less than 1000 characters"),
  categoryIds: yup.string().required("Please select a category"),
  quantityAvailable: yup
    .number()
    .when("checked", {
      is: false,
      then: yup.number().required("Quantity available is required"),
      otherwise: yup.number().notRequired(),
    })
    .required("Quantity is required")
    .typeError("Quantity must be a number")
    .positive("Quantity must be a positive number")
    .max(9999, "Number must be less than 9999")
    .required("Number of items is required"),
  originalPrice: yup
    .number()
    .when("checked", {
      is: false,
      then: yup.number().required("Selling price is required"),
      otherwise: yup.number().notRequired(),
    })
    .required("Price is required")
    .typeError("Price must be a number")
    .positive("Price must be a positive number"),
  sellingPrice: yup
    .number()
    .when("checked", {
      is: false,
      then: yup.number().required("Original price is required"),
      otherwise: yup.number().notRequired(),
    })
    .typeError("Price must be a number")
    .positive("Price must be a positive number")
    .required("Price is required"),
  sku: yup.string().required("Please enter sku"),
  discountedPrice: yup.number().when("checked", {
    is: false,
    then: yup.number().required("Discounted price is required"),
    otherwise: yup.number().notRequired(),
  }),
  images: yup.array().of(yup.string().required("Please upload an image")),
  specification: yup.array().of(yup.string()),
});
