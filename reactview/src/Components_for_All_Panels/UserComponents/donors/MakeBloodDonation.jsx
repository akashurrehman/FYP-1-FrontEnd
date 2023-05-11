import React from "react";
import { Container, Button, Image } from "react-bootstrap";
import { Form, Row, Col, InputGroup, FloatingLabel } from "react-bootstrap";
import UserPanelHeader from "../UserPanelHeader";
import UserPanelFooter from "../UserPanelFooter";
import image from '../../../Public/user/image/CoverImage1.jpg';
import { Envelope,PersonAdd, Hospital,Phone,Chat,Droplet,ArrowRight, HouseDoor, GeoAlt,Telephone } from 'react-bootstrap-icons';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

import AccountCircle from '@mui/icons-material/PersonSharp';
import EmailIcon from '@mui/icons-material/EmailSharp';
import LocalHospitalIcon from '@mui/icons-material/LocalPharmacySharp';
import BloodtypeSharpIcon from '@mui/icons-material/BloodtypeSharp';
import LocationOnSharpIcon from '@mui/icons-material/LocationOnSharp';
import ContactsSharpIcon from '@mui/icons-material/ContactsSharp';
import LocationCitySharpIcon from '@mui/icons-material/LocationCitySharp';
import ChatSharpIcon from '@mui/icons-material/ChatSharp';
import WcSharpIcon from '@mui/icons-material/WcSharp';

import '../css/style.css';
import donorService from "../../../Services/Api/User/DonorService";
import AvailableDonorsBar from "./AvailableDonorsBar";
import jwtDecode from "jwt-decode";
import CongratulationBox from "../CongratulationBox";

