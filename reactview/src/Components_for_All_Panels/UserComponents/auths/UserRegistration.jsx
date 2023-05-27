import React from "react";
import { Container, Button, Image, Nav } from "react-bootstrap";
import { Form, Row, Col, InputGroup } from "react-bootstrap";
import UserPanelHeader from "../UserPanelHeader";
import UserPanelFooter from "../UserPanelFooter";
import image from '../../../Public/user/image/registration-image.jpg';
import { Facebook, Instagram, Google, ArrowRight, Twitter } from 'react-bootstrap-icons';

import axios from "axios";
import { toast } from "react-toastify";

import AccountCircle from '@mui/icons-material/PersonSharp';
import EmailIcon from '@mui/icons-material/EmailSharp';
import BloodtypeSharpIcon from '@mui/icons-material/BloodtypeSharp';
import LocationOnSharpIcon from '@mui/icons-material/LocationOnSharp';
import ContactsSharpIcon from '@mui/icons-material/ContactsSharp';
import LocationCitySharpIcon from '@mui/icons-material/LocationCitySharp';
import WcSharpIcon from '@mui/icons-material/WcSharp';
import BadgeSharpIcon from '@mui/icons-material/BadgeSharp';
import LockPersonSharpIcon from '@mui/icons-material/LockPersonSharp';

import '../css/style.css';
import SocialMediaButtons from "../SocialMediaButtons";

