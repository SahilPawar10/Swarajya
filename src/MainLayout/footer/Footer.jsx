import React from "react";
import "./footer.css";
import logo from "../../assets/marathi-logo-C3612F97FE-seeklogo.com.png";
import KeyboardDoubleArrowDownIcon from "@mui/icons-material/KeyboardDoubleArrowDown";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { Link } from "react-router-dom";
const linkStyle = { display: "flex", textAlign: "center", gap: "0.01rem" };
function Footer() {
  return (
    <div id="footer">
      <div className="footer-elements">
        <div className="logo-footer">
          <img src={logo} alt="" />
          {/* <button>DonateUs</button> */}
          <div className="footer-btn">
            <span className="text">DonateUs</span>
            <span className="footer-icon">
              <i class="fa fa-heart" aria-hidden="true"></i>
            </span>
          </div>
        </div>
        <div className="footer-menus">
          <div className="footer-nav">
            <ul>
              <li className="footer-active">
                <h4>About Us</h4>
              </li>
              {/* /founding */}
              <Link to="/founding">
                <li style={linkStyle}>
                  <KeyboardDoubleArrowDownIcon />
                  Our Founding Story
                </li>
              </Link>
              <Link to="/about">
                <li style={linkStyle}>
                  <KeyboardDoubleArrowDownIcon />
                  About Us
                </li>
              </Link>

              <Link to="/team">
                <li style={linkStyle}>
                  <KeyboardDoubleArrowDownIcon />
                  Our Team
                </li>
              </Link>
            </ul>
          </div>
          <div className="footer-nav">
            <ul>
              <li className="footer-active">
                <h4>Media</h4>
              </li>
              <li style={linkStyle}>
                <KeyboardDoubleArrowDownIcon />
                Image Gallery
              </li>
              <li style={linkStyle}>
                <KeyboardDoubleArrowDownIcon />
                Vidio Gallery
              </li>
              <Link to="/work">
                <li style={linkStyle}>
                  <KeyboardDoubleArrowDownIcon />
                  Our Work
                </li>
              </Link>
            </ul>
          </div>
          <div className="footer-nav">
            <ul>
              <li className="footer-active">
                <h4>Contact Us</h4>
              </li>
              <div className="social-icons">
                <i class="fa-brands fa-whatsapp"></i>
                <i class="fa-brands fa-linkedin-in"></i>
                <i class="fa-brands fa-youtube"></i>
                <i class="fa-brands fa-instagram"></i>
              </div>
              <h5>Operating Address</h5>
              <div className="address">
                At post Ambrag, Patan 415206, <br /> Satara ,Maharashtra (INDIA)
              </div>
            </ul>
          </div>
        </div>
      </div>
      <div className="footer-tabs">
        <s>Careers</s>
        <span></span>
        <s>Privacy Policy</s>
        <span></span> <s> Terms and Conditions</s>
        <span></span> <s>FAQs Tenders</s> <span></span> <s> Refund Policy </s>
        <span></span>
        <s> Contact Us</s>
      </div>
      <div className="copyright">
        Copyright © 2023 Swarajya Foundation. All Rights Reserved
      </div>
    </div>
  );
}

export default Footer;
