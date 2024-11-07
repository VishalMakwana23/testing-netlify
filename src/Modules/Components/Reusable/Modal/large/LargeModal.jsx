import * as React from "react";
import Modal from "@mui/joy/Modal";
import ModalClose from "@mui/joy/ModalClose";
import Sheet from "@mui/joy/Sheet";
import deafultUser from "../../../../../assets/icons/org_user.png";
import heart_icon from "../../../../../assets/icons/like.svg";
import message_icon from "../../../../../assets/icons/comment.svg";
import view_icon from "../../../../../assets/icons/view.svg";
import send_icon from "../../../../../assets/icons/send.svg";
import more_icon from "../../../../../assets/media/more_icon.svg";
import noImage from "../../../../../assets/images/noImage.png";
import WhiteLike from "../../../../../assets/icons/whiteIcon/white-like-icon.svg";
import WhiteMessage from "../../../../../assets/icons/whiteIcon/white-message.svg";
import WhiteEye from "../../../../../assets/icons/whiteIcon/white-eye-btn.svg";
import BlackOutlineLike from "../../../../../assets/icons/whiteIcon/like-outline-black.svg";
import WhiteOutlineLike from "../../../../../assets/icons/whiteIcon/like-outline-white.svg";
import "./index.scss";
import { IconButton } from "@mui/material";
import SmallModal from "../small/SmallModal";
// import Carousel from 'better-react-carousel';
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { useSelector } from "react-redux";
import {
  GetCallApi,
  PatchCallApi,
  PostCallApi,
} from "../../../../../Action/Action";
import moment from "moment/moment";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