const UserRegistration = (props) => {

    const [fullName, setFullName] = React.useState("");
    const [userName, setUserName] = React.useState("");
    const [bloodGroup, setBloodGroup] = React.useState("");
    const [gender, setGender] = React.useState("");
    const [dob, setDob] = React.useState("");
    
    const [email, setEmail] = React.useState("");
    const [contactNo, setContactNo] = React.useState('');
    const [city, setCity] = React.useState("");
    const [address, setAddress] = React.useState("");
    
    const [password, setPassword] = React.useState("");

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

    //Form Validation
    const [validated, setValidated] = React.useState(false);
    const handleSubmit = (event) => {
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
        }
        else {
            submitForm();
            event.preventDefault();
            
            
        }
        setValidated(true);
    };

    const submitForm = async (e) => {
        try {
            const response = await axios.post('http://localhost:8081/api/user/registration/add', {
                fullName, userName, bloodGroup, gender, dob, email, contactNo, city, address, password
            });
            window.location.href = "/user/login";
        } 
        catch (error) {
            if (error.response) {
                console.log(error.response.data.error);
                toast.error(error.response.data.error, {
                    closeOnClick: true,
                    pauseOnHover: true,
                    position: toast.POSITION.BOTTOM_RIGHT,});
            } 
            else {
                console.log('An error occurred');
            }
        }
    }


    //Store Data In Database(API)
    // const storeData = async (e) => {
    //     console.log("Send API call");
    //     e.preventDefault();
    //     userLoginService
    //         .register({ fullName, userName, bloodGroup, gender, dob, email, contactNo, city, address, password })
    //         .then((data) => {
    //             console.log(data);
    //             window.location.href = "/user/login";
    //         })
    //         .catch((err) => {
    //             console.log(err);
    //     });
    // };

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
        backgroundColor: isHover ? '#D64045' : '#27213C',
        color: isHover ? 'white' : 'white',
        transform: isHover ? 'scale(0.80)' : 'scale(0.80)',
        border: isHover ? '' : '',
        transitionDuration: isHover ? '' : '0.1s',
    };
    
    return ( <div>
        <UserPanelHeader></UserPanelHeader>

        <div>
            <Row style={{width:"100%"}}>
                <Col sm={8}>
                    <div 
                        style={{width:'95%', marginLeft:'0%',marginTop:'8%',transform:'scale(0.86)',
                    }}>
                        <Container>
                            <Row className=''>
                                <Col sm={12} className='LoginContainerCol'>
                                    <h3 className="RedColor" style={{fontFamily:'cursive',textAlign:'center',marginBottom:'1%',marginTop:'-5%'}}>
                                        Register as a Donor/Request Maker
                                    </h3>
                                    <p className="" style={{fontSize:'13.5px',color:'gray',textAlign:'center',marginBottom:'3.5%'}}>
                                        WELCOME! To our secure online booking process. You can manage all your appointment details in one convenient place.
                                    </p>
                                    
                                    <Form noValidate validated={validated} onSubmit={handleSubmit}>
                                        <Row>
                                            
                                            <Col sm={6}>
                                                <Form.Label className='PurpleColor'>Full name <spam className='RedColor'>*</spam></Form.Label>
                                                <InputGroup size="sm" className="mb-3" hasValidation>
                                                    <InputGroup.Text id="inputGroup-sizing-default">
                                                        <AccountCircle sx={{ color: 'action.active', mr:0 , my: 0 }}/>
                                                    </InputGroup.Text>
                                                    <Form.Control
                                                        required
                                                        aria-label="Default"
                                                        aria-describedby="inputGroup-sizing-default" type="text" placeholder="Enter full name*" 
                                                        value={fullName}
                                                        onChange={(e) => {
                                                            setFullName(e.target.value);
                                                        }}
                                                    />
                                                    <Form.Control.Feedback type="invalid">
                                                        Please provide a valid name.
                                                    </Form.Control.Feedback>
                                                </InputGroup>
                                            </Col>
                                        
                                            <Col sm={6}>
                                                <Form.Label className='PurpleColor'>User name <spam className='RedColor'>*</spam></Form.Label>
                                                <InputGroup size="sm" className="mb-3" hasValidation>
                                                    <InputGroup.Text id="inputGroup-sizing-default">
                                                        <BadgeSharpIcon sx={{ color: 'action.active', mr:0 , my: 0 }}/>
                                                    </InputGroup.Text>
                                                    <Form.Control
                                                        required
                                                        aria-label="Default"
                                                        aria-describedby="inputGroup-sizing-default" type="text" placeholder="Enter username*" 
                                                        value={userName}
                                                        onChange={(e) => {
                                                            setUserName(e.target.value);
                                                        }}
                                                    />
                                                    <Form.Control.Feedback type="invalid">
                                                        Please provide a valid username.
                                                    </Form.Control.Feedback>
                                                </InputGroup>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col sm={6}>
                                                <Form.Label className='PurpleColor'>Blood group <spam className='RedColor'>*</spam></Form.Label>
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
                                            <Col sm={6}>
                                                <Form.Label className='PurpleColor'>Gender <spam className='RedColor'>*</spam></Form.Label>
                                                <InputGroup size="sm" className="mb-3" hasValidation>
                                                    <InputGroup.Text id="inputGroup-sizing-default">
                                                        <WcSharpIcon sx={{ color: 'action.active', mr:0 , my: 0 }}/>
                                                    </InputGroup.Text>
                                                    
                                                    <Form.Select required 
                                                        value={gender} 
                                                        onChange={(e) => setGender(e.target.value)}
                                                    >
                                                        <option value="">Select Gender*</option>
                                                        <option value="Male">Male</option>
                                                        <option value="Female">Female</option>
                                                        <option value="Other">Other</option>
                                                    </Form.Select> 
                                                    <Form.Control.Feedback type="invalid">
                                                        Please provide a valid gender.
                                                    </Form.Control.Feedback>
                                                    
                                                </InputGroup>
                                            </Col>
                                            
                                        </Row>

                                        <Row>
                                            <Col sm={6}>
                                                <Form.Label className='PurpleColor'>Date of birth <spam className='RedColor'>*</spam></Form.Label>
                                                <InputGroup size="sm" className="mb-3" hasValidation>
                                                    <InputGroup.Text id="inputGroup-sizing-default">
                                                        <ContactsSharpIcon sx={{ color: 'action.active', mr:0 , my: 0 }}/>
                                                    </InputGroup.Text>
                                                    <Form.Control
                                                        required
                                                        aria-label="Default"
                                                        aria-describedby="inputGroup-sizing-default" type="date" placeholder="Date of Birth*" 
                                                        value={dob}
                                                        onChange={(e) => {
                                                            setDob(e.target.value);
                                                        }}
                                                    />
                                                    <Form.Control.Feedback type="invalid">
                                                        Please provide a valid contact number.
                                                    </Form.Control.Feedback>
                                                </InputGroup>
                                            </Col>
                                            <Col sm={6}>
                                                <Form.Label className='PurpleColor'>City <spam className='RedColor'>*</spam></Form.Label>
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
                                                <Form.Label className='PurpleColor'>Email <spam className='RedColor'>*</spam></Form.Label>
                                                <InputGroup size="sm" className="mb-3" hasValidation>
                                                    <InputGroup.Text id="inputGroup-sizing-default">
                                                        <EmailIcon sx={{ color: 'action.active', mr:0 , my: 0 }}/>
                                                    </InputGroup.Text>
                                                    <Form.Control
                                                        required
                                                        aria-label="Default"
                                                        aria-describedby="inputGroup-sizing-default" type="email" placeholder="Enter email*" 
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
                                                <Form.Label className='PurpleColor'>Contact No <spam className='RedColor'>*</spam></Form.Label>
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
                                                <Form.Label className='PurpleColor'>Address <spam className='RedColor'>*</spam></Form.Label>
                                                <InputGroup size="sm" className="mb-3" hasValidation>
                                                    <InputGroup.Text id="inputGroup-sizing-default">
                                                        <LocationOnSharpIcon sx={{ color: 'action.active', mr:0 , my: 0 }}/>
                                                    </InputGroup.Text>
                                                    <Form.Control
                                                        required
                                                        aria-label="Default" 
                                                        aria-describedby="inputGroup-sizing-default" type="text" placeholder="Enter your current address / location*" 
                                                        value={address}
                                                        onChange={(e) => {
                                                            setAddress(e.target.value);
                                                        }}
                                                    />
                                                    <Form.Control.Feedback type="invalid">
                                                        Please provide a valid location/address.
                                                    </Form.Control.Feedback>
                                                </InputGroup>
                                            </Col>
                                        </Row>
                                        
                                        <Row>
                                            <Col sm={6}>
                                                <Form.Label className='PurpleColor'>Password <spam className='RedColor'>*</spam></Form.Label>
                                                <InputGroup size="sm" className="mb-3" hasValidation>
                                                    <InputGroup.Text id="inputGroup-sizing-default">
                                                        <LockPersonSharpIcon sx={{ color: 'action.active', mr:0 , my: 0 }}/>
                                                    </InputGroup.Text>
                                                    <Form.Control
                                                        required
                                                        aria-label="Default"
                                                        aria-describedby="inputGroup-sizing-default" type="password" placeholder="Enter password*" 
                                                        value={password}
                                                        onChange={(e) => {
                                                            setPassword(e.target.value);
                                                        }}
                                                    />
                                                    <Form.Control.Feedback type="invalid">
                                                        Please provide a valid name.
                                                    </Form.Control.Feedback>
                                                </InputGroup>
                                            </Col>
                                        
                                            <Col sm={6}>
                                                <Form.Label className='PurpleColor'>Re-enter password <spam className='RedColor'>*</spam></Form.Label>
                                                <InputGroup size="sm" className="mb-3" hasValidation>
                                                    <InputGroup.Text id="inputGroup-sizing-default">
                                                        <LockPersonSharpIcon sx={{ color: 'action.active', mr:0 , my: 0 }}/>
                                                    </InputGroup.Text>
                                                    <Form.Control
                                                        required
                                                        aria-label="Default"
                                                        aria-describedby="inputGroup-sizing-default" type="password" placeholder="Confirm password*" 
                                                        value={password}
                                                        onChange={(e) => {
                                                            setPassword(e.target.value);
                                                        }}
                                                    />
                                                    <Form.Control.Feedback type="invalid">
                                                        Please provide a valid username.
                                                    </Form.Control.Feedback>
                                                </InputGroup>
                                            </Col>
                                        </Row>
                                        <Row className="mt-2">
                                            <Col sm={6}>
                                                <Form >
                                                    <Form.Check 
                                                        type='checkbox' 
                                                        id='checkbox' 
                                                        size='sm'
                                                        style={{ color: 'red' }} // Change color of label
                                                    >
                                                        <Form.Check.Input 
                                                            type='checkbox' 
                                                            isValid 
                                                            defaultChecked={true}
                                                            style={{ 
                                                                backgroundColor: '#27213C', // Change color of checkbox
                                                                borderColor: '#27213C' // Change color of checkbox border
                                                            }} 
                                                        />
                                                        <Form.Check.Label 
                                                            style={{ color: '#27213C' }} // Change color of label
                                                        >
                                                            {`I agree all statement in Terms & Conditions`}
                                                        </Form.Check.Label>
                                                        <Form.Control.Feedback type="invalid">
                                                            You did it!
                                                        </Form.Control.Feedback>
                                                    </Form.Check>
                                                </Form>
                                            </Col>
                                            <Col sm={6} style={{textAlign:'right'}}>
                                            <Button variant="default" type='submit' style={ButtonStyle} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} 
                                            >CREATE MY ACCOUNT</Button>
                                            </Col>
                                        </Row>
                                        <Row style={{marginBottom:'1%',marginTop:'2%'}}>
                                            <SocialMediaButtons></SocialMediaButtons>
                                        </Row>
                                        <Row>
                                            <Col sm={6} style={{textAlign:'left'}}>
                                                <Nav.Link className='RedColor'>Already have an account ? Log In</Nav.Link>
                                            </Col>
                                            {/* <Col sm={6} style={{textAlign:'right'}}>
                                                <Nav.Link className='PurpleColor' href='/user/registration'>Register Now <ArrowRight size={18} className="PurpleColor"/></Nav.Link>
                                            </Col> */}
                                        </Row>
                                    </Form>
                                </Col>
                            </Row>
                        </Container>
                    </div>
                </Col>
                <Col sm={4}>
                    <Row>
                        <div>
                            <Image src={image} rounded style={{marginTop:'40%', marginLeft:'-27%', width:'120%', height: "23rem",opacity:'1.0'}}></Image>
                        </div>
                    </Row>
                    <Row>

                    </Row>
                </Col>
            </Row>
            

            
            
        </div>

        
            <div style={{textAlign:'',marginTop:'3%',color:'rgb(160, 15, 15)',marginBottom:'5%'}}>
                
            </div>
    
        
        <UserPanelFooter></UserPanelFooter>
    </div> );
}
 
export default UserRegistration;
