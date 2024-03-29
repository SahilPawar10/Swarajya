import React from "react";
import withLayout from "../..";
import "./register.css";
import donateus from "../../../assets/donateUS.jpg";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import smallLogo from "../../../assets/marathi-logo-C3612F97FE-seeklogo.com.png";
import Contact from "../../Components/ContactUS/Contact";
import { Link } from "react-router-dom";
function Register() {
  return (
    <div>
      <div className="register-div">
        <div className="register-box contenr-1200">
          <div className="mobile-register">
            <h2 className="">#Make a Lasting Impact</h2>
          </div>

          <div className="register-box-insider">
            <div className="volunteer-info">
              <div className="volunteer-text">
                <h2>#Make a Lasting Impact</h2>
                <p>
                  Don't miss the opportunity to make a profound difference in
                  the lives of children from disadvantaged communities in India.
                  Become a volunteer with Miracle Foundation India today and be
                  the miracle that transforms their futures.
                </p>
                <div style={{ textAlign: "center", marginTop: "2%" }}>
                  <span>Know more</span>
                </div>
                <div className="register-footer">
                  <div className="social-icons">
                    <i class="fa-brands fa-whatsapp"></i>
                    <i class="fa-brands fa-linkedin-in"></i>
                    {/* <i class="fa-brands fa-youtube"></i> */}
                    <i class="fa-brands fa-instagram"></i>
                  </div>
                </div>
              </div>

              <div className="register-form">
                <h2 style={{ textAlign: "center" }}>#Join Swarajya</h2>
                <TextField
                  fullWidth
                  label="Name"
                  id="Name"
                  sx={{ marginTop: "30px" }}
                />
                <TextField
                  fullWidth
                  label="Mobile"
                  id="Mobile"
                  sx={{ marginTop: "10px" }}
                />
                <TextField
                  fullWidth
                  label="Email"
                  id="Email"
                  sx={{ marginTop: "10px", marginBottom: "20px" }}
                />
                {/* <TextField
                fullWidth
                label="Amount"
                id="Amount"
                defaultValue="250"
                sx={{
                  marginTop: "30px",
                  marginBottom: "10px",
                }}
              /> */}
                <p
                  style={{
                    color: "#004e7e",
                    fontWeight: "600",
                    marginBottom: "8px",
                  }}
                >
                  <Link to="/login">Already a user ..?</Link>
                </p>
                <Button
                  variant="contained"
                  fullWidth
                  sx={{ marginBottom: "30px", fontSize: "20px" }}
                >
                  Submit
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Contact />
    </div>
  );
}

export default withLayout(Register);
