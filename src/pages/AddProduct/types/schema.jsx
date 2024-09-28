import * as yup from "yup";

// export const schema = yup.object({
//   name: yup.string().required("Name is not allowed to be empty"),
//   brandName: yup.string().required("Brand Name is not allowed to be empty"),
//   description: yup
//     .string()
//     .required("Description is required")
//     .min(200, "Description must be at least 200 characters")
//     .max(1000, "Description must be less than 1000 characters"),
//   categoryIds: yup.string().required("Please select a category"),
//   quantityAvailable: yup
//     .number()
//     .typeError("Quantity must be a number")
//     .positive("Quantity must be a positive number")
//     .max(9999, "Number must be less than 9999"),
//   originalPrice: yup
//     .number()
//     .typeError("Price must be a number")
//     .positive("Price must be a positive number"),
//   sellingPrice: yup
//     .number()
//     .typeError("Price must be a number")
//     .positive("Price must be a positive number"),
//   sku: yup.string(),
//   discountedPrice: yup.number().required(),
//   images: yup.array().of(yup.string().required("Please upload an image")),
//   specification: yup.array().of(yup.string()),
// });

export const schema = yup.object().shape({
  hasVariant: yup.boolean(),
  name: yup.string().required("Name is not allowed to be empty"),
  brandName: yup.string().required("Brand Name is not allowed to be empty"),
  description: yup
    .string()
    .required("Description is required")
    .min(200, "Description must be at least 200 characters")
    .max(1000, "Description must be less than 1000 characters"),
  categoryIds: yup.string().required("Please select a category"),
  quantityAvailable: yup.number().when("hasVariant", {
    is: false,
    then: (schema) =>
      schema
        .typeError("Quantity must be a number")
        .required("Quantity available is required")
        .positive("Quantity must be a positive number")
        .max(9999, "Quantity must be less than 9999"),
    otherwise: (schema) => schema,
  }),
  originalPrice: yup.number().when("hasVariant", {
    is: false,
    then: (schema) =>
      schema
        .typeError("Price must be a number")
        .positive("Price must be a positive number")
        .required("Price available is required"),
    otherwise: (schema) => schema,
  }),
  sellingPrice: yup.number().when("hasVariant", {
    is: false,
    then: (schema) =>
      schema
        .typeError("Price must be a number")
        .positive("Price must be a positive number")
        .required("Price available is required"),
    otherwise: (schema) => schema,
  }),
  sku: yup.string(),
  discountedPrice: yup.number(),
  images: yup.array().of(yup.string().required("Please upload an image")),
  specification: yup.array().of(yup.string()),
});
