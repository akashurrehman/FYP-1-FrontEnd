import React from "react";

import { Container, Button } from "react-bootstrap";
import { Form, Row, Col, Card, ListGroup, Nav,Dropdown,DropdownButton,InputGroup,Modal } from "react-bootstrap";
import { Link } from 'react-router-dom';
import { Search,ArrowRight,ChevronRight,Trash, GeoAltFill, TelephoneOutboundFill } from 'react-bootstrap-icons';

import '../../css/style.css';

const SingleCampaign = (props) => {

    const { campaign, history } = props;
    console.log(props);


    return ( <div>
        <Container className='d-flex justify-content-center' style={{paddingTop:'0%',paddingBottom:'7%'}}>
            <Row className=''>
                <div className='d-flex'>
                    
                        <Col sm={4}>
                        <Row className="" style={{marginBottom:"10%"}}>
                            <Col sm={12}>
                                <Card className="UserCard" border="secondary" style={{ width: '22rem' }}>
                                    <Row>
                                        <Col sm={12} style={{paddingLeft: '7%',paddingTop: '6%',textAlign:'left'}}>
                                            <Card.Title><h5 className='TextCursive' style={{color:'rgb(116, 10, 10)'}}>{campaign?.Title?.value}</h5></Card.Title>
                                        </Col>
                                    </Row>
                                    <Card.Body>
                                        <Card.Text>
                                            <p style={{marginTop:'-5.5%'}}><strong className='TextCursive' style={{color:'#635f5f'}}>Date: </strong>{campaign?.Date?.value}</p>
                                            <p style={{marginTop:'-5.5%',height:'30px'}}><strong className='TextCursive' style={{color:'#635f5f'}}>Details: </strong>{campaign?.Details?.value}</p>
                                        </Card.Text>
                                        
                                        <ListGroup className="list-group-flush"style={{marginTop:'-5%'}}>
                                            <ListGroup.Item></ListGroup.Item>
                                            <ListGroup.Item>
                                                <Link to={{ pathname: `/user/campaign-details/${campaign.ID.value}`, state: { campaign } }} className='d-flex justify-content-end TextColor' style={{marginBottom:'-5%',textDecoration:'none',fontSize:'14.5px',fontWeight:'600'}}>
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

export default SingleCampaign;