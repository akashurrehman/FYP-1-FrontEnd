import React,{useState,useEffect} from "react";
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row'
import Sidebar from "../../Components_for_All_Panels/BloodCentre/SideNavbar";
import Card from 'react-bootstrap/Card';
import axios from 'axios';
import { BsStopwatch } from 'react-icons/bs';
import { BsFillTelephoneFill } from 'react-icons/bs';
import { BsExclamationSquare } from 'react-icons/bs';
import { BsEnvelopeFill } from 'react-icons/bs';
import { BsGeoAltFill } from 'react-icons/bs';
import Header from "../../Components_for_All_Panels/BloodCentre/Header";

const ProfileSettings=()=> {
  const [center, setCenterData] = useState({
    name: "",
    city: "",
    location: "",
    licenseNo: "",
    contactNo: "",
    email: "",
    openingDays: "",
    timings: "",
    category:""
  });

  const [showModal, setShowModal] = useState(false);


  useEffect(()=>{
    axios.get('http://localhost:8081/api/bloodCenter/RegisteredCenters/CR001').then((response)=>{
      const { results } = response.data;
      if (results && results.bindings && results.bindings.length > 0) {
        const centerData = results.bindings[0];
        setCenterData({
          name: centerData.Name.value,
          city: centerData.City.value,
          contactNo: centerData.ContactNo.value,
          email: centerData.Email.value,
          licenseNo: centerData.License.value,
          location: centerData.Location.value,
          openingDays: centerData.Opening_Days.value,
          timings: centerData.Timings.value,
          category: centerData.Category.value,
        });

  }
});
},[]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setCenterData((prevCenterData) => ({ ...prevCenterData, [name]: value }));
  };

const handleSubmit = (event) => {
  event.preventDefault();
  setShowModal(true);
};

const CENTER_ID = 'CR001';

const handleDelete = () => {
  axios
    .delete(`http://localhost:8081/api/bloodCenter/RegisteredCenters/${CENTER_ID}`)
    .then((response) => {
      console.log(response.data);
      // Perform any additional actions after successful delete
    })
    .catch((error) => {
      console.error(error);
    });
};


const handleConfirm = () => {
  axios
  .put(`http://localhost:8081/api/bloodCenter/RegisteredCenters/${CENTER_ID}`, center)
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
        <Col xs={3}>
            <Sidebar/>        
        </Col>
        <Col className="mt-md-5" xs={9}>
            <Card style={{marginTop:30,paddingBottom:10,alignItems:"center",justifyContent:"center"}} >
              <Card.Img variant="top" src="/Images/blood-Center.jpg" alt="Image" style={mystyle} className="d-inline-block align-top mx-2"/>
              <Card.Body>
                <Card.Title >{center.name}</Card.Title>
                <Card.Text>
                  <span className="text-danger"style={{justifyContent:"center",textAlign:"center",fontSize:"20px",fontWeight:"bold"}}>Profile Settings Panel</span>
                </Card.Text>
              </Card.Body>
          </Card>
        <div>
        <Form className="mt-5">
        <Row className="mb-3">
          <Form.Group as={Col} controlId="formGridEmail">
            <Form.Label>Username</Form.Label>
            <Form.Control   name="name"  placeholder="Enter Center Number" value={center.name}  onChange={handleChange}/>
          </Form.Group>
          <Form.Group as={Col} controlId="formGridPassword">
            <Form.Label>License Number</Form.Label>
            <Form.Control type="License" placeholder="License Number"  value={center.licenseNo} disabled={true}/>
          </Form.Group>
        </Row>
        <Form.Group className="mb-3" controlId="formGridAddress1">
          <Form.Label>Location/Address</Form.Label>
          <BsGeoAltFill size={15}/>
          <Form.Control name="location" placeholder="Main Ferozpur Road" value={center.location} onChange={handleChange}/>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formGridAddress2">
          <Form.Label>City</Form.Label>
          <Form.Control name="city" placeholder="Lahore, Punjab, Pakistan" value={center.city} onChange={handleChange}/>
      </Form.Group>
      <Form.Group className="mb-3" controlId="contact1">
          <Form.Label>Contact Number</Form.Label>
          <BsFillTelephoneFill size={15} color="red"/>
          <Form.Control placeholder="+9234946123" value={center.contactNo} onChange={handleChange}/>
        </Form.Group>

        <Form.Group className="mb-3" controlId="email">
          <Form.Label>Email</Form.Label>

          <BsEnvelopeFill size={15} color="red"/>
          <Form.Control name="email" placeholder="example@gmail.com" value={center.email} onChange={handleChange}/>
      </Form.Group>

      <Row className="mb-3">
        <Form.Group as={Col} controlId="formGridCity">
          <Form.Label>Available Timings</Form.Label>
          <BsStopwatch size={15} color="red"/>
          <Form.Control placeholder="Category" name="timings" value={center.timings} onChange={handleChange}/>
        </Form.Group>

        <Form.Group as={Col} controlId="formGridState">
  
          <Form.Label>Opening Days</Form.Label>
          <BsStopwatch size={15} color="red"/>
          <Form.Control placeholder="Category" name="openingDays" value={center.openingDays} onChange={handleChange}/>
        </Form.Group>

        <Form.Group as={Col} controlId="formGridZip">
          <Form.Label>Category</Form.Label>
          <BsExclamationSquare size={15} color="red"/>
          <Form.Control name="category" placeholder="Category" value={center.category} onChange={handleChange}/>
        </Form.Group>
      </Row>
      <Row className="mb-3">
        <Form.Group as={Col} id="formGridCheckbox">
          <Form.Check type="checkbox" label="Are the provided information is correct according to your center or knowledge?" />
        </Form.Group>
      </Row>
    </Form>
    <Row className="mb-3">
        <Col>
            <Button style={{ display: "inline-block", width:"25%",textAlign:"center"}} onClick={handleSubmit}>Update Information</Button>
        </Col>
    </Row>
      <Card border="danger" style={{marginTop:30,paddingBottom:10}}>
        <Row>
          <Col style={{ textAlign: "justifyContent" }}>
            <h5>Are you sure you want to delete your account?</h5>
            <h6>Once you delete your account, there is no going back. Please be certain.</h6>
            <Form>
              <Form.Group as={Col} id="formGridCheckbox">
                <Form.Check type="checkbox" label="Are the provided information is correct according to your center or knowledge?" />
              </Form.Group>
            </Form>
            <Button style={{ display: "inline-block", width:"25%",textAlign:"center"}} variant="danger" onClick={handleDelete}>Delete Center</Button>
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
          <Button variant="secondary" onClick={handleCancel}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleConfirm}>
            Submit
          </Button>
        </Modal.Footer>
      </Modal>
        </Col>
      </Row>
    </Container>
  );
}

export default ProfileSettings;