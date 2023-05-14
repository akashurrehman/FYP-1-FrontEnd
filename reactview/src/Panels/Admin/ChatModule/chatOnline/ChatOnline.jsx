import React from "react";
import "./ChatOnline.css";

export default function ChatOnline() {
  return (
    <div className="chatOnline">
      <div className="chatOnlineFriend">
        <div className="chatOnlineImgContainer">
          <img
            className="chatOnlineImg"
            src={require("../../../../pictures/blue.jpg")}
            alt="Not Found"
          />
          <div className="chatOnlineBadge"></div>
        </div>
        <span className="chatOnlineName">Salman Ahmed</span>
      </div>
    </div>
  );
}
