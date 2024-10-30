import React, { useEffect, useState } from "react";
import "./pages.css";
import LayoutAdmin from "../../AdminLayout/Layout2/LayoutAdmin";
import { sendGreetings, sendNotice } from "../../api/apiService";
import { act } from "react-dom/test-utils";

function SendMai() {
  const [noticeForm, setnoticeForm] = useState("");
  const [message, setMessage] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [greetingImage, setgreetingImage] = useState("");

  const [activeItem, setActiveItem] = useState(null);

  const [loading, setLoading] = useState(false);

  const onChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setnoticeForm((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (
      file &&
      (file.type === "image/png" ||
        file.type === "image/jpg" ||
        file.type === "image/jpeg")
    ) {
      if (file.size > 10 * 1024 * 1024) {
        // 10MB limit
        console.log(
          " Image is too large. Please select an image smaller than 10MB."
        );
        return;
      }
      setSelectedFile(file);
      const reader = new FileReader();

      reader.readAsDataURL(file);

      reader.onload = () => {
        console.log("called: ", reader);
        setgreetingImage(reader.result);
      };
      setErrorMessage("");
    } else {
      setSelectedFile(null);
      setErrorMessage("Please select a valid image file (PNG, JPG, JPEG).");
    }
  };

  const handleMenuChange = async (menu) => {
    setActiveItem(menu);
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

  const handleSubmitGreetings = async () => {
    const link = noticeForm.image;
    const match = link.match(/<img[^>]+src="([^">]+)"/);
    const srcValue = match ? match[1] : null;

    if (srcValue) {
      console.log("src attribute value:", srcValue);
    } else {
      console.log("No src attribute found");
      setErrorMessage("Please select a valid image file (PNG, JPG, JPEG).");
      return;
    }
    setErrorMessage("");
    const data = {
      subject: noticeForm.subject,
      from: noticeForm.from,
      image: srcValue,
    };

    setLoading(true);
    await sendGreetings(data)
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

  useEffect(() => {
    setActiveItem("notice");
  }, []);

  const notice = () => {
    return (
      <div className="mail-item-forms">
        <h4>Send Notice</h4>
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
        <button className="sendNoticebtn" onClick={handleSubmit} type="submit">
          {loading ? "Sending Mail" : "Send"}
        </button>
      </div>
    );
  };
  const greetings = () => {
    return (
      <div className="mail-item-forms">
        <h4>Send Greetings</h4>

        {errorMessage && <p className="error-message">{errorMessage}</p>}
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
        <h3>
          <a
            href="https://imgbb.com/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Get Image Link
            <i class="fa-solid fa-up-right-from-square"></i>
          </a>
        </h3>
        <div>
          <label className="tomail">Image Link:</label>
          <input
            className="noticeMail"
            type="text"
            onChange={onChange}
            placeholder="Select Only Html Full Linked Link from Website"
            required
            name="image"
          />
        </div>
        <button
          className="sendNoticebtn"
          onClick={handleSubmitGreetings}
          type="submit"
        >
          {loading ? "Sending Mail" : "Send"}
        </button>
      </div>
    );
  };
  const reminders = () => {
    return (
      <div className="mail-item-forms">
        <h4>Send Reminders</h4>
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
        <button className="sendNoticebtn" onClick={handleSubmit} type="submit">
          {loading ? "Sending Mail" : "Send"}
        </button>
      </div>
    );
  };
  return (
    <div>
      <div className="sendMail">
        <div className="message-menu-grid">
          <div
            className={`${activeItem === "notice" ? "active" : ""} item`}
            onClick={() => handleMenuChange("notice")}
          >
            <h4>Notice</h4>
          </div>
          <div
            className={`${activeItem === "greetings" ? "active" : ""} item`}
            onClick={() => handleMenuChange("greetings")}
          >
            <h4>Greetings</h4>
          </div>
          <div
            className={`${activeItem === "reminder" ? "active" : ""} item`}
            onClick={() => handleMenuChange("reminder")}
          >
            <h4>Reminder</h4>
          </div>
        </div>

        <div class="sendnotice">
          {activeItem === "notice"
            ? notice()
            : activeItem === "greetings"
            ? greetings()
            : activeItem === "reminder"
            ? reminders()
            : notice()}
        </div>
      </div>
    </div>
  );
}

export default LayoutAdmin(SendMai, "mail");
// export default SendMai;
