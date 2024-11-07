import React from "react";
import "./index.scss";
import { Menu, MenuItem } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import Fade from "@mui/material/Fade";
function SmallPop({
  anchorEl,
  open,
  handleClose,
  className,
  optionsMenu,
  megamenu,
}) {
  let location = useLocation();
  let nav = useNavigate();
  const handleName = (name) => {
    nav(name, { replace: true });
    handleClose();
  };
  const handleclosepop = () => {
    handleClose();
  };

  return (
    <>
     
      {open ? (
        <Menu
          className={` ${className} ${megamenu ? megamenu : "blockreport_box"}`}
          id="long-menu"
          MenuListProps={{
            "aria-labelledby": "long-button",
          }}
          anchorEl={anchorEl}
          open={open}
          onClose={handleclosepop}
          TransitionComponent={Fade}
        >
          {optionsMenu?.map((option, i) => {
            return (
              <MenuItem
                key={i + 1}
                onClick={() => handleName(option?.url)}
                className={`
          ${location.pathname === option.pathname ? "ac" : ""}`}
              >
                {option.menuIcon ? (
                  <i className={`icon fas fa-${option.menuIcon}`}></i>
                ) : (
                  <i className="icon fas fa-bars"></i>
                )}
                <div className="bac">
                  {option?.menuName} <span>{option?.menuDescription}</span>
                </div>
              </MenuItem>
            );
          })}
        </Menu>
      ) : (
        ""
      )}
      
    </>
  );
}

export default React.memo(SmallPop);
