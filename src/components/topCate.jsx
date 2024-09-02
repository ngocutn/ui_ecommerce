import axios from "axios";
import { useState, useEffect } from "react";

function TopCategory() {
  const [category, setCategory] = useState([]);

  // useEffect(() => {
  //   fetch("https://fakestoreapi.com/products")
  //   fetch("https://b8d9-2402-800-63a7-91ab-fddd-c100-4d5f-5cf7.ngrok-free.app/api/v1/categories")
  //     .then((res) => res.json())
  //     .then((data) => setCategory(data));
  // }),
  //   [];

  // useEffect(() => {
  //   const getCategory = async () => {
  //     try {
  //       const res = await fetch(
  //         "https://c38f-2402-800-63a7-91ab-c16-1f4d-c090-fa9d.ngrok-free.app/api/v1/categories"
  //         // https://0ff6-2402-800-63a7-91ab-fddd-c100-4d5f-5cf7.ngrok-free.app
  //       );
  //       {
  //         mode: "no-cors";
  //       }

  //       console.log("res", res);
  //       // const res = await fetch("https://fakestoreapi.com/products");
  //       const resJson = await res.json();

  //       console.log("cate", resJson);
  //       setCategory(resJson.data);
  //     } catch (error) {
  //       console.log("Error", error);
  //     }
  //   };
  //   getCategory();
  // }, []);

  useEffect(() => {
    axios
      .get( 
        "http://localhost:8080/api/v1/categories"
      )
      .then((res) => setCategory(res.data.data))
      .catch((error) => console.log("Error: ", error));
  }, []);

  console.log("cate2", category);

  const svgIcon = [
    {
      image: (
        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
          <g
            id="SVGRepo_tracerCarrier"
            strokeLinecap="round"
            strokeLinejoin="round"
          ></g>
          <g id="SVGRepo_iconCarrier">
            <path
              d="M7 12H17M8 8.5C8 8.5 9 9 10 9C11.5 9 12.5 8 14 8C15 8 16 8.5 16 8.5M8 15.5C8 15.5 9 16 10 16C11.5 16 12.5 15 14 15C15 15 16 15.5 16 15.5M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z"
              stroke="#000000"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            ></path>
          </g>
        </svg>
      ),
      name: "furniture",
    },
    {
      image: (
        <svg
          fill="#000000"
          viewBox="0 0 64 64"
          enable-background="new 0 0 64 64"
          version="1.1"
          xml:space="preserve"
          xmlns="http://www.w3.org/2000/svg"
          xmlns:xlink="http://www.w3.org/1999/xlink"
        >
          <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
          <g
            id="SVGRepo_tracerCarrier"
            stroke-linecap="round"
            stroke-linejoin="round"
          ></g>
          <g id="SVGRepo_iconCarrier">
            {" "}
            <g id="_x31_-smartphone"></g> <g id="_x32_-smartTV"></g>{" "}
            <g id="_x33_-telepon"></g> <g id="_x34_-computer"></g>{" "}
            <g id="_x35_-kalkulator"></g> <g id="_x36_-radio"></g>{" "}
            <g id="_x37_-hadset"></g> <g id="_x38_-usbflashdisk"></g>{" "}
            <g id="_x39_-camera"></g> <g id="_x31_0-printer"></g>{" "}
            <g id="_x31_1-powerbank"></g> <g id="_x31_2-kulkas"></g>{" "}
            <g id="_x31_3-modem"></g>{" "}
            <g id="_x31_4-tablet">
              {" "}
              <g>
                {" "}
                <path d="M53,3H11C8.794,3,7,4.794,7,7v50c0,2.206,1.794,4,4,4h42c2.206,0,4-1.794,4-4V7C57,4.794,55.206,3,53,3z M55,57 c0,1.103-0.897,2-2,2H11c-1.103,0-2-0.897-2-2V7c0-1.103,0.897-2,2-2h42c1.103,0,2,0.897,2,2V57z"></path>{" "}
                <path d="M11,54h42V10H11V54z M13,12h38v40H13V12z"></path>{" "}
                <path d="M32,55.5c-0.827,0-1.5,0.673-1.5,1.5s0.673,1.5,1.5,1.5s1.5-0.673,1.5-1.5S32.827,55.5,32,55.5z M32,57.5 c-0.275,0-0.5-0.225-0.5-0.5s0.225-0.5,0.5-0.5s0.5,0.225,0.5,0.5S32.275,57.5,32,57.5z"></path>{" "}
                <rect height="1" width="16" x="24" y="7.5"></rect>{" "}
              </g>{" "}
            </g>{" "}
            <g id="_x31_5-gamebot"></g> <g id="_x31_6-wasing_machine"></g>{" "}
            <g id="_x31_7-handdryer"></g> <g id="_x31_8-blender"></g>{" "}
            <g id="_x31_9-controller"></g> <g id="_x32_0-michrophone"></g>{" "}
            <g id="_x32_1-lamp"></g>{" "}
          </g>
        </svg>
      ),
      name: "furniture",
    },
  ];

  return (
    <div className="flex gap-3 ml-4 my-3">
      {category.map((item, index) => {
        return (
          <div>
            <div className="w-[70px] h-[70px] rounded-full bg-gray-200 p-4 hover:bg-gray-100 cursor-pointer">
              {/* <img src={item.image} alt="" /> */}
              {item.icon}
            </div>
            <p className="text-center mt-2 font-semibold">{item.name}</p>
          </div>
        );
      })}
    </div>
  );
}

export default TopCategory;
