import React, { useState } from "react";
import { Navbar,Nav,Button,Row,Col,Modal,Image } from 'react-bootstrap';
import { ArrowRight } from 'react-bootstrap-icons';
import CircleNotificationsSharpIcon from '@mui/icons-material/NotificationsActiveSharp';
import LogoutSharpIcon from '@mui/icons-material/LogoutSharp';

import DoneAllSharpIcon from '@mui/icons-material/DoneAllSharp';
import SettingsSharpIcon from '@mui/icons-material/SettingsSharp';
import logo from '../../Public/user/image/AppLogo4.png';
import image_news from '../../Public/user/image/news.png';
import image_campaign from '../../Public/user/image/campaign.png';
import image_event from '../../Public/user/image/event.png';
import image_sponsor from '../../Public/user/image/sponsor.png';
import image_financial_donor from '../../Public/user/image/financial_donor.png';
import image_job_post from '../../Public/user/image/job.png';
import image_faq from '../../Public/user/image/faq.png';
import image_advertisement from '../../Public/user/image/advertisement.png';
import image_all_blood_request from '../../Public/user/image/all-blood-request-menu.jpg';
import image_post_blood_request from '../../Public/user/image/post-blood-request-menu.png';
import image_my_blood_request from '../../Public/user/image/my-request-menu.jpg';
import image_accepted_blood_request from '../../Public/user/image/accepted-blood-request-menu.png';
import image_all_blood_donation from '../../Public/user/image/all-blood-donation-menu.png';
import image_make_blood_donation from '../../Public/user/image/make-blood-donation-menu.png';
import image_my_blood_donation from '../../Public/user/image/my-donation-menu.png';
import image_all_centre from '../../Public/user/image/all-centre-menu.png';
import image_book_appointment from '../../Public/user/image/book-appointment-menu.png';
import image_my_appointment from '../../Public/user/image/my-appointment-menu.png';


import './css/style.css';
import userLoginService from "../../Services/Api/User/UserLoginService";
import jwtDecode from "jwt-decode";
import notificationService from '../../Services/Api/User/NotificationService';
import SingleNotification from "./notifications/SingleNotification";


