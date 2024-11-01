import React, { useEffect, useState, useRef } from "react";
import ChatList from "./ChatList";
import { getContacts, getTeamData } from "../api/apiService";
import { connect, io } from "socket.io-client";
import Welcomescreen from "./Welcomescreen";
import ChatContainer from "./ChatContainer";
import Message from "./Message";

const host = "https://swarajyabackend-arwh.onrender.com";

function Chattting() {
  const socket = useRef();
  const [contact, SetContact] = useState([]);
  const [currentuser, SetCurrentUser] = useState(undefined);
  const [currentchat, Setcurrentchat] = useState(undefined);
  const [Isloaded, SetIsLoaded] = useState(false);

  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });
  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener("resize", handleResize);

    // Cleanup event listener on component unmount
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (currentuser) {
      socket.current = io(host);

      socket.current.emit("add-user", currentuser.id);

      socket.current.on("connect_error", (err) => {
        console.error(`Connection error: ${err.message}`);
      });

      return () => {
        socket.current.disconnect();
      };
    }
  }, [currentuser]);

  useEffect(() => {
    if (!localStorage.getItem("swarajya-user")) {
      window.location.href = "/login";
    } else {
      SetCurrentUser(JSON.parse(localStorage.getItem("swarajya-user")));
      SetIsLoaded(true);
    }
  }, []);

  async function getcontact(id) {
    getContacts(id)
      .then((res) => {
        SetContact(res.data);
      })
      .catch((err) => console.log(err));
  }
  useEffect(() => {
    if (currentuser) getcontact(currentuser.id);
  }, [currentuser]);

  const handlechatchage = (chat) => {
    Setcurrentchat(chat);
  };
  return (
    <div id="ChattingMain">
      <div className="whatsapp-container">
        {windowSize.width <= 390 && currentchat ? (
          <></>
        ) : (
          <div className="chat-sidebar-menu">
            <div className="chat-sidebar">
              <ChatList
                contacts={contact}
                currentuser={currentuser}
                changeChat={handlechatchage}
              />
            </div>

            <div className="chat-footer">
              <img
                src={currentuser?.picturePath ? currentuser.picturePath : ""}
                alt={currentuser?.firstName}
                className="chat-image"
              />
              <div className="chat-details">
                <div className="chat-name-time">
                  <span className="chat-name">
                    {currentuser?.firstName + " " + currentuser?.lastName}
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="message-container">
          {Isloaded && currentchat === undefined ? (
            <Welcomescreen currentuser={currentuser} />
          ) : (
            <Message
              currentchat={currentchat}
              currentUser={currentuser}
              socket={socket}
            />
          )}
        </div>
        <div className="message-container-mob">
          <Message
            currentchat={currentchat}
            currentUser={currentuser}
            socket={socket}
          />
        </div>
      </div>
    </div>
  );
}

export default Chattting;
