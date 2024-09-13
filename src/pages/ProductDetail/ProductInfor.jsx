import React from "react";
import { Heart, Star } from "lucide-react";
import DropList from "../../components/DropList";
import { Button } from "@mui/material";
import { useState } from "react";
import HeartIcon from "../../icon/HeartIcon";
import StartFillIcon from "../../icon/StartFillIcon";

const colors = [
  {
    id: 1,
    color: "d9d9d9",
    active: true,
  },
  {
    id: 2,
    color: "5156e5",
    active: false,
  },
  {
    id: 3,
    color: "e6696a",
    active: false,
  },
  {
    id: 4,
    color: "767d89",
    active: false,
  },
];

const Rams = [
  {
    id: 1,
    ram: "4",
  },
  {
    id: 2,
    ram: "8",
  },
  {
    id: 3,
    ram: "16",
  },
  {
    id: 4,
    ram: "32",
  },
];

const Stograges = [
  {
    id: 1,
    store: "32",
  },
  {
    id: 2,
    store: "64",
  },
  {
    id: 3,
    store: "128",
  },
  {
    id: 4,
    store: "256",
  },
];

const ProductInfor = () => {
  const [isLike, setIsLike] = useState(false);
  const [ram, setRam] = useState();
  const [store, setStore] = useState();
  const [color, setColor] = useState();
  return (
    <div className="flex-1 h-[70vh] overflow-y-scroll scrollbar-hide scroll-smooth px-2">
      <div className="flex items-start justify-between">
        <h1 className="text-2xl font-bold w-[80%]">
          Flamenco Frilled & High Waisted
        </h1>
        <span className="text-xl font-bold line-through">$155</span>
      </div>

      <div className="flex items-start justify-between mt-1">
        <h1 className="text-xl font-bold w-[70%] text-gray-500">Bikini</h1>
        <span className="text-2xl font-bold text-red-500">$130</span>
      </div>

      <div className="mt-2">
        <p className="text-base">
          color: <span className="font-bold">Titanium Yellow</span>
        </p>
        <div className="flex items-center mt-2 gap-x-4">
          <div className={`size-[50px] rounded-xl border bg-[#d9d9d9]`}></div>
          <div className={`size-[50px] rounded-xl border bg-[#d9d9d9]`}></div>
          <div className={`size-[50px] rounded-xl border bg-[#d9d9d9]`}></div>
          <div className={`size-[50px] rounded-xl border bg-[#d9d9d9]`}></div>
        </div>
      </div>

      <div className="mt-6">
        <p className="text-base">
          RAM: <span className="font-bold">{ram ? ram + "GB" : ""}</span>
        </p>

        <div className="flex items-center gap-x-5">
          {Rams.map((item) => (
            <div
              key={item.id}
              className={`bg-white px-5 py-2 text-sm rounded-lg mt-2 font-[300] select-none cursor-pointer ${
                ram === item.ram ? "active" : ""
              }`}
              onClick={() => setRam(item.ram)}
            >
              <p>{item.ram}GB</p>
            </div>
          ))}
        </div>
      </div>
      <div className="mt-6">
        <p className="text-base">
          Stograge:{" "}
          <span className="font-bold">{store ? store + "GB" : ""}</span>
        </p>

        <div className="flex items-center gap-x-3">
          {Stograges.map((item) => (
            <div
              key={item.id}
              className={`bg-white px-5 py-2 text-sm rounded-lg mt-2 font-[300] select-none cursor-pointer ${
                store === item.store ? "active" : ""
              }`}
              onClick={() => setStore(item.store)}
            >
              <p>{item.store}GB</p>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-8">
        <DropList>
          <li className="flex items-center py-3 border-b border-gray-300 gap-x-3 first:pt-0 last:border-b-0">
            <span className="text-base font-semibold">Display</span>
            <span>data</span>
          </li>
          <li className="flex items-center justify-between py-3 border-b border-gray-300 first:pt-0 last:border-b-0">
            <span className="text-base font-semibold">Display</span>
            <span>data</span>
          </li>
        </DropList>
      </div>

      <div className="p-4 mt-6 bg-white rounded-lg shadow-lg">
        <div className="flex items-center justify-between font-bold">
          <span className="text-base">
            Reviews
            <span>(5)</span>
          </span>
          <span className="select-none text-textSecondary">
            Write a comment
          </span>
        </div>

        <div className="flex items-center justify-between mt-4 text-textSecondary">
          <span className="font-bold select-none">Overall rating</span>
          <div className="flex items-center gap-x-2">
            <span className="text-base font-bold select-none">4.9</span>
            <StartFillIcon fill={"#f9619bs"} />
          </div>
        </div>
        <Button
          variant="outlined"
          className="w-full py-2 mt-4 font-sans text-lg font-bold lowercase border-2 border-strokeColor text-textSecondary"
        >
          Show all
        </Button>
      </div>

      <div className="flex items-center mt-6 gap-x-3">
        <Button className="flex-1 py-3 text-white bg-buttonBg">
          Add to cart
        </Button>
        <div
          className={`p-3 border-2 rounded-md cursor-pointer border-buttonBg`}
          onClick={() => setIsLike(!isLike)}
        >
          {isLike ? <HeartIcon /> : <Heart />}
        </div>
      </div>
    </div>
  );
};

export default ProductInfor;
