import React, { Suspense, useEffect, useState } from "react";
import "./index.scss";
import SuggestedBox from "../../Components/Reusable/SuggestedBox";
import { Link } from "react-router-dom";
import PostCard from "../../Components/PostCard/index";
import { GetCallApi } from "../../../Action/Action";
import { useSelector } from "react-redux";
import { Backdrop, CircularProgress } from "@mui/material";

const renderLoader = () => <p></p>;

function Trending() {
  const [postData, setPostData] = useState([]);
  const [open, setOpen] = useState(false);

  const Lang = useSelector((state) => state.language.lang);
  const token = useSelector((state) => state.login.LoginDetails?.data.token);
  const LogDetails = useSelector((state) => state.login?.LoginDetails?.data);

  const headers = {
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
    Accept: "*/*",
  };

  useEffect(() => {
    getPostData(LogDetails?._id);
    // eslint-disable-next-line
  }, []);

  const getPostData = async (id) => {
    setPostData([]);
    setOpen(true);
    let seData = {
      url: `/v1/blog/byotheruser/1/${id}`,
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
        <div className="trending">
          <div className="container-fluid">
            <div className="row">
              <div className="col-md-3 p-0" />
              <div className="col-md-6 p-0">
                <div className="exploreBox">
                  {false && (
                    <div className="topBtn">
                      <div
                        className={`selectType ${
                          Lang === "ar" ? "arabic" : "other"
                        }`}
                      >
                        <Link>Following</Link>
                        <Link>For You</Link>
                      </div>
                    </div>
                  )}
                  <div className="postList">
                    <PostCard data={postData} trend={true} />
                  </div>
                </div>
              </div>
              <div className="col-md-3 p-0" />
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

export default Trending;