export default function LargeModal(props) {
  const darkMode = useSelector((state) => state.headerMenu.darkMode);
  const token = useSelector((state) => state.login.LoginDetails.data.token);
  const accountInformation = useSelector((state) => state.login.LoginDetails);
  const { sendData, open, setOpen, onLikeUnlikePost } = props;
  const [openSmall, setOpenSmall] = React.useState(false);
  const [commentList, setCommentList] = React.useState([]);
  const [comment, setComment] = React.useState("");
  const [follow, setFollow] = React.useState(sendData?.followStatus);
  const { t } = useTranslation();
  const isSelfPost = accountInformation?.data?._id === sendData?.owner?._id;
  const navigate = useNavigate();

  const getCommentList = async () => {
    const headers = {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
      Accept: "*/*",
    };
    let seData = {
      url: `v1/comment/readAll/byVideoId/${sendData._id}/1`,
      headers: headers,
    };

    let res = await GetCallApi(seData);
    if (res?.status === 200) {
      setCommentList(res.data.data);
    }
  };

  React.useEffect(() => {
    setFollow(sendData?.followStatus);
    // eslint-disable-next-line
  }, [sendData]);

  React.useEffect(() => {
    if (open) {
      getCommentList();
    } else {
      setCommentList([]);
    }
    // eslint-disable-next-line
  }, [open]);

  const smallPopup = () => {
    setOpenSmall(true);
  };
  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 1,
      slidesToSlide: 1, // Number of slides to scroll at a time
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 1,
      slidesToSlide: 1, // Number of slides to scroll at a time
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
      slidesToSlide: 1, // Number of slides to scroll at a time
    },
  };

  const onCommentChange = (event) => {
    setComment(event.target.value);
  };

  const commentItemRender = () => {
    return (
      <div className="comment-scroll-view">
        {commentList.map((commentItem) => (
          <>
            <div className="user_profile d-flex align-items-center mt-3">
              <img
                src={
                  commentItem?.commenterID?.profilePic
                    ? commentItem?.commenterID?.profilePic
                    : deafultUser
                }
                className="comment-user-image"
                alt=""
              />
              <div className="ms-3 me-3 users mt-1" style={{ width: "70px" }}>
                <h6>{commentItem?.commenterID?.userName}</h6>
              </div>
              <span className="desc" style={{ display: "flex", flex: 1 }}>
                {commentItem?.comment}
              </span>
            </div>
            <div className="reply_likes d-flex justify-content-start gap-3 mt-1">
              <span>{moment(commentItem.createdAt).fromNow()}</span>
            </div>
          </>
        ))}
      </div>
    );
  };

  const onSendComment = async () => {
    const headers = {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
      Accept: "*/*",
    };
    let seData = {
      url: `v1/comment/add/${sendData._id}`,
      headers: headers,
      body: {
        comment: comment,
      },
    };
    setComment("");
    await PostCallApi(seData);
    getCommentList();
  };

  const onAboutThisAccount = () => {
    setOpenSmall(false);
    setOpen(false);
    navigate(`/studio`, { state: { id: sendData.owner._id } });
  };

  const onFollowClick = () => {
    setOpenSmall(false);
    setFollow(!follow);
    const headers = {
      Authorization: `Bearer ${accountInformation.data.token}`,
      "Content-Type": "application/json",
      Accept: "*/*",
    };
    let seData = {
      url: `v1/follow/${sendData.owner._id}`,
      headers: headers,
    };
    PatchCallApi(seData);
  };

  const onLikeUnlikeClick = () => {
    onLikeUnlikePost(sendData);
  };

  return (
    <React.Fragment>
      {open && (
        <Modal
          aria-labelledby="modal-title"
          aria-describedby="modal-desc"
          open={open}
          onClose={() => setOpen(false)}
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
          className="largeModal"
        >
          <Sheet
            variant="outlined"
            sx={{
              maxWidth: 1000,
              borderRadius: "md",
              p: 3,
              boxShadow: "lg",
              backgroundColor: darkMode ? "#1B1B1B" : "#fff",
            }}
          >
            <ModalClose variant="plain" />
            {props?.brief ? (
              <div className="row">
                <div className="col-md-6 left">
                  <div className="images">
                    {/* <img src={imgData?.mediaURL} alt='' width="400px" /> */}
                    {sendData?.mediaURL ? (
                      /\.(mp4|webm)$/i.test(sendData.mediaURL) ? (
                        <video
                          controls
                          className="video video-player-post"
                          width="100%"
                          autoPlay
                          height="100%"
                          style={{ borderRadius: "8px 8px" }}
                        >
                          <source src={sendData.mediaURL} type="video/mp4" />
                        </video>
                      ) : (
                        <img src={sendData.mediaURL} alt="" />
                      )
                    ) : (
                      <p>No media available</p>
                    )}
                  </div>
                </div>
                <div className="col-md-6 right">
                  <div className="d-flex justify-content-between">
                    <div className="d-flex align-items-center ">
                      <div className="profile">
                        <img
                          src={
                            sendData?.owner?.profilePic
                              ? sendData?.owner?.profilePic
                              : deafultUser
                          }
                          alt=""
                        />
                      </div>
                      <div
                        style={{
                          color: darkMode ? "#ffffff" : "#000000",
                          marginLeft: "10px",
                        }}
                        className="post_name"
                      >
                        {sendData?.owner?.firstName +
                          " " +
                          sendData?.owner?.lastName}
                      </div>
                    </div>
                    <div className="follow_btn">
                      {!isSelfPost && (
                        <button
                          className="theme_btn me-4"
                          onClick={onFollowClick}
                        >
                          {follow ? t("Unfollow") : t("Follow")}
                        </button>
                      )}
                      <IconButton onClick={smallPopup}>
                        <img src={more_icon} alt="" />
                      </IconButton>
                    </div>
                  </div>
                  <div className="row-post-detail-view mt-2">
                    <div className="type-post-text">
                      {props.brief ? "brief" : sendData.type || "Brief"}
                    </div>
                    <div> - {moment(sendData.createdAt).fromNow()}</div>
                  </div>
                  <div className="right_side">
                    <p>{sendData?.title}</p>
                    <span>
                      {sendData?.description}
                    </span>
                    <div className="popup_hashtags">
                      <span>{sendData?.hashtags?.join(" ")}</span>
                    </div>
                    {commentItemRender()}
                    <div className="brief_likes mt-4">
                      <div
                        className="d-flex align-items-center gap-1"
                        onClick={onLikeUnlikeClick}
                      >
                        <img
                          src={
                            darkMode
                              ? sendData?.likeStatus
                                ? WhiteLike
                                : WhiteOutlineLike
                              : sendData?.likeStatus
                              ? heart_icon
                              : BlackOutlineLike
                          }
                          alt=""
                        />
                        <h5 className="m-0">{sendData?.likes}</h5>
                      </div>
                      <div className="d-flex align-items-center gap-1">
                        <img src={message_icon} alt="" />
                        <h5 className="m-0">{sendData?.comments}</h5>
                      </div>
                      <div className="d-flex align-items-center gap-1">
                        <img src={view_icon} alt="" />
                        <h5 className="m-0">{sendData?.views}</h5>
                      </div>
                    </div>
                  </div>
                  <div className="upload_img d-flex">
                    <div className="brief w-100">
                      <input
                        value={comment}
                        onChange={onCommentChange}
                        type="text"
                        style={{ color: darkMode ? "white" : "black" }}
                        placeholder={t("WriteOpinion")}
                      />
                      <IconButton component="label"></IconButton>
                    </div>
                    <div className="brief_send">
                      <button onClick={onSendComment}>
                        <img src={send_icon} alt="" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ) : props?.trend ? (
              <div className="row">
                <div className="col-md-5 left">
                  <div className="images">
                    {/* <img src={imgData?.mediaURL} alt='' width="400px" /> */}
                    {sendData?.mediaURL ? (
                      /\.(mp4|webm)$/i.test(sendData.mediaURL) ? (
                        <video
                          controls
                          className="video video-player-post"
                          width="100%"
                          autoPlay
                          height="100%"
                          style={{ borderRadius: "8px 8px" }}
                        >
                          <source src={sendData.mediaURL} type="video/mp4" />
                        </video>
                      ) : (
                        <img src={sendData.mediaURL} alt="" />
                      )
                    ) : (
                      <p>No media available</p>
                    )}
                  </div>
                </div>
                <div className="col-md-7 right">
                  <div className="d-flex justify-content-between">
                    <div className="d-flex align-items-center ">
                      <div className="profile">
                        <img
                          src={
                            sendData?.owner?.profilePic
                              ? sendData?.owner?.profilePic
                              : deafultUser
                          }
                          alt=""
                        />
                      </div>
                      <div
                        style={{
                          color: darkMode ? "#ffffff" : "#000000",
                          marginLeft: "10px",
                        }}
                        className="post_name"
                      >
                        {sendData?.owner?.firstName +
                          " " +
                          sendData?.owner?.lastName}
                      </div>
                    </div>
                    <div className="follow_btn">
                      {!isSelfPost && (
                        <button
                          className="theme_btn me-4"
                          onClick={onFollowClick}
                        >
                          {follow ? t("Unfollow") : t("Follow")}
                        </button>
                      )}
                      {/* <IconButton onClick={smallPopup} ><img src={more_icon} alt="" /></IconButton> */}
                    </div>
                  </div>
                  <div className="row-post-detail-view">
                    <div className="type-post-text">
                      {sendData.type || "Brief"}
                    </div>
                    <div> - {moment(sendData.createdAt).fromNow()}</div>
                  </div>
                  <div className="right_side">
                    <p>{sendData?.title}</p>
                    <span>
                      {sendData?.description}
                    </span>
                    <div className="popup_hashtags">
                      <span>{sendData?.hashtags?.join(" ")}</span>
                    </div>
                    {commentItemRender()}
                    <div className="brief_likes mt-4">
                      <div
                        className="d-flex align-items-center gap-1"
                        onClick={onLikeUnlikeClick}
                      >
                        <img
                          src={
                            darkMode
                              ? sendData?.likeStatus
                                ? WhiteLike
                                : WhiteOutlineLike
                              : sendData?.likeStatus
                              ? heart_icon
                              : BlackOutlineLike
                          }
                          alt=""
                        />
                        <h5
                          style={{ color: darkMode ? "#ffffff" : "#000000" }}
                          className="m-0"
                        >
                          {sendData?.likes}
                        </h5>
                      </div>
                      <div className="d-flex align-items-center gap-1">
                        <img
                          src={darkMode ? WhiteMessage : message_icon}
                          alt=""
                        />
                        <h5
                          style={{ color: darkMode ? "#ffffff" : "#000000" }}
                          className="m-0"
                        >
                          {sendData?.comments}
                        </h5>
                      </div>
                      <div className="d-flex align-items-center gap-1">
                        <img src={darkMode ? WhiteEye : view_icon} alt="" />
                        <h5
                          style={{ color: darkMode ? "#ffffff" : "#000000" }}
                          className="m-0"
                        >
                          {sendData?.views}
                        </h5>
                      </div>
                    </div>
                  </div>
                  <div className="upload_img d-flex">
                    <div className="brief w-100">
                      <input
                        value={comment}
                        onChange={onCommentChange}
                        style={{ color: darkMode ? "white" : "black" }}
                        type="text"
                        placeholder={t("WriteOpinion")}
                      />
                      <IconButton component="label">
                        <input type="file" hidden />
                      </IconButton>
                    </div>
                    <div className="brief_send">
                      <button onClick={onSendComment}>
                        <img src={send_icon} alt="" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="popMainWrapper">
                <div className="row">
                  <div className="col-md-6 left">
                    {sendData?.mediaURL?.length > 0 ? (
                      <div className="images img_hide">
                        {sendData?.mediaURL ? (
                          /\.(mp4|webm)$/i.test(sendData.mediaURL) ? (
                            <video
                              className="video video-player-post"
                              controls
                              autoPlay
                              width="100%"
                              style={{ borderRadius: "8px 8px" }}
                            >
                              <source
                                src={sendData.mediaURL}
                                type="video/mp4"
                              />
                            </video>
                          ) : (
                            <Carousel
                              arrows={
                                sendData.mediaURL.length < 2 ? false : true
                              }
                              swipeable={false}
                              draggable={false}
                              showDots={false}
                              responsive={responsive}
                              infinite={true}
                              autoPlay={true}
                              autoPlaySpeed={1000}
                              customTransition="all .7"
                              transitionDuration={500}
                              containerClass="carousel-container postSlide"
                            >
                              {sendData.mediaURL?.map((im, i) => {
                                return (
                                  <div key={i}>
                                    <div className="blog_multi_img">
                                      <img className="w-100" src={im} alt="" />
                                    </div>
                                  </div>
                                );
                              })}
                            </Carousel>
                          )
                        ) : (
                          <p>No media available</p>
                        )}
                      </div>
                    ) : (
                      <div className="images img_hide">
                        <img src={noImage} alt="noImage" />
                      </div>
                    )}
                  </div>
                  <div
                    style={{ backgroundColor: darkMode ? "#1B1B1B" : "#fff" }}
                    className="col-md-6 right"
                  >
                    <div className="d-flex flex-column gap-2 h-100">
                      <div className="d-flex justify-content-between align-items-center">
                        <div className="d-flex align-items-center ">
                          <div className="profile">
                            <img
                              src={
                                sendData?.owner?.profilePic
                                  ? sendData?.owner?.profilePic
                                  : deafultUser
                              }
                              alt=""
                            />
                          </div>
                          <div
                            style={{
                              color: darkMode ? "#ffffff" : "#000000",
                              marginLeft: "10px",
                            }}
                            className="post_name"
                          >
                            {sendData?.owner?.firstName +
                              " " +
                              sendData?.owner?.lastName}
                          </div>
                          </div>
                        <div className="follow_btn">
                          {!isSelfPost && (
                            <button
                              className="theme_btn"
                              onClick={onFollowClick}
                            >
                              {follow ? t("Unfollow") : t("Follow")}
                            </button>
                          )}
                        </div>
                      </div>
                      <div className="row-post-detail-view">
                        <div className="type-post-text">
                          {sendData.type || "Brief"}
                        </div>
                        <div>- {moment(sendData.createdAt).fromNow()}</div>
                      </div>
                      <div
                        style={{ color: darkMode ? "#ffffff" : "#000000" }}
                        className="content"
                      >
                        {sendData?.title ? (
                          <p
                            style={{ color: darkMode ? "#ffffff" : "#000000" }}
                          >
                            {sendData?.title}
                          </p>
                        ) : (
                          ""
                        )}
                        {sendData?.description ? (
                          <span>{sendData?.description}</span>
                        ) : (
                          ""
                        )}
                        {sendData?.hashtags?.length > 0 ? (
                          <div className="hashtags">
                            <span>{sendData?.hashtags?.join(" ")}</span>
                          </div>
                        ) : (
                          ""
                        )}
                        {sendData?.mediaURL?.length > 0 ? (
                          <div className="images d-block d-md-none">
                            {sendData?.mediaURL ? (
                              /\.(mp4|webm)$/i.test(sendData.mediaURL) ? (
                                <video
                                  className="video video-player-post"
                                  controls
                                  autoPlay
                                  width="100%"
                                  style={{ borderRadius: "8px 8px" }}
                                >
                                  <source
                                    src={sendData.mediaURL}
                                    type="video/mp4"
                                  />
                                </video>
                              ) : (
                                <Carousel
                                  arrows={
                                    sendData?.mediaURL?.length < 2
                                      ? false
                                      : true
                                  }
                                  swipeable={false}
                                  draggable={false}
                                  showDots={false}
                                  responsive={responsive}
                                  // infinite={true}
                                  // autoPlay={true}
                                  // autoPlaySpeed={1000}
                                  // customTransition="all .7"
                                  // transitionDuration={500}
                                  containerClass="carousel-container postSlide"
                                >
                                  {sendData.mediaURL?.map((im, i) => {
                                    return (
                                      <div key={i}>
                                        <div className="blog_multi_img">
                                          <img
                                            className="w-100"
                                            src={im}
                                            alt=""
                                          />
                                        </div>
                                      </div>
                                    );
                                  })}
                                </Carousel>
                              )
                            ) : (
                              <p>No media available</p>
                            )}
                          </div>
                        ) : (
                          <div className="images d-block d-md-none">
                            <img src={noImage} alt="noImage" />
                          </div>
                        )}
                        <div>{commentItemRender()}</div>
                        <div className="like_comment mt-4">
                          <div className="action" onClick={onLikeUnlikeClick}>
                            <img
                              src={
                                darkMode
                                  ? sendData?.likeStatus
                                    ? WhiteLike
                                    : WhiteOutlineLike
                                  : sendData?.likeStatus
                                  ? heart_icon
                                  : BlackOutlineLike
                              }
                              alt=""
                            />
                            <h5
                              style={{
                                color: darkMode ? "#ffffff" : "#000000",
                              }}
                              className="m-0"
                            >
                              {sendData?.likes}
                            </h5>
                          </div>
                          <div className="action">
                            <img
                              src={darkMode ? WhiteMessage : message_icon}
                              alt=""
                            />
                            <h5
                              style={{
                                color: darkMode ? "#ffffff" : "#000000",
                              }}
                              className="m-0"
                            >
                              {sendData?.comments}
                            </h5>
                          </div>
                          <div className="action">
                            <img src={darkMode ? WhiteEye : view_icon} alt="" />
                            <h5
                              style={{
                                color: darkMode ? "#ffffff" : "#000000",
                              }}
                              className="m-0"
                            >
                              {sendData?.views}
                            </h5>
                          </div>
                        </div>
                      </div>
                      <div className="upload d-flex justify-content-between gap-3 mt-auto">
                        <div className="opinion w-100">
                          <input
                            style={{
                              backgroundColor: darkMode ? "#000000" : "#D2D2D2",
                              color: darkMode ? "white" : "black",
                            }}
                            type="text"
                            value={comment}
                            onChange={onCommentChange}
                            placeholder={t("WriteOpinion")}
                          />
                          <IconButton component="label">
                            <input type="file" hidden />
                          </IconButton>
                        </div>
                        <div className="opinion_send">
                          <button onClick={onSendComment}>
                            <img src={send_icon} alt="" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </Sheet>
        </Modal>
      )}
      <SmallModal
        openSmall={openSmall}
        setOpenSmall={setOpenSmall}
        sendData={sendData}
        onFollowClick={onFollowClick}
        onAboutThisAccount={onAboutThisAccount}
        follow={follow}
        type={props.brief ? "brief" : sendData?.type}
      />
    </React.Fragment>
  );
}
