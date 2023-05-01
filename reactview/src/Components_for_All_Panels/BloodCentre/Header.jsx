import React from 'react';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Dropdown } from 'react-bootstrap';
import './style/navbar.css'

function Header(props) {
  return (
    <Navbar style={{backgroundColor:"#153250",color:"#FFFFFF",paddingLeft:"60px"}} expand="lg" fixed="top" id="visi" textColor="#FFFFFF">
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
            <Nav.Link href="/bloodCenter/HomeScreen" style={{color:"#FFFFFF" }}><i class="fa fa-home" aria-hidden="true"></i>Dashboard/Home</Nav.Link>
            <Nav.Link href="/bloodCenter/addbloodRequest" style={{color:"#FFFFFF" }}><i class="fa fa-tint" aria-hidden="true"></i>Add Blood Request</Nav.Link>
            <Nav.Link href="/bloodCenter/addNewUser" style={{color:"#FFFFFF" }}><i class="fa fa-address-card" aria-hidden="true"></i>Add New User</Nav.Link>
           
            <Nav.Link href="#" style={{color:"#FFFFFF" }}>
            <i class="fa fa-filter" aria-hidden="true"></i>Other Options
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
            <Dropdown.Toggle variant="primary" id="dropdown-basic" style={{ backgroundColor: "white", color: "red",height:"auto",width:"auto"}} caret>
                
            </Dropdown.Toggle>

            <Dropdown.Menu style={{position: 'absolute', left: '-450%'}}>
                <Dropdown.Item href="#/action-1">My Account <i class="fa fa-user-md" aria-hidden="true"></i></Dropdown.Item>
                <Dropdown.Item href="#/action-2">Help <i class="fa fa-question-circle" aria-hidden="true"></i></Dropdown.Item>
                <Dropdown.Item href="#/action-3">Logout <i class="fa fa-sign-in" aria-hidden="true"></i></Dropdown.Item>
            </Dropdown.Menu>
        </Dropdown>
          </Form>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;