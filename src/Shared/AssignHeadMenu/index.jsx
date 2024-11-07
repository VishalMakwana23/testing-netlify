import React, { useEffect, useState } from "react";
import "./index.scss";
import { useSelector } from "react-redux";
import ArrowDropDownRoundedIcon from "@mui/icons-material/ArrowDropDownRounded";
import Smallpop from "../../Modules/Components/Reusable/Smallpop";
import { useNavigate } from "react-router-dom";

function AssignHeadMenu() {
  const [options, setOptions] = useState();
  const [showMenu, setShowMenu] = useState([]);
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClose = () => {
    setAnchorEl(null);
  };
  const MenuList = useSelector((state) => state.headerMenu?.LoginHeadList);

  const MenuName = useSelector((state) => state.setting?.MenuName);
  let navigate = useNavigate();
  const showSub = (event, item) => {
    if (item?.subMenu?.length === 0) {
      navigate(item?.url, { replace: true });
      setAnchorEl();
      setOptions();
    } else if (item?.subMenu !== undefined) {
      setAnchorEl(event?.currentTarget);
      let subMenu = [...item?.subMenu];
      subMenu = subMenu.sort((a, b) => {
        const nameA = a.sequenceNumber;
        const nameB = b.sequenceNumber;
        if (nameA < nameB) {
          return -1;
        }
        if (nameA > nameB) {
          return 1;
        }
        return 0;
      });
      setOptions(subMenu);
    } else {
      setAnchorEl();
      setOptions();
    }
  };
  useEffect(() => {
    if (MenuList?.length > 0) {
      let sendM = [...MenuList];
      setTimeout(() => {
        sendM = sendM.sort((a, b) => {
          const nameA = a.sequenceNumber;
          const nameB = b.sequenceNumber;
          if (nameA < nameB) {
            return -1;
          }
          if (nameA > nameB) {
            return 1;
          }
          return 0;
        });
        setShowMenu(sendM);
      }, 1000);
    }
    // eslint-disable-next-line
  }, [MenuList]);
  return (
    <div className="Assign_Menu_header ">
      {showMenu?.map((item, i) => (
        <React.Fragment key={i}>
          {item?.subMenu?.length > 0 ? (
            <div
              className={`menu_text ${
                item.subMenu?.find((data) => data?.menuName === MenuName)
                  ? `linear ${MenuName} `
                  : ""
              }`}
              key={i}
              onClick={(e) => showSub(e, item)}
            >
              {item.menuName}
              {item?.subMenu?.length > 0 ? (
                <ArrowDropDownRoundedIcon></ArrowDropDownRoundedIcon>
              ) : (
                ""
              )}
            </div>
          ) : (
            <div
              className={`menu_text ${
                item.subMenu?.find((data) => data?.menuName === MenuName)
                  ? `linear ${MenuName} `
                  : ""
              }`}
              key={i}
              onClick={(e) => showSub(e, item)}
            >
              {item.menuName}
            </div>
          )}
        </React.Fragment>
      ))}
      <Smallpop
        anchorEl={anchorEl}
        open={open}
        handleClose={handleClose}
        optionsMenu={options}
        megamenu={options?.length >= 4 ? "megamenu" : ""}
        className={`Menu_icon_settings`}
      />
    </div>
  );
}

export default React.memo(AssignHeadMenu);
