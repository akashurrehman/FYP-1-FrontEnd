import React from "react";
import { Container,  Navbar, Nav, Button,NavDropdown,Row,Col } from 'react-bootstrap';
import { Person,EnvelopePaper,ArrowRight,PersonBadge } from 'react-bootstrap-icons';
import logo from '../../Public/user/image/AppLogo4.png';

import './css/style.css';
import userLoginService from "../../Services/Api/User/UserLoginService";

const UserPanelHeader = () => {

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
    const ButtonStyle2 = {
        backgroundColor: isHover ? 'white' : 'white',
        color: isHover ? 'rgb(160, 15, 15)' : 'rgb(160, 15, 15)',
        transform: isHover ? 'scale(0.8)' : 'scale(0.82)',
        border: isHover ? '1px solid rgb(160, 15, 15)' : '1px solid rgb(160, 15, 15)',
        transitionDuration: isHover ? '' : '0.45s',
    };

    return ( <div>
        <Navbar collapseOnSelect expand="lg" bg="" variant="light" className='Navbar' fixed="top">
            <div className="d-flex" style={{paddingLeft:'2%'}}>
            <img src={logo} alt="logo" width="2.7%" height="40rem" />
            <Navbar.Brand href="/user/home"><h4 className="TextColor d-flex"><div style={{fontFamily:'cursive'}}>Donate</div><div style={{fontFamily:'cursive',color:'rgb(150, 60, 60)',fontSize:'15px'}}> life</div></h4></Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
                <Nav className="me-auto">

                <Nav.Link href="/user/request-maker">Request Makers</Nav.Link>
                <Nav.Link href="/user/donor">Donors</Nav.Link>

                <Nav.Link href="/user/post-blood-request">Post Blood Request</Nav.Link>
                <Nav.Link href="/user/make-blood-donation">Make Blood Donation</Nav.Link>

                <Nav.Link className="" href="/user/blood-donation-centre">Donor Centres</Nav.Link>
                
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
                        <Nav.Link className="Menu" href="/user/home">Packages
                                <ul className="hello">
                                    <Row>
                                        <Col sm={6}><Nav.Link className="Link" href="/user/campaign">Campaigns</Nav.Link></Col>
                                        <Col sm={6}><Nav.Link className="Link" href="/user/news">News</Nav.Link></Col>
                                    </Row>
                                    <Row>
                                        <Col sm={6}><Nav.Link className="Link" href="/user/sponsor">Sponsors</Nav.Link></Col>
                                        <Col sm={6}><Nav.Link className="Link" href="/user/financial-donation">Financial Donors</Nav.Link></Col>
                                    </Row>
                                    <Row>
                                        <Col sm={6}><Nav.Link className="Link" href="/user/job-post">Job Posts</Nav.Link></Col>
                                        <Col sm={6}><Nav.Link className="Link" href="/user/event">Events</Nav.Link></Col>
                                    </Row>
                                    <Row>
                                        <Col sm={6}><Nav.Link className="Link" href="/user/advertisement">Advertisements</Nav.Link></Col>
                                        <Col sm={6}><Nav.Link className="Link" href="/user/faq">Frequently Asked Questions</Nav.Link></Col>
                                    </Row>
                                </ul>
                            
                        </Nav.Link>
                    </ul>
                </Nav>

                </Nav>

                <div className='d-flex justify-content-center' style={{marginRight:'-5%'}}>
                <Nav>
                    <Nav.Link href="/user/contact-us">Help</Nav.Link>
                </Nav>
                
                
                {!userLoginService.isLoggedIn() ? (
                    <>
                        <Nav>
                            <Nav.Link href="/user/contact-us">Contact Us</Nav.Link>
                        </Nav>
                        <Nav>
                            <Button variant="default" style={ButtonStyle1} 
                            onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} 
                            href='/user/login' >Login <ArrowRight className="" size={17} /></Button>  
                        </Nav>
                    </>
                ) : (
                    <>
                        <Nav>
                            <Nav.Link href="/user/my-account">My Account</Nav.Link>
                        </Nav>
                        <Nav>
                            <Button variant="default" style={ButtonStyle2} 
                            onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} 
                            onClick={(e) => {
                                userLoginService.logout();
                                window.location.reload();
                            }}>Logout <ArrowRight className="" size={17} /></Button>  
                        </Nav>
                    </>
                )}
                
                
                </div>
            </Navbar.Collapse>
            </div>
        </Navbar>

    </div> );
}
 
export default UserPanelHeader;