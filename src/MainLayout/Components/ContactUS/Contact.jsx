import React from "react";
import "./contact.css";
import { Link } from "react-router-dom";

function Contact() {
  return (
    <div className="contact-us">
      <div className="contact-container">
        <h2>Connect with Us</h2>
        <div className="connect-us">
          <div className="form-with-info">
            <div className="form">
              <div className="input">
                <input type="text" placeholder="Name" />
              </div>
              <div className="input">
                <input type="text" placeholder="Mobile" />
              </div>
              <div className="input">
                <input type="text" placeholder="Email" />
              </div>
              <div className="input">
                <select id="cars" name="cars">
                  <option value="volvo">Query Releted To</option>
                  <option value="saab">Donation</option>
                  <option value="audi">Join a Campaign</option>
                  <option value="fiat">Others</option>
                </select>
              </div>
              <div className="input">
                <input type="text" placeholder="Message" />
              </div>
              <div className="input">
                <button type="button">Submit</button>
              </div>
            </div>
          </div>
          <div className="contact-info">
            <div className="social-icons">
              <i class="fa-brands fa-whatsapp"></i>
              <i class="fa-brands fa-linkedin-in"></i>
              <i class="fa-brands fa-youtube"></i>
              <i class="fa-brands fa-instagram"></i>
            </div>
            <h5>Operating Address</h5>
            <div className="address">
              At post Ambrag, Patan 415206, Satara ,Maharashtra (INDIA)
            </div>
            <div className="contact-footer">
              <p className="contact-number">
                <span>
                  <i class="fa-solid fa-phone"></i>
                </span>
                011 - 69200000
              </p>
              <p className="contact-support">
                Support us through your Contribution
              </p>
              <Link className="contact-donate-btn">
                <span className="text">DonateUs</span>
                <span className="">
                  <i class="fa fa-heart icon-heart" aria-hidden="true"></i>
                </span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Contact;
