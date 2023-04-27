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


const BloodInformation=()=> {
    const [donorData, setDonorData] = useState({
      name:"",
      gender: "",
      city:"",
      location: "",
      contactNo: "",
      bloodGroup: "",
      email: "",
      message:"",
    });

    const [showModal, setShowModal] = useState(false);

    
    const handleChange = (event) => {
      const { name, value } = event.target;
      
      let newDonorData = { ...donorData, [name]: value };
      // For the contact Number validation
      if (name === "contactNo") {
        const phoneNumberRegex = /^\+92\s\d{3}\s\d{7}$/; // regex for the required format
        if (!phoneNumberRegex.test(value)) {
          newDonorData = { ...donorData, [name]: value, contactNoError: "Please enter a valid phone number" };
        } else {
          newDonorData = { ...donorData, [name]: value, contactNoError: null };
        }
      }
      // For the email validation
      if (name === "email") {
        const emailRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/; // regex for the required format
        if (!emailRegex.test(value)) {
          newDonorData = { ...donorData, [name]: value, emailError: "Please enter a valid email" };
        } else {
          newDonorData = { ...donorData, [name]: value, emailError: null };
        }
      }
      //For location
      if (name === "location" || name === "city") {
        if (!isNaN(value)) {
          newDonorData = { ...donorData, [name]: value, locationError: "Please enter a valid location" };
        } else {
          newDonorData = { ...donorData, [name]: value, locationError: null };
        }
      }
      //For hospital
      if (name === "hospital") {
        if (!isNaN(value)) {
          newDonorData = { ...donorData, [name]: value, hospitalError: "Please enter a valid hospital" };
        } else {
          newDonorData = { ...donorData, [name]: value, hospitalError: null };
        }
      }
      setDonorData(newDonorData);
    };

    const handleSubmit = (event) => {
      event.preventDefault();
      setShowModal(true);
    };
    
  const handleConfirm = () => {
    axios
    .post(`http://localhost:8081/api/user/bloodDonation/BloodDonationDetails/addUserInfo`, donorData)
    .then((response) => {
      console.log(response.data);
      toast.success(response.data,{position:toast.POSITION.TOP_CENTER});
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
              <Card.Title>Add Blood Information of User who donate blood</Card.Title>
            </Card.Body>
          </Card>
          <Card style={{marginTop:30,paddingBottom:10,alignItems:"center",justifyContent:"center",textAlign:"center"}}>
            <Card.Body>
              <Card.Title style={{color:"red",fontSize:"15px",fontWeight:"bold"}}>In this Page, you can add the details of the user who donate blood on you center!</Card.Title>
              <Card.Title style={{color:"red",fontSize:"15px",fontWeight:"bold"}}>This donor information can be used for future transfutions!</Card.Title>
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
            <Form.Control id="inlineFormInputGroup" placeholder="Donor Name" name="name" onChange={handleChange}/>
          </InputGroup>
        </Col>
        <Col xs="12"  sm="4">
          <Form.Label htmlFor="inlineFormInputGroup" visuallyHidden>
            Email
          </Form.Label>
          <InputGroup className="mb-2">
            <InputGroup.Text><i  class="fa fa-envelope"></i></InputGroup.Text>
            <Form.Control id="inlineFormInputGroup" placeholder="example@email.com" name="email" onChange={handleChange}/>
          </InputGroup>
          {donorData.emailError && (
            <p style={{ color: 'red' }}>{donorData.emailError}</p>
          )}
        </Col>
        <Col xs="12"  sm="4">
          <Form.Label htmlFor="inlineFormInputGroup" visuallyHidden>
            Contact No
          </Form.Label>
          <InputGroup className="mb-2">
            <InputGroup.Text><i  class="fa fa-envelope"></i></InputGroup.Text>
            <Form.Control id="inlineFormInputGroup" placeholder="+92 348484848" name="contactNo" onChange={handleChange}/>
          </InputGroup>
          {donorData.contactNoError && (
            <p style={{ color: 'red' }}>{donorData.contactNoError}</p>
          )}
        </Col>
      </Row>
      <Row>
        <Col xs={12}sm={4}>
          <InputGroup className="mb-2">
            <InputGroup.Text><i  class="fa fa-location-arrow"></i></InputGroup.Text>
              <Form.Control placeholder="Donor's City" name="city" onChange={handleChange}/>
          </InputGroup>
        {donorData.locationError && (
          <p style={{ color: 'red' }}>{donorData.locationError}</p>
        )}
        </Col>
        <Col xs={12}sm={4}>
          <InputGroup className="mb-2">
            <InputGroup.Text><i  class="fa fa-location-arrow"></i></InputGroup.Text>
              <Form.Label visuallyHidden>Enter Location</Form.Label>
              <Form.Control placeholder="Location" name="location" onChange={handleChange}/>
          </InputGroup>
          {donorData.locationError && (
            <p style={{ color: 'red' }}>{donorData.locationError}</p>
          )}
        </Col>
        <Col xs={12}sm={4}>
          <InputGroup className="mb-2">
            <InputGroup.Text><i  class="fa fa-location-arrow"></i></InputGroup.Text>
              <Form.Control placeholder="Donor's Blood Group" name="bloodGroup" onChange={handleChange} />
          </InputGroup>
        </Col>
      </Row>
      <Row>
        <Col>
        <InputGroup className="mb-2">
          <InputGroup.Text><i  class="fa fa-location-arrow"></i></InputGroup.Text>
            <Form.Label visuallyHidden>Donor's Gender </Form.Label>
              <Form.Control placeholder="Donor's gender" name="gender" onChange={handleChange}/>
          </InputGroup>
        </Col>
        <Col>
        <InputGroup className="mb-2">
          <InputGroup.Text><i  class="fa fa-location-arrow"></i></InputGroup.Text>
          <Form.Label visuallyHidden>Any message to other user?</Form.Label>
            <Form.Control placeholder="Type your message here...." name="message" onChange={handleChange}/>
        </InputGroup>
        </Col>
      </Row>
      <Row className="mt-3">
        <Col xs="12" sm={6}>
          <Form.Group className="mb-3" id="formGridCheckbox">
            <Form.Check type="checkbox" label="According to your provided information of Donor is correct. Any wrong information can lead to disconnect from using website" />
          </Form.Group>
        </Col>
      </Row>
    </Form>
    <Col xs="12" sm={6} className="align-items-center">
          <Button variant="primary" type="submit" className="w-md-100 mb-5" onClick={handleSubmit} style={{backgroundColor: "#153250"}}>
            Submit Donor's Information
          </Button>
        </Col>
    </Col>
      </Row>
      <Modal show={showModal} onHide={handleCancel}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Submission</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to submit the Donors Information?
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

export default BloodInformation;