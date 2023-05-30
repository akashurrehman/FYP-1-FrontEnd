import React, { useEffect, useState } from "react";
import {  Button,Modal,Form,InputGroup,Card,Image,Container, OverlayTrigger, Popover } from "react-bootstrap";
import { Row, Col, Nav } from "react-bootstrap";
import UserPanelHeader from "../UserPanelHeader";
import UserPanelFooter from "../UserPanelFooter";
import { useParams } from 'react-router-dom';
import { CheckCircleFill, HouseDoorFill, PrinterFill, XCircleFill } from 'react-bootstrap-icons';
import { Facebook, Instagram, Google, ArrowRight, Twitter } from 'react-bootstrap-icons';
import '../css/style.css';
import CoverImage from "../../../Public/user/image/book-appointment-background-image.jpg";
import image_book_appointment from '../../../Public/user/image/book-appointment-menu.png';
import CardImage1 from "../../../Public/user/image/CardImage1.jpg";
import CardImage2 from "../../../Public/user/image/CardImage2.jpg";
import CardImage3 from "../../../Public/user/image/CardImage3.jpg";

import centreService from "../../../Services/Api/User/BloodDonationCentreService";
import userService from "../../../Services/Api/User/UserService";
import jwtDecode from "jwt-decode";

import axios from 'axios';
import { toast } from 'react-toastify';
import ConfirmationBox from "../ConfirmationBox";
import { useAuth } from "../../../Panels/BloodDonationCentre/Auth/AuthContext";

import AccountCircle from '@mui/icons-material/PersonSharp';
import EmailIcon from '@mui/icons-material/EmailSharp';
import CalendarMonthSharpIcon from '@mui/icons-material/CalendarMonthSharp';
import BloodtypeSharpIcon from '@mui/icons-material/BloodtypeSharp';
import LocationOnSharpIcon from '@mui/icons-material/LocationOnSharp';
import ContactsSharpIcon from '@mui/icons-material/ContactsSharp';
import WcSharpIcon from '@mui/icons-material/WcSharp';
import AccessTimeSharpIcon from '@mui/icons-material/AccessTimeSharp';
import EventAvailableSharpIcon from '@mui/icons-material/EventAvailableSharp';
import SocialMediaButtons from "../SocialMediaButtons";

