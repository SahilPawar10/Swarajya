import React, { useState } from "react";
import withLayout from "../..";
import "./register.css";
import donateus from "../../../assets/donateUS.jpg";
import Snackbar from "@mui/material/Snackbar";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";

import Contact from "../../Components/ContactUS/Contact";
import { Link } from "react-router-dom";
import { registerApi } from "../../../api/apiService";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

function Register() {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [register, setRegister] = useState();

  const [message, setMessage] = useState("");

  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    setLoading(true);
    await registerApi(register)
      .then((res) => {
        console.log(res.data);
        setLoading(false);
        handleOpen();
      })
      .catch((err) => {
        console.log(err.response);
        setMessage(err.response.data.message);
        setLoading(false);
      });
    console.log("Clicked", message);
  };

  const onChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setRegister((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

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
                  label="Name"
                  id="Name"
                  name="name"
                  sx={{ marginTop: "30px" }}
                  onChange={onChange}
                />

                <TextField
                  fullWidth
                  label="Email"
                  id="Email"
                  name="email"
                  sx={{ marginTop: "10px" }}
                  onChange={onChange}
                />
                <TextField
                  fullWidth
                  label="Mobile"
                  id="Mobile"
                  name="number"
                  sx={{ marginTop: "10px" }}
                  onChange={onChange}
                />
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
                  onClick={handleSubmit}
                >
                  {loading ? "Sending" : "Submit"}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Contact />

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Thank You for Registrationg ,
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            We have recieved your request for Joining Swarajya , The request is
            sent to admin for approval and you will recve the status via mail.{" "}
            <br /> Kindly check your mail for update <br />
            Thank You
          </Typography>
        </Box>
      </Modal>
    </div>
  );
}

export default withLayout(Register);
