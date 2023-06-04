import React, { useEffect, useState } from "react";
import axios from "axios";
import { Container, Button, FloatingLabel } from "react-bootstrap";
import { Form, Row, Col, Card, InputGroup, Modal } from "react-bootstrap";
// import { Link } from "react-router-dom";
import { CalendarDateFill, Laptop } from "react-bootstrap-icons";

import "./style.css";
// import Campaign from "../Campaign";
// import GenericService from "../Services/GenericService";
import packageService from "../Services/PackageService";

const SingleCampaign = (props) => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [title, setTitle] = useState("");
  const [postDate, setPostDate] = useState("");
  const [details, setDetails] = useState("");
  // Deletion Confirmation Modal
  const [delShow, setDelShow] = useState(false);
  const handleDelClose = () => setDelShow(false);
  const handleDelShow = () => setDelShow(true);

  const { campaign } = props;
  console.log(props);
  useEffect(() => {
    setTitle(campaign?.Title?.value);
    setDetails(campaign.Details.value);
    setPostDate(campaign.Date.value);
  }, []);


  const submitForm = async (e) => {
    e.preventDefault();
    try {
      await axios.put(
        "http://localhost:8081/api/admin/campaign/CampaignDetails/update/" +
        campaign.ID.value,
        { title, details, postDate }
      );
      console.log(title);
      console.log("New Descriptipoj", details);
      console.log(postDate);
      window.location.href = "/adminpanel/HomeScreen";
    } catch (error) {
      if (error.response) {
        console.log(error.response.data.error);
      } else {
        console.log("An error occurred");
      }
    }
  };
  const deleteRecord = () => {
    packageService
      .deleteCampaign(campaign.ID.value)
      .then((data) => {
        console.log(data);
        window.location.reload();
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
            <FloatingLabel controlId="floatingPassword" label="Title">
              <Form.Control
                type="text"
                placeholder="Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </FloatingLabel>
          </InputGroup>

          <InputGroup className="mb-3 input">
            <InputGroup.Text id="basic-addon1">
              <Laptop className="Appcolor" size={30} />
            </InputGroup.Text>
            <FloatingLabel controlId="floatingPassword" label="Details">
              <Form.Control
                type="text"
                placeholder="Details"
                value={details}
                onChange={(e) => setDetails(e.target.value)}
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
                value={postDate}
                onChange={(e) => setPostDate(e.target.value)}
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
      {/* Delete Confirmation Modal */}
      <Modal show={delShow} onHide={handleDelClose}>
        <Modal.Header closeButton>
          <Modal.Title>Confirmation!</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to Delete the Campaign?</Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={deleteRecord}>
            Yes
          </Button>
          <Button variant="primary" onClick={handleDelClose}>
            No
          </Button>
        </Modal.Footer>
      </Modal>
      <Container
        className="d-flex justify-content-center"
        style={{ paddingTop: "0%", paddingBottom: "7%" }}
      >
        <Row className="fontfamily">
          <div className="d-flex">
            <Col sm={4}>
              <Row className="" style={{ marginBottom: "10%" }}>
                <Col sm={12}>
                  <Card
                    className="AdminCard"
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
                          <h5>
                            <strong

                              style={{ color: "rgb(116, 10, 10)" }}
                            >
                              {" "}
                              Title:
                            </strong>
                            <span className="m-2">{campaign?.Title?.value}</span>
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
                            Details:
                          </strong>
                          {campaign?.Details?.value}
                        </p>
                        <p style={{ marginTop: "-5.5%" }}>
                          <strong
                            className="fontfamily"
                            style={{ color: "#635f5f" }}
                          >
                            Date Posted:
                          </strong>
                          {campaign?.Date?.value}
                        </p>
                      </Card.Text>
                      <div className="row">
                        <div className="col-lg-3 col-12">
                          {" "}
                          <Button variant="danger" onClick={handleDelShow}>Delete</Button>
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

export default SingleCampaign;
