import React, { useState, useRef } from "react";
import "./chatContainer.css";
import { useEffect } from "react";
import { getTeamData } from "../api/apiService";
import Chattting from "./Chattting";

function ChatContainer() {
  return (
    <>
      <div className="">
        <Chattting />
      </div>
    </>
  );
}

export default ChatContainer;
