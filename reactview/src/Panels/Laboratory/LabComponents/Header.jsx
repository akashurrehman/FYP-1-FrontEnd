import React from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

function Header(props) {
  return (
    <Navbar style={{backgroundColor:"#153250",color:"#FFFFFF",paddingLeft:"60px"}} expand="lg" fixed="top" textColor="#FFFFFF">
      <Container>
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
            <Nav.Link href="/lab/home" style={{color:"#FFFFFF" }}>Dashboard/Home</Nav.Link>
            <Nav.Link href="/lab/profileSettings" style={{color:"#FFFFFF" }}>Profile Settings</Nav.Link>
            <Nav.Link href="/lab/ReportRequest" style={{color:"#FFFFFF" }}>
                Applicants Report Verify/ Reject
            </Nav.Link>
          </Nav>
            <Nav>
              <Nav.Link onClick={localStorage.removeItem('token')} style={{color:"#FFFFFF" }}>
                Logout
              </Nav.Link>
            </Nav>
            <Nav>
                <Nav.Link href="#Help" style={{color:"#FFFFFF" }}>
                    Help
                </Nav.Link>
            </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;