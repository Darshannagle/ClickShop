import * as React from "react";
import "../index.scss";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Tooltip from "@mui/material/Tooltip";
import { NavLink, useNavigate } from "react-router-dom";
import {
  Card,
  CardHeader,
  CardMedia,
  CircularProgress,
  Divider,
  InputAdornment,
  Menu,
  MenuItem,
  TextField,
} from "@mui/material";
import logo from "../assets/react.svg";
import { Close, Favorite, Search, ShoppingCart } from "@mui/icons-material";
import { isLoggedIn } from "../config/loginConfig";
import { pages } from "../Routes";
const navLinkStyles: unknown = ({ isActive }: { isActive: boolean }) => ({
  width: "100%",
  margin: 0,
  backgroundColor: isActive ? "var(--secondary-color)" : "transparent",
  color: isActive ? "var(--primary-color)" : "var(--secondary-color)",
  // color: "black",
  textDecoration: "none",
  // borderRadius: "5px",
  textAlign: "center",
  border: isActive ? "1px solid black" : "none",
  // fontWeight: isActive ? "bold" : "normal",
  // padding: "5px 10px",
});
const deskNavLinkStyle = ({ isActive }: { isActive: boolean }) => ({
  // width: "100%",
  margin: 20,
  backgroundColor: isActive
    ? "var(--secondary-color)"
    : "var(--background-color)",
  color: isActive ? "var(--background-color)" : "var(--secondary-color)",
  // color: "#000000",
  fontSize: "15px",
  textDecoration: "none",
  borderRadius: "5px",

  border: isActive ? "1px solid black" : "none",
  fontWeight: 100,
  // fontFamily: "Poppins",
  padding: "5px 10px",
});

const settings =
  //  localStorage?.getItem("token")?
  [
    {
      label: "Profile",
      path: "Profile",
    },
    {
      label: "Account",
      path: "Account",
    },
    {
      label: "Forgot Password",
      path: "login/forgot-password",
    },
    {
      label: "Logout",
      path: "login",
      handler: (e: Event) => {
        console.log(e.type);
        localStorage.removeItem("token");
        window.location.reload();
      },
    },
  ];

