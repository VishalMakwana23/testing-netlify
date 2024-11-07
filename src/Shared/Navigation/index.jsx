import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Switch from "react-ios-switch";
import "./index.scss";
import {
  Backdrop,
  Box,
  Button,
  CircularProgress,
  Drawer,
  Icon,
  IconButton,
  Menu,
  MenuItem,
  Modal,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useDispatch, useSelector } from "react-redux";
import { resetMenu, setDarkMode } from "../../reducers/menu";
import { resetLogin } from "../../reducers/login";
import logo from "../../assets/media/mainLogo.svg";
import defaultUser from "../../assets/icons/org_user.png";
import user from "../../assets/icons/user.png";
import TestPost from "../../assets/icons/gallery/gallery5.jpeg";
import profile_drop_icon from "../../assets/media/profile_drop_icon.svg";
import calender from "../../assets/images/product-img.jpg";
import forwordArrow from "../../assets/icons/whiteIcon/forwordarrow.svg";
import whiteIcon from "../../assets/icons/whiteIcon/white-icon.svg";
import BlackArrowIcon from "../../assets/icons/whiteIcon/black-arrow.svg";
import BlackAddIcon from "../../assets/icons/black_add.svg";
import Notification from "../../assets/icons/notification.svg";
// import BackIcon from "../../assets/icons/BackIcon.svg";

import { useMediaQuery } from "react-responsive";
import { DeleteCallApi } from "../../Action/Action";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";
import Menus from "../../Modules/Components/Reusable/Menus";
import { AddMenu, notificationData } from "../../Utils/static/staticData";
import styled from "styled-components";
import CustomDrawer from "../../Modules/Components/Reusable/CustomDrawer";

