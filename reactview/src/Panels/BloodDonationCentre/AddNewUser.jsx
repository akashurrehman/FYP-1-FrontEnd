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
import { useAuth } from "./Auth/AuthContext";
import jwt_decode from 'jwt-decode';
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

  const {token} = useAuth();
  //This will get the id  from the token if user is login
  const decodedToken = token ? jwt_decode(token) : null;
  const role = decodedToken?.role;
  const id = decodedToken?.id;

  const authCentre=()=>{
    if(role!='CENTRE'){
      window.location.href = "/user/login";
    }
      console.log("authCentre");
  }
  

  useEffect(() => {
    authCentre();
  }, []);
  const validateForm = () => {
    let isValid = true;
    const errors = {};
  
    if (!userData.fullName) {
      isValid = false;
      errors.nameError = "Please enter a name";
    }
    if (!userData.userName) {
      isValid = false;
      errors.usernameError = "Please enter user name";
    }
    if (!userData.contactNo) {
      isValid = false;
      errors.contactNoError = "Please enter valid Phone Number";
    }
    
    if (!userData.email) {
      isValid = false;
      errors.emailError = "Please enter valid email address";
    }
    
    if (!userData.city) {
      isValid = false;
      errors.locationError = "Please enter valid location name";
    }
    
    if (!userData.gender) {
      isValid = false;
      errors.genderError = "Please enter valid gender name";
    }
    if (!isValid) {
      setuserData({ ...userData, ...errors });
    }
  
    return isValid;
  };
  
  const handleChange = (event) => {
    const { name, value } = event.target;
    
    let newUserData = { ...userData, [name]: value };
    // For the contact Number validation
    if (name === "contactNo") {
      const phoneNumberRegex = /^\+92\s\d{3}\s\d{7}$/; // regex for the required format
      if (!phoneNumberRegex.test(value)) {
        newUserData = { ...userData, [name]: value, contactNoError: "Please enter a valid phone number" };
      } else {
        newUserData = { ...userData, [name]: value, contactNoError: null };
      }
    }
    // For the email validation
    if (name === "email") {
      const emailRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/; // regex for the required format
      if (!emailRegex.test(value)) {
        newUserData = { ...userData, [name]: value, emailError: "Please enter a valid email" };
      } else {
        newUserData = { ...userData, [name]: value, emailError: null };
      }
    }
    //For location
    if (name === "address" || name === "city") {
      if (!isNaN(value)) {
        newUserData = { ...userData, [name]: value, locationError: "Please enter a valid location" };
      } else {
        newUserData = { ...userData, [name]: value, locationError: null };
      }
    }
    //For Gender
    if (name === "gender") {
      if (!isNaN(value)) {
        newUserData = { ...userData, [name]: value, genderError: "Please enter a valid gender" };
      } else {
        newUserData = { ...userData, [name]: value, genderError: null };
      }
    }
    //For FullName
    if (name === "fullName") {
      if (!isNaN(value)) {
        newUserData = { ...userData, [name]: value, nameError: "Please enter a valid Name" };
      } else {
        newUserData = { ...userData, [name]: value, nameError: null };
      }
    }
    
    //For UserName
    if (name === "userName") {
      if (!isNaN(value)) {
        newUserData = { ...userData, [name]: value, usernameError: "Please enter a valid User Name" };
      } else {
        newUserData = { ...userData, [name]: value, usernameError: null };
      }
    }
    setuserData(newUserData);

  };

  const handleSubmit = (event) => {
    console.log("Button submit event in add User page")
    event.preventDefault();
    const isValid = validateForm();
    if (isValid) {
    setShowModal(true);
    }
  };
  
  const handleConfirm = () => {
    axios
    .post(`http://localhost:8081/api/user/registration/add`, userData)
    .then((response) => {
      console.log(response.data);
      toast.success(response.data.success,{position:toast.POSITION.TOP_RIGHT});
    })
    .catch((error) => {
      console.error(error);
      toast.error(error.response.data, {position: toast.POSITION.TOP_RIGHT,});
    });
  setShowModal(false);
  }

  const handleCancel = () => {
    setShowModal(false);
  }

  const mystyle = {
    height: "7%",
    width: "7%",
    borderRadius: "50px",
    display: "inline-block",
  };

  return (
    <Container fluid style={{backgroundColor:"#EEEEEE"}}>
      <Header />
      <Row>
        <Col xs={2}>
            <Sidebar/>        
        </Col>
        <Col className="mt-md-5" xs={10}>
          <Card style={{marginTop:30,paddingBottom:10,alignItems:"center",justifyContent:"center",marginLeft:"25px",backgroundColor:"#970C10",color:"white"}} className="shadow p-3 mb-2 border rounded">
          <Card.Img variant="top" src="/Images/blood-Center.jpg" alt="Image" style={mystyle} className="d-inline-block align-top mx-2"/>
            <Card.Body>
              <Card.Title>Add New User to the website</Card.Title>
            </Card.Body>
          </Card>

          <Card style={{marginTop:30,paddingBottom:10,alignItems:"center",justifyContent:"center",textAlign:"center",marginLeft:"25px"}} className="shadow p-3 mb-3 border rounded">
            <Card.Body style={{color:"red",fontSize:"14px",fontWeight:"bold"}}>
              <Card.Title>In this page, you can register new user to the website!</Card.Title>
              <Card.Title>Their login will be created according to provided credentials!</Card.Title>
            </Card.Body>
          </Card>
      <Form className="shadow p-3 mb-2 border rounded" style={{marginLeft:"25px",}}>
      <Row className="mt-5">
        <Col xs={12}sm={3}>
          <Form.Label> Enter full Name of user</Form.Label>
          <InputGroup className="mb-2">
            <InputGroup.Text><i class="fa fa-user-circle-o" aria-hidden="true"></i></InputGroup.Text>
              <Form.Control  name="fullName" placeholder="Full Name" onChange={handleChange}/>
          </InputGroup>
        </Col>
        <Col xs={12}sm={3}>
        <Form.Label> Enter Username of user</Form.Label>
          <InputGroup className="mb-2">
            <InputGroup.Text><i  class="fa fa-user"></i></InputGroup.Text>
              <Form.Label visuallyHidden>UserName</Form.Label>
                <Form.Control name="userName" placeholder="UserName" onChange={handleChange}/>
          </InputGroup>
        </Col>
        <Col xs={12}sm={3}>
        <Form.Label> Enter Email of user</Form.Label>
          <InputGroup className="mb-2">
            <InputGroup.Text><i  class="fa fa-envelope"></i></InputGroup.Text>
              <Form.Control name="email"placeholder="Email" onChange={handleChange}/>
          </InputGroup>
          {userData.emailError && <p style={{ color: "red" }}>{userData.emailError}</p>}

        </Col>
        <Col xs={12}sm={3}>
        <Form.Label> Enter passowrd of user</Form.Label>
          <InputGroup className="mb-2">
            <InputGroup.Text><i class="fa fa-unlock-alt" aria-hidden="true"></i></InputGroup.Text>
              <Form.Control name="password"placeholder="Enter password" onChange={handleChange}/>
          </InputGroup>
        </Col>
      </Row>
      <Row className="mt-1">
        <Col xs={12}sm={4}>
        <Form.Label> Enter city of user</Form.Label>
          <InputGroup className="mb-2">
            <InputGroup.Text><i  class="fa fa-location-arrow"></i></InputGroup.Text>
              <Form.Control name="city" placeholder="City" onChange={handleChange}/>
          </InputGroup>
          {userData.locationError && <p style={{ color: "red" }}>{userData.locationError}</p>}
        </Col>
        <Col xs={12}sm={4}>
        <Form.Label> Enter location of user</Form.Label>
          <InputGroup className="mb-2">
            <InputGroup.Text><i  class="fa fa-location-arrow"></i></InputGroup.Text>
              <Form.Label visuallyHidden>Location</Form.Label>
                <Form.Control name="address" defaultValue="Location" onChange={handleChange}/>
          </InputGroup>
          {userData.locationError && <p style={{ color: "red" }}>{userData.locationError}</p>}
        </Col>
        <Col xs={12}sm={4}>
        <Form.Label> Enter Age of user</Form.Label>
          <InputGroup className="mb-2">
            <InputGroup.Text><i class="fa fa-calendar" aria-hidden="true"></i></InputGroup.Text>
              <Form.Control name="dob" placeholder="Donor's Age" onChange={handleChange}/>
          </InputGroup>
        </Col>
      </Row>
      <Row className="mt-1">
        <Col xs={12}sm={4}>
        <Form.Label>Enter Number(Format-+92 346 2855481)</Form.Label>
          <InputGroup className="mb-2">
            <InputGroup.Text><i  class="fa fa-phone"></i></InputGroup.Text>
              <Form.Control name="contactNo" placeholder="+92-59552658" onChange={handleChange}/>
          </InputGroup>
          {userData.contactNoError && <p style={{ color: "red" }}>{userData.contactNoError}</p>}
        </Col>
        <Col xs={12}sm={4}>
        <Form.Label>Enter Blood Group</Form.Label>
          <InputGroup className="mb-2">
            <InputGroup.Text><i  class="fa fa-check-circle"></i></InputGroup.Text>
                {/* <Form.Control name="bloodGroup" placeholder="AB-,AB+,O+,O-,A+,A-,B-,B+" onChange={handleChange}/> */}
                <Form.Select required name="bloodGroup" onChange={handleChange} >
                  <option value="">Select Blood Group*</option>
                  <option value="AB+">AB+</option>
                  <option value="AB-">AB-</option>
                  <option value="O+">O+</option>
                  <option value="O-">O-</option>
                  <option value="A+">A+</option>
                  <option value="A-">A-</option>
                  <option value="B+">B+</option>
                  <option value="B-">B-</option>
                </Form.Select>
          </InputGroup>
        </Col>
        <Col xs={12}sm={4}>
        <Form.Label> Enter Gender of user</Form.Label>
          <InputGroup className="mb-2">
            <InputGroup.Text><i  class="fa fa-genderless"></i></InputGroup.Text>
              {/* <Form.Control name="gender" placeholder="Male/Female" onChange={handleChange}/> */}
              <Form.Select required name="gender" onChange={handleChange} >
                <option value="">Select Gender*</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </Form.Select>
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
          <Col xs={12} sm={12} style={{alignItems:"center", textAlign:"center"}}>
              <Button style={{ display: "inline-block", textAlign:"center",backgroundColor: "#153250"}} className="w-md-100 px-5" type="submit" onClick={handleSubmit}><i class="fa fa-plus" aria-hidden="true"></i>Add User</Button>
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