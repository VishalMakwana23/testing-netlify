import React, { useEffect, useState } from "react";
import "./index.scss";
import back_icon from "../../../assets/icons/back_arrow.svg";
import { Link } from "react-scroll";
import { useNavigate } from "react-router-dom";
import LikeBlackIcon from "../../../assets/icons/like-black.svg";
import CommentBlackIcon from "../../../assets/icons/comment-black.svg";
import EyeBlackIcon from "../../../assets/icons/eye-black.svg";
import VarticalThreedotIcon from "../../../assets/images/varticalthreedot.svg";
import WhiteThreeDot from "../../../assets/icons/whiteIcon/vartical-white-three-dot.svg";
import VideoPlayIcon from "../../../assets/icons/whiteIcon/videoplayicon.svg";
import ForwordWhite from "../../../assets/icons/whiteIcon/white-forword-arrow.svg";
import WhiteLike from "../../../assets/icons/whiteIcon/white-like-icon.svg";
import WhiteMessage from "../../../assets/icons/whiteIcon/white-message.svg";
import WhiteEye from "../../../assets/icons/whiteIcon/white-eye-btn.svg";
import { useSelector } from "react-redux";
import { Backdrop, CircularProgress, Menu } from "@mui/material";
import { GetCallApi, PatchCallApi } from "../../../Action/Action";
import { useTranslation } from "react-i18next";
import LargeModal from "../../Components/Reusable/Modal/large/LargeModal";
import BlackOutlineLike from "../../../assets/icons/whiteIcon/like-outline-black.svg";
import WhiteOutlineLike from "../../../assets/icons/whiteIcon/like-outline-white.svg";

