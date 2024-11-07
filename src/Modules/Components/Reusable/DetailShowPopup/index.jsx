import React, { useEffect } from "react";
import { Box, Button, Modal } from "@mui/material";
import "./index.scss";
// import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
// import { Link } from "react-router-dom";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 600,
  background: "#ffffff",
  display: "flex",
  justifyContent: "center",
  flexDirection: "column",
};
export default function DetailShowPopup(props) {
  const { openbox, closebox, item, approvBooth,  canEdit, gotoBtn } = props;
  useEffect(() => {
    if (openbox) {
      handleOpen();
    }
    // eslint-disable-next-line
  }, [openbox]);
  // const LogDetail = useSelector((state) => state.login.LoginDetails);

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
    closebox(false);
  };

  return (
    <>
      {open && (
        <>
          <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
            className="toggle_show_data"
          >
            <Box sx={style} className="show_data_box">
              <div className="popup_show_detail_box">
                <h6>{props?.title}</h6>
                {/* {comDl?.length < 0 ?
                  <div className="popup_show_detail">
                    <div className="d-flex">
                      <p className="left_text">Exhibitor Name :</p>
                      <p className="right_text">{comDl?.exhibitorName}</p>
                    </div>
                    <div className="d-flex">
                      <p className="left_text">Email :</p>
                      <p className="right_text">{comDl?.emailId}</p>
                    </div>
                    <div className="d-flex">
                      <p className="left_text">Phone Number :</p>
                      <p className="right_text">{comDl?.phoneNumber}</p>
                    </div>
                  </div>
                  :
                  <>
                    {comDl?.map((item, i) =>
                      <>
                        <div className="popup_show_detail multi" key={i}>
                          <div className="d-flex">
                            <p className="left_text">Exhibitor Name :</p>
                            <p className="right_text">{item?.exhibitorName}</p>
                          </div>

                          <div className="d-flex">
                            <p className="left_text">Email :</p>
                            <p className="right_text">{item?.emailId}</p>
                          </div>
                          <div className="d-flex">
                            <p className="left_text">Phone Number :</p>
                            <p className="right_text">{item?.phoneNumber}</p>
                          </div>
                          {comDl?.length < 0 ?
                          <div className="col-md-12 text-end mt-3">
                            <Button className="detail_button">Approve</Button>
                          </div>
                          :""}
                        </div>
                      </>
                    )}
                  </>
                } */}

                <div className={`popup_show_detail`}>
                  <div className="d-flex">
                    <p className="left_text">Exhibitor Name :</p>
                    <p className="right_text">{item?.exhibitorName}</p>
                  </div>
                  <div className="d-flex">
                    <p className="left_text">Email :</p>
                    <p className="right_text">{item?.emailId}</p>
                  </div>
                  <div className="d-flex">
                    <p className="left_text">Phone Number :</p>
                    <p className="right_text">{item?.phoneNumber}</p>
                  </div>
                  {/* <div className="d-flex">
                    <p className="left_text">Type :</p>
                    <p className="right_text">{item?.type}</p>
                  </div>
                  {item?.type === "company" ? (
                    <div className="d-flex">
                      <p className="left_text">Company Name :</p>
                      <p className="right_text">{item?.companyName}</p>
                    </div>
                  ) : (
                    <div className="d-flex">
                      <p className="left_text">Title :</p>
                      <p className="right_text">{item?.title}</p>
                    </div>
                  )} */}
                  {canEdit ? (
                    <>
                      {item?.status === "InProgress" ? (
                        <div className="col-md-12 text-end mt-3">
                          <Button
                            className="detail_button"
                            onClick={() => approvBooth(item?.exhibitorsId)}
                          >
                            Approve
                          </Button>
                        </div>
                      ) : (
                        ""
                      )}
                    </>
                  ) : (
                    ""
                  )}
                  {gotoBtn ? (
                    <div className="col-md-12 text-end mt-3">
                      <Link
                        to={`/exhibitor-profile-new/${item?.exhibitorsId}`}
                        className="detail_button"
                        style={{ textDecoration: "none" }}
                      >
                        View
                      </Link>
                    </div>
                  ) : (
                    ""
                  )}
                </div>
              </div>
            </Box>
          </Modal>
        </>
      )}
    </>
  );
}
