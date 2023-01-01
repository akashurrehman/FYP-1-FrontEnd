import React from "react";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Sidebar from "../../Components_for_All_Panels/BloodCentre/SideNavbar";
import Card from 'react-bootstrap/Card';
import CardGroup from 'react-bootstrap/CardGroup';
import Button from 'react-bootstrap/Button';


const Appointments=()=> {
  return (
    <Container fluid>
      <Row>
        <Col xs={3}>
            <Sidebar/>        
        </Col>
        <Col className="mt-md-5" xs={9}>
        <CardGroup>
          <Col className="mt-md-5" xs={12} md={4}>  
                <Card style={{marginTop:30,paddingBottom:10}}>
                    <Card.Img variant="top" src="/100px180" />
                    <Card.Body>
                        <Card.Title>Appointments of User</Card.Title>
                        <Button variant="primary">Customize this Page</Button>
                    </Card.Body>
                </Card>
            </Col>
            <Col className="mt-md-5 mx-2" xs={12} md={4}>  
                <Card style={{marginTop:30,paddingBottom:10}}>
                    <Card.Img variant="top" src="/100px180" />
                    <Card.Body>
                    <Card.Title>Appointments of User</Card.Title>
                    <Button variant="primary">Customize this Page</Button>
                    </Card.Body>
                </Card>
            </Col>
        </CardGroup>
        </Col>
      </Row>
    </Container>
  );
}

export default Appointments;