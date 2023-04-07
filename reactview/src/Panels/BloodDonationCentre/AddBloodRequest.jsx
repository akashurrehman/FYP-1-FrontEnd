import React,{useState,useEffect} from "react";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Sidebar from "../../Components_for_All_Panels/BloodCentre/SideNavbar";
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Button from 'react-bootstrap/Button';
import Header from "../../Components_for_All_Panels/BloodCentre/Header";
import axios from 'axios';
import Modal from 'react-bootstrap/Modal';

const AddBloodRequest=()=> {
  const [bloodRequests, setBloodRequests] = useState({
    email: "",
    hospital:"",
    city:"",
    bloodGroup: "",
    contactNo: "",
    message:"",
    name:"",
    gender: "",
    location: "",
  });

  const [showModal, setShowModal] = useState(false);
  const handleChange = (event) => {
    const { name, value } = event.target;
    setBloodRequests((prevUserData) => ({ ...prevUserData, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setShowModal(true);
  };
  
  const handleConfirm = (event) => {
    event.preventDefault();

    axios
    .post(`http://localhost:8081/api/bloodCenter/RegisteredCenters/makeRequest`, bloodRequests)
    .then((response) => {
      console.log(response.data);
      })
    .catch((error) => {
      console.error(error);
    });
    setShowModal(false);
  }

  const handleCancel = () => {
    setShowModal(false);
  }

  const handleAllRequests = () => {
  window.location.href = "/bloodCenter/bloodRequests";
  }

  return (
    <Container fluid style={{backgroundColor:"#F3F3F3"}}>
      <Header />
      <Row>
        <Col xs={3}>
            <Sidebar/>        
        </Col>
        <Col className="mt-md-5" xs={9}>
          <Card style={{marginTop:30,paddingBottom:10,alignItems:"center",justifyContent:"center"}}>
            <Card.Img variant="top" src="/100px180" />
            <Card.Body>
              <Card.Title>Add New Blood Request</Card.Title>
            </Card.Body>
          </Card>
          <Card style={{marginTop:10,paddingBottom:10,alignItems:"center",justifyContent:"center"}}>
            <Card.Body>
              <Card.Title style={
                {color:"red",fontSize:20,fontWeight:"bold",textAlign:"center"}
              }>You can request for the blood by providing the proof of patient!</Card.Title>
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
            <Form.Control id="inlineFormInputGroup" name="name" placeholder="Donor Name" onChange={handleChange}/>
          </InputGroup>
        </Col>
        <Col xs="12"  sm="4">
          <Form.Label htmlFor="inlineFormInputGroup" visuallyHidden>
            Phone
          </Form.Label>
          <InputGroup className="mb-2">
            <InputGroup.Text><i  class="fa fa-envelope"></i></InputGroup.Text>
            <Form.Control id="inlineFormInputGroup" name="contactNo" placeholder="+923459215623" onChange={handleChange}/>
          </InputGroup>
        </Col>
        <Col xs="12"  sm="4">
          <Form.Label htmlFor="inlineFormInputGroup" visuallyHidden>
            Email
          </Form.Label>
          <InputGroup className="mb-2">
            <InputGroup.Text><i  class="fa fa-envelope"></i></InputGroup.Text>
            <Form.Control id="inlineFormInputGroup" name="email" placeholder="Email" onChange={handleChange}/>
          </InputGroup>
        </Col>
      </Row>
      <Row>
        <Col xs={12}sm={4}>
          <InputGroup className="mb-2">
            <InputGroup.Text><i  class="fa fa-location-arrow"></i></InputGroup.Text>
              <Form.Control placeholder="Donor's Address" name="location" onChange={handleChange}/>
          </InputGroup>
        </Col>
        <Col xs={12}sm={4}>
          <InputGroup className="mb-2">
            <InputGroup.Text><i  class="fa fa-location-arrow"></i></InputGroup.Text>
              <Form.Label visuallyHidden>Blood Type</Form.Label>
                <Form.Control placeholder="Blood Type i.e AB+, O+, AB- etc" name="bloodGroup" onChange={handleChange}/>
          </InputGroup>
        </Col>
        <Col xs={12}sm={4}>
          <InputGroup className="mb-2">
            <InputGroup.Text><i  class="fa fa-location-arrow"></i></InputGroup.Text>
              <Form.Control placeholder="Message" name="message" onChange={handleChange}/>
          </InputGroup>
        </Col>
      </Row>
      <Row>
        <Col>
        <InputGroup className="mb-2">
          <InputGroup.Text><i  class="fa fa-location-arrow"></i></InputGroup.Text>
            <Form.Label visuallyHidden>Blood Donation Center</Form.Label>
              <Form.Control placeholder="Blood Donation Center or Hospital" name="hospital" onChange={handleChange}/>
        </InputGroup>
        </Col>
        <Col>
          <InputGroup className="mb-2">
            <InputGroup.Text><i  class="fa fa-location-arrow"></i></InputGroup.Text>
              <Form.Label visuallyHidden>City</Form.Label>
              <Form.Control placeholder="City" name="city" onChange={handleChange}/>
          </InputGroup>
        </Col>
        <Col>
          <InputGroup className="mb-2">
            <InputGroup.Text><i  class="fa fa-location-arrow"></i></InputGroup.Text>
              <Form.Label visuallyHidden>Gender</Form.Label>
              <Form.Control placeholder="Gender" name="gender" onChange={handleChange}/>
          </InputGroup>
        </Col>
      </Row>
      <Row className="mt-3">
        <Col xs="12" sm={6}>
          <Form.Group className="mb-3" id="formGridCheckbox">
            <Form.Check type="checkbox" label="According to your provided information of Donor is correct" />
          </Form.Group>
        </Col>
      </Row>
    </Form>
      <Row className="mb-3">
          <Col>
              <Button style={{ display: "inline-block", width:"50%",textAlign:"center"}} onClick={handleSubmit}>Post Blood Request</Button>
          </Col>
      </Row>
      
        <Row className="mb-3">
            <Col>
              <Card>
                <Card.Body>
                  <Card.Title style={
                    {color:"red",fontSize:20,fontWeight:"bold",textAlign:"center"}
                  }>You can view all the blood requests here!</Card.Title>
                </Card.Body>
                <Card.Footer>
                  <Button style={{ display: "inline-block", width:"25%",textAlign:"center"}} className="w-25" onClick={handleAllRequests}>View All blood Requests </Button>
                </Card.Footer>
              </Card>
            </Col>
        </Row>
      
    </Col>
    </Row>
      <Modal show={showModal} onHide={handleCancel}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Submission</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to submit the new blood request?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCancel}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleConfirm}>
            Submit
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
}

export default AddBloodRequest;