import React from "react";

import { Container, Button } from "react-bootstrap";
import { Form, Row, Col, Card, ListGroup, Nav,Dropdown,DropdownButton,InputGroup,Modal } from "react-bootstrap";
import { Link } from 'react-router-dom';
import { Search,ArrowRight,ChevronRight,Trash, GeoAltFill, TelephoneOutboundFill } from 'react-bootstrap-icons';
import Accordion from 'react-bootstrap/Accordion';
import '../../css/style.css';

const SingleFAQ = (props) => {

    const { faq, history } = props;
    console.log(props);


    return ( <div>
        <Container className='' style={{paddingTop:'0%',paddingBottom:'0%'}}>
            
            <Accordion defaultActiveKey="0" flush>
                <Accordion.Item eventKey="0">
                    <Accordion.Header className="custom-accordion-header"><h5 className='PurpleColor' style={{}}>{faq?.Title?.value}</h5></Accordion.Header>
                    <Accordion.Body>
                        {faq?.Details?.value}
                        <Link to={{ pathname: `/user/faq-details/${faq.ID.value}`, state: { faq } }} className='d-flex justify-content-end RedColor' style={{marginTop:'2%',textDecoration:'none',fontSize:'14.5px',fontWeight:'600'}}>
                            View Details <ArrowRight className="m-1" size={16} />
                        </Link>
                    </Accordion.Body>
                </Accordion.Item>
                
            </Accordion>
            {/* <Row className=''>
                <div className='d-flex'>
                    <Col sm={4}>
                        <Row className="" style={{marginBottom:"10%"}}>
                            <Col sm={12}>
                                <Card className="UserCard" border="secondary" style={{ width: '25rem' }}>
                                    <Row>
                                        <Col sm={12} style={{paddingLeft: '6%',paddingTop: '6%',textAlign:'left'}}>
                                            <Card.Title><h5 className='TextCursive' style={{color:'rgb(116, 10, 10)'}}>{faq?.Title?.value}</h5></Card.Title>
                                        </Col>
                                    </Row>
                                    <Card.Body>
                                        <Card.Text>
                                        </Card.Text>
                                        
                                        <ListGroup className="list-group-flush"style={{marginTop:'-5%'}}>
                                            <ListGroup.Item></ListGroup.Item>
                                            <ListGroup.Item>
                                                <Link to={{ pathname: `/user/faq-details/${faq.ID.value}`, state: { faq } }} className='d-flex justify-content-end TextColor' style={{marginBottom:'-5%',textDecoration:'none',fontSize:'14.5px',fontWeight:'600'}}>
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
                
            </Row> */}
        </Container>


    </div> );
}

export default SingleFAQ;