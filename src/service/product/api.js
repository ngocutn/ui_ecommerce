import axios from "axios";

export const getAllCategories = (body) => {
  return axios.get(
    "https://neo4j-ecommerce.onrender.com/api/v1/categories",
    body
  );
};

export const getCategoriesByParentId = (id, body) => {
  return axios.get(
    `https://neo4j-ecommerce.onrender.com/api/v1/categories/parent?parentId=${id}`,
    body
  );
};
