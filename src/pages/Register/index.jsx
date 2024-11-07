import React, { useState } from "react";
import "./index.scss";
import countryCodeList from "./countryCode.json";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import eye from "../../assets/icons/eye.svg";
import eyeOff from "../../assets/icons/eye-off.svg";
import { toast } from "react-toastify";
import login_banner from "../../assets/media/login_banner.svg";
import login_banner_vector1 from "../../assets/media/login_banner_vector1.jpg";
import login_banner_vector2 from "../../assets/media/login_banner_vector2.jpg";
import helpcircle from "../../assets/media/help-circle.svg";
import { PostCallApi } from "../../Action/Action";
import faceID from "../../assets/media/faceID.svg";
import LoginHeader from "../../Shared/LoginHeader";
import { useTranslation } from "react-i18next";

function Register() {
  const [passwordShown, setPasswordShown] = useState(false);
  const [rePasswordShown, setRePasswordShown] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    // reset,
    // setValue,
    formState: { errors },
  } = useForm();
  const { t } = useTranslation();
  let navigate = useNavigate();
  const togglePasswordVisiblity = () => {
    setPasswordShown(!passwordShown);
  };
  const toggleRePasswordVisiblity = () => {
    setRePasswordShown(!rePasswordShown);
  };

  const onSubmit = async (data) => {
    let message = "Register Successfully";
    let notRegister =
      "Something went wrong please try again with diffrent user name ";
    let sendData = {
      ...data,
      country: countryCodeList?.countries?.filter(
        (x) => x.dial_code === data.countryCode
      )[0]?.code,
    };
    delete sendData.repassword;
    delete sendData.remember;
    sendData = Object.entries(sendData).reduce((acc, [k, v]) => v ? {...acc, [k]:v} : acc , {});
    let seData = {
      url: `/v1/user/register`,
      body: sendData,
    };

    let res = await PostCallApi(seData);

    if (res?.status === 201) {
      setTimeout(() => {
        toast.success(message, {
          position: "top-right",
          autoClose: 1500,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
      }, 500);
      navigate("/", { replace: true });
    } else {
      console.log(res);
      toast.error(notRegister, {
        position: "top-right",
        autoClose: 1500,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    }
  };
  return (
    <section className={`register_page`}>
      <LoginHeader />
      <div className="container">
        <div className="row">
          <div className="col-xl-6 col-lg-6 col-md-12 col-12">
            <div className="inner_box left">
              <h1>
                <span>{t("RegisterTitle")}</span> {t("EnjoyReservation")}
              </h1>
              <p>
                {t("AlreadyAccount")} <Link to="/">{t("Login")}!</Link>
              </p>
              <img src={login_banner} alt="" />
            </div>
          </div>
          <div className="col-xl-6 col-lg-6 col-md-12 col-12">
            <div className="inner_box right">
              <div className="heading">
                <h1>{t("Registration")}</h1>
                <p>{t("CredentialToRegister")}</p>
              </div>
              <form className="row" onSubmit={handleSubmit(onSubmit)}>
                <div className="col-md-6">
                  <div className="form-group">
                    <label>{t("FirstName")}</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder={t("FirstNamePlaceholder")}
                      {...register("firstName", {
                        required: "This field is required",
                        pattern: {
                          value: /^[^\s]+(\s+[^\s]+)*$/,
                          message: "Starting and Ending Space not allowed",
                        },
                      })}
                    />
                    {errors.firstName && (
                      <span role="alert" className="error_text">
                        {errors.firstName.message}
                      </span>
                    )}
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-group">
                    <label>{t("LastName")}</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder={t("LastNamePlaceholder")}
                      {...register("lastName", {
                        required: "This field is required",
                        pattern: {
                          value: /^[^\s]+(\s+[^\s]+)*$/,
                          message: "Starting and Ending Space not allowed",
                        },
                      })}
                    />
                    {errors.lastName && (
                      <span role="alert" className="error_text">
                        {errors.lastName.message}
                      </span>
                    )}
                  </div>
                </div>
                <div className="col-md-12">
                  <div className="form-group">
                    <label>{t("Email")}</label>
                    <input
                      type="email"
                      className="form-control"
                      placeholder={t("EmailPlaceholder")}
                      {...register("email", {
                        required: "This field is required",
                      })}
                    />
                    {errors.email && (
                      <span role="alert" className="error_text">
                        {errors.email.message}
                      </span>
                    )}
                  </div>
                </div>
                <div className="col-md-12">
                  <div className="form-group">
                    <label>{t("Number (optional)")}</label>
                    {/* <PhoneInput
                      international
                      countryCallingCodeEditable={false}
                      defaultCountry="IN"
                      value={values}
                      onChange={(e) => getCountryCod(e)}
                      placeholder="+1 123 456789"
                    /> */}
                    <div className="d-flex number">
                      <select
                        className="form-select code"
                        {...register("countryCode", {
                          // required: "This field is required",
                        })}
                      >
                        {countryCodeList?.countries?.map((item, i) => (
                          <option value={item?.dial_code} key={i}>
                            {item?.code}
                          </option>
                        ))}
                        {/* <option value="01">UK</option> */}
                      </select>
                      {errors.countries && (
                        <span role="alert" className="error_text">
                          {errors.countries.message}
                        </span>
                      )}
                      <input
                        type="number"
                        className="form-control"
                        placeholder="+1 123 456789"
                        {...register("phoneNumber", {
                          // required: "This field is required",
                          pattern: {
                            value: /^[^\s]+(\s+[^\s]+)*$/,
                            message:
                              "Starting and Ending Space not allowed",
                          },
                          minLength: {
                            value: 9,
                            message: "Must be 9 characters",
                          },
                          maxLength: {
                            value: 11,
                            message: "Max 11 characters",
                          },
                        })}
                      />
                    </div>
                    {errors.phoneNumber && (
                      <span role="alert" className="error_text">
                        {errors.phoneNumber.message}
                      </span>
                    )}
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-group">
                    <label>{t("Password")}</label>
                    <div className="password">
                      <input
                        name="current-password"
                        className="form-control"
                        placeholder="******"
                        type={passwordShown ? "text" : "password"}
                        {...register("password", {
                          required: {
                            value: true,
                            message: "This field is required",
                          },
                          pattern: {
                            value: /^\S+$/,
                            message: "Whitespace is not allowed in this field",
                          },
                          minLength: {
                            value: 8,
                            message: "Must be 8 characters",
                          },
                          maxLength: {
                            value: 15,
                            message: "Max 15 characters",
                          },
                        })}
                      />
                      <span className="eye" onClick={togglePasswordVisiblity}>
                        <img
                          src={passwordShown === true ? eye : eyeOff}
                          alt="eye"
                        />
                      </span>
                    </div>
                    {errors.password && (
                      <span role="alert" className="error_text">
                        {errors.password.message}
                      </span>
                    )}
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-group">
                    <label>{t("RePasswod")}</label>
                    <div className="password">
                      <input
                        name="current-password"
                        className="form-control"
                        placeholder="******"
                        type={rePasswordShown ? "text" : "password"}
                        {...register("repassword", {
                          required: {
                            value: true,
                            message: "This field is required",
                          },
                          pattern: {
                            value: /^\S+$/,
                            message: "Whitespace is not allowed in this field",
                          },
                          minLength: {
                            value: 8,
                            message: "Must be 8 characters",
                          },
                          maxLength: {
                            value: 15,
                            message: "Max 15 characters",
                          },
                          validate: (val) => {
                            if (watch("password") !== val) {
                              return "Your passwords do no match";
                            }
                          },
                        })}
                      />
                      <span className="eye" onClick={toggleRePasswordVisiblity}>
                        <img
                          src={rePasswordShown === true ? eye : eyeOff}
                          alt="eye"
                        />
                      </span>
                    </div>
                    {errors.repassword && (
                      <span role="alert" className="error_text">
                        {errors.repassword.message}
                      </span>
                    )}
                  </div>
                </div>
                <div className="col-md-12">
                  <div className="form-group">
                    <label>{t("CreateUserName")}</label>
                    <div className="username">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Elizabeth.foodblog_07"
                        {...register("userName", {
                          required: "This field is required",
                          pattern: {
                            value: /^\S+$/,
                            message: "Whitespace is not allowed in this field",
                          },
                        })}
                      />
                      <img src={faceID} alt="" />
                    </div>
                    {errors.userName && (
                      <span role="alert" className="error_text">
                        {errors.userName.message}
                      </span>
                    )}
                  </div>
                </div>
                <div className="col-md-12">
                  <div className="form-group">
                    <div className="checkbox">
                      <input
                        type="checkbox"
                        id="agree"
                        {...register("remember", {
                          required:
                            "Please agree to the Privacy Policy and Terms and Conditions before proceeding.",
                        })}
                      />
                      <label htmlFor="agree">
                        {t("Agree")} <Link to="/privacypolicy">{t("Policy")}</Link> {t("And")}
                        <Link to="/terms-condition">{t("TermsCondition")}</Link>
                      </label>
                    </div>
                    {errors.remember && (
                      <span role="alert" className="error_text">
                        {errors.remember.message}
                      </span>
                    )}
                  </div>
                </div>
                <div className="col-md-12">
                  <input
                    type="submit"
                    name="submit"
                    className="w-100 theme_btn"
                    value={t("SignUp")}
                  />
                </div>
                <div className="col-md-12">
                  <div className="needHelp">
                    <p>
                      <img className="img-fluid" src={helpcircle} alt="" />{" "}
                      {t("NeedHelp")}
                    </p>
                    <p>
                      {t("HaveAccount")}. <Link to="/">{t("Login")}</Link>
                    </p>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      <img src={login_banner_vector1} className="login_banner_vector1" alt="" />
      <img src={login_banner_vector2} className="login_banner_vector2" alt="" />
    </section>
  );
}

export default Register;