const UserPanelHeader = () => {

    //Get id from token 
    const token = localStorage.getItem('token');
    const decodedToken = token ? jwtDecode(token) : null;
    const id = decodedToken?.id;
    console.log(id);

    const [notifications, setNotifications] = React.useState([]);

    const getData = () => {
        notificationService
            .getNotificationByRequestMakerID(id)
            .then((data) => {
                setNotifications(data);
            })
            .catch((err) => {
                console.log(err);
            });
    };
    React.useEffect(getData, []);
    console.log(notifications.results);

    const [isHover, setIsHover] = React.useState(true);

    const handleMouseEnter = () => {
        setIsHover(false);
    };

    const handleMouseLeave = () => {
        setIsHover(true);
    };
    const ButtonStyle1 = {
        backgroundColor: isHover ? '#D64045' : '#27213C',
        color: isHover ? 'white' : 'white',
        transform: isHover ? 'scale(0.76)' : 'scale(0.76)',
        border: isHover ? '' : '1px solid #D64045',
        transitionDuration: isHover ? '' : '0.45s',
    };
    const ButtonStyle2 = {
        backgroundColor: isHover ? 'white' : 'white',
        color: isHover ? '#D64045' : 'rgb(160, 15, 15)',
        transform: isHover ? 'scale(0.76)' : 'scale(0.76)',
        border: isHover ? '1px solid #D64045' : '1px solid rgb(160, 15, 15)',
        transitionDuration: isHover ? '' : '0.45s',
    };

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return ( <div>
        <Navbar collapseOnSelect expand="lg" bg="" variant="light" className='Navbar' fixed="top">
            <div className="d-flex" style={{paddingLeft:'3%'}}>
            <img src={logo} alt="logo" width="3.2%" height="40rem" />
            <Navbar.Brand href="/userpanel/HomeScreen"><h4 className="d-flex"><div style={{fontFamily:'cursive',color:"#D64045"}}>Donate</div><div style={{fontFamily:'cursive',color:'#27213C',fontSize:'15px'}}> life</div></h4></Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
                <Nav className="me-auto">
                
                <Nav>
                    <Nav.Link href="/user/blood-analysis">Blood Analysis</Nav.Link>
                </Nav>
                
                <Nav className="me-auto">
                    <ul className="list">
                        <Nav.Link className="Menu" href="/user/donor">Donors
                                <ul className="hello" style={{marginLeft:'-80%',width:'850%'}}>
                                    <Row style={{marginTop:'5%',marginLeft:'1%',marginRight:'2%',paddingBottom:'5%'}}>
                                        
                                        <Col sm={6}>
                                            <div style={{textAlign:'left'}}>
                                                <Image src={image_all_blood_donation} rounded style={{marginLeft: "0%",marginTop:'0%',height: "3rem",opacity:'1.0'}}></Image>
                                                <Nav.Link style={{fontSize:'20px',fontWeight:'500',marginLeft:'-2.5%'}} className="RedColor" href="/user/donor">View All Blood Donors <ArrowRight className="" size={17} /></Nav.Link>
                                                <p className="" style={{fontSize:'14px',color:'gray'}}>
                                                There are donor all across the country/city. Find donor one that's closest to you.
                                                </p>
                                            </div>
                                            
                                        </Col>
                                        <Col sm={6}>
                                            <div style={{textAlign:'left'}}>
                                                <Image src={image_make_blood_donation} rounded style={{marginLeft: "0%",marginTop:'0%',height: "3rem",opacity:'1.0'}}></Image>
                                                <Nav.Link style={{fontSize:'20px',fontWeight:'500',marginLeft:'-2.5%'}} className="RedColor" href="/user/make-blood-donation">Become a Blood Donor <ArrowRight className="" size={17} /></Nav.Link>
                                                <p className="" style={{fontSize:'14px',color:'gray'}}>
                                                If you want to a become a blood donor, you will create multiple donors profile on a single account. 
                                                </p>
                                            </div>
                                        </Col>
                                        
                                    </Row>
                                    {userLoginService.isLoggedInWithUserRole() ? (
                                        <>
                                        <Row style={{marginTop:'5%',marginLeft:'1%',marginRight:'2%',paddingBottom:'5%'}}>
                                            <Col sm={6}>
                                                <div style={{textAlign:'left'}}>
                                                    <Image src={image_my_blood_donation} rounded style={{marginLeft: "0%",marginTop:'0%',height: "3rem",opacity:'1.0'}}></Image>
                                                    <Nav.Link style={{fontSize:'20px',fontWeight:'500',marginLeft:'-2.5%'}} className="RedColor" href="/user/my-account">My Blood Donations <ArrowRight className="" size={17} /></Nav.Link>
                                                    <p className="" style={{fontSize:'14px',color:'gray'}}>
                                                    View your blood donors that is created by you to your account. 
                                                    </p>
                                                </div>
                                                
                                            </Col>
                                            <Col sm={6}>
                                                
                                            </Col>
                                        </Row>
                                        </>
                                    ):(
                                        <>
                                        
                                        </>
                                    )}
                                    
                                    
                                </ul>
                            
                        </Nav.Link>
                    </ul>
                </Nav>
                
                <Nav className="me-auto">
                    <ul className="list">
                        <Nav.Link className="Menu" href="/user/blood-donation-centre">Centres
                                <ul className="hello" style={{marginLeft:'-80%',width:'850%'}}>
                                    <Row style={{marginTop:'5%',marginLeft:'1%',marginRight:'2%',paddingBottom:'5%'}}>
                                        
                                        <Col sm={6}>
                                            <div style={{textAlign:'left'}}>
                                                <Image src={image_all_centre} rounded style={{marginLeft: "0%",marginTop:'0%',height: "3rem",opacity:'1.0'}}></Image>
                                                <Nav.Link style={{fontSize:'20px',fontWeight:'500',marginLeft:'-2.5%'}} className="RedColor" href="/user/blood-donation-centre">Blood Donations Centres <ArrowRight className="" size={17} /></Nav.Link>
                                                <p className="" style={{fontSize:'14px',color:'gray'}}>
                                                There are donation centres all across the country. Find one that's closest to you.
                                                </p>
                                            </div>
                                            
                                        </Col>
                                        <Col sm={6}>
                                            <div style={{textAlign:'left'}}>
                                                <Image src={image_book_appointment} rounded style={{marginLeft: "0%",marginTop:'0%',height: "3rem",opacity:'1.0'}}></Image>
                                                <Nav.Link style={{fontSize:'20px',fontWeight:'500',marginLeft:'-2.5%'}} className="RedColor" href="/user/blood-donation-centre">Book Appointment <ArrowRight className="" size={17} /></Nav.Link>
                                                <p className="" style={{fontSize:'14px',color:'gray'}}>
                                                Make your appointment for the blood donation in the closest or nearest center. 
                                                </p>
                                            </div>
                                        </Col>
                                        
                                    </Row>
                                    {userLoginService.isLoggedInWithUserRole() ? (
                                        <>
                                        <Row style={{marginTop:'5%',marginLeft:'1%',marginRight:'2%',paddingBottom:'5%'}}>
                                            <Col sm={6}>
                                                <div style={{textAlign:'left'}}>
                                                    <Image src={image_my_appointment} rounded style={{marginLeft: "0%",marginTop:'0%',height: "3rem",opacity:'1.0'}}></Image>
                                                    <Nav.Link style={{fontSize:'20px',fontWeight:'500',marginLeft:'-2.5%'}} className="RedColor" href="/user/my-account">My Appointments <ArrowRight className="" size={17} /></Nav.Link>
                                                    <p className="" style={{fontSize:'14px',color:'gray'}}>
                                                    View your appointments for the blood donation anytime and gets reminder about your appointments.
                                                    </p>
                                                </div>
                                                
                                            </Col>
                                            <Col sm={6}>
                                                
                                            </Col>
                                        </Row>
                                        </>
                                    ):(
                                        <>
                                        
                                        </>
                                    )}
                                    
                                    
                                </ul>
                            
                        </Nav.Link>
                    </ul>
                </Nav>
                
                <Nav className="me-auto">
                    <ul className="list">
                        <Nav.Link className="Menu" href="/user/request-maker">Requests
                                <ul className="hello" style={{marginLeft:'-80%',width:'850%'}}>
                                    <Row style={{marginTop:'5%',marginLeft:'1%',marginRight:'2%',paddingBottom:'5%'}}>
                                        
                                        <Col sm={6}>
                                            <div style={{textAlign:'left'}}>
                                                <Image src={image_all_blood_request} rounded style={{marginLeft: "0%",marginTop:'0%',height: "3rem",opacity:'1.0'}}></Image>
                                                <Nav.Link style={{fontSize:'20px',fontWeight:'500',marginLeft:'-2.5%'}} className="RedColor" href="/user/request-maker">View All Blood Requests <ArrowRight className="" size={17} /></Nav.Link>
                                                <p className="" style={{fontSize:'14px',color:'gray'}}>
                                                There are request makers all across the country. Find one that's closest to you and accept other users requests.
                                                </p>
                                            </div>
                                            
                                        </Col>
                                        <Col sm={6}>
                                            <div style={{textAlign:'left'}}>
                                                <Image src={image_post_blood_request} rounded style={{marginLeft: "0%",marginTop:'0%',height: "3rem",opacity:'1.0'}}></Image>
                                                <Nav.Link style={{fontSize:'20px',fontWeight:'500',marginLeft:'-2.5%'}} className="RedColor" href="/user/post-blood-request">Post Blood Request <ArrowRight className="" size={17} /></Nav.Link>
                                                <p className="" style={{fontSize:'14px',color:'gray'}}>
                                                If any one required blood any time they can post blood request of required blood.
                                                </p>
                                            </div>
                                        </Col>
                                        
                                    </Row>
                                    {userLoginService.isLoggedInWithUserRole() ? (
                                        <>
                                        <Row style={{marginTop:'5%',marginLeft:'1%',marginRight:'2%',paddingBottom:'5%'}}>
                                            <Col sm={6}>
                                                <div style={{textAlign:'left'}}>
                                                    <Image src={image_my_blood_request} rounded style={{marginLeft: "0%",marginTop:'0%',height: "3rem",opacity:'1.0'}}></Image>
                                                    <Nav.Link style={{fontSize:'20px',fontWeight:'500',marginLeft:'-2.5%'}} className="RedColor" href="/user/my-account">My Blood Requests <ArrowRight className="" size={17} /></Nav.Link>
                                                    <p className="" style={{fontSize:'14px',color:'gray'}}>
                                                    View your blood requests that is posted by you to your account.
                                                    </p>
                                                </div>
                                                
                                            </Col>
                                            <Col sm={6}>
                                                <div style={{textAlign:'left'}}>
                                                    <Image src={image_accepted_blood_request} rounded style={{marginLeft: "0%",marginTop:'0%',height: "3rem",opacity:'1.0'}}></Image>
                                                    <Nav.Link style={{fontSize:'20px',fontWeight:'500',marginLeft:'-2.5%'}} className="RedColor" href="/user/my-account">Accepted Blood Requests <ArrowRight className="" size={17} /></Nav.Link>
                                                    <p className="" style={{fontSize:'14px',color:'gray'}}>
                                                    View blood requests that is accepted by you from your account. When you accept other user requests, they will receive a notification.
                                                    </p>
                                                </div>
                                            </Col>
                                        </Row>
                                        </>
                                    ):(
                                        <>
                                        
                                        </>
                                    )}
                                    
                                    
                                </ul>
                            
                        </Nav.Link>
                    </ul>
                </Nav>


                {/* <Nav.Link className="" href="/user/request-maker">
                    <div class="dropdown">
                        <button class="dropbtn">Book Appointment</button>
                        <div class="dropdown-content">
                            <a href="#">Link 1</a>
                            <a href="#">Link 2</a>
                            <a href="#">Link 3</a>
                        </div>
                    </div>
                </Nav.Link> */}
                
                <Nav className="me-auto">
                    <ul className="list">
                        <Nav.Link style={{}} className="Menu" href="/user/home">Packages
                                <ul className="hello" style={{marginLeft:'-600%',width:'1500%'}}>
                                    <Row style={{marginTop:'5%',marginLeft:'1%',marginRight:'2%'}}>
                                        
                                        <Col sm={3}>
                                            <div style={{textAlign:'left'}}>
                                                <Image src={image_news} rounded style={{marginLeft: "0%",marginTop:'0%',height: "3rem",opacity:'1.0'}}></Image>
                                                <Nav.Link style={{fontSize:'20px',fontWeight:'500',marginLeft:'-2.5%'}} className="RedColor" href="/user/news">News <ArrowRight className="" size={17} /></Nav.Link>
                                                <p className="" style={{fontSize:'14px',color:'gray'}}>
                                                View latest news on our blood donation website thats helps you to be updated with latest news.
                                                </p>
                                            </div>
                                            
                                        </Col>
                                        <Col sm={3}>
                                            <div style={{textAlign:'left'}}>
                                                <Image src={image_campaign} rounded style={{marginLeft: "0%",marginTop:'0%',height: "3rem",opacity:'1.0'}}></Image>
                                                <Nav.Link style={{fontSize:'20px',fontWeight:'500',marginLeft:'-2.5%'}} className="RedColor" href="/user/campaign">Campaigns <ArrowRight className="" size={17} /></Nav.Link>
                                                <p className="" style={{fontSize:'14px',color:'gray'}}>
                                                View different campaigns on our blood donation website thats helps you to involved in the latest campaigns.
                                                </p>
                                            </div>
                                        </Col>
                                        <Col sm={3}>
                                            <div style={{textAlign:'left'}}>
                                                <Image src={image_event} rounded style={{marginLeft: "0%",marginTop:'0%',height: "3rem",opacity:'1.0'}}></Image>
                                                <Nav.Link style={{fontSize:'20px',fontWeight:'500',marginLeft:'-2.5%'}} className="RedColor" href="/user/event">Events <ArrowRight className="" size={17} /></Nav.Link>
                                                <p className="" style={{fontSize:'14px',color:'gray'}}>
                                                View latest events on our blood donation website thats helps you to attend different donating events.
                                                </p>
                                            </div>
                                        </Col>
                                        <Col sm={3}>
                                            <div style={{textAlign:'left'}}>
                                                <Image src={image_advertisement} rounded style={{marginLeft: "0%",marginTop:'0%',height: "3.0rem",opacity:'1.0'}}></Image>
                                                <Nav.Link style={{fontSize:'20px',fontWeight:'500',marginLeft:'-2.5%'}} className="RedColor" href="/user/job-post">Advertisements <ArrowRight className="" size={17} /></Nav.Link>
                                                <p className="" style={{fontSize:'14px',color:'gray'}}>
                                                View latest advertisement (adds) on our blood donation website about blood donations.
                                                </p>
                                            </div>
                                            
                                        </Col>
                                    </Row>
                                    <Row style={{marginTop:'5%',marginLeft:'1%',marginRight:'2%',paddingBottom:'5%'}}>
                                        
                                        <Col sm={3}>
                                            <div style={{textAlign:'left'}}>
                                                <Image src={image_job_post} rounded style={{marginLeft: "0%",marginTop:'0%',height: "3rem",opacity:'1.0'}}></Image>
                                                <Nav.Link style={{fontSize:'20px',fontWeight:'500',marginLeft:'-2.5%'}} className="RedColor" href="/user/job-post">Job Posts <ArrowRight className="" size={17} /></Nav.Link>
                                                <p className="" style={{fontSize:'14px',color:'gray'}}>
                                                View job posts on our blood donation website thats helps you to find different jobs and gives job opportunity to you.
                                                </p>
                                            </div>
                                            
                                        </Col>
                                        <Col sm={3}>
                                            <div style={{textAlign:'left'}}>
                                                <Image src={image_financial_donor} rounded style={{marginLeft: "0%",marginTop:'0%',height: "3rem",opacity:'1.0'}}></Image>
                                                <Nav.Link style={{fontSize:'20px',fontWeight:'500',marginLeft:'-2.5%'}} className="RedColor" href="/user/financial-donation">Financial Donors <ArrowRight className="" size={17} /></Nav.Link>
                                                <p className="" style={{fontSize:'14px',color:'gray'}}>
                                                View financial donors on our blood donation website thats encourage you to become a financial donor.
                                                </p>
                                            </div>
                                        </Col>
                                        <Col sm={3}>
                                            <div style={{textAlign:'left'}}>
                                                <Image src={image_sponsor} rounded style={{marginLeft: "0%",marginTop:'0%',height: "3rem",opacity:'1.0'}}></Image>
                                                <Nav.Link style={{fontSize:'20px',fontWeight:'500',marginLeft:'-2.5%'}} className="RedColor" href="/user/sponsor">Sponsors <ArrowRight className="" size={17} /></Nav.Link>
                                                <p className="" style={{fontSize:'14px',color:'gray'}}>
                                                View sponsors of our blood donation websites that provides information about your interest.
                                                </p>
                                            </div>
                                        </Col>
                                        <Col sm={3}>
                                            <div style={{textAlign:'left'}}>
                                                <Image src={image_faq} rounded style={{marginLeft: "0%",marginTop:'0%',height: "3rem",opacity:'1.0'}}></Image>
                                                <Nav.Link style={{fontSize:'20px',fontWeight:'500',marginLeft:'-2.5%'}} className="RedColor" href="/user/faq">FAQ's <ArrowRight className="" size={17} /></Nav.Link>
                                                <p className="" style={{fontSize:'14px',color:'gray'}}>
                                                It’s normal to have some questions about donating. We may already have an answer ready for you.
                                                </p>
                                            </div>
                                        </Col>
                                    </Row>
                                    
                                </ul>
                            
                        </Nav.Link>
                    </ul>
                </Nav>

                </Nav>

                <div className='d-flex justify-content-center' style={{marginRight:'-12%'}}>
                <Nav>
                    <Nav.Link href="/user/contact-us">Help</Nav.Link>
                    <Nav.Link href="/user/contact-us">Contact Us</Nav.Link>
                </Nav>
                
                {!userLoginService.isLoggedIn() ? (
                    <>
                        <Nav>
                            <Button variant="default" style={ButtonStyle2} 
                            onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} 
                            href='/user/login' >Login / Register</Button>  
                        </Nav>
                        
                    </>
                ) : (
                    <>
                        <Nav>
                            <Nav.Link onClick={handleShow}><CircleNotificationsSharpIcon sx={{ color: '#27213C', mr:0 , my: 0 }}/></Nav.Link>
                            <Nav.Link onClick={(e) => {
                                    userLoginService.logout();
                                    window.location.href = "/user/login";}}>
                                        <LogoutSharpIcon sx={{ color: '#27213C', mr:0 , my: 0 }}/>
                            </Nav.Link>
                            
                            <div>
                                <Modal show={show} onHide={handleClose}>
                                    <Modal.Header closeButton>
                                    <Modal.Title>Notifications</Modal.Title>
                                    </Modal.Header>
                                    <Modal.Body>
                                        <div>
                                        {notifications.length === 0 ? (
                                            <></>
                                            ) : (
                                                <Row className="d-flex justify-content-center">
                                                    {notifications.results.bindings.map((notification, index) => (
                                                        <Col sm={12} key={index}>
                                                            <SingleNotification key={index} notification={notification} />
                                                        </Col>
                                                        
                                                    ))}
                                                </Row>
                                            )}
                                        </div>
                                        <div style={{marginTop:'7%'}}>
                                            <Row>
                                                <Col sm={1}>
                                                    <Nav.Link style={{color:'grey'}}><SettingsSharpIcon sx={{ color: '', mr:0 , my: 0, fontSize:'large' }}/></Nav.Link>
                                                </Col>
                                                <Col sm={4}>
                                                    <Nav.Link style={{color:'#1824CB'}}><DoneAllSharpIcon sx={{ color: '', mr:0 , my: 0, fontSize:'large' }}/><spam style={{fontSize:'13px'}}> Mark all as read</spam></Nav.Link>
                                                </Col>
                                                <Col sm={7}>
                                                    <div style={{textAlign:'right'}}>
                                                        {/* <Button size='sm' variant="flatSolid" onClick={handleClose}>
                                                            View all notifications
                                                        </Button> */}
                                                    </div>
                                                </Col>
                                            </Row>
                                            
                                        </div>
                                        
                                    </Modal.Body>
                                    
                                </Modal>
                            </div>
                            
                            <Button variant="default" style={ButtonStyle2} 
                            onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} 
                            href="/user/my-account"
                            >Account / Profile</Button>  
                        </Nav>
                    </>
                )}
                
                <Nav>
                    <Button variant="default" style={ButtonStyle1} 
                        onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}
                        href='/user/blood-donation-centre' >Book Appointment Now</Button>  
                </Nav>
                
                </div>
            </Navbar.Collapse>
            </div>
        </Navbar>

    </div> );
}
 
export default UserPanelHeader;