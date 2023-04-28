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
import { Link } from "react-router-dom";

const SingleDonor = (props) => {

    const { donor, history } = props;
    console.log(props);

    return ( <div>
        <Container className='d-flex justify-content-center' style={{paddingTop:'0%',paddingBottom:'7%'}}>
            <Row className=''>
                <div className='d-flex'>
                    
                        <Col sm={4}>
                        <Row className="" style={{marginBottom:"10%"}}>
                            <Col sm={12}>
                                <Card className="UserCard" border="secondary" style={{ width: '21rem' }}>
                                    <Row>
                                        <Col sm={8} style={{paddingLeft: '7%',paddingTop: '6%',textAlign:'left'}}>
                                            <Card.Title><h4 className='TextCursive' style={{color:'rgb(116, 10, 10)'}}>{donor.Name.value}</h4></Card.Title>
                                        </Col>
                                        <Col className='' sm={3} style={{marginRight:'0%',marginTop: '3%'}}>
                                            <Card.Img className="" variant="top" src={CardImage1} width="0%" height="60rem" style={{borderRadius:'40%',border: "solid rgb(116, 10, 10)"}}/>
                                        </Col>
                                    </Row>
                                    <Card.Body>
                                        <Card.Text>
                                        <p style={{marginTop:'-10%'}}><strong className='TextCursive' style={{color:'#635f5f'}}>Donated by: </strong>{donor.Name.value}</p>
                                        <p style={{marginTop:'-5.5%'}}><strong className='TextCursive' style={{color:'#635f5f'}}>Blood Group: </strong>{donor.Blood_Group.value}</p>
                                        <p style={{marginTop:'-5.5%'}}><strong className='TextCursive' style={{color:'#635f5f'}}>Email: </strong>{donor.Email.value}</p>
                                        <p style={{marginTop:'-5.5%'}}><strong className='TextCursive' style={{color:'#635f5f'}}>City: </strong>{donor.City.value}</p>
                                        </Card.Text>
                                        
                                        <ListGroup className="list-group-flush"style={{marginTop:'-6%'}}>
                                            <ListGroup.Item></ListGroup.Item>
                                            <ListGroup.Item>
                                                <Link to={{ pathname: `/user/donor-details/${donor.ID.value}`, state: { donor } }} className='d-flex justify-content-end TextColor' style={{marginBottom:'-5%',textDecoration:'none',fontSize:'14.5px',fontWeight:'600'}}>
                                                    View Details <ArrowRight className="m-1" size={16} />
                                                </Link>
                                            </ListGroup.Item>
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

    </div> );
}

export default SingleDonor;