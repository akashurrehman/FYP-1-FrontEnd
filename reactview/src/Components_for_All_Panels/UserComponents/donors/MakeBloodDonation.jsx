import React, { useEffect } from "react";
import { Container, Button, Image } from "react-bootstrap";
import { Form, Row, Col, InputGroup, FloatingLabel } from "react-bootstrap";
import UserPanelHeader from "../UserPanelHeader";
import UserPanelFooter from "../UserPanelFooter";
import image from '../../../Public/user/image/post-blood-request.jpg';
import 'react-circular-progressbar/dist/styles.css';
import image_make_blood_donation from '../../../Public/user/image/make-blood-donation-menu.png';

import AccountCircle from '@mui/icons-material/PersonSharp';
import EmailIcon from '@mui/icons-material/EmailSharp';
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
import { useAuth } from "../../../Panels/BloodDonationCentre/Auth/AuthContext";
import userService from "../../../Services/Api/User/UserService";

const MakeBloodDonation = () => {

    //Get id from token 
    const {token} = useAuth();
    const decodedToken = token ? jwtDecode(token) : null;

    const role = decodedToken?.role;

    const authCentre=()=>{
      if(role!='USER'){
        window.location.href = "/user/login";
      }
        console.log("authCentre");
    }
  
    const id = decodedToken?.id;

    React.useEffect(() =>{
        getData();
        authCentre();
    },[]);

    const [name, setName] = React.useState("");
    const [email, setEmail] = React.useState("");
    const [contactNo, setContactNo] = React.useState("");
    const [location, setLocation] = React.useState("");
    const [bloodGroup, setBloodGroup] = React.useState("");
    const [gender, setGender] = React.useState("");
    const [city, setCity] = React.useState("");
    const [message, setMessage] = React.useState("");


    const getData = () => {
        userService
            .getSingleUser(id)
            .then((data) => {
                setName(data?.results?.bindings?.[0]?.Name?.value);
                setBloodGroup(data?.results?.bindings?.[0]?.BloodGroup?.value);
                setGender(data?.results?.bindings?.[0]?.Gender?.value);
                setCity(data?.results?.bindings?.[0]?.City?.value);
                setContactNo(data?.results?.bindings?.[0]?.ContactNo?.value);
                setEmail(data?.results?.bindings?.[0]?.Email?.value);
                setLocation(data?.results?.bindings?.[0]?.Address?.value);
            })
            .catch((err) => {
                console.log(err);
        });
    };

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
        let latitude;
        let longitude;
        if(city === 'Lahore'){
            latitude = '31.582045';
            longitude = '74.329376';
        }

        console.log(id, name, message, email, location, contactNo, bloodGroup, gender, city, latitude, longitude);
        donorService
            .addDonor({ id, name, message, email, location, contactNo, bloodGroup, gender, city, latitude, longitude })
            .then((data) => {
                console.log(data);
                
            })
            .catch((err) => {
                console.log(err);
        });
    };

    
    const [showCongratulationBox, setShowCongratulationBox] = React.useState(false);

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

    const contactNoRegex = /^\+92 \d{3} \d{7}$/;
    
    const handleContactNoChange = (e) => {
        const inputContactNo = e.target.value;
        const formattedContactNo = formatContactNo(inputContactNo);
        setContactNo(formattedContactNo);
    };

    const formatContactNo = (inputContactNo) => {
        // Remove any non-digit characters from the input
        const digitsOnly = inputContactNo.replace(/\D/g, '');

        // Apply the desired format: "+92 XXX XXXXXXX"
        let formattedContactNo = '+';

        // Add the first three digits
        if (digitsOnly.length > 0) {
        formattedContactNo += digitsOnly.substring(0, 2);
        }

        // Add a space after the third digit
        if (digitsOnly.length >= 2) {
        formattedContactNo += ' ';
        }

        // Add the next three digits
        if (digitsOnly.length > 2) {
        formattedContactNo += digitsOnly.substring(2, 5);
        }

        // Add a space after the sixth digit
        if (digitsOnly.length >= 5) {
        formattedContactNo += ' ';
        }

        // Add the remaining digits
        if (digitsOnly.length > 5) {
        formattedContactNo += digitsOnly.substring(5);
        }

        return formattedContactNo;
    };

    
    return ( <div> 

        <UserPanelHeader></UserPanelHeader>

        <div>
            <Row style={{width:"100%"}}>
                <Col sm={4}>
                    <div>
                        <Image src={image} rounded style={{marginLeft: "3%",marginTop:'30%',height: "23rem",opacity:'1.0'}}></Image>
                    </div>
                    <div style={{marginLeft:'35%',marginTop:'3%',textAlign:"center",width:'55%',transform:'scale(0.85)'}}>
                        
                        <AvailableDonorsBar></AvailableDonorsBar>
                        
                    </div>
                </Col>
                <Col sm={8}>
                    <div 
                        style={{width:'85%', marginLeft:'13%',marginTop:'15%',textAlign:'center'
                    }}>
                        <Container>
                            <Row className='mt-0 mb-5 p-1'>
                                <Col sm={12} className='LoginContainerCol'>
                                <Image src={image_make_blood_donation} rounded style={{marginTop: "-13%",marginBottom:'0%',height: "4rem",opacity:'1.0'}}></Image>
                                    <h4 className="RedColor" style={{marginTop:'-2%'}}>Make Blood Donation</h4>
                                    <p className="justify-content mb-3 mt-0" style={{fontSize:'13.5px',color:'gray',fontFamily:'cursive'}}>
                                    "Dear Donor!", your information is valuable to us.
                                        When you fill out this form, the system will create your blood donation. 
                                        With your name and other details; you can view your blood donors!
                                    </p>
                                    <Form noValidate validated={validated} onSubmit={handleSubmit}>
                                        <Row>
                                            <Col sm={6}>
                                                <div style={{textAlign:'left',marginBottom:'-2%'}}>
                                                    <Form.Label className='PurpleColor'>Full Name <spam className='RedColor'>*</spam></Form.Label>
                                                </div>
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
                                            <div style={{textAlign:'left',marginBottom:'-2%'}}>
                                                <Form.Label className='PurpleColor'>Blood Group <spam className='RedColor'>*</spam></Form.Label>
                                            </div>
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
                                                        <option value="O+">O+</option>
                                                        <option value="AB+">AB+</option>
                                                        <option value="A-">A-</option>
                                                        <option value="B-">B-</option>
                                                        <option value="O-">O-</option>
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
                                            <div style={{textAlign:'left',marginBottom:'-2%'}}>
                                                <Form.Label className='PurpleColor'>Gender <spam className='RedColor'>*</spam></Form.Label>
                                            </div>
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
                                            <div style={{textAlign:'left',marginBottom:'-2%'}}>
                                                <Form.Label className='PurpleColor'>City <spam className='RedColor'>*</spam></Form.Label>
                                            </div>
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
                                            <div style={{textAlign:'left',marginBottom:'-2%'}}>
                                                <Form.Label className='PurpleColor'>Email Address<spam className='RedColor'>*</spam></Form.Label>
                                            </div>
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
                                            <div style={{textAlign:'left',marginBottom:'-2%'}}>
                                                <Form.Label className='PurpleColor'>Contact No <spam className='RedColor'>*</spam></Form.Label>
                                            </div>
                                                <InputGroup size="sm" className="mb-3" hasValidation>
                                                    <InputGroup.Text id="inputGroup-sizing-default">
                                                        <ContactsSharpIcon sx={{ color: 'action.active', mr:0 , my: 0 }}/>
                                                    </InputGroup.Text>
                                                    <Form.Control
                                                        required
                                                        aria-label="Default"
                                                        aria-describedby="inputGroup-sizing-default" type="text" placeholder="Enter contact no* (+92 XXX XXXXXXX)" 
                                                        value={contactNo}
                                                        onChange={handleContactNoChange}
                                                    />
                                                    <Form.Control.Feedback type="invalid">
                                                        Please provide a valid contact number.
                                                    </Form.Control.Feedback>
                                                </InputGroup>
                                            </Col>
                                        </Row>

                                        <Row>
                                            <Col sm={12}>
                                            <div style={{textAlign:'left',marginBottom:'-1%'}}>
                                                <Form.Label className='PurpleColor'>Address <spam className='RedColor'>*</spam></Form.Label>
                                            </div>
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
                                            <div style={{textAlign:'left',marginBottom:'-1%'}}>
                                                <Form.Label className='PurpleColor'>Important message for available blood donors <spam className='RedColor'>*</spam></Form.Label>
                                            </div>
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
                                            >MAKE BLOOD DONATION</Button>
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

                </Col>
                
            </Row>
            
            

        </div>

        <UserPanelFooter></UserPanelFooter>













        {/* <UserPanelHeader></UserPanelHeader>

        <div style={{position: "relative"}}>
            <div>
                <Image src={image} style={{marginLeft: "51.5%",marginTop:'3.9%',height: "40%",opacity:'1'}}></Image>
            </div>

            <div 
                style={{position: "absolute",
                    bottom: "20%",left: "3%",top: "30%",
                    backgroundColor: "white",color: "",
                    height: "90%",
                    marginLeft: "20px",textAlign: "center",
                    width:"55%",fontFamily: "Arial",opacity: "1"
            }}>
                <Container>
                    <Row className='mt-0 mb-5 p-1'>
                        <Col sm={12} className='LoginContainerCol'>
                        <Image src={image_make_blood_donation} rounded style={{marginTop: "-8%",marginBottom:'2%',height: "4rem",opacity:'1.0'}}></Image>
                            <h4 className="RedColor" style={{fontFamily:'cursive'}}>Make Blood Donation</h4>
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
                                                <option value="O+">O+</option>
                                                <option value="AB+">AB+</option>
                                                <option value="A-">A-</option>
                                                <option value="B-">B-</option>
                                                <option value="O-">O-</option>
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
                                <Row className="mt-2" style={{textAlign:'left'}}>
                                    <Col sm={12}>
                                    <Button variant="default" type='submit' style={ButtonStyle} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} 
                                    >Make Donation</Button>
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

        <div style={{marginLeft:'65%',marginTop:'3%'}}>
            <AvailableDonorsBar ></AvailableDonorsBar>
        </div>
        
        <div style={{textAlign:'right',marginTop:'5%',color:'rgb(160, 15, 15)',marginBottom:'0%'}}>
            
        </div>
    
        
        <UserPanelFooter></UserPanelFooter> */}
    </div> );
}

export default MakeBloodDonation;