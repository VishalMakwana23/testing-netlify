import React, { useState } from "react";
import List from "@mui/material/List";
import { Link, useLocation } from "react-router-dom";
import { ListItem, ListItemText, Typography } from "@mui/material";
import GrayHome from "../../assets/icons/grayIcon/gray-home.svg";
import GraySearch from "../../assets/icons/grayIcon/gray-search.svg";
import GrayBlogs from "../../assets/icons/grayIcon/gray-blogs.svg";
import GrayBriefs from "../../assets/icons/grayIcon/gray-briefs.svg";
import GrayChat from "../../assets/icons/grayIcon/gray-chat.svg";
import GrayProfile from "../../assets/icons/grayIcon/gray-profile.svg";
import HomeActive from "../../assets/icons/MenuActiveIcon/home.svg";
import SearchActive from "../../assets/icons/MenuActiveIcon/search.svg";
import BlogsActive from "../../assets/icons/MenuActiveIcon/blogs.svg";
import BriefsActive from "../../assets/icons/MenuActiveIcon/briefs.svg";
import ChatActive from "../../assets/icons/MenuActiveIcon/chat.svg";
import ProfileActive from "../../assets/icons/MenuActiveIcon/profile.svg";
import SmallModal from "../../Modules/Components/Reusable/Modal/small/SmallModal";

function FooterIcon() {
  const { pathname } = useLocation();
  const [active, setActive] = useState({
    link: pathname,
  });

  const menu = [
    {
      icon: GrayHome,
      icon1: HomeActive,
      menu: "Home",
      link: "/dashboard",
    },
    {
      icon: GraySearch,
      icon1: SearchActive,
      menu: "search",
      link: "/search",
      // btn: true,
    },
    {
      icon: GrayBlogs,
      icon1: BlogsActive,
      menu: "Blogs",
      link: "/blogs",
    },
    {
      icon: GrayBriefs,
      icon1: BriefsActive,
      menu: "Briefs",
      link: "/brief",
    },
    {
      icon: GrayChat,
      icon1: ChatActive,
      menu: "Chats",
      link: "/chats",
    },
    {
      icon: GrayProfile,
      icon1: ProfileActive,
      menu: "Profile",
      link: "/studio",
    },
  ];

  const [openSmall, setOpenSmall] = useState(false);

  const handleActive = (item) => {
    setActive(item);
  };

  const handleOpen = () => {
    setOpenSmall(true);
  };

  const drawer = (
    <List>
      {menu.map((item, i) => (
        <ListItem key={i}>
          {item?.btn ? (
            <Link onClick={handleOpen}>
              <img src={item?.icon} className="img-fluid" alt="menuIcon" />
            </Link>
          ) : (
            <Link
              to={`${item?.link}`}
              onClick={() => handleActive(item)}
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              {active?.link === item?.link ? (
                <img src={item?.icon1} className="img-fluid" alt="menuIcon" />
              ) : (
                <img
                  src={item?.icon}
                  className="img-fluid"
                  alt="menuIconDifferent"
                />
              )}

              <ListItemText
                primary={
                  <Typography
                    variant="body2"
                    style={{
                      color: active?.link === item?.link ? "#E84127" : "#666",
                      fontWeight: active?.link === item?.link ? "600" : "400",
                      textAlign: "center",
                      fontFamily: "Inter",
                      fontSize: "12px",
                      fontStyle: "normal",
                      lineHeight: "120%",
                    }}
                    className="menu-item"
                  >
                    {item?.menu}
                  </Typography>
                }
              />
            </Link>
          )}
        </ListItem>
      ))}
    </List>
  );

  return (
    <>
      <div className="footer_sec">
        <div className="icons">{drawer}</div>
      </div>
      <SmallModal
        openSmall={openSmall}
        setOpenSmall={setOpenSmall}
        briefBlog={true}
      />
    </>
  );
}

export default FooterIcon;
