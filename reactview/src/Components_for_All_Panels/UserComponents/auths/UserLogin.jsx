import React, { useState } from "react";
import { Container, Button, Image, Nav } from "react-bootstrap";
import { Form, Row, Col, InputGroup } from "react-bootstrap";
import axios from "axios";
import UserPanelHeader from "../UserPanelHeader";
import UserPanelFooter from "../UserPanelFooter";
import image from '../../../Public/user/image/Image1.png';
import { toast } from "react-toastify";
import AccountCircle from '@mui/icons-material/PersonSharp';
import PeopleSharpIcon from '@mui/icons-material/PeopleSharp';
import LockPersonSharpIcon from '@mui/icons-material/LockPersonSharp';
import jwt_decode from 'jwt-decode';
import { ArrowRight } from 'react-bootstrap-icons';


import '../css/style.css';
import { useAuth } from "../../../Panels/BloodDonationCentre/Auth/AuthContext";
import SocialMediaButtons from "../SocialMediaButtons";
import jwtDecode from "jwt-decode";


const UserLogin = (props) => {
    const { handleLogin } = useAuth();
    const [username, setUserName] = React.useState("");

    const [password, setPassword] = React.useState("");

    const [role, setRole] = React.useState("");

    const [availableStatus, setAvailableStatus] = useState("Available");

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
            const response = await axios.post('http://localhost:8081/user/auth/login', {
                username,
                password,
                role,
            });
            const token = response.headers.authorization;
            // Store the token in local storage
            
            handleLogin(token);
            console.log("In  Login File:",token);
            // Determine the user's role from the token payload
            
            const decodedToken = token ? jwtDecode(token) : null;
            const userRole = decodedToken?.role;
            const { id } = jwt_decode(token);
            // console.log("After Decode Token:",jwt_decode(token))
            // console.log("Role:",userRole);
            updateDonorAvailabilityStatus(id);
            // Redirect the user to the appropriate route based on their role

            if(userRole=='USER') {
                
                window.location.href = "/userpanel/HomeScreen";
            }
            if(userRole=='CENTRE') {
                window.location.href = "/bloodCenter/HomeScreen";
            }
            if(userRole=='ADMIN') {
                window.location.href = "/adminpanel/HomeScreen";
            }
            if(userRole=='LAB') {
                window.location.href = "/lab/home";
            }
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

    

    const updateDonorAvailabilityStatus = async (id) => {
        try {
            const response = await axios.put('http://localhost:8081/api/users/update/donorAvailabilityStatus/' + id, {
                availableStatus
            });
        } 
        catch (error) {
            if (error.response) {
                console.log(error.response.data.error);
            } 
            else {
                console.log('An error occurred');
            }
        }
    }

    // //Store Data In Database(API)
    // const storeData = async (e) => {
    //     console.log("Send API call");
    //     e.preventDefault();
    //     userLoginService
    //         .login({username, password })
    //         .then((data) => {
    //             console.log(data);
    //             window.location.href = "/userpanel/HomeScreen";
    //         })
    //         .catch((err) => {
    //             console.log(err);
    //     });
    // };


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
        transform: isHover ? 'scale(0.84)' : 'scale(0.84)',
        border: isHover ? '' : '1px solid #27213C',
        transitionDuration: isHover ? '' : '0.1s',
    };
    
    return ( <div>
        <UserPanelHeader></UserPanelHeader>

        <div>
            <Row style={{width:"100%"}}>
                <Col sm={7}>
                    <div 
                    style={{width:'70%', marginLeft:'20%',marginTop:'13%',
                    }}>
                        <Container>
                            <Row className='mb-5'>
                                <Col sm={12} className='LoginContainerCol'>
                                    <h3 className="RedColor" style={{fontFamily:'cursive',textAlign:'center',marginBottom:'3%'}}>
                                        Login to Account
                                    </h3>
                                    <p className="mt-3" style={{fontSize:'13.5px',color:'gray',textAlign:'center',marginBottom:'6%'}}>
                                        WELCOME! To our secure online booking process. You can manage all your appointment details in one convenient place.
                                    </p>
                                    
                                    <Form noValidate validated={validated} onSubmit={handleSubmit}>
                                        <Row>
                                            <Col sm={12}>
                                                <Form.Label className='PurpleColor'>User Name <spam className='RedColor'>*</spam></Form.Label>
                                                <InputGroup size="sm" className="mb-3" hasValidation>
                                                    <InputGroup.Text id="inputGroup-sizing-default">
                                                        <AccountCircle sx={{ color: 'action.active', mr:0 , my: 0 }}/>
                                                    </InputGroup.Text>
                                                    <Form.Control
                                                        required
                                                        aria-label="Default"
                                                        aria-describedby="inputGroup-sizing-default" type="text" placeholder="Enter user name" 
                                                        value={username}
                                                        onChange={(e) => {
                                                            setUserName(e.target.value);
                                                        }}
                                                    />
                                                    <Form.Control.Feedback type="invalid">
                                                        Please provide a valid user name.
                                                    </Form.Control.Feedback>
                                                </InputGroup>
                                            </Col>
                                        
                                        </Row>
                                        
                                        <Row>
                                            
                                            <Col sm={12}>
                                                <Form.Label className='PurpleColor'>Password <spam className='RedColor'>*</spam></Form.Label>
                                                <InputGroup size="sm" className="mb-3" hasValidation>
                                                    <InputGroup.Text id="inputGroup-sizing-default">
                                                        <LockPersonSharpIcon sx={{ color: 'action.active', mr:0 , my: 0 }}/>
                                                    </InputGroup.Text>
                                                    <Form.Control
                                                        required
                                                        aria-label="Default"
                                                        aria-describedby="inputGroup-sizing-default" type="password" placeholder="Enter password" 
                                                        value={password}
                                                        onChange={(e) => {
                                                            setPassword(e.target.value);
                                                        }}
                                                    />
                                                    
                                                    <Form.Control.Feedback type="invalid">
                                                        Please provide a valid password.
                                                    </Form.Control.Feedback>
                                                </InputGroup>
                                            </Col>
                                        </Row>

                                        <Row>
                                            <Col sm={12}>
                                                <Form.Label className='PurpleColor'>Login As <spam className='RedColor'>*</spam></Form.Label>
                                                <InputGroup size="sm" className="mb-3" hasValidation>
                                                    <InputGroup.Text id="inputGroup-sizing-default">
                                                        <PeopleSharpIcon sx={{ color: 'action.active', mr:0 , my: 0 }}/>
                                                    </InputGroup.Text>
                                                    
                                                    <Form.Select required 
                                                        value={role} 
                                                        onChange={(e) => setRole(e.target.value)}
                                                    >
                                                        <option value="">Login as *</option>
                                                        <option value="CENTRE">Blood Donation Centre</option>
                                                        <option value="USER">Donor / Request Maker</option>
                                                        <option value="ADMIN">Admin</option>
                                                        <option value="LAB">Lab</option>
                                                    </Form.Select> 
                                                    <Form.Control.Feedback type="invalid">
                                                        Please provide a valid gender.
                                                    </Form.Control.Feedback>
                                                    
                                                </InputGroup>
                                            </Col>
                                        </Row>
                                        
                                        
                                        <Row className="mt-3" >
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
                                                            {`Remember me`}
                                                        </Form.Check.Label>
                                                        <Form.Control.Feedback type="invalid">
                                                            You did it!
                                                        </Form.Control.Feedback>
                                                    </Form.Check>
                                                </Form>
                                            </Col>
                                            <Col sm={6} style={{textAlign:'right'}}>
                                                <Button variant="default" type='submit' style={ButtonStyle} onMouseEnter={handleMouseEnter} 
                                                onMouseLeave={handleMouseLeave}
                                                >LOG IN</Button>
                                            </Col>
                                        </Row>
                                        <Row style={{marginBottom:'2%',marginTop:'4%'}}>
                                            <SocialMediaButtons></SocialMediaButtons>
                                        </Row>
                                        <Row>
                                            <Col sm={6} style={{textAlign:'left'}}>
                                                <Nav.Link className='RedColor'>Forgot Your Password ?</Nav.Link>
                                            </Col>
                                            <Col sm={6} style={{textAlign:'right'}}>
                                                <Nav.Link className='PurpleColor' href='/user/registration'>Register Now <ArrowRight size={18} className="PurpleColor"/></Nav.Link>
                                            </Col>
                                        </Row>
                                    </Form>
                                </Col>
                            </Row>
                            
                        </Container>
                    </div>
                </Col>
                <Col sm={5}>
                    <div>
                        <Image src={image} rounded style={{marginTop:'29%', marginLeft:'-12%', width:'100%', height: "100%",opacity:'1.0'}}></Image>
                    </div>
                </Col>
            </Row>
            
        </div>
        
        <UserPanelFooter></UserPanelFooter>
    </div> );
}
 
export default UserLogin;
