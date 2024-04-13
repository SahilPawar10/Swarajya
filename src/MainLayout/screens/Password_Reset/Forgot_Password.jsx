import React, { useState } from "react";
import "./rePassword.css";
import { forgotPass } from "../../../api/apiService";

function Forgot_Password() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const onChange = (e) => {
    // const name = e.target.value;
    const value = e.target.value;

    setEmail(value);
  };

  const handleSubmit = async () => {
    setLoading(true);
    const data = {
      email: email,
    };
    await forgotPass(data)
      .then((res) => {
        console.log(res);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  };

  return (
    <div id="Forgot">
      <div className="password-outer">
        {/* <h4 className="page-heading">Forgot Password</h4> */}
        <div className="forgot-password-inner">
          <div className="forgot-insider">
            <h4>Reset Your Password</h4>
            <p>
              Please Enter the email address you'd like your password reset
              information sent to
            </p>
            <div>
              <span>Enter Your email</span>
              <input
                type="email"
                placeholder="enter your email"
                onChange={onChange}
              />
            </div>
            <div>
              <button onClick={handleSubmit}>
                {loading ? <s>Sending</s> : <s>Request Reset Link</s>}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Forgot_Password;
