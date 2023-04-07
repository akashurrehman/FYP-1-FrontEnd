import React from "react";
import { Container,  Navbar, Nav, Button,NavDropdown,Row,Col } from 'react-bootstrap';
import { Person,EnvelopePaper,ArrowRight,PersonBadge } from 'react-bootstrap-icons';
import logo from '../../Public/user/image/AppLogo4.png';

import './css/style.css';

const UserPanelHeader = () => {

    const [isHover, setIsHover] = React.useState(true);

    const handleMouseEnter = () => {
        setIsHover(false);
    };

    const handleMouseLeave = () => {
        setIsHover(true);
    };
    const ButtonStyle = {
        backgroundColor: isHover ? 'rgb(160, 15, 15)' : 'rgb(160, 15, 15)',
        color: isHover ? 'white' : 'white',
        transform: isHover ? 'scale(0.85)' : 'scale(0.9)',
        border: isHover ? '' : '1px solid white',
        transitionDuration: isHover ? '' : '0.45s',
    };

    return ( <div>
        <Navbar collapseOnSelect expand="lg" bg="" variant="light" className='Navbar' fixed="top">
            <div className="d-flex" style={{paddingLeft:'2%'}}>
            <img src={logo} alt="logo" width="3.1%" height="43rem" />
            <Navbar.Brand href="/user/home"><h3 className="TextColor d-flex"><div style={{fontFamily:'cursive',color:'rgb(150, 60, 60)'}}>life</div>Blood</h3></Navbar.Brand>
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
                        <Nav.Link className="Menu" href="/user/home">Blood Analysis
                                <ul className="hello">
                                    <Row>
                                        <Col sm={6}><Nav.Link className="Link" href="#"><EnvelopePaper className="p-1" size={26} />Post Blood Request</Nav.Link></Col>
                                        <Col sm={6}><Nav.Link className="Link" href="#"><EnvelopePaper className="p-1" size={26} />Post Blood Request</Nav.Link></Col>
                                    </Row>
                                    <Row>
                                        <Col sm={6}><Nav.Link className="Link" href="#"><EnvelopePaper className="p-1" size={26} />Post Blood Request</Nav.Link></Col>
                                        <Col sm={6}><Nav.Link className="Link" href="#"><EnvelopePaper className="p-1" size={26} />Post Blood Request</Nav.Link></Col>
                                    </Row>
                                    <Row>
                                        <Col sm={6}><Nav.Link className="Link" href="#"><EnvelopePaper className="p-1" size={26} />Post Blood Request</Nav.Link></Col>
                                        <Col sm={6}><Nav.Link className="Link" href="#"><EnvelopePaper className="p-1" size={26} />Post Blood Request</Nav.Link></Col>
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
                <Nav>
                    <Nav.Link href="/user/contact-us">About us</Nav.Link>
                </Nav>
                <Nav>
                <Button variant="default" style={ButtonStyle} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} >Login <ArrowRight className="" size={17} /></Button>  
                </Nav>
                
                </div>
            </Navbar.Collapse>
            </div>
        </Navbar>

    </div> );
}
 
export default UserPanelHeader;