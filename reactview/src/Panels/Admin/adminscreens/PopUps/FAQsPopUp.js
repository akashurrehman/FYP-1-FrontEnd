import React, { useState } from "react";
import "../../adminscreen.css";

function FAQsPopUp(props) {
  const [input1Value, setInput1Value] = useState(props.title);
  const [input2Value, setInput2Value] = useState(props.details);
  const [id, setId] = useState(props.id);

  const handleOkClick = () => {
    props.onOkClick(input1Value, input2Value, id);
    console.log(id);
    setInput1Value("");
    setInput2Value("");
  };

  return (
    <div className="popup-container">
      <div className="popup-overlay" onClick={props.onCancelClick}></div>
      <div className="popup">
        <h4>Edit Details:</h4>
        <p>Enter New Title:</p>
        <input
          type="text"
          placeholder="Enter text here"
          value={input1Value}
          onChange={(e) => setInput1Value(e.target.value)}
        />
        <p>Enter New Details:</p>
        <input
          type="text"
          placeholder="Enter text here"
          value={input2Value}
          onChange={(e) => setInput2Value(e.target.value)}
        />
        <div className="buttons">
          <button className="btn btn-danger" onClick={props.onCancelClick}>
            Cancel
          </button>
          <button className="btn btn-primary" onClick={handleOkClick}>
            OK
          </button>
        </div>
      </div>
    </div>
  );
}

export default FAQsPopUp;
