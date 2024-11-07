import React from "react";
import { useSelector } from "react-redux";
import { ToastContainer } from "react-toastify";

function PublicRoute({ children }) {
  const Lang = useSelector((state) => state.language.lang);
  return (
    <div className={`main ${Lang === "ar" ? "right" : ""}`}>
      {children}
      <ToastContainer
                position="top-right"
                autoClose={2000}
                hideProgressBar
                newestOnTop
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="dark"
              />
    </div>
  );
}

export default PublicRoute;
