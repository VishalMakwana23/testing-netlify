import React, { Suspense, useEffect, useState } from "react";
import "./index.scss";

import user from "../../../assets/icons/users.svg";
import company from "../../../assets/icons/company.svg";
import sales from "../../../assets/icons/sales.svg";
import events from "../../../assets/icons/events.svg";

import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import Axios from "../../../Utils/AxiosConfig";
import { useSelector } from "react-redux";

const renderLoader = () => <p></p>;
function AdminDashboard() {
  const [dataOfCount, setDataOfCount] = useState([]);

  useEffect(() => {
    GetTotalCountList();
    // eslint-disable-next-line
  }, []);

  const token = useSelector((state) => state.login.LoginDetails?.accessToken);

  const headers = {
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
    Accept: "*/*",
  };

  const GetTotalCountList = () => {
    Axios.get("/api/Dashboard/GetTotalCountList", { headers })
      .then((res) => {
        if (res.status === 200) {
          if (res.data.success) {
            let comList1 = res?.data?.payload;
            setDataOfCount(comList1);
          }
        }
      })
      .catch((e) => console.log(e));
  };

  const posts = [
    {
      img: company,
      backcolor: "#18BAD4",
      title: "Total Company",
      value: dataOfCount?.totalCompany,
    },
    {
      img: user,
      backcolor: "#28B79C",
      title: "Total User",
      value: dataOfCount?.totalUser,
    },
    {
      img: sales,
      backcolor: "#48B96E",
      title: "Total Sales",
      value: dataOfCount?.totalSales,
    },
    {
      img: events,
      backcolor: "#7AC146",
      title: "Total Conference",
      value: dataOfCount?.todayEvents,
    },
  ];
  return (
    <Suspense fallback={renderLoader()}>
      {posts?.map((post, i) => (
        <div className="col-xl-3 col-lg-3 col-md-6 col-sm-6 col-xs-12" key={i}>
          <div className="dashboard_box">
            <div
              className="icon"
              style={{ backgroundColor: `${post.backcolor}` }}
            >
              <img src={post.img} className="img-fluid" alt="" />
            </div>
            <div className="text">
              <label>
                <ArrowUpwardIcon className="uparrow me-2" />
                {post.title}
              </label>
              <p>{post.value}</p>
            </div>
          </div>
        </div>
      ))}
    </Suspense>
  );
}

export default AdminDashboard;
