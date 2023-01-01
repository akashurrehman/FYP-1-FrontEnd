import React from "react";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Sidebar from "../../Components_for_All_Panels/BloodCentre/SideNavbar";
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
 import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
  import { faCoffee } from '@fortawesome/free-solid-svg-icons'

const HomeScreen_BloodDonation=()=> {
  const mystyle = {
      height: "7%",
      width: "7%",
      borderRadius: "50%",
      display: "inline-block",
    };
  return (
    <Container fluid>
      <Row>
        <Col xs={3}>
            <Sidebar/>        
        </Col>
        <Col className="mt-md-5" xs={9}>
          <Card style={{marginTop:30,paddingBottom:10}} >
            <Card.Img variant="top" src="/Images/blood-Center.jpg" alt="Image" style={mystyle} className="d-inline-block align-top mx-2"/>
            <Card.Body>
              <Card.Title >Blood Donation Website: Dashboard</Card.Title>
               
              <Button variant="primary">Customize this Page</Button>
        
            </Card.Body>
          </Card>
          <Card border="danger" style={{marginTop:30,paddingBottom:10}}>
            <Card.Body>
              <Card.Title><i class="fa fa-flag" aria-hidden="true"></i>Important  Notification</Card.Title>
              <p>

              </p>
            </Card.Body>
          </Card>
          <Card border="light" style={{marginTop:30,paddingBottom:10}}>
            <Card.Body>
              <Card.Title><i class="fa fa-calendar" aria-hidden="true"></i>Upcoming Events</Card.Title>
              <p>
                
              </p>
            </Card.Body>
          </Card>
            <Card border="info" style={{marginTop:30,paddingBottom:10}}>
              <Card.Body>
                <Card.Title><i class="fa fa-folder" aria-hidden="true"></i>Blood Stock Overview</Card.Title>
                <p>
                
                </p>
              </Card.Body>
            </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default HomeScreen_BloodDonation;