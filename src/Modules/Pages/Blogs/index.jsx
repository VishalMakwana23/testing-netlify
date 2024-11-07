import React from "react";
import "./index.scss";
import { Backdrop, CircularProgress } from "@mui/material";


function Blogs() {
  return (
    <>
      <div className="blog">
        <div className="container-fluid">
          <Backdrop
            open={false}
            sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
          >
            <CircularProgress color="inherit" />
          </Backdrop>
          <div className="row">
            <div className="col-md-12 p-0">
              <div className="blogContainer">
                <>Blog Page</>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Blogs;
