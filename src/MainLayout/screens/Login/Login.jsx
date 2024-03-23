import React from "react";
import withLayout from "../..";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Contact from "../../Components/ContactUS/Contact";
import LoginCard from "../../../assets/login-Image.png";
import { Link } from "react-router-dom";

function Login() {
  return (
    <div>
      {" "}
      <div className="register-div">
        <div className="register-box contenr-1200">
          <div className="login-box-insider">
            <div className="volunteer-info">
              <div className="volunteer-text">
                <img src={LoginCard} alt="" />
              </div>

              <div className="login-form">
                <h2>Login Swarajya Portal</h2>
                <TextField
                  fullWidth
                  label="Name"
                  id="Name"
                  sx={{ marginTop: "30px" }}
                />

                <TextField
                  fullWidth
                  label="Location"
                  id="Location"
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
                  <Link to="/sign-in"> </Link>
                </p>
                <Button
                  variant="contained"
                  fullWidth
                  sx={{ marginBottom: "30px" }}
                >
                  Login
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Contact />;
    </div>
  );
}

export default withLayout(Login);
