import React from "react";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Sidebar from "../../Components_for_All_Panels/BloodCentre/SideNavbar";
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Header from "../../Components_for_All_Panels/BloodCentre/Header";

const AddNewUser=()=> {
  return (
    <Container fluid>
      <Header />
      <Row>
        <Col xs={3}>
            <Sidebar/>        
        </Col>
        <Col className="mt-md-5" xs={9}>
          <Card style={{marginTop:30,paddingBottom:10,alignItems:"center",justifyContent:"center"}}>
            <Card.Img variant="top" src="/100px180" />
            <Card.Body>
              <Card.Title>Add New User</Card.Title>
            </Card.Body>
          </Card>
      <Form>
      <Row className="mt-5">
        <Col xs={12}sm={4}>
          <InputGroup className="mb-2">
            <InputGroup.Text><i  class="fa fa-user-ninja"></i></InputGroup.Text>
              <Form.Control placeholder="Full Name" />
          </InputGroup>
        </Col>
        <Col xs={12}sm={4}>
          <InputGroup className="mb-2">
            <InputGroup.Text><i  class="fa fa-user"></i></InputGroup.Text>
              <Form.Label visuallyHidden>UserName</Form.Label>
                <Form.Control placeholder="UserName"/>
          </InputGroup>
        </Col>
        <Col xs={12}sm={4}>
          <InputGroup className="mb-2">
            <InputGroup.Text><i  class="fa fa-envelope"></i></InputGroup.Text>
              <Form.Control placeholder="Email" />
          </InputGroup>
        </Col>
      </Row>
      <Row className="mt-1">
        <Col xs={12}sm={4}>
          <InputGroup className="mb-2">
            <InputGroup.Text><i  class="fa fa-location-arrow"></i></InputGroup.Text>
              <Form.Control placeholder="City" />
          </InputGroup>
        </Col>
        <Col xs={12}sm={4}>
          <InputGroup className="mb-2">
            <InputGroup.Text><i  class="fa fa-location-arrow"></i></InputGroup.Text>
              <Form.Label visuallyHidden>Location</Form.Label>
                <Form.Control defaultValue="Location" />
          </InputGroup>
        </Col>
        <Col xs={12}sm={4}>
          <InputGroup className="mb-2">
            <InputGroup.Text><i  class="fa fa-angry"></i></InputGroup.Text>
              <Form.Control placeholder="Donor's Age" />
          </InputGroup>
        </Col>
      </Row>
      <Row className="mt-1">
        <Col xs={12}sm={4}>
          <InputGroup className="mb-2">
            <InputGroup.Text><i  class="fa fa-phone"></i></InputGroup.Text>
              <Form.Control placeholder="+92-59552658" />
          </InputGroup>
        </Col>
        <Col xs={12}sm={4}>
          <InputGroup className="mb-2">
            <InputGroup.Text><i  class="fa fa-check-circle"></i></InputGroup.Text>
              <Form.Label visuallyHidden>Blood Group</Form.Label>
                <Form.Select defaultValue="Choose blood Type">
                  <option>Choose Blood  Group</option>
                  <option>AB-</option>
                </Form.Select>
          </InputGroup>
        </Col>
        <Col xs={12}sm={4}>
          <InputGroup className="mb-2">
            <InputGroup.Text><i  class="fa fa-genderless"></i></InputGroup.Text>
              <Form.Control placeholder="Gender" />
          </InputGroup>
        </Col>
      </Row>
      <Row className="mt-3">
        <Col xs="12" sm={6}>
          <Form.Group className="mb-3" id="formGridCheckbox">
            <Form.Check type="checkbox" label="According to your provided information of Donor is correct" />
          </Form.Group>
        </Col>
        <Col xs="12" sm={6} className="align-items-center">
              <Button variant="primary" type="submit" className="w-25"><i class="fa fa-id-badge mx-2"></i>
                Submit
              </Button>
        </Col>
      </Row>        
          </Form>
        </Col>
      </Row>
    </Container>
  );
}

export default AddNewUser;