import React, { Suspense, useEffect, useState } from "react";
import "./index.scss";
import SuggestedBox from "../../Components/Reusable/SuggestedBox";
import { Link } from "react-router-dom";
import { GetCallApi } from "../../../Action/Action";
import { useSelector } from "react-redux";
import { Backdrop, CircularProgress } from "@mui/material";
import AdsBanner from "../../../assets/images/adsBanner.png";
import HomePostCard from "../../Components/HomePostCard/index";

const renderLoader = () => <p></p>;

function Dashboard() {
  const darkMode = useSelector((state) => state.headerMenu.darkMode);
  const [postData, setPostData] = useState([]);
  const [open, setOpen] = useState(false);

  const Lang = useSelector((state) => state.language.lang);

  useEffect(() => {
    getPostData();
    // eslint-disable-next-line
  }, []);

  const token = useSelector((state) => state.login.LoginDetails.data.token);
  const headers = {
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
    Accept: "*/*",
  };

  const getPostData = async () => {
    setPostData([]);
    setOpen(true);
    let seData = {
      url: `/v1/home/homepage/1`,
      // body: sendData,
      headers: headers,
    };

    let res = await GetCallApi(seData);
    setOpen(false);
    if (res?.status === 201) {
      const getData = res.data.data?.map((p) => {
        return {
          ...p,
        };
      });
      setPostData(getData?.length > 0 ? getData : []);
    } else {
      setPostData([]);
    }
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
        <div className="dashboard">
          <div className="container-fluid">
            <div className="row">
              <div className="col-xl-8 col-lg-8 col-md-12 col-sm-12 p-0">
                <div className="exploreBox">
                  {false && (
                    <div className="topBtn">
                      <div
                        className={`selectType  ${
                          Lang === "ar" ? "arabic" : "other"
                        }`}
                        style={{ background: darkMode ? "#1B1B1B" : "#d1d1d1" }}
                      >
                        <Link
                          style={{
                            color: darkMode ? "#FFFFFF" : "black",
                            borderRightColor: darkMode ? "#FFFFFF" : "#040406",
                            borderLeftColor: darkMode ? "#FFFFFF" : "#040406",
                          }}
                        >
                          Following
                        </Link>
                        <Link
                          style={{ color: darkMode ? "#FFFFFF" : "#040406" }}
                        >
                          For You
                        </Link>
                      </div>
                    </div>
                  )}
                  <div className="postList">
                    <HomePostCard
                      data={postData}
                      cardshow={"cardshow"}
                      dots={true}
                    />
                  </div>
                </div>
              </div>

              {/* -- temporary removed -- */}
              <div
                // className="col-md-2 p-0"
                className="col-xl-4 col-lg-4 col-md-0 col-sm-0 p-0"
                style={{
                  borderLeft: "1px solid rgb(204, 204, 204)",
                  marginTop: "100px",
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                {/* <img
                  src={AdsBanner}
                  alt="ad"
                  style={{ padding: "35px 0px", position: "fixed" }}
                /> */}
              </div>

              {false && (
                <div className="col-xl-4 col-lg-4 col-md-12 col-sm-12 p-0">
                  <SuggestedBox />
                </div>
              )}
            </div>
          </div>
        </div>
      </Suspense>
    </>
  );
}

export default Dashboard;
