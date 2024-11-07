import React, { Suspense, useState } from "react";
import "./index.scss";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { LoginUser } from "../../reducers/login";
import { PostCallApi } from "../../Action/Action";
import eye from "../../assets/icons/eye.svg";
import eyeOff from "../../assets/icons/eye-off.svg";
import login_banner from "../../assets/media/login_banner.svg";
import login_banner_vector1 from "../../assets/media/login_banner_vector1.jpg";
import login_banner_vector2 from "../../assets/media/login_banner_vector2.jpg";
import LoginHeader from "../../Shared/LoginHeader";
import { Backdrop, CircularProgress } from "@mui/material";
// import axios from "axios";
const renderLoader = () => <p></p>;

function Login() {
  const [passwordShown, setPasswordShown] = useState(false);
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();

  const { t } = useTranslation();
  let navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    setOpen(true);
    let success = "Login Successfully";
    let invalid = "Invalid credentials";
    let sendData = { ...data };
    let seData = {
      url: `/v1/user/login`,
      body: sendData,
      // headers: headers,
    };

    let res = await PostCallApi(seData);
    setOpen(false);
    if (res?.status === 200) {
      // debugger
      let newUserD = {
        ...res.data,
        usPs: sendData?.password,
        authenticate: true,
      };
      setTimeout(() => {
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
      }, 500);
      // axios.defaults.headers.common["Authorization"] = `bearer ${newUserD?.data?.token}`;
      dispatch(LoginUser(newUserD));
      navigate("/dashboard", { replace: true });
    } else {
      toast.error(invalid, {
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

  const togglePasswordVisiblity = () => {
    setPasswordShown(!passwordShown);
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
        <section className={`login_page`}>
          <LoginHeader />
          <div className="container">
            <div className="row">
              <div className="col-xl-6 col-lg-6 col-md-12 col-12">
                <div className="inner_box left">
                  <h1>
                    <span>{t("SignIn")}</span>
                  </h1>
                  <p>
                    {t("NoAccountExist")}{" "}
                    <Link to="/register">{t("Register")}</Link>
                  </p>
                  <img src={login_banner} alt="" />
                </div>
              </div>
              <div className="col-xl-6 col-lg-6 col-md-12 col-12">
                <div className="inner_box right">
                  <div className="heading">
                    <h1>{t("Login")}</h1>
                    <p>{t("EnterCredential")}</p>
                  </div>
                  <form
                    className="d-flex flex-column"
                    onSubmit={handleSubmit(onSubmit)}
                  >
                    <div className="form-group">
                      <label>{t("EmailOrPhone")}</label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="mail@gmail.com"
                        {...register("email", {
                          required: "This field is required",
                          pattern: {
                            value: /\S+@\S+\.\S+/,
                            message: "Please Enter Valid Email",
                          },
                        })}
                      />
                      {errors.email && (
                        <span role="alert" className="error_text">
                          {errors.email.message}
                        </span>
                      )}
                    </div>
                    <div className="form-group">
                      <div className="links">
                        <label>{t("Password")}</label>
                        <Link to="/forgot-passowrd">{t("ForgotPassword")}</Link>
                      </div>
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
                              message:
                                "Whitespace is not allowed in this field",
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
                    <input
                      type="submit"
                      name="submit"
                      className="theme_btn"
                      value={t("Login")}
                    />
                  </form>
                  <div className="footer">
                    <ul>
                      <li>About Main Diish</li>
                      <li>
                        <Link to="/terms-condition">Terms & Condition</Link>
                      </li>
                      <li>
                        <Link to="/privacypolicy">Privacy Policy</Link>
                      </li>
                    </ul>
                    <p>© 2023 Main Dish, All Right Reserved</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <img
            src={login_banner_vector1}
            className="login_banner_vector1"
            alt=""
          />
          <img
            src={login_banner_vector2}
            className="login_banner_vector2"
            alt=""
          />
        </section>
      </Suspense>
    </>
  );
}

export default Login;
