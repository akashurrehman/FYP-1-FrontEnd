import React from "react";
import { Container, Button } from "react-bootstrap";
import { Form, Row, Col, Card, ListGroup, Nav,Dropdown,DropdownButton,InputGroup,Modal } from "react-bootstrap";
import UserPanelHeader from "../UserPanelHeader";
import UserPanelFooter from "../UserPanelFooter";
import UserPanelBackToTopButton from "../UserPanelBackToTopButton";
import Image1 from "../../../Public/user/image/CardImage3.jpg";
import { Search,ArrowRight,ChevronRight,Trash, GeoAltFill, TelephoneOutboundFill } from 'react-bootstrap-icons';

import CardImage1 from "../../../Public/user/image/Avatar.JPG";


import '../css/style.css';


const BloodDonationCentre = () => {

    //For Filter
    const [filterBlood,setFilterBlood] = React.useState("Blood Group");
    const bloodArray = ['A+ Blood','B+ Blood','AB+ Blood','O+ Blood','A- Blood','B- Blood','AB- Blood','O- Blood'];
    const [filterCity,setFilterCity] = React.useState("City");
    const cityArray = ['Lahore','Karachi','Islamabad','Multan','Peshawar'];
    const [filterDistance,setFilterDistance] = React.useState("Any Distance");
    const distanceArray = ['Within 1km','Within 5km','Within 10km','Within 15km'];
    
    const numberArray = ['1','2','3'];

    

    return ( <div>
        <UserPanelHeader></UserPanelHeader>
        <div style={{marginTop:'10%',marginBottom:'4%'}}>
            <Container className='d-flex justify-content-center'>
                <Row>
                    <h1 style={{fontWeight:"bold",color:"rgb(160, 15, 15)",fontFamily:"cursive",}}>Find a blood donation centre near you</h1>
                </Row>
            </Container>
        </div>


        <div style={{borderRadius:'10% 30% 50% 70%',backgroundColor:'#f9f2f1',marginBottom:'0%'}}>
            <div style={{marginTop:'-1%',marginBottom:'0%',paddingTop:'0%',marginBottom:'0%',position:'absolute',width:'100%'}}>
                <Container className='d-flex justify-content-center'>
                    <Row style={{width:'43%'}}>
                        <InputGroup className="mb-1">
                            <Form.Control
                                placeholder="Search Blood Donations"
                                aria-label="Search Blood Donations"
                                aria-describedby="basic-addon2"
                            />
                            <InputGroup.Text id="basic-addon2"><Search className="m-1 IconColor" size={20} /></InputGroup.Text>
                        </InputGroup>
                    </Row>
                </Container>
            </div>


            <div style={{marginTop:'1%',marginBottom:'1%',paddingBottom:'3%',paddingTop:'3%'}}>
                <Container className='d-flex justify-content-center'>
                    <Row>
                        <p className='d-flex'>
                            <div className='TextCursive' style={{margin:'5px',paddingRight:'2px'}}>Filter by:</div>

                            <DropdownButton
                                id="dropdown-autoclose-false dropdown-menu-align-end"
                                variant="flat" align="end"
                                title={filterBlood}
                                style={{paddingLeft:'5px'}}
                            >
                                <div style={{}}>
                                    {bloodArray.map((blood)=>(
                                        
                                        <Nav.Link 
                                            className='FilterListHoverColor' 
                                            eventKey={blood} 
                                            onClick={() => {setFilterBlood(blood)}}
                                        >
                                            <Form.Check 
                                                type='checkbox'
                                                id='default-check'
                                                label={`${blood}`}
                                            />
                                        </Nav.Link>
                                    ),)}
                                    
                                    <Button size='sm mt-2' className='AlignCenter' variant="flat">Filter Result</Button>
                                </div>
                            </DropdownButton>

                            <DropdownButton
                                id="dropdown-autoclose-false"
                                variant="flat" align="end"
                                title={filterCity}
                                style={{paddingLeft:'5px'}}
                            >
                                <div style={{}}>
                                    {cityArray.map((city)=>(
                                        <Nav.Link 
                                            className='FilterListHoverColor' 
                                            eventKey={city} 
                                            onClick={() => {setFilterCity(city)}}
                                        >
                                            <Form.Check 
                                                type='checkbox'
                                                id='default-check'
                                                label={`${city}`}
                                            />
                                        </Nav.Link>
                                    ),)}
                                    
                                    <Button size='sm mt-2' className='AlignCenter' variant="flat">Filter Result</Button>
                                </div>
                            </DropdownButton>

                            <DropdownButton
                                id="dropdown-autoclose-false"
                                variant="flat" align="end"
                                title={filterDistance}
                                style={{paddingLeft:'5px'}}
                            >
                                <div style={{}}>
                                    {distanceArray.map((distance)=>(
                                        <Nav.Link 
                                            className='FilterListHoverColor' 
                                            eventKey={distance} 
                                            onClick={() => {setFilterDistance(distance)}}
                                        >
                                            <Form.Check 
                                                type='checkbox'
                                                id='default-check'
                                                label={`${distance}`}
                                            />
                                        </Nav.Link>
                                    ),)}
                                    
                                    <Button size='sm mt-2' className='AlignCenter' variant="flat">Filter Result</Button>
                                </div>
                            </DropdownButton>

                            <div style={{paddingLeft:'5px'}}>
                                <Button className='' variant="flat" onClick={()=>{setFilterCity('City',setFilterBlood('Blood Group'),setFilterDistance('Any Distance'))}}><Trash className="IcomColor" size={20} /></Button>
                            </div>
                            
                        </p>
                        
                    </Row>
                </Container>
            </div>
        </div>

        <div style={{}}>
            <Container className='d-flex justify-content-center' style={{paddingTop:'0%',paddingBottom:'7%'}}>
                <Row className=''>
                    <div className=''>
                        {numberArray.map(()=>(
                            <Col sm={4}>
                            <Row className="" style={{marginBottom:"10%"}}>
                                <Col sm={12}>
                                    <Card className="UserCard" border="secondary" style={{ width: '70rem' }}>
                                        <Row>
                                            <Col sm={5} style={{marginLeft: '1%',paddingTop: '2%',textAlign:'left'}}>
                                                <Card.Title>
                                                    <h5 className='TextCursive' style={{color:'rgb(116, 10, 10)'}}>Sundas Foundation Blood Donation Centre</h5>
                                                </Card.Title>
                                                <Card.Text>
                                                    <p style={{marginTop:'0%'}}>IKEA, 397 Adelaide Airport SA 5950</p> 
                                                </Card.Text>
                                            </Col>
                                            <Col sm={3} className='d-flex' style={{paddingTop:'3%'}}>
                                                <GeoAltFill className="TextColor" size={25} /><p style={{paddingLeft:'2%'}}>2.3 km away</p>
                                            </Col>
                                            <Col sm={2} className='d-flex' style={{paddingTop:'3%'}}>
                                                <TelephoneOutboundFill className="TextColor" size={22} />
                                                <p style={{paddingLeft:'6%'}}>042 1234567</p>

                                                
                                            </Col>
                                            <Col sm={1} className='d-flex' style={{paddingTop:'3%'}}>
                                            <Nav.Link className='TextColor' style={{paddingLeft:'160%'}}><ChevronRight className="" size={18} /></Nav.Link>
                                            </Col>
                                        </Row>
                                        
                                        <Row style={{backgroundColor:'#f9f2f1',width:'100%',marginLeft:'0%'}}>
                                            <Card.Text>
                                                <p style={{paddingTop:'1%'}}><strong>Opening Days: </strong>Monday to Friday</p> 
                                            </Card.Text>
                                        </Row>
    
                                    </Card>
                                </Col>
                                <Col sm={4}></Col>
                                <Col sm={4}></Col>
                            </Row>
                        </Col>
                        ),)}
                    </div>
                    
                </Row>
            </Container>
        </div>

        

        

        <div style={{marginTop:"6%",marginBottom:"10%"}}>
            <Container>
                <Row>
                    <Col sm={7}>
                        <img src={Image1} width="100%" height="500rem" />
                    </Col>
                    
                    <Col sm={5}>
                        <div style={{paddingTop:"23%",paddingLeft:"20%",textAlign:"left"}}>
                            <h5>Thinking about becoming a blood donor?</h5>
                            <h1 style={{fontWeight:"bold",color:"rgb(160, 15, 15)",fontFamily:"cursive",}}>Make Blood Donation. Give Life gift.</h1>
                            <p className="text-left">Our blood donors might not look or sound alike, but they all share one thing. Together, they’re the Lifeblood of Pakistan. Join us.</p>
                            <Button href='/user/post-blood-request' variant="flatSolid">Make Blood Donation<ArrowRight className="" size={22} /></Button>
                        </div>
                        
                    </Col>
                </Row>
            </Container>
        </div>

        <UserPanelBackToTopButton></UserPanelBackToTopButton>

        <UserPanelFooter></UserPanelFooter>

    </div> );
}
 
export default BloodDonationCentre;