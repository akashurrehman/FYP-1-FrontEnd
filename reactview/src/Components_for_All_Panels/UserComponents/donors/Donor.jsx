import React from "react";
import { Container, Button } from "react-bootstrap";
import { Form, Row, Col, Card, ListGroup, Nav,Dropdown,DropdownButton,InputGroup,Modal } from "react-bootstrap";
import UserPanelHeader from "../UserPanelHeader";
import UserPanelFooter from "../UserPanelFooter";
import UserPanelBackToTopButton from "../UserPanelBackToTopButton";
import Image1 from "../../../Public/user/image/RequestMaker.jpg";
import { Search,ArrowRight,Trash } from 'react-bootstrap-icons';
import CardImage1 from "../../../Public/user/image/Avatar.JPG";

import AvailableDonorsBar from "./AvailableDonorsBar";


const Donor = () => {

    //For Filter
    const [filterBlood,setFilterBlood] = React.useState("Blood Group");
    const bloodArray = ['A+ Blood','B+ Blood','AB+ Blood','O+ Blood','A- Blood','B- Blood','AB- Blood','O- Blood'];
    const [filterCity,setFilterCity] = React.useState("City");
    const cityArray = ['Lahore','Karachi','Islamabad','Multan','Peshawar'];
    const [filterDate,setFilterDate] = React.useState("Donors");
    const dateArray = ['Recent','Day Ago','Week Ago','Month Ago','Year Ago'];
    
    const numberArray = ['1','2','3'];

    //For Modal
    const [show, setShow] = React.useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return ( <div>
        <UserPanelHeader></UserPanelHeader>
        <div style={{marginTop:'10%',marginBottom:'4%'}}>
            <Container className='d-flex justify-content-center'>
                <Row>
                    <h1 style={{fontWeight:"bold",color:"rgb(160, 15, 15)",fontFamily:"cursive",}}>Find a available donors near you</h1>
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
                                variant="flat"
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
                                variant="flat"
                                title={filterDate}
                                style={{paddingLeft:'5px'}}
                            >
                                <div style={{}}>
                                    {dateArray.map((date)=>(
                                        <Nav.Link 
                                            className='FilterListHoverColor' 
                                            eventKey={date} 
                                            onClick={() => {setFilterDate(date)}}
                                        >
                                            <Form.Check 
                                                type='checkbox'
                                                id='default-check'
                                                label={`${date}`}
                                            />
                                        </Nav.Link>
                                    ),)}
                                    
                                    <Button size='sm mt-2' className='AlignCenter' variant="flat">Filter Result</Button>
                                </div>
                            </DropdownButton>

                            <div style={{paddingLeft:'5px'}}>
                                <Button className='' variant="flat" onClick={()=>{setFilterCity('City',setFilterBlood('Blood Group'),setFilterDate('Request Makers'))}}><Trash className="IcomColor" size={20} /></Button>
                            </div>
                            
                        </p>
                        
                    </Row>
                </Container>
            </div>
        </div>

        <div style={{}}>
            <Container className='d-flex justify-content-center' style={{paddingTop:'0%',paddingBottom:'7%'}}>
                <Row className=''>
                    <div className='d-flex'>
                        {numberArray.map(()=>(
                            <Col sm={4}>
                            <Row className="" style={{marginBottom:"10%"}}>
                                <Col sm={12}>
                                    <Card className="UserCard" border="secondary" style={{ width: '22rem' }}>
                                        <Row>
                                            <Col sm={8} style={{paddingLeft: '7%',paddingTop: '9%',textAlign:'left'}}>
                                                <Card.Title><h3 className='TextCursive' style={{color:'rgb(116, 10, 10)'}}>Ahmad</h3></Card.Title>
                                            </Col>
                                            <Col className='' sm={3} style={{marginRight:'0%',marginTop: '3%'}}>
                                                <Card.Img className="" variant="top" src={CardImage1} width="0%" height="65rem" style={{borderRadius:'60%',border: "solid rgb(116, 10, 10)"}}/>
                                                
                                            </Col>
                                        </Row>
                                        <Card.Body>
                                            <Card.Text>
                                                <p style={{marginTop:'-6%'}}><strong className='TextCursive'>Donated by: </strong>Muhammad Ahmad</p>
                                                <p style={{marginTop:'-5%'}}><strong className='TextCursive'>Blood Group: </strong>AB +ve</p>
                                                <p style={{marginTop:'-5%'}}><strong className='TextCursive'>Donated on: </strong>December 1,2000</p>
                                                <p style={{marginTop:'-5%'}}><strong className='TextCursive'>City: </strong>Lahore</p>
                                            </Card.Text>
                                            
                                            <Nav.Link className='d-flex justify-content-end TextColor' style={{marginTop:'-3%'}} onClick={handleShow}>View Details <ArrowRight className="m-1" size={18} /></Nav.Link>
                                        
    
                                        </Card.Body>
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

        <div>
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
        </div>

        <AvailableDonorsBar></AvailableDonorsBar>

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
 
export default Donor;