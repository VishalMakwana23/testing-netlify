import React, { useEffect, useState } from "react";
import "./index.scss";
import deafultUser from "../../../assets/icons/org_user.png";
import more_icon from "../../../assets/media/more_icon.svg";
import message_icon from "../../../assets/icons/comment.svg";
import share_icon from "../../../assets/icons/Share.svg";
import view_icon from "../../../assets/icons/view.svg";
import PlayIcon from "../../../assets/icons/play-icon-video.svg";
// import play_icon from "../../../assets/icons/play.svg"
import heart_icon from "../../../assets/icons/like.svg";
import commentBrief_icon from "../../../assets/icons/commentBrief.svg";
import WhiteThreeDot from "../../../assets/icons/whiteIcon/white-three-dot.svg";
import comment_white from "../../../assets/icons/whiteIcon/comment_white.svg";
import WhiteLike from "../../../assets/icons/whiteIcon/white-like-icon.svg";
import WhiteMessage from "../../../assets/icons/whiteIcon/white-message.svg";
import BlackOutlineLike from "../../../assets/icons/whiteIcon/like-outline-black.svg";
import WhiteOutlineLike from "../../../assets/icons/whiteIcon/like-outline-white.svg";
import WhiteEye from "../../../assets/icons/whiteIcon/white-eye-btn.svg";
import WhiteShare from "../../../assets/icons/whiteIcon/white-share.svg";
import noImage from "../../../assets/images/noImage.png";
import LargeModal from "../Reusable/Modal/large/LargeModal";
import { useLocation, useNavigate } from "react-router-dom";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { useSelector } from "react-redux";
import { PatchCallApi } from "../../../Action/Action";
import moment from "moment";
import { useTranslation } from "react-i18next";
import VisibilitySensor from "react-visibility-sensor";

