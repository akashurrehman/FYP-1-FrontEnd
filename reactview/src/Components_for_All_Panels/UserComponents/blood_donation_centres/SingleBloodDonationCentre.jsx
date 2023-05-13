import React from "react";

import { Container, Button } from "react-bootstrap";
import { Form, Row, Col, Card, ListGroup, Nav,Dropdown,DropdownButton,InputGroup,Modal } from "react-bootstrap";
import UserPanelHeader from "../UserPanelHeader";
import UserPanelFooter from "../UserPanelFooter";
import UserPanelBackToTopButton from "../UserPanelBackToTopButton";
import Image1 from "../../../Public/user/image/CardImage3.jpg";
import { Search,ArrowRight,ChevronRight,Trash, GeoAltFill, TelephoneOutboundFill } from 'react-bootstrap-icons';

import '../css/style.css';
import { Link } from "react-router-dom";

const SingleBloodDonationCentre = (props) => {

    const { centre, history } = props;
    console.log(props);

    //Button Stylings
    const [isHover, setIsHover] = React.useState(true);
    const handleMouseEnter = () => {
        setIsHover(false);
    };
    const handleMouseLeave = () => {
        setIsHover(true);
    };
    const ButtonStyle = {
        
        backgroundColor: isHover ? '#27213C' : '#D64045',
        color: isHover ? 'white' : 'white',
        transform: isHover ? 'scale(0.84)' : 'scale(0.84)',
        border: isHover ? '' : '',
        transitionDuration: isHover ? '' : '0.1s',
    };
    

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
                                                    <h5 className='TextCursive RedColor' style={{}}>{centre.Name.value}</h5>
                                                </Card.Title>
                                                <Card.Text>
                                                    <p className='PurpleColor' style={{marginTop:'0%'}}>{centre.Location.value} ({centre.City.value})</p> 
                                                </Card.Text>
                                            </Col>
                                            <Col sm={3} className='d-flex' style={{paddingTop:'3%'}}>
                                                <GeoAltFill className="RedColor" size={22} />
                                                <p className='PurpleColor' style={{paddingLeft:'2%'}}>2.3 km away</p>
                                            </Col>
                                            <Col sm={2} className='d-flex' style={{paddingTop:'3%'}}>
                                                <TelephoneOutboundFill className="RedColor" size={20} />
                                                <p className='PurpleColor' style={{paddingLeft:'6%'}}>{centre.ContactNo.value}</p>
                                            </Col>
                                            <Col sm={1} className='d-flex' style={{paddingTop:'3%'}}>
                                        
                                            <Link to={{ pathname: `/user/centre-details/${centre.ID.value}`, state: { centre } }} className='d-flex justify-content-end RedColor' style={{paddingLeft:'160%',marginBottom:'-2%',textDecoration:'none',fontSize:'14px',fontWeight:'600'}}>
                                            <ChevronRight className="" size={18} />
                                            </Link>
                                            </Col>
                                        </Row>
                                        
                                        <Row style={{backgroundColor:'#F5F5DC',width:'100%',marginLeft:'0%'}}>
                                            <Col sm={6}>
                                                <Card.Text>
                                                    <p className='PurpleColor' style={{paddingTop:'1%'}}><strong>Opening Days: </strong>{centre.Opening_Days.value}</p> 
                                                </Card.Text>
                                            </Col>
                                            <Col sm={6}>
                                                <Link to={{ pathname: `/user/make-appointment/${centre.ID.value}`, state: { centre } }} className='d-flex justify-content-end TextColor' style={{paddingLeft:'0%',marginTop:'1%',textDecoration:'none',fontSize:'14px',fontWeight:'600'}}>
                                                <Button variant="default" type='submit' style={ButtonStyle} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}
                                                    >Book Appointment</Button>
                                                    
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

export default SingleBloodDonationCentre;