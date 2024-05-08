import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./navbar.css";
import logo from "../../assets/marathi-logo-C3612F97FE-seeklogo.com.png";
import mobileLogo from "../../assets/logo1-removebg-preview.png";

function Navbar() {
  const [shownav, setShownav] = useState(false);
  const [nav, setnav] = useState(false);

  const handleNav = () => {
    setShownav(!shownav);
  };
  const changebackground = () => {
    if (window.scrollY >= 50) {
      setnav(true);
    } else {
      setnav(false);
    }
  };

  window.addEventListener("scroll", changebackground);

  return (
    <div>
      <nav className={nav ? "nav-active" : "nav"}>
        <div className="logo-heading">
          <Link to="/">
            <img src={logo} alt="" />
          </Link>

          {/* <h2>स्वराज्य</h2> */}
        </div>
        <div className="menu-icon box-shadow" onClick={handleNav}>
          {shownav ? (
            <i class="fa fa-window-close" aria-hidden="true"></i>
          ) : (
            <i class="fa fa-bars" aria-hidden="true"></i>
          )}
        </div>
        <div className={`nav-elements ${shownav && "active"}`}>
          <div className="logoOnClose">
            {/* <h2 style={{ color: "white" }}>स्वराज्य</h2> */}
            <img
              src={mobileLogo}
              style={{ width: "90px", height: "90px" }}
              className="mobile-logo"
              alt=""
            />
            <div className="menuClose" onClick={handleNav}>
              <i class="fa fa-window-close" aria-hidden="true"></i>
            </div>
          </div>
          <ul className={nav ? "scroll-menu" : "menu"}>
            <li>
              <a href="#" className="active">
                Donate
              </a>
            </li>
            <li>
              <a href="#"> About Us</a>
              <ul className="submenu ">
                <li>
                  {/* <a href="#"> Our Mission</a> */}
                  <Link to="/mission">Our Mission</Link>
                </li>
                {/* /about */}
                <li>
                  <Link to="/about">About Us</Link>
                </li>
                <li>
                  <Link to="/team">Our Team</Link>
                </li>
                <li>
                  <Link to="/belief">Our Belief</Link>
                </li>
              </ul>
            </li>
            <li>
              <a href="#">Our Work</a>
              <ul className="submenu">
                <li>
                  <Link to="/jayanti">ShivJayanti</Link>
                </li>
                {/* <li>
                  <Link to="/health">Health</Link>
                </li> */}
                <li>
                  <Link to="/work">Our Work</Link>
                </li>
              </ul>
            </li>
            <li>
              <Link to="/involve">Get Involved</Link>
            </li>
            <li>
              <Link to="/sign-in">SignIn</Link>
            </li>
          </ul>
        </div>
      </nav>
    </div>
  );
}

export default Navbar;