const vidRef = [];
function PostCard(props) {
  const darkMode = useSelector((state) => state.headerMenu.darkMode);
  const accountInformation = useSelector((state) => state.login.LoginDetails);
  const [data, setData] = useState(props.data);
  const [sendData, setSendData] = useState();
  const [open, setOpen] = useState(false);
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const [currentIndex, /* setCurrentIndex */] = useState(-1);

  useEffect(() => {
    setData(props.data);
  }, [props.data]);

  const popupOpen = (img) => {
    setOpen(true);
    setSendData(img);
  };
  const handleOpen = (d) => {
    if (props?.brief) {
      popupOpen(d);
    }
    if (props?.trend) {
      popupOpen(d);
    }
  };
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
  const onFollowClick = async (post) => {
    const newData = data.map((item) => {
      if (item._id === post._id) {
        item.followStatus = !item.followStatus;
      }
      return item;
    });
    setData(newData);
    const headers = {
      Authorization: `Bearer ${accountInformation.data.token}`,
      "Content-Type": "application/json",
      Accept: "*/*",
    };
    let seData = {
      url: `v1/follow/${post.owner._id}`,
      headers: headers,
    };
    PatchCallApi(seData);
  };
  const onProfileClick = (post) => {
    if (accountInformation.data._id === post.owner._id) {
      navigate(`/studio`);
    } else {
      navigate(`/studio`, { state: { id: post.owner._id } });
    }
  };
  const onLikeUnlikePost = (post) => {
    const newData = data.map((item) => {
      if (item._id === post._id) {
        item.likes = item.likeStatus ? item.likes - 1 : item.likes + 1;
        item.likeStatus = !item.likeStatus;
      }
      return item;
    });
    setData(newData);
    const headers = {
      Authorization: `Bearer ${accountInformation.data.token}`,
      "Content-Type": "application/json",
      Accept: "*/*",
    };
    let seData = {
      url: `v1/like/${post._id}`,
      headers: headers,
    };
    PatchCallApi(seData);
  };

  /* const onVisibleChange = (isVisible, post, index) => {
    if (isVisible) {
      setCurrentIndex(index);
      vidRef[index]?.play();
    } else {
      vidRef[index]?.pause();
    }
  }; */
  return (
    <>
      {data?.map((post, index) => {
        return (
          <VisibilitySensor
            // onChange={(isVisible) => onVisibleChange(isVisible, post, index)}
          >
            <div
              className={`postCard ${
                props?.cardshow ? props?.cardshow : ""
              } text-center ${props?.brief ? "briefCard" : ""}`}
              key={index}
              style={{ backgroundColor: darkMode ? "#000000" : "#fff" }}
            >
              <div className="topheader">
                <div
                  className={`post_card_header ${
                    props?.brief ? "respo_header" : ""
                  }`}
                >
                  <div onClick={() => onProfileClick(post)} className="profile">
                    <img
                      src={
                        post?.owner?.profilePic
                          ? post?.owner?.profilePic
                          : deafultUser
                      }
                      alt=""
                    />
                    <div className="name">
                      <h1 style={{ color: darkMode ? "#ffffff" : "#000000" }}>
                        {post?.owner?.firstName + " " + post?.owner?.lastName}
                        <p
                          style={{ color: darkMode ? "#FFFFFF" : "#04040680" }}
                        >
                          {moment(post.createdAt).fromNow()}
                        </p>
                      </h1>
                      {pathname === "/brief" && innerWidth <= 479 ? (
                        <button className="reel_btn">{t("Follow")}</button>
                      ) : (
                        ""
                      )}
                    </div>
                  </div>
                  <div className="action">
                    {accountInformation.data._id !== post.owner._id && (
                      <button
                        onClick={() => onFollowClick(post)}
                        className="theme_btn d-none d-sm-block"
                      >
                        {post.followStatus ? t("Unfollow") : t("Follow")}
                      </button>
                    )}
                    {props?.dots ? (
                      <div className="dot" onClick={() => popupOpen(post)}>
                        <img
                          src={darkMode ? WhiteThreeDot : more_icon}
                          alt=""
                        />
                      </div>
                    ) : (
                      ""
                    )}
                  </div>
                </div>
                {props?.cardshow ? (
                  post?.title ? (
                    <div className="title">
                      <p>{post?.title}</p>
                    </div>
                  ) : (
                    ""
                  )
                ) : (
                  <div
                    className={`description ${
                      props?.brief ? "brief_description" : ""
                    }`}
                  >
                    <span style={{ color: darkMode ? "#FFFFFF" : "#040406" }}>
                      {post?.description}
                    </span>
                    <div
                      className={`hashtags ${
                        props?.brief ? "brief_hashtags" : ""
                      }`}
                    >
                      <span>{post?.hashtags?.join(" ")}</span>
                    </div>
                  </div>
                )}
              </div>
              <div
                className={`post_image ${props?.brief ? "brief_post" : ""}`}
                style={{ background: darkMode ? "#000000" : "#ffffff" }}
              >
                {post?.mediaURL.length > 0 ? (
                  <div className="reel_video">
                    {post?.mediaURL ? (
                      /\.(mp4|webm)$/i.test(post.mediaURL) ? (
                        <div
                          onClick={() => popupOpen(post)}
                          className="video-post video-container"
                        >
                          <video
                            ref={(ref) => (vidRef[index] = ref)}
                            className="video video-post"
                            width="100%"
                            loop
                            muted
                            style={{ borderRadius: "8px" }}
                          >
                            <source src={post.mediaURL} type="video/mp4" />
                          </video>
                          {currentIndex !== index && (
                            <div className="play-icon-video-container">
                              <img src={PlayIcon} alt="play-icon" />
                            </div>
                          )}
                        </div>
                      ) : (
                        <Carousel
                          arrows={post?.mediaURL.length < 2 ? false : true}
                          swipeable={true}
                          draggable={false}
                          showDots={false}
                          responsive={responsive}
                          infinite={true}
                          autoPlay={true}
                          autoPlaySpeed={1000}
                          customTransition="all .7"
                          transitionDuration={500}
                          containerClass="carousel-container postSlide"
                          removeArrowOnDeviceType={["tablet", "mobile"]}
                        >
                          {post?.mediaURL?.map((im, i) => {
                            return (
                              <div key={i}>
                                <div
                                  className="blog_multi_img image-post"
                                  style={
                                    props?.trend && {
                                      height: "600px",
                                    }
                                  }
                                  onClick={() => handleOpen(post)}
                                >
                                  <img className="w-100" src={im} alt="" />
                                </div>
                              </div>
                            );
                          })}
                        </Carousel>
                      )
                    ) : (
                      <div className="images img_hide">
                        <img src={noImage} alt="noImage" />
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="images img_hide">
                    <img src={noImage} alt="noImage" />
                  </div>
                )}
                {props?.brief ? (
                  <div className="brief_icon">
                    <div
                      className="icon"
                      onClick={() => onLikeUnlikePost(post)}
                    >
                      <img
                        src={
                          darkMode
                            ? post?.likeStatus
                              ? WhiteLike
                              : WhiteOutlineLike
                            : post?.likeStatus
                            ? heart_icon
                            : BlackOutlineLike
                        }
                        alt=""
                      />
                      <h6
                        style={{ color: darkMode ? "#ffffff" : "#000000" }}
                        className="m-0"
                      >
                        {post?.likes}
                      </h6>
                    </div>
                    <div className="icon" onClick={() => popupOpen(post)}>
                      <img
                        src={
                          darkMode
                            ? WhiteMessage
                            : innerWidth <= 479
                            ? comment_white
                            : commentBrief_icon
                        }
                        alt=""
                      />
                      <h6
                        style={{ color: darkMode ? "#ffffff" : "#000000" }}
                        className="m-0"
                      >
                        {post?.comments}
                      </h6>
                    </div>
                  </div>
                ) : (
                  ""
                )}
              </div>

              {!props?.brief ? (
                <div className="like_comment gap-4">
                  <div
                    className="action"
                    onClick={() => onLikeUnlikePost(post)}
                  >
                    <img
                      src={
                        darkMode
                          ? post?.likeStatus
                            ? WhiteLike
                            : WhiteOutlineLike
                          : post?.likeStatus
                          ? heart_icon
                          : BlackOutlineLike
                      }
                      alt=""
                    />
                    <h5
                      style={{ color: darkMode ? "#ffffff" : "#000000" }}
                      className="m-0"
                    >
                      {post?.likes}
                    </h5>
                  </div>
                  <div className="action" onClick={() => popupOpen(post)}>
                    <img src={darkMode ? WhiteMessage : message_icon} alt="" />
                    <h5
                      style={{ color: darkMode ? "#ffffff" : "#000000" }}
                      className="m-0"
                    >
                      {post?.comments}
                    </h5>
                  </div>
                  {false && (
                    <div className="action">
                      <img src={darkMode ? WhiteShare : share_icon} alt="" />
                      <h5
                        style={{ color: darkMode ? "#ffffff" : "#000000" }}
                        className="m-0"
                      >
                        0
                      </h5>
                    </div>
                  )}
                  <div className="action">
                    <img src={darkMode ? WhiteEye : view_icon} alt="" />
                    <h5
                      style={{ color: darkMode ? "#ffffff" : "#000000" }}
                      className="m-0"
                    >
                      {post?.views}
                    </h5>
                  </div>
                </div>
              ) : (
                ""
              )}

              {props?.trend && <div className="divider_line_trending" />}
            </div>
          </VisibilitySensor>
        );
      })}
      <LargeModal
        sendData={sendData}
        setOpen={setOpen}
        open={open}
        brief={props?.brief}
        trend={props?.trend}
        onLikeUnlikePost={(post) => onLikeUnlikePost(post)}
      />
    </>
  );
}

export default PostCard;