const notifications = [
  { logo, title: "notification1", description: "this is description" },
  { logo, title: "notification2", description: "this is description" },
];
function Appbar() {
  const navigate = useNavigate();
  // Add this with your other useStates
  const [anchorElNotification, setAnchorElNotification] =
    React.useState<null | HTMLElement>(null);

  // const handleNotificationClick = (event: React.MouseEvent<HTMLElement>) => {
  //   setAnchorElNotification(event.currentTarget);
  // };

  const handleNotificationClose = () => {
    setAnchorElNotification(null);
  };

  const [notificationCount, setNotificationCount] = React.useState(
    notifications.length
  );
  const [loading, setLoading] = React.useState(false);
  // const [openNotification, setOpenNotification] = React.useState(false);
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
    null
  );

  const handleDrawerToggle = () => {
    setLoading(true);
    setMobileOpen(!mobileOpen);
    setLoading(false);
  };
  // const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(
  //   null
  // );
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <>
      <AppBar
        position="static"
        color="transparent"
        sx={{ visibility: isLoggedIn ? "visible" : "hidden" }}
      >
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            {/* Menu Icon for Mobile */}
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{
                display: { md: "none" },
                mr: 2,
                padding: 0.5,
                fontWeight: 300,
                // border: "1px solid black",
                // borderRadius: "5px",
              }}
              onClick={handleDrawerToggle}
            >
              <MenuIcon />
            </IconButton>
            {/* Logo */}

            {/* Title */}
            <Typography
              variant="h6"
              component="a"
              href="/"
              sx={{
                marginRight: 2,
                flexGrow: 0.1,
                // fontFamily: "Poppins",
                fontWeight: 100,
                letterSpacing: ".0rem",
                color: "inherit",
                // marginX: "10px",
                // border: "1px solid black",
                textDecoration: "none",
              }}
            >
              ClickShop
            </Typography>

            <Box sx={{ flexGrow: 1 }}>
              <TextField
                sx={{ display: { xs: "none", sm: "block" } }}
                size="small"
                id="serch"
                label=""
                value={""}
                type="search"
                placeholder="Search"
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton edge="end">
                        <Search />
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
                onChange={() => {}}
              />
            </Box>

            {/* Desktop Menu */}
            <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
              <Divider />
              {pages.map(({ label, path }) => (
                <NavLink style={deskNavLinkStyle} to={`/${path}`} key={path}>
                  {/* <Button
                    style={{ textTransform: "none" }}
                    key={page}
                    sx={{ my: 2, color: "black", fontFamily: "Poppins" }}
                  > */}
                  {label}
                  {/* </Button> */}
                </NavLink>
              ))}
            </Box>

            {/* User Profile */}
            <Box sx={{ flexGrow: 0 }}>
              {/* {localStorage?.getItem("token") == undefined ?  */}
              {localStorage.getItem("token") ? (
                <Container
                  maxWidth="xs"
                  style={{
                    // border: "1px solid gray",
                    borderRadius: 5,
                    padding: 0,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-evenly",
                  }}
                >
                  <IconButton
                    aria-label="notification"
                    // onClick={handleNotificationClick}
                    style={{
                      backgroundColor: "transparent",
                      // boxShadow: "0px 0px 1px 0.1px var(--secondary-color)",
                    }}
                  >
                    {/* Liked items */}
                    <Favorite
                      style={{
                        width: 20,
                        height: 20,
                        color: "var(--secondary-color)",
                        // backgroundColor: "var(--background-color)",
                      }}
                    />
                  </IconButton>

                  <IconButton
                    aria-label="notification"
                    // onClick={handleNotificationClick}
                    style={{
                      backgroundColor: "transparent",
                      // boxShadow: "0px 0px 1px 0.1px var(--secondary-color)",
                    }}
                    onClick={() => navigate("/cart")}
                  >
                    {/* the border shold be thin  */}
                    <ShoppingCart
                      style={{
                        width: 20,
                        height: 20,
                        // boxShadow: "0px 0px 1px 0.1px var(--secondary-color)",
                        color: "var(--secondary-color)",
                        // backgroundColor: "var(--background-color)",
                      }}
                    />
                  </IconButton>
                  <Tooltip title="Open settings">
                    <IconButton onClick={handleOpenUserMenu}>
                      {loading ? (
                        <CircularProgress />
                      ) : (
                        <Avatar
                          style={{
                            width: 30,
                            height: 30,
                            // boxShadow:
                            //   "0px 0px 1px 0.1px var(--secondary-color)",
                            backgroundColor: "var(--primary-color)",
                            color: "var(--secondary-color)",
                            // borderColor: "var(--secondary-color)",
                            // borderWidth: 1,
                            // borderStyle: "solid",
                          }}
                          alt="Darshan"
                          // src={localStorage?.getItem("token") ? logo : logo}
                        />
                      )}
                    </IconButton>
                  </Tooltip>
                  <Menu
                    sx={{ mt: "45px" }}
                    id="menu-appbar"
                    anchorEl={anchorElUser}
                    anchorOrigin={{
                      vertical: "top",
                      horizontal: "right",
                    }}
                    keepMounted
                    transformOrigin={{
                      vertical: "top",
                      horizontal: "right",
                    }}
                    open={Boolean(anchorElUser)}
                    onClose={handleCloseUserMenu}
                  >
                    {settings.map(
                      ({
                        label,
                        path,
                        handler,
                      }: {
                        label: string;
                        path: string;
                        handler: any;
                      }) => (
                        <MenuItem
                          key={label}
                          onClick={(e) => {
                            handleCloseUserMenu();
                            handler?.(e);
                          }}
                          sx={{ width: "100%", m: 0 }}
                        >
                          <NavLink
                            to={`/${String(path)?.toLowerCase()}`}
                            style={navLinkStyles}
                          >
                            {label}
                          </NavLink>
                        </MenuItem>
                      )
                    )}
                  </Menu>
                </Container>
              ) : (
                <Box
                  display={"flex"}
                  alignItems={"center"}
                  justifyContent={"space-between"}
                  gap={1}
                >
                  <NavLink className={"contained-button"} to="/register">
                    Register
                  </NavLink>

                  <NavLink
                    className={"outlined-button"}
                    to="/login"
                    onClick={() => {
                      // localStorage.setItem("token", "DAN");
                      // window.location.reload();
                    }}
                  >
                    Log in
                  </NavLink>
                </Box>
              )}
              <Menu
                id="notification-menu"
                anchorEl={anchorElNotification}
                open={Boolean(anchorElNotification)}
                onClose={handleNotificationClose}
                anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                transformOrigin={{ vertical: "top", horizontal: "right" }}
                sx={{ width: "90%" }}
              >
                {notificationCount === 0 ? (
                  <MenuItem disabled>No new notifications</MenuItem>
                ) : (
                  notifications.map(
                    (
                      v: { logo: string; title: string; description: string },
                      index
                    ) => (
                      <MenuItem
                        style={{ margin: "0px", padding: "2px" }}
                        key={index + 1}
                        onClick={handleNotificationClose}
                      >
                        <Card sx={{ margin: 0 }}>
                          <CardMedia title={v.title} image={v.logo} />
                          <CardHeader
                            avatar={<Avatar aria-label="" src={v.logo} />}
                            action={
                              <IconButton
                                type="button"
                                aria-label=""
                                onClick={(e) => {
                                  console.log(e.currentTarget);
                                  notifications.splice(index, 1);
                                  console.log(notifications);
                                  setNotificationCount(notifications.length);
                                }}
                              >
                                <Close
                                  color="error"
                                  sx={{
                                    fontSize: "20px",
                                    // border: "1px solid darkRed",
                                    borderRadius: "50%",
                                  }}
                                />
                              </IconButton>
                            }
                            title={v.title}
                            subheader={v.description}
                          />
                        </Card>
                      </MenuItem>
                    )
                  )
                )}
              </Menu>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
      {/* <hr style={{ height: "0.5px" }} /> */}

      {/* Sidebar Drawer for Mobile */}
      <Drawer anchor="left" open={mobileOpen} onClose={handleDrawerToggle}>
        <Box
          sx={{
            width: 250,
            height: "100%",
            backgroundColor: "var(--primary-color)",
            color: "var(--secondary-color)",
          }}
        >
          <List style={{}}>
            {pages.map(({ path, label }) => (
              <ListItem key={path} disablePadding>
                <NavLink style={navLinkStyles} to={`/${path}`} key={path}>
                  <ListItemButton onClick={handleDrawerToggle}>
                    <ListItemText
                      sx={{ textAlign: "center", fontWeight: 100 }}
                      primary={label}
                    />
                  </ListItemButton>
                </NavLink>
              </ListItem>
            ))}
          </List>
        </Box>
      </Drawer>
    </>
  );
}

export default Appbar;
