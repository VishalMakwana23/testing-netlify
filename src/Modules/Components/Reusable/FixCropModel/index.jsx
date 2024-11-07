import React, { useState } from "react";
import "./index.scss";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
} from "@mui/material";
import ReactCrop from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";
export default function CropModel(props) {
  const [crop, setCrop] = useState({
    maxHeight: 500,
    maxWidth: 500,
  });
  const { src, filename, openCropModal, setCropModal, setCroppedImageUrl } =
    props;

  const cropImageNow = () => {
    const canvas = document.createElement("canvas");
    const scaleX = image.naturalWidth / image.width;
    const scaleY = image.naturalHeight / image.height;
    canvas.width = crop.width;
    canvas.height = crop.height;
    const ctx = canvas.getContext("2d");
    const pixelRatio = window.devicePixelRatio;
    canvas.width = crop.width * pixelRatio;
    canvas.height = crop.height * pixelRatio;
    ctx.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
    ctx.imageSmoothingQuality = "high";

    ctx.drawImage(
      image,
      crop.x * scaleX,
      crop.y * scaleY,
      crop.width * scaleX,
      crop.height * scaleY,
      0,
      0,
      crop.width,
      crop.height
    );
    const base64Image = canvas.toDataURL("image/jpeg");
    function dataURLtoFile(dataurl, filename) {
      var arr = dataurl.split(","),
        mime = arr[0].match(/:(.*?);/)[1],
        bstr = atob(arr[1]),
        n = bstr.length,
        u8arr = new Uint8Array(n);
      while (n--) {
        u8arr[n] = bstr.charCodeAt(n);
      }
      return new File([u8arr], filename, { type: mime });
    }
    setCroppedImageUrl(dataURLtoFile(base64Image, filename));
    setCropModal(false);
  };
  const [image, setImage] = useState(null);

  const onload = (e) => {
    // const { width, height } = e.currentTarget;
    setImage(e.currentTarget);
  };
  return (
    <div>
      <Dialog
        open={openCropModal}
        onClose={() => setCropModal(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        className={props?.coverPopup ? "coverPopup" : ""}
      >
        <DialogTitle id="alert-dialog-title">{"Crop Image"}</DialogTitle>
        <DialogContent>
          <ReactCrop maxWidth={500} maxHeight={500} 
          crop={crop} onChange={setCrop}>
            <img src={src} onLoad={onload} alt="" />
          </ReactCrop>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              setCropModal(false);
              setCroppedImageUrl(null);
            }}
            color="primary"
          >
            cancel
          </Button>
          <Button onClick={cropImageNow} color="primary" autoFocus>
            done
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
