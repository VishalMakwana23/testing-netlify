import React, { useEffect, useState } from "react";

import "./index.scss";
import ThreedotIcon from "../../../assets/images/three-dot.svg";
import VarticalThreedotIcon from "../../../assets/images/varticalthreedot.svg";
import noImage from "../../../assets/images/noImage.png";
import LikeBlackIcon from "../../../assets/icons/like-black.svg";
import BlackOutlineLike from "../../../assets/icons/whiteIcon/like-outline-black.svg";
import WhiteOutlineLike from "../../../assets/icons/whiteIcon/like-outline-white.svg";
import CommentBlackIcon from "../../../assets/icons/comment-black.svg";
import EyeBlackIcon from "../../../assets/icons/eye-black.svg";
import EyeWhiteIcon from "../../../assets/icons/eye-white.svg";
import ReportIcon from "../../../assets/icons/report.svg";
import EditPostIcon from "../../../assets/icons/editPost.svg";
import DeletePostIcon from "../../../assets/icons/deletePost.svg";
import defaultUser from "../../../assets/icons/org_user.png";
import SavePostIcon from "../../../assets/icons/savePost.svg";
import PlayIcon from "../../../assets/images/playicon.svg";
import EmtyViewIcon from "../../../assets/images/emty-view-image.svg";
import WhiteLike from "../../../assets/icons/whiteIcon/white-like-icon.svg";
import WhiteMessage from "../../../assets/icons/whiteIcon/white-message.svg";
import WhiteThreeDot from "../../../assets/icons/whiteIcon/vartical-white-three-dot.svg";
import WhiteEye from "../../../assets/icons/whiteIcon/white-eye-btn.svg";
import { useMediaQuery } from "react-responsive";
import {
  DeleteCallApi,
  GetCallApi,
  PatchCallApi,
} from "../../../Action/Action";
import { useSelector } from "react-redux";
import { Backdrop, CircularProgress, IconButton, Modal } from "@mui/material";
import moment from "moment/moment";
import { useLocation } from "react-router-dom";
import CloseIcon from "@mui/icons-material/Close";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";
import LargeModal from "../../Components/Reusable/Modal/large/LargeModal";
import MediumModal from "../../Components/Reusable/Modal/medium/MediumModal";
import SmallModal from "../../Components/Reusable/Modal/small/SmallModal";

