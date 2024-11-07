import React from "react";
import "./index.scss";
import { Link } from "react-router-dom";
import defaultUserIcon from "../../../../assets/icons/org_user.png";
import defaultUserIcon1 from "../../../../assets/media/defaultUserIcon1.svg";
import { useSelector } from "react-redux";

function SuggestedBox() {
  const darkMode = useSelector((state) => state.headerMenu.darkMode);
  return (
    <>
      <div className="suggestedBox">
        <div className="title">
          <p style={{ color: darkMode ? "white" : "black " }}>
            Suggested for you
          </p>
          <Link>See All</Link>
        </div>
        <ul className="suggestedList">
          <li>
            <div>
              <img src={defaultUserIcon} alt="" />
            </div>
            <div className="info">
              <h3 style={{ color: darkMode ? "white" : "black " }}>
                MH.Jessile
              </h3>
              <span>Followed by uidesigner & +4 more</span>
            </div>
            <Link>Follow</Link>
          </li>
          <li>
            <div>
              <img src={defaultUserIcon1} alt="" />
            </div>
            <div className="info">
              <h3 style={{ color: darkMode ? "white" : "black " }}>
                Hassan Wali
              </h3>
              <span>Followed by jessi_44</span>
            </div>
            <Link>Follow</Link>
          </li>
          <li>
            <div>
              <img src={defaultUserIcon} alt="" />
            </div>
            <div className="info">
              <h3 style={{ color: darkMode ? "white" : "black " }}>
                MH.Jessile
              </h3>
              <span>Followed by uidesigner & +4 more</span>
            </div>
            <Link>Follow</Link>
          </li>
          <li>
            <div>
              <img src={defaultUserIcon1} alt="" />
            </div>
            <div className="info">
              <h3 style={{ color: darkMode ? "white" : "black " }}>
                Hassan Wali
              </h3>
              <span>Followed by jessi_44</span>
            </div>
            <Link>Follow</Link>
          </li>
          <li>
            <div>
              <img src={defaultUserIcon} alt="" />
            </div>
            <div className="info">
              <h3 style={{ color: darkMode ? "white" : "black " }}>
                MH.Jessile
              </h3>
              <span>Followed by uidesigner & +4 more</span>
            </div>
            <Link>Follow</Link>
          </li>
          <li>
            <div>
              <img src={defaultUserIcon1} alt="" />
            </div>
            <div className="info">
              <h3 style={{ color: darkMode ? "white" : "black " }}>
                Hassan Wali
              </h3>
              <span>Followed by jessi_44</span>
            </div>
            <Link>Follow</Link>
          </li>
          <li>
            <div>
              <img src={defaultUserIcon} alt="" />
            </div>
            <div className="info">
              <h3 style={{ color: darkMode ? "white" : "black " }}>
                MH.Jessile
              </h3>
              <span>Followed by uidesigner & +4 more</span>
            </div>
            <Link>Follow</Link>
          </li>
          <li>
            <div>
              <img src={defaultUserIcon1} alt="" />
            </div>
            <div className="info">
              <h3 style={{ color: darkMode ? "white" : "black " }}>
                Hassan Wali
              </h3>
              <span>Followed by jessi_44</span>
            </div>
            <Link>Follow</Link>
          </li>
          <li>
            <div>
              <img src={defaultUserIcon} alt="" />
            </div>
            <div className="info">
              <h3 style={{ color: darkMode ? "white" : "black " }}>
                MH.Jessile
              </h3>
              <span>Followed by uidesigner & +4 more</span>
            </div>
            <Link>Follow</Link>
          </li>
          <li>
            <div>
              <img src={defaultUserIcon1} alt="" />
            </div>
            <div className="info">
              <h3 style={{ color: darkMode ? "white" : "black " }}>
                Hassan Wali
              </h3>
              <span>Followed by jessi_44</span>
            </div>
            <Link>Follow</Link>
          </li>
          <li>
            <div>
              <img src={defaultUserIcon} alt="" />
            </div>
            <div className="info">
              <h3 style={{ color: darkMode ? "white" : "black " }}>
                MH.Jessile
              </h3>
              <span>Followed by uidesigner & +4 more</span>
            </div>
            <Link>Follow</Link>
          </li>
          <li>
            <div>
              <img src={defaultUserIcon1} alt="" />
            </div>
            <div className="info">
              <h3 style={{ color: darkMode ? "white" : "black " }}>
                Hassan Wali
              </h3>
              <span>Followed by jessi_44</span>
            </div>
            <Link>Follow</Link>
          </li>
        </ul>
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
    </>
  );
}

export default React.memo(SuggestedBox);
