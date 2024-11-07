import React, { Suspense, useState } from "react";
import "./index.scss";
import back_icon from "../../../assets/icons/back_arrow.svg";
import { Link } from "react-scroll";
import { useNavigate } from "react-router-dom";
import nameIcon from "../../../assets/images/name-image.svg";
import camaraIcon from "../../../assets/images/camara.svg";
import { PatchCallApi, PostCallApi } from "../../../Action/Action";
import ForwordWhite from "../../../assets/icons/whiteIcon/white-forword-arrow.svg";
import { useDispatch, useSelector } from "react-redux";
import { useFilePicker } from "use-file-picker";
import { LoginUser } from "../../../reducers/login";
import { Backdrop, CircularProgress } from "@mui/material";
import { toast, ToastContainer } from "react-toastify";
import { useTranslation } from "react-i18next";

function Profile() {
  const accountInformation = useSelector((state) => state.login.LoginDetails);
  const darkMode = useSelector((state) => state.headerMenu.darkMode);
  const [loader, setLoader] = useState(false);
  const { t } = useTranslation();
  const [firstName, setFirstName] = useState(
    accountInformation?.data?.firstName
  );
  const [lastName, setLastName] = useState(accountInformation?.data?.lastName);
  const [userBio, setUserBio] = useState(accountInformation?.data?.bio);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { openFilePicker } = useFilePicker({
    accept: "image/*",
    multiple: false,
    onFilesSelected: ({ plainFiles, filesContent, errors }) => {
      if (plainFiles.length > 0) {
        uploadProfilePic(plainFiles[0]);
      }
    },
  });

  const uploadProfilePic = async (mediaFile) => {
    setLoader(true);
    let sendData = new FormData();
    sendData.append("media", mediaFile);
    const headers = {
      Authorization: `Bearer ${accountInformation.data.token}`,
      "Content-Type": "multipart/form-data",
      Accept: "*/*",
    };
    let seData = {
      url: `/v1/upload-user-profile-pic`,
      body: sendData,
      headers: headers,
    };
    let res = await PostCallApi(seData);
    if (res?.status === 200) {
      const accountData = JSON.parse(JSON.stringify(accountInformation));
      accountData.data.profilePic = res.data.data.profilePic;
      dispatch(LoginUser(accountData));

      setTimeout(() => {
        toast.success("Profile picture updated successfully", {
          position: "top-right",
          autoClose: 1500,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
      }, 500);
    } else {
      console.log(res);
    }
    setLoader(false);
  };

  const handleBack = () => {
    navigate(-1);
  };

  const onSaveClick = async () => {
    setLoader(true);
    const sendData = {
      firstName: firstName,
      lastName: lastName,
      bio: userBio,
    };
    const headers = {
      Authorization: `Bearer ${accountInformation.data.token}`,
      "Content-Type": "application/json",
      Accept: "*/*",
    };
    let seData = {
      url: `/v1/user/update`,
      body: JSON.stringify(sendData),
      headers: headers,
    };
    let res = await PatchCallApi(seData);
    if (res?.status === 200) {
      const accountData = JSON.parse(JSON.stringify(accountInformation));
      accountData.data.firstName = res.data.data.firstName;
      accountData.data.lastName = res.data.data.lastName;
      accountData.data.bio = res.data.data.bio;
      dispatch(LoginUser(accountData));

      setTimeout(() => {
        toast.success("Profile updated successfully", {
          position: "top-right",
          autoClose: 1500,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
      }, 500);
    } else {
      console.log(res);
    }
    setLoader(false);
  };

  return (
    <div
      className="container-fluid p-0"
      style={{
        backgroundColor: darkMode ? "#040405" : "white",
        height: "100vh",
      }}
    >
      <Suspense>
        <Backdrop sx={{ color: "#fff", zIndex: (theme) => 9999 }} open={loader}>
          <CircularProgress color="inherit" />
        </Backdrop>
        <section
          style={{ backgroundColor: darkMode ? "#040405" : "white" }}
          className="header_for_profile"
        >
          <div className="container-fluid p-0">
            <div className="profile_title">
              <Link onClick={handleBack}>
                <img src={darkMode ? ForwordWhite : back_icon} alt="" />
              </Link>
              <span
                className="ms-4"
                style={{ color: darkMode ? "white" : "#040406" }}
              >
                {t("Profile")}
              </span>
            </div>
          </div>
        </section>
        <div className="image-and-camara-icon-view-container">
          <div className="name-image-icon-container">
            <img
              className="name-icon-image-style"
              src={
                accountInformation?.data?.profilePic
                  ? accountInformation?.data?.profilePic
                  : nameIcon
              }
              alt="name"
            />
            <div onClick={openFilePicker}>
              <img
                className="camara-image-icon"
                src={camaraIcon}
                alt="camara-icon"
              />
            </div>
          </div>
          <div
            style={{ color: darkMode ? "white" : "#040406" }}
            onClick={openFilePicker}
            className="change-profile-text"
          >
            {t("ChangeProfile")}
          </div>
          <div
            style={{ backgroundColor: darkMode ? "white" : "#040406" }}
            className="borderline-view-style"
          />
          <div
            style={{ backgroundColor: darkMode ? "#2F2B43" : "white" }}
            className="name-and-fullname-text-container"
          >
            <div
              style={{ color: darkMode ? "white" : "#040406" }}
              className="name-text-style-view"
            >
              {t("FirstName")}
            </div>
            <input
              style={{ color: darkMode ? "#ABABAB" : "#ADAEB3" }}
              className="fullname-text-style"
              value={firstName}
              onChange={(event) => setFirstName(event.target.value)}
            />
          </div>
          <div className="border-line-info" />
          <div
            style={{ backgroundColor: darkMode ? "#2F2B43" : "white" }}
            className="name-and-fullname-text-container"
          >
            <div
              style={{ color: darkMode ? "white" : "#040406" }}
              className="name-text-style-view"
            >
              {t("LastName")}
            </div>
            <input
              style={{ color: darkMode ? "#ABABAB" : "#ADAEB3" }}
              className="fullname-text-style"
              value={lastName}
              onChange={(event) => setLastName(event.target.value)}
            />
          </div>
          <div className="border-line-info" />
          <div
            style={{ backgroundColor: darkMode ? "#0E181E" : "#ABABAB" }}
            className="email-name-container"
          >
            <div
              style={{ color: darkMode ? "#ABABAB" : "#FFFFFF" }}
              className="email-text-view"
            >
              {t("Email")}
            </div>
            <div
              style={{ color: darkMode ? "#ABABAB" : "#FFFFFF" }}
              className="email-text-view"
            >
              {accountInformation?.data?.email}
            </div>
          </div>
          <div
            style={{
              backgroundColor: darkMode ? "#2F2B43" : "white",
            }}
            className="bio-container"
          >
            <div
              style={{ color: darkMode ? "white" : "#040406" }}
              className="bio-text-style-view"
            >
              {t("Bio")}
            </div>

            <textarea
              style={{ color: darkMode ? "#ABABAB" : "#ADAEB3" }}
              className="prsonal-bio-text-style"
              value={userBio}
              onChange={(event) => setUserBio(event.target.value)}
            />
          </div>
          <div className="border-line-info" />
          <div
            onClick={onSaveClick}
            style={{ width: "583px" }}
            className="varify-btn-container"
          >
            <div className="varify-btn-text-style">{t("Save")}</div>
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
    </div>
  );
}

export default Profile;
