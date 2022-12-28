import Nav from 'react-bootstrap/Nav';
import React from 'react'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';

const Footer=()=> {
  return (
    <Container fluid className="mt-3">  
      <Row className="py-2" style={{backgroundColor:"#782F40",color:"#FFFFFF",marginTop:"10%"}}>
        <Col sm={6} md={3}>

        </Col>
        <Col sm={3}>
        <h2>Technical Help</h2>
            <Nav defaultActiveKey="/home" className="flex-column">
                <Nav.Link href="/home">Active</Nav.Link>
                <Nav.Link eventKey="link-1">Link</Nav.Link>
                <Nav.Link eventKey="link-2">Link</Nav.Link>
                <Nav.Link eventKey="disabled">
                    Disabled
                </Nav.Link>
            </Nav>
        </Col>
        <Col sm={3}  className="mt-5">
            <Button variant="primary">Get Mobile App</Button>
        </Col>
      </Row>
    </Container>
  );
}

export default Footer;
