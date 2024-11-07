import * as React from "react";
import Modal from "@mui/material/Modal";
import "./index.scss";
import { ModalClose, Sheet } from "@mui/joy";
import copy_icon from "../../../../../assets/icons/copyright.svg";
import star_icon from "../../../../../assets/icons/star.svg";
import unfollow_icon from "../../../../../assets/icons/unfollow.svg";
import about_icon from "../../../../../assets/icons/aboutaccount.svg";
import info_icon from "../../../../../assets/icons/info.svg";
import Layer_icon from "../../../../../assets/icons/Layer_1.svg";
import playBrief_icon from "../../../../../assets/icons/playBrief.svg";
import blog_icon from "../../../../../assets/icons/Blog.svg";
import MediumModal from "../medium/MediumModal";
import { useState } from "react";
import { PatchCallApi, PostCallApi } from "../../../../../Action/Action";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { CircularProgress } from "@mui/material";
import { useTranslation } from "react-i18next";

export default function SmallModal(props) {
  const {
    openSmall,
    setOpenSmall,
    sendData,
    onFollowClick,
    follow,
    onAboutThisAccount,
    type,
    popuptype
  } = props;
  const accountInformation = useSelector((state) => state.login.LoginDetails);

  const [popUpData, setPopUpData] = useState("");
  const [mediumOpen, setMediumOpen] = useState(false);
  const [blogOpen, setBlogOpen] = useState(false);
  const [blockLoader, setBlockLoader] = useState(false);
  const { t } = useTranslation();
  const [blogVal, setBlogVal] = useState("");

  React.useEffect(() => {
    if (popuptype) {
      setPopUpData(popuptype)
    }
  }, [popuptype, openSmall])
  const handleClose = () => {
    setOpenSmall(false);
    setPopUpData("");
  };

  const handlePopup = (val) => {
    setPopUpData(val);
  };

  const handleBrief = () => {
    setOpenSmall(false);
    setMediumOpen(true);
  };

  const handleBlog = (value) => {
    setOpenSmall(false);
    setMediumOpen(false);
    setBlogOpen(true);
    setBlogVal(value);
  };

  const onAddtoFav = () => {
    setOpenSmall(false);
    const headers = {
      Authorization: `Bearer ${accountInformation.data.token}`,
      "Content-Type": "application/json",
      Accept: "*/*",
    };
    const body = {
      mediaID: sendData._id,
    };
    let seData = {
      url: `v1/save`,
      headers: headers,
      body: body,
    };
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
    PatchCallApi(seData);
  };
  const onBlockAccount = async () => {
    setBlockLoader(true);
    const headers = {
      Authorization: `Bearer ${accountInformation.data.token}`,
      "Content-Type": "application/json",
      Accept: "*/*",
    };
    let seData = {
      url: `v1/block/${sendData.owner._id}`,
      headers: headers,
    };
    await PatchCallApi(seData);
    setBlockLoader(false);
    handlePopup("Success");
  };
  const reportPost = (report) => {
    setOpenSmall(false);
    const headers = {
      Authorization: `Bearer ${accountInformation.data.token}`,
      "Content-Type": "application/json",
      Accept: "*/*",
    };
    const body = {
      mediaID: sendData._id,
      mediaType: type,
      reportReason: report,
    };
    let seData = {
      url: `v1/report`,
      headers: headers,
      body: body,
    };
    toast.success("Report added successfully", {
      position: "top-right",
      autoClose: 1500,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });
    PostCallApi(seData);
  };
  return (
    <div>
      <div>
        {openSmall && (
          <Modal
            aria-labelledby="modal-title"
            aria-describedby="modal-desc"
            open={openSmall}
            onClose={handleClose}
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Sheet
              variant="outlined"
              sx={{
                maxWidth: !props?.briefBlog ? 350 : undefined,
                maxHeight: "90vh",
                height: "auto",
                borderRadius: "md",
                p: 4,
                boxShadow: "lg",
              }}
            >
              <ModalClose variant="plain" sx={{ m: 1 }} onClick={handleClose} />
              <div className="col">
                {/* <Options setOpen={setOpen} write={props.write} /> */}
                {popUpData === "Scammer" ? (
                  <div className="scam">
                    <div className="row">
                      <div className="pb-3">
                        <button onClick={() => handlePopup("Block")}>
                          <span>Scammer</span>
                        </button>
                      </div>
                    </div>
                    <div className="row">
                      <div className="pb-3">
                        <button
                          onClick={() =>
                            reportPost("Pretending to be someone else")
                          }
                        >
                          <span>Pretending to be someone else</span>
                        </button>
                      </div>
                    </div>
                    <div className="row">
                      <div className="pb-3">
                        <button
                          onClick={() =>
                            reportPost("Fake Content/ Copied Content")
                          }
                        >
                          <span>Fake Content/ Copied Content</span>
                        </button>
                      </div>
                    </div>
                    <div className="row">
                      <div className="pb-3">
                        <button onClick={() => reportPost("Abusive language")}>
                          <span>Abusive language</span>
                        </button>
                      </div>
                    </div>
                  </div>
                ) : popUpData === "Block" ? (
                  <div className="buttons w-100">
                    <div className="heading mb-3">
                      <span>Block MH. Jessile or Unfollow</span>
                    </div>
                    <div className="block mb-3">
                      {!blockLoader ? (
                        <button onClick={onBlockAccount}>Block</button>
                      ) : (
                        <CircularProgress />
                      )}
                    </div>
                    {follow && (
                      <div
                        className="unfollow"
                        onClick={() => {
                          handleClose();
                          onFollowClick();
                        }}
                      >
                        <button>Unfollow</button>
                      </div>
                    )}
                  </div>
                ) : popUpData === "Success" ? (
                  <div className="row">
                    <div className="pb-3">
                      <div className="block_badge mb-3">
                        <img
                          style={{ height: "80px" }}
                          src={Layer_icon}
                          alt=""
                        />
                      </div>
                    </div>
                    <h5>
                      <span style={{ color: "#E84127", fontSize: "20px" }}>
                        {!sendData.owner.firstName ? "" : sendData.owner.firstName +
                          " " +
                          sendData.owner.lastName}
                      </span>{" "}
                      <p>{sendData.owner.firstName ? "has been blocked!" : 'Blocked successfully.'}</p>
                    </h5>
                  </div>
                ) : props?.briefBlog ? (
                  ""
                ) : (
                  <>
                    {false && (
                      <div className="row">
                        <div className="pb-3">
                          <button>
                            <img className="me-3" src={copy_icon} alt="" />
                            <span>Copy Link</span>
                          </button>
                        </div>
                      </div>
                    )}
                    <div className="row">
                      <div className="pb-3">
                        <button onClick={onAddtoFav}>
                          <img className="me-3" src={star_icon} alt="" />
                          <span>Add to favorites</span>
                        </button>
                      </div>
                    </div>
                    <div className="row">
                      <div className="pb-3">
                        <button onClick={onFollowClick}>
                          <img className="me-3" src={unfollow_icon} alt="" />
                          <span>
                            {follow ? t("Unfollow") : t("Follow")}
                          </span>
                        </button>
                      </div>
                    </div>
                    <div className="row">
                      <div className="pb-3">
                        <button onClick={onAboutThisAccount}>
                          <img className="me-3" src={about_icon} alt="" />
                          <span>About this account</span>
                        </button>
                      </div>
                    </div>
                    <div className="row">
                      <div>
                        <button onClick={() => handlePopup("Scammer")}>
                          <img className="me-3" src={info_icon} alt="" />
                          <span>Report</span>
                        </button>
                      </div>
                    </div>
                  </>
                )}
                {props?.briefBlog ? (
                  <div className="buttons">
                    <div className="brief_btn mb-3 mt-4">
                      <button onClick={handleBrief}>
                        <img className="me-3" src={playBrief_icon} alt="" />
                        <span>Briefs</span>
                      </button>
                    </div>
                    <div className="blog_btn">
                      <button onClick={() => handleBlog("Blog")}>
                        <img className="me-3" src={blog_icon} alt="" />
                        <span>Blog</span>
                      </button>
                    </div>
                  </div>
                ) : (
                  ""
                )}
              </div>
            </Sheet>
          </Modal>
        )}
      </div>
      <MediumModal
        mediumOpen={mediumOpen}
        setMediumOpen={setMediumOpen}
        setBlogOpen={setBlogOpen}
        blogOpen={blogOpen}
        blogVal={blogVal}
      />
    </div>
  );
}
