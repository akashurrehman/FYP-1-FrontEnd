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
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useAuth  }  from './Auth/AuthContext';
import jwt_decode from 'jwt-decode';


const AddBloodRequest=()=> {
  const [bloodRequests, setBloodRequests] = useState({
    id:"Get ID from token",
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
  const {token} = useAuth();
  const authCentre=()=>{
    if(!token){
        window.location.href = "/Login";
    }
      console.log("authCentre");
  }

  //This will get the id  from the token if user is login
  const {id} = jwt_decode(token);
  
  useEffect(() => {
    authCentre();
  }, []);
  const validateForm = () => {
    let isValid = true;
    const errors = {};
  
    if (!bloodRequests.name) {
      isValid = false;
      errors.nameError = "Please enter a name";
    }
    if (!bloodRequests.gender) {
      isValid = false;
      errors.genderError = "Please enter a Gender";
    }
    if (!bloodRequests.hospital) {
      isValid = false;
      errors.hospitalError = "Please enter valid hospital name";
    }
    if (!bloodRequests.message) {
      isValid = false;
      errors.messageError = "Please enter a valid message";
    }
    if (!bloodRequests.email) {
      isValid = false;
      errors.emailError = "Please enter valid email address";
    }
    if (!bloodRequests.contactNo) {
      isValid = false;
      errors.contactNoError = "Please enter valid number";
    }
    if (!bloodRequests.city && !bloodRequests.location) {
      isValid = false;
      errors.locationError = "Please enter a valid location"; 
    }


    if (!isValid) {
      setBloodRequests({ ...bloodRequests, ...errors });
    }
  
    return isValid;
  };
  
  const [showModal, setShowModal] = useState(false);
  
  const handleChange = (event) => {
    const { name, value } = event.target;

    let newRequestData = { ...bloodRequests, [name]: value };
    // For the contact Number validation
    if (name === "contactNo") {
      const phoneNumberRegex = /^\+92\s\d{3}\s\d{7}$/; // regex for the required format
      if (!phoneNumberRegex.test(value)) {
        newRequestData = { ...bloodRequests, [name]: value, contactNoError: "Please enter a valid phone number" };
      } else {
        newRequestData = { ...bloodRequests, [name]: value, contactNoError: null };
      }
    }
    // For the email validation
    if (name === "email") {
      const emailRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/; // regex for the required format
      if (!emailRegex.test(value)) {
        newRequestData = { ...bloodRequests, [name]: value, emailError: "Please enter a valid email" };
      } else {
        newRequestData = { ...bloodRequests, [name]: value, emailError: null };
      }
    }
    //For location
    if (name === "location" || name === "city") {
      if (!isNaN(value)) {
        newRequestData = { ...bloodRequests, [name]: value, locationError: "Please enter a valid location" };
      } else {
        newRequestData = { ...bloodRequests, [name]: value, locationError: null };
      }
    }
    //For hospital
    if (name === "hospital") {
      if (!isNaN(value)) {
        newRequestData = { ...bloodRequests, [name]: value, hospitalError: "Please enter a valid hospital" };
      } else {
        newRequestData = { ...bloodRequests, [name]: value, hospitalError: null };
      }
    }
    if (name === "gender") {
      if (!isNaN(value)) {
        newRequestData = { ...bloodRequests, [name]: value, genderError: "Please enter a Correct gender" };
      } else {
        newRequestData = { ...bloodRequests, [name]: value, genderError: null };
      }
    }
    if (name === "message") {
      if (!isNaN(value)) {
        newRequestData = { ...bloodRequests, [name]: value, messageError: "Please enter a message in right way" };
      } else {
        newRequestData = { ...bloodRequests, [name]: value, messageError: null };
      }
    }
    if (name === "name") {
      if (!isNaN(value)) {
        newRequestData = { ...bloodRequests, [name]: value, nameError: "Please enter a right name" };
      } else {
        newRequestData = { ...bloodRequests, [name]: value, nameError: null };
      }
    }
    setBloodRequests(newRequestData);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const isValid = validateForm();
    if (isValid) {
    setShowModal(true);
    }
  };
  
  const handleConfirm = (event) => {
    event.preventDefault();

    axios
    .post(`http://localhost:8081/api/user/bloodRequest/BloodRequestDetails/add`, bloodRequests)
    .then((response) => {
      console.log(response.data);
      toast.success(response.data,{position:toast.POSITION.TOP_CENTER});
      toast("Request for blood Added!",{position:toast.POSITION.TOP_CENTER});
      })
    .catch((error) => {
      console.error(error);
      toast.error(error.response.data,{position:toast.POSITION.TOP_RIGHT});
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
          <Card style={{marginTop:30,paddingBottom:10,alignItems:"center",justifyContent:"center",backgroundColor:"#970C10",color:"white"}}>
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
          <Form.Label htmlFor="inlineFormInputGroup" >
            Enter Receipter Name
          </Form.Label>
          <InputGroup className="mb-2">
            <InputGroup.Text><i  class="fa fa-user"></i></InputGroup.Text>
            <Form.Control id="inlineFormInputGroup" name="name" placeholder="Donor Name" onChange={handleChange}/>
          </InputGroup>
        </Col>
        <Col xs="12"  sm="4">
          <Form.Label htmlFor="inlineFormInputGroup">
            Enter Phone number (+92 346 4511258)
          </Form.Label>
          <InputGroup className="mb-2">
            <InputGroup.Text><i class="fa fa-phone" aria-hidden="true"></i></InputGroup.Text>
            <Form.Control id="inlineFormInputGroup" name="contactNo" placeholder="+923459215623" onChange={handleChange}/>
          </InputGroup>
          {bloodRequests.contactNoError && (
            <p style={{ color: 'red' }}>{bloodRequests.contactNoError}</p>
          )}
        </Col>
        <Col xs="12"  sm="4">
          <Form.Label htmlFor="inlineFormInputGroup">
            Enter Email (xyz@email.com)
          </Form.Label>
          <InputGroup className="mb-2">
            <InputGroup.Text><i  class="fa fa-envelope"></i></InputGroup.Text>
            <Form.Control id="inlineFormInputGroup" name="email" placeholder="Email" onChange={handleChange}/>
          </InputGroup>
          {bloodRequests.emailError && (
              <p style={{ color: 'red' }}>{bloodRequests.emailError}</p>
            )}
        </Col>
      </Row>
      <Row>
        <Col xs={12}sm={4}>
        <Form.Label >Enter Location</Form.Label>
          <InputGroup className="mb-2">
            <InputGroup.Text><i  class="fa fa-location-arrow"></i></InputGroup.Text>
              <Form.Control placeholder="Donor's Address" name="location" onChange={handleChange}/>
          </InputGroup>
          {bloodRequests.locationError && (
                <p style={{ color: 'red' }}>{bloodRequests.locationError}</p>
          )}
        </Col>
        <Col xs={12}sm={4}>
          <Form.Label>Enter blood Type</Form.Label>
          <InputGroup className="mb-2">
            <InputGroup.Text><i class="fa fa-tint" aria-hidden="true"></i></InputGroup.Text>
                <Form.Control placeholder="AB+, AB-, O+,O - ,A+ , A-,B-,B+" name="bloodGroup" onChange={handleChange}/>
          </InputGroup>
        </Col>
        <Col xs={12}sm={4}>
        <Form.Label>Enter Any Message/Information</Form.Label>
          <InputGroup className="mb-2">
            <InputGroup.Text><i class="fa fa-comments" aria-hidden="true"></i></InputGroup.Text>
              <Form.Control placeholder="Message" name="message" onChange={handleChange}/>
          </InputGroup>
        </Col>
      </Row>
      <Row>
        <Col xs={12}sm={4}>
        <Form.Label>Enter Blood Donation Center</Form.Label>
        <InputGroup className="mb-2">
          <InputGroup.Text><i class="fa fa-h-square" aria-hidden="true"></i></InputGroup.Text>
            <Form.Control placeholder="Blood Donation Center or Hospital" name="hospital" onChange={handleChange}/>
        </InputGroup>
            {bloodRequests.hospitalError && (
                <p style={{ color: 'red' }}>{bloodRequests.hospitalError}</p>
              )}
        </Col>
        <Col xs={12}sm={4}>
        <Form.Label>Enter Donor city</Form.Label>
          <InputGroup className="mb-2">
            <InputGroup.Text><i class="fa fa-map-marker" aria-hidden="true"></i></InputGroup.Text>
              <Form.Control placeholder="City" name="city" onChange={handleChange} required/>
          </InputGroup>
          {bloodRequests.locationError && (
            <p style={{ color: 'red' }}>{bloodRequests.locationError}</p>
          )}
        </Col>
        <Col xs={12}sm={4}>
        <Form.Label>Gender</Form.Label>
          <InputGroup className="mb-2">
            <InputGroup.Text><i class="fa fa-male" aria-hidden="true"></i></InputGroup.Text>
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
              <Button style={{ display: "inline-block",textAlign:"center",backgroundColor: "#153250"}} className="w-md-100" onClick={handleSubmit}><i class="fa fa-plus" aria-hidden="true"></i>Post Blood Request</Button>
          </Col>
      </Row>
      
        <Row className="mb-3">
            <Col>
              <Card>
                <Card.Body>
                  <Card.Title style={
                    {color:"red",fontSize:20,fontWeight:"bold",textAlign:"center"}
                  }>You can view all the blood requests here! <i class="fa fa-hand-o-down" aria-hidden="true"></i>
                  </Card.Title>
                </Card.Body>
                <Card.Footer>
                  <Button style={{ display: "inline-block",textAlign:"center",backgroundColor: "#153250",justifyContent:"center",alignItems:"center"}} className="w-md-100" onClick={handleAllRequests}><i class="fa fa-hand-o-right" aria-hidden="true"></i>View All blood Requests </Button>
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
          <Button variant="secondary" onClick={handleCancel} style={{backgroundColor: "#153250"}}>
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

export default AddBloodRequest;