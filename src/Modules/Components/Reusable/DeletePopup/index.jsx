import React, { useState } from "react";
import { Box, Modal } from "@mui/material";
import { Link } from "react-router-dom";
import "./index.scss";
import { useDispatch, useSelector } from "react-redux";
import { Backdrop, CircularProgress } from "@mui/material";
import Axios from "../../../../Utils/AxiosConfig";
import { DeleteDataFor } from "../../../../reducers/Common";
import {  toast } from "react-toastify";
import delete_img from "../../../../assets/icons/delete.svg";

export default function DeletePopup(props) {
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
  const dispatch = useDispatch();
  const token = useSelector((state) => state.login.LoginDetails.accessToken);
  const headers = {
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
    Accept: "*/*",
  };
  let deleteInfo = useSelector((state) => state.Common?.DeleteData);
  const [derror, setDerror] = useState();

  const [openCircle, setOpenCircle] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setDerror({ err: "" });
    setOpen(false);
    setOpenCircle(false);
  };
  const handledelete = () => {
    setOpenCircle(true);
    Axios.delete(props.url, { headers })
      .then((responce) => {
        if (responce.data.success) {
          setOpenCircle(false);
          dispatch(DeleteDataFor(deleteInfo ? false : true));
          handleClose();
          toast.success(responce.data.message, {
            position: "top-right",
            autoClose: 1500,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
          });
        } else {
          setDerror({ err: responce.data.message });
          setOpenCircle(false);
        }
      })
      .catch((error) => console.log(error));
  };

  return (
    <>
      <Link className="btn_dlt d-flex align-items-center" onClick={handleOpen}>
        <img src={delete_img} className="img-fluid" alt="" />
      </Link>
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => 9999 }}
        open={openCircle}
      >
        <CircularProgress color="inherit" />
      </Backdrop>

      {open && (
        <>
          <Modal
            open={open}
            // onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
            className="toggle_delete_data"
          >
            <Box sx={style} className="delete_data_box">
              <div className="popup_delete_detail_box">
                <h6>{props?.title}</h6>
                <div className="popup_delete_detail">
                  <p className="delete_text">
                    Are you sure you want to Delete
                    <span> {props?.text}?</span>
                  </p>
                  {derror?.err && (
                    <span role="alert" className="d-block error_text">
                      {derror.err}
                    </span>
                  )}
                  <button
                    type="button"
                    className="popup_btn delete"
                    onClick={handledelete}
                  >
                    Delete
                  </button>
                  <button
                    type="button"
                    className="popup_btn cancel"
                    onClick={handleClose}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </Box>
          </Modal>
        </>
      )}
    </>
  );
}
