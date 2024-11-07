import React, { useEffect, useState } from "react";
import "./index.scss";
// import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import typeCode from "../../assets/media/typeCode.jpg";
import "react-phone-number-input/style.css";
import OtpInput from "react-otp-input";
import { PostCallApi } from "../../Action/Action";
import LoginHeader from "../../Shared/LoginHeader";
import { toast } from "react-toastify";

function TypeCode() {
  const [otp, setOtp] = useState("");
  const [storeOtp, setStoreOtp] = useState("");
  let navigate = useNavigate();

  const storedMail = localStorage.getItem("storedMail");

  const onSubmit = async () => {
    if (otp?.length === 6) {
      handleChange();
      let sendData = {
        // ...data,
        emailornumbertype: "email",
        emailornumbervalue: storedMail,
        confirmationcode: otp,
      };
      let seData = {
        url: `/v1/forget-password-step2`,
        body: sendData,
      };
      let res = await PostCallApi(seData);
      if (res?.status === 200) {
        navigate("/new-login-pasword");
      } else {
        console.log(res);
      }
    }
  };

  const reSend = async () => {
    let success = "OTP Resend Successfully";
    let sendData = {
      emailornumbervalue: storedMail,
      emailornumbertype: "email",
    };
    let seData = {
      url: `/v1/forget-password-step1`,
      body: sendData,
    };
    let res = await PostCallApi(seData);
    if (res?.status === 200) {
      toast.success(success, {
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
      console.log(res);
    }
  };

  // Store in localStorage
  const handleChange = () => {
    setStoreOtp(otp);
  };
  useEffect(() => {
    localStorage.setItem("storeOtp", otp);
    // eslint-disable-next-line
  }, [storeOtp]);
  useEffect(() => {
    const storedValue = localStorage.getItem("storeOtp");
    if (storedValue) {
      setStoreOtp(storedValue);
    }
  }, []);

  return (
    <section className={`typeCode_page`}>
      <LoginHeader />
      <div className="container">
        <div className="row">
          <div className="col-xl-5 col-lg-5 col-md-8 col-12 m-auto">
            <div className="inner_box card">
              <img
                src={typeCode}
                className="mailBoxIcon mx-auto"
                alt=""
                width={150}
                height={135}
              />
              <div className="heading">
                <h1>Type a code</h1>
                <p>We will send you a code to your phone number</p>
              </div>
              <div className="Otp">
                <OtpInput
                  value={otp}
                  onChange={(e) => setOtp(e)}
                  numInputs={6}
                  renderSeparator={<span>-</span>}
                  renderInput={(props) => <input {...props} />}
                />
              </div>
              <button className="theme_btn" onClick={onSubmit}>
                Reset Password
              </button>
              <p className="mt-3">
                Didn’t receive a code? <Link onClick={reSend}>Resend</Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default TypeCode;
