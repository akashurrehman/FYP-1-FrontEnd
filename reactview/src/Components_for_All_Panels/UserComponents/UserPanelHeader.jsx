import React from "react";
import { Container,  Navbar, Nav, Button } from 'react-bootstrap';

const UserPanelHeader = () => {

    return ( <div>

        <Navbar collapseOnSelect expand="lg" bg="" variant="light" className='' fixed="">
            <Container>
            <Navbar.Brand href="/"><h2>DONORS</h2></Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
                <Nav className="me-auto">
                <Nav.Link href="/">Home</Nav.Link>
                <Nav.Link href="/not-found">Post Blood Request</Nav.Link>
                <Nav.Link href="/flight-data">Blood Request</Nav.Link>
                <Nav.Link href="/flight-data">Blood Donation</Nav.Link>
                </Nav>

                <Nav>
                <Nav.Link href="/contact-us">Help</Nav.Link>
                </Nav>
                <Nav>
                    <Button>
                        <Nav.Link href="/login">Login</Nav.Link>
                    </Button>
                    
                </Nav>
            </Navbar.Collapse>
            </Container>
        </Navbar>

    </div> );
}
 
export default UserPanelHeader;