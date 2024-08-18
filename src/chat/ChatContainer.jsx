import React, { useState } from "react";
import "./chatContainer.css";
import { useEffect } from "react";
import { getTeamData } from "../api/apiService";

const chats = [
  {
    name: "John Smith",
    message: "Testing",
    time: "08:21",
    unread: 5,
    imageUrl: "john_smith_image_url",
  },
  {
    name: "Jane Doe",
    message: "Hello there!",
    time: "12:15",
    unread: 2,
    imageUrl: "jane_doe_image_url",
  },
  {
    name: "Bob Johnson",
    message: "How are you?",
    time: "6:47",
    unread: 0,
    imageUrl: "bob_johnson_image_url",
  },
  {
    name: "John Smith",
    message: "Testing",
    time: "08:21",
    unread: 5,
    imageUrl: "john_smith_image_url",
  },
  {
    name: "Jane Doe",
    message: "Hello there!",
    time: "12:15",
    unread: 2,
    imageUrl: "jane_doe_image_url",
  },
  {
    name: "Bob Johnson",
    message: "How are you?",
    time: "6:47",
    unread: 0,
    imageUrl: "bob_johnson_image_url",
  },
  {
    name: "Samantha Lee",
    message: "See you tomorrow!",
    time: "09:35",
    unread: 0,
    imageUrl: "samantha_lee_image_url",
  },
  {
    name: "William Chen",
    message: "Thanks for your help!",
    time: "5:22",
    unread: 0,
    imageUrl: "william_chen_image_url",
  },
  {
    name: "Emily Kim",
    message: "Are you free tonight?",
    time: "4:10",
    unread: 0,
    imageUrl: "emily_kim_image_url",
  },
];

const messages = [
  { message: "Can you send me that file?", time: "08:58", sentByMe: false },
  { message: "sure.", time: "09:01", sentByMe: true },
  { message: "Yet another message here..", time: "09:05", sentByMe: false },
  { message: "What time should we meet?", time: "12:30", sentByMe: true },
  { message: "Can you send me that file?", time: "15:42", sentByMe: false },
  { message: "I'll be there in 10 minutes.", time: "10:12", sentByMe: true },
  {
    message: "Let's meet at the coffee shop.",
    time: "18:03",
    sentByMe: false,
  },
  { message: "Sorry, I can't make it today.", time: "13:25", sentByMe: true },
  {
    message: "No problem, we can reschedule.",
    time: "16:08",
    sentByMe: false,
  },
];

function ChatContainer() {
  const [team, setTeam] = useState([]);

  useEffect(() => {
    getTeamData()
      .then((res) => {
        setTeam(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <>
      <div className="whatsapp-container">
        <div className="chat-sidebar">
          <div className="chat-sidebar-header">
            <img src="user_image_url" alt="User" className="user-image" />
            <div className="icons">
              <i className="fa fa-circle-notch"></i>
              <i className="fa fa-comment-dots"></i>
              <i className="fa fa-ellipsis-v"></i>
            </div>
          </div>
          <div className="chat-list">
            {team.map((user, index) => (
              <div className="chat-item" key={index}>
                <img
                  src={user.picturePath ? user.picturePath : ""}
                  alt={user.firstName}
                  className="chat-image"
                />
                <div className="chat-details">
                  <div className="chat-name-time">
                    <span className="chat-name">
                      {user.firstName + " " + user.lastName}
                    </span>
                    {/* <span className="chat-time">{chat.time}</span> */}
                  </div>
                  <div className="chat-message">
                    {/* {chat.message}
                    {chat.unread > 0 && (
                      <span className="unread-count">{chat.unread}</span>
                    )} */}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="chat-window">
          <div className="chat-header">
            <img
              src="john_smith_image_url"
              alt="John Smith"
              className="chat-header-image"
            />
            <span className="chat-header-name">John Smith</span>
          </div>
          <div className="messages">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`message ${msg.sentByMe ? "sent" : "received"}`}
              >
                {msg.message}
                <span className="message-time">{msg.time}</span>
              </div>
            ))}
          </div>
          <div className="message-input">
            <input type="text" placeholder="Type a message here..." />
            <i className="fa fa-paper-plane"></i>
          </div>
        </div>
      </div>
    </>
  );
}

export default ChatContainer;
