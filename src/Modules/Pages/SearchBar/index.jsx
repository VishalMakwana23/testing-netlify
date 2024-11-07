import React, { Suspense, useState } from "react";
import PropTypes from "prop-types";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import defaultImg from "../../../assets/images/default_profile.jpg";
import search from "../../../assets/icons/Search.svg";
import more_icon from "../../../assets/icons/more_vert.svg";
import Drawer from "@mui/material/Drawer";
import "./index.scss";
import { Link, useNavigate } from "react-router-dom";
import view_icon from "../../../assets/icons/view.svg";
import heart_icon from "../../../assets/icons/like.svg";
import message_icon from "../../../assets/icons/comment.svg";
import playIcon_icon from "../../../assets/icons/playIcon.svg";
import SearchArrow from "../../../assets/icons/whiteIcon/back-arrow-search.svg";
import Showeye from "../../../assets/icons/Showeye.svg";
import { useSelector } from "react-redux";
import { GetCallApi, PatchCallApi } from "../../../Action/Action";
import { Backdrop, CircularProgress } from "@mui/material";
import { useMediaQuery } from "react-responsive";
import LargeModal from "../../Components/Reusable/Modal/large/LargeModal";
import { useTranslation } from "react-i18next";

const drawerWidth = 250;
const renderLoader = () => <p></p>;

