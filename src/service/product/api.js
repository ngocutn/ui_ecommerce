import axios from "axios";

export const getAllCategories = (body) => {
  return axios.get(
    "https://neo4j-ecommerce.onrender.com/api/v1/categories",
    body
  );
};
export const getLevel1Categories = (body) => {
  return axios.get(
    "https://neo4j-ecommerce.onrender.com/api/v1/categories/level/1",
    body
  );
};

export const getCategoriesByParentId = (id, body) => {
  return axios.get(
    `https://neo4j-ecommerce.onrender.com/api/v1/categories/parent?parentId=${id}`,
    body
  );
};

export const postProduct = (body) => {
  return axios.post(
    "https://neo4j-ecommerce.onrender.com/api/v1/products",
    body,
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
};

export const getAllProducts = () => {
  return axios.get("https://neo4j-ecommerce.onrender.com/api/v1/products");
};

export const getTopProducts = () => {
  return axios.get(
    `https://neo4j-ecommerce.onrender.com/api/v1/products/top-selling`
  );
};
