import React from "react";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Sidebar from "../../Components_for_All_Panels/BloodCentre/SideNavbar";
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import CardGroup from 'react-bootstrap/CardGroup';
import Header from '../../Components_for_All_Panels/BloodCentre/Header';
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
      <Header />
      <Row>
        <Col xs={3}>
            <Sidebar/>        
        </Col>
        <Col className="mt-md-5" xs={9}>
          <Card style={{marginTop:30,paddingBottom:5,alignItems:"center",justifyContent:"center"}} >
            <Card.Img variant="top" src="/Images/blood-Center.jpg" alt="Image" style={mystyle} className="d-inline-block align-top mx-2"/>
            <Card.Body>
              <Card.Title >Blood Donation Website: Dashboard</Card.Title>
            </Card.Body>
          </Card>
          <CardGroup style={{alignItems:"center",justifyContent:"center"}}>
            <Col className="mt-md-5 px-2" md={4}>  
                <Card style={{marginTop:10,paddingBottom:10}}>
                    <Card.Img variant="top" src="/100px180" />
                    <Card.Body>
                        <Card.Title>Total Blood Requests:{100}</Card.Title>
                        <Button variant="primary">See Requests Details</Button>
                    </Card.Body>
                </Card>
            </Col>
            <Col className="mt-md-5 px-2" md={4}>  
                <Card style={{marginTop:10,paddingBottom:10}}>
                    <Card.Img variant="top" src="/100px180" />
                    <Card.Body>
                    <Card.Title>Total Blood Center Users:{100}</Card.Title>
                    <Button variant="primary">See All Users</Button>
                    </Card.Body>
                </Card>
            </Col>
        </CardGroup>
          <Card border="danger" style={{marginTop:30,paddingBottom:10}}>
            <Card.Body>
              <Card.Title><i className="fa fa-flag" aria-hidden="true"></i>Important  Notification</Card.Title>
              <p>

              </p>
            </Card.Body>
          </Card>
          <Card border="light" style={{marginTop:30,paddingBottom:10}}>
            <Card.Body>
              <Card.Title><i className="fa fa-calendar" aria-hidden="true"></i>Upcoming Events</Card.Title>
              <p>
                
              </p>
            </Card.Body>
          </Card>
            <Card border="info" style={{marginTop:30,paddingBottom:10}}>
              <Card.Body>
                <Card.Title><i className="fa fa-folder" aria-hidden="true"></i>Blood Stock Overview/Available Blood Stock</Card.Title>
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