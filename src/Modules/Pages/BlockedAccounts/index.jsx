import React, { Suspense } from "react";
import "./index.scss";
import back_icon from "../../../assets/icons/back_arrow.svg";
import { Backdrop, CircularProgress } from "@mui/material";
import { Link } from "react-scroll";
import { useNavigate } from "react-router-dom";
import defaultUserIcon from "../../../assets/icons/org_user.png";
import ForwordWhite from "../../../assets/icons/whiteIcon/white-forword-arrow.svg";
import { useSelector } from "react-redux";

const renderLoader = () => <p></p>;

function BlockedAccounts() {
  const darkMode = useSelector((state) => state.headerMenu.darkMode);
  let navigate = useNavigate();

  const handleBack = () => {
    navigate(-1);
  };

  const BlockAccountInfo = [
    {
      image: defaultUserIcon,
      name: "MH.Jessile",
      text: "1.1k followers",
    },
    {
      image: defaultUserIcon,
      name: "Hassan Wali",
      text: "1.1k followers",
    },
    {
      image: defaultUserIcon,
      name: "Jessica_010",
      text: "1.1k followers",
    },
    {
      image: defaultUserIcon,
      name: "Aleezy_44",
      text: "1.1k followers",
    },
    {
      image: defaultUserIcon,
      name: "Hassan Wali",
      text: "1.1k followers",
    },
    {
      image: defaultUserIcon,
      name: "Jessica_010",
      text: "1.1k followers",
    },
    {
      image: defaultUserIcon,
      name: "Aleezy_44",
      text: "Followed by uidesigner & +4 more",
    },
    {
      image: defaultUserIcon,
      name: "MH.Jessile",
      text: "Followed by uidesigner & +4 more",
    },
    {
      image: defaultUserIcon,
      name: "Jessica_010",
      text: "Followed by rehman22",
    },
  ];
  const renderBlockItem = (item) => {
    return (
      <div className="iamge-and-text-main-contaioner">
        <div className="image-and-unblock-text-container">
          <img className="block-image-style" src={item.image} alt="user" />
          <div className="name-and-followers-info-container">
            <div
              style={{ color: darkMode ? "white" : "#040406" }}
              className="main-name-text-style"
            >
              {item.name}
            </div>
            <div
              style={{ color: darkMode ? "white" : "#040406" }}
              className="followers-info-text"
            >
              {item.text}
            </div>
          </div>
        </div>
        <div className="unblock-container">
          <div className="unblock-text-style">Unblock</div>
        </div>
      </div>
    );
  };

  return (
    <div
      className="container-fluid p-0"
      style={{
        backgroundColor: darkMode ? "#040405" : "white",
        height: "100vh",
      }}
    >
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
      <Suspense fallback={renderLoader()}>
        <section
          style={{ backgroundColor: darkMode ? "#040405" : "white" }}
          className="header_for_terms"
        >
          <div className="container-fluid p-0">
            <div className="terms_title d-none d-xl-block d-md-block d-sm-block d-xs-none">
              <Link onClick={handleBack}>
                <img src={darkMode ? ForwordWhite : back_icon} alt="" />
              </Link>
              <span
                className="ms-4"
                style={{ color: darkMode ? "white" : "#040406" }}
              >
                Blocked Accounts
              </span>
            </div>
          </div>
        </section>
        <div className="block-account-container">
          <div className="block-account-main-container">
            <div
              style={{ color: darkMode ? "white" : "#040406" }}
              className="block-account-text-info"
            >
              Blocked Accounts
            </div>
            {BlockAccountInfo.map(renderBlockItem)}
          </div>
        </div>
      </Suspense>
    </div>
  );
}

export default BlockedAccounts;
