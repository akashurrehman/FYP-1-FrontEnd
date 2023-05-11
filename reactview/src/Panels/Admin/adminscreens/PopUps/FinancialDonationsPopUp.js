import React, { useState } from "react";
import "../../adminscreen.css";

function FinancialDonationsPopUp(props) {
  const [input1Value, setInput1Value] = useState(props.title);
  const [input2Value, setInput2Value] = useState(props.contact);
  const [dateVal, setDateVal] = useState(props.date);
  const [amountVal, setAmountVal] = useState(props.amount);
  const [messageVal, setMessageVal] = useState(props.message);
  const [id, setId] = useState(props.id);

  const handleOkClick = () => {
    props.onOkClick(
      input1Value,
      input2Value,
      id,
      dateVal,
      amountVal,
      messageVal
    );
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
        <p>Enter New Contact No:</p>
        <input
          type="tel"
          placeholder="Contact"
          value={input2Value}
          onChange={(e) => setInput2Value(e.target.value)}
        />
        <p>Enter New Date:</p>
        <input
          type="date"
          placeholder="mm/dd/yyyy"
          value={dateVal}
          onChange={(e) => setDateVal(e.target.value)}
        />
        <p>Enter New Amount:</p>
        <input
          type="number"
          placeholder="Donation Amount"
          value={amountVal}
          onChange={(e) => setAmountVal(e.target.value)}
        />
        <p>Enter New Kindness Message:</p>
        <input
          type="text"
          placeholder="Enter New Kindness Message"
          value={messageVal}
          onChange={(e) => setMessageVal(e.target.value)}
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

export default FinancialDonationsPopUp;
