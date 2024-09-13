import { Star } from "lucide-react";
import DropList from "../../components/DropList";
import { Button } from "@mui/material";

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

const ProductDetails = () => {
  return (
    <div className="flex items-start py-[140px] gap-x-7">
      <div className="w-2/3">
        <div className="w-full h-[300px] bg-gray-400 rounded-2xl"></div>
      </div>
      <div className="flex-1">
        <div className="flex">
          <h1 className="text-2xl font-bold w-[70%]">
            Flamenco Frilled & High Waisted
          </h1>
          <span className="text-2xl font-bold line-through">$155</span>
        </div>

        <div className="flex mt-1">
          <h1 className="text-xl font-bold w-[70%] text-gray-300">Bikini</h1>
          <span className="text-3xl font-bold text-red-500">$130</span>
        </div>

        <div className="mt-2">
          <p className="text-lg">
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
          <p className="text-lg">
            RAM: <span className="font-bold">4GB</span>
          </p>

          <div className="flex items-center gap-x-5">
            {Rams.map((item) => (
              <div
                key={item.id}
                className="bg-white px-6 py-2 border-[3px] border-gray-300 rounded-2xl mt-2 font-semibold"
              >
                <p>{item.ram} GB</p>
              </div>
            ))}
          </div>
        </div>
        <div className="mt-6">
          <p className="text-lg">
            Stograge: <span className="font-bold">32GB</span>
          </p>

          <div className="flex items-center gap-x-3">
            {Stograges.map((item) => (
              <div
                key={item.id}
                className="px-6 py-2 border-[3px] bg-[#fff] border-gray-300 rounded-2xl mt-2 font-semibold"
              >
                <p>{item.store} GB</p>
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

        <div className="p-4 mt-8 bg-white rounded-lg shadow-lg">
          <div className="flex items-center justify-between font-bold">
            <span className="text-lg">
              Reviews
              <span>(5)</span>
            </span>
            <span className="text-textSecondary">Write a comment</span>
          </div>

          <div className="flex items-center justify-between mt-4 text-textSecondary">
            <span className="font-bold">Overall rating</span>
            <div className="flex items-center gap-x-2">
              <span className="text-lg font-bold">4.9</span>
              <Star color="#e96394" size={24} />
            </div>
          </div>
          <Button
            variant="outlined"
            className="w-full py-2 mt-4 font-sans text-lg font-bold lowercase border-2 border-strokeColor text-textSecondary"
          >
            Show all
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
