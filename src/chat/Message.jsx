import React, { useEffect, useState, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { getAllMessage, sendMessage } from "../api/apiService";

function Message({ currentchat, currentUser, socket }) {
  const [msg, setMsg] = useState("");
  const [messages, Setmessages] = useState([]);
  const [arrivalMessage, SetarrivalMessage] = useState(null);
  const scrollRef = useRef();
  const navigate = useNavigate();
  const location = useLocation();
  const [renderCount, setRenderCount] = useState(0);

  const goBackAndRerender = () => {
    navigate(-1); // Navigate back
    setRenderCount((prev) => prev + 1); // Trigger re-render
  };

  useEffect(() => {
    // Re-render when the location changes (indicating a "back" navigation)
    setRenderCount((prev) => prev + 1);
  }, [location.key]); // `location.key` updates on each route change
  useEffect(() => {
    getmessages();
  }, [currentchat]);

  async function getmessages() {
    if (currentchat) {
      const data = {
        from: currentUser.id,
        to: currentchat.id,
      };
      await getAllMessage(data)
        .then((res) => {
          console.log(res.data);
          Setmessages(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }
  const handlechangeMsg = async (msg) => {
    // console.log(currentUser, currentchat);
    const data = {
      from: currentUser.id,
      to: currentchat.id,
      message: msg,
    };
    await sendMessage(data)
      .then((res) => {
        // console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });

    socket.current.emit("send-msg", {
      to: currentchat.id,
      from: currentUser.id,
      message: msg,
    });

    const msgs = [...messages];
    msgs.push({ fromself: true, message: msg });
    Setmessages(msgs);
  };
  const sendChat = (event) => {
    event.preventDefault();
    if (msg.length > 0) {
      handlechangeMsg(msg);
      setMsg("");
    }
  };
  useEffect(() => {
    if (socket.current) {
      console.log("Socket connected and listener set up.");
      socket.current.on("msg-recieve", (msg) => {
        SetarrivalMessage({ fromself: false, message: msg });
      });
    }
  }, [socket]);

  useEffect(() => {
    arrivalMessage && Setmessages((prev) => [...prev, arrivalMessage]);
  }, [arrivalMessage]);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div>
      {currentchat && (
        <div className="chat-window">
          <div className="chat-header">
            <img
              src={currentchat.picturePath}
              alt={currentchat.firstName}
              className="chat-header-image"
            />
            <span className="chat-header-name">
              {currentchat.firstName + " " + currentchat.lastName}
            </span>
          </div>
          <div className="messages">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`message ${msg.fromself ? "sent" : "received"}`}
              >
                {msg.message}
                <span className="message-time">{msg.time}</span>
              </div>
            ))}
          </div>
          <div className="message-input">
            <i class="fa-solid fa-backward" onClick={goBackAndRerender}></i>
            <input
              type="text"
              placeholder="Type a message here..."
              onChange={(e) => setMsg(e.target.value)}
              value={msg}
            />
            <i
              className="fa fa-paper-plane"
              onClick={(event) => sendChat(event)}
            ></i>
          </div>
        </div>
      )}
    </div>
  );
}

export default Message;