const MakeAppointment = () => {

    //Get Centre ID from url
    const { centreID } = useParams();

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
  
    //This will get the id  from the token if user is login
   
    const userID = decodedToken?.id;
    // console.log(userID);

    const [centre, setCentre] = useState();
    const [user, setUser] = useState();

    const [donorName, setDonorName] = React.useState("");
    const [donorDOB, setDonorDOB] = React.useState("");
    const [donorEmail, setDonorEmail] = React.useState("");
    const [donorContactNo, setDonorContactNo] = React.useState("");
    const [donorGender, setDonorGender] = React.useState("");
    const [donorAddress, setDonorAddress] = React.useState("");
    const [donorCity, setDonorCity] = React.useState("");
    const [donorBloodGroup, setDonorBloodGroup] = React.useState("");
    const [centreName, setCentreName] = React.useState("");
    const [centreTimings, setCentreTimings] = React.useState("");
    const [centreContactNo, setCentreContactNo] = React.useState("");
    const [centreEmail, setCentreEmail] = React.useState("");
    const [centreLocation, setCentreLocation] = React.useState("");
    const [bookingDate, setBookingDate] = React.useState("");
    const [bookingTime, setBookingTime] = React.useState("");

    const getUserData = () => {
        userService
            .getSingleUser(userID)
            .then((data) => {
                setUser(data?.results?.bindings?.[0]);
                setDonorName(data?.results?.bindings?.[0]?.Name?.value);
                setDonorDOB(data?.results?.bindings?.[0]?.DOB?.value);
                setDonorEmail(data?.results?.bindings?.[0]?.Email?.value);
                setDonorContactNo(data?.results?.bindings?.[0]?.ContactNo?.value);
                setDonorGender(data?.results?.bindings?.[0]?.Gender?.value);
                setDonorAddress(data?.results?.bindings?.[0]?.Address?.value);
                setDonorCity(data?.results?.bindings?.[0]?.City?.value);
                setDonorBloodGroup(data?.results?.bindings?.[0]?.BloodGroup?.value);
            })
            .catch((err) => {
                console.log(err);
        });
    };

    const getCentreData = () => {
        centreService
            .getSingleCentre(centreID)
            .then((data) => {
                setCentre(data?.results?.bindings?.[0]);
                setCentreName(data?.results?.bindings?.[0]?.Name?.value);
                setCentreLocation(data?.results?.bindings?.[0]?.Location?.value);
                setCentreContactNo(data?.results?.bindings?.[0]?.ContactNo?.value);
                setCentreTimings(data?.results?.bindings?.[0]?.Timings?.value);
                setCentreEmail(data?.results?.bindings?.[0]?.Email?.value);
            })
            .catch((err) => {
                console.log(err);
        });
    };



    useEffect(()=>{authCentre();getUserData();getCentreData();authCentre();}, []);
    console.log(centre);
    console.log(user);
    // console.log(donorName);

    const submitForm = async (e) => {
        // e.preventDefault();
        // const confirmed = window.confirm('Are you sure you want to delete?');
        
        try {
            if(user?.EligibilityStatus?.value == 'Eligible'){
                const response = await axios.post('http://localhost:8081/api/user/appointment/AppointmentDetails/add', {
                    centreID,userID,donorName,donorDOB,donorEmail,donorContactNo,donorGender,donorAddress,donorCity,donorBloodGroup,centreName,centreEmail,centreLocation,centreTimings,centreContactNo,bookingDate,bookingTime
                });
                console.log(response.data);
                makeNotification();
                handleShow();
            }
            else{
                toast.error(<ErrorToastMakeBloodAnalysis />, {
                    closeOnClick: true,
                    pauseOnHover: true,
                    position: toast.POSITION.BOTTOM_RIGHT,
                    className: 'custom-toast',
                });
            }
            
        } 
        catch (error) {
            if (error.response) {
                console.log(error.response.data.error);
                toast.error(error.response.data.error, {
                    closeOnClick: true,
                    pauseOnHover: true,
                    position: toast.POSITION.BOTTOM_RIGHT,
                });
            } 
            else {
                console.log('An error occurred');
            }
        }
        
        
    }

    
    //For making notification process
    const notificationMadeBy = decodedToken?.id;
    const userName = decodedToken?.name;
    const message = "Appointment booked by " + userName;
    const notificationForCentre = centreID;

    const makeNotification = async (e) => {
        try {
            await axios.post('http://localhost:8081/api/users/addNotification/forCentre', {
                notificationMadeBy, message, userName, notificationForCentre
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
        border: isHover ? '' : '',
        transitionDuration: isHover ? '' : '0.1s',
    };
    
    const ErrorToastMakeBloodAnalysis = ({ closeToast }) => (
        <div>
            <p><strong className='TextColor'>Sorry !</strong> Kindly check your eligibility status for blood donation. </p>
            <div style={{textAlign:'right'}}>
                <Nav.Link className='RedColor' href='/user/blood-analysis'>Make blood analysis  <ArrowRight className="" size={16} /></Nav.Link>
            </div>
        </div>
    );

    const [showConfirmationBox, setShowConfirmationBox] = useState(false);
    const handleDeleteButtonClick = () => {
        setShowConfirmationBox(true);
    };
    const handleCancelConfirmationBox = () => {
        setShowConfirmationBox(false);
    };


    //For Modal
    const [show, setShow] = React.useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    //Form Validation
    const [validated, setValidated] = React.useState(false);
    const handleSubmit = (event) => {
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
        }
        else {
            handleDeleteButtonClick();
            event.preventDefault();
        }
        setValidated(true);
    };

    return ( <div>
        <UserPanelHeader></UserPanelHeader>

        <div style={{position: "relative"}}>
                <div 
                    style={{
                        backgroundSize:'cover',opacity: 0.80,paddingTop:"37%",marginBottom:"0%",height: "45rem",
                    }}>
                
                </div>

                    <div 
                        style={{position: "absolute",
                            bottom: "27%",left: "0%",
                            backgroundColor: "",color: "white",
                            padding: "30px",
                            marginLeft: "30px",textAlign: "center",
                            width:"97%",fontFamily: "Arial",opacity: "1.0",height: "25rem",
                    }}>
                        <Row>
                            <Col sm={3}>
                                <Image src={image_book_appointment} rounded style={{marginTop: "0%",marginTop:'0%',height: "8rem",opacity:'1.0'}}></Image>
                                <h2 className='pb-2 pt-2 RedColor' style={{fontFamily:"cursive",}}>Appointment Booking</h2>
                                <h5 className='pb-4 PurpleColor' style={{}}>"Empower yourself with knowledge and proactive healthcare. Schedule your appointment and stay ahead of the game."</h5>
                            </Col>
                            <Col sm={9}>
                                <div style={{backgroundColor:'#F5F5DC',borderRadius:'15px',marginTop:'-3%'}}>
                                    <div style={{padding:'3%'}}>
                                        <Row>
                                            <Col sm={4} style={{textAlign:'left'}}>
                                                <Row>
                                                    <h4 className='PurpleColor' style={{fontFamily:"cursive",fontWeight:'600',fontSize:'19px'}}>Centre Details</h4>
                                                    <p className='PurpleColor' style={{fontSize:'15px',marginTop:'6%',fontWeight:'600'}}>name: <spam className='RedColor' style={{fontSize:'18px',fontWeight:'400'}}>{centre?.Name?.value}</spam></p>
                                                    <p className='PurpleColor' style={{fontSize:'15px',marginTop:'-6%',fontWeight:'600'}}>category: <spam style={{fontSize:'',fontWeight:'400'}}>{centre?.Category?.value}</spam></p>
                                                    <p className='PurpleColor' style={{fontSize:'15px',marginTop:'-6%',fontWeight:'600'}}>email: <spam style={{fontSize:'',fontWeight:'400'}}>{centre?.Email?.value}</spam></p>
                                                    <p className='PurpleColor' style={{fontSize:'15px',marginTop:'-6%',fontWeight:'600'}}>city: <spam style={{fontSize:'',fontWeight:'400'}}>{centre?.City?.value}</spam></p>
                                                    <p className='PurpleColor' style={{fontSize:'15px',marginTop:'-6%',fontWeight:'600'}}>location: <spam style={{fontSize:'',fontWeight:'400'}}>{centre?.Location?.value}</spam></p>
                                                    <p className='PurpleColor' style={{fontSize:'15px',marginTop:'-6%',fontWeight:'600'}}>timings: <spam style={{fontSize:'',fontWeight:'400',color:'green'}}>{centre?.Timings?.value}</spam></p>
                                                    <p className='PurpleColor' style={{fontSize:'15px',marginTop:'-6%',fontWeight:'600'}}>opening days: <spam style={{fontSize:'',fontWeight:'400',color:'green'}}>{centre?.Opening_Days?.value}</spam></p>
                                                    <p className='' style={{fontSize:'18px',marginTop:'0%',fontWeight:'600',color:'#5ad7ed',fontFamily:'system-ui'}}>CALL <spam style={{fontSize:'',fontWeight:'400'}}>{centre?.ContactNo?.value}</spam></p>
                                                </Row>
                                                <Row style={{marginBottom:'2%',marginTop:'4%'}}>
                                                    <SocialMediaButtons></SocialMediaButtons>
                                                </Row>                                                
                                            </Col>
                                            <Col sm={8}>
                                                <Row>
                                                    <h3 className='PurpleColor' style={{fontFamily:"cursive",fontWeight:'600',fontSize:'21px',textAlign:'',marginBottom:'-2%'}}>
                                                        Donor Details
                                                        { user?.EligibilityStatus?.value === 'Eligible' ? (
                                                            <>
                                                                <OverlayTrigger
                                                                    trigger={['hover', 'focus']}
                                                                    placement="top"
                                                                    overlay={
                                                                    <Popover id="aids-popover">
                                                                        <Popover.Body>
                                                                            Congratulations! You are eligible for making blood donation and booking appointment in {centre?.Name?.value}
                                                                        </Popover.Body>
                                                                    </Popover>
                                                                    }
                                                                ><spam style={{color:'green'}}> <CheckCircleFill className="m-1" size={18} /></spam></OverlayTrigger>
                                                            </>
                                                        ):(
                                                            <>
                                                                <OverlayTrigger
                                                                    trigger={['hover', 'focus']}
                                                                    placement="top"
                                                                    overlay={
                                                                    <Popover id="aids-popover">
                                                                        <Popover.Body>
                                                                            Sorry! You are not eligible for making blood donation and booking appointment in {centre?.Name?.value}
                                                                        </Popover.Body>
                                                                    </Popover>
                                                                    }
                                                                ><spam style={{color:'red'}}><XCircleFill className="m-1" size={18} /></spam></OverlayTrigger>
                                                            </>
                                                        )}
                                                    </h3>
                                                    <p className="justify-content mb-4 mt-3" style={{fontSize:'12px',color:'gray'}}>
                                                        By booking an appointment, you are taking the first step towards a better, healthier you.
                                                        Your well-being deserves your attention. Don't delay, make an appointment and nurture your health.
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
                                                                        value={user?.Name?.value}
                                                                    />
                                                                    <Form.Control.Feedback type="invalid">
                                                                        Please provide a valid name.
                                                                    </Form.Control.Feedback>
                                                                </InputGroup>
                                                            </Col>
                                                            <Col sm={6}>
                                                                <InputGroup size="sm" className="mb-3" hasValidation>
                                                                    <InputGroup.Text id="inputGroup-sizing-default">
                                                                        <CalendarMonthSharpIcon sx={{ color: 'action.active', mr:0 , my: 0 }}/>
                                                                    </InputGroup.Text>
                                                                    <Form.Control
                                                                        required
                                                                        aria-label="Default"
                                                                        aria-describedby="inputGroup-sizing-default" type="date" placeholder="Date of Birth*" 
                                                                        value={user?.DOB?.value}
                                                                    />
                                                                    <Form.Control.Feedback type="invalid">
                                                                        Please provide a valid contact number.
                                                                    </Form.Control.Feedback>
                                                                </InputGroup>
                                                            </Col>
                                                        </Row>
                                                        <Row>
                                                            <Col sm={6}>
                                                            <InputGroup size="sm" className="mb-3" hasValidation>
                                                                    <InputGroup.Text id="inputGroup-sizing-default">
                                                                        <BloodtypeSharpIcon sx={{ color: 'action.active', mr:0 , my: 0 }}/>
                                                                    </InputGroup.Text>
                                                                    
                                                                    <Form.Select required 
                                                                        value={user?.BloodGroup?.value} 
                                                                        
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
                                                                <InputGroup size="sm" className="mb-3" hasValidation>
                                                                    <InputGroup.Text id="inputGroup-sizing-default">
                                                                        <WcSharpIcon sx={{ color: 'action.active', mr:0 , my: 0 }}/>
                                                                    </InputGroup.Text>
                                                                    
                                                                    <Form.Select required 
                                                                        value={user?.Gender?.value} 
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
                                                                        value={user?.Email?.value}
                                                                        
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
                                                                        value={user?.ContactNo?.value}
                                                                        
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
                                                                        value={user?.Address?.value}
                                                                        
                                                                    />
                                                                    <Form.Control.Feedback type="invalid">
                                                                        Please provide a valid location/address.
                                                                    </Form.Control.Feedback>
                                                                </InputGroup>
                                                            </Col>
                                                        </Row>
                                                        <Row>
                                                            <Col sm={6}>
                                                                <div style={{textAlign:'left'}}>
                                                                    <Form.Label className='PurpleColor'>Booking Date <spam className='RedColor'>*</spam></Form.Label>
                                                                </div>
                                                                <InputGroup size="sm" className="mb-3" hasValidation>
                                                                    <InputGroup.Text id="inputGroup-sizing-default">
                                                                        <EventAvailableSharpIcon sx={{ color: 'action.active', mr:0 , my: 0 }}/>
                                                                    </InputGroup.Text>
                                                                    <Form.Control
                                                                        required
                                                                        aria-label="Default"
                                                                        aria-describedby="inputGroup-sizing-default" type="date" placeholder="Select booking date*" 
                                                                        value={bookingDate}
                                                                        onChange={(e) => {
                                                                            setBookingDate(e.target.value);
                                                                        }}
                                                                    />
                                                                    <Form.Control.Feedback type="invalid">
                                                                        Please provide a valid contact number.
                                                                    </Form.Control.Feedback>
                                                                </InputGroup>
                                                            </Col>
                                                            <Col sm={6}>
                                                                <div style={{textAlign:'left'}}>
                                                                    <Form.Label className='PurpleColor'>Booking Time <spam className='RedColor'>*</spam></Form.Label>
                                                                </div>
                                                                <InputGroup size="sm" className="mb-3" hasValidation>
                                                                    <InputGroup.Text id="inputGroup-sizing-default">
                                                                        <AccessTimeSharpIcon sx={{ color: 'action.active', mr:0 , my: 0 }}/>
                                                                    </InputGroup.Text>
                                                                    <Form.Control
                                                                        required
                                                                        aria-label="Default"
                                                                        aria-describedby="inputGroup-sizing-default" type="time" placeholder="Select booking time*"  
                                                                        value={bookingTime}
                                                                        onChange={(e) => {
                                                                            setBookingTime(e.target.value);
                                                                        }}
                                                                    />
                                                                    <Form.Control.Feedback type="invalid">
                                                                        Please provide a valid contact number.
                                                                    </Form.Control.Feedback>
                                                                </InputGroup>
                                                            </Col>
                                                        </Row>
                                                        <Row>
                                                            <div style={{textAlign:'right',marginTop:'0%'}}>
                                                            <Button variant="default" type='submit' style={ButtonStyle} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}
                                                                >Book Appointment</Button>
                                                            </div>
                                                            <div>
                                                                {showConfirmationBox && (
                                                                    <ConfirmationBox
                                                                    message="Are you sure you want to book an appointment?"
                                                                    onConfirm={submitForm}
                                                                    onCancel={handleCancelConfirmationBox}
                                                                    />
                                                                )}
                                                            </div>
                                                        </Row>
                                                    </Form>
                                                </Row>
                                            </Col>
                                        </Row>
                                    </div>
                                </div>
                            </Col>
                        </Row>
                        
                    </div>
            </div>
            <div>
                <Container>
                    <Row className="" style={{marginBottom:"10%",marginTop:'-6%'}}>
                        <Col sm={4}>
                            <Card className="ColHover" border="danger" style={{ width: '22rem' }}>
                                <Card.Img variant="top" src={CardImage1} height="250rem"/>
                                <Card.Body>
                                    <Card.Title>Can I Donate Blood?</Card.Title>
                                    <Card.Text>
                                        See if you are eligible to donate blood today, or find frequently asked questions.
                                    </Card.Text>
                                    <Button href='/user/blood-analysis' size='sm' variant="flat">Check eligibility</Button>
                                </Card.Body>
                            </Card>
                        </Col>
                        <Col sm={4}>
                            <Card className="ColHover" border="danger" style={{ width: '22rem' }}>
                                <Card.Img variant="top" src={CardImage2}  height="250rem"/>
                                <Card.Body>
                                    <Card.Title>Making Your Donation?</Card.Title>
                                    <Card.Text>
                                        Discover how you can give blood, plasma or platelets, and book your next donation.
                                    </Card.Text>
                                    <Button href='/user/make-blood-donation' size='sm' variant="flat">Know how to donate</Button>
                                </Card.Body>
                            </Card>
                        </Col>
                        <Col sm={4}>
                            <Card  className="ColHover" border="danger" style={{ width: '22rem' }}>
                                <Card.Img variant="top" src={CardImage3}  height="250rem"/>
                                <Card.Body>
                                    <Card.Title>Find a Blood Donation Centre?</Card.Title>
                                    <Card.Text>
                                        There are donor centres all across the country. Find one that's closest to you.
                                    </Card.Text>
                                    <Button href='/user/blood-donation-centre' size='sm' variant="flat">Find a Center</Button>
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>
                </Container>
            </div>

        <div>
            <Modal show={show} onHide={handleClose} centered style={{}} >
                <div style={{border:'1px solid grey',boxShadow: '0px 0px 8px 0px grey'}}>
                    <Modal.Header closeButton>
                        <Modal.Title className='TextColor'>Appointment Slip</Modal.Title>
                    </Modal.Header>
                    <Modal.Body >
                        <p><strong style={{color:'grey'}}>Donor Name: </strong>{user?.Name?.value}</p>
                        <p style={{marginTop:'-4%'}}><strong style={{color:'grey'}}>Donor Date of Birth: </strong>{user?.DOB?.value}</p>
                        <p style={{marginTop:'-5%'}}><strong style={{color:'grey'}}>Donor Blood Group: </strong>{user?.BloodGroup?.value}</p>
                        <p style={{marginTop:'-5%'}}><strong style={{color:'grey'}}>Donor Gender: </strong>{user?.Gender?.value}</p>
                        <p style={{marginTop:'-5%'}}><strong style={{color:'grey'}}>Donor Email: </strong>{user?.Email?.value}</p>
                        <p style={{marginTop:'-5%'}}><strong style={{color:'grey'}}>Donor Contact No: </strong>{user?.ContactNo?.value}</p>
                        <p style={{marginTop:'-5%'}}><strong style={{color:'grey'}}>Donor City: </strong>{user?.City?.value}</p>
                        <p style={{marginTop:'-5%'}}><strong style={{color:'grey'}}>Donor Address: </strong>{user?.Address?.value}</p>
                        <p style={{marginTop:'-5%'}}><strong style={{color:'grey'}}>Booking Date: </strong>{bookingDate}</p>
                        <p style={{marginTop:'-5%'}}><strong style={{color:'grey'}}>Booking Time: </strong>{bookingTime}</p>
                        <p style={{marginTop:'-2%'}}><strong style={{color:'grey'}}>Centre Name: </strong>{centre?.Name?.value}</p>
                        <p style={{marginTop:'-4%'}}><strong style={{color:'grey'}}>Centre Timings: </strong>{centre?.Timings?.value}</p>
                        <p style={{marginTop:'-5%'}}><strong style={{color:'grey'}}>Centre Email: </strong>{centre?.Email?.value}</p>
                        <p style={{marginTop:'-5%'}}><strong style={{color:'grey'}}>Centre Contact No: </strong>{centre?.ContactNo?.value}</p>
                        <p style={{marginTop:'-5%'}}><strong style={{color:'grey'}}>Centre Location: </strong>{centre?.Location?.value}</p>
                    
                    </Modal.Body>

                    <Modal.Footer>
                        <div style={{marginRight:'45%'}}>
                            <Button size='sm' variant="flat" onClick={()=>{window.location.href = "/userpanel/HomeScreen";}}>
                                <HouseDoorFill className="" size={20} />
                            </Button>
                        </div>
                        
                        <Button size='sm' variant="flatSolid" onClick={()=>{window.location.href = "/userpanel/HomeScreen";}}>
                            <PrinterFill className="" size={20} />
                        </Button>
                        <Button size='sm' variant="flatSolid" onClick={()=>{window.location.href = "/user/my-account";}}>
                            View My Appointments
                        </Button>
                    </Modal.Footer>
                </div>
            </Modal>
        </div>

        <UserPanelFooter></UserPanelFooter>

    </div> );
};

export default MakeAppointment;