import React from "react";
import { useEffect, useState } from "react";
import SideBar from "../components/sideBar";
import { useNavigate } from "react-router-dom";
import { getAllProducts } from "../service/product/api";

function ListProduct() {
  const navigate = useNavigate();

  const [products, setProducts] = useState([]);

  useEffect(() => {
    const getProducts = async () => {
      try {
        const res = await getAllProducts();
        console.log("res", res);
        setProducts(res.data.data);
      } catch (error) {
        console.log("Error", error);
      }
    };
    getProducts();
  }, []);

  return (
    <div className="mt-14">
      <div className="flex justify-between mt-14">
        <h1 className="text-2xl font-bold mb-4">Product List</h1>
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded mb-4"
          onClick={() => {
            navigate("./add-product");
          }}
        >
          Add Product
        </button>
      </div>
      <div className="grid grid-cols-2 gap-4">
        {products.length > 0 ? (
          products.map((product) => (
            <div
              key={product.id}
              className="border rounded-lg p-4 shadow-sm bg-white hover:bg-gray-100 flex"
            >
              <div className="w-20 h-20 bg-gray-200 rounded mr-4">
                <img
                  src={product.primaryImage}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <h2 className="text-lg font-semibold">{product.name}</h2>
                <p className="text-sm text-gray-500">
                  {product.categoriesName}
                </p>
                <p className="text-sm">Price: ${product.sellingPrice}</p>
                <p className="text-sm">
                  On hand: {product.quantityAvailable} Units
                </p>
              </div>
            </div>
          ))
        ) : (
          <p className="text-lg font-semibold">No products found.</p>
        )}
      </div>
    </div>
  );
}
export default ListProduct;
