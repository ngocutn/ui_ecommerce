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

function HeaderHome() {
  return (
    <AppBar className="bg-white pr-7">
      <Toolbar component="div" className="flex justify-between my-3">
        <Stack
          direction="row"
          className="logo text-3xl font-black text-blue-600 flex items-center"
        >
          <img
            className="w-[4rem] h-[4rem] md:w-[5rem] md:h-[5rem]"
            src="https://media.licdn.com/dms/image/v2/C4E0BAQGx-TFoWYNJcg/company-logo_200_200/company-logo_200_200/0/1659539191896?e=1733356800&v=beta&t=6Q59ItomXoSc2VXB7_RWGddV0P5FLE6FcCQPVCuJDIM"
            alt=""
          />
          ccessed
        </Stack>

        <Stack
          direction="row"
          className="grow text-lg justify-center items-center"
        >
          <Input
            type="search"
            variant="outlined"
            disableUnderline
            className="border w-2/3 border-gray-200 px-3 py-3 rounded-md"
            placeholder="Search Products"
          >
            <SearchIcon className="text-black" />
          </Input>
          <Select
            defaultValue="All categories"
            className="border border-gray-200 "
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
          <Button className="bg-black py-4 rounded-md">
            <SearchIcon className="text-white" />
          </Button>
        </Stack>

        <Stack
          direction="row"
          className=" flex items-center justify-center gap-5"
        >
          <Button className="capitalize text-black">
            <PermIdentityOutlinedIcon />
            <Typography
              variant="body1"
              className="ml-2 font-semibold flex flex-col items-start gap-0"
            >
              <span className="text-[12px]">Sign in</span>
              <span>Account</span>
            </Typography>
          </Button>

          <EmailOutlinedIcon className="text-black cursor-pointer" />

          <Badge color="secondary" badgeContent={0} showZero max={99}>
            <FavoriteBorderOutlinedIcon className="text-black cursor-pointer" />
          </Badge>
          <Button className="capitalize text-black">
            <Badge color="secondary" badgeContent={0} showZero max={99}>
              <ShoppingCartOutlinedIcon className="text-black" />
            </Badge>
            <Typography
              variant="body1"
              className="ml-4 font-semibold flex flex-col items-start gap-0"
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
          <Typography className="text-black ml-4">Categories</Typography>
        </Button>
        <ButtonGroup
          sx={{
            "& .MuiButton-root": {
              border: "none",
            },
          }}
          variant="text"
        >
          <Button className="text-black capitalize text-lg px-3">Home</Button>
          <Button className="text-black capitalize text-lg px-3">
            Today detail
          </Button>
          <Button className="text-black capitalize text-lg px-3">
            Customer Services
          </Button>
          <Button className="text-black capitalize text-lg px-3">
            Trending products
          </Button>
          <Button className="text-black capitalize text-lg px-3">Blog</Button>
          <Button className="text-black capitalize text-lg px-3">
            Special offers
          </Button>
        </ButtonGroup>
      </Toolbar> */}
    </AppBar>
  );
}

export default HeaderHome;
