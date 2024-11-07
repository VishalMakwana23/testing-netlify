import React from "react";
import { Box, IconButton, Modal } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import "./index.scss";
import hoverimg from "../../../assets/images/hover-img.png";

function ImgPopUp(props) {
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "max-content",
    background: "#ffffff",
    display: "flex",
    "justify-content": "center",
    "flex-direction": "column",
  };
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => setOpen(false);
  return (
    <>
      <div className="pop-image">
        {props?.addClass === "h_fix" ? (
          <img
            src={props.img}
            alt=""
            width={40}
            height={40}
            className={`img-fluid img_pop  ${props.addClass}`}
            onClick={handleOpen}
          />
        ) : (
          <img
            src={props.img}
            alt=""
            className={`img-fluid img_pop  ${props.addClass}`}
            onClick={handleOpen}
          />
        )}
        {props?.hide_icon ? (
          ""
        ) : (
          <div className="hover-img">
            {" "}
            <img src={hoverimg} alt="hoverimg" onClick={handleOpen} />
          </div>
        )}
      </div>

      {/* <button className="btn_Img_show" >
      </button> */}
      {open && (
        <>
          <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
            className="toggle_img_Show"
          >
            <Box sx={style} className="delete_data_box">
              <IconButton
                aria-label="close"
                onClick={handleClose}
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
              <div className="img_show">
                <img src={props.img} className="img-fluid" alt="" />
              </div>
            </Box>
          </Modal>
        </>
      )}
    </>
  );
}

export default React.memo(ImgPopUp);
