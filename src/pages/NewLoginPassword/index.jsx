import React, { useState } from "react";
import "./index.scss";
import { useForm } from "react-hook-form";
import eye from "../../assets/icons/eye.svg";
import eyeOff from "../../assets/icons/eye-off.svg";
import "react-phone-number-input/style.css";
import { PostCallApi } from "../../Action/Action";
import { useNavigate } from "react-router-dom";
import LoginHeader from "../../Shared/LoginHeader";
import { toast } from "react-toastify";

function NewLoginPassword() {
  const [passwordShown, setPasswordShown] = useState(false);
  const [passwordShown1, setPasswordShown1] = useState(false);

  const storedMail = localStorage.getItem("storedMail");
  const storeOtp = localStorage.getItem("storeOtp");
  let navigate = useNavigate();
  const {
    register,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const togglePasswordVisiblity = () => {
    setPasswordShown(!passwordShown);
  };
  const togglePasswordVisiblity1 = () => {
    setPasswordShown1(!passwordShown1);
  };
  const onSubmit = async (data) => {
    let success = "Reset Password Successfully";
    let sendData = {
      ...data,
      emailornumbertype: "email",
      emailornumbervalue: storedMail,
      confirmationcode: storeOtp,
    };
    let seData = {
      url: `/v1/forget-password-step3`,
      body: sendData,
    };

    let res = await PostCallApi(seData);
    if (res?.status === 200) {
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
      navigate("/", { replace: true });
    } else {
      console.log(res);
    }
  };

  return (
    <section className={`newLoginPass_page`}>
      <LoginHeader />
      <div className="container">
        <div className="row">
          <div className="col-xl-5 col-lg-6 col-md-8 col-12 m-auto">
            <div className="inner_box card">
              <div className="heading">
                <h1>New login and password</h1>
                <p>
                  Enter your email and we will send you the letter with the
                  instruction of password changing
                </p>
              </div>
              <form
                className="d-flex flex-column"
                onSubmit={handleSubmit(onSubmit)}
              >
                <div className="form-group">
                  <label>New Password</label>
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
                <div className="form-group">
                  <label>Repeat Password</label>
                  <div className="password">
                    <input
                      name="current-password"
                      className="form-control"
                      placeholder="******"
                      type={passwordShown1 ? "text" : "password"}
                      {...register("confirmpassword", {
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
                    <span className="eye" onClick={togglePasswordVisiblity1}>
                      <img
                        src={passwordShown1 === true ? eye : eyeOff}
                        alt="eye"
                      />
                    </span>
                  </div>
                  {errors.confirmpassword && (
                    <span role="alert" className="error_text">
                      {errors.confirmpassword.message}
                    </span>
                  )}
                </div>
                <input
                  type="submit"
                  name="submit"
                  className="theme_btn"
                  value="Save"
                />
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default NewLoginPassword;