function ResponsiveDrawer(props) {
  const darkMode = useSelector((state) => state.headerMenu.darkMode);
  const navigate = useNavigate();
  const { window, mOpen, setMOpen, setIsClose } = props;
  const isMobileView = useMediaQuery({
    query: "(max-width: 478px)",
  });

  const [tab, setTab] = useState("people");
  const [searchVal, setSearchVal] = useState("");
  const [peopleVal, setPeopleVal] = useState([]);
  const [briefList, setBriefList] = useState([]);
  const [blogList, setBlogList] = useState([]);
  const [open, setOpen] = useState(false);
  const [postOpen, setPostOpen] = useState(false);
  const [postData, setPostData] = useState({});
  const { t } = useTranslation();

  const token = useSelector((state) => state.login.LoginDetails.data.token);
  const headers = {
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
    Accept: "*/*",
  };

  const searchPeopleCall = async (v) => {
    if (v) {
      setOpen(true);
      let seData = {
        url: `/v1/search/people/${v}/1`,
        body: {},
        headers: headers,
      };

      const resp = await GetCallApi(seData);
      setOpen(false);
      if (resp?.status === 200) {
        let getData = resp?.data?.data;
        setPeopleVal(getData);
      }
    }
  };

  const searchBriefsCall = async (v) => {
    if (v) {
      setOpen(true);
      let seData = {
        url: `/v1/search/brief/${v}/1`,
        body: {},
        headers: headers,
      };

      const resp = await GetCallApi(seData);
      setOpen(false);
      if (resp?.status === 200) {
        let getData = resp?.data?.data;
        setBriefList(getData);
      }
    }
  };

  const searchBlogCall = async (v) => {
    if (v) {
      setOpen(true);
      let seData = {
        url: `/v1/search/blog/${v}/1`,
        body: {},
        headers: headers,
      };

      const resp = await GetCallApi(seData);
      setOpen(false);
      if (resp?.status === 200) {
        let getData = resp?.data?.data;
        setBlogList(getData);
      }
    }
  };

  const handleDrawerClose = () => {
    setIsClose(true);
    setMOpen(false);
    setTab("people");
    setSearchVal("");
    // setPeopleVal([])
  };

  const handleDrawerTransitionEnd = () => {
    setIsClose(false);
  };

  const container =
    window !== undefined ? () => window().document.body : undefined;

  const handleTabs = (val) => {
    setTab(val);
  };

  const handleSearch = (val) => {
    setSearchVal(val);
    if (val?.length) {
      searchPeopleCall(val);
      searchBriefsCall(val);
      searchBlogCall(val);
    }
  };

  const clearPeople = () => {
    setSearchVal("");
    setPeopleVal([]);
    setBriefList([]);
  };

  const onUserClick = (user) => {
    navigate(`/studio`, { state: { id: user._id } });
    handleDrawerClose();
  };

  const onBriefClick = (post) => {
    setPostData(post);
    setPostOpen(true);
  };

  const onLikeUnlikePost = (post) => {
    const prevData = JSON.parse(JSON.stringify(postData));
    prevData.likes = prevData.likeStatus
      ? prevData.likes - 1
      : prevData.likes + 1;
    prevData.likeStatus = !prevData.likeStatus;
    setPostData(prevData);
    const headers = {
      Authorization: `Bearer ${token}`,
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
      <Backdrop
        open={open}
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
      <Suspense fallback={renderLoader()}>
        <Box sx={{ display: "flex" }}>
          <CssBaseline />
          <Box
            component="nav"
            sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
            aria-label="mailbox folders"
          >
            <Drawer
              container={container}
              className="seach_side_bar"
              variant="temporary"
              open={mOpen}
              onTransitionEnd={handleDrawerTransitionEnd}
              onClose={handleDrawerClose}
              ModalProps={{
                keepMounted: true,
              }}
              sx={{
                "& .MuiDrawer-paper": {
                  boxSizing: "border-box",
                  width: drawerWidth,
                },
              }}
            >
              <div className="main_search">
                {!isMobileView && (
                  <span style={{ marginLeft: "10px" }}>{t("Search")}</span>
                )}
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                  }}
                >
                  {isMobileView && (
                    <img
                      onClick={() => handleDrawerClose()}
                      className="search-arrow-style"
                      src={SearchArrow}
                      alt="search"
                    />
                  )}
                  <div className="search_box" style={{ position: "relative" }}>
                    <input
                      type="text"
                      placeholder={t("Search")}
                      value={searchVal}
                      onChange={(e) => handleSearch(e.target.value)}
                    />
                    <img src={search} alt="" />
                  </div>
                </div>
                <div className="all_btn">
                  <Link
                    onClick={() => handleTabs("people")}
                    className={`${tab === "people" ? "active" : "inactive"}`}
                    style={{
                      color:
                        tab === "people"
                          ? "#FFFFFF"
                          : darkMode
                          ? "#8D8D8D"
                          : "#040406",
                      backgroundColor:
                        tab === "people"
                          ? "#E84127"
                          : darkMode
                          ? "#3D3D3D"
                          : "#FFFFFF",
                    }}
                  >
                    {t("People")}
                  </Link>
                  <Link
                    onClick={() => handleTabs("briefs")}
                    className={`${tab === "briefs" ? "active" : "inactive"}`}
                    style={{
                      color:
                        tab === "briefs"
                          ? "#FFFFFF"
                          : darkMode
                          ? "#8D8D8D"
                          : "#040406",
                      backgroundColor:
                        tab === "briefs"
                          ? "#E84127"
                          : darkMode
                          ? "#3D3D3D"
                          : "#FFFFFF",
                    }}
                  >
                    {t("Briefs")}
                  </Link>
                  <Link
                    onClick={() => handleTabs("blogs")}
                    className={`${tab === "blogs" ? "active" : "inactive"}`}
                    style={{
                      color:
                        tab === "blogs"
                          ? "#FFFFFF"
                          : darkMode
                          ? "#8D8D8D"
                          : "#040406",
                      backgroundColor:
                        tab === "blogs"
                          ? "#E84127"
                          : darkMode
                          ? "#3D3D3D"
                          : "#FFFFFF",
                    }}
                  >
                    {t("Blogs")}
                  </Link>
                </div>
                {tab === "people" ? (
                  <>
                    <div className="recent_search">
                      <span style={{ color: darkMode ? "#ffffff" : "#000000" }}>
                        {t("RecentSearch")}
                      </span>
                      <button className="clear_btn" onClick={clearPeople}>
                        {t("ClearAll")}
                      </button>
                    </div>
                    {peopleVal?.length
                      ? peopleVal?.map((s, i) => {
                          return (
                            <ul
                              className="search_users"
                              key={i}
                              onClick={() => onUserClick(s)}
                            >
                              <li>
                                <div>
                                  <img
                                    src={
                                      s?.profilePic ? s?.profilePic : defaultImg
                                    }
                                    alt=""
                                  />
                                </div>
                                <div className="info">
                                  <h3>{s?.firstName + " " + s.lastName}</h3>
                                  <span>{s?.userName}</span>
                                </div>
                              </li>
                            </ul>
                          );
                        })
                      : ""}
                  </>
                ) : tab === "briefs" ? (
                  <div className="briefs_images">
                    <div className="grid--search-brief-list-view">
                      {briefList.map((item) => (
                        <div
                          onClick={() => onBriefClick(item)}
                          style={{cursor: 'pointer'}}
                          className="brief-container-search"
                        >
                          <video
                            className="brief-single-all-post-img video"
                            width="100%"
                            height="100%"
                            style={{ borderRadius: "8px", objectFit: "cover" }}
                          >
                            <source src={item.mediaURL[0]} type="video/mp4" />
                          </video>
                          <div className="eye-icons-brief-search d-flex align-items-center">
                            <img src={Showeye} alt="" />
                            <div className="view-count-text-brief-search">
                              8.8k
                            </div>
                          </div>
                          <div className="play-icons-brief-search">
                            <img src={playIcon_icon} alt="" />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ) : (
                  <div className="blogs_info">
                    {blogList.map((item, i) => (
                      <div
                        onClick={() => onBriefClick(item)}
                        className="main_card"
                        style={{cursor: 'pointer'}}
                        key={i}
                      >
                        <div className="blog_img me-3">
                          <img
                            className="blog-search-image-view"
                            src={item.mediaURL[0]}
                            alt="blog-search"
                          />
                        </div>
                        <div className="blogs_title">
                          <h5>{item.title}</h5>
                          <p>{item.description}</p>
                          <h6>
                            By{" "}
                            {`${item.owner.firstName} ${item.owner.lastName}`}
                          </h6>
                          <div className="blogs_like_view d-flex justify-content-between">
                            <div className="d-flex align-items-center gap-1">
                              <img
                                className="search-blog-icon"
                                src={heart_icon}
                                alt=""
                              />
                              <p className="m-0">{item.likes}</p>
                            </div>
                            <div className="d-flex align-items-center gap-1">
                              <img
                                className="search-blog-icon"
                                src={message_icon}
                                alt=""
                              />
                              <p className="m-0">{item.comments}</p>
                            </div>
                            <div className="d-flex align-items-center gap-1">
                              <img
                                className="search-blog-icon"
                                src={view_icon}
                                alt=""
                              />
                              <p className="m-0">{item.views}</p>
                            </div>
                          </div>
                        </div>
                        <img src={more_icon} alt="" />
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </Drawer>
          </Box>
        </Box>
        <LargeModal
          sendData={postData}
          setOpen={setPostOpen}
          open={postOpen}
          onLikeUnlikePost={(post) => onLikeUnlikePost(post)}
        />
      </Suspense>
    </>
  );
}

ResponsiveDrawer.propTypes = {
  window: PropTypes.func,
};

export default ResponsiveDrawer;
