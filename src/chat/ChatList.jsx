import React, { useEffect, useState, useRef } from "react";

function ChatList({ contacts, changeChat }) {
  const [currentUserName, setCurrentUserName] = useState(undefined);
  const [currentUserImage, setCurrentUserImage] = useState(undefined);
  const [currentSelected, setCurrentSelected] = useState(undefined);

  async function fetchData() {
    const data = await JSON.parse(localStorage.getItem("swarajya-user"));
    console.log(data);
    setCurrentUserName(data.firstName + " " + data.lastName);
    setCurrentUserImage(data.picturePath);
  }
  useEffect(() => {
    fetchData();
  }, []);

  const changeCurrentChat = (index, contact) => {
    console.log(index, contact, "change");
    setCurrentSelected(index);
    changeChat(contact);
  };

  return (
    // <div>
    <>
      <div className="chat-list">
        {contacts.length > 0 ? (
          contacts.map((user, index) => (
            <div
              className={
                `contact ${index === currentSelected ? "selected" : ""}` +
                " " +
                " chat-item"
              }
              key={user.id}
              onClick={() => changeCurrentChat(index, user)}
            >
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
          ))
        ) : (
          <div class="chat-contact-list">
            {/* <!-- Repeat the contact placeholder block for each loading item --> */}
            <div class="chat-contact">
              <div class="placeholder-image"></div>
              <div class="placeholder-name"></div>
            </div>
            <div class="chat-contact">
              <div class="placeholder-image"></div>
              <div class="placeholder-name"></div>
            </div>
            <div class="chat-contact">
              <div class="placeholder-image"></div>
              <div class="placeholder-name"></div>
            </div>
            <div class="chat-contact">
              <div class="placeholder-image"></div>
              <div class="placeholder-name"></div>
            </div>
            <div class="chat-contact">
              <div class="placeholder-image"></div>
              <div class="placeholder-name"></div>
            </div>
            <div class="chat-contact">
              <div class="placeholder-image"></div>
              <div class="placeholder-name"></div>
            </div>
            <div class="chat-contact">
              <div class="placeholder-image"></div>
              <div class="placeholder-name"></div>
            </div>
            <div class="chat-contact">
              <div class="placeholder-image"></div>
              <div class="placeholder-name"></div>
            </div>
            <div class="chat-contact">
              <div class="placeholder-image"></div>
              <div class="placeholder-name"></div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default ChatList;
