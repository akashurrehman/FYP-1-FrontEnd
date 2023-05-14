import React from "react";
import "./Message.css";

export default function Message({own}) {
  return (
    <div className={own ? "message own" : "message"}>
      <div className="messageTop">
        <img
          className="messageImg"
          src={require("../../../../pictures/blue.jpg")}
          alt="not Found"
        />
        <p className="messageText">
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Optio
          exercitationem ea expedita itaque vero natus quasi nostrum
          perferendis, incidunt temporibus delectus molestiae mollitia minus
          nihil officiis cupiditate error doloremque suscipit.
        </p>
      </div>
      <div className="messageBottom"> 1 Hour Ago</div>
    </div>
  );
}
