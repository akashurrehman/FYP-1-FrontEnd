import React from 'react';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Dropdown } from 'react-bootstrap';
import './style/navbar.css'

function Header(props) {
  return (
    <Navbar style={{backgroundColor:"#782F40",color:"#FFFFFF",paddingLeft:"50px"}} expand="lg" fixed="top" id="visi" textColor="#FFFFFF">
      <Container fluid>
        <Navbar.Brand>
        <img
                src="/Images/blood-center.jpg"
                style={{
                  width: '35px',
                  height: '35px',
                  borderRadius: '50%'
              }}
                alt="Notification-icon"
                className="d-inline-block align-top mx-2"
              /></Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll" style={{color:"#FFFFFF"}}>
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: '100px',color:"#FFFFFF" }}
            navbarScroll
          >
            <Nav.Link href="#action1" style={{color:"#FFFFFF" }}>Dashboard/Home</Nav.Link>
            <Nav.Link href="#action2" style={{color:"#FFFFFF" }}>Support</Nav.Link>
            <Nav.Link href="#action2" style={{color:"#FFFFFF" }}>Policies</Nav.Link>
            {/* <NavDropdown title="About Us" id="navbarScrollingDropdown">
              <NavDropdown.Item href="#action3">Action</NavDropdown.Item>
              <NavDropdown.Item href="#action4">
                Another action
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action5">
                Something else here
              </NavDropdown.Item>
            </NavDropdown> */}
            <Nav.Link href="#" style={{color:"#FFFFFF" }}>
              Link
            </Nav.Link>
          </Nav>
            <Nav>
              <Nav.Link href="#Home1" style={{color:"#FFFFFF" }}>
              <img
                src="/Images/bell-notification.jpg"
                style={{
                  width: '30px',
                  height: '30px',
                  borderRadius: '50%'
              }}
                alt="user Profile"
                className="d-inline-block align-top mx-2"
              />
              </Nav.Link>
            </Nav>
         
              <img
                src="/Images/blood-center.jpg"
                style={{
                  width: '30px',
                  height: '30px',
                  borderRadius: '50%'
              }}
                alt="user Profile"
                className="d-inline-block align-top mx-2"
              />
          <Form className="d-flex">
          <Dropdown>
            <Dropdown.Toggle variant="primary" id="dropdown-basic">
                
            </Dropdown.Toggle>

            <Dropdown.Menu style={{position: 'absolute', left: '-450%'}}>
                <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
                <Dropdown.Item href="#/action-2">Help</Dropdown.Item>
                <Dropdown.Item href="#/action-3">Logout</Dropdown.Item>
            </Dropdown.Menu>
        </Dropdown>
          </Form>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;