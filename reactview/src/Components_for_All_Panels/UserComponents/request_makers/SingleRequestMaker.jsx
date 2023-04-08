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

const SingleRequestMaker = (props) => {

    const { requestMaker, history } = props;
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
                                            <Card.Title><h2 className='TextCursive' style={{color:'rgb(116, 10, 10)'}}>{requestMaker.Blood_Group.value}</h2></Card.Title>
                                        </Col>
                                        <Col className='' sm={3} style={{marginRight:'0%',marginTop: '3%'}}>
                                            <Card.Img className="" variant="top" src={CardImage1} width="0%" height="65rem" style={{borderRadius:'60%',border: "solid rgb(116, 10, 10)"}}/>
                                            
                                        </Col>
                                    </Row>
                                    <Card.Body>
                                        <Card.Text>
                                            <p style={{marginTop:'-6%'}}><strong className='TextCursive'>Requested by: </strong>{requestMaker.Name.value}</p>
                                            <p style={{marginTop:'-5%'}}><strong className='TextCursive'>Email: </strong>{requestMaker.Email.value}</p>
                                            <p style={{marginTop:'-5%'}}><strong className='TextCursive'>City: </strong>{requestMaker.City.value}</p>
                                        </Card.Text>
                                        
                                        <Card.Text>
                                            <p style={{textAlign:'justify',marginTop:'-3%'}}>
                                                <strong className='TextCursive'>Message: </strong>{requestMaker.Message.value}</p>
                                        </Card.Text>
                                        
                                        <Nav.Link className='d-flex justify-content-end TextColor' style={{marginTop:'-3%'}} onClick={handleShow}>View Details <ArrowRight className="m-1" size={18} /></Nav.Link>
                                    
                                        <ListGroup className="list-group-flush">
                                            <ListGroup.Item></ListGroup.Item>
                                            <ListGroup.Item><div className='d-flex justify-content-center' style={{marginBottom:'-4%'}}><Button size='md' variant="flat">Donate & Save Life</Button></div></ListGroup.Item>
                                        </ListGroup>

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
{/* 
        <div>
            <Modal show={show} onHide={handleClose}>
                <div style={{border:'1px solid rgb(160,15,15)',boxShadow: '0px 0px 8px 0px rgb(116, 10, 10)'}}>
                    <Modal.Header closeButton>
                        <Modal.Title className='TextColor'>Request Maker Details</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <p><strong>Required Blood Group: </strong>A+</p>
                        <p><strong>Requested By: </strong>Muhammad Ali</p>
                        <p><strong>Requested On: </strong>December 01,2000</p>
                        <p><strong>Email Address: </strong>muhammadali@gmail.com</p>
                        <p><strong>City: </strong>Lahore</p>
                        <p><strong>Location: </strong>House 08, Allama Iqbal Town, Lahore</p>
                        <p><strong>Hospital: </strong>Jinnah Hospital</p>
                        <p><strong>Contact Number: </strong>+92 300 1234567</p>
                        <p><strong>Message: </strong>Hi everyone, This is a call for help. A patient at Ever Care Hospital in Lahore urgently needs A+ve blood.</p>
                    </Modal.Body>
                    <Modal.Footer>
                    <Button variant="flat" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="flatSolid" onClick={handleClose}>
                        Accept Request
                    </Button>
                    </Modal.Footer>
                </div>
            </Modal>
        </div> */}

    </div> );
}

export default SingleRequestMaker;