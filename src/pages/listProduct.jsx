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

        setProducts(res.data.data);
      } catch (error) {}
    };

    getProducts();
  }, []);

  console.log(products);

  return (
    <div className="mt-14">
      <div className="flex justify-between mt-14">
        <h1 className="mb-4 text-2xl font-bold">Product List</h1>
        <button
          className="px-4 py-2 mb-4 text-white bg-blue-500 rounded"
          onClick={() => {
            navigate("./add-product");
          }}
        >
          Add Product
        </button>
      </div>
      <div className="grid grid-cols-2 gap-4">
        {products.length > 0 ? (
          products?.map((product) => (
            <div
              key={product.id}
              className="flex p-4 bg-white border rounded-lg shadow-sm hover:bg-gray-100"
            >
              <div className="w-20 h-20 mr-4 bg-gray-200 rounded">
                <img
                  src={product.primaryImage}
                  alt={product.name}
                  className="object-cover w-full h-full"
                />
              </div>
              <div>
                <h2 className="text-lg font-semibold">{product.name}</h2>

                <p className="text-sm text-gray-500">
                  {product.categories[0].name}
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
