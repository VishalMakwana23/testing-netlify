import React, { useEffect, useState } from "react";
import { useMediaQuery } from "react-responsive";
import { io } from "socket.io-client";
import deafultUser from "../../../assets/icons/org_user.png"
import sendIcon from "../../../assets/images/send.svg";
import imageIcon from "../../../assets/images/imageicon.svg";
import BackIcon from "../../../assets/icons/Back.svg";
import "./index.scss";
import { useSelector } from "react-redux";
import { Backdrop, CircularProgress } from "@mui/material";
import { GetMsgCallApi } from "../../../Action/Action";
import moment from "moment/moment";
import { useTranslation } from "react-i18next";

function InBox() {
  const isChatHideWidth = useMediaQuery({
    query: "(max-width: 768px) and (min-width: 479px)",
  });
  const { t } = useTranslation();
  const isMobileView = useMediaQuery({
    query: "(max-width: 478px)",
  });
  const [isCoversationOpen, setCoversationOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState({});
  const accountInformation = useSelector((state) => state.login.LoginDetails);
  const token = useSelector((state) => state.login.LoginDetails.data.token);
  const [openCircle, setOpenCircle] = useState(false);
  const [userList, setUserList] = useState([]);

  const initializeSocket = () => {
    const socket = io(
      "https://maindiish-msg-system-65d63ed2667f.herokuapp.com",
      {
        withCredentials: true,
        extraHeaders: {
          Authorization: `Bearer ${token}`,
        },
        cors: {
          origin: '*',
        },
        transports: ["websocket"],
      }
    );

    socket.on("connect", function () {
      console.log("check 2", socket.connected);
    });

    socket.on("connect_error", (err) => {
      console.log(`connect_error due to ${err}`);
    });
  };

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

  useEffect(() => {
    getuserList();
    initializeSocket();
    // eslint-disable-next-line
  }, []);

  const getuserList = async () => {
    const headers = {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      Accept: "*/*",
    };
    setOpenCircle(true);
    let seData = {
      url: `/chat/participants`,
      headers: headers,
    };

    let res = await GetMsgCallApi(seData);
    setOpenCircle(false);
    console.log(res?.status, "resreste");
    if (res?.status === 200) {
      const getData = res.data.data?.map((p) => {
        return {
          ...p,
        };
      });
      setUserList(getData?.length > 0 ? getData : []);
    } else {
      setUserList([]);
    }
  };

  const onChatUserClick = (userItem) => {
    setSelectedUser(userItem);
    setCoversationOpen(true);
  };

  const onBackChatPress = () => {
    setCoversationOpen(false);
  };

  const renderUserItem = (item) => {
    return (
      <div>
        <div onClick={() => onChatUserClick(item)} className="chat-item-view">
          <img
            className="user-chat-img"
            src={item.user.profilePic}
            alt="user-icon"
          />
          {!isChatHideWidth && (
            <div className="chat-user-info-container">
              <div className="chat-user-name-text">{item.user.firstName}</div>
              <div className="chat-user-last-msg-text">{item.lastMessage}</div>
            </div>
          )}
          {!isChatHideWidth && (
            <div className="chat-user-time-info">
              <div className="user-chat-time">
                {moment(item.lastMessageTimestamp).format("hh:mm A")}
              </div>
              <div className="unread-user-chat">1</div>
            </div>
          )}
        </div>
        {!isChatHideWidth && <div className="chat-item-divider" />}
      </div>
    );
  };

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
          <div className={item.isSelf ? "msg-self-message" : "msg-message"}>
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
            <div className="chat-img-text-overlay">
              <div className="msg-text-with-image">{item.message}</div>
              <div className="main-dish-text-img-msg">Main Diish</div>
            </div>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="container-fluid">
      <Backdrop
        open={openCircle}
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
      <div className="row">
        <div className="col-md-12 p-0">
          <div className="inboxContainer">
            {!isCoversationOpen && isMobileView ? (
              <div className="chat-list-scroll-view">
                {userList.map(renderUserItem)}
              </div>
            ) : (
              !isMobileView && (
                <div
                  className={
                    !isChatHideWidth ? "col-md-3 p-0 chatList" : "p-0 chatList"
                  }
                >
                  <div className="header-container">
                    {isChatHideWidth
                      ? ""
                      : accountInformation?.data?.firstName +
                        " " +
                        accountInformation?.data?.lastName}
                  </div>
                  <div className="chat-list-scroll-view">
                    {userList.map(renderUserItem)}
                  </div>
                </div>
              )
            )}
            {(isCoversationOpen || !isMobileView) && (
              <div
                className={
                  isMobileView
                    ? "w-100 p-0"
                    : isChatHideWidth
                    ? "w-100 p-0"
                    : "col-md-9 p-0"
                }
              >
                {isMobileView ? (
                  <div
                    onClick={onBackChatPress}
                    className="header-container-mobile"
                  >
                    <img
                      className="user-chat-header-img"
                      src={BackIcon}
                      alt="user-icon"
                    />
                    <div>Bryan</div>
                  </div>
                ) : (
                  <div className="header-container">
                    <img
                      className="user-chat-header-img"
                      src={selectedUser?.user?.profilePic}
                      alt="user-icon"
                    />
                    <div>{selectedUser?.user?.firstName}</div>
                  </div>
                )}
                <div className="chat-msg-scroll-view">
                  {chatList.map(renderChatItem)}
                  <div className="time-Text">Today 8:43 AM</div>
                </div>
                <div className="type-main-container">
                  <div className="type-text-container">
                    <input
                      className="type-text-input"
                      placeholder={t("TypeHere")}
                    />
                    <img
                      className="image-icon-btn"
                      src={imageIcon}
                      alt="im-icon"
                    />
                  </div>
                  <div className="send-image-btn">
                    <img src={sendIcon} alt="send-icon" />
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default InBox;
