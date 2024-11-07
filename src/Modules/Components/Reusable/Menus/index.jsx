import React, { useState } from "react";
import { Box, Divider, Menu, MenuItem } from "@mui/material";
import "./index.scss";

const Menus = ({ children, menu = [], value = "", handleChangeValue }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedValue, setSelectedValue] = useState(value);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleChange = (val) => {
    setSelectedValue(val);
    handleChangeValue(val);
    handleClose();
  };

  return (
    <>
      <Box
        aria-controls={open ? "basic-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
      >
        {children({ selectedValue, handleClick })}
      </Box>

      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
        slotProps={{
          paper: {
            elevation: 0,
            sx: {
              mt: 0.5,
              width: "200px",
            },
          },
        }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        {menu.map((option, index) => (
          <>
            <MenuItem
              onClick={() => handleChange(option.value)}
              key={option.name}
              sx={{
                display: "flex",
                gap: "10px",
                padding: "9px 17px",
                borderBottom: index !== menu.length - 1 && "1px solid #CCC",
              }}
            >
              {option.icon && <img src={option.icon} alt={option.icon} />}
              <span className="menu_text"> {option.name}</span>
            </MenuItem>
          </>
        ))}
      </Menu>
    </>
  );
};

export default Menus;
