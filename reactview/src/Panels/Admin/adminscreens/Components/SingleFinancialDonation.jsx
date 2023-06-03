import React, { useEffect, useState } from "react";
import axios from "axios";
import { Container, Button, FloatingLabel } from "react-bootstrap";
import { Form, Row, Col, Card, InputGroup, Modal } from "react-bootstrap";
import { Link } from "react-router-dom";
import { CalendarDateFill, Laptop } from "react-bootstrap-icons";

import "./style.css";
import GenericService from "../Services/GenericService";
import packageService from "../Services/PackageService";

const SingleFinancialDonation = (props) => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [name, setName] = useState("");
  const [donationDate, setDonationDate] = useState("");
  const [donationAmount, setdonationAmount] = useState("");
  const [contactNo, setContactNo] = useState("");
  const [message, setmessage] = useState("");
  const { fdon, history } = props;
  console.log(props);
  useEffect(() => {
    setName(fdon?.Name?.value);
    setContactNo(fdon.ContactNo.value);
    setDonationDate(fdon.Date.value);
    setdonationAmount(fdon.Amount.value);
    setmessage(fdon.Message.value)

  }, []);

  const submitForm = async (e) => {
    e.preventDefault();
    try {
      await axios.put(
        "http://localhost:8081/api/admin/financialDonation/financialDonationDetails/update/" +
          fdon.ID.value,
        { name, contactNo, donationDate , donationAmount, message}
      );

      window.location.href = "/adminpanel/HomeScreen";
    } catch (error) {
      if (error.response) {
        console.log(error.response.data.error);
      } else {
        console.log("An error occurred");
      }
    }
  };
  const deleteUser = () => {
    console.log("DElete is clicked");
    packageService
      .deletefdon(fdon?.ID?.value)
      .then((data) => {
        console.log(data);
        window.location.href = "/adminpanel/HomeScreen";
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div>
      <Modal show={show} onHide={handleClose} animation={false}>
        <Modal.Header closeButton>
          <Modal.Title>
            {" "}
            <h5 className="rang">Edit Details</h5>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <InputGroup className="mb-3 input">
            <InputGroup.Text id="basic-addon1">
              <Laptop className="Appcolor" size={30} />
            </InputGroup.Text>
            <FloatingLabel controlId="floatingPassword" label="Name">
              <Form.Control
                type="text"
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </FloatingLabel>
          </InputGroup>

          <InputGroup className="mb-3 input">
            <InputGroup.Text id="basic-addon1">
              <Laptop className="Appcolor" size={30} />
            </InputGroup.Text>
            <FloatingLabel controlId="floatingPassword" label="Contact No">
              <Form.Control
                type="text"
                placeholder="Contact No:"
                value={contactNo}
                onChange={(e) => setContactNo(e.target.value)}
              />
            </FloatingLabel>
          </InputGroup>
          <h5 className="rang">Select Date</h5>
          <InputGroup className="mb-3 input">
            <InputGroup.Text id="basic-addon1">
              <CalendarDateFill className="Appcolor" size={30} />
            </InputGroup.Text>
            <FloatingLabel controlId="floatingPassword" label="Date">
              <Form.Control
                type="date"
                placeholder="mm/dd/yyyy"
                value={donationDate}
                onChange={(e) => setDonationDate(e.target.value)}
              />
            </FloatingLabel>
          </InputGroup>
          <h5 className="rang">Amount Donated</h5>
          <InputGroup className="mb-3 input">
            <InputGroup.Text id="basic-addon1">
              <CalendarDateFill className="Appcolor" size={30} />
            </InputGroup.Text>
            <FloatingLabel controlId="floatingPassword" label="Amount">
              <Form.Control
                type="number"
                placeholder="Rs."
                value={donationAmount}
                onChange={(e) => setdonationAmount(e.target.value)}
              />
            </FloatingLabel>
          </InputGroup>

          <InputGroup className="mb-3 input">
            <InputGroup.Text id="basic-addon1">
              <Laptop className="Appcolor" size={30} />
            </InputGroup.Text>
            <FloatingLabel controlId="floatingPassword" label="Message">
              <Form.Control
                type="text"
                placeholder="Name"
                value={message}
                onChange={(e) => setmessage(e.target.value)}
              />
            </FloatingLabel>
          </InputGroup>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="danger" onClick={submitForm}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
      <Container
        className="d-flex justify-content-center"
        style={{ paddingTop: "0%", paddingBottom: "7%" }}
      >
        <Row className="">
          <div className="d-flex">
            <Col sm={4}>
              <Row className="" style={{ marginBottom: "10%" }}>
                <Col sm={12}>
                  <Card
                    className="UserCard"
                    border="secondary"
                    style={{ width: "22rem" }}
                  >
                    <Row>
                      <Col
                        sm={12}
                        style={{
                          paddingLeft: "7%",
                          paddingTop: "6%",
                          textAlign: "left",
                        }}
                      >
                        <Card.Title>
                          <h5
                            className="fontfamily"
                            style={{ color: "rgb(116, 10, 10)" }}
                          >
                            {fdon?.Name?.value}
                          </h5>
                        </Card.Title>
                      </Col>
                    </Row>
                    <Card.Body>
                      <Card.Text>
                        <p style={{ marginTop: "-5.5%" }}>
                          <strong
                            className="fontfamily"
                            style={{ color: "#635f5f" }}
                          >
                            Contact No:
                          </strong>
                          {fdon?.ContactNo?.value}
                        </p>
                        <p style={{ marginTop: "-5.5%" }}>
                          <strong
                            className="fontfamily"
                            style={{ color: "#635f5f" }}
                          >
                            Date Posted:
                          </strong>
                          {fdon?.Date?.value}
                        </p>
                        <p style={{ marginTop: "-5.5%" }}>
                          <strong
                            className="fontfamily"
                            style={{ color: "#635f5f" }}
                          >
                            Amount Donated:
                          </strong>
                          {fdon?.Amount?.value}
                        </p>
                        <p style={{ marginTop: "-5.5%" }}>
                          <strong
                            className="fontfamily"
                            style={{ color: "#635f5f" }}
                          >
                            Message:
                          </strong>
                          {fdon?.Message?.value}
                        </p>
                      </Card.Text>
                      <div className="row">
                        <div className="col-lg-3 col-12">
                          {" "}
                          <Button variant="danger" onClick={deleteUser}>Delete</Button>
                        </div>
                        <div className="col-lg-3 col-12">
                          {" "}
                          <Button variant="warning" onClick={handleShow}>Update</Button>
                        </div>
                      </div>
                    </Card.Body>
                  </Card>
                </Col>
                <Col sm={4}></Col>
                <Col sm={4}></Col>
              </Row>
            </Col>
          </div>
        </Row>
      </Container>
    </div>
  );
};

export default SingleFinancialDonation;
