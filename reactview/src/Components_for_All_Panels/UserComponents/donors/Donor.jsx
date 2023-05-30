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
import { useAuth } from "../../../Panels/BloodDonationCentre/Auth/AuthContext";
import jwtDecode from "jwt-decode";

const Donor = () => {

    const [donors, setDonors] = React.useState([]);

     //Get User ID from token
     const {token} = useAuth();
     const decodedToken = token ? jwtDecode(token) : null;
 
     const role = decodedToken?.role;
 
     const authCentre=()=>{
       if(role!='USER'){
         window.location.href = "/user/login";
       }
         console.log("authCentre");
     }


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
    React.useEffect(getData,authCentre(), []);
    console.log(donors?.results?.bindings?.length);

    

    //For Filter
    const [filterBlood,setFilterBlood] = React.useState("Blood Group");
    const bloodArray = ['A+ Blood','B+ Blood','AB+ Blood','O+ Blood','A- Blood','B- Blood','AB- Blood','O- Blood'];
    const [filterCity,setFilterCity] = React.useState("City");
    const cityArray = ['Lahore','Karachi','Islamabad','Multan','Peshawar'];
    const [filterDate,setFilterDate] = React.useState("Donors");
    const dateArray = ['Recent','Day Ago','Week Ago','Month Ago','Year Ago'];
    
    
    return ( <div>
        <UserPanelHeader></UserPanelHeader>
        <div style={{marginTop:'9%',marginBottom:'3%'}}>
            <Container style={{textAlign:'center',width:'50%'}}>
                <Row>
                    <h2 className='RedColor' style={{fontWeight:"bold",fontFamily:"cursive",}}>Find a available donors near you</h2>
                </Row>
            </Container>
        </div>


        <div style={{borderRadius:'10% 30% 50% 70%',backgroundColor:'#F5F5DC',marginBottom:'0%'}}>
            <div style={{marginTop:'-1%',marginBottom:'0%',paddingTop:'0%',marginBottom:'0%',position:'absolute',width:'100%'}}>
                <Container className='d-flex justify-content-center'>
                    <Row style={{width:'40%'}}>
                        <InputGroup size="sm" className="mb-1">
                            <Form.Control
                                placeholder="Search Blood Donations"
                                aria-label="Search Blood Donations"
                                aria-describedby="basic-addon2"
                            />
                            <InputGroup.Text id="basic-addon2"><Search className="m-1 PurpleColor" size={18} /></InputGroup.Text>
                        </InputGroup>
                    </Row>
                </Container>
            </div>


            <div style={{marginTop:'1%',marginBottom:'1%',paddingBottom:'3%',paddingTop:'3%'}}>
                <Container className='d-flex justify-content-center'>
                    <Row>
                        <p className='d-flex'>
                            <div className='TextCursive PurpleColor' style={{margin:'5px',paddingRight:'2px'}}>Filter by:</div>

                            <DropdownButton
                                id="dropdown-autoclose-false dropdown-menu-align-end"
                                variant="flat" align="end"
                                size='sm'
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
                                                type=''
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
                                size='sm'
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
                                size='sm'
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
                                <Button size='sm' variant="flat" onClick={()=>{setFilterCity('City',setFilterBlood('Blood Group'),setFilterDate('Request Makers'))}}><Trash className="IcomColor" size={18} /></Button>
                            </div>
                            
                        </p>
                        
                    </Row>
                </Container>
            </div>
        </div>

        <div style={{width:'99.1%'}}>
            {donors.length === 0 ? (
                    <p>There are no Centres</p>
                ) : (
                    <Row className="d-flex justify-content-center m-5">
                
                        {donors.results.bindings.map((donor, index) => (
                            <Col sm={4} key={index}>
                                <SingleDonor key={index} donor={donor} />
                            </Col>
                        ))}
                    
                    </Row>
                )}
        </div>
        
        <UserPanelFooter></UserPanelFooter>

    </div> );
}
 
export default Donor;