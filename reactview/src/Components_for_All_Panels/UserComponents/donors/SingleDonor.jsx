import React, { useEffect, useState } from "react";

import { Container, Button } from "react-bootstrap";
import { Form, Row, Col, Card, ListGroup, Nav,Dropdown,DropdownButton,InputGroup,Modal } from "react-bootstrap";
import UserPanelHeader from "../UserPanelHeader";
import UserPanelFooter from "../UserPanelFooter";
import UserPanelBackToTopButton from "../UserPanelBackToTopButton";
import CardImage1 from "../../../Public/user/image/donor-requestMaker-profile.png";
import { Search,ArrowRight,ChevronRight,Trash, GeoAltFill, TelephoneOutboundFill, EnvelopeAtFill, GenderAmbiguous, GenderTrans, GenderMale, GenderFemale } from 'react-bootstrap-icons';

import '../css/style.css';
import { Link } from "react-router-dom";
import jwtDecode from "jwt-decode";

const SingleDonor = (props) => {

    const { donor, history } = props;
    // console.log(props);

    

    return ( <div>
            <Container className='d-flex justify-content-center' style={{paddingTop:'0%',paddingBottom:'0%'}}>
                <Row className=''>
                    <div className=''>
                        
                            <Col sm={4}>
                            <Row className="" style={{marginBottom:"10%"}}>
                                <Col sm={12}>
                                    <Card className="UserCard" border="secondary" style={{ width: '70rem' }}>
                                        <Row>
                                            <Col sm={4} style={{marginLeft: '1%',paddingTop: '2%',textAlign:'left'}}>
                                                <Card.Title>
                                                    <h5 className='TextCursive RedColor' style={{}}>{donor.Name.value}</h5>
                                                </Card.Title>
                                                <Card.Text>
                                                    <p className='PurpleColor' style={{marginTop:'0%'}}>{donor?.Location?.value} ({donor.City.value})</p> 
                                                </Card.Text>
                                            </Col>
                                            
                                            <Col sm={2} className='d-flex' style={{paddingTop:'3%'}}>
                                                <EnvelopeAtFill className="RedColor" size={22} />
                                                <p className='PurpleColor' style={{paddingLeft:'6%'}}>{donor?.Email?.value}</p>
                                            </Col>
                                            <Col sm={2} className='d-flex' style={{paddingTop:'3%'}}>
                                                <TelephoneOutboundFill className="RedColor" size={20} />
                                                <p className='PurpleColor' style={{paddingLeft:'6%'}}>{donor?.Contact?.value}</p>
                                            </Col>
                                            <Col sm={2} className='d-flex' style={{paddingTop:'3%'}}>
                                                {donor?.Gender?.value === 'Male' ? (
                                                    <>
                                                        <GenderMale className="RedColor" size={20} />
                                                    </>
                                                ):(
                                                    <>
                                                        <GenderFemale className="RedColor" size={20} />
                                                    </>
                                                )}
                                                
                                                <p className='PurpleColor' style={{paddingLeft:'6%'}}>{donor?.Gender?.value}</p>
                                            </Col>
                                            <Col sm={1} className='d-flex' style={{paddingTop:'3%'}}>
                                                <Link to={{ pathname: `/user/donor-details/${donor.ID.value}`, state: { donor } }} className='d-flex justify-content-end RedColor' style={{paddingLeft:'160%',marginBottom:'-2%',textDecoration:'none',fontSize:'14px',fontWeight:'600'}}>
                                                <ChevronRight className="" size={18} />
                                                </Link>
                                            </Col>
                                        </Row>
                                        
                                        <Row style={{backgroundColor:'#F5F5DC',width:'100%',marginLeft:'0%'}}>
                                            <Col sm={6}>
                                                <Card.Text>
                                                    <p className='PurpleColor' style={{paddingTop:'1%'}}><strong>Blood Group: </strong>{donor.Blood_Group.value}</p> 
                                                </Card.Text>
                                            </Col>
                                            <Col sm={6}>
                                                <Link className='d-flex justify-content-end TextColor' style={{paddingLeft:'0%',marginTop:'1.5%',textDecoration:'none',fontSize:'14px',fontWeight:'600'}}>
                                                    {donor.DonorAvailability.value === 'Available' ? (
                                                        <>
                                                            <Button size='sm' variant="success" type='submit'
                                                                >Available</Button>
                                                        </>
                                                    ):(
                                                        <>
                                                            <Button size='sm' variant="warning" type='submit'
                                                                >Not Available</Button>
                                                        </>
                                                    )}
                                                
                                                    
                                                </Link>
                                            </Col>
                                            
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

export default SingleDonor;