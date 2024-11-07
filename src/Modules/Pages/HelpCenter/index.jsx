import React, { Suspense } from "react";
import "./index.scss";
import logo from "../../../assets/media/mainLogo.svg";
import deafultUser from "../../../assets/icons/org_user.png";
import sendIcon from "../../../assets/images/send.svg";
import imageIcon from "../../../assets/images/imageicon.svg";
import WhiteImageIcon from "../../../assets/icons/whiteIcon/white-image-icon.svg";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";

const renderLoader = () => <p></p>;

const chatList = [
  {
    message: "Oh yes this looks great!",
    image: null,
    isSelf: true,
  },
  {
    userIcon: deafultUser,
    message: "Antelope Canyon guide tour",
    image:
      "https://s3-alpha-sig.figma.com/img/78f5/9dfc/dce549907976b2521e322ff7c63417ac?Expires=1716163200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=aLKOM~Wrm5VGgUOvDju0da9ywqoOmmWWtkdEDUzKdttzFylBxC-FB6Zk43yzjyAluNlDkheibvJ1shm3WlKDmm1XBlyXS0gsBL~VwwoZUwhaRa6Pf4Rsl5Prg3l2lE0bOJSZAmcS0lSW0~b~tqa3LDIx9mxdy3BezP-YW7jr3Gw7fpE80qKveUkolvB8pIbOZi~rrrLpE6uZSixWlM1cE5~5pGHNgpYARUu66j7RFyyevoV6557WUUyFGVtJwNSN6DONKSE~qMX-BWoR~i8X7PxHVtPQbG65hnaKK~j9iU-OnJIjmEmxXSe2mCkYm5q9Eg1Iq7FeL83VIEPk8jq9Dg__",
    isSelf: false,
  },
  {
    userIcon: deafultUser,
    message: "What do you think?",
    image: null,
    isSelf: false,
  },
  {
    message: "Same! Can’t wait.",
    image: null,
    isSelf: true,
  },
  {
    userIcon: deafultUser,
    message: "Looking forward to the trip.",
    image: null,
    isSelf: false,
  },
  {
    message: "Oh yes this looks great!",
    image: null,
    isSelf: true,
  },
  {
    userIcon: deafultUser,
    message: "Antelope Canyon guide tour",
    image:
      "https://s3-alpha-sig.figma.com/img/78f5/9dfc/dce549907976b2521e322ff7c63417ac?Expires=1716163200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=aLKOM~Wrm5VGgUOvDju0da9ywqoOmmWWtkdEDUzKdttzFylBxC-FB6Zk43yzjyAluNlDkheibvJ1shm3WlKDmm1XBlyXS0gsBL~VwwoZUwhaRa6Pf4Rsl5Prg3l2lE0bOJSZAmcS0lSW0~b~tqa3LDIx9mxdy3BezP-YW7jr3Gw7fpE80qKveUkolvB8pIbOZi~rrrLpE6uZSixWlM1cE5~5pGHNgpYARUu66j7RFyyevoV6557WUUyFGVtJwNSN6DONKSE~qMX-BWoR~i8X7PxHVtPQbG65hnaKK~j9iU-OnJIjmEmxXSe2mCkYm5q9Eg1Iq7FeL83VIEPk8jq9Dg__",
    isSelf: false,
  },
  {
    userIcon: deafultUser,
    message: "What do you think?",
    image: null,
    isSelf: false,
  },
  {
    message: "Same! Can’t wait.",
    image: null,
    isSelf: true,
  },
  {
    userIcon: deafultUser,
    message: "Looking forward to the trip.",
    image: null,
    isSelf: false,
  },
];

function HelpCenter() {
  const darkMode = useSelector((state) => state.headerMenu.darkMode);
  const { t } = useTranslation();

  const renderChatItem = (item) => {
    return (
      <div className={item.isSelf ? "msg-self-container" : "msg-container"}>
        {!item.isSelf && (
          <img
            className="user-msg-item-img"
            alt="user-msg-img"
            src={item.userIcon}
          />
        )}
        {!item.image && (
          <div
            className={item.isSelf ? "msg-self-message" : "msg-message"}
            style={{
              background: !item.isSelf
                ? darkMode
                  ? "#0F0E0F"
                  : "#575252"
                : undefined,
            }}
          >
            {item.message}
          </div>
        )}
        {item.image && (
          <div className="chat-item-img-container">
            <img
              className="chat-img-withtext"
              alt="chat-img"
              src={item.image}
            />
            <div
              className="chat-img-text-overlay"
              style={{
                background: !item.isSelf
                  ? darkMode
                    ? "#0F0E0F"
                    : "#575252"
                  : undefined,
              }}
            >
              <div className="msg-text-with-image">{item.message}</div>
              <div className="main-dish-text-img-msg">Main Diish</div>
            </div>
          </div>
        )}
      </div>
    );
  };

  return (
    <>
      <Suspense fallback={renderLoader()}>
        <section
          style={{ backgroundColor: darkMode ? "#040405" : "white" }}
          className="header_for_terms"
        >
          <div className="container top">
            <div className="col-md-12">
              <div className="logo-iamge-style">
                <img src={logo} alt="" />
                <div className="lenguageSelect"></div>
              </div>
            </div>
          </div>
        </section>
        <div
          style={{ backgroundColor: darkMode ? "#040405" : "white" }}
          className="help-center-main-container"
        >
          <div className="help-center-view">
            <div
              className="chat-msg-scroll-view chat-msg-helper-scroll-view"
              style={{ background: darkMode ? "#040405" : "white" }}
            >
              {chatList.map(renderChatItem)}
              <div
                style={{ backgroundColor: darkMode ? "#040405" : "white" }}
                className="time-Text"
              >
                Today 8:43 AM
              </div>
            </div>
          </div>
        </div>
        <div
          style={{ backgroundColor: darkMode ? "#0E181E" : "#575252" }}
          className="type-main-container help-center-send-view"
        >
          <div className="type-main-container-help">
            <div
              style={{ backgroundColor: darkMode ? "#0F0E0F" : "#FFFFFF" }}
              className="type-text-container"
            >
              <input
                style={{
                  backgroundColor: darkMode ? "#0F0E0F" : "#FFFFFF",
                  color: darkMode ? "white" : "#000000",
                }}
                className="type-text-input"
                placeholder={t("TypeHere")}
              />
              <img
                className="image-icon-btn"
                src={darkMode ? WhiteImageIcon : imageIcon}
                alt="im-icon"
              />
            </div>
            <div className="send-image-btn">
              <img src={sendIcon} alt="send-icon" />
            </div>
          </div>
        </div>
      </Suspense>
    </>
  );
}

export default HelpCenter;
