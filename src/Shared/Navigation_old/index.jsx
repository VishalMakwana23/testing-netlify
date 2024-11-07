import React, { useEffect, useState } from "react";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import { Collapse, Nav, Navbar, NavbarToggler } from "reactstrap";
import "./index.scss";
import { Menu, MenuItem } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { resetMenu } from "../../reducers/menu";
import { resetLogin } from "../../reducers/login";
import AssignHeadMenu from "../AssignHeadMenu";
import logo from "../../assets/media/mainLogo.svg";
import defaultUser from "../../assets/icons/org_user.png";
import { Config } from "../../Utils/Config";
import notification_icon from "../../assets/media/notification_icon.svg";
import user from "../../assets/icons/user.png";
import profile_drop_icon from "../../assets/media/profile_drop_icon.svg"

function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [anchorEl2, setAnchorEl2] = React.useState(null);
  const [anchorEl3, setAnchorEl3] = React.useState(null);
  const openUMenu = Boolean(anchorEl2);
  const openNotification = Boolean(anchorEl3);

  let nav = useNavigate();
  const accountInformation = useSelector((state) => state.login.LoginDetails);

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

  const handleLogOut = () => {
    localStorage.clear("expireDate");
    dispatch(resetLogin());
    dispatch(resetMenu());
    handleCloseUMenu();
    nav("/", { replace: true });
  };
  const loggedIn = useSelector(
    (state) => state.login?.LoginDetails?.authenticate
  );
  let location = useLocation();

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
  return (
    <>
      <section className={`navigation`}>
        <div className="container-fluid">
          <div className="main_wrapper">
            <Navbar expand="xxl" className="nav_bar gap-5">
              <div className="mobile_toggle">
                <NavLink className="NavLink p-0" to={"/dashboard"}>
                  <img src={logo} className="logo img-fluid" alt="" />
                </NavLink>
                <NavbarToggler
                  onClick={() => {
                    setIsOpen(!isOpen);
                  }}
                >
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M3 12H16"
                      stroke="#666666"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M3 6H21"
                      stroke="#fff"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M3 18H21"
                      stroke="#fff"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </NavbarToggler>
              </div>
              <Collapse
                isOpen={isOpen}
                navbar
                className="header_nav justify-content-end justify-content-xl-between justify-content-lg-between"
              >
                {loggedIn &&
                  location.pathname !== "/" &&
                  location.pathname !== "/login" &&
                  location?.pathname !== "/register" &&
                  location?.pathname !== "/forgot-passowrd" ? (
                  <>
                    <Nav navbar className="nav_action ms-4">
                      <AssignHeadMenu />
                    </Nav>
                  </>
                ) : (
                  ""
                )}
                <div
                  className="notoficatoin ms-auto"
                  onClick={handleClickNotification}
                >
                  <img src={notification_icon} alt="" />
                </div>
                {accountInformation?.authenticate ? (
                  <div className="header_option" onClick={handleClickUMenu}>
                    {accountInformation?.data?.profilePic ? (
                      <img
                        src={`${Config.API_HOST_URL_live}${accountInformation?.data?.profilePic}`}
                        alt=""
                        className="user_profile"
                        width={42}
                        height={42}
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
                          width={42}
                          height={42}
                          alt=""
                        />
                      </>
                    )}
                    <div className="profile_info">
                      <span>
                        {accountInformation?.data?.firstName +
                          " " +
                          accountInformation?.data?.lastName}
                      </span>
                      <span className="username">
                        {accountInformation?.data?.userName
                          ? accountInformation?.data?.userName
                          : ""}
                      </span>
                    </div>
                    <img src={profile_drop_icon} alt="" />
                  </div>
                ) : (
                  ""
                )}
              </Collapse>
            </Navbar>
          </div>
        </div>
      </section>
      <Menu
        className="menu_list"
        id="long-menu"
        MenuListProps={{
          "aria-labelledby": "long-button",
        }}
        anchorEl={anchorEl2}
        open={openUMenu}
        onClose={handleCloseUMenu}
      >
        {accountInformation?.roleName === "Admin" ||
          accountInformation?.roleName === "Exhibitor" ? (
          <MenuItem onClick={handleCloseUMenu}>
            <Link
              to={`/exhibitor-profile/${accountInformation?.userId}`}
              style={{
                textDecoration: "none",
                color: "inherit",
              }}
            >
              Profile
            </Link>
          </MenuItem>
        ) : (
          ""
        )}
        <MenuItem onClick={handleLogOut}>
          <span className="header_user_link_text2">Logout</span>
        </MenuItem>
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
    </>
  );
}

export default React.memo(Navigation);
