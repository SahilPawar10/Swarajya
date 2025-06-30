import React from "react";
import "./donate.css";
import donateus from "../../assets/donateUS.jpg";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import smallLogo from "../../assets/marathi-logo-C3612F97FE-seeklogo.com.png";

function Donate() {
  return (
    <div id="donateUs">
      <div className="donate">
        <div className="donate-card">
          <div className="card-image">
            <img
              src={donateus}
              alt=""
              style={{ height: "100%", width: "100%" }}
            />
          </div>
          <div className="card-desc ">
            <div className="card-inner">
              <div className="logo-donate-card" style={{ marginLeft: "10px" }}>
                <img
                  src={smallLogo}
                  alt=""
                  style={{
                    width: "65px",
                    height: "65px",
                    borderRadius: "50%",
                  }}
                />
              </div>
              <div className="card-inner-text">
                <h2 style={{ color: "#004e7e", fontWeight: "600" }}>
                  You Can Make a Difference Right Now
                </h2>
                <p
                  style={{
                    margin: "10px",
                    textAlign: "left",
                    fontWeight: "500",
                  }}
                >
                  At{" "}
                  <b style={{ color: "#004e7e", fontSize: "20px" }}>
                    Swarajya ,
                  </b>
                  Our mission is to create a harmonious environment where people
                  can come together, celebrate their cultural heritage, and work
                  towards a better future.
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="donate-form">
          <div className="payment-form">
            <h2>Secure Donation</h2>

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
              label="Location"
              id="Location"
              sx={{ marginTop: "10px" }}
            />
            <TextField
              fullWidth
              label="Amount"
              id="Amount"
              defaultValue="250"
              sx={{
                marginTop: "30px",
                marginBottom: "10px",
              }}
            />
            <p
              style={{
                color: "#004e7e",
                fontWeight: "600",
                marginBottom: "8px",
              }}
            >
              Designated to the people who need
            </p>
            <Button
              variant="contained"
              fullWidth
              // sx={{ marginTop: "30px", fontSize: "20px" }}
            >
              DONATE
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Donate;
