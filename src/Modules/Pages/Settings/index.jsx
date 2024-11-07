import React from "react";
import { Backdrop, CircularProgress } from "@mui/material";
import "./index.scss";


function Settings() {
  return (
    <>
      <div className="settings">
        <div className="container-fluid">
          <Backdrop
            open={false}
            sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
          >
            <CircularProgress color="inherit" />
          </Backdrop>
          <div className="row">
            <div className="col-md-12 p-0">
              <div className="setingsContainer">
                <>Settings Page</>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Settings;
