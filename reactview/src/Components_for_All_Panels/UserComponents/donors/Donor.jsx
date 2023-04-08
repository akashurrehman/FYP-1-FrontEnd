import React from "react";
import { Container, Button } from "react-bootstrap";
import { Form, Row, Col, Card, ListGroup, Nav,Dropdown,DropdownButton,InputGroup,Modal } from "react-bootstrap";
import UserPanelHeader from "../UserPanelHeader";
import UserPanelFooter from "../UserPanelFooter";
import UserPanelBackToTopButton from "../UserPanelBackToTopButton";
import Image1 from "../../../Public/user/image/RequestMaker.jpg";
import { Search,ArrowRight,Trash } from 'react-bootstrap-icons';
import CardImage1 from "../../../Public/user/image/Avatar.JPG";

import '../css/style.css';
import AvailableDonorsBar from "./AvailableDonorsBar";
import donorService from "../../../Services/Api/User/DonorService";
import SingleDonor from "./SingleDonor";


const Donor = () => {

    const [donors, setDonors] = React.useState([]);

    const getData = () => {
        donorService
          .getDonors()
          .then((data) => {
            setDonors(data);
          })
          .catch((err) => {
            console.log(err);
          });
    };
    React.useEffect(getData, []);
    console.log(donors.results);


    //For Filter
    const [filterBlood,setFilterBlood] = React.useState("Blood Group");
    const bloodArray = ['A+ Blood','B+ Blood','AB+ Blood','O+ Blood','A- Blood','B- Blood','AB- Blood','O- Blood'];
    const [filterCity,setFilterCity] = React.useState("City");
    const cityArray = ['Lahore','Karachi','Islamabad','Multan','Peshawar'];
    const [filterDate,setFilterDate] = React.useState("Donors");
    const dateArray = ['Recent','Day Ago','Week Ago','Month Ago','Year Ago'];
    
    
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
            {donors.length === 0 ? (
                    <p>There are no Centres</p>
                ) : (
                    <div>
                        {donors.results.bindings.map((donor, index) => (
                            <SingleDonor key={index} donor={donor} />
                        ))}
                    </div>
                )}
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