import React from "react";

import { Container, Button } from "react-bootstrap";
import { Form, Row, Col, Card, ListGroup, Nav,Dropdown,DropdownButton,InputGroup,Modal } from "react-bootstrap";
import UserPanelHeader from "../UserPanelHeader";
import UserPanelFooter from "../UserPanelFooter";
import UserPanelBackToTopButton from "../UserPanelBackToTopButton";
import Image1 from "../../../Public/user/image/RequestMaker.jpg";
import CardImage1 from "../../../Public/user/image/Avatar.JPG";
import { Search,ArrowRight,ChevronRight,Trash, GeoAltFill, TelephoneOutboundFill } from 'react-bootstrap-icons';

import '../css/style.css';

const SingleDonor = (props) => {

    const { donor, history } = props;
    console.log(props);

    //For Modal
    const [show, setShow] = React.useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return ( <div>
        <Container className='d-flex justify-content-center' style={{paddingTop:'0%',paddingBottom:'7%'}}>
            <Row className=''>
                <div className='d-flex'>
                    
                        <Col sm={4}>
                        <Row className="" style={{marginBottom:"10%"}}>
                            <Col sm={12}>
                                <Card className="UserCard" border="secondary" style={{ width: '22rem' }}>
                                    <Row>
                                        <Col sm={8} style={{paddingLeft: '7%',paddingTop: '9%',textAlign:'left'}}>
                                            <Card.Title><h3 className='TextCursive' style={{color:'rgb(116, 10, 10)'}}>{donor.Name.value}</h3></Card.Title>
                                        </Col>
                                        <Col className='' sm={3} style={{marginRight:'0%',marginTop: '3%'}}>
                                            <Card.Img className="" variant="top" src={CardImage1} width="0%" height="65rem" style={{borderRadius:'60%',border: "solid rgb(116, 10, 10)"}}/>
                                            
                                        </Col>
                                    </Row>
                                    <Card.Body>
                                        <Card.Text>
                                            <p style={{marginTop:'-6%'}}><strong className='TextCursive'>Donated by: </strong>{donor.Name.value}</p>
                                            <p style={{marginTop:'-5%'}}><strong className='TextCursive'>Blood Group: </strong>{donor.Blood_Group.value}</p>
                                            <p style={{marginTop:'-5%'}}><strong className='TextCursive'>Email: </strong>{donor.Email.value}</p>
                                            <p style={{marginTop:'-5%'}}><strong className='TextCursive'>City: </strong>{donor.City.value}</p>
                                        </Card.Text>
                                        
                                        <Nav.Link className='d-flex justify-content-end TextColor' style={{marginTop:'-3%'}} onClick={handleShow}>View Details <ArrowRight className="m-1" size={18} /></Nav.Link>

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

        {/* <div>
            <Modal show={show} onHide={handleClose}>
                <div style={{border:'1px solid rgb(160,15,15)',boxShadow: '0px 0px 8px 0px rgb(116, 10, 10)'}}>
                    <Modal.Header closeButton>
                        <Modal.Title className='TextColor'>Blood Donor Details</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <p><strong>Donated Blood Group: </strong>AB+</p>
                        <p><strong>Donated By: </strong>Muhammad Ahmad</p>
                        <p><strong>Donated On: </strong>December 01,2000</p>
                        <p><strong>Email Address: </strong>muhammadali@gmail.com</p>
                        <p><strong>City: </strong>Lahore</p>
                        <p><strong>Location: </strong>House 08, Allama Iqbal Town, Lahore</p>
                        <p><strong>Blood Donation Centre: </strong>Jinnah Hospital</p>
                        <p><strong>Contact Number: </strong>+92 300 1234567</p>
                        <p><strong>Member Since: </strong>one Year</p>
                    </Modal.Body>
                    <Modal.Footer>
                    <Button variant="flat" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="flatSolid" onClick={handleClose}>
                        Make Blood Donation
                    </Button>
                    </Modal.Footer>
                </div>
            </Modal>
        </div> */}

    </div> );
}

export default SingleDonor;