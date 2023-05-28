import React from "react";

import { Container, Button } from "react-bootstrap";
import { Form, Row, Col, Card, ListGroup, Nav,Dropdown,DropdownButton,InputGroup,Modal } from "react-bootstrap";
import UserPanelHeader from "../UserPanelHeader";
import UserPanelFooter from "../UserPanelFooter";
import UserPanelBackToTopButton from "../UserPanelBackToTopButton";
import CardImage1 from "../../../Public/user/image/donor-requestMaker-profile.png";
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
                                        <Col sm={8} style={{paddingLeft: '7%',paddingTop: '7%',textAlign:'left'}}>
                                            <Card.Title><h4 className='TextCursive RedColor' style={{height:'55px'}}>{donor.Name.value}</h4></Card.Title>
                                        </Col>
                                        <Col className='' sm={3} style={{marginRight:'0%',marginTop: '3%'}}>
                                            <Card.Img className="" variant="top" src={CardImage1} width="0%" height="60rem" style={{}}/>
                                        </Col>
                                    </Row>
                                    <Card.Body>
                                        <Card.Text>
                                        <p className='PurpleColor' style={{marginTop:'-7%'}}><strong className='TextCursive' style={{color:'#27213C'}}>Donated by: </strong>{donor.Name.value}</p>
                                        <p className='PurpleColor' style={{marginTop:'-5.5%'}}><strong className='TextCursive' style={{color:'#27213C'}}>Blood Group: </strong>{donor.Blood_Group.value}</p>
                                        <p className='PurpleColor' style={{marginTop:'-5.5%'}}><strong className='TextCursive' style={{color:'#27213C'}}>Email: </strong>{donor.Email.value}</p>
                                        <p className='PurpleColor' style={{marginTop:'-5.5%'}}><strong className='TextCursive' style={{color:'#27213C'}}>City: </strong>{donor.City.value}</p>
                                        </Card.Text>
                                        
                                        <ListGroup className="list-group-flush"style={{marginTop:'-6%'}}>
                                            <ListGroup.Item></ListGroup.Item>
                                            <ListGroup.Item>
                                                <Link to={{ pathname: `/user/donor-details/${donor.ID.value}`, state: { donor } }} className='d-flex justify-content-end RedColor' style={{marginBottom:'-5%',textDecoration:'none',fontSize:'14.5px',fontWeight:'600'}}>
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