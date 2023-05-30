import React from "react";
import { Container, Button } from "react-bootstrap";
import { Form, Row, Col, Nav,DropdownButton,InputGroup } from "react-bootstrap";
import UserPanelHeader from "../UserPanelHeader";
import UserPanelFooter from "../UserPanelFooter";
import Image1 from "../../../Public/user/image/CardImage3.jpg";
import { Search,ArrowRight,Trash } from 'react-bootstrap-icons';
import {useAuth} from "./../../../Panels/BloodDonationCentre/Auth/AuthContext"
import jwt_decode from 'jwt-decode';
import '../css/style.css';
import centreService from "../../../Services/Api/User/BloodDonationCentreService";
import SingleBloodDonationCentre from "./SingleBloodDonationCentre";


const BloodDonationCentre = () => {

    //For Filter
    const [filterBlood,setFilterBlood] = React.useState("Blood Group");
    const bloodArray = ['A+ Blood','B+ Blood','AB+ Blood','O+ Blood','A- Blood','B- Blood','AB- Blood','O- Blood'];
    const [filterCity,setFilterCity] = React.useState("City");
    const cityArray = ['Lahore','Karachi','Islamabad','Multan','Peshawar'];
    const [filterDistance,setFilterDistance] = React.useState("Any Distance");
    const distanceArray = ['Within 1km','Within 5km','Within 10km','Within 15km'];
    

    const [centres, setCentres] = React.useState([]);

    //This will get the id  from the token if user is login
    const {token} = useAuth();

    const decodedToken = token ? jwt_decode(token) : null;

    const role = decodedToken?.role;

    //For User Authentications only
    
    const authCentre=()=>{
    if(role!='USER'){
        window.location.href = "/user/login";
    }
        console.log("authCentre");
    }

    const getData = () => {
        centreService
          .getCentres()
          .then((data) => {
            setCentres(data);
          })
          .catch((err) => {
            console.log(err);
          });
    };

    React.useEffect(() =>{
    getData,
    authCentre();
    },[]);

    console.log(centres.results);

    return ( <div>
        <UserPanelHeader></UserPanelHeader>
        <div style={{marginTop:'10%',marginBottom:'4%'}}>
            <Container className='d-flex justify-content-center'>
                <Row>
                    <h2 className='RedColor' style={{fontWeight:"bold",fontFamily:"cursive",}}>Find a blood donation centre near you</h2>
                </Row>
            </Container>
        </div>


        <div style={{borderRadius:'10% 30% 50% 70%',backgroundColor:'#F5F5DC',marginBottom:'0%'}}>
            <div style={{marginTop:'-1%',marginBottom:'0%',paddingTop:'0%',marginBottom:'0%',position:'absolute',width:'100%'}}>
                <Container className='d-flex justify-content-center'>
                    <Row style={{width:'40%'}}>
                        <InputGroup className="mb-1" size='sm'>
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
                                size = 'sm'
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
                                size = 'sm'
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
                                size = 'sm'
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
                                <Button size = 'sm' variant="flat" onClick={()=>{setFilterCity('City',setFilterBlood('Blood Group'),setFilterDistance('Any Distance'))}}><Trash className="IcomColor" size={18} /></Button>
                            </div>
                            
                        </p>
                        
                    </Row>
                </Container>
            </div>
        </div>

        <div style={{}}>
            {centres.length === 0 ? (
                <p>There are no Centres</p>
            ) : (
                <div>
                    {centres.results.bindings.map((centre, index) => (
                        <SingleBloodDonationCentre key={index} centre={centre} />
                    ))}
                </div>
            )}
        </div>

        

        

        <div style={{marginTop:"6%",marginBottom:"10%"}}>
            <Container>
                <Row>
                    <Col sm={7}>
                        <img src={Image1} width="100%" height="450rem" />
                    </Col>
                    
                    <Col sm={5}>
                        <div style={{paddingTop:"23%",paddingLeft:"20%",textAlign:"left"}}>
                            <h5 className="PurpleColor">Thinking about becoming a blood donor?</h5>
                            <h3 className='RedColor' style={{fontWeight:"bold",fontFamily:"cursive",}}>Make Blood Donation. Give Life gift.</h3>
                            <p className="text-left">Our blood donors might not look or sound alike, but they all share one thing. Together, they’re the Lifeblood of Pakistan. Join us.</p>
                            <Button href='/user/make-blood-donation' size='sm' variant="flatSolid">Make Blood Donation<ArrowRight className="" size={20} /></Button>
                        </div>
                        
                    </Col>
                </Row>
            </Container>
        </div>

        <UserPanelFooter></UserPanelFooter>

    </div> );
}
 
export default BloodDonationCentre;