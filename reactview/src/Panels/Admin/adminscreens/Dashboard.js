import React from 'react';
import Carousel from 'react-bootstrap/Carousel';
import styles from "../../Admin/adminscreen.css";
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/esm/Button';

function Dashboard() {
    return (
        <div className='turningred'>
            <h1 className="color">Dashboard</h1>
            {/* Carousel Slider */}
            <Carousel>
                <Carousel.Item interval={1000}>
                    <img
                        className="d-block w-100"
                        src={require("../../../pictures/blue.jpg")}
                        alt="First slide"
                    />
                    <Carousel.Caption>
                        <h3>News Currently Live</h3>
                        <p>Hey I am a Text</p>
                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item interval={500}>
                    <img
                        className="d-block w-100"
                        src={require("../../../pictures/red.jpg")}
                        alt="Second slide"
                    />
                    <Carousel.Caption>
                        <h3>Campaigns Live</h3>
                        <p>Hey! I am a Text</p>
                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item>
                    <img
                        className="d-block w-100"
                        src={require("../../../pictures/blue.jpg")}
                        alt="Third slide"
                    />
                    <Carousel.Caption>
                        <h3>We are Hiring</h3>
                        <p>
                            Hey! I am a Text
                        </p>
                    </Carousel.Caption>
                </Carousel.Item>
            </Carousel>

            <div class="container text-center carddivs">
                {/* <div class="row text">
                    <div class="col head-text">
                    <div className="head-image">
                        <img className="cardimage" src={require('../../../pictures/yellow.jpg')} alt="Freedom Blog" />
                    </div>
                    {/* <div class='text-on-image'>
                        <p>Hi! Jack</p>
                    </div> */}
                {/* </div>
                    <div class="col head-text">
                    <div className="head-image">
                        <img className="cardimage" src={require('../../../pictures/blue.jpg')} alt="Freedom Blog" />
                    </div> */}
                {/* <div class='text-on-image'>
                        <p>Hi! Jack</p>
                    </div> */}
                {/* </div>
                    <div class="col head-text">
                    <div className="head-image">
                        <img className="cardimage" src={require('../../../pictures/red.jpg')} alt="Freedom Blog" />
                    </div> */}
                {/* <div class='text-on-image'>
                        <p>Hi! Jack</p>
                    </div> */}
                {/* </div> */}
                {/* </div> */}

                <div className="row carddivs">
                    <div className="col">
                        <Card>
                            <Card.Img variant="top" src={require('../../../pictures/blue.jpg')} />
                            <Card.Body>
                                {/* <Card.Title>Card</Card.Title> */}


                                <Button variant="warning">View Blood Request</Button>
                            </Card.Body>
                        </Card>
                    </div>
                    <div className="col">
                        <Card>
                            <Card.Img variant="top" src={require('../../../pictures/red.jpg')} />
                            <Card.Body>



                                <Button variant="warning">View Queries</Button>
                            </Card.Body>
                        </Card>
                    </div>
                    <div className="col">
                        <Card>
                            <Card.Img variant="top" src={require('../../../pictures/blue.jpg')} />
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
