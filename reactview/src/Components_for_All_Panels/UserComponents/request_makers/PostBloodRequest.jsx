import React, { useEffect } from "react";
import { Container, Button, Image } from "react-bootstrap";
import { Form, Row, Col, InputGroup } from "react-bootstrap";
import UserPanelHeader from "../UserPanelHeader";
import UserPanelFooter from "../UserPanelFooter";
import image from '../../../Public/user/image/post-blood-request.jpg';
import { ArrowRight } from 'react-bootstrap-icons';
import image_post_blood_request from '../../../Public/user/image/post-blood-request-menu.png';

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
import requestMakerService from "../../../Services/Api/User/RequestMakerService";
import AvailableRequestMakersBar from "./AvailableRequestMakersBar";
import jwtDecode from "jwt-decode";
import CongratulationBox from "../CongratulationBox";
import { useAuth } from "../../../Panels/BloodDonationCentre/Auth/AuthContext";

const PostBloodRequest = () => {

    //Get id from token 
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
    const id = decodedToken?.id;

    useEffect(()=>{authCentre();}, []);

    const [name, setName] = React.useState("");
    const [email, setEmail] = React.useState("");
    const [hospital, setHospital] = React.useState("");
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
        
        requestMakerService
            .addRequestMaker({ id,name, message, email, location, contactNo, hospital, bloodGroup, gender, city })
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
    
    return ( <div>


<UserPanelHeader></UserPanelHeader>

<div>
    <Row style={{width:"100%"}}>
        <Col sm={4}>
            <div>
                <Image src={image} rounded style={{marginLeft: "3%",marginTop:'30%',height: "23rem",opacity:'1.0'}}></Image>
            </div>
            <div style={{marginLeft:'35%',marginTop:'3%',textAlign:"center",width:'55%',transform:'scale(0.85)'}}>
                
                <AvailableRequestMakersBar></AvailableRequestMakersBar>
                
            </div>
        </Col>
        <Col sm={8}>
            <div 
                style={{width:'85%', marginLeft:'13%',marginTop:'15%',textAlign:'center'
            }}>
                <Container>
                    <Row className='mt-0 mb-5 p-1'>
                        <Col sm={12} className='LoginContainerCol'>
                        <Image src={image_post_blood_request} rounded style={{marginTop: "-13%",marginBottom:'0%',height: "4rem",opacity:'1.0'}}></Image>
                            <h4 className="RedColor" style={{marginTop:'-2%'}}>Post Blood Request</h4>
                            <p className="justify-content mb-3 mt-0" style={{fontSize:'13.5px',color:'gray',fontFamily:'cursive'}}>
                                "Dear Request Maker!", your information is valuable to us.
                                When you fill out this form, the system will create your blood request. 
                                With your name and other details; you can view your posted blood requests!
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
                                                aria-describedby="inputGroup-sizing-default" type="text" placeholder="Please provide full name" 
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
                                        <Form.Label className='PurpleColor'>Email <spam className='RedColor'>*</spam></Form.Label>
                                    </div>
                                        <InputGroup size="sm" className="mb-3" hasValidation>
                                            <InputGroup.Text id="inputGroup-sizing-default">
                                                <EmailIcon sx={{ color: 'action.active', mr:0 , my: 0 }}/>
                                            </InputGroup.Text>
                                            <Form.Control
                                                required
                                                aria-label="Default"
                                                aria-describedby="inputGroup-sizing-default" type="email" placeholder="Please provide email" 
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
                                </Row>
                                <Row>
                                    <Col sm={6}>
                                    <div style={{textAlign:'left',marginBottom:'-2%'}}>
                                        <Form.Label className='PurpleColor'>Hospital Where Blood Needed <spam className='RedColor'>*</spam></Form.Label>
                                    </div>
                                        <InputGroup size="sm" className="mb-3" hasValidation>
                                            <InputGroup.Text id="inputGroup-sizing-default">
                                                <LocalHospitalIcon sx={{ color: 'action.active', mr:0 , my: 0 }}/>
                                            </InputGroup.Text>
                                            <Form.Control
                                                not-required
                                                aria-label="Default"
                                                aria-describedby="inputGroup-sizing-default" type="text" placeholder="Hospital / Blood Donation Centre name" 
                                                value={hospital}
                                                onChange={(e) => {
                                                    setHospital(e.target.value);
                                                }}
                                            />
                                            <Form.Control.Feedback type="invalid">
                                                
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
                                                aria-describedby="inputGroup-sizing-default" type="number" placeholder="Please provide contact no" 
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
                                    <div style={{textAlign:'left',marginBottom:'-1%'}}>
                                        <Form.Label className='PurpleColor'>Location <spam className='RedColor'>*</spam></Form.Label>
                                    </div>
                                        <InputGroup size="sm" className="mb-3" hasValidation>
                                            <InputGroup.Text id="inputGroup-sizing-default">
                                                <LocationOnSharpIcon sx={{ color: 'action.active', mr:0 , my: 0 }}/>
                                            </InputGroup.Text>
                                            <Form.Control
                                                required
                                                aria-label="Default" 
                                                aria-describedby="inputGroup-sizing-default" type="text" placeholder="Please provide location" 
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
                                    <Col sm={5}>
                                    <div style={{textAlign:'left',marginBottom:'-2%'}}>
                                        <Form.Label className='PurpleColor'>Required Blood Group <spam className='RedColor'>*</spam></Form.Label>
                                    </div>
                                        <InputGroup size="sm" className="mb-3" hasValidation>
                                            <InputGroup.Text id="inputGroup-sizing-default">
                                                <BloodtypeSharpIcon sx={{ color: 'action.active', mr:0 , my: 0 }}/>
                                            </InputGroup.Text>
                                            
                                            <Form.Select required 
                                                value={bloodGroup} 
                                                onChange={(e) => setBloodGroup(e.target.value)}
                                            >
                                                <option value="">Select Blood Group</option>
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
                                    <Col sm={3}>
                                    <div style={{textAlign:'left',marginBottom:'-2%'}}>
                                        <Form.Label className='PurpleColor'>Patient Gender <spam className='RedColor'>*</spam></Form.Label>
                                    </div>
                                        <InputGroup size="sm" className="mb-3" hasValidation>
                                            <InputGroup.Text id="inputGroup-sizing-default">
                                                <WcSharpIcon sx={{ color: 'action.active', mr:0 , my: 0 }}/>
                                            </InputGroup.Text>
                                            
                                            <Form.Select required 
                                                value={gender} 
                                                onChange={(e) => setGender(e.target.value)}
                                            >
                                                <option value="">Gender</option>
                                                <option value="Male">Male</option>
                                                <option value="Female">Female</option>
                                                <option value="Other">Other</option>
                                            </Form.Select> 
                                            <Form.Control.Feedback type="invalid">
                                                Please provide a valid gender.
                                            </Form.Control.Feedback>
                                            
                                        </InputGroup>
                                    </Col>
                                    <Col sm={4}>
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
                                                <option value="">Select City</option>
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
                                    >POST BLOOD REQUEST</Button>
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
                    message="Congratulation! Your blood request posted successfully."
                    thirdButtonText="View All Requests"
                    secondButtonText="My Requests"
                    firstButtonText="Home Page"
                    firstButton={() => {window.location.href = "/userpanel/HomeScreen";}}
                    secondButton={() => {window.location.href = "/user/my-account";}}
                    thirdButton={() => {window.location.href = "/user/request-maker";}}
                    onCancel={()=>{setShowCongratulationBox(false);}}
                    margin="29%"
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
                <Image src={image} rounded style={{marginLeft: "48.5%",marginTop:'3.9%',height: "40%",opacity:'1.0'}}></Image>
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
                        <Image src={image_post_blood_request} rounded style={{marginTop: "-8%",marginBottom:'2%',height: "4rem",opacity:'1.0'}}></Image>
                            <h4 className="RedColor" style={{fontFamily:'cursive'}}>Post Blood Request</h4>
                            <p className="justify-content mb-3 mt-3" style={{fontSize:'13.5px',color:'gray'}}>
                                "Dear Request Maker!", your information is valuable to us.
                                When you fill out this form, the system will create your blood request. 
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
                                </Row>
                                <Row>
                                    <Col sm={6}>
                                        <InputGroup size="sm" className="mb-3" hasValidation>
                                            <InputGroup.Text id="inputGroup-sizing-default">
                                                <LocalHospitalIcon sx={{ color: 'action.active', mr:0 , my: 0 }}/>
                                            </InputGroup.Text>
                                            <Form.Control
                                                not-required
                                                aria-label="Default"
                                                aria-describedby="inputGroup-sizing-default" type="text" placeholder="Hospital / Blood Donation Centre*" 
                                                value={hospital}
                                                onChange={(e) => {
                                                    setHospital(e.target.value);
                                                }}
                                            />
                                            <Form.Control.Feedback type="invalid">
                                                
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
                                    <Col sm={5}>
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
                                    <Col sm={3}>
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
                                    <Col sm={4}>
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
                                    >Post Request</Button>
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
                    message="Congratulation! Your blood request posted successfully."
                    thirdButtonText="View All Requests"
                    secondButtonText="My Requests"
                    firstButtonText="Home Page"
                    firstButton={() => {window.location.href = "/userpanel/HomeScreen";}}
                    secondButton={() => {window.location.href = "/user/my-account";}}
                    thirdButton={() => {window.location.href = "/user/request-maker";}}
                    onCancel={()=>{setShowCongratulationBox(false);}}
                    margin="29%"
                    />
                )}
            </div>
        </div>

        
        <div style={{marginLeft:'65%',marginTop:'3%',textAlign:"center"}}>
            <Col sm={6}>
            <AvailableRequestMakersBar ></AvailableRequestMakersBar>
            </Col>
        </div>
        
        <div style={{textAlign:'right',marginTop:'15%',color:'rgb(160, 15, 15)',marginBottom:'0%'}}>
            
        </div>
    
        
        <UserPanelFooter></UserPanelFooter> */}
    </div> );
}
 
export default PostBloodRequest;