let loadMoreData = false;
function SaveItem() {
  const { t } = useTranslation();
  const darkMode = useSelector((state) => state.headerMenu.darkMode);
  const token = useSelector((state) => state.login.LoginDetails.data.token);
  const [loader, setLoader] = useState(false);
  const [postlist, setPostList] = useState([]);
  const [totalPage, setTotalPage] = useState(-1);
  const [currentPage, setCurrentPage] = useState(1);
  const [anchorEl2, setAnchorEl2] = useState(null);
  const [actionPost, setActionPost] = useState(null);
  const openUMenu = Boolean(anchorEl2);
  let navigate = useNavigate();
  const [sendData, setSendData] = useState();
  const [open, setOpen] = useState(false);

  const handleClickUMenu = (event, postItem) => {
    setAnchorEl2(event?.currentTarget);
    setActionPost(postItem);
  };
  const handleCloseUMenu = () => {
    setAnchorEl2(null);
    setActionPost(null);
  };
  const onRemoveClick = async () => {
    setAnchorEl2(null);
    const headers = {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
      Accept: "*/*",
    };
    const body = {
      mediaID: actionPost.mediaID,
    };
    let seData = {
      url: `v1/save`,
      headers: headers,
      body: body,
    };
    setPostList((prevList) => {
      const newList = prevList.filter((item) => item._id !== actionPost._id);
      return newList;
    });
    await PatchCallApi(seData);
    setActionPost(null);
  };

  const handleBack = () => {
    navigate(-1);
  };

  const onLikePress = (post) => {
    const newData = postlist.map((item) => {
      if (item._id === post._id) {
        item.likes = item.likeStatus ? item.likes - 1 : item.likes + 1;
        item.likeStatus = !item.likeStatus;
      }
      return item;
    });
    setPostList(newData);
    const headers = {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
      Accept: "*/*",
    };
    let seData = {
      url: `v1/like/${post.mediaID}`,
      headers: headers,
    };
    PatchCallApi(seData);
  };

  const onCommentCLick = (post) => {
    setSendData(post.briefId ? post.briefId : post.blogId);
    setOpen(true);
  };

  useEffect(() => {
    getSavedData(1);
    // eslint-disable-next-line
  }, []);

  const getBriefList = () => {
    return postlist.filter((item) => item.briefId);
  };

  const getBlogList = () => {
    return postlist.filter((item) => item.blogId);
  };

  const getSavedData = async (page) => {
    const headers = {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
      Accept: "*/*",
    };
    if (page === 1) {
      setLoader(true);
    }
    let seData = {
      url: `v1/save/${page}`,
      headers: headers,
    };

    let res = await GetCallApi(seData);
    setLoader(false);
    if (res?.status === 200) {
      const getData = res.data.data?.map((p) => {
        return {
          ...p,
        };
      });
      setTotalPage(res.data.metadata.totalPages);
      if (getData?.length > 0) {
        if (page === 1) {
          setPostList(getData);
          setTimeout(() => {
            setCurrentPage(2);
            getSavedData(2);
          }, 300);
        } else {
          setPostList((prev) => [...prev, ...getData]);
        }
      }
    } else {
      setPostList([]);
    }
    loadMoreData = false;
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
      getSavedData(currentPage + 1);
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

  const renderstudioblogItem = (item) => {
    return (
      <div key={item._id} className="blog-item-container-view">
        <div className="blog-image-view" style={{ position: "relative" }}>
          <img
            className="blog-image-view"
            src={item.blogId.mediaURL[0]}
            alt="blog-img"
          />
        </div>
        <div className="text-blog-container">
          <div className="blog-item-info-container">
            <div
              style={{ color: darkMode ? "white" : "#040406" }}
              className="blog-view-main-text"
            >
              {item.blogId.title}
            </div>
            <div
              style={{ color: darkMode ? "white" : "#040406" }}
              className="during-text-style-info"
            >
              {item.blogId.description}
            </div>
            <div className="brif-info-name-text">
              By {item.savedMediaOwner.firstName}{" "}
              {item.savedMediaOwner.lastName}
            </div>
          </div>
          <div className="like-post-comment-btn-container">
            <div
              onClick={() => onLikePress(item)}
              className="post-reaction-container"
            >
              <img
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
                style={{ color: darkMode ? "white" : "#040406" }}
                className="like-count-text"
              >
                {item.likes}
              </div>
            </div>
            <div
              onClick={() => onCommentCLick(item)}
              className="post-reaction-container"
            >
              <img
                src={darkMode ? WhiteMessage : CommentBlackIcon}
                alt="like-icon"
              />
              <div
                style={{ color: darkMode ? "white" : "#040406" }}
                className="like-count-text"
              >
                {item.comments}
              </div>
            </div>
            <div className="post-reaction-container">
              <img src={darkMode ? WhiteEye : EyeBlackIcon} alt="like-icon" />
              <div
                style={{ color: darkMode ? "white" : "#040406" }}
                className="like-count-text"
              >
                {item.views}
              </div>
            </div>
          </div>
        </div>
        <div
          style={{ cursor: "pointer", height: "25px" }}
          onClick={(event) => handleClickUMenu(event, item)}
        >
          <img
            className="vartical-three-dot-view"
            src={darkMode ? WhiteThreeDot : VarticalThreedotIcon}
            alt="vartical-three-dot"
          />
        </div>
      </div>
    );
  };

  const renderstudiobriefItem = (item) => {
    return (
      <div key={item._id} className="blog-item-container-view">
        <div className="blog-image-view" style={{ position: "relative" }}>
          <video
            className="blog-image-view"
            width="100%"
            height="100%"
            style={{ borderRadius: "8px", objectFit: "cover" }}
          >
            <source src={item.briefId.mediaURL[0]} type="video/mp4" />
          </video>
          <img
            className="video-plya-icon-style"
            src={VideoPlayIcon}
            alt="video-icon"
          />
        </div>
        <div className="text-blog-container">
          <div className="blog-item-info-container">
            <div
              style={{ color: darkMode ? "white" : "#040406" }}
              className="blog-view-main-text"
            >
              {item.briefId.description}
            </div>
            <div className="brif-info-name-text">
              By {item.savedMediaOwner.firstName}{" "}
              {item.savedMediaOwner.lastName}
            </div>
          </div>
          <div className="like-post-comment-btn-container">
            <div
              onClick={() => onLikePress(item)}
              className="post-reaction-container"
            >
              <img
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
                style={{ color: darkMode ? "white" : "#040406" }}
                className="like-count-text"
              >
                {item.likes}
              </div>
            </div>
            <div
              onClick={() => onCommentCLick(item)}
              className="post-reaction-container"
            >
              <img
                src={darkMode ? WhiteMessage : CommentBlackIcon}
                alt="like-icon"
              />
              <div
                style={{ color: darkMode ? "white" : "#040406" }}
                className="like-count-text"
              >
                {item.comments}
              </div>
            </div>
            <div className="post-reaction-container">
              <img src={darkMode ? WhiteEye : EyeBlackIcon} alt="like-icon" />
              <div
                style={{ color: darkMode ? "white" : "#040406" }}
                className="like-count-text"
              >
                {item.views}
              </div>
            </div>
          </div>
        </div>
        <div
          style={{ cursor: "pointer", height: "25px" }}
          onClick={(event) => handleClickUMenu(event, item)}
        >
          <img
            className="vartical-three-dot-view"
            src={darkMode ? WhiteThreeDot : VarticalThreedotIcon}
            alt="vartical-three-dot"
          />
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
              className=" ms-4"
              style={{ color: darkMode ? "white" : "#040406" }}
            >
              {t("SavedItems")}
            </span>
          </div>
        </div>
      </section>
      <div
        style={{ backgroundColor: darkMode ? "#040405" : "white" }}
        className="brife-container"
      >
        <div
          style={{ color: darkMode ? "white" : "#040406" }}
          className="brife-text-style-view"
        >
          {t("Briefs")}
        </div>
        <div className="grid-list-save-item-view">
          {getBriefList().map(renderstudiobriefItem)}
        </div>
      </div>
      <div
        style={{ backgroundColor: darkMode ? "#040405" : "white" }}
        className="brife-container"
      >
        <div
          style={{ color: darkMode ? "white" : "#040406" }}
          className="brife-text-style-view"
        >
          {t("Blogs")}
        </div>
        <div className="grid-list-save-item-view">
          {getBlogList().map(renderstudioblogItem)}
        </div>
      </div>
      <Menu
        className="notification_list"
        id="long-menu"
        MenuListProps={{
          "aria-labelledby": "long-button",
        }}
        anchorEl={anchorEl2}
        open={openUMenu}
        onClose={handleCloseUMenu}
      >
        <div
          style={{ color: darkMode ? "#FFFFFF" : "#040406" }}
          className="remove-save-item-style"
          onClick={onRemoveClick}
        >
          {t("Remove")}
        </div>
      </Menu>
      <LargeModal
        sendData={sendData}
        setOpen={setOpen}
        open={open}
        onLikeUnlikePost={(post) => onLikePress(post)}
      />
    </div>
  );
}

export default SaveItem;
