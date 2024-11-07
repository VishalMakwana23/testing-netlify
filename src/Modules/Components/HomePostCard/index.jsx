import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { useLocation, useNavigate } from "react-router-dom";
import { Box, Button, Chip } from "@mui/material";
import moment from "moment";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import "./index.scss";
import VisibilitySensor from "react-visibility-sensor";
import { PatchCallApi } from "../../../Action/Action";
import {
  categoryData,
  hashTagData,
  postActionMenu,
} from "../../../Utils/static/staticData";
import { categoryIcons } from "../../../Utils/static/icons";
import deafultUser from "../../../assets/icons/org_user.png";
import LikeIcon from "../../../assets/icons/postActionIcons/LikeIcon.svg";
import UnLikeIcon from "../../../assets/icons/postActionIcons/UnLikeIcon.svg";
import CommentIcon from "../../../assets/icons/postActionIcons/CommentIcon.svg";
import ViewIcon from "../../../assets/icons/postActionIcons/ViewsIcon.svg";
import ShareIcon from "../../../assets/icons/postActionIcons/ShareIcon.svg";
import DotsIcon from "../../../assets/icons/postActionIcons/DotsIcon.svg";
import PlayIcon from "../../../assets/icons/play-icon-video.svg";
import noImage from "../../../assets/images/noImage.png";
import LargeModal from "../Reusable/Modal/large/LargeModal";

const vidRef = [];

function HomePostCard(props) {
  const darkMode = useSelector((state) => state.headerMenu.darkMode);
  const accountInformation = useSelector((state) => state.login.LoginDetails);
  const [data, setData] = useState(props.data);
  const [sendData, setSendData] = useState();
  const [open, setOpen] = useState(false);
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const [currentIndex /* setCurrentIndex */] = useState(-1);

  const handleChangeMenu = (selectedMenu) => {
    console.log("You clicked on menu : ", selectedMenu);
  };

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

  return (
    <>
      {data?.map((post, index) => {
        return (
          <VisibilitySensor>
            <div
              className={`postCard ${
                props?.cardshow ? props?.cardshow : ""
              } text-center`}
              key={index}
              style={{ backgroundColor: darkMode ? "#000000" : "#fff" }}
            >
              <div className="topheader">
                <div className="post_card_header">
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
                      <h1
                        style={{
                          color: darkMode ? "#ffffff" : "rgb(0, 0, 0)",
                        }}
                      >
                        {post?.owner?.firstName + " " + post?.owner?.lastName}
                        <p style={{ color: darkMode ? "#FFFFFF" : " #666" }}>
                          {moment(post.createdAt).fromNow()} -{" "}
                          <span>Briefs</span>
                        </p>
                      </h1>
                    </div>
                  </div>
                  <div className="action">
                    {accountInformation.data._id !== post.owner._id && (
                      <Button
                        sx={{
                          "&.MuiButtonBase-root": {
                            "&:hover": {
                              color: "#E84127",
                              border: "1px solid #E84127",
                            },
                          },
                        }}
                        onClick={() => onFollowClick(post)}
                        variant="outlined"
                      >
                        {post.followStatus ? t("Unfollow") : t("Follow")}
                      </Button>
                    )}
                  </div>
                </div>
              </div>

              {/* Title and Description */}
              {props?.cardshow ? (
                post?.title ? (
                  <div className="title">
                    <p>{post?.title}</p>
                  </div>
                ) : (
                  ""
                )
              ) : (
                <div className="description">
                  <span style={{ color: darkMode ? "#FFFFFF" : "#040406" }}>
                    {post?.description}
                  </span>
                  <div className="hashtags">
                    <span>{post?.hashtags?.join(" ")}</span>
                  </div>
                </div>
              )}

              {/* Images and videos */}
              <div
                className="post_image"
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
                            style={{ borderRadius: "16px" }}
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
              </div>

              {/* Hashtags */}
              <div className="hashtag_container">
                {hashTagData.map((tag) => (
                  <div className="hashtags">{tag}</div>
                ))}
              </div>

              {/* Category chips */}
              <div className="category_container">
                {categoryData.map((item) => (
                  <Chip
                    onClick={() => {}}
                    icon={<img src={categoryIcons[item]} alt={item} />}
                    className="category"
                    label={item}
                  />
                ))}
              </div>

              {/* like, comment, view and share buttons */}
              <Box className="post_action_container">
                <div className="post_action_wrapper">
                  <span
                    className="post_action"
                    onClick={() => onLikeUnlikePost(post)}
                  >
                    <img
                      src={post?.likeStatus ? LikeIcon : UnLikeIcon}
                      alt="Like"
                    />
                    {post?.likes}
                  </span>
                  <span className="post_action" onClick={() => popupOpen(post)}>
                    <img src={CommentIcon} alt="Comment" />
                    {post?.comments}
                  </span>
                  <span className="post_action">
                    <img src={ViewIcon} alt="View" />
                    {post?.views}
                  </span>
                  <span className="post_action">
                    <img src={ShareIcon} alt="Share" /> 12.2k
                  </span>
                </div>

                {/* <Menus
                  menu={postActionMenu}
                  handleChangeValue={(selectedMenu) =>
                    handleChangeMenu(selectedMenu)
                  }
                >
                  {({ handleClick }) => (
                    <> */}
                <div
                  className="post_action"
                  style={{ cursor: "pointer" }}
                  // onClick={handleClick}
                >
                  <img src={DotsIcon} alt="dots" />
                </div>
                {/* </>
                  )}
                </Menus> */}
              </Box>

              {/* Devider */}
              <div
                style={{
                  height: "2px",
                  alignSelf: "stretch",
                  background: "#CCC",
                  margin: "15px 0px",
                }}
              ></div>
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

export default HomePostCard;