let loadMoreData = false;
function Studio() {
  const darkMode = useSelector((state) => state.headerMenu.darkMode);
  const [selectedTab, setSelectedTab] = useState("all");
  const location = useLocation();
  const token = useSelector((state) => state.login.LoginDetails.data.token);
  const accountInformation = useSelector((state) => state.login.LoginDetails);
  const [openCircle, setOpenCircle] = useState(false);
  const [loadMore, setLoadMore] = useState(false);
  const [otherUserId, setIsOtherUserId] = useState("");
  const [userProfile, setUserProfile] = useState();
  const [postList, setPostList] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [actionPost, setActionPost] = useState();
  const [optionModal, setOptionModal] = useState(false);
  const [reportModal, setReportModal] = useState(false);
  const [totalPage, setTotalPage] = useState(-1);
  const [sendData, setSendData] = useState();
  const [open, setOpen] = useState(false);
  const { t } = useTranslation();
  const [mediumOpen, setMediumOpen] = useState(false);
  const [blogOpen, setBlogOpen] = useState(false);
  const [openSmall, setOpenSmall] = React.useState(false);

  useEffect(() => {
    if (location.state && location.state.id) {
      setIsOtherUserId(location.state.id);
      getOtherProfileData(location.state.id);
      getProfileData(1, location.state.id);
    } else {
      getOtherProfileData();
      getProfileData(1);
    }
    // eslint-disable-next-line
  }, [location]);

  const isMobileView = useMediaQuery({
    query: "(max-width: 478px)",
  });

  const onLikePress = (post) => {
    const newData = postList.map((item) => {
      if (item._id === post._id) {
        item.likes = item.likeStatus ? item.likes - 1 : item.likes + 1;
        item.likeStatus = !item.likeStatus;
      }
      return item;
    });
    setPostList(newData);
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

  const onCommentPress = (post) => {
    post.owner = userProfile.userData;
    setSendData(post);
    setOpen(true);
  };

  const onOptionClick = (post) => {
    setActionPost(post);
    setOptionModal(true);
  };

  const getProfileData = async (page, id = accountInformation.data._id) => {
    const headers = {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
      Accept: "*/*",
    };
    if (page === 1) {
      setOpenCircle(true);
    }
    let userId = id;
    if (otherUserId) {
      userId = otherUserId;
    }
    let seData = {
      url: `v1/all-data-for-user/${userId}/${page}`,
      headers: headers,
    };

    let res = await GetCallApi(seData);
    setOpenCircle(false);
    setLoadMore(false);
    if (res?.status === 201) {
      const getData = res.data.data?.map((p) => {
        return {
          ...p,
        };
      });
      setTotalPage(res.data.metadata.totalPages);
      if (getData?.length > 0) {
        if (page === 1) {
          setPostList(getData);
        } else {
          setPostList([...postList, ...getData]);
        }
      }
    } else {
      setPostList([]);
    }
    loadMoreData = false;
  };

  const getOtherProfileData = async (userId = accountInformation.data._id) => {
    const headers = {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
      Accept: "*/*",
    };
    setOpenCircle(true);
    let seData = {
      url: `v1/otheruser/${userId}`,
      headers: headers,
    };

    let res = await GetCallApi(seData);
    setOpenCircle(false);
    if (res?.status === 201) {
      setUserProfile(res.data);
    }
  };

  const onTabSelect = (tab) => {
    setSelectedTab(tab);
  };
  const handleOptionClose = () => {
    setOptionModal(false);
  };
  const handleReportClose = () => {
    setReportModal(false);
  };

  const renderstudioblogItem = (item) => {
    return (
      <div
        style={{ backgroundColor: darkMode ? "#000000" : "#ffffff" }}
        className="blog-item-container-view"
      >
        <div onClick={() => onCommentPress(item)}>
          <img
            className="blog-image-view"
            src={item.mediaURL.length > 0 ? item.mediaURL[0] : noImage}
            alt="blog-img"
          />
        </div>
        <div className="text-blog-container">
          <div
            className="blog-item-info-container"
            onClick={() => onCommentPress(item)}
          >
            <div
              style={{ color: darkMode ? "#ffffff" : "#000000" }}
              className="blog-view-main-text"
            >
              {item.title}
            </div>
            <div
              style={{ color: darkMode ? "#C1BEBE" : "#040406" }}
              className="during-text-style"
            >
              {item.description}
            </div>
          </div>
          <div className="like-post-comment-btn-container">
            <div
              onClick={() => onLikePress(item)}
              className="post-reaction-container"
            >
              <img
                className="like-comment-eye-btn-style"
                src={
                  darkMode
                    ? item?.likeStatus
                      ? WhiteLike
                      : WhiteOutlineLike
                    : item?.likeStatus
                    ? LikeBlackIcon
                    : BlackOutlineLike
                }
                alt="like-icon"
              />
              <div
                style={{ color: darkMode ? "#ffffff" : "#000000" }}
                className="like-count-text"
              >
                {item.likes}
              </div>
            </div>
            <div
              onClick={() => onCommentPress(item)}
              className="post-reaction-container"
            >
              <img
                className="like-comment-eye-btn-style"
                src={darkMode ? WhiteMessage : CommentBlackIcon}
                alt="like-icon"
              />
              <div
                style={{ color: darkMode ? "#ffffff" : "#000000" }}
                className="like-count-text"
              >
                {item.comments}
              </div>
            </div>
            <div className="post-reaction-container">
              <img
                className="like-comment-eye-btn-style"
                src={darkMode ? WhiteEye : EyeBlackIcon}
                alt="like-icon"
              />
              <div
                style={{ color: darkMode ? "#ffffff" : "#000000" }}
                className="like-count-text"
              >
                {item.views}
              </div>
            </div>
          </div>
        </div>
        <div style={{ cursor: "pointer" }} onClick={() => onOptionClick(item)}>
          <img
            className="vartical-three-dot-view"
            src={darkMode ? WhiteThreeDot : VarticalThreedotIcon}
            alt="vartical-three-dot"
          />
        </div>
      </div>
    );
  };

  const renderstudioItem = (item) => {
    return (
      <div
        style={{ backgroundColor: darkMode ? "#000000" : "#ffffff" }}
        className="studio-text-and-image-container"
      >
        <div className="studio-main-menu-container">
          <div
            className="studio-main-menu-container"
            style={{ justifyContent: "flex-start" }}
          >
            <div>
              <div
                style={{ color: darkMode ? "#ffffff" : "#000000" }}
                className="name-text-style"
              >
                {item.type}
              </div>
              <div
                className="time-text-style"
                style={{ color: darkMode ? "#ffffff" : "#000000" }}
              >
                {moment(item.createdAt).fromNow()}
              </div>
            </div>
          </div>
          <div
            style={{ cursor: "pointer" }}
            onClick={() => onOptionClick(item)}
          >
            <img
              alt="three-dot-img"
              className="three-dot-style"
              src={darkMode ? WhiteThreeDot : ThreedotIcon}
            />
          </div>
        </div>
        <div className="all-post-container">
          <div
            className="all-post-text-style"
            style={{ color: darkMode ? "#ffffff" : "#000000" }}
          >
            {item.title}
          </div>
          <div
            className="all-post-media-container"
            onClick={() => onCommentPress(item)}
          >
            {item.mediaURL.length === 0 ? (
              <img
                src={noImage}
                className="single-all-post-img"
                alt={"all-post-main-img"}
              />
            ) : item.mediaURL.length === 1 ? (
              !item.title ? (
                <video
                  className="single-all-post-img"
                  width="100%"
                  height="100%"
                  style={{ borderRadius: "8px", objectFit: "cover" }}
                >
                  <source src={item.mediaURL} type="video/mp4" />
                </video>
              ) : (
                <img
                  src={item.mediaURL[0]}
                  className="single-all-post-img"
                  alt={"all-post-main-img"}
                />
              )
            ) : item.mediaURL.length === 2 ? (
              <div className="double-all-post-img-container">
                <img
                  src={item.mediaURL[0]}
                  className="double-all-post-img"
                  alt={"all-post-main-img"}
                />
                <img
                  src={item.mediaURL[1]}
                  className="double-all-post-img"
                  alt={"all-post-main-img"}
                />
              </div>
            ) : (
              <div className="double-all-post-img-container">
                <img
                  src={item.mediaURL[0]}
                  className="triple-all-post-img"
                  alt={"all-post-main-img"}
                />
                {item.mediaURL.length === 3 ? (
                  <div className="triple-all-post-img-second-container">
                    <img
                      src={item.mediaURL[1]}
                      className="triple-all-post-img-second"
                      alt={"all-post-main-img"}
                    />
                    <img
                      src={item.mediaURL[2]}
                      className="triple-all-post-img-second"
                      alt={"all-post-main-img"}
                    />
                  </div>
                ) : (
                  <div className="triple-all-post-img-second-container">
                    <img
                      src={item.mediaURL[1]}
                      className="forth-all-post-img"
                      alt={"all-post-main-img"}
                    />
                    <div className="forth-all-post-img-container">
                      <img
                        src={item.mediaURL[2]}
                        className="double-all-post-img-forth"
                        alt={"all-post-main-img"}
                      />
                      <div className="forth-more-container">
                        {item.mediaURL.length > 4 && (
                          <div className="overlay-more-view">MORE</div>
                        )}
                        <img
                          src={item.mediaURL[3]}
                          className="double-all-post-img-forth w-100"
                          alt={"all-post-main-img"}
                        />
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
          <div className="post-like-comment-container">
            <div
              onClick={() => onLikePress(item)}
              className="post-reaction-container"
            >
              <img
                className="like-comment-eye-btn-style"
                src={
                  darkMode
                    ? item?.likeStatus
                      ? WhiteLike
                      : WhiteOutlineLike
                    : item?.likeStatus
                    ? LikeBlackIcon
                    : BlackOutlineLike
                }
                alt="like-icon"
              />
              <div
                style={{ color: darkMode ? "#ffffff" : "#000000" }}
                className="like-count-text"
              >
                {item.likes}
              </div>
            </div>
            <div
              onClick={() => onCommentPress(item)}
              className="post-reaction-container"
            >
              <img
                className="like-comment-eye-btn-style"
                src={darkMode ? WhiteMessage : CommentBlackIcon}
                alt="like-icon"
              />
              <div
                style={{ color: darkMode ? "#ffffff" : "#000000" }}
                className="like-count-text"
              >
                {item.comments}
              </div>
            </div>
            <div className="post-reaction-container">
              <img
                className="like-comment-eye-btn-style"
                src={darkMode ? WhiteEye : EyeBlackIcon}
                alt="like-icon"
              />
              <div
                style={{ color: darkMode ? "#ffffff" : "#000000" }}
                className="like-count-text"
              >
                {item.views}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };
  const renderstudiobriefItem = (item) => {
    return (
      <div className="brief-item" onClick={() => onCommentPress(item)}>
        <video
          className="brief-single-all-post-img video"
          width="100%"
          height="100%"
          style={{ borderRadius: "8px", objectFit: "cover" }}
        >
          <source src={item.mediaURL[0]} type="video/mp4" />
        </video>
        <img className="play-icon-brief-view" src={PlayIcon} alt="play-icon" />
        <div className="like-brief-container">
          <div className="post-reaction-container">
            <img src={EyeWhiteIcon} alt="like-icon" />
            <div className="like-text-view-count">{item.views}</div>
          </div>
        </div>
      </div>
    );
  };

  const onFollowClick = async () => {
    const userData = { ...userProfile };
    userData.totalFollowers = userData.followStatus
      ? userData.totalFollowers - 1
      : userData.totalFollowers + 1;
    userData.followStatus = !userData.followStatus;
    setUserProfile(userData);
    const headers = {
      Authorization: `Bearer ${accountInformation.data.token}`,
      "Content-Type": "application/json",
      Accept: "*/*",
    };
    let seData = {
      url: `v1/follow/${accountInformation.data._id}`,
      headers: headers,
    };
    await PatchCallApi(seData);
  };

  const onReportClick = () => {
    setOptionModal(false);
    setTimeout(() => {
      setOpenSmall(true);
    }, 200);
  };

  const onDeletePost = async () => {
    const headers = {
      Authorization: `Bearer ${accountInformation.data.token}`,
      "Content-Type": "application/json",
      Accept: "*/*",
    };
    const url = actionPost.type === "brief" ? "v1/brief" : "v1/blog";
    let seData = {
      url: `${url}/${actionPost._id}`,
      headers: headers,
    };
    const newData = postList.filter((item) => item._id !== actionPost._id);
    setPostList(newData);
    setOptionModal(false);
    toast.success("Post Deleted successfully", {
      position: "top-right",
      autoClose: 1500,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });
    await DeleteCallApi(seData);
  };

  const onBlogUpdate = (updatedBlog) => {
    const newData = postList.map((item) => {
      if (item._id === updatedBlog._id) {
        return updatedBlog;
      }
      return item;
    });
    setPostList(newData);
    toast.success("Post updated successfully", {
      position: "top-right",
      autoClose: 1500,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });
  };

  const onSaveClick = async () => {
    const headers = {
      Authorization: `Bearer ${accountInformation.data.token}`,
      "Content-Type": "application/json",
      Accept: "*/*",
    };
    const body = {
      mediaID: actionPost._id,
    };
    let seData = {
      url: `v1/save`,
      headers: headers,
      body: body,
    };
    setOpenCircle(false);
    setOptionModal(false);
    toast.success("Post save successfully", {
      position: "top-right",
      autoClose: 1500,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });
    await PatchCallApi(seData);
  };

  const renderAccountInfo = () => {
    return (
      <>
        <div className="account-status-info">
          <div className="follow-status-text">
            <div
              style={{ color: darkMode ? "#FFFFFF" : "#040406" }}
              className="account-status-text"
            >
              {t("Loves")}
            </div>
            <div className="follow-number-text">
              {userProfile ? userProfile.totalLikes : "0"}
            </div>
          </div>
          <div className="follow-status-text">
            <div
              style={{ color: darkMode ? "#FFFFFF" : "#040406" }}
              className="account-status-text"
            >
              {t("Followers")}
            </div>
            <div className="follow-number-text">
              {userProfile ? userProfile.totalFollowers : "0"}
            </div>
          </div>
          <div className="follow-status-text">
            <div
              style={{ color: darkMode ? "#FFFFFF" : "#040406" }}
              className="account-status-text"
            >
              {t("Following")}
            </div>
            <div className="follow-number-text">
              {userProfile ? userProfile.totalFollowings : "0"}
            </div>
          </div>
        </div>
        {otherUserId && (
          <div className="account-status-info">
            <div
              onClick={onFollowClick}
              className="follow-status-info-container"
            >
              <div className="follow-and-message-text-style">
                {userProfile?.followStatus ? "Unfollow" : "Follow"}
              </div>
            </div>
            <div className="Message-status-info-container">
              <div className="follow-and-message-text-style">Message</div>
            </div>
          </div>
        )}
      </>
    );
  };

  const getBriefPostList = () => {
    return postList.filter((item) => !item.title);
  };
  const onEditPost = () => {
    handleOptionClose();
    setBlogOpen(true);
  };

  const getBlogPostList = () => {
    return postList.filter((item) => item.title);
  };

  const renderEmptyView = () => {
    return (
      <div className="empty-view-conatiner">
        <img
          className="emty-view-icon-style"
          src={EmtyViewIcon}
          alt="emty-view-icon"
        />
        <div className="emty-text-style">Nothing uploaded yet :/</div>
      </div>
    );
  };

  const handleScroll = () => {
    const scrollY = window.scrollY;
    const windowHeight = window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight;
    if (
      scrollY + windowHeight >= documentHeight - 100 &&
      !loadMoreData &&
      currentPage < totalPage
    ) {
      loadMoreData = true;
      setLoadMore(true);
      getProfileData(currentPage + 1);
      setCurrentPage(currentPage + 1);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
    // eslint-disable-next-line
  }, [currentPage, totalPage]);

  return (
    <div className="trending">
      <div className="container-fluid">
        <Backdrop
          open={openCircle}
          sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        >
          <CircularProgress color="inherit" />
        </Backdrop>
        <div className="row">
          <div className="col-md-12 p-0">
            <div className="studioContainer">
              <div className="name-icon-container">
                <img
                  className="name-image-icon"
                  src={
                    userProfile?.userData?.profilePic
                      ? userProfile.userData.profilePic
                      : defaultUser
                  }
                  alt="name-icon"
                />
                <div>
                  <div
                    style={{ color: darkMode ? "#FFFFFF" : "#040406" }}
                    className="name-text"
                  >
                    {userProfile
                      ? userProfile?.userData?.firstName +
                        " " +
                        userProfile?.userData?.lastName
                      : ""}
                  </div>
                  <div
                    style={{ color: darkMode ? "#FFFFFF" : "#040406" }}
                    className="main-name-text"
                  >
                    {userProfile?.userData?.userName}
                  </div>
                  <div className="name-msg-text">
                    {userProfile ? userProfile.userData.bio : ""}
                  </div>
                  {!isMobileView && renderAccountInfo()}
                </div>
              </div>
              {isMobileView && renderAccountInfo()}
              <div className="studio-tabbar">
                <div
                  className="studio-info-text"
                  onClick={() => onTabSelect("all")}
                >
                  <div
                    style={{
                      marginBottom: "6px",
                      color:
                        selectedTab === "all"
                          ? "#E84127"
                          : darkMode
                          ? "#FFFFFF"
                          : "#040406",
                    }}
                  >
                    {t("All")}
                  </div>
                  <div
                    className="selected-top-bar-line"
                    style={{
                      backgroundColor:
                        selectedTab === "all" ? "#E84127" : "transparent",
                    }}
                  />
                </div>
                <div
                  className="brife-and-blog-text"
                  onClick={() => onTabSelect("brief")}
                >
                  <div
                    style={{
                      marginBottom: "6px",
                      color:
                        selectedTab === "brief"
                          ? "#E84127"
                          : darkMode
                          ? "#FFFFFF"
                          : "#040406",
                    }}
                  >
                    {t("Briefs")}
                  </div>
                  <div
                    className="selected-top-bar-line"
                    style={{
                      backgroundColor:
                        selectedTab === "brief" ? "#E84127" : "transparent",
                    }}
                  />
                </div>
                <div
                  className="brife-and-blog-text"
                  onClick={() => onTabSelect("blog")}
                >
                  <div
                    style={{
                      marginBottom: "6px",
                      color:
                        selectedTab === "blog"
                          ? "#E84127"
                          : darkMode
                          ? "#FFFFFF"
                          : "#040406",
                    }}
                  >
                    {t("Blogs")}
                  </div>
                  <div
                    className="selected-top-bar-line"
                    style={{
                      backgroundColor:
                        selectedTab === "blog" ? "#E84127" : "transparent",
                    }}
                  />
                </div>
              </div>
              <div className="border-lineview" />
              <div className="post-studio-container grid-list-view">
                {selectedTab === "all"
                  ? postList.length === 0
                    ? renderEmptyView()
                    : postList.map(renderstudioItem)
                  : selectedTab === "brief"
                  ? getBriefPostList().length === 0
                    ? renderEmptyView()
                    : getBriefPostList().map(renderstudiobriefItem)
                  : getBlogPostList().length === 0
                  ? renderEmptyView()
                  : getBlogPostList().map(renderstudioblogItem)}
                {loadMore && (
                  <div className="spinner-load-more-container">
                    <CircularProgress color="inherit" />
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      <Modal
        open={optionModal}
        onClose={handleOptionClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        className="toggle_img_Show"
      >
        <div className="deleteModalContainer">
          <div className="optionModalView">
            <IconButton
              aria-label="close"
              onClick={handleOptionClose}
              sx={{
                position: "absolute",
                right: 8,
                top: 8,
                color: (theme) => theme.palette.grey[500],
                bgcolor: "#fff",
              }}
            >
              <CloseIcon />
            </IconButton>
            {otherUserId ? (
              <>
                <div onClick={onSaveClick} className="option-item-container">
                  <img src={SavePostIcon} alt="report-icon" />
                  <div className="report-name-txt" style={{ color: "#040406" }}>
                    Save
                  </div>
                </div>
                <div onClick={onReportClick} className="option-item-container">
                  <img src={ReportIcon} alt="report-icon" />
                  <div className="report-name-txt">Report</div>
                </div>
              </>
            ) : (
              <>
                <div onClick={onEditPost} className="option-item-container">
                  <img src={EditPostIcon} alt="report-icon" />
                  <div className="report-name-txt" style={{ color: "#040406" }}>
                    Edit
                  </div>
                </div>
                <div onClick={onDeletePost} className="option-item-container">
                  <img src={DeletePostIcon} alt="report-icon" />
                  <div className="report-name-txt">Delete</div>
                </div>
              </>
            )}
          </div>
        </div>
      </Modal>
      <Modal
        open={reportModal}
        onClose={handleReportClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        className="toggle_img_Show"
      >
        <div className="deleteModalContainer">
          <div className="optionModalView">
            <IconButton
              aria-label="close"
              onClick={handleReportClose}
              sx={{
                position: "absolute",
                right: 8,
                top: 8,
                color: (theme) => theme.palette.grey[500],
                bgcolor: "#fff",
              }}
            >
              <CloseIcon />
            </IconButton>
            <div className="option-item-container">
              <div className="report-name-txt" style={{ color: "#040406" }}>
                Scammer
              </div>
            </div>
            <div className="option-item-container">
              <div className="report-name-txt" style={{ color: "#040406" }}>
                Pretending to be someone else
              </div>
            </div>
            <div className="option-item-container">
              <div className="report-name-txt" style={{ color: "#040406" }}>
                Fake Content/ Copied Content
              </div>
            </div>
            <div className="option-item-container">
              <div className="report-name-txt" style={{ color: "#040406" }}>
                Abusive language
              </div>
            </div>
          </div>
        </div>
      </Modal>
      <LargeModal
        sendData={sendData}
        setOpen={setOpen}
        open={open}
        onLikeUnlikePost={(post) => onLikePress(post)}
      />
      <MediumModal
        mediumOpen={mediumOpen}
        setMediumOpen={setMediumOpen}
        setBlogOpen={setBlogOpen}
        blogOpen={blogOpen}
        blogVal={"Blog"}
        post={actionPost}
        isEdit={true}
        onBlogUpdate={onBlogUpdate}
      />
      <SmallModal
        openSmall={openSmall}
        setOpenSmall={setOpenSmall}
        sendData={actionPost}
        onFollowClick={onFollowClick}
        follow={actionPost?.followStatus}
        popuptype={"Scammer"}
        type={actionPost?.type}
      />
    </div>
  );
}

export default Studio;
