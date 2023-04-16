import React from "react";
import { Container, Button, Image } from "react-bootstrap";
import { Form, Row, Col, InputGroup, FloatingLabel } from "react-bootstrap";
import axios from "axios";
import UserPanelHeader from "../UserPanelHeader";
import UserPanelFooter from "../UserPanelFooter";
import image from '../../../Public/user/image/Image1.png';
import { Envelope,PersonAdd, Hospital,Phone,Chat,Droplet,ArrowRight, HouseDoor, GeoAlt,Telephone } from 'react-bootstrap-icons';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

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
import CalendarMonthSharpIcon from '@mui/icons-material/CalendarMonthSharp';

import '../css/style.css';
import requestMakerService from "../../../Services/Api/User/RequestMakerService";
import userService from "../../../Services/Api/User/UserService";
import userLoginService from "../../../Services/Api/User/UserLoginService";
import { Navigate } from "react-router-dom";

const UserLogin = (props) => {

    const [username, setUserName] = React.useState("");
    const [bloodGroup, setBloodGroup] = React.useState("");
    const [password, setPassword] = React.useState("");

    //Form Validation
    const [validated, setValidated] = React.useState(false);
    const handleSubmit = (event) => {
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
        }
        else {
            
        }
        setValidated(true);
    };

    const submitForm = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:8081/user/auth/login', {
                username,
                password
            });
            const token = response.headers.authorization;
            // Store the token in local storage
            localStorage.setItem('token', token);
            console.log("Before Decode Token:",token);
            window.location.href = "/userpanel/HomeScreen";
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

        <div>
            <Row style={{width:"100%"}}>
                <Col sm={7}>
                    <div 
                    style={{width:'70%', marginLeft:'20%',marginTop:'20%',
                    }}>
                        <Container>
                            <Row className='mt-0 mb-5 p-1'>
                                <Col sm={12} className='LoginContainerCol'>
                                    <h4 className="TextColor" style={{fontFamily:'cursive',textAlign:'center',marginBottom:'3%'}}>
                                        Login to Account
                                    </h4>
                                    
                                    <Form noValidate validated={validated} onSubmit={handleSubmit}>
                                        <Row>
                                            <Col sm={12}>
                                                <InputGroup size="sm" className="mb-3" hasValidation>
                                                    <InputGroup.Text id="inputGroup-sizing-default">
                                                        <AccountCircle sx={{ color: 'action.active', mr:0 , my: 0 }}/>
                                                    </InputGroup.Text>
                                                    <Form.Control
                                                        required
                                                        aria-label="Default"
                                                        aria-describedby="inputGroup-sizing-default" type="text" placeholder="User Name*" 
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
                                                <InputGroup size="sm" className="mb-3" hasValidation>
                                                    <InputGroup.Text id="inputGroup-sizing-default">
                                                        <LockPersonSharpIcon sx={{ color: 'action.active', mr:0 , my: 0 }}/>
                                                    </InputGroup.Text>
                                                    <Form.Control
                                                        required
                                                        aria-label="Default"
                                                        aria-describedby="inputGroup-sizing-default" type="password" placeholder="Password*" 
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
                                        
                                        
                                        <Row className="mt-2" style={{textAlign:'right'}}>
                                            <Col sm={12}>
                                            <Button variant="default" type='submit' style={ButtonStyle} onMouseEnter={handleMouseEnter} 
                                            onMouseLeave={handleMouseLeave} onClick={submitForm}
                                            >Log In <ArrowRight className="" size={17} /></Button>
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
                        <Image src={image} rounded style={{marginTop:'29%', paddingRight:'7%', width:'100%', height: "100%",opacity:'0.7'}}></Image>
                    </div>
                </Col>
            </Row>
            

            
            
        </div>

        
            <div style={{textAlign:'',marginTop:'20%',color:'rgb(160, 15, 15)',marginBottom:'10%'}}>
                
            </div>
    
        
        <UserPanelFooter></UserPanelFooter>
    </div> );
}
 
export default UserLogin;
