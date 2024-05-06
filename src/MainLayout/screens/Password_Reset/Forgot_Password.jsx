import React, { useEffect, useState } from "react";
import "./rePassword.css";
import { forgotPass } from "../../../api/apiService";
import { Link } from "react-router-dom";

import slider2 from "../../../assets/Banner-6.jpg";
import slider3 from "../../../assets/WhatsApp Image 2023-11-11 at 11.12.22 PM.jpeg";
import slider4 from "../../../assets/Banner-7.jpg";

function Forgot_Password() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const onChange = (e) => {
    // const name = e.target.value;
    const value = e.target.value;

    setEmail(value);
  };

  let counter = 1;

  useEffect(() => {
    const intervalId = setInterval(() => {
      document.getElementById("radio" + counter).checked = true;
      counter++;
      if (counter > 3) {
        counter = 1;
      }
    }, 5000);

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  const handleSubmit = async () => {
    setLoading(true);
    const data = {
      email: email,
    };
    await forgotPass(data)
      .then((res) => {
        console.log(res);
        setLoading(false);
        alert("Please Check your email");
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  };

  return (
    // <div id="Forgot">
    //   <div className="password-outer">
    //     {/* <h4 className="page-heading">Forgot Password</h4> */}
    //     <div className="forgot-password-inner">
    //       <div className="forgot-insider">
    //         <h4>Reset Your Password</h4>
    //         <p>
    //           Please Enter the email address you'd like your password reset
    //           information sent to
    //         </p>
    //         <div>
    //           <span>Enter Your email</span>
    //           <input
    //             type="email"
    //             placeholder="enter your email"
    //             onChange={onChange}
    //           />
    //         </div>
    //         <div>
    //           <button onClick={handleSubmit}>
    //             {loading ? <s>Sending</s> : <s>Request Reset Link</s>}
    //           </button>
    //         </div>
    //       </div>
    //     </div>
    //   </div>
    // </div>
    <>
      <section className="home-carosoul">
        <div className="home-slider">
          <div className="slide">
            <input type="radio" name="radio-btn" id="radio1" />
            <input type="radio" name="radio-btn" id="radio2" />
            <input type="radio" name="radio-btn" id="radio3" />

            <div className="homeSlide first">
              <div className="st-text ">
                <h1>
                  Harmony for Humanity: Nurturing Well-being through Social
                  Engagement
                </h1>
              </div>
              <div className="st-btn">
                <Link
                  to="donateUs"
                  smooth={true}
                  duration={500}
                  offset={-80}
                  className="btn-donateUs"
                >
                  <span className="text">DonateUs</span>
                  <span className="icon">
                    <i class="fa fa-heart icon-heart" aria-hidden="true"></i>
                  </span>
                </Link>
              </div>
              <img src={slider4} alt="" />
            </div>
            <div className="homeSlide">
              <div className="st-text">
                <h1>
                  Empowering Communities Through Joy and Social Initiatives .
                </h1>
              </div>
              <div className="st-btn">
                <Link
                  to="donateUs"
                  smooth={true}
                  duration={500}
                  offset={-80}
                  className="btn-donateUs"
                >
                  <span className="text">DonateUs</span>
                  <span className="icon">
                    <i class="fa fa-heart icon-heart" aria-hidden="true"></i>
                  </span>
                </Link>
              </div>
              <img src={slider2} alt="" />
            </div>
            <div className="homeSlide">
              <div className="st-text">
                <h1>
                  United for the Swarajya : From Our People , <br /> For Our
                  People
                </h1>
              </div>
              <div className="st-btn">
                <Link
                  to="donateUs"
                  smooth={true}
                  duration={500}
                  offset={-80}
                  className="btn-donateUs"
                >
                  <span className="text">DonateUs</span>
                  <span className="icon">
                    <i class="fa fa-heart icon-heart" aria-hidden="true"></i>
                  </span>
                </Link>
              </div>
              <img src={slider3} alt="" />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Forgot_Password;
