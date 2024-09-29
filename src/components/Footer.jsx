import { MenuItem, Select } from "@mui/material";
import { Dot } from "lucide-react";

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
      <div className="w-full px-16 shadow-lg sm:hidden tb:hidden">
        <div className="flex justify-between mt-10">
          <div className="  w-[100px] h-[100px] flex items-center">
            <img
              src="https://media.licdn.com/dms/image/v2/C4E0BAQGx-TFoWYNJcg/company-logo_200_200/company-logo_200_200/0/1659539191896?e=1733356800&v=beta&t=6Q59ItomXoSc2VXB7_RWGddV0P5FLE6FcCQPVCuJDIM"
              alt=""
              className="object-cover"
            />
            <span className="text-3xl font-bold text-[#2363eb]">ccessed</span>
          </div>
          <div className="flex justify-between w-3/4 text-small">
            {sections.map((section, index) => (
              <div key={index}>
                <p className="font-bold ">{section.title}</p>
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
          <div className="flex items-center text-gray-500">
            <a href="" className="hover:text-[#ffbfcc] font-semibold ">
              Terms of service
            </a>
            <span>
              <Dot />
            </span>
            <a href="" className="hover:text-[#ffbfcc] font-semibold">
              Privacy Policy
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
