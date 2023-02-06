import React from "react";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Sidebar from "../../Components_for_All_Panels/BloodCentre/SideNavbar";
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Button from 'react-bootstrap/Button';
import Header from "../../Components_for_All_Panels/BloodCentre/Header";

const AddBloodStock=()=> {
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
              <Card.Title>Add New Blood Information</Card.Title>
            </Card.Body>
          </Card>
        
      <Form className="mt-3">
      <Row className="align-items-center">
        <Col xs="12" sm="4">
          <Form.Label htmlFor="inlineFormInputGroup" visuallyHidden>
            Donor  Name
          </Form.Label>
          <InputGroup className="mb-2">
            <InputGroup.Text><i  class="fa fa-user"></i></InputGroup.Text>
            <Form.Control id="inlineFormInputGroup" placeholder="Donor Name" />
          </InputGroup>
        </Col>
        <Col xs="12"  sm="4">
          <Form.Label htmlFor="inlineFormInputGroup" visuallyHidden>
            Phone
          </Form.Label>
          <InputGroup className="mb-2">
            <InputGroup.Text><i  class="fa fa-envelope"></i></InputGroup.Text>
            <Form.Control id="inlineFormInputGroup" placeholder="+923459215623" />
          </InputGroup>
        </Col>
        <Col xs="12"  sm="4">
          <Form.Label htmlFor="inlineFormInputGroup" visuallyHidden>
            Email
          </Form.Label>
          <InputGroup className="mb-2">
            <InputGroup.Text><i  class="fa fa-envelope"></i></InputGroup.Text>
            <Form.Control id="inlineFormInputGroup" placeholder="Email" />
          </InputGroup>
        </Col>
      </Row>
      <Row>
        <Col xs={12}sm={4}>
          <InputGroup className="mb-2">
            <InputGroup.Text><i  class="fa fa-location-arrow"></i></InputGroup.Text>
              <Form.Control placeholder="Donor's Address" />
          </InputGroup>
        </Col>
        <Col xs={12}sm={4}>
          <InputGroup className="mb-2">
            <InputGroup.Text><i  class="fa fa-location-arrow"></i></InputGroup.Text>
              <Form.Label visuallyHidden>Blood Type</Form.Label>
                <Form.Select defaultValue="Choose blood Type">
                  <option>AB+</option>
                  <option>AB-</option>
                </Form.Select>
          </InputGroup>
        </Col>
        <Col xs={12}sm={4}>
          <InputGroup className="mb-2">
            <InputGroup.Text><i  class="fa fa-location-arrow"></i></InputGroup.Text>
              <Form.Control placeholder="Donor's Age" />
          </InputGroup>
        </Col>
      </Row>
      <Row>
        <Col>
        <InputGroup className="mb-2">
          <InputGroup.Text><i  class="fa fa-location-arrow"></i></InputGroup.Text>
            <Form.Label visuallyHidden>Blood Donation Center</Form.Label>
              <Form.Select defaultValue="Choose blood Type">
                  <option>Center-1</option>
                  <option>Center-2</option>
              </Form.Select>
        </InputGroup>
        </Col>
        <Col>
          <Form.Label visuallyHidden>last  Donation</Form.Label>
          <Form.Select placeholder="Choose last Donation  time">
            <option>1 Month</option>
            <option>2 Months</option>
          </Form.Select>
        </Col>
      </Row>
      <Row className="mt-3">
        <Col xs="12" sm={6}>
          <Form.Group className="mb-3" id="formGridCheckbox">
            <Form.Check type="checkbox" label="According to your provided information of Donor is correct" />
          </Form.Group>
        </Col>
        <Col xs="12" sm={6} className="align-items-center">
          <Button variant="primary" type="submit" className="w-25">
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

export default AddBloodStock;