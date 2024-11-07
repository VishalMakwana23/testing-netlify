import React from "react";
import "./index.scss";
import logo from "../../assets/media/mainLogo.svg";
import ChangeLanguage from "../../locales/ChangeLang";

function LoginHeader() {
  return (
    <div className="container top">
      <div className="col-md-12">
        <div className="loginTopbar">
          <img src={logo} className="img-fluid" alt="" />
          <div className="lenguageSelect">
            <ChangeLanguage />
          </div>
        </div>
      </div>
    </div>
  );
}

export default React.memo(LoginHeader);
