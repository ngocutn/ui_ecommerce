import { MenuItem, Select } from "@mui/material";
import download from "../assets/image/download.webp";

const Footer = () => {
  const sections = [
    {
      title: "Product",
      items: ["Jewelry", "Swimwear", "Dresses", "Watches"],
    },
    {
      title: "Brand",
      items: [
        "About",
        "Play, win & save",
        "Design",
        "Waterproof",
        "Our Stores",
        "Shop our Instagram",
        "Shop the Look",
      ],
    },
    {
      title: "Resources",
      items: ["Ring Sizer", "Rewards", "Packaging"],
    },
    {
      title: "Support",
      items: ["Color Warranty", "Start a return", "Contacts", "FAQ"],
    },
    {
      title: "Join us",
      items: ["Careers", "Stockists"],
    },
    {
      title: "Social",
      items: [
        "Instagram",
        "Facebook",
        "Youtube",
        "Tiktok",
        "LinkedIn",
        "Pinterest",
      ],
    },
  ];

  const currency = [
    { name: "USD $", value: "USD" },
    { name: "AUD $", value: "AUD" },
    { name: "CAD $", value: "CAD" },
    { name: "EUR €", value: "EUR" },
    { name: "GBP £", value: "GBP" },
  ];

  const language = [
    { name: "English", value: "en" },
    { name: "French", value: "fr" },
    { name: "German", value: "de" },
    { name: "Spanish", value: "es" },
    { name: "Italian", value: "it" },
  ];
  return (
    <div>
      <div className="flex gap-5 justify-center mt-10">
        <div className="w-[40%] flex flex-col items-stretch bg-[#f2f1ed] p-4 rounded-xl justify-between">
          <div>
            <p className="text-2xl font-bold">
              Special treat with your 1st order
            </p>
            <p className="text-2xl font-semibold">
              Join our newsletter to claim it
            </p>
          </div>
          <div className="flex justify-between">
            <input
              type="text"
              placeholder="Email address"
              className=" border-2 border-gray-300 rounded-lg p-2 mt-2 w-[75%]"
            />
            <button className="bg-[#ffbfcc] text-white font-semibold text-xl rounded-xl px-4 py-3 mt-2">
              Subscribe
            </button>
          </div>
        </div>
        <div className="w-[60%]">
          <img src={download} alt="" className="w-full  rounded-xl" />
        </div>
      </div>

      <div className="flex justify-between mt-10">
        <div classNamw="w-1/4">
          <p className="text-2xl font-bold">hey harper</p>
        </div>
        <div className="flex w-3/4 justify-between text-lg">
          {sections.map((section, index) => (
            <div key={index}>
              <p className=" font-bold">{section.title}</p>
              <ul>
                {section.items.map((item, index) => (
                  <li
                    key={index}
                    className="hover:text-[#ffbfcc] cursor-pointer my-4 font-semibold"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      <div className="flex justify-between mt-10">
        <div>
          <Select
            defaultValue="USD"
            sx={{
              border: "none",
              "& .MuiOutlinedInput-notchedOutline": {
                border: "none",
              },
            }}
          >
            {currency.map((item, index) => (
              <MenuItem key={index} value={item.value}>
                {item.name}
              </MenuItem>
            ))}
          </Select>
          <Select
            defaultValue="en"
            sx={{
              border: "none",
              "& .MuiOutlinedInput-notchedOutline": {
                border: "none",
              },
            }}
          >
            {language.map((item, index) => (
              <MenuItem key={index} value={item.value}>
                {item.name}
              </MenuItem>
            ))}
          </Select>
        </div>
        <div className="text-gray-500">
          <a href="" className="hover:text-[#ffbfcc] font-semibold">
            Terms of service
          </a>
          <a href="" className="hover:text-[#ffbfcc] font-semibold">
            Privacy Policy
          </a>
        </div>
      </div>
    </div>
  );
};

export default Footer;
