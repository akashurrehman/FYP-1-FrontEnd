import React, { useState } from "react";
import { Container, Button, FormControl } from "react-bootstrap";
import { Form, Row, Col, Card, ListGroup, Nav,Dropdown,DropdownButton,InputGroup,Modal } from "react-bootstrap";
import UserPanelHeader from "../UserPanelHeader";
import UserPanelFooter from "../UserPanelFooter";
import UserPanelBackToTopButton from "../UserPanelBackToTopButton";

import Image1 from "../../../Public/user/image/CoverImage14.jpg";
import { Search,ArrowRight,Trash } from 'react-bootstrap-icons';

import CardImage1 from "../../../Public/user/image/Avatar.JPG";
import AvailableRequestMakersBar from "./AvailableRequestMakersBar";
import requestMakerService from "../../../Services/Api/User/RequestMakerService";
import jwtDecode from "jwt-decode";
import { useAuth } from "../../../Panels/BloodDonationCentre/Auth/AuthContext";

import '../css/style.css';
import SingleRequestMaker from "./SingleRequestMaker";

const RequestMaker = () => {

    //For Filter
    const [filterBlood,setFilterBlood] = React.useState("Blood Group");
    const bloodArray = ['A+','B+','AB+','O+','A-','B-','AB-','O-'];
    const [filterCity,setFilterCity] = React.useState("City");
    const cityArray = ['Lahore','Karachi','Islamabad','Multan','Peshawar'];
    const [filterStatus,setFilterStatus] = React.useState("Blood Requests");
    const statusArray = ['Accepted','Not Accepted'];
    const [filterDate,setFilterDate] = React.useState("Request Makers");
    const dateArray = ['Recent','Day Ago','Week Ago','Month Ago','Year Ago'];
    const [searchTerm, setSearchTerm] = useState('');

    const [requestMakers, setRequestMakers] = React.useState([]);
    const [filteredRequestMakerArray, setFilteredRequestMakersArray] = React.useState([]);

    const {token} = useAuth();
    
    const decodedToken = token ? jwtDecode(token) : null;
    const role = decodedToken?.role;

    // const authCentre=()=>{
    //   if(role!='USER'){
    //     window.location.href = "/user/login";
    //   }
    //     console.log("authCentre");
    // }

    const getData = () => {
        requestMakerService
            .getRequestMakers()
            .then((data) => {
                setRequestMakers(data);
                setFilteredRequestMakersArray(data?.results?.bindings);
            })
            .catch((err) => {
                console.log(err);
            });
    };
    React.useEffect(getData, []);
    console.log(requestMakers.results);



    const filterRequestMakersByBloodGroup = (bloodGroup) => {
        const filteredRequestMakers = requestMakers.results.bindings.filter((requestMaker) => {
            return requestMaker.Blood_Group.value.toLowerCase() === bloodGroup.toLowerCase();
        });
        
        setFilteredRequestMakersArray(filteredRequestMakers);
    };
    const filterRequestMakersByName = (name) => {
        const filteredRequestMakers = requestMakers.results.bindings.filter((requestMaker) => {
            return requestMaker.Name.value.toLowerCase() === name.toLowerCase();
        });
        setFilteredRequestMakersArray(filteredRequestMakers);
    };
    const filterRequestMakersByCity = (city) => {
        const filteredRequestMakers = requestMakers.results.bindings.filter((requestMaker) => {
            return requestMaker.City.value.toLowerCase() === city.toLowerCase();
        });
        setFilteredRequestMakersArray(filteredRequestMakers);
    };
    const filterRequestMakersByStatus = (status) => {
        if(status === 'Not Accepted'){
            const filteredRequestMakers = requestMakers.results.bindings.filter((requestMaker) => {
                return requestMaker.RequestDonatedBy.value.toLowerCase() === 'null';
            });
            setFilteredRequestMakersArray(filteredRequestMakers);
        }
        else{
            const filteredRequestMakers = requestMakers.results.bindings.filter((requestMaker) => {
                return requestMaker.RequestDonatedBy.value.toLowerCase() !== 'null';
            });
            setFilteredRequestMakersArray(filteredRequestMakers);
        }
        
    };

    const setArray = () => {
        setFilteredRequestMakersArray(requestMakers.results.bindings);
    };


    
    //For search bar
    const handleChange = (event) => {
        setSearchTerm(event.target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log(searchTerm);
        if(searchTerm !== '') {
            filterRequestMakersByName(searchTerm);
        }
        else{
            setArray();
        }
        
    };
    

    return ( <div>
        <UserPanelHeader></UserPanelHeader>
        <div style={{marginTop:'9%',marginBottom:'3%'}}>
            <Container style={{textAlign:'center',width:'50%'}}>
                <Row>
                    <h2 className='RedColor' style={{fontWeight:"bold",fontFamily:"cursive",}}>Find a request makers near you</h2>
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
                                placeholder="Search request makers by name ..."
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
                                size='sm'
                                title={filterBlood}
                                style={{paddingLeft:'5px'}}
                            >
                                <div style={{}}>
                                    {bloodArray.map((blood)=>(
                                        
                                        <Nav.Link 
                                            className='FilterListHoverColor' 
                                            eventKey={blood} 
                                            onClick={() => {setFilterBlood(blood);filterRequestMakersByBloodGroup(blood)}}
                                        >
                                            <Form.Text>
                                                {`${blood}`}
                                            </Form.Text>
                                        </Nav.Link>
                                    ),)}
                                    
                                    {/* <Button size='sm mt-2' className='AlignCenter' variant="flat">Filter Result</Button> */}
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
                                            onClick={() => {setFilterCity(city);filterRequestMakersByCity(city)}}
                                        >
                                            <Form.Text>
                                                {`${city}`}
                                            </Form.Text>
                                        </Nav.Link>
                                    ),)}
                                    
                                    {/* <Button size='sm mt-2' className='AlignCenter' variant="flat">Filter Result</Button> */}
                                </div>
                            </DropdownButton>

                            <DropdownButton
                                id="dropdown-autoclose-false dropdown-menu-align-end"
                                variant="flat" align="end"
                                size='sm'
                                title={filterStatus}
                                style={{paddingLeft:'5px'}}
                            >
                                <div style={{}}>
                                    {statusArray.map((status)=>(
                                        
                                        <Nav.Link 
                                            className='FilterListHoverColor' 
                                            eventKey={status} 
                                            onClick={() => {setFilterStatus(status);filterRequestMakersByStatus(status)}}
                                        >
                                            <Form.Text>
                                                {`${status}`}
                                            </Form.Text>
                                        </Nav.Link>
                                    ),)}
                                    
                                    {/* <Button size='sm mt-2' className='AlignCenter' variant="flat">Filter Result</Button> */}
                                </div>
                            </DropdownButton>

                            {/* <DropdownButton
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
                            </DropdownButton> */}

                            <div style={{paddingLeft:'5px'}}>
                                <Button size='sm' variant="flat" onClick={()=>{setFilterCity('City');setFilterBlood('Blood Group');setFilterDate('Request Makers');setArray();}}><Trash className="IcomColor" size={18} /></Button>
                            </div>
                            
                        </p>
                        
                    </Row>
                </Container>
            </div>
        </div>

        <div style={{width:'99.1%'}}>
            {filteredRequestMakerArray.length === 0 ? (
                    <Row className="d-flex justify-content-center m-5">
                        <h4 style={{textAlign:'center'}}>Request Makers are not available</h4>
                    </Row>
                ) : (
                    <Row className="d-flex justify-content-center">
                        {filteredRequestMakerArray.map((requestMaker, index) => (
                            <Col sm={4} key={index}>
                                <SingleRequestMaker key={index} requestMaker={requestMaker} />
                            </Col>
                            
                        ))}
                    </Row>
                )}
        </div>


        <UserPanelFooter></UserPanelFooter>

    </div> );
}
 
export default RequestMaker;