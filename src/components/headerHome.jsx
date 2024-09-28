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
import { useDispatch, useSelector } from "react-redux";
import { Menu } from "@mui/material";
import { useEffect, useState } from "react";
import { checkToken, Logout } from "../store/slice/userSlice";

function HeaderHome() {
  const navigate = useNavigate();
  const { isAuthenticated, user: userData } = useSelector(
    (state) => state.user
  );
  const dispatch = useDispatch();

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    dispatch(Logout());
    localStorage.removeItem("token");
    dispatch(checkToken());
    navigate("/buyer");
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    dispatch(checkToken());
    console.log(token);
  }, [dispatch]);

  console.log("authen", isAuthenticated);

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
          className="items-center justify-center text-sm grow w-[80%]"
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
          {isAuthenticated ? (
            <div className="flex items-center">
              <div className="w-11 h-11">
                <img
                  src="https://i.pinimg.com/564x/0d/64/98/0d64989794b1a4c9d89bff571d3d5842.jpg"
                  alt=""
                  className="object-contain w-full h-full"
                />
              </div>
              <div>
                <Button
                  id="basic-button"
                  aria-controls={open ? "basic-menu" : undefined}
                  aria-haspopup="true"
                  aria-expanded={open ? "true" : undefined}
                  onClick={handleClick}
                  style={{
                    fontSize: "12px",
                    color: "Black",
                    fontWeight: "bold",
                    padding: "0",
                  }}
                >
                  {/* {userData.user?.firstName} */}ád
                </Button>
                <Menu
                  id="basic-menu"
                  anchorEl={anchorEl}
                  open={open}
                  onClose={handleClose}
                  MenuListProps={{
                    "aria-labelledby": "basic-button",
                  }}
                >
                  <MenuItem onClick={handleClose}>Profile</MenuItem>
                  <MenuItem onClick={handleLogout}>Logout</MenuItem>
                </Menu>
              </div>
            </div>
          ) : (
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
          )}

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
    </AppBar>
  );
}

export default HeaderHome;
