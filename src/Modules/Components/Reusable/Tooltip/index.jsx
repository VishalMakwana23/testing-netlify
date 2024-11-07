import React from "react";
import "./index.scss";

function Tooltip({ comDl }) {
  return (
    <>
      <div className="tooltip_text" id="right">
        <div className="d-flex">
          <div className="left">Exhibitor Name :</div>
          <div className="right">{comDl?.exhibitorName}</div>
        </div>
        <div className="d-flex">
          <div className="left"> Email :</div>
          <div className="right">{comDl?.emailId}</div>
        </div>
        <div className="d-flex">
          <div className="left">Phone Number :</div>
          <div className="right">{comDl?.phoneNumber}</div>
        </div>
      </div>
    </>
  );
}

export default React.memo(Tooltip);
