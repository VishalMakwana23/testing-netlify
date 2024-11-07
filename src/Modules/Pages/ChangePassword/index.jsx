import React, { Suspense, useState } from "react";
import "./index.scss";
import back_icon from "../../../assets/icons/back_arrow.svg";
import { Link } from "react-scroll";
import { useNavigate } from "react-router-dom";
import eyeOff from "../../../assets/images/onHideEye.svg";
import eye from "../../../assets/images/onEye.svg";
import { useForm } from "react-hook-form";
import ForwordWhite from "../../../assets/icons/whiteIcon/white-forword-arrow.svg";
import WhiteEyeOff from "../../../assets/icons/whiteIcon/white-eye-off.svg";
import WhiteEye from "../../../assets/icons/whiteIcon/white-eye.svg";
import { useSelector } from "react-redux";
import { Backdrop, CircularProgress } from "@mui/material";
import { PostCallApi } from "../../../Action/Action";
import { ToastContainer, toast } from "react-toastify";
import { useTranslation } from "react-i18next";

const renderLoader = () => <p></p>;

function ChangePassword() {
  const darkMode = useSelector((state) => state.headerMenu.darkMode);
  const accountInformation = useSelector((state) => state.login.LoginDetails);
  let navigate = useNavigate();
  const [loader, setLoader] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm();

  const handleBack = () => {
    navigate(-1);
  };

  const [passwordShown, setPasswordShown] = useState(false);
  const { t } = useTranslation();
  const [CurrentPassword, setCurrentPassword] = useState(false);
  const [newPassword, setNewPassword] = useState(false);

  const togglePasswordVisiblity = () => {
    setPasswordShown(!passwordShown);
  };

  const currentPasswordVisibility = () => {
    setCurrentPassword(!CurrentPassword);
  };

  const newPasswordVisibility = () => {
    setNewPassword(!newPassword);
  };

  const onVerifyClick = async (values) => {
    if (values.confirmPassword !== values.newPassword) {
      setError("confirmPassword", { message: t("PasswordMatchError") });
      return;
    }
    setLoader(true);
    const headers = {
      Authorization: `Bearer ${accountInformation.data.token}`,
      "Content-Type": "application/json",
      Accept: "*/*",
    };
    let seData = {
      url: `v1/change-password`,
      headers: headers,
      body: {
        oldpassword: values.currentPassword,
        password: values.newPassword,
        confirmpassword: values.confirmPassword,
      },
    };
    let resp = await PostCallApi(seData);
    setLoader(false);
    if (resp?.status === 200) {
      navigate("/congratulation", { replace: true });
    } else {
      toast.error(t("ChangePasswordError"), {
        position: "top-right",
        autoClose: 1500,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    }
  };

  return (
    <>
      <Suspense fallback={renderLoader()}>
        <Backdrop
          open={loader}
          sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        >
          <CircularProgress color="inherit" />
        </Backdrop>
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
                {t("ChangePassword")}
              </span>
            </div>
          </div>
        </section>
        <div
          style={{ backgroundColor: darkMode ? "#040405" : "white" }}
          className="change-password-container"
        >
          <div className="change-password-main-container">
            <div
              style={{ color: darkMode ? "white" : "#040406" }}
              className="password-change-text"
            >
              {t("CurrentPassword")}
            </div>
            <div className="password password-input">
              <input
                style={{
                  backgroundColor: darkMode ? "#040405" : "white",
                  color: darkMode ? "white" : "#040406",
                }}
                name="currentPassword"
                className="form-control password-input-container"
                placeholder="******"
                type={CurrentPassword ? "text" : "password"}
                {...register("currentPassword", {
                  required: {
                    value: true,
                    message: t("ErrorMsg"),
                  },
                  pattern: {
                    value: /^\S+$/,
                    message: t("WhiteSpaceErrormsg"),
                  },
                  minLength: {
                    value: 8,
                    message: t("8DigiteError"),
                  },
                  maxLength: {
                    value: 15,
                    message: t("15DigiteError"),
                  },
                })}
              />
              <span className="eye" onClick={currentPasswordVisibility}>
                <img
                  src={
                    CurrentPassword === true
                      ? darkMode
                        ? WhiteEyeOff
                        : eyeOff
                      : darkMode
                      ? WhiteEye
                      : eye
                  }
                  alt="eye"
                />
              </span>
            </div>
            {errors.currentPassword && (
              <span role="alert" className="error_text">
                {errors.currentPassword.message}
              </span>
            )}
            <div
              style={{ color: darkMode ? "white" : "#040406" }}
              className="password-change-text"
            >
              {t("NewPassword")}
            </div>
            <div className="password password-input">
              <input
                style={{
                  backgroundColor: darkMode ? "#040405" : "white",
                  color: darkMode ? "white" : "#040406",
                }}
                name="newPassword"
                className="form-control password-input-container"
                placeholder="******"
                type={newPassword ? "text" : "password"}
                {...register("newPassword", {
                  required: {
                    value: true,
                    message: t("ErrorMsg"),
                  },
                  pattern: {
                    value: /^\S+$/,
                    message: t("WhiteSpaceErrormsg"),
                  },
                  minLength: {
                    value: 8,
                    message: t("8DigiteError"),
                  },
                  maxLength: {
                    value: 15,
                    message: t("15DigiteError"),
                  },
                })}
              />
              <span className="eye" onClick={newPasswordVisibility}>
                <img
                  src={
                    newPassword === true
                      ? darkMode
                        ? WhiteEyeOff
                        : eyeOff
                      : darkMode
                      ? WhiteEye
                      : eye
                  }
                  alt="eye"
                />
              </span>
            </div>
            {errors.newPassword && (
              <span role="alert" className="error_text">
                {errors.newPassword.message}
              </span>
            )}
            <div
              style={{ color: darkMode ? "white" : "#040406" }}
              className="password-change-text"
            >
              {t("ConfirmPassword")}
            </div>
            <div className="password password-input">
              <input
                style={{
                  backgroundColor: darkMode ? "#040405" : "white",
                  color: darkMode ? "white" : "#040406",
                }}
                name="confirmPassword"
                className="form-control password-input-container"
                placeholder="******"
                type={passwordShown ? "text" : "password"}
                {...register("confirmPassword", {
                  required: {
                    value: true,
                    message: t("ErrorMsg"),
                  },
                  pattern: {
                    value: /^\S+$/,
                    message: t("WhiteSpaceErrormsg"),
                  },
                  minLength: {
                    value: 8,
                    message: t("8DigiteError"),
                  },
                  maxLength: {
                    value: 15,
                    message: t("15DigiteError"),
                  },
                })}
              />
              <span className="eye" onClick={togglePasswordVisiblity}>
                <img
                  src={
                    passwordShown === true
                      ? darkMode
                        ? WhiteEyeOff
                        : eyeOff
                      : darkMode
                      ? WhiteEye
                      : eye
                  }
                  alt="eye"
                />
              </span>
            </div>
            {errors.confirmPassword && (
              <span role="alert" className="error_text">
                {errors.confirmPassword.message}
              </span>
            )}
          </div>
          <div
            type="submit"
            onClick={handleSubmit(onVerifyClick)}
            className="varify-btn-container"
          >
            <div className="varify-btn-text-style">{t("Verify")}</div>
          </div>
        </div>
      </Suspense>
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
    </>
  );
}

export default ChangePassword;
