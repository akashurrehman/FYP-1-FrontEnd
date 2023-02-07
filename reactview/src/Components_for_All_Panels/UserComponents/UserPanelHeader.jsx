import React from "react";
import { Container,  Navbar, Nav, Button,NavDropdown } from 'react-bootstrap';
import { Person,EnvelopePaper } from 'react-bootstrap-icons';
import logo from '../../Public/user/image/AppLogo4.png';

import './css/style.css';

const UserPanelHeader = () => {



    return ( <div>
        <Navbar collapseOnSelect expand="lg" bg="" variant="light" className='Navbar' fixed="top">
            <div className="d-flex" style={{paddingLeft:'4%'}}>
            <img src={logo} alt="logo" width="3.5%" height="50rem" />
            <Navbar.Brand href="/user/home"><h2 className="TextColor d-flex"><div style={{fontFamily:'cursive',color:'rgb(150, 60, 60)'}}>life</div>Blood</h2></Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
                <Nav className="me-auto">

                <Nav.Link href="/user/request-maker">Request Makers</Nav.Link>
                <Nav.Link href="/user/donor">Donors</Nav.Link>

                <Nav.Link href="/user/post-blood-request">Post Blood Request</Nav.Link>
                <Nav.Link href="/user/make-blood-donation">Make Blood Donation</Nav.Link>

                <Nav.Link className="" href="/user/blood-donation-centre">Donor Centres</Nav.Link>
                
                <Nav.Link className="" href="/user/request-maker">
                    <div class="dropdown">
                        <button class="dropbtn">Book Appointment</button>
                        <div class="dropdown-content">
                            <a href="#">Link 1</a>
                            <a href="#">Link 2</a>
                            <a href="#">Link 3</a>
                        </div>
                    </div>
                </Nav.Link>
                
                <Nav className="me-auto">
                    <ul>
                        <Nav.Link className="Menu" href="/user/home">Blood Analysis
                            <ul>
                                <Nav.Link className="Link Menu" href="#"><EnvelopePaper className="p-1" size={31} />Post Blood Request</Nav.Link>
                                <Nav.Link className="Link Menu" href="#">View Blood Request</Nav.Link>
                                <Nav.Link className="Link Menu" href="#"></Nav.Link>
                            </ul>
                        </Nav.Link>
                    </ul>
                    
                </Nav>

                </Nav>

                <div className='d-flex justify-content-center' style={{marginRight:'-5%'}}>
                <Nav>
                    <Nav.Link href="/user/contact-us">Help</Nav.Link>
                </Nav>
                <Nav>
                    <Nav.Link href="/user/contact-us">About us</Nav.Link>
                </Nav>
                <Nav>
                    <Button variant="flat" href="/user/login">
                        <Person className="" size={25} />
                        Login
                    </Button>  
                </Nav>
                
                </div>
            </Navbar.Collapse>
            </div>
        </Navbar>

    </div> );
}
 
export default UserPanelHeader;