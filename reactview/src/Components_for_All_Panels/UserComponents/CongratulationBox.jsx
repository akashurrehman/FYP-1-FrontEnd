import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

export default function CongratulationBox({ message, firstButton, secondButton, thirdButton, onCancel, firstButtonText, secondButtonText, thirdButtonText, margin }) {
  const [show, setShow] = useState(true);

  const handleClose = () => {
    setShow(false);
    onCancel();
  };

  const handleFirstButton = () => {
    firstButton();
    handleClose();
  };
  const handleSecondButton = () => {
    secondButton();
    handleClose();
  };
  const handleThirdButton = () => {
    thirdButton();
    handleClose();
  };
  

  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Congratulations</Modal.Title>
      </Modal.Header>
      <Modal.Body>{message}</Modal.Body>
      <Modal.Footer>
        <div style={{marginRight: margin}}>
        <Button size='sm' variant="flat" onClick={handleFirstButton}>
          {firstButtonText}
        </Button>
        </div>
        
        <Button size='sm' variant="flatSolid" onClick={handleSecondButton}>
          {secondButtonText}
        </Button>
        <Button size='sm' variant="flatSolid" onClick={handleThirdButton}>
          {thirdButtonText}
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
