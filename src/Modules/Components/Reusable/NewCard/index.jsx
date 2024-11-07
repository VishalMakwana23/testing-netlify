import React, { Suspense } from "react";
import "./index.scss";
import conference_card_image from "../../../../assets/icons/conference_card_image.png";
import location from "../../../../assets/icons/carbon_location.svg";
import complated from "../../../../assets/icons/complatedTag.svg";
import pending from "../../../../assets/icons/pendingTag.svg";
import {Config} from "../../../../Utils/Config";
import { Link } from "react-router-dom";

const renderLoader = () => <p></p>;
function NewCard(prop) {
  const { conferenceList } = prop;
  return (
    <Suspense fallback={renderLoader()}>
      {conferenceList?.length > 0 ? (
        conferenceList?.map((item, i) => (
          <div className="col-xl-3 col-lg-4 col-md-6 col-12 mb-3" key={i}>
            <div className="conference_card">
              <img
                src={
                  item.coverImage
                    ? `${Config.API_HOST_URL_live}${item.coverImage}`
                    : conference_card_image
                }
                alt=""
                className="conference_card_image"
              />
              <img
                src={item.status === "Completed" ? complated : pending}
                alt={item.status}
                className="tag"
              />
              <div className="conference_content">
                <h3>{item.conferenceName}</h3>
                <div className="location">
                  <span>
                    <img src={location} className="me-2" alt="" />
                    {item.eventAddress}
                  </span>
                  <span>{item.eventStartDate}</span>
                </div>
                <p>{item.description}</p>
                <h6>Attendee Fees : {item.attendeeFee}</h6>
                <h6>Exhibitors Fees : {item.exhibitorFee}</h6>
              </div>
              <Link
                to={
                  prop?.linkPath && item.status === "Completed"
                    ? prop?.linkPath + `/${item?.conferenceId}`
                    : ""
                }
                className="theme_btn text-center"
              >
                {item.status === "Completed"
                  ? "View Floor Plan"
                  : "Complete Registration"}
              </Link>
            </div>
          </div>
        ))
      ) : (
        <div className="er_nodata">No Data Found</div>
      )}
    </Suspense>
  );
}

export default NewCard;
