import React, { useEffect, useState } from 'react'


import { Container,  Navbar, Nav, Button,NavDropdown,Row,Col,Modal, Form, InputGroup } from 'react-bootstrap';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import UserPanelHeader from '../UserPanelHeader';
import userService from '../../../Services/Api/User/UserService';
import jwtDecode from 'jwt-decode';
import axios from 'axios';
import { toast } from 'react-toastify';

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
import { Trash } from 'react-bootstrap-icons';
import userLoginService from '../../../Services/Api/User/UserLoginService';
import ConfirmationBox from '../ConfirmationBox';



export default function MyPersonalDetails() {

    const [fullName, setFullName] = React.useState("");
        const [userName, setUserName] = React.useState("");
        const [bloodGroup, setBloodGroup] = React.useState("");
        const [gender, setGender] = React.useState("");
        const [dob, setDob] = React.useState("");
        
        const [email, setEmail] = React.useState("");
        const [contactNo, setContactNo] = React.useState("");
        const [city, setCity] = React.useState("");
        const [address, setAddress] = React.useState("");
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
        }
        setValidated(true);
    };

    const submitForm = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.put('http://localhost:8081/api/users/edit/' + id, {
                fullName, bloodGroup, gender, dob, email, contactNo, city, address
            });
            window.location.href = "/user/my-account";
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



        //Get User details by ID
        const token = localStorage.getItem('token');
        const decodedToken = jwtDecode(token);

        const id = decodedToken?.id;
        
        const [user, setUser] = useState();

        const getData = () => {
            userService
                .getSingleUser(id)
                .then((data) => {
                    setUser(data?.results?.bindings?.[0]);
                    setFullName(data?.results?.bindings?.[0]?.Name?.value);
                    setBloodGroup(data?.results?.bindings?.[0]?.BloodGroup?.value);
                    setGender(data?.results?.bindings?.[0]?.Gender?.value);
                    setDob(data?.results?.bindings?.[0]?.DOB?.value);
                    setCity(data?.results?.bindings?.[0]?.City?.value);
                    setContactNo(data?.results?.bindings?.[0]?.ContactNo?.value);
                    setEmail(data?.results?.bindings?.[0]?.Email?.value);
                    setAddress(data?.results?.bindings?.[0]?.Address?.value);
                })
                .catch((err) => {
                    console.log(err);
            });
        };

        useEffect(()=> getData, []);
        
        // console.log(id);
        // console.log(user);
        // console.log(fullName);

        //For Modal
        const [show, setShow] = React.useState(false);

        const handleClose = () => setShow(false);
        const handleShow = () => setShow(true);


        //For Button Styling
        const [isHover, setIsHover] = React.useState(true);

        const handleMouseEnter = () => {
            setIsHover(false);
        };

        const handleMouseLeave = () => {
            setIsHover(true);
        };
        const ButtonStyle1 = {
            backgroundColor: isHover ? 'rgb(160, 15, 15)' : 'rgb(160, 15, 15)',
            color: isHover ? 'white' : 'white',
            transform: isHover ? 'scale(0.8)' : 'scale(0.82)',
            border: isHover ? '' : '1px solid white',
            transitionDuration: isHover ? '' : '0.45s',
        };

        const [showConfirmationBox, setShowConfirmationBox] = useState(false);
        const handleCancelConfirmationBox = () => {
            setShowConfirmationBox(false);
        };

        const deleteUser = () => {
            userService
                .deleteUser(user?.ID?.value)
                .then((data) => {
                    console.log(data);
                    userLoginService.logout();
                    window.location.href = "/userpanel/HomeScreen";
                })
                .catch((err) => {
                    console.log(err);
                });
        };
        
    return (
        <div>
            <div style={{marginLeft:'5%', width:'140%',marginTop:'-12%'}}>
                <h3>Welcome <spam className='TextColor' style={{fontFamily:'cursive',textAlign:'left',fontSize:'21px'}}>"{user?.Name?.value}"</spam></h3>
            
                <div style={{marginTop:'5%'}}>
                    <Row>
                        <Col sm={6}>
                            <p><strong style={{fontFamily:''}}>Full Name: </strong>{user?.Name?.value}</p>
                        </Col>
                        <Col sm={6}>
                            <p><strong style={{fontFamily:''}}>Username: </strong>{user?.UserName?.value}</p>
                        </Col>
                    </Row>
                    <Row style={{marginTop:'-1.5%'}}>
                        <Col sm={6}>
                            <p><strong style={{fontFamily:''}}>Blood Group: </strong>{user?.BloodGroup?.value}</p>
                        </Col>
                        <Col sm={6}>
                            <p><strong style={{fontFamily:''}}>Gender: </strong>{user?.Gender?.value}</p>
                        </Col>
                    </Row>
                    <Row style={{marginTop:'-1.5%'}}>
                        <Col sm={6}>
                            <p><strong style={{fontFamily:''}}>Date Of Birth: </strong>{user?.DOB?.value}</p>
                        </Col>
                        <Col sm={6}>
                            <p><strong style={{fontFamily:''}}>City: </strong>{user?.City?.value}</p>
                        </Col>
                    </Row>
                    <Row style={{marginTop:'-1.5%'}}>
                        <Col sm={6}>
                            <p><strong style={{fontFamily:''}}>Contact No: </strong>{user?.ContactNo?.value}</p>
                        </Col>
                        <Col sm={6}>
                            <p><strong style={{fontFamily:''}}>Email: </strong>{user?.Email?.value}</p>
                        </Col>
                    </Row>
                    <Row style={{marginTop:'-1.5%'}}>
                        <Col sm={12}>
                            <p><strong style={{fontFamily:''}}>Eligibility Status: </strong>{user?.EligibilityStatus?.value}</p>
                        </Col>
                    </Row>
                    <Row style={{marginTop:'-1.5%'}}>
                        <Col sm={12}>
                            <p><strong style={{fontFamily:''}}>Location: </strong>{user?.Address?.value}</p>
                        </Col>
                    </Row>
                    <Row>
                        <Col sm={12} style={{marginTop:'1%',textAlign:'right',marginLeft:'0%'}}>
                            <Button variant="default" style={ButtonStyle1} 
                                onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} 
                                onClick={(e) => {
                                    handleShow();
                                }}>Update My Account</Button> 
                            
                        </Col>
                    </Row>
                    <Row style={{marginTop:'4%', border:'', borderRadius:'7px', backgroundColor:'#f2f0f0'}}>
                        <div style={{padding:'3%'}}>
                            <h5 style={{fontSize:'18px'}}>Are you sure you want to delete your account?</h5>
                            <p style={{fontSize:'14.4px',textStyle:'cursive'}}>Once you delete your account, your personal details should be removed from our system.</p>
                        
                            <Form>
                                <Form.Check type='checkbox' id='checkbox' size='sm'>
                                    <Form.Check.Input type='checkbox' isValid />
                                    <Form.Check.Label>{`Are you sure to delete your profile`}</Form.Check.Label>
                                    <Form.Control.Feedback type="invalid">
                                    You did it!
                                    </Form.Control.Feedback>
                                </Form.Check>
                            </Form>
                            <Button variant="flatSolid" size='sm' style={{marginTop:'2%'}} 
                                onClick={(e) => {
                                    setShowConfirmationBox(true);
                                }}>Delete My Profile <Trash className="m-0" size={15} /></Button> 
                        </div>
                        <div>
                            {showConfirmationBox && (
                                <ConfirmationBox
                                message="Are you sure you want to delete your account?"
                                onConfirm={deleteUser}
                                onCancel={handleCancelConfirmationBox}
                                />
                            )}
                        </div>
                    </Row>
                </div>
            </div>

            <div>
                <Modal show={show} onHide={handleClose}>
                    <div style={{border:'1px solid rgb(160,15,15)',boxShadow: '0px 0px 8px 0px rgb(116, 10, 10)'}}>
                        <Modal.Header closeButton>
                            <Modal.Title className='TextColor'>Personal Details</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
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
                                            aria-describedby="inputGroup-sizing-default" type="text" placeholder="Full Name*" 
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
                            </Row>
                            <Row>
                                <Col sm={12}>
                                    <InputGroup size="sm" className="mb-3" hasValidation>
                                        <InputGroup.Text id="inputGroup-sizing-default">
                                            <BloodtypeSharpIcon sx={{ color: 'action.active', mr:0 , my: 0 }}/>
                                        </InputGroup.Text>
                                        
                                        <Form.Select required 
                                            value={bloodGroup} 
                                            onChange={(e) => setBloodGroup(e.target.value)}
                                        >
                                            <option value="">Blood Group*</option>
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
                                <Col sm={12}>
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
                                <Col sm={12}>
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
                                <Col sm={12}>
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
                                
                                <Col sm={12}>
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
                            
                        </Form>
                        </Modal.Body>
                        <Modal.Footer>
                        <Button size='sm' variant="flat" onClick={handleClose}>
                            Close
                        </Button>
                        <Button size='sm' variant="flatSolid" onClick={submitForm}>
                            Update Details
                        </Button>
                        </Modal.Footer>
                    </div>
                </Modal>
            </div>

        </div>
    )
}
