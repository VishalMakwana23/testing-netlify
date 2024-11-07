import React, { useState } from "react";
import "./index.scss";
import { Box, Drawer } from "@mui/material";
import styled from "styled-components";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

const CloseBtn = styled(ArrowBackIcon)(({ theme }) => ({
  cursor: "pointer",
  borderRadius: "50%",
  padding: "5px",
  fontSize: "1.9rem",
  transition: "background-color 150ms cubic-bezier(0.4, 0, 0.2, 1) 0ms",
  "&:hover": {
    background: "rgba(232, 65, 39, 0.10)",
  },
}));

const CustomDrawer = ({ children, title = "", data = [] }) => {
  const [open, setOpen] = useState(false);

  const toggleDrawer = (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    setOpen(!open);
  };

  return (
    <>
      <Box>{children({ setOpen })}</Box>
      <Drawer
        anchor="right"
        open={open}
        onClose={toggleDrawer}
        className="main_drawer"
      >
        <Box className="drawer_container">
          <Box className="header_container">
            <CloseBtn fontSize="large" onClick={toggleDrawer} />
            <Box className="heading">{title}</Box>
          </Box>

          {data?.map((item) => (
            <Box className="content_container">
              <div className="content_wraper">
                <img className="image" src={item.userImage} alt="" />
                <div>
                  <div className="username">{item.userName}</div>
                  <div className="description">{item.description}</div>
                </div>
              </div>
              <Box>
                <img className="actionImage" src={item?.actionImage} alt="" />
              </Box>
            </Box>
          ))}
        </Box>
      </Drawer>
    </>
  );
};

export default CustomDrawer;
