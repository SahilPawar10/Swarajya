import React,{useEffect} from "react";
import "./contacts.css";
import LayoutAdmin from "../AdminLayout/Layout2/LayoutAdmin";
import ChatContainer from "./ChatContainer";
import { getTeamData } from "../api/apiService";
const MyContacts = () => {



  const chats = [
    {
      name: "Swati - THN",
      message: "typing...",
      time: "02:01",
      imageUrl: "swati_image_url",
    },
    {
      name: "Chintu Voda",
      message: "In box top n center",
      time: "Yesterday",
      imageUrl: "chintu_image_url",
    },
    {
      name: "Pinder whatzap",
      message: "K",
      time: "Yesterday",
      imageUrl: "pinder_image_url",
    },
    {
      name: "Priyanshu pune",
      message: "मैंने ओमोज़ोली चाचा से पूछ...",
      time: "Yesterday",
      imageUrl: "priyanshu_image_url",
    },
    {
      name: "Harash-mumbai",
      message: "Aram se",
      time: "Monday",
      imageUrl: "harash_image_url",
    },
    { name: "Jiten", message: "", time: "Monday", imageUrl: "jiten_image_url" },
    {
      name: "Akki",
      message: "✅ आज का सदस्य",
      time: "Friday",
      imageUrl: "akki_image_url",
    },
  ];

  return <ChatContainer />;
};

export default LayoutAdmin(MyContacts, "chat");
