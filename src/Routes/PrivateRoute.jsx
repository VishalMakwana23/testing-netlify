import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, Navigate, useLocation, useNavigate } from "react-router-dom";
import { AppBar, Typography } from "@mui/material";
import { ToastContainer } from "react-toastify";
import "./index.scss";
import Navigation from "../Shared/Navigation";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import { useTranslation } from "react-i18next";
import FooterIcon from "../Shared/Footer/FooterIcon";
import SmallModal from "./../Modules/Components/Reusable/Modal/small/SmallModal";
import ResponsiveDrawer from "../Modules/Pages/SearchBar";
import WhiteIcon from "../assets/icons/whiteIcon/search_white.svg";
import WhiteBrief from "../assets/icons/whiteIcon/white-brief.svg";

import GrayHome from "../assets/icons/grayIcon/gray-home.svg";
import GraySearch from "../assets/icons/grayIcon/gray-search.svg";
import GrayBlogs from "../assets/icons/grayIcon/gray-blogs.svg";
import GrayBriefs from "../assets/icons/grayIcon/gray-briefs.svg";
import GrayChat from "../assets/icons/grayIcon/gray-chat.svg";
import GrayProfile from "../assets/icons/grayIcon/gray-profile.svg";
import GraySettings from "../assets/icons/grayIcon/gray-settings.svg";
import GrayLogout from "../assets/icons/grayIcon/gray-logout.svg";
// Active Icons
import HomeActive from "../assets/icons/MenuActiveIcon/home.svg";
import SearchActive from "../assets/icons/MenuActiveIcon/search.svg";
import BlogsActive from "../assets/icons/MenuActiveIcon/blogs.svg";
import BriefsActive from "../assets/icons/MenuActiveIcon/briefs.svg";
import ChatActive from "../assets/icons/MenuActiveIcon/chat.svg";
import ProfileActive from "../assets/icons/MenuActiveIcon/profile.svg";
import SettingsActive from "../assets/icons/MenuActiveIcon/settings.svg";
import LogoutActive from "../assets/icons/MenuActiveIcon/logout.svg";
import { resetLogin } from "../reducers/login";
import { resetMenu } from "../reducers/menu";

const drawerWidth = 240;
const drawerWidthMobile = 0;

