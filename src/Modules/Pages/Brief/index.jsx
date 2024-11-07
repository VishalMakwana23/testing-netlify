import React, { Suspense, useEffect, useState } from "react";
import "./index.scss";
import SuggestedBox from "../../Components/Reusable/SuggestedBox";
import { Link } from "react-router-dom";
import { GetCallApi } from "../../../Action/Action";
import { useSelector } from "react-redux";
import { Backdrop, CircularProgress } from "@mui/material";
import PostCard from "../../Components/PostCard";

const renderLoader = () => <p></p>;

function Brief() {
  const [briefData, setBriefData] = useState([]);
  const [openCircle, setOpenCircle] = useState(false);

  const Lang = useSelector((state) => state.language.lang);

  useEffect(() => {
    getPostData();
    // eslint-disable-next-line
  }, []);

  const token = useSelector((state) => state.login.LoginDetails.data.token);
  const darkMode = useSelector((state) => state.headerMenu.darkMode);
  const headers = {
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
    Accept: "*/*",
  };

  const getPostData = async () => {
    setOpenCircle(true);
    let seData = {
      url: `/v1/brief/briefspage/1`,
      // body: sendData,
      headers: headers,
    };

    let res = await GetCallApi(seData);
    setOpenCircle(false);
    if (res?.status === 201) {
      const getData = res.data.data?.map((p) => {
        return {
          ...p,
        };
      });
      setBriefData(getData?.length > 0 ? getData : []);
    } else {
      setBriefData([]);
    }
  };

  return (
    <>
      <Backdrop
        open={openCircle}
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
      <Suspense fallback={renderLoader()}>
        <div className="brief">
          <div className="container-fluid">
            <div className="row">
              <div className="col-md-2 p-0" />
              <div className="col-md-8 p-0">
                <div className="exploreBox">
                  {false && (
                    <div className="topBtn">
                      <div
                        className={`selectType ${
                          Lang === "ar" ? "arabic" : "other"
                        }`}
                        style={{
                          color: darkMode ? "#FFFFFF" : "black",
                          borderRightColor: darkMode ? "#FFFFFF" : "#040406",
                          borderLeftColor: darkMode ? "#FFFFFF" : "#040406",
                          background: darkMode ? "#1B1B1B" : "#d1d1d1",
                        }}
                      >
                        <Link
                          style={{ color: darkMode ? "#FFFFFF" : "#040406" }}
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
                  <div className="postList brif_design">
                    <PostCard data={briefData} brief={true} />
                  </div>
                </div>
              </div>
              {false && (
                <div className="col-md-4 p-0">
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

export default Brief;
