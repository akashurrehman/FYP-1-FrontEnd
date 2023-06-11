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
import { BsEnvelopeFill } from 'react-icons/bs';
import { BsGeoAltFill } from 'react-icons/bs';
import Header from "../../Components_for_All_Panels/BloodCentre/Header";
import { useAuth  }  from './Auth/AuthContext';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import jwt_decode from "jwt-decode";
import LoadingSpinner from "../../Components_for_All_Panels/BloodCentre/LoadingSpinner";
import {BsFillExclamationTriangleFill} from "react-icons/bs"
const ProfileSettings=()=> {
  const [isLoading, setIsLoading] = useState(true);
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
  const {token} = useAuth();
  
  //This will get the id  from the token if user is login
  const decodedToken = token ? jwt_decode(token) : null;
  const id = decodedToken?.id;
  const role= decodedToken?.role;


  const authCentre=()=>{
      if(role!='CENTRE'){
        window.location.href = "/user/login";
      }
        console.log("authCentre");
  }

  useEffect(()=>{
    axios.get(`http://localhost:8081/api/bloodCenter/RegisteredCenters/${id}`).then((response)=>{
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
    authCentre();
    setIsLoading(false);
  },[]);
const validateForm = () => {
  let isValid = true;
  const errors = {};

  if (!center.name) {
    isValid = false;
    errors.nameError = "Please enter a name";
  }

  if (!center.city) {
    isValid = false;
    errors.cityError = "Please enter a city";
  }

  if (!center.location) {
    isValid = false;
    errors.locationError = "Please enter a location";
  }

  if (!center.contactNo) {
    isValid = false;
    errors.contactNoError = "Please enter a contact number";
  }

  if (!center.email) {
    isValid = false;
    errors.emailError = "Please enter an email";
  }

  if (!center.licenseNo) {
    isValid = false;
    errors.licenseNoError = "Please enter a license number";
  }

  if (!center.openingDays) {
    isValid = false;
    errors.openingDaysError = "Please enter opening days";
  }

  if (!center.timings) {
    isValid = false;
    errors.timingsError = "Please enter timings";
  }

  if (!center.category) {
    isValid = false;
    errors.categoryError = "Please enter a category";
  }

  if (!isValid) {
    setCenterData({ ...center, ...errors });
  }

  return isValid;
};

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

    // For category
    if (name === "category") {
      const categoryRegex = /^(private|public)$/i; // regex for allowed values
      if (!categoryRegex.test(value)) {
        newCenterData = { ...center, [name]: value, categoryError: "Please enter 'private' or 'public'" };
      } else {
        newCenterData = { ...center, [name]: value, categoryError: null };
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
    const isValid = validateForm();
    if (isValid) {
    setShowModal(true);
    }
  };



  const handleDelete = () => {
    axios
      .delete(`http://localhost:8081/api/bloodCenter/RegisteredCenters/delete/${id}`)
      .then((response) => {
        console.log(response.data);
        toast.success(response.data.message,{position:toast.POSITION.TOP_RIGHT});
        window.location.href = "/user/login";
        // Perform any additional actions after successful delete
      })
      .catch((error) => {
        console.error(error);
        toast.error(error,{position:toast.POSITION.TOP_RIGHT});
      });
  };


  const handleConfirm = () => {
    axios
    .put(`http://localhost:8081/api/bloodCenter/RegisteredCenters/update/${id}`, center)
    .then((response) => {
      console.log(response.data);
      // toast.success(response.data,{position:toast.POSITION.TOP_RIGHT});
      toast.info(response.data.success,{position:toast.POSITION.TOP_RIGHT});
    })
    .catch((error) => {
      console.error(error);
      //toast.error(error,{position:toast.POSITION.TOP_CENTER}
      toast("Data Not Updated!",{position:toast.POSITION.TOP_RIGHT});
    });
    setShowModal(false);
  }

  const handleCancel = () => {
    setShowModal(false);
    toast("Update Cancelled",{position:toast.POSITION.TOP_RIGHT});
  }

  const mystyle = {
      height: "7%",
      width: "7%",
      borderRadius: "50px",
      display: "inline-block",
  };

  return (
  <div>
  {isLoading ? (
    <LoadingSpinner />
    ) : (
    <Container fluid style={{backgroundColor:"#EEEEEE"}}>
      <Header />
      <Row>
        <Col xs={2}>
            <Sidebar/>        
        </Col>
        <Col className="mt-md-5" xs={10}>
            <Card style={{marginTop:30,paddingBottom:10,alignItems:"center",marginLeft:"24px",justifyContent:"center",backgroundColor:"#970C10",color:"white"}} className="shadow p-3 mb-5 rounded" >
              <Card.Img variant="top" src="/Images/blood-Center.jpg" alt="Image" style={mystyle} className="d-inline-block align-top mx-2"/>
              <Card.Body style={{justifyContent:"center",textAlign:"center"}}>
                <Card.Title>{center.name}</Card.Title>
                <Card.Title>Profile Settings Panel</Card.Title>
              </Card.Body>
            </Card>
        <div style={{marginLeft:"24px"}}>
        <Form className="mt-5 shadow p-3 mb-2 rounded" >
        <Row className="mb-3">
        <Col xs="12" sm="6">
          <Form.Group  controlId="formGridEmail">
            <Form.Label>Username</Form.Label>
            <i class="fa fa-user-circle" aria-hidden="true"></i>
            <Form.Control   name="name"  placeholder="Enter Center Number" value={center.name}  disabled={true}/>
          </Form.Group>
        </Col>
        <Col xs="12" sm="6">
          <Form.Group controlId="formGridPassword">
            <Form.Label>License Number</Form.Label>
            <i class="fa fa-id-card" aria-hidden="true"></i>
            <Form.Control type="License" placeholder="License Number"  value={center.licenseNo} disabled={true}/>
          </Form.Group>
        </Col>
        </Row>
        <Row className="mb-3">
        <Col xs="12" sm="4">
          <Form.Group className="mb-3" controlId="formGridAddress1">
            <Form.Label>Location/Address</Form.Label>
            <BsGeoAltFill size={15}/>
              <Form.Control name="location" placeholder="Main Ferozpur Road" value={center.location} onChange={handleChange}/>
              {center.locationError && (
                <p style={{ color: 'red' }}>{center.locationError}</p>
              )}
          </Form.Group>
        </Col>
        <Col xs="12" sm="4">
          <Form.Group className="mb-3" controlId="formGridAddress2">
            <Form.Label>City</Form.Label>
            <i class="fa fa-location-arrow" aria-hidden="true"></i>
            <Form.Control name="city" placeholder="Lahore, Punjab, Pakistan" value={center.city} onChange={handleChange}/>
            {center.locationError && (
              <p style={{ color: 'red' }}>{center.locationError}</p>
            )}
          </Form.Group>
        </Col>
        <Col xs="12" sm="4">
        <Form.Group className="mb-3" controlId="contact1">
          <Form.Label>Contact Number</Form.Label>
          <BsFillTelephoneFill size={15} />
          <Form.Control placeholder="+9234946123" name="contactNo" value={center.contactNo} onChange={handleChange}/>
          {center.contactNoError && (
            <p style={{ color: 'red' }}>{center.contactNoError}</p>
          )}
        </Form.Group>
        </Col>
        </Row>
        <Row className="mb-3">
        <Col xs="12" sm="3">
          <Form.Group className="mb-3" controlId="email">
            <Form.Label>Email</Form.Label>
            <BsEnvelopeFill size={15} />
            <Form.Control name="email" placeholder="example@gmail.com" value={center.email} onChange={handleChange}/>
            {center.emailError && (
              <p style={{ color: 'red' }}>{center.emailError}</p>
            )}
          </Form.Group>
        </Col>
        <Col xs="12" sm="3">
          <Form.Group as={Col} controlId="formGridCity">
            <Form.Label>Available Timings</Form.Label>
            <BsStopwatch size={15} />
            {/* <Form.Control placeholder="Category" name="timings" value={center.timings} onChange={handleChange} required/> */}
            <Form.Select required name="timings" value={center.timings} onChange={handleChange} >
              <option value="">Select Timing/Shift of Center*</option>
              <option value="6AM-2PM">6AM-2PM</option>
              <option value="2PM-11PM">2PM-11PM</option>
              <option value="11PM-6AM">11PM-6AM</option>
              <option value="6AM-6PM">6AM-6PM</option>
              <option value="6PM-6AM">6PM-6AM</option>
              <option value="12AM-12PM/Full Day/Night">12AM-12PM/Full Day/Night</option>
            </Form.Select>
          </Form.Group>
        </Col>
        <Col xs="12" sm="3">
        <Form.Group controlId="formGridState">
          <Form.Label>Opening Days</Form.Label>
          <i class="fa fa-sun" aria-hidden="true"></i>
          <Form.Control placeholder="Category" name="openingDays" value={center.openingDays} onChange={handleChange} required/>
        </Form.Group>
        </Col>
        <Col xs="12" sm="3">
          <Form.Group as={Col} controlId="formGridZip">
            <Form.Label>Category</Form.Label>
            <i class="fa fa-registered" aria-hidden="true"></i>
            
            {/* <Form.Control name="category" placeholder="Category" value={center.category} onChange={handleChange}/>
            {center.categoryError && (
              <p style={{ color: 'red' }}>{center.categoryError}</p>
            )} */}
            
            <Form.Select required name="category" value={center.category} onChange={handleChange} >
              <option value="">Select Category of Center*</option>
              <option value="Private">Private</option>
              <option value="Public">Public</option>
            </Form.Select>
          </Form.Group>
        </Col>
      </Row>
      <Row className="mb-3" >
        <Form.Group as={Col} id="formGridCheckbox">
          <Form.Check type="checkbox" label="Are the provided information is correct according to your center or knowledge?" />
        </Form.Group>
      </Row>
    </Form>
        <Col>
            <Button style={{ display: "inline-block",textAlign:"center",backgroundColor: "#153250"}} className="mx-3  w-md-100" onClick={handleSubmit}><i class="fa fa-check-circle" aria-hidden="true"></i>Update Information</Button>
        </Col>
    <Card className="shadow p-3 mb-2 border rounded" style={{marginTop:30,paddingBottom:10}}>
        <Row>
          <Col style={{ textAlign: "justifyContent"}}>
            <h5 className="py-2 mx-3"><BsFillExclamationTriangleFill size={20}/>Are you sure you want to delete your account?</h5>
            <h6 className="py-2 mx-3">Once you delete your account, there is no going back. Please be certain.</h6>
            <Form>
              <Form.Group as={Col} id="formGridCheckbox">
                <Form.Check type="checkbox" style={{color:"black",borderColor:"red"}} className="py-3" label="Are the provided information is correct according to your center or knowledge?" />
              </Form.Group>
            </Form>
            <Button style={{ display: "inline-block", textAlign:"center"}} className="mx-3 my-3 w-md-100" variant="danger" onClick={handleDelete}><i class="fa fa-trash" aria-hidden="true"></i>Delete Center</Button>
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
    )}
  </div>
  );
}

export default ProfileSettings;