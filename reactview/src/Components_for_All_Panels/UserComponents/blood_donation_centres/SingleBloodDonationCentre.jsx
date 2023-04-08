import React from "react";

import { Container, Button } from "react-bootstrap";
import { Form, Row, Col, Card, ListGroup, Nav,Dropdown,DropdownButton,InputGroup,Modal } from "react-bootstrap";
import UserPanelHeader from "../UserPanelHeader";
import UserPanelFooter from "../UserPanelFooter";
import UserPanelBackToTopButton from "../UserPanelBackToTopButton";
import Image1 from "../../../Public/user/image/CardImage3.jpg";
import { Search,ArrowRight,ChevronRight,Trash, GeoAltFill, TelephoneOutboundFill } from 'react-bootstrap-icons';

import '../css/style.css';

const SingleBloodDonationCentre = (props) => {

    const { centre, history } = props;
    console.log(props);


    return ( <div>
        <Container className='d-flex justify-content-center' style={{paddingTop:'0%',paddingBottom:'7%'}}>
                <Row className=''>
                    <div className=''>
                        
                            <Col sm={4}>
                            <Row className="" style={{marginBottom:"10%"}}>
                                <Col sm={12}>
                                    <Card className="UserCard" border="secondary" style={{ width: '70rem' }}>
                                        <Row>
                                            <Col sm={5} style={{marginLeft: '1%',paddingTop: '2%',textAlign:'left'}}>
                                                <Card.Title>
                                                    <h5 className='TextCursive' style={{color:'rgb(116, 10, 10)'}}>{centre.Name.value}</h5>
                                                </Card.Title>
                                                <Card.Text>
                                                    <p style={{marginTop:'0%'}}>{centre.Location.value} ({centre.City.value})</p> 
                                                </Card.Text>
                                            </Col>
                                            <Col sm={3} className='d-flex' style={{paddingTop:'3%'}}>
                                                <GeoAltFill className="TextColor" size={25} /><p style={{paddingLeft:'2%'}}>2.3 km away</p>
                                            </Col>
                                            <Col sm={2} className='d-flex' style={{paddingTop:'3%'}}>
                                                <TelephoneOutboundFill className="TextColor" size={22} />
                                                <p style={{paddingLeft:'6%'}}>{centre.ContactNo.value}</p>

                                                
                                            </Col>
                                            <Col sm={1} className='d-flex' style={{paddingTop:'3%'}}>
                                            <Nav.Link className='TextColor' style={{paddingLeft:'160%'}}><ChevronRight className="" size={18} /></Nav.Link>
                                            </Col>
                                        </Row>
                                        
                                        <Row style={{backgroundColor:'#f9f2f1',width:'100%',marginLeft:'0%'}}>
                                            <Card.Text>
                                                <p style={{paddingTop:'1%'}}><strong>Opening Days: </strong>{centre.Opening_Days.value}</p> 
                                            </Card.Text>
                                        </Row>
    
                                    </Card>
                                </Col>
                                <Col sm={4}></Col>
                                <Col sm={4}></Col>
                            </Row>
                        </Col>
                        
                    </div>
                    
                </Row>
            </Container>

    </div> );
}

export default SingleBloodDonationCentre;