const MakeBloodDonation = () => {

    //Get id from token 
    const token = localStorage.getItem('token');
    const decodedToken = jwtDecode(token);
    const id = decodedToken?.id;
    console.log(id);

    const [name, setName] = React.useState("");
    const [email, setEmail] = React.useState("");
    const [contactNo, setContactNo] = React.useState("");
    const [location, setLocation] = React.useState("");
    const [bloodGroup, setBloodGroup] = React.useState("");
    const [gender, setGender] = React.useState("");
    const [city, setCity] = React.useState("");
    const [message, setMessage] = React.useState("");

    //Form Validation
    const [validated, setValidated] = React.useState(false);
    const handleSubmit = (event) => {
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
        }
        else {
            storeData();
            event.preventDefault();
            setShowCongratulationBox(true);
        }
        setValidated(true);
    };

    //Store Data In Database(API)
    const storeData = () => {
        console.log("Send API call");
        donorService
            .addDonor({ id, name, message, email, location, contactNo, bloodGroup, gender, city })
            .then((data) => {
                console.log(data);
                
            })
            .catch((err) => {
                console.log(err);
        });
    };

    const [showCongratulationBox, setShowCongratulationBox] = React.useState(false);

    const handleChange = (event) => {
        setBloodGroup(event.target.value);
    };

    //Button Stylings
    const [isHover, setIsHover] = React.useState(true);
    const handleMouseEnter = () => {
        setIsHover(false);
    };
    const handleMouseLeave = () => {
        setIsHover(true);
    };
    const ButtonStyle = {
        backgroundColor: isHover ? 'rgb(160, 15, 15)' : 'white',
        color: isHover ? 'white' : 'rgb(160, 15, 15)',
        transform: isHover ? 'scale(0.84)' : 'scale(0.84)',
        border: isHover ? '' : '1px solid rgb(160, 15, 15)',
        transitionDuration: isHover ? '' : '0.1s',
    };
    
    return ( <div>
        <UserPanelHeader></UserPanelHeader>

        <div style={{position: "relative"}}>
            <div>
                <Image src={image} rounded style={{marginLeft: "51.3%",marginTop:'3.9%',height: "40%",opacity:'0.75'}}></Image>
            </div>

            <div 
                style={{position: "absolute",
                    bottom: "20%",left: "3%",top: "25%",
                    backgroundColor: "white",color: "",
                    height: "90%",
                    marginLeft: "20px",textAlign: "center",
                    width:"55%",fontFamily: "Arial",opacity: "1"
            }}>
                <Container>
                    <Row className='mt-0 mb-5 p-1'>
                        <Col sm={12} className='LoginContainerCol'>
                            <h4 className="TextColor" style={{fontFamily:'cursive'}}>Make Blood Donation</h4>
                            <p className="justify-content mb-3 mt-3" style={{fontSize:'13.5px',color:'gray'}}>
                                "Dear Donor!", your information is valuable to us.
                                When you fill out this form, the system will create your blood donation. 
                                With your name and other details; you can view your posted blood requests!
                            </p>
                            <Form noValidate validated={validated} onSubmit={handleSubmit}>
                                <Row>
                                    <Col sm={6}>
                                        <InputGroup size="sm" className="mb-3" hasValidation>
                                            <InputGroup.Text id="inputGroup-sizing-default">
                                                <AccountCircle sx={{ color: 'action.active', mr:0 , my: 0 }}/>
                                            </InputGroup.Text>
                                            <Form.Control
                                                required
                                                aria-label="Default"
                                                aria-describedby="inputGroup-sizing-default" type="text" placeholder="Full Name*" 
                                                value={name}
                                                onChange={(e) => {
                                                    setName(e.target.value);
                                                }}
                                            />
                                            <Form.Control.Feedback type="invalid">
                                                Please provide a valid name.
                                            </Form.Control.Feedback>
                                        </InputGroup>
                                    </Col>
                                
                                    <Col sm={6}>
                                        <InputGroup size="sm" className="mb-3" hasValidation>
                                            <InputGroup.Text id="inputGroup-sizing-default">
                                                <BloodtypeSharpIcon sx={{ color: 'action.active', mr:0 , my: 0 }}/>
                                            </InputGroup.Text>
                                            
                                            <Form.Select required 
                                                value={bloodGroup} 
                                                onChange={(e) => setBloodGroup(e.target.value)}
                                            >
                                                <option value="">Select Blood Group*</option>
                                                <option value="A+">A+</option>
                                                <option value="B+">B+</option>
                                                <option value="AB+">AB+</option>
                                                <option value="A-">A-</option>
                                                <option value="B-">B-</option>
                                                <option value="AB-">AB-</option>
                                            </Form.Select>
                                            <Form.Control.Feedback type="invalid">
                                                Please provide a valid blood group.
                                            </Form.Control.Feedback>
                                            
                                        </InputGroup>
                                    </Col>
                                    
                                </Row>
                                <Row>
                                    <Col sm={6}>
                                    <InputGroup size="sm" className="mb-3" hasValidation>
                                            <InputGroup.Text id="inputGroup-sizing-default">
                                                <WcSharpIcon sx={{ color: 'action.active', mr:0 , my: 0 }}/>
                                            </InputGroup.Text>
                                            
                                            <Form.Select required 
                                                value={gender} 
                                                onChange={(e) => setGender(e.target.value)}
                                            >
                                                <option value="">Gender*</option>
                                                <option value="Male">Male</option>
                                                <option value="Female">Female</option>
                                                <option value="Other">Other</option>
                                            </Form.Select> 
                                            <Form.Control.Feedback type="invalid">
                                                Please provide a valid gender.
                                            </Form.Control.Feedback>
                                            
                                        </InputGroup>
                                    </Col>
                                    <Col sm={6}>
                                        <InputGroup size="sm" className="mb-3" hasValidation>
                                            <InputGroup.Text id="inputGroup-sizing-default">
                                                <LocationCitySharpIcon sx={{ color: 'action.active', mr:0 , my: 0 }}/>
                                            </InputGroup.Text>
                                            <Form.Select required
                                                value={city} 
                                                onChange={(e) => setCity(e.target.value)}
                                            >
                                                <option value="">Select City*</option>
                                                <option value="Lahore">Lahore</option>
                                                <option value="Islamabad">Islamabad</option>
                                                <option value="Karachi">Karachi</option>
                                            </Form.Select>

                                            <Form.Control.Feedback type="invalid">
                                                Please provide a valid city.
                                            </Form.Control.Feedback>
                                        </InputGroup>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col sm={6}>
                                        <InputGroup size="sm" className="mb-3" hasValidation>
                                            <InputGroup.Text id="inputGroup-sizing-default">
                                                <EmailIcon sx={{ color: 'action.active', mr:0 , my: 0 }}/>
                                            </InputGroup.Text>
                                            <Form.Control
                                                required
                                                aria-label="Default"
                                                aria-describedby="inputGroup-sizing-default" type="email" placeholder="Email*" 
                                                value={email}
                                                onChange={(e) => {
                                                    setEmail(e.target.value);
                                                }}
                                            />
                                            <Form.Control.Feedback type="invalid">
                                                Please provide a valid email address.
                                            </Form.Control.Feedback>
                                        </InputGroup>
                                    </Col>
                                    <Col sm={6}>
                                        <InputGroup size="sm" className="mb-3" hasValidation>
                                            <InputGroup.Text id="inputGroup-sizing-default">
                                                <ContactsSharpIcon sx={{ color: 'action.active', mr:0 , my: 0 }}/>
                                            </InputGroup.Text>
                                            <Form.Control
                                                required
                                                aria-label="Default"
                                                aria-describedby="inputGroup-sizing-default" type="number" placeholder="Contact Number*" 
                                                value={contactNo}
                                                onChange={(e) => {
                                                    setContactNo(e.target.value);
                                                }}
                                            />
                                            <Form.Control.Feedback type="invalid">
                                                Please provide a valid contact number.
                                            </Form.Control.Feedback>
                                        </InputGroup>
                                    </Col>
                                </Row>
                                
                                <Row>
                                    <Col sm={12}>
                                        <InputGroup size="sm" className="mb-3" hasValidation>
                                            <InputGroup.Text id="inputGroup-sizing-default">
                                                <LocationOnSharpIcon sx={{ color: 'action.active', mr:0 , my: 0 }}/>
                                            </InputGroup.Text>
                                            <Form.Control
                                                required
                                                aria-label="Default" 
                                                aria-describedby="inputGroup-sizing-default" type="text" placeholder="Location*" 
                                                value={location}
                                                onChange={(e) => {
                                                    setLocation(e.target.value);
                                                }}
                                            />
                                            <Form.Control.Feedback type="invalid">
                                                Please provide a valid location/address.
                                            </Form.Control.Feedback>
                                        </InputGroup>
                                    </Col>
                                </Row>
                                
                                <Row>
                                    <Col sm={12}>
                                        <InputGroup size="sm" className="mb-3" hasValidation>
                                            <InputGroup.Text id="inputGroup-sizing-default">
                                                <ChatSharpIcon sx={{ color: 'action.active', mr:0 , my: 0 }}/>
                                            </InputGroup.Text>
                                            <Form.Control
                                                aria-label="Default" as="textarea" rows={2} 
                                                aria-describedby="inputGroup-sizing-default" type="text" placeholder="Message" 
                                                value={message}
                                                onChange={(e) => {
                                                    setMessage(e.target.value);
                                                }}
                                            />
                                            <Form.Control.Feedback type="invalid">
                                                
                                            </Form.Control.Feedback>
                                        </InputGroup>
                                    </Col>
                                </Row>
                                <Row className="mt-2" style={{textAlign:'right'}}>
                                    <Col sm={12}>
                                    <Button variant="default" type='submit' style={ButtonStyle} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} 
                                    >Make Donation <ArrowRight className="" size={17} /></Button>
                                    </Col>
                                </Row>
                            </Form>
                        </Col>
                    </Row>
                </Container>
            </div>
            <div>
                {showCongratulationBox && (
                    <CongratulationBox
                    message="Congratulation! Your blood donation made successfully."
                    thirdButtonText="My Donations"
                    secondButtonText="Make Appointment"
                    firstButtonText="Home Page"
                    firstButton={() => {window.location.href = "/userpanel/HomeScreen";}}
                    secondButton={() => {window.location.href = "/user/blood-donation-centre";}}
                    thirdButton={() => {window.location.href = "/user/my-account";}}
                    onCancel={()=>{setShowCongratulationBox(false);}}
                    margin="25%"
                    />
                )}
            </div>
        </div>

        <div style={{marginLeft:'50%',marginTop:'3%'}}>
            <AvailableDonorsBar ></AvailableDonorsBar>
        </div>
        
        <div style={{textAlign:'right',marginTop:'5%',color:'rgb(160, 15, 15)',marginBottom:'0%'}}>
            
        </div>
    
        
        <UserPanelFooter></UserPanelFooter>
    </div> );
}

export default MakeBloodDonation;