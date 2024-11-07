import React, { Suspense, useState } from "react";
import "./index.scss";
import back_icon from "../../../assets/icons/back_arrow.svg";
import back_icon_small from "../../../assets/icons/Back.svg";
import logo from "../../../assets/media/mainLogo.svg";
import { useEffect } from "react";
import { GetCallApi } from "./../../../Action/Action";
import ForwordWhite from "../../../assets/icons/whiteIcon/white-forword-arrow.svg";
import { useSelector } from "react-redux";
import { Backdrop, CircularProgress } from "@mui/material";
import { Link } from "react-scroll";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

const renderLoader = () => <p></p>;

function TermsCondition() {
  const darkMode = useSelector((state) => state.headerMenu.darkMode);
  const [privacy, setPrivacy] = useState([]);
  const [open, setOpen] = useState(false);
  const { t } = useTranslation();
  let navigate = useNavigate();

  const headers = {
    "Content-Type": "application/json",
    Accept: "*/*",
  };

  useEffect(() => {
    getPrivacy();
    // eslint-disable-next-line
  }, []);

  const getPrivacy = async () => {
    setOpen(true);
    let seData = {
      url: `/v1/privacypolicy`,
      headers: headers,
    };

    let res = await GetCallApi(seData);
    setOpen(false);
    if (res?.status === 200) {
      const getData = res?.data?.data;
      setPrivacy(getData ? getData : []);
    } else {
      setPrivacy([]);
    }
  };

  const handleBack = () => {
    navigate(-1);
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
        open={open}
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
      <Suspense fallback={renderLoader()}>
        <section
          style={{ backgroundColor: darkMode ? "#040405" : "white" }}
          className="header_for_privacy"
        >
          <div className="container-fluid p-0">
            <div className="privacy_title d-none d-xl-block d-md-block d-sm-block d-xs-none">
              <Link onClick={handleBack}>
                <img src={darkMode ? ForwordWhite : back_icon} alt="" />
              </Link>
              <span
                className="ms-4"
                style={{ color: darkMode ? "white" : "#040406" }}
              >
                {t("Policy")}
              </span>
            </div>
            <div className="logo minHeight d-block d-xl-none d-md-none d-sm-none d-xs-block">
              <img src={logo} alt="" />
            </div>
          </div>
        </section>
        <div
          style={{ color: darkMode ? "white" : "#040406" }}
          className="col-md-12"
        >
          <div className="main_div">
            <div className="privacy_title_inside d-none d-xl-none d-md-none d-sm-none d-xs-block">
              <Link onClick={handleBack}>
                <img src={back_icon_small} alt="" />
              </Link>
              <span className="text-black ms-4">{t("Policy")}</span>
            </div>
            {/* <h5 className='mb-4'>
              Your Privacy Matters
            </h5> */}
            <p>{privacy?.privacyAndPloicy}</p>
          </div>
        </div>
      </Suspense>
    </div>
  );
}

export default TermsCondition;
