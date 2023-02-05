import React,{useState} from "react";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Sidebar from "../../Components_for_All_Panels/BloodCentre/SideNavbar";
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import CardGroup from 'react-bootstrap/CardGroup';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import Header from "../../Components_for_All_Panels/BloodCentre/Header";
 
const BloodStock=()=> {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  <>
    return (
      <Modal fade={false} show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="name@example.com"
                autoFocus
              />
            </Form.Group>
            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Label>Example textarea</Form.Label>
              <Form.Control as="textarea" rows={3} />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    );
  </>
  return (
    <Container fluid>
      <Header />
      <Row>
        <Col xs={3}>
            <Sidebar/>        
        </Col>
        <Col className="mt-md-5" xs={9}>
          <CardGroup>
            <Col className="mt-md-5 mx-2" xs={12} md={3}>  
                <Card style={{marginTop:30,paddingBottom:10}}>
                    <Card.Img variant="top" src="/100px180" />
                    <Card.Body>
                        <Card.Title>Blood Stock-1</Card.Title>
                        <Button variant="primary" onClick={handleShow}>Details</Button>
                        <Button variant="danger">Update Details</Button>
                    </Card.Body>
                </Card>
            </Col>
            <Col className="mt-md-5 mx-2" xs={12} md={3}>  
                <Card style={{marginTop:30,paddingBottom:10}}>
                    <Card.Img variant="top" src="/100px180" />
                    <Card.Body>
                    <Card.Title>Blood Stock-2</Card.Title>
                    <Button variant="primary">Go to Details-2</Button>
                    <Button variant="danger">Update Details</Button>
                    </Card.Body>
                </Card>
            </Col>
            <Col className="mt-md-5 mx-2" xs={12} md={3}>  
                <Card style={{marginTop:30,paddingBottom:10}}>
                    <Card.Img variant="top" src="/100px180" />
                    <Card.Body>
                    <Card.Title>Blood Stock-2</Card.Title>
                    <Button variant="primary">Go to Details-2</Button>
                    <Button variant="danger">Update Details</Button>
                    </Card.Body>
                </Card>
            </Col>
        </CardGroup>


        </Col>
      </Row>
    </Container>
  );
}

export default BloodStock;