function PrivateRoute({ children }) {
  const darkMode = useSelector((state) => state.headerMenu.darkMode);
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [isClosing, setIsClosing] = React.useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const { pathname } = useLocation();
  const { t } = useTranslation();
  const [active, setActive] = useState({
    link: pathname,
  });
  let dispatch = useDispatch();
  let nav = useNavigate();

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 769);
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const loggedIn = useSelector(
    (state) => state.login?.LoginDetails?.authenticate
  );

  const Lang = useSelector((state) => state.language.lang);
  if (Lang === "ar") {
    var langRight = 0;
    var langLeft = "auto";
  }
  const handleDrawerClose = () => {
    setIsClosing(true);
    setMobileOpen(false);
  };

  const handleDrawerTransitionEnd = () => {
    setIsClosing(false);
  };

  const handleDrawerToggle = () => {
    if (!isClosing) {
      setMobileOpen(!mobileOpen);
    }
  };

  const menu = [
    {
      icon: GrayHome,
      icon1: HomeActive,
      menu: t("Home"),
      link: "/dashboard",
    },
    {
      icon: darkMode ? WhiteIcon : GraySearch,
      icon1: SearchActive,
      menu: t("search"),
      link: "/search",
      btn: true,
    },
    {
      icon: GrayBlogs,
      icon1: BlogsActive,
      menu: t("Blogs"),
      link: "/blogs",
    },
    {
      icon: darkMode ? WhiteBrief : GrayBriefs,
      icon1: BriefsActive,
      menu: t("Briefs"),
      link: "/brief",
    },
    {
      icon: GrayChat,
      icon1: ChatActive,
      menu: t("Chats"),
      link: "/chats",
    },
    {
      icon: GrayProfile,
      icon1: ProfileActive,
      menu: t("Profile"),
      link: "/studio",
    },
    {
      icon: GraySettings,
      icon1: SettingsActive,
      menu: t("Settings"),
      link: "/settings",
    },
    {
      icon: GrayLogout,
      icon1: LogoutActive,
      menu: t("Logout"),
      link: "/logout",
      btn: true,
    },
  ];

  const handleActive = (item) => {
    setActive(item);
  };

  const handleLogOut = () => {
    localStorage.clear("expireDate");
    dispatch(resetLogin());
    dispatch(resetMenu());
    nav("/", { replace: true });
  };

  const handleSearch = (item) => {
    DrawerToggle(
      item?.menu === "Search"
        ? true
        : item?.menu === "Logout"
        ? handleLogOut()
        : false
    );
  };

  const drawer = (
    <List
      style={{
        padding: !isMobile ? "25px" : "5px",
        backgroundColor: darkMode ? "#000" : "#fff",
      }}
    >
      {menu.map((item, i) => (
        <ListItem
          key={i}
          style={{
            padding: "16px",
            borderRadius: active?.link === item?.link && "12px",
            background:
              active?.link === item?.link && "rgba(232, 65, 39, 0.10)",
          }}
        >
          {console.log(active.link, item.link)}
          {item?.btn ? (
            <Link className="gap-3" onClick={() => handleSearch(item)}>
              {active?.link === item?.link ? (
                <img src={item?.icon1} className="img-fluid" alt="menuIcon" />
              ) : (
                <img src={item?.icon} className="img-fluid" alt="menuIcon" />
              )}
              {!isMobile && (
                <ListItemText
                  primary={
                    <Typography
                      variant="body2"
                      style={{
                        color:
                          active?.link === item?.link
                            ? "#E84127"
                            : darkMode
                            ? "white"
                            : "inherit",
                        fontFamily: "Inter",
                        fontSize: "18px",
                        fontStyle: "normal",
                        fontWeight: active?.link === item?.link ? "600" : "400",
                        lineHeight: "120%",
                      }}
                    >
                      {item?.menu}
                    </Typography>
                  }
                />
              )}
            </Link>
          ) : (
            <Link
              className="gap-3"
              to={`${item?.link}`}
              onClick={() => handleActive(item)}
            >
              {active?.link === item?.link ? (
                <img src={item?.icon1} className="img-fluid" alt="menuIcon" />
              ) : (
                <img src={item?.icon} className="img-fluid" alt="menuIcon" />
              )}
              {!isMobile && (
                <ListItemText
                  primary={
                    <Typography
                      variant="body2"
                      style={{
                        color:
                          active?.link === item?.link
                            ? "#E84127"
                            : darkMode
                            ? "white"
                            : "inherit",
                        fontFamily: "Inter",
                        fontSize: "18px",
                        fontStyle: "normal",
                        fontWeight: active?.link === item?.link ? "600" : "400",
                        lineHeight: "120%",
                      }}
                    >
                      {item?.menu}
                    </Typography>
                  }
                />
              )}
            </Link>
          )}
        </ListItem>
      ))}
    </List>
  );
  const [mOpen, setMOpen] = React.useState(false);
  const [isClose, setIsClose] = React.useState(false);

  const DrawerToggle = (val) => {
    if (!isClose) {
      setMOpen(!mOpen);
    }
  };

  const [openSmall, setOpenSmall] = useState(false);

  const handleOpen = () => {
    setOpenSmall(true);
  };

  return loggedIn ? (
    pathname === "/profile" ||
    pathname === "/changePassword" ||
    pathname === "/blockedaccounts" ||
    pathname === "/termsandConditions" ||
    pathname === "/helpcenter" ||
    pathname === "/saveItem" ? (
      children
    ) : (
      <>
        <div className={`main ${Lang === "ar" ? "right" : ""}`}>
          <AppBar
            // position="fixed"
            sx={{
              background: { sm: darkMode ? "#000" : `#fff` },
              boxShadow: { sm: `none`, xs: `none` },
            }}
            className={`header ${pathname === "/brief" ? "back_header" : ""}`}
          >
            <Navigation
              isClosing={isClosing}
              onSearchClick={() => DrawerToggle(true)}
              handleDrawerToggle={handleDrawerToggle}
            />
          </AppBar>
          <Box
            sx={{
              display: "flex",
              background: { sm: darkMode ? "#000" : `#fff` },
            }}
          >
            <Box
              className="customeNavigation"
              component="nav"
              sx={{
                width: { sm: isMobile ? drawerWidthMobile : drawerWidth },
                flexShrink: { sm: 0 },
                background: { sm: darkMode ? "#000" : `#fff` },
              }}
            >
              <Drawer
                variant="permanent"
                sx={{
                  display: { xs: "none", sm: "block" },
                  "& .MuiDrawer-paper": {
                    boxSizing: "border-box",
                    width: isMobile ? drawerWidthMobile : drawerWidth,
                    height: "100%",
                    backgroundColor: darkMode ? "#000" : "#fff",
                    right: langRight,
                    left: langLeft,
                  },
                }}
                open
              >
                {drawer}
              </Drawer>
            </Box>
            <Box
              component="main"
              className="main-wrapper"
              sx={{
                flexGrow: 1,
                width: {
                  sm: `calc(100% - ${
                    isMobile ? drawerWidthMobile : drawerWidth
                  }px)`,
                },
              }}
            >
              {children}
              <FooterIcon />
            </Box>
          </Box>

          <ToastContainer
            position="top-right"
            autoClose={2000}
            hideProgressBar
            newestOnTop
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="dark"
          />
        </div>
        <SmallModal
          openSmall={openSmall}
          setOpenSmall={setOpenSmall}
          briefBlog={true}
        />
        <ResponsiveDrawer
          handleDrawerToggle={DrawerToggle}
          setIsClose={setIsClose}
          isClose={isClose}
          mOpen={mOpen}
          setMOpen={setMOpen}
        />
      </>
    )
  ) : (
    <Navigate to="/" />
  );
}

export default PrivateRoute;
