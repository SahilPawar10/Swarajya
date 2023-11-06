import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./navbar.css";

function Navbar() {
  const [shownav, setShownav] = useState(false);

  const handleNav = () => {
    setShownav(!shownav);
  };
  return (
    <div>
      <nav>
        <div className="logo-heading">
          {/* <img src="" alt="" /> */}
          <h2>स्वराज्य</h2>
        </div>
        <div className="menu-icon" onClick={handleNav}>
          {shownav ? (
            <i class="fa fa-window-close" aria-hidden="true"></i>
          ) : (
            <i class="fa fa-bars" aria-hidden="true"></i>
          )}
        </div>
        <div className={`nav-elements ${shownav && "active"}`}>
          <div className="logoOnClose">
            <h2 style={{ color: "white" }}>स्वराज्य</h2>
            <div className="menuClose" onClick={handleNav}>
              <i class="fa fa-window-close" aria-hidden="true"></i>
            </div>
          </div>
          <ul className="menu">
            <li>
              <a href="#" className="active">
                Donate
              </a>
            </li>
            <li>
              <a href="#"> About Us</a>
              <ul className="submenu ">
                <li>
                  <a href="#"> Our Mission</a>
                </li>
                <li>
                  <a href="#">Where We Work</a>
                </li>
                <li>
                  <a href="#">Our Team</a>
                </li>
                <li>
                  <a href="#">Our Beliefs</a>
                </li>
              </ul>
            </li>
            <li>
              <a href="#">Our Work</a>
              <ul className="submenu">
                <li>
                  <a href="#">ShivJayanti</a>
                </li>
                <li>
                  <a href="#">Health</a>
                </li>
                <li>
                  <a href="#">Our Work</a>
                </li>
              </ul>
            </li>
            <li>
              <a href="#">Get Involved</a>
            </li>
            <li>
              <a href="#">Login</a>
            </li>
          </ul>
        </div>
      </nav>
    </div>
  );
}

export default Navbar;
