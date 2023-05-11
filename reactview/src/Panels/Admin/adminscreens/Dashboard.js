import React from "react";
import Carousel from "react-bootstrap/Carousel";
import styles from "../../Admin/adminscreen.css";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/esm/Button";

function Dashboard() {
  return (
    <div className="turningred">
      <h1 className="color">Dashboard</h1>
      {/* Carousel Slider */}
      <Carousel>
        <Carousel.Item interval={1000}>
          <img
            className="d-block w-100"
            src={require("../AdminPhotos/11.png")}
            alt="First slide"
          />
          <Carousel.Caption>
            {/* <h4 style={{ color: "black" }}>Hiring Alerts!</h4> */}
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item interval={500}>
          <img
            className="d-block w-100"
            src={require("../AdminPhotos/22.png")}
            alt="Second slide"
          />
          <Carousel.Caption>
            <h4>Campaigns Live</h4>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src={require("../AdminPhotos/33.png")}
            alt="Third slide"
          />
          <Carousel.Caption>
            <h4>Breaking News</h4>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>

      <div class="container text-center carddivs m-0 row">
        <div className="row carddives">
          <div className="col-lg-4 col-md-6 col-12">
            <Card>
              <Card.Img variant="top" src={require("../AdminPhotos/44.png")} />
              <Card.Body>
                {/* <Card.Title>Card</Card.Title> */}

                <Button variant="warning">View Blood Request</Button>
              </Card.Body>
            </Card>
          </div>
          <div className="col-lg-4 col-md-6 col-12">
            <Card>
              <Card.Img variant="top" src={require("../AdminPhotos/66.png")} />
              <Card.Body>
                <Button variant="warning">View Queries</Button>
              </Card.Body>
            </Card>
          </div>
          <div className="col-lg-4 col-md-6 col-12">
            <Card>
              <Card.Img variant="top" src={require("../AdminPhotos/55.png")} />
              <Card.Body>
                <Button variant="warning">View Blood Stocks</Button>
              </Card.Body>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Dashboard;
