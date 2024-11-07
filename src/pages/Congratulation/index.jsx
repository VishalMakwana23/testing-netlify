import React from "react";
import "./index.scss";
import { Link, useNavigate } from "react-router-dom";
import congratulation from "../../assets/media/congratulation.svg";
import "react-phone-number-input/style.css";
import { useSelector } from "react-redux";

function Congratulation() {
  const darkMode = useSelector((state) => state.headerMenu.darkMode);
  const navigate = useNavigate();
  // const {
  //   register,
  //   formState: { errors },
  // } = useForm();
  const onGoBackClick = () => {
    navigate(-1);
  };
  return (
    <section
      style={{ backgroundColor: darkMode ? "#040405" : "white" }}
      className="congratulation_page"
    >
      <div className="container">
        <div className="row">
          <div className="col-xl-5 col-lg-5 col-md-8 col-12 m-auto">
            <div
              style={{ backgroundColor: darkMode ? "#1B1B1B" : "white" }}
              className="inner_box card"
            >
              <img
                src={congratulation}
                className="mailBoxIcon mx-auto"
                alt=""
                width={150}
                height={135}
              />
              <div className="heading">
                <h1 style={{ color: darkMode ? "white" : "#040406" }}>
                  Congratulation!
                </h1>
                <p style={{ color: darkMode ? "white" : "#040406" }}>
                  Your Password has been changed.{" "}
                  <Link className="back_go_text_style" onClick={onGoBackClick}>
                    Go Back
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Congratulation;