function Navigation(props) {
  const isMobile = useMediaQuery({
    query: "(max-width: 769px) and (min-width: 320px)",
  });
  const darkMode = useSelector((state) => state.headerMenu.darkMode);
  const { handleDrawerToggle, onSearchClick } = props;
  const [anchorEl2, setAnchorEl2] = React.useState(null);
  const [anchorEl3, setAnchorEl3] = React.useState(null);
  const [checked, setChecked] = useState();
  const [deleteAccountModal, setDeleteAccModal] = useState(false);
  const [usernameError, setUsernameError] = useState("");
  const [username, setUserName] = useState("");
  const [loader, setLoader] = useState(false);
  let { pathname } = useLocation();
  const openUMenu = Boolean(anchorEl2);
  const openNotification = Boolean(anchorEl3);
  const { t } = useTranslation();
  const Lang = useSelector((state) => state.language.lang);

  let nav = useNavigate();
  const accountInformation = useSelector((state) => state.login.LoginDetails);

  // const [open, setOpen] = useState(false);

  // const toggleDrawer = (event) => {
  //   if (
  //     event.type === "keydown" &&
  //     (event.key === "Tab" || event.key === "Shift")
  //   ) {
  //     return;
  //   }
  //   setOpen(!open);
  // };

  const handleChangeMenu = (selectedMenu) => {
    console.log("You clicked on menu : ", selectedMenu);
  };

  const handleClickUMenu = (event) => {
    setAnchorEl2(event?.currentTarget);
  };
  const handleCloseUMenu = () => {
    setAnchorEl2(null);
  };

  const handleClickNotification = (event) => {
    setAnchorEl3(event?.currentTarget);
  };
  const handleCloseNotification = () => {
    setAnchorEl3(null);
  };
  let dispatch = useDispatch();

  const onProfileClick = () => {
    setAnchorEl2(null);
    nav("/profile");
  };
  const onSaveItem = () => {
    setAnchorEl2(null);
    nav("/saveItem");
  };
  const onPasswordChange = () => {
    setAnchorEl2(null);
    nav("/changePassword");
  };
  const onAccountBlock = () => {
    setAnchorEl2(null);
    nav("/blockedaccounts");
  };
  const onTermasandCondition = () => {
    setAnchorEl2(null);
    nav("/terms-condition");
  };
  const onPrivacyPolicy = () => {
    setAnchorEl2(null);
    nav("/privacypolicy");
  };
  const onHelp = () => {
    setAnchorEl2(null);
    nav("/helpcenter");
  };

  const handleLogOut = () => {
    localStorage.clear("expireDate");
    dispatch(resetLogin());
    dispatch(resetMenu());
    handleCloseUMenu();
    nav("/", { replace: true });
  };

  const onDeleteAccount = () => {
    setAnchorEl2(null);
    setDeleteAccModal(true);
  };

  const handleDeleteClose = () => {
    setDeleteAccModal(false);
  };

  const onDeleteAccountFinal = async () => {
    if (!username) {
      setUsernameError("Please enter username first.");
      return;
    }

    setLoader(true);
    const headers = {
      Authorization: `Bearer ${accountInformation.data.token}`,
      "Content-Type": "application/json",
      Accept: "*/*",
    };
    let seData = {
      url: `/v1/delete-user-account/${username}`,
      headers: headers,
    };
    let res = await DeleteCallApi(seData);
    if (res?.status === 200) {
      setDeleteAccModal(false);
      setUserName("");
      handleLogOut();
      setTimeout(() => {
        toast.success("Delete account successfully", {
          position: "top-right",
          autoClose: 1500,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
      }, 100);
    } else {
      setUsernameError("Username is not valid.");
    }
    setLoader(false);
  };

  const [settingoptions, setSettingoptions] = useState([
    {
      pathname: "/users",
      menuName: "Manage Users",
    },
    {
      pathname: "/event-approval",
      menuName: "Event Approval",
    },
  ]);
  useEffect(() => {
    if (accountInformation?.roleId === 1) {
      let sm = [
        {
          pathname: "/menus",
          menuName: "Menu List",
        },
        {
          pathname: "/menu-access",
          menuName: "Menu Access",
        },
      ];
      setSettingoptions([...settingoptions, ...sm]);
    }
    // eslint-disable-next-line
  }, [accountInformation]);

  const [innerWidth, setInnerWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setInnerWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const onDarkModeChange = (checked) => {
    setChecked(checked);
    dispatch(setDarkMode(checked));
  };

  const onUserNameChange = (event) => {
    setUserName(event.target.value);
    setUsernameError("");
  };

  const DrawerButtonContainer = styled("div")(() => ({
    display: "flex",
    justifyContent: "space-between",
  }));

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

  return (
    <>
      <section
        className={`navigation ${pathname === "/brief" ? "back_color" : ""}`}
      >
        <div className="container-fluid p-0">
          <div className="main_wrapper">
            <div className="main_wrapper_cotainer d-flex align-items-center justify-between gap-md-4 gap-sm-0">
              <div className="logo minHeight">
                <img src={logo} alt="" />
              </div>
              {accountInformation?.authenticate ? (
                <>
                  {!isMobile ? (
                    <div className="header_action_container">
                      <Menus
                        menu={AddMenu}
                        handleChangeValue={(selectedMenu) =>
                          handleChangeMenu(selectedMenu)
                        }
                      >
                        {({ handleClick }) => (
                          <>
                            <IconButton
                              aria-label="Add"
                              size="large"
                              className="header_action_button"
                              onClick={(e) => handleClick(e)}
                              tabIndex={0}
                            >
                              <Icon className="header_action_icon">
                                <img src={BlackAddIcon} alt="" />
                              </Icon>
                            </IconButton>
                          </>
                        )}
                      </Menus>

                      <CustomDrawer
                        title="Notification"
                        data={notificationData}
                      >
                        {({ setOpen }) => (
                          <IconButton
                            aria-label="Notifications"
                            size="large"
                            className="header_action_button"
                            onClick={() => setOpen(true)}
                          >
                            <Icon className="header_action_icon">
                              <img src={Notification} alt="" />
                            </Icon>
                          </IconButton>
                        )}
                      </CustomDrawer>

                      <div className="header_option" onClick={handleClickUMenu}>
                        {accountInformation?.data?.profilePic ? (
                          <img
                            src={`${accountInformation?.data?.profilePic}`}
                            alt=""
                            className="user_profile"
                            width={50}
                            height={50}
                            onError={({ currentTarget }) => {
                              currentTarget.onerror = null; // prevents looping
                              currentTarget.src = defaultUser;
                            }}
                          />
                        ) : (
                          <>
                            <img
                              src={defaultUser}
                              className="user_profile"
                              width={50}
                              height={50}
                              alt=""
                            />
                          </>
                        )}
                        {!isMobile && (
                          <div className="profile_info">
                            <span
                              style={{ color: darkMode ? "white" : "black" }}
                            >
                              {accountInformation?.data?.firstName +
                                " " +
                                accountInformation?.data?.lastName}
                            </span>
                            <span className="username">
                              {accountInformation?.data?.userName
                                ? `@${accountInformation?.data?.userName}`
                                : ""}
                            </span>
                          </div>
                        )}
                        {!isMobile && (
                          <img
                            src={darkMode ? whiteIcon : profile_drop_icon}
                            alt=""
                          />
                        )}
                      </div>
                    </div>
                  ) : (
                    <Box className="mobile_header_action_container">
                      <Menus
                        menu={AddMenu}
                        handleChangeValue={(selectedMenu) =>
                          handleChangeMenu(selectedMenu)
                        }
                      >
                        {({ handleClick }) => (
                          <>
                            <IconButton
                              aria-label="Add"
                              size="large"
                              className="header_action_button"
                              onClick={(e) => handleClick(e)}
                              style={{
                                width: "28px",
                                height: "28px",
                                border: "unset",
                              }}
                            >
                              <Icon
                                className="header_action_icon"
                                style={{ display: "flex", fontSize: "28px" }}
                              >
                                <img
                                  src={BlackAddIcon}
                                  alt=""
                                  style={{ width: "28px", height: "28px" }}
                                />
                              </Icon>
                            </IconButton>
                          </>
                        )}
                      </Menus>

                      <CustomDrawer
                        title="Notification"
                        data={notificationData}
                      >
                        {({ setOpen }) => (
                          <IconButton
                            aria-label="Notifications"
                            size="large"
                            className="header_action_button"
                            onClick={() => setOpen(true)}
                            style={{
                              width: "28px",
                              height: "28px",
                              border: "unset",
                            }}
                          >
                            <Icon
                              className="header_action_icon"
                              style={{ display: "flex", fontSize: "28px" }}
                            >
                              <img
                                src={Notification}
                                alt=""
                                style={{ width: "28px", height: "28px" }}
                              />
                            </Icon>
                          </IconButton>
                          // <IconButton
                          //   aria-label="Notifications"
                          //   size="large"
                          //   className="header_action_button"
                          //   onClick={() => setOpen(true)}
                          // >
                          //   <Icon className="header_action_icon">
                          //     <img src={Notification} alt="" />
                          //   </Icon>
                          // </IconButton>
                        )}
                      </CustomDrawer>
                    </Box>
                  )}
                </>
              ) : (
                ""
              )}
            </div>
          </div>
        </div>
      </section>
      <Menu
        className="notification_list"
        id="long-menu"
        MenuListProps={{
          "aria-labelledby": "long-button",
        }}
        anchorEl={anchorEl2}
        open={openUMenu}
        onClose={handleCloseUMenu}
      >
        <div
          style={{
            backgroundColor: darkMode ? "black" : "rgb(225, 225, 225)",
          }}
          className="profile-optionmenu"
        >
          <div
            style={{ color: darkMode ? "#FFFFFF" : "#040406" }}
            className="account-and-help-text-style"
          >
            {t("MyAccount")}
          </div>
          {false && (
            <div
              style={{
                backgroundColor: darkMode ? "#0E181E" : "white",
              }}
              className="theme-container-info"
            >
              <div
                style={{
                  color: darkMode ? "white" : "#040406",
                  backgroundColor: darkMode ? "#0E181E" : "white",
                }}
                className="setting-text-style "
              >
                {t("DarkTheme")}
              </div>
              <Switch checked={checked} onChange={onDarkModeChange} />
            </div>
          )}

          <div className="border-style-lineview" />
          <div
            style={{
              backgroundColor: darkMode ? "#0E181E" : "white",
            }}
            onClick={onProfileClick}
            className="theme-container-info"
          >
            <div
              style={{
                color: darkMode ? "white" : "#040406",
                backgroundColor: darkMode ? "#0E181E" : "white",
              }}
              className="setting-text-style "
            >
              {t("MyProfile")}
            </div>
            <img
              style={{
                backgroundColor: darkMode ? "#0E181E" : "white",
              }}
              className="foeword-arrow-style"
              src={darkMode ? BlackArrowIcon : forwordArrow}
              alt="forword-arrow"
            />
          </div>
          <div className="border-style-lineview" />
          <div
            style={{
              backgroundColor: darkMode ? "#0E181E" : "white",
            }}
            onClick={onPasswordChange}
            className="theme-container-info"
          >
            <div
              style={{
                color: darkMode ? "white" : "#040406",
                backgroundColor: darkMode ? "#0E181E" : "white",
              }}
              className="setting-text-style "
            >
              {t("ChangePassword")}
            </div>
            <img
              style={{
                backgroundColor: darkMode ? "#0E181E" : "white",
              }}
              className="foeword-arrow-style"
              src={darkMode ? BlackArrowIcon : forwordArrow}
              alt="forword-arrow"
            />
          </div>
          <div className="border-style-lineview" />
          <div
            style={{
              backgroundColor: darkMode ? "#0E181E" : "white",
            }}
            onClick={onSaveItem}
            className="theme-container-info"
          >
            <div
              style={{
                color: darkMode ? "white" : "#040406",
                backgroundColor: darkMode ? "#0E181E" : "white",
              }}
              className="setting-text-style "
            >
              {t("SavedItems")}
            </div>
            <img
              style={{
                backgroundColor: darkMode ? "#0E181E" : "white",
              }}
              className="foeword-arrow-style"
              src={darkMode ? BlackArrowIcon : forwordArrow}
              alt="forword-arrow"
            />
          </div>
          <div className="border-style-lineview" />
          {false && (
            <div
              style={{
                backgroundColor: darkMode ? "#0E181E" : "white",
              }}
              onClick={onAccountBlock}
              className="theme-container-info"
            >
              <div
                style={{
                  color: darkMode ? "white" : "#040406",
                  backgroundColor: darkMode ? "#0E181E" : "white",
                }}
                className="setting-text-style "
              >
                {t("BlockedAccounts")}
              </div>
              <img
                style={{
                  backgroundColor: darkMode ? "#0E181E" : "white",
                }}
                className="foeword-arrow-style"
                src={darkMode ? BlackArrowIcon : forwordArrow}
                alt="forword-arrow"
              />
            </div>
          )}
          <div
            style={{ color: darkMode ? "#FFFFFF" : "#040406" }}
            className="account-and-help-text-style"
          >
            {t("Help")}
          </div>
          <div
            style={{
              backgroundColor: darkMode ? "#0E181E" : "white",
            }}
            onClick={onTermasandCondition}
            className="theme-container-info"
          >
            <div
              style={{
                color: darkMode ? "white" : "#040406",
                backgroundColor: darkMode ? "#0E181E" : "white",
              }}
              className="setting-text-style "
            >
              {t("TermsCondition")}
            </div>
            <img
              style={{
                backgroundColor: darkMode ? "#0E181E" : "white",
              }}
              className="foeword-arrow-style"
              src={darkMode ? BlackArrowIcon : forwordArrow}
              alt="forword-arrow"
            />
          </div>
          <div className="border-style-lineview" />
          <div
            style={{
              backgroundColor: darkMode ? "#0E181E" : "white",
            }}
            onClick={onPrivacyPolicy}
            className="theme-container-info"
          >
            <div
              style={{
                color: darkMode ? "white" : "#040406",
                backgroundColor: darkMode ? "#0E181E" : "white",
              }}
              className="setting-text-style "
            >
              {t("Policy")}
            </div>
            <img
              style={{
                backgroundColor: darkMode ? "#0E181E" : "white",
              }}
              className="foeword-arrow-style"
              src={darkMode ? BlackArrowIcon : forwordArrow}
              alt="forword-arrow"
            />
          </div>
          <div className="border-style-lineview" />
          <div
            style={{
              backgroundColor: darkMode ? "#0E181E" : "white",
            }}
            onClick={onHelp}
            className="theme-container-info"
          >
            <div
              style={{
                color: darkMode ? "white" : "#040406",
                backgroundColor: darkMode ? "#0E181E" : "white",
              }}
              className="setting-text-style "
            >
              {t("HelpCenter")}
            </div>
            <img
              style={{
                backgroundColor: darkMode ? "#0E181E" : "white",
              }}
              className="foeword-arrow-style"
              src={darkMode ? BlackArrowIcon : forwordArrow}
              alt="forword-arrow"
            />
          </div>
          <div className="border-style-lineview" />
          <div
            style={{
              color: "#E84127",
              fontWeight: "bold",
              backgroundColor: darkMode ? "#0E181E" : "white",
            }}
            onClick={onDeleteAccount}
            className="setting-text-style "
          >
            {t("DeleteAccount")}
          </div>
          <div className="border-style-lineview" />
          <div
            style={{
              color: "#E84127",
              fontWeight: "bold",
              backgroundColor: darkMode ? "#0E181E" : "white",
            }}
            onClick={handleLogOut}
            className="setting-text-style "
          >
            {t("Logout")}
          </div>
        </div>
      </Menu>

      <Menu
        className="notification_list"
        id="long-menu"
        MenuListProps={{
          "aria-labelledby": "long-button",
        }}
        anchorEl={anchorEl3}
        open={openNotification}
        onClose={handleCloseNotification}
      >
        <div className="box">
          <div className="title">Notification</div>
          <div className="new">
            <span>New</span>
            <MenuItem>
              <img src={user} className="profile" alt="" />
              <div className="content">
                Mh.Jessile who might know, is on instagram. <span>21h</span>
              </div>
              <button className="small_theme_btn">Follow</button>
            </MenuItem>
            <MenuItem>
              <img src={user} className="profile" alt="" />
              <div className="content">
                Mh.Jessile who might know, is on instagram. <span>21h</span>
              </div>
              <button className="small_theme_btn">Follow</button>
            </MenuItem>
          </div>
          <div className="today">
            <span>Today</span>
            <MenuItem>
              <img src={user} className="profile" alt="" />
              <div className="content">
                Mh.Jessile who might know, is on instagram. <span>21h</span>
              </div>
              <button className="small_theme_btn">Follow</button>
            </MenuItem>
            <MenuItem>
              <img src={user} className="profile" alt="" />
              <div className="content">
                Mh.Jessile who might know, is on instagram. <span>21h</span>
              </div>
              <img src={calender} className="notification_image" alt="" />
              {/* <button className="small_theme_btn">Follow</button> */}
            </MenuItem>
          </div>
          <div className="week">
            <span>This Week</span>
            <MenuItem>
              <img src={user} className="profile" alt="" />
              <div className="content">
                Mh.Jessile who might know, is on instagram. <span>21h</span>
              </div>
              <button className="small_theme_btn">Follow</button>
            </MenuItem>
            <MenuItem>
              <img src={user} className="profile" alt="" />
              <div className="content">
                Mh.Jessile who might know, is on instagram. <span>21h</span>
              </div>
              {/* <button className="small_theme_btn">Follow</button> */}
              <img src={calender} className="notification_image" alt="" />
            </MenuItem>
            <MenuItem>
              <img src={user} className="profile" alt="" />
              <div className="content">
                Mh.Jessile who might know, is on instagram. <span>21h</span>
              </div>
              <button className="small_theme_btn">Follow</button>
            </MenuItem>
            <MenuItem>
              <img src={user} className="profile" alt="" />
              <div className="content">
                Mh.Jessile who might know, is on instagram. <span>21h</span>
              </div>
              <button className="small_theme_btn">Follow</button>
            </MenuItem>
          </div>
          <div className="month">
            <span>This Month</span>
            <MenuItem>
              <img src={user} className="profile" alt="" />
              <div className="content">
                Mh.Jessile who might know, is on instagram. <span>21h</span>
              </div>
              <button className="small_theme_btn">Follow</button>
            </MenuItem>
            <MenuItem>
              <img src={user} className="profile" alt="" />
              <div className="content">
                Mh.Jessile who might know, is on instagram. <span>21h</span>
              </div>
              <button className="small_theme_btn">Follow</button>
            </MenuItem>
          </div>
        </div>
      </Menu>
      <Modal
        open={deleteAccountModal}
        onClose={handleDeleteClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        className="toggle_img_Show"
      >
        <div className="deleteModalContainer">
          <Backdrop
            sx={{ color: "#fff", zIndex: (theme) => 9999 }}
            open={loader}
          >
            <CircularProgress color="inherit" />
          </Backdrop>
          <div className="deleteModalView">
            <IconButton
              aria-label="close"
              onClick={handleDeleteClose}
              sx={{
                position: "absolute",
                right: 8,
                top: 8,
                color: (theme) => theme.palette.grey[500],
                bgcolor: "#fff",
              }}
            >
              <CloseIcon />
            </IconButton>
            <div className="delete-account-txt-msg">
              {t("EnterUserName")}
              <div style={{ color: "#E84127", marginLeft: "6px" }}>
                {t("ToDeleteAccount")}
              </div>
            </div>
            <div className="delete-account-username-msg">
              {t("Username")}:{" "}
              <p className="delete-username-txt">
                {accountInformation?.data?.userName}
              </p>
            </div>
            <div className="form-group margin-delete-account-view">
              <label>{t("Username")}</label>
              <input
                type="text"
                className="form-control"
                value={username}
                onChange={onUserNameChange}
                placeholder={t("EnterYourUsername")}
              />
              {usernameError && (
                <span role="alert" className="error_text">
                  {usernameError}
                </span>
              )}
            </div>
            <div
              className="theme_btn margin-delete-account-view p-3"
              style={{ cursor: "pointer" }}
              onClick={onDeleteAccountFinal}
            >
              {t("DeleteAccount")}
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
}

export default React.memo(Navigation);
