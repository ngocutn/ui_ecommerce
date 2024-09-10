import { useEffect, useState } from "react";
import { getAllProducts } from "../../../service/product/api";

function PopularProduct() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [productData, setProductData] = useState([]);
  //   const [products, setProducts] = useState([]);

  useEffect(() => {
    const getAllProducts = async () => {
      try {
        const response = await fetch("https://fakestoreapi.com/products");
        // const response = await fetch(
        //   "https://59e5-115-73-5-32.ngrok-free.app/api/v1/categories"
        // );
        const responseJson = await response.json();
        console.log(responseJson);

        setProductData(responseJson);
      } catch (error) {
        console.error("Error:", error);
      }
    };
    getAllProducts();
  }, []);
  // console.log(productData);

  //   useEffect(() => {
  //     const getProducts = async () => {
  //       try {
  //         const res = await getAllProducts();
  //         console.log("res", res);
  //         setProducts(res.data.data);
  //       } catch (error) {
  //         console.log("Error", error);
  //       }
  //     };
  //     getProducts();
  //   }, []);

  const currentProducts = productData.slice(
    currentIndex * 4,
    (currentIndex + 1) * 4
  );

  const prevImg = () => {
    const firstImg = currentIndex === 0;
    const newImg = firstImg ? productData.length / 4 - 1 : currentIndex - 1;
    setCurrentIndex(newImg);
  };
  console.log(currentIndex);

  const nextImg = () => {
    const lastImg = currentIndex === productData.length / 4 - 1;
    const newImg = lastImg ? 0 : currentIndex + 1;
    setCurrentIndex(newImg);
  };

  return (
    <div id="popularProduct" className="w-full mt-9 pl-5 pr-9">
      <div className="w-full h-auto m-auto flex justify-between px-4">
        <h1 className="font-bold text-2xl">Popular Product 2023</h1>
        <div>
          <button onClick={prevImg}>
            <i
              class="fa fa-chevron-left bg-gray-300 hover:bg-gray-100 p-4 rounded-full mr-2"
              aria-hidden="true"
            ></i>
          </button>
          <button onClick={nextImg}>
            <i
              class="fa fa-chevron-right bg-gray-300 hover:bg-gray-100 p-4 rounded-full"
              aria-hidden="true"
            ></i>
          </button>
        </div>
      </div>
      <div id="product" className="flex h-auto w-full justify-center gap-4 ">
        {currentProducts.map((item, index) => {
          return (
            <div
              key={index}
              className="w-[280px] h-auto p-4 text-xl cursor-pointer group transiton "
            >
              <div className=" h-[250px] overflow-hidden flex justify-center items-center ">
                <img
                  src={item.image}
                  alt="Product Imgae"
                  className="max-h-[200px] object-contain rounded-lg group-hover:scale-110 transition duration-300"
                  // hover:absolute hover:w-[285px] hover:h-[305px]
                />
              </div>
              <p className="font-bold text-nowrap mt-[10px] group-hover:text-gray-400 text-ellipsis	overflow-hidden">
                {item.title}
              </p>
              <p className="text-gray-500 text-lg my-[10px]">{item.category}</p>

              <div className="flex gap-2 items-center">
                <div className="w-3/4 ">
                  <div className="flex gap-2 items-center text-[15px] font-bold">
                    <i
                      class="fa fa-star  text-yellow-500"
                      aria-hidden="true"
                    ></i>
                    <span>{item.evaluation}</span>
                    <div class="w-1 bg-gray-400 h-[20px]"></div>
                    <span className="bg-gray-200 p-1">
                      {item.quantitySold} Sold
                    </span>
                  </div>

                  <div className="flex gap-4">
                    <p className="line-through text-gray-500">$ {item.price}</p>
                    <p className="font-bold">$ {item.discount}</p>
                  </div>
                </div>

                {/* add cart button */}
                <button className=" ml-auto bg-black w-10 h-10 p-1 rounded-full hover:bg-gray-300">
                  <svg
                    fill="#ffffff"
                    viewBox="-7 0 32 32"
                    version="1.1"
                    xmlns="http://www.w3.org/2000/svg"
                    stroke="#ffffff"
                  >
                    <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                    <g
                      id="SVGRepo_tracerCarrier"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    ></g>
                    <g id="SVGRepo_iconCarrier">
                      {" "}
                      <title>plus</title>{" "}
                      <path d="M17.040 15.16h-7.28v-7.24c0-0.48-0.36-0.84-0.84-0.84s-0.84 0.36-0.84 0.84v7.28h-7.24c-0.48-0.040-0.84 0.32-0.84 0.8s0.36 0.84 0.84 0.84h7.28v7.28c0 0.48 0.36 0.84 0.84 0.84s0.84-0.36 0.84-0.84v-7.32h7.28c0.48 0 0.84-0.36 0.84-0.84s-0.44-0.8-0.88-0.8z"></path>{" "}
                    </g>
                  </svg>
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default PopularProduct;
