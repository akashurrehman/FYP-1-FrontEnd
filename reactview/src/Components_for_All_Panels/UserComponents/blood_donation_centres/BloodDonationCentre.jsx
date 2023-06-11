import React, { useState } from "react";
import { Container, Button, FormControl } from "react-bootstrap";
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
    const [filterCategory,setFilterCategory] = React.useState("Category");
    const categoryArray = ['Public','Private','Both'];
    const [filterCity,setFilterCity] = React.useState("City");
    const cityArray = ['Lahore','Karachi','Islamabad','Multan','Peshawar'];
    const [filterDistance,setFilterDistance] = React.useState("Any Distance");
    const distanceArray = ['Within 1km','Within 5km','Within 10km','Within 15km'];
    const [searchTerm, setSearchTerm] = useState('');

    const [centres, setCentres] = React.useState([]);
    const [filteredCentreArray, setFilteredCentresArray] = React.useState([]);

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
            setFilteredCentresArray(data?.results?.bindings);
          })
          .catch((err) => {
            console.log(err);
          });
    };

    React.useEffect(() =>{
    getData();
    authCentre();
    },[]);

    console.log(centres.results);


    const filterCentresByCategory = (category) => {
        const filteredCentres = centres.results.bindings.filter((centre) => {
            return centre.Category.value.toLowerCase() === category.toLowerCase();
        });
        
        setFilteredCentresArray(filteredCentres);
    };

    const filterCentresByName = (name) => {
        const filteredCentres = centres.results.bindings.filter((centre) => {
            return centre.Name.value.toLowerCase() === name.toLowerCase();
        });
        setFilteredCentresArray(filteredCentres);
    };

    const filterCentresByCity = (city) => {
        const filteredCentres = centres.results.bindings.filter((centre) => {
            return centre.City.value.toLowerCase() === city.toLowerCase();
        });
        setFilteredCentresArray(filteredCentres);
    };

    const setArray = () => {
        setFilteredCentresArray(centres.results.bindings);
    };


    
    //For search bar
    const handleChange = (event) => {
        setSearchTerm(event.target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log(searchTerm);
        if(searchTerm !== '') {
            filterCentresByName(searchTerm);
        }
        else{
            setArray();
        }
        
    };

    return ( <div>
        <UserPanelHeader></UserPanelHeader>
        <div style={{marginTop:'10%',marginBottom:'4%'}}>
            <Container className='d-flex justify-content-center'>
                <Row>
                    <h2 className='RedColor' style={{fontWeight:"bold",fontFamily:"cursive",}}>Find a blood donation centres near you</h2>
                </Row>
            </Container>
        </div>


        <div style={{borderRadius:'10% 30% 50% 70%',backgroundColor:'#F5F5DC',marginBottom:'0%'}}>
            <div style={{marginTop:'-1%',marginBottom:'0%',paddingTop:'0%',marginBottom:'0%',position:'absolute',width:'100%'}}>
                <Container className='d-flex justify-content-center'>
                    <Row style={{width:'40%'}}>
                    <form onSubmit={handleSubmit}>
                        <InputGroup size="sm" className="mb-1">
                            <FormControl
                                placeholder="Search blood donation centres by name ..."
                                aria-label="Search Blood Donations"
                                aria-describedby="basic-addon2"
                                value={searchTerm}
                                onChange={handleChange}
                            />
                            {/* No submit button */}
                            <input type="submit" style={{ display: 'none' }} />
                            <InputGroup.Text id="basic-addon2">
                            <Search className="m-1 PurpleColor" size={18} />
                            </InputGroup.Text>
                        </InputGroup>
                    </form>
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
                                title={filterCategory}
                                style={{paddingLeft:'5px'}}
                            >
                                <div style={{}}>
                                    {categoryArray.map((category)=>(
                                        
                                        <Nav.Link 
                                            className='FilterListHoverColor' 
                                            eventKey={category} 
                                            onClick={() => {setFilterCategory(category);filterCentresByCategory(category)}}
                                        >
                                            <Form.Text>
                                                {`${category}`}
                                            </Form.Text>
                                        </Nav.Link>
                                    ),)}
                                    
                                    {/* <Button size='sm mt-2' className='AlignCenter' variant="flat">Filter Result</Button> */}
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
                                            onClick={() => {setFilterCity(city);filterCentresByCity(city)}}
                                        >
                                            <Form.Text>
                                                {`${city}`}
                                            </Form.Text>
                                        </Nav.Link>
                                    ),)}
                                    
                                    {/* <Button size='sm mt-2' className='AlignCenter' variant="flat">Filter Result</Button> */}
                                </div>
                            </DropdownButton>

                            {/* <DropdownButton
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
                            </DropdownButton> */}

                            <div style={{paddingLeft:'5px'}}>
                                <Button size = 'sm' variant="flat" onClick={()=>{setFilterCity('City');setFilterCategory('Category');setFilterDistance('Any Distance');setArray();}}><Trash className="IcomColor" size={18} /></Button>
                            </div>
                            
                        </p>
                        
                    </Row>
                </Container>
            </div>
        </div>

        <div style={{}}>
            {filteredCentreArray.length === 0 ? (
                <Row className="d-flex justify-content-center m-5">
                    <h4 style={{textAlign:'center'}}>Blood Donation Centres not found!</h4>
                </Row>
            ) : (
                <div>
                    {filteredCentreArray.map((centre, index) => (
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
                            <p className="text-left">Remember, by becoming a blood donor, you have the opportunity to positively impact countless lives. "Become a Hero: Donate Blood and Save Lives."</p>
                            <Button href='/user/make-blood-donation' size='sm' variant="flatSolid">Make Blood Donation <ArrowRight className="" size={18} /></Button>
                        </div>
                        
                    </Col>
                </Row>
            </Container>
        </div>

        <UserPanelFooter></UserPanelFooter>

    </div> );
}
 
export default BloodDonationCentre;