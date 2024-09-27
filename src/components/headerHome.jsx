import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import Typography from "@mui/material/Typography";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Badge from "@mui/material/Badge";
import Input from "@mui/material/Input";
import Stack from "@mui/material/Stack";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";

import PermIdentityOutlinedIcon from "@mui/icons-material/PermIdentityOutlined";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import SearchIcon from "@mui/icons-material/Search";
import CategoryIcon from "@mui/icons-material/Category";

import { Link, useNavigate } from "react-router-dom";

function HeaderHome() {
  const navigate = useNavigate();
  return (
    <AppBar className="z-20 bg-white pr-7">
      <Toolbar component="div" className="flex justify-between my-3">
        <Stack
          direction="row"
          className="flex items-center text-xl font-black text-blue-600 cursor-pointer logo"
          onClick={() => navigate("/")}
        >
          <img
            className="w-[2rem] h-[2rem] md:w-[5rem] md:h-[5rem]"
            src="https://media.licdn.com/dms/image/v2/C4E0BAQGx-TFoWYNJcg/company-logo_200_200/company-logo_200_200/0/1659539191896?e=1733356800&v=beta&t=6Q59ItomXoSc2VXB7_RWGddV0P5FLE6FcCQPVCuJDIM"
            alt=""
          />
          ccessed
        </Stack>

        <Stack
          direction="row"
          className="items-center justify-center text-sm grow"
        >
          <Input
            type="search"
            variant="outlined"
            disableUnderline
            className="w-2/3 px-3 py-3 text-sm border border-gray-200 rounded-md"
            placeholder="Search Products"
          >
            <SearchIcon className="text-black" />
          </Input>
          <Select
            defaultValue="All categories"
            className="text-sm border border-gray-200"
            sx={{
              "& fieldset": {
                borderColor: "transparent", // Ẩn viền gốc của Material UI
              },
            }}
          >
            <MenuItem value="All categories">All categories</MenuItem>
            <MenuItem value="Phone">Phone</MenuItem>
            <MenuItem value="Laptop">Laptop</MenuItem>
          </Select>
          <Button className="py-4 bg-black rounded-md">
            <SearchIcon className="text-white" />
          </Button>
        </Stack>

        <Stack
          direction="row"
          className="flex items-center justify-center gap-x-5"
        >
          <Link
            to="/buyer"
            className="flex items-center p-2 text-sm text-black capitalize rounded-lg hover:bg-gray-100"
          >
            <PermIdentityOutlinedIcon />
            <Typography
              variant="body1"
              className="flex flex-col items-start gap-0 ml-2 text-sm font-semibold"
            >
              <span className="text-[12px]">Sign in</span>
              <span>Account</span>
            </Typography>
          </Link>

          <EmailOutlinedIcon className="text-black cursor-pointer" />

          <Badge color="secondary" badgeContent={0} showZero max={99}>
            <FavoriteBorderOutlinedIcon className="text-black cursor-pointer" />
          </Badge>
          <Button className="text-black capitalize">
            <Badge color="secondary" badgeContent={0} showZero max={99}>
              <ShoppingCartOutlinedIcon className="text-black" />
            </Badge>
            <Typography
              variant="body1"
              className="flex flex-col items-start gap-0 ml-4 font-semibold"
            >
              <span className="text-[12px]">Total</span>
              <span> $0.00</span>
            </Typography>
          </Button>
        </Stack>
      </Toolbar>

      {/* <Toolbar component="div" className="flex justify-between mt-2">
        <Button>
          <CategoryIcon className="text-black" />
          <Typography className="ml-4 text-black">Categories</Typography>
        </Button>
        <ButtonGroup
          sx={{
            "& .MuiButton-root": {
              border: "none",
            },
          }}
          variant="text"
        >
          <Button className="px-3 text-lg text-black capitalize">Home</Button>
          <Button className="px-3 text-lg text-black capitalize">
            Today detail
          </Button>
          <Button className="px-3 text-lg text-black capitalize">
            Customer Services
          </Button>
          <Button className="px-3 text-lg text-black capitalize">
            Trending products
          </Button>
          <Button className="px-3 text-lg text-black capitalize">Blog</Button>
          <Button className="px-3 text-lg text-black capitalize">
            Special offers
          </Button>
        </ButtonGroup>
      </Toolbar> */}
    </AppBar>
  );
}

export default HeaderHome;
