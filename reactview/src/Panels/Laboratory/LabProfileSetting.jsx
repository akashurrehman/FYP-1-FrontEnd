import React,{useState,useEffect} from "react";
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row'
import Card from 'react-bootstrap/Card';
import axios from 'axios';
import { BsStopwatch } from 'react-icons/bs';
import { BsFillTelephoneFill } from 'react-icons/bs';
import { BsExclamationSquare } from 'react-icons/bs';
import { BsEnvelopeFill } from 'react-icons/bs';
import { BsGeoAltFill } from 'react-icons/bs';
import Header from "./LabComponents/Header";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const LabProfileSetting=()=> {
  const [center, setCenterData] = useState({
    name: "",
    email:"",
    contactNo:"",
    address: "",
    city: ""
  });

  const [showModal, setShowModal] = useState(false);


  useEffect(()=>{
    axios.get('http://localhost:8081/api/labs/RegisteredLabs/L001').then((response)=>{
      const { results } = response.data;
      if (results && results.bindings && results.bindings.length > 0) {
        const centerData = results.bindings[0];
        setCenterData({
          name: centerData.Name.value,
          email: centerData.Email.value,
          contactNo: centerData.ContactNo.value,
          address: centerData.Address.value,
          city:centerData.City.value
        });

  }
});
},[]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    let newCenterData = { ...center, [name]: value };
    // For the contact Number validation
    if (name === "contactNo") {
      const phoneNumberRegex = /^\+92\s\d{3}\s\d{7}$/; // regex for the required format
      if (!phoneNumberRegex.test(value)) {
        newCenterData = { ...center, [name]: value, contactNoError: "Please enter a valid phone number" };
      } else {
        newCenterData = { ...center, [name]: value, contactNoError: null };
      }
    }
    // For email valigation
    if (name === "email") {
      const emailRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/; // regex for the required format

      console.log(emailRegex.test("example@mail.com")); // true
      console.log(emailRegex.test("example@mail.")); // false

      if (!emailRegex.test(value)) {
        newCenterData = { ...center, [name]: value, emailError: "Please enter a valid email address" };
      } else {
        newCenterData = { ...center, [name]: value, emailError: null };
      }
    }

    // For location
    if (name === "location" || name === "city") {
      if (!isNaN(value)) {
        newCenterData = { ...center, [name]: value, locationError: "Please enter alphabets only " };
      } else {
        newCenterData = { ...center, [name]: value, locationError: null };
      }
    }
    setCenterData(newCenterData);
  };

const handleSubmit = (event) => {
  event.preventDefault();
  setShowModal(true);
};

const CENTER_ID = 'L001';

const handleDelete = () => {
  axios
    .delete(`http://localhost:8081/api/lab/RegisteredLabs/delete/${CENTER_ID}`)
    .then((response) => {
      console.log(response.data);
      toast.success(response.data.message,{position:toast.POSITION.TOP_RIGHT});
      // Perform any additional actions after successful delete
    })
    .catch((error) => {
      console.error(error);
      toast.error(error,{position:toast.POSITION.TOP_CENTER});
    });
};


const handleConfirm = () => {
  axios
  .put(`http://localhost:8081/api/lab/RegisteredLabs/edit/${CENTER_ID}`, center)
  .then((response) => {
    console.log(response.data);
    toast("Profile Updated Successfully",{type:"success", position:toast.POSITION.TOP_RIGHT});
  })
  .catch((error) => {
    console.error(error);
    toast.error(error,{position:toast.POSITION.TOP_CENTER}
  )});
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
  <div  style={{backgroundColor:"#EEEEEE"}}>
    <Container style={{backgroundColor:"#D5D5D5"}}>
      <Header />
      <Row>
        <Col className="mt-md-5" xs={12}>
            <Card style={{marginTop:30,paddingBottom:10,alignItems:"center",justifyContent:"center",backgroundColor:"#85586F",color:"white"}} >
              <Card.Img variant="top" src="/Images/blood-Center.jpg" alt="Image" style={mystyle} className="d-inline-block align-top mx-2"/>
              <Card.Body>
                <Card.Title style={{justifyContent:"center",textAlign:"center"}}>{center.name}</Card.Title>
                <Card.Title style={{justifyContent:"center",textAlign:"center"}}>
                  Profile Settings Panel
                </Card.Title>
              </Card.Body>
          </Card>
        <div>
        <Form className="mt-5">
          <Form.Group className="mb-3" controlId="formGridAddress2">
            <Form.Label>City</Form.Label>
            <Form.Control name="city" placeholder="Lahore" value={center.city} onChange={handleChange}/>
          </Form.Group>
          {center.locationError && <p style={{ color: "red" }}>{center.locationError}</p> }
          <Form.Group className="mb-3" controlId="formGridAddress1">
            <Form.Label>Location/Address</Form.Label>
            <BsGeoAltFill size={15}/>
            <Form.Control name="address" placeholder="Main Ferozpur Road" value={center.address} onChange={handleChange}/>
          </Form.Group>
          {center.locationError && <p style={{ color: "red" }}>{center.locationError}</p> }
        <Form.Group className="mb-3" controlId="contact1">
          <Form.Label>Contact Number</Form.Label>
          <BsFillTelephoneFill size={15} color="red"/>
          <Form.Control placeholder="+9234946123" value={center.contactNo} name="contactNo" onChange={handleChange}/>
        </Form.Group>
        {center.contactNoError && <p style={{ color: "red" }}>{center.contactNoError}</p> }
        <Form.Group className="mb-3" controlId="email">
          <Form.Label>Email</Form.Label>

          <BsEnvelopeFill size={15} color="red"/>
          <Form.Control name="email" placeholder="example@gmail.com" value={center.email} onChange={handleChange}/>
      </Form.Group>
      {center.emailError && <p style={{ color: "red" }}>{center.emailError}</p> }
      <Row className="mb-3">
        <Form.Group as={Col} id="formGridCheckbox">
          <Form.Check type="checkbox" label="Are the provided information is correct according to your center or knowledge?" />
        </Form.Group>
      </Row>
    </Form>
    <Row className="mb-3">
        <Col>
            <Button style={{ display: "inline-block", width:"25%",textAlign:"center",backgroundColor: "#153250"}} onClick={handleSubmit}>Update Information</Button>
        </Col>
    </Row>
      <Card border="danger" style={{marginTop:30,paddingBottom:10}}>
        <Row>
          <Col style={{ textAlign: "justifyContent"}}>
            <h5 className="py-2 mx-3">Are you sure you want to delete your account?</h5>
            <h6 className="py-2 mx-3">Once you delete your account, there is no going back. Please be certain.</h6>
            <Form>
              <Form.Group as={Col} id="formGridCheckbox">
                <Form.Check type="checkbox" style={{color:"black",borderColor:"red"}} className="py-3" label="Are the provided information is correct according to your center or knowledge?" />
              </Form.Group>
            </Form>
            <Button style={{ display: "inline-block", width:"25%",textAlign:"center"}} className="mx-3 my-3" variant="danger" onClick={handleDelete}>Delete Center</Button>
          </Col>
        </Row>
      </Card>
    </div>
    <Modal show={showModal} onHide={handleCancel}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Submission</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to submit the form?
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
        </Col>
      </Row>
    </Container>
  </div>
  );
}

export default LabProfileSetting;