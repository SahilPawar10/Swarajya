import React, { useState } from "react";
import withLayout from "../..";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Contact from "../../Components/ContactUS/Contact";
import LoginCard from "../../../assets/login-Image.png";
import { Link, useNavigate } from "react-router-dom";
import { loginApi } from "../../../api/apiService";
import { Navigate } from "react-router-dom";

function Login() {
  const [credentials, setCredentials] = useState();

  const navigate = useNavigate();

  const [message, setMessage] = useState("");

  const [loading, setLoading] = useState(false);

  const onChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setCredentials((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    setLoading(true);
    await loginApi(credentials)
      .then((res) => {
        console.log(res.data);
        setLoading(false);
        localStorage.setItem("access_token", res.data.tokens.access.token);
        localStorage.setItem("refresh_token", res.data.tokens.refresh.token);
        localStorage.setItem("userId", res.data.user.id);
        navigate("/admin");
      })
      .catch((err) => {
        console.log(err.response);

        setMessage(err.response.data.message);
        setLoading(false);
      });
    console.log("Clicked", message);
  };

  return (
    <div>
      <div className="register-div">
        <div className="register-box contenr-1200">
          <div className="login-box-insider">
            <div className="volunteer-info">
              <div className="volunteer-text">
                <img src={LoginCard} alt="" />
              </div>

              <div className="login-form">
                <h2>Login Swarajya Portal</h2>
                <div
                  style={{
                    textAlign: "center",
                    color: "red",
                  }}
                >
                  {message}
                </div>
                <TextField
                  fullWidth
                  label="email"
                  id="email"
                  name="email"
                  onChange={onChange}
                  sx={{ marginTop: "30px" }}
                />

                <TextField
                  fullWidth
                  label="Password"
                  id="Password"
                  name="password"
                  onChange={onChange}
                  type="password"
                  sx={{ marginTop: "10px", marginBottom: "20px" }}
                />
                <p
                  style={{
                    color: "#004e7e",
                    fontWeight: "600",
                    marginBottom: "8px",
                  }}
                >
                  <Link to="/sign-in">Register here </Link>
                </p>
                <Button
                  variant="contained"
                  fullWidth
                  sx={{ marginBottom: "30px" }}
                  onClick={handleSubmit}
                >
                  {loading ? <i>Sending</i> : "Submit"}
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
