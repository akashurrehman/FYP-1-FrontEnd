import React, { useEffect, useState } from "react";
import axios from "axios";
import { Container, Button, FloatingLabel } from "react-bootstrap";
import {
  Form,
  Row,
  Col,
  Card,
  InputGroup,
  Modal,
} from "react-bootstrap";
import { Link } from "react-router-dom";
import {
  CalendarDateFill,
  Laptop,
} from "react-bootstrap-icons";

import "./style.css";
import Campaign from "../Campaign";
import GenericService from "../Services/GenericService";
import packageService from "../Services/PackageService";

const SingleNews = (props) => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [title, setTitle] = useState("");
  const [postDate, setPostDate] = useState("");
  const [details, setDetails] = useState("");
  const { news, history } = props;
  console.log(props);
  useEffect(() => {
    setTitle(news?.Title?.value);
    setDetails(news.Details.value);
    setPostDate(news.Date.value);
  }, []);

  console.log("New Title is", title);
  console.log("New Title is", details);
  console.log("New Title is", postDate);

  const submitForm = async (e) => {
    e.preventDefault();
    try {
      await axios.put(
        "http://localhost:8081/api/admin/news/NewsDetails/update/" +
          news.ID.value,
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
  const deleteUser = () => {
    console.log("DElete is clicked")
    packageService.deleteNews(news?.ID?.value)
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
          <Modal.Title> <h5 className="rang">Edit Details</h5></Modal.Title>
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
                            {news?.Title?.value}
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
                          {news?.Details?.value}
                        </p>
                        <p style={{ marginTop: "-5.5%" }}>
                          <strong
                            className="fontfamily"
                            style={{ color: "#635f5f" }}
                          >
                            Date Posted:
                          </strong>
                          {news?.Date?.value}
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

export default SingleNews;
