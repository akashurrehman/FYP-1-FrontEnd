import React from "react";
import "./Conversation.css";

export default function Conversation() {
  return (
    <div className="conversation">
      <img
        className="conversationImg"
        src={require("../../../../pictures/blue.jpg")}        alt="Not Found"
      />
      <span className="conversationName">Salman Ahmed</span>
    </div>
  );
}
