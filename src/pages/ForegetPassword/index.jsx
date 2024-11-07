import React, { useEffect, useState } from "react";
import "./index.scss";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import leftArrow from "../../assets/media/leftArrow.svg";
import mailBoxIcon from "../../assets/media/mailBoxIcon.jpg";
import "react-phone-number-input/style.css";
import { PostCallApi } from "../../Action/Action";
import countryCodeList from "../Register/countryCode.json";
import LoginHeader from "../../Shared/LoginHeader";

function ForegetPassword() {
  const [mailBox, setMailBox] = useState(false);
  const [forgetPassMethod, setForgetPassMethod] = useState(true);
  const [storeMail, setStoreMail] = useState("");
  const [storeMethod, setStoreMethod] = useState();

  let navigate = useNavigate();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    reset();
    reset();
// eslint-disable-next-line
  }, [forgetPassMethod]);

  const onSubmit = async (data) => {
    let sendData = {
      ...data,
      emailornumbertype: forgetPassMethod === true ? "email" : "number",
    };
    let seData = {
      url: `/v1/forget-password-step1`,
      body: sendData,
    };
    let res = await PostCallApi(seData);
    if (res?.status === 200) {
      if (forgetPassMethod === true) {
        setMailBox(true);
      } else {
        navigate("/type-code");
      }
    } else {
      console.log(res);
    }
  };

  const openMail = () => {
    navigate("/type-code");
    setTimeout(() => {
      openMail1();
    }, 1000);
  };

  const openMail1 = () => {
    window.open("https://mail.google.com/mail/u/0/#inbox", "_blank");
  };

  // Store in localStorage
  const handleChange = (event) => {
    if (event) {
      setStoreMail(event.target.value);
    }
    setStoreMethod(forgetPassMethod);
  };
  useEffect(() => {
    localStorage.setItem("storedMail", storeMail);
  }, [storeMail]);
  useEffect(() => {
    localStorage.setItem("storeMethod", storeMethod);
  }, [storeMethod]);
  useEffect(() => {
    const storedMail = localStorage.getItem("storedMail");
    const storeMethod = localStorage.getItem("storeMethod");
    if (storedMail) {
      setStoreMail(storedMail);
    }
    if (storeMethod) {
      setStoreMail(storeMethod);
    }
  }, []);

  return (
    <section className={`forgetPass_page`}>
      <LoginHeader />
      <div className="container">
        <div className="row">
          <div className="col-xl-5 col-lg-5 col-md-8 col-12 m-auto">
            {mailBox === true ? (
              <div className="inner_box card">
                <img
                  src={mailBoxIcon}
                  className="mailBoxIcon mx-auto"
                  alt=""
                  width={150}
                  height={135}
                />
                <div className="heading">
                  <h1>Check your email box</h1>
                  <p>We sent you the instructions. Please check your email</p>
                </div>
                <button className="theme_btn mb-3" onClick={openMail}>
                  Open email
                </button>
                <button className="theme_btn dark">Back</button>
              </div>
            ) : (
              <div className="inner_box card">
                <div className="heading">
                  <h1>Forgot Password</h1>
                  {forgetPassMethod ? (
                    <p>
                      Enter your email and we will send you the letter with the
                      instruction of password changing
                    </p>
                  ) : (
                    <p>We will send you a code to your phone number</p>
                  )}
                </div>
                {forgetPassMethod ? (
                  <form
                    className="d-flex flex-column"
                    onSubmit={handleSubmit(onSubmit)}
                  >
                    <div className="form-group">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="mail@gmail.com"
                        {...register("emailornumbervalue", {
                          onChange: handleChange,
                          required: "This field is required",
                          pattern: {
                            value: /\S+@\S+\.\S+/,
                            message: "Please Enter Valid Email",
                          },
                        })}
                      />
                      {errors.emailornumbervalue && (
                        <span role="alert" className="error_text">
                          {errors.emailornumbervalue.message}
                        </span>
                      )}
                    </div>
                    <button
                      type="submit"
                      name="submit"
                      className="theme_btn"
                      value="Reset Password"
                    >
                      Reset Password
                    </button>
                  </form>
                ) : (
                  <form
                    className="d-flex flex-column"
                    onSubmit={handleSubmit(onSubmit)}
                  >
                    <div className="form-group">
                      <div className="d-flex number">
                        <select className="form-select code">
                          {countryCodeList?.countries?.map((item, i) => (
                            <option value={item?.dial_code} key={i}>
                              {item?.code}
                            </option>
                          ))}
                          {/* <option value="01">UK</option> */}
                        </select>
                        <input
                          type="number"
                          className="form-control"
                          placeholder="+1 123 456789"
                          {...register("emailornumbervalue", {
                            onChange: handleChange,
                            required: "This field is required",
                          })}
                        />
                      </div>
                      {errors.emailornumbervalue && (
                        <span role="alert" className="error_text">
                          {errors.emailornumbervalue.message}
                        </span>
                      )}
                    </div>
                    <button type="submit" name="submit" className="theme_btn">
                      Send code
                    </button>
                  </form>
                )}
                <div className="typeForMail">
                  <button
                    className={`small_theme_btn ${
                      !forgetPassMethod ? "light" : ""
                    }`}
                    onClick={() => setForgetPassMethod(true)}
                  >
                    By Email
                  </button>
                  <button
                    className={`small_theme_btn ${
                      forgetPassMethod ? "light" : ""
                    }`}
                    onClick={() => setForgetPassMethod(false)}
                  >
                    By Phone
                  </button>
                </div>
                <Link to="/" className="backBtn">
                  <img src={leftArrow} alt="" />
                  Back to Login
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

export default ForegetPassword;
