import React, { useState } from "react";
import "./pages.css";
import LayoutAdmin from "../../AdminLayout/Layout2/LayoutAdmin";
import { sendNotice } from "../../api/apiService";

function SendMai() {
  const [noticeForm, setnoticeForm] = useState("");
  const [message, setMessage] = useState("");

  const [loading, setLoading] = useState(false);

  const onChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setnoticeForm((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    setLoading(true);
    await sendNotice(noticeForm)
      .then((res) => {
        console.log(res.data);
        setLoading(false);
        // setMessage(res.response.data.message);
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
      <div className="sendMail">
        <h1>Email Form</h1>
        <div class="sendnotice">
          <div class="mail-div">
            <label className="tomail">Your Name:</label>
            <input
              className="noticeMail"
              type="text"
              onChange={onChange}
              placeholder="Subject"
              required
              name="from"
            />
          </div>
          <div>
            <label className="tomail">Subject:</label>
            <input
              className="noticeMail"
              type="text"
              onChange={onChange}
              placeholder="Subject"
              required
              name="subject"
            />
          </div>
          <div>
            <label htmlFor="text" className="tomail">
              Message
            </label>

            <textarea
              className="noticeMailRadio"
              onChange={onChange}
              placeholder="Write your message here..."
              required
              name="message"
            />
          </div>
          <button
            className="sendNoticebtn"
            onClick={handleSubmit}
            type="submit"
          >
            {loading ? "Sending Mail" : "Send"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default LayoutAdmin(SendMai, "mail");
// export default SendMai;
