import React from "react";
import { Container, Button, Image, Nav } from "react-bootstrap";
import { Form, Row, Col, InputGroup } from "react-bootstrap";
import axios from "axios";
import UserPanelHeader from "../UserPanelHeader";
import UserPanelFooter from "../UserPanelFooter";
import image from '../../../Public/user/image/Image1.png';
import { toast } from "react-toastify";
import AccountCircle from '@mui/icons-material/PersonSharp';
import LockPersonSharpIcon from '@mui/icons-material/LockPersonSharp';

import { Facebook, Instagram, Google, ArrowRight, Twitter } from 'react-bootstrap-icons';


import '../css/style.css';


const UserLogin = (props) => {

    const [username, setUserName] = React.useState("");

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
            submitForm();
            event.preventDefault();
        }
        setValidated(true);
    };

    const submitForm = async (e) => {
    
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
                                    <p className="mt-3" style={{fontSize:'13.5px',color:'gray',textAlign:'center',marginBottom:'8%'}}>
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
                                                >Log In</Button>
                                            </Col>
                                        </Row>
                                        <Row style={{marginBottom:'2%',marginTop:'4%'}}>
                                            <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'left' }}>
                                                <Google size={25} className="RedColor" style={{borderRadius: '50%',margin:'1%'}} />
                                                <Facebook size={25} className="RedColor" style={{borderRadius: '50%',margin:'1%'}} />
                                                <Instagram size={25} className="RedColor" style={{borderRadius: '50%',margin:'1%'}} />
                                                <Twitter size={25} className="RedColor" style={{borderRadius: '50%',margin:'1%'}} />
                                            </div>
                                        </Row>
                                        <Row>
                                            <Col sm={6} style={{textAlign:'left'}}>
                                                <Nav.Link className='RedColor'>Forgot Your Password</Nav.Link>
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
