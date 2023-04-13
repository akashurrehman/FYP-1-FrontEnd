import React,{useEffect,useState} from "react";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Sidebar from "../../Components_for_All_Panels/BloodCentre/SideNavbar";
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Header from "../../Components_for_All_Panels/BloodCentre/Header";
import axios from 'axios';
import Modal from 'react-bootstrap/Modal';
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AddNewUser=()=> {
  const [userData, setuserData] = useState({
    fullName: "",
    userName: "",
    password: "hssd",
    city: "",
    bloodGroup: "A2",
    address: "",
    contactNo: "",
    email: "",
    gender:"",
    dob:"",
  });

  const [showModal, setShowModal] = useState(false);

  
  const handleChange = (event) => {
    const { name, value } = event.target;
    setuserData((prevUserData) => ({ ...prevUserData, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setShowModal(true);
  };
  
const handleConfirm = () => {
  axios
  .post(`http://localhost:8081/api/user/registration/add`, userData)
  .then((response) => {
    console.log(response.data);
    toast.success("User Added Successfully", {
      position: toast.POSITION.TOP_CENTER,
    });
    })
  .catch((error) => {
    console.error(error);
    toast.error(error.response.data, {
      position: toast.POSITION.TOP_RIGHT,
    });
  });
setShowModal(false);
}

const handleCancel = () => {
  setShowModal(false);
}


  return (
    <Container fluid style={{backgroundColor:"#EEEEEE"}}>
      <Header />
      <Row>
        <Col xs={3}>
            <Sidebar/>        
        </Col>
        <Col className="mt-md-5" xs={9}>
          <Card style={{marginTop:30,paddingBottom:10,alignItems:"center",justifyContent:"center",backgroundColor:"#970C10",color:"white"}}>
            <Card.Img variant="top" src="/100px180" />
            <Card.Body>
              <Card.Title>Add New User to the website</Card.Title>
            </Card.Body>
          </Card>

          <Card style={{marginTop:30,paddingBottom:10,alignItems:"center",justifyContent:"center"}}>
            <Card.Body style={{color:"red",fontSize:"14px",fontWeight:"bold"}}>
              <Card.Title>In this page, you can register new user to the website!</Card.Title>
              <Card.Title>Their login will be created according to provided credentials!</Card.Title>
            </Card.Body>
          </Card>
      <Form>
      <Row className="mt-5">
        <Col xs={12}sm={4}>
          <InputGroup className="mb-2">
            <InputGroup.Text><i  class="fa fa-user-ninja"></i></InputGroup.Text>
              <Form.Control  name="fullName" placeholder="Full Name" onChange={handleChange}/>
          </InputGroup>
        </Col>
        <Col xs={12}sm={4}>
          <InputGroup className="mb-2">
            <InputGroup.Text><i  class="fa fa-user"></i></InputGroup.Text>
              <Form.Label visuallyHidden>UserName</Form.Label>
                <Form.Control name="userName" placeholder="UserName" onChange={handleChange}/>
          </InputGroup>
        </Col>
        <Col xs={12}sm={4}>
          <InputGroup className="mb-2">
            <InputGroup.Text><i  class="fa fa-envelope"></i></InputGroup.Text>
              <Form.Control name="email"placeholder="Email" onChange={handleChange}/>
          </InputGroup>
        </Col>
      </Row>
      <Row className="mt-1">
        <Col xs={12}sm={4}>
          <InputGroup className="mb-2">
            <InputGroup.Text><i  class="fa fa-location-arrow"></i></InputGroup.Text>
              <Form.Control name="city" placeholder="City" onChange={handleChange}/>
          </InputGroup>
        </Col>
        <Col xs={12}sm={4}>
          <InputGroup className="mb-2">
            <InputGroup.Text><i  class="fa fa-location-arrow"></i></InputGroup.Text>
              <Form.Label visuallyHidden>Location</Form.Label>
                <Form.Control name="address" defaultValue="Location" onChange={handleChange}/>
          </InputGroup>
        </Col>
        <Col xs={12}sm={4}>
          <InputGroup className="mb-2">
            <InputGroup.Text><i  class="fa fa-angry"></i></InputGroup.Text>
              <Form.Control name="dob" placeholder="Donor's Age" onChange={handleChange}/>
          </InputGroup>
        </Col>
      </Row>
      <Row className="mt-1">
        <Col xs={12}sm={4}>
          <InputGroup className="mb-2">
            <InputGroup.Text><i  class="fa fa-phone"></i></InputGroup.Text>
              <Form.Control name="contactNo" placeholder="+92-59552658" onChange={handleChange}/>
          </InputGroup>
        </Col>
        <Col xs={12}sm={4}>
          <InputGroup className="mb-2">
            <InputGroup.Text><i  class="fa fa-check-circle"></i></InputGroup.Text>
              <Form.Label visuallyHidden>Blood Group</Form.Label>
                <Form.Control name="bloodGroup" placeholder="AB+" onChange={handleChange}/>
          </InputGroup>
        </Col>
        <Col xs={12}sm={4}>
          <InputGroup className="mb-2">
            <InputGroup.Text><i  class="fa fa-genderless"></i></InputGroup.Text>
              <Form.Control name="gender" placeholder="Gender" onChange={handleChange}/>
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
          <Col xs={12} sm={6}>
              <Button style={{ display: "inline-block", width:"50%",textAlign:"center",backgroundColor: "#153250"}} type="submit" onClick={{handleSubmit}}>Add User</Button>
          </Col>
      </Row>
        </Col>
      </Row>
      <Modal show={showModal} onHide={handleCancel}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Submission</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to submit the form?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCancel}style={{backgroundColor: "#153250"}}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleConfirm} style={{backgroundColor: "#153250"}}>
            Submit
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
}

export default AddNewUser;