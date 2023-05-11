import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

export default function ConfirmationBox({ message, onConfirm, onCancel }) {
  const [show, setShow] = useState(true);

  const handleClose = () => {
    setShow(false);
    onCancel();
  };

  const handleConfirm = () => {
    onConfirm();
    handleClose();
  };
  

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header>
        <Modal.Title>Confirmation</Modal.Title>
      </Modal.Header>
      <Modal.Body>{message}</Modal.Body>
      <Modal.Footer>
        <Button size='sm' variant="flat" onClick={handleClose}>
          Cancel
        </Button>
        <Button size='sm' variant="flatSolid" onClick={handleConfirm}>
          Confirm
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
