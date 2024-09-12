import DropList from "../../components/DropList";

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
    <div className="flex items-start mt-[180px] gap-x-7">
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
          <div className="flex items-center mt-2 gap-x-2">
            {colors.map((item, index) => (
              <div
                key={index}
                className={`size-[50px] bg-[#${item.color}]`}
              ></div>
            ))}
          </div>
        </div>

        <div className="mt-4">
          <p className="text-lg">
            RAM: <span className="font-bold">4GB</span>
          </p>

          <div className="flex items-center gap-x-5">
            {Rams.map((item) => (
              <div
                key={item.id}
                className="px-6 py-2 border-[3px] border-gray-300 rounded-2xl mt-2 font-semibold"
              >
                <p>{item.ram} GB</p>
              </div>
            ))}
          </div>
        </div>
        <div className="mt-4">
          <p className="text-lg">
            Stograge: <span className="font-bold">32GB</span>
          </p>

          <div className="flex items-center gap-x-5">
            {Stograges.map((item) => (
              <div
                key={item.id}
                className="px-6 py-2 border-[3px] border-gray-300 rounded-2xl mt-2 font-semibold"
              >
                <p>{item.store} GB</p>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-6">
          <DropList></DropList>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
