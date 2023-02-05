import React from "react";
import axios from "axios";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Sidebar from "../../Components_for_All_Panels/BloodCentre/SideNavbar";
import Card from 'react-bootstrap/Card';
import CardGroup from 'react-bootstrap/CardGroup';
import Button from 'react-bootstrap/Button';
import Header from "../../Components_for_All_Panels/BloodCentre/Header";


const Appointments=()=> {
/*  
    const endpoint = "http://www.semanticweb.org/samsung/ontologies/2022/10/blood-donation-system#";
    const query = `
    PREFIX bd: <http://www.semanticweb.org/samsung/ontologies/2022/10/blood-donation-system#>
      SELECT *
      WHERE {
      ?users bd:userEnrollsIn bd:DONOR_Website
      }    
    `;
    const sendQuery = async () => {
      console.log("Send Query Function Called");
      try {
        const response = await axios.post(endpoint, {
          query: query
        });
        const results = response.data;
        console.log(results);
      } catch (error) {
        console.error(error);
      }
    };
  */
  return (
    <Container fluid>
      <Header />
      <Row>
        <Col xs={3}>
            <Sidebar />        
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