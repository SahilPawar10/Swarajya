import React, { useEffect, useState } from "react";
import "./rePassword.css";
import { useParams } from "react-router-dom";
import { resetPass } from "../../../api/apiService";

function Reset_Password() {
  let { token } = useParams();

  const [password, setPassword] = useState("");

  const [confirmPass, setConfirmPass] = useState(false);

  const [correctPassword, setCorrectPassword] = useState(true);

  useEffect(() => {
    console.log(token);
  }, []);

  const onChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setPassword((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const confirmOn = (e) => {
    setConfirmPass(e.target.value);
  };

  const handleSubmit = () => {
    if (password.password !== confirmPass) {
      setCorrectPassword(false);
      return;
    } else {
      setCorrectPassword(true);
      resetPass(password, token)
        .then((res) => {
          console.log(res);
          alert("Password Updated successfully ..!");
        })
        .catch((err) => console.log(err));
    }
  };
  return (
    <div id="Reset">
      <div>
        {/* <h4 className="page-heading">Forgot Password</h4> */}
        <div className="forgot-password-inner">
          <div className="forgot-insider">
            <h4>Change Your Password</h4>
            <div>
              <span>Enter Password</span>
              <input
                type="password"
                placeholder="enter new password"
                name="password"
                onChange={onChange}
              />
            </div>
            <div>
              <span>Confirm Password</span>
              <input
                type="password"
                placeholder="confirm your password"
                onChange={confirmOn}
                className={correctPassword ? "c-password" : "wrong-password"}
              />
              {correctPassword ? (
                ""
              ) : (
                <p style={{ color: "red" }}> Password not Matched</p>
              )}
            </div>
            <div>
              <button onClick={handleSubmit}>
                <s>Submit</s>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Reset_Password;
