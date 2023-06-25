import React,{useState,useEffect,useRef} from "react";
import axios from "axios";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Header from "./LabComponents/Header";
import { toast } from 'react-toastify';
import LoadingSpinner from "../../Components_for_All_Panels/BloodCentre/LoadingSpinner";
import { InputGroup,FormControl } from "react-bootstrap";
import { Search} from 'react-bootstrap-icons';
import { useAuth  }  from './../BloodDonationCentre/Auth/AuthContext';
import jwt_decode from 'jwt-decode';

const AddBloodReport=()=> {  


  const [loading, setIsLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [userData, setUserData] = useState(
    {
      username:"",
      name: "",
      address: "",
      bloodGroup: "",
      email: "",
      contactNo: "",
      city: "",
      age: "",
      sex: "",
      donorEligibilityStatus: "",
      wbc: "",
      rbc: "",
      hgb: "",
      plt: "",
      stds: "",
      aids: "",
      diabetes: "",
      syphilis: "",
    }
  );
  
  const {token} = useAuth();

   //This will get the id  from the token if user is login
   const decodedToken = token ? jwt_decode(token) : null;
  const role = decodedToken?.role;

  const authCentre=()=>{
    if(role!=='LAB'){
      window.location.href = "/user/login";
    }
      console.log("authCentre");
  }

  const handleCancel = () => {
    setShowModal(false);
    toast("Report data not added",{position:toast.POSITION.TOP_RIGHT});
  }
  const validateForm = () => {
    console.log("In Validate Form method!")
    let isValid = true;
    const errors = {};
  
    if (!userData.donorEligibilityStatus) {
      console.log("Error in status")
      isValid = false;
      errors.donorEligibilityStatusError = "Please select Eigible or Not Eligible";
    }
    // if(!userData.bloodGroup){
    //   isValid = false;
    //   errors.bloodGroupError = "Please select valid blood Group";
    // }
    return isValid;
  }
  const handleSubmit = (event) => {
    console.log("In Handle Submit button!")
    event.preventDefault();
    const isValid = validateForm();
    if (isValid) {
    setShowModal(true);
    }
  };
    const isInitialRender = useRef(true);

    //For showing toast single time
    useEffect(() => {
      const showToast = () => {
        toast.info('You have to add blood report (CBC) details!', {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          });
      };
  
      if (isInitialRender.current) {
        isInitialRender.current = false;
      } else {
        showToast();
      }
      setIsLoading(false)
      authCentre();
    }, []);
   
  const handleInputChange = (event) => {
    const { name, value } = event.target;

    //setUserData((prevCenterData) => ({ ...prevCenterData, [name]: value }));
    let newUserData = { ...userData, [name]: value };

     // For donorEligibilityStatus
     if (name === "donorEligibilityStatus") {
      const categoryRegex = /^(Eligible|Not Eligible)$/i; // regex for allowed values
      if (!categoryRegex.test(value)) {
        newUserData = { ...userData, [name]: value, donorEligibilityStatusError: "Please enter 'Eligible' or 'Not Eligible'" };
      } else {
        newUserData = { ...userData, [name]: value, donorEligibilityStatusError: null };
      }
    }
    // if(name==="bloodGroup"){
    //   const categoryRegex = /^(AB+|AB-|A+|A-|B+|B-|O+|O-)$/i; // regex for allowed values
    //   if (!categoryRegex.test(value)) {
    //     newUserData = { ...userData, [name]: value, bloodGroupError: "Please select valid blood Group" };
    //   } else {
    //     newUserData = { ...userData, [name]: value, bloodGroupError: null };
    //   }
    // }
     // For STDs
    setUserData(newUserData);  
  };
 
  
  
  
  const setArray = () => {
    //setFilteredDataArray(data);
    console.log("setArray", userData);
  };
  
  const handleConfirm = (event) => {
    event.preventDefault();
    console.log("PostUserReport", userData);
    axios.post(`http://localhost:8081/api/lab/addUserDetails/addUserCBCReportDetails/add`, userData).then((response) => {
        console.log(response);
        console.log("User daata",userData);
        toast.success('Report Added Successfully', {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            });
        })
        .catch((error) => {
        console.log(error);
        toast.error('Report Not Added Successfully', {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            });
        });
        setShowModal(false);
    };

  const getUsername = (searchTerm) => {
    console.log("getUsername", searchTerm);
    axios.get(`http://localhost:8081/api/labs/getCBCdetails/byUserName/${searchTerm}`).then((response)=>{
      const { results } = response.data;
      if (results && results.bindings && results.bindings.length > 0) {
        const UserData = results.bindings[0];
        setUserData({
          username:UserData.UserName.value,
          age: UserData.Age.value,
          name: UserData.Name.value,
          address: UserData.Address.value,
          email: UserData.Email.value,
          sex: UserData.Sex.value,
          contactNo: UserData.ContactNo.value,
          city: UserData.City.value,
          donorEligibilityStatus: UserData.Status.value,
          bloodGroup: UserData.BloodGroup.value,
          wbc: UserData.WBC.value,
          rbc: UserData.RBC.value,
          hgb: UserData.HGB.value,
          plt: UserData.PLT.value,
          stds: UserData.STDs.value,
          aids: UserData.AIDs.value,
          diabetes: UserData.Diabetes.value,
          syphilis: UserData.Syphilis.value,
        });
        console.log("Data",UserData);
        toast.success('User Found', {
          position: "top-center",
          autoClose: 1000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          });
        toast.info('Add the valid (CBC) details!', {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          });

      }})
      .catch((error) =>{ 
      console.log(error)
      toast.error('User Not Found', {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
      });
      setUserData(null);
    });
  };
  
  const handleChange = (event) => {
    setSearchTerm(event.target.value);
  };
  
  const handleClick = (event) => {
    event.preventDefault();
    console.log(searchTerm);
    if(searchTerm !== '') {
      // Call the API to search
      getUsername(searchTerm);
    }
    else{
        setArray();
    }
  };
const mystyle = {
  height: "7%",
  width: "7%",
  borderRadius: "50px",
  display: "inline-block",
};  

  return (
    loading ? <LoadingSpinner/> :
    

    <Container style={{backgroundColor:"#EEEEEE"}} fluid>
      <Header />
      <Row>
        <Col className="mt-sm-5" xs={12}>
            <Card style={{marginTop:30,paddingBottom:10,alignItems:"center",justifyContent:"center",backgroundColor:"#85586F",color:"white"}} className="shadow p-3 mb-2 rounded">
            <Card.Img variant="top" src="/Images/blood-Center.jpg" alt="Image" style={mystyle} className="d-inline-block align-top mx-2"/>
                <Card.Body>
                <Card.Title >Blood Reports Page</Card.Title>
                </Card.Body>
            </Card>
            <Container className='d-flex justify-content-center'>
                <Row style={{ width: '40%' }}>
                    <form onSubmit={handleClick}>
                        <InputGroup size="sm" className="mb-1">
                        <FormControl
                            placeholder="Search user by Entering Username ..."
                            aria-label="Search Blood Donations"
                            aria-describedby="basic-addon2"
                            value={searchTerm}
                            onChange={handleChange}
                        />
                            {/* No submit button */}
                            <input type="submit" style={{ display: 'none' }} />
                            <InputGroup.Text id="basic-addon2">
                            <Search className="m-1 PurpleColor" size={18} />
                            </InputGroup.Text>
                        </InputGroup>
                    </form>
                </Row>
            </Container>
        {userData ? (
        <div>
        {   
        <Form>

            <Col xs={12} style={{textAlign:"center",justifyContent:"center"}}>
                <h6 >
                    User Personal Information
                </h6>
            </Col>

          <Row>
            <Col xs={6}>
              <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                <Form.Label>Age</Form.Label>
                <Form.Control
                  placeholder="Age"
                  autoFocus
                  name="age"
                  value={userData.age}
                  onChange={handleInputChange}
                />
              </Form.Group>
            </Col>
            <Col xs={6}>
              <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                <Form.Label>
                  Sex
                </Form.Label>
                <Form.Control
                  placeholder="Sex"
                  autoFocus
                  name="sex"
                  value={userData.sex == 0 ? 'Male' : 'Female'}
                  onChange={handleInputChange}
                />
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col xs={6}>
              <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  placeholder="Name"
                  autoFocus
                  name="name"
                  value={userData.name}
                  onChange={handleInputChange}
                />
              </Form.Group>
            </Col>
            <Col xs={6}>
              <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                <Form.Label>
                  ContactNo
                </Form.Label>
                <Form.Control
                  placeholder="Contact No"
                  autoFocus
                  name="contactNo"
                  value={userData.contactNo}
                  onChange={handleInputChange}
                />
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col xs={6}>
              <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                <Form.Label>City</Form.Label>
                <Form.Control
                  placeholder="City"
                  autoFocus
                  name="city"
                  value={userData.city}
                  onChange={handleInputChange}
                />
              </Form.Group>
            </Col>
            <Col xs={6}>
              <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                <Form.Label>
                  Address
                </Form.Label>
                <Form.Control
                  placeholder="Contact No"
                  autoFocus
                  name="address"
                  value={userData.address}
                  onChange={handleInputChange}
                />
              </Form.Group>
            </Col>
          </Row>
          <Col xs={12} style={{textAlign:"center",justifyContent:"center"}}>
                <h6 >
                    User CBC Report Information
                </h6>
            </Col>
          <Row>
            <Col xs={6}>
              <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                <Form.Label>PLT</Form.Label>
                <Form.Control
                  placeholder="PLT"
                  autoFocus
                  name="plt"
                  value={userData.plt}
                  onChange={handleInputChange}
                  required
                />
              </Form.Group>
            </Col>
            <Col xs={6}>
              <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                <Form.Label>
                  WBC
                </Form.Label>
                <Form.Control
                  placeholder="WBC"
                  autoFocus
                  name="wbc"
                  value={userData.wbc}
                  required
                  onChange={handleInputChange}
                />
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col xs={6}>
              <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                <Form.Label>RBC</Form.Label>
                <Form.Control
                  placeholder="RBC"
                  autoFocus
                  name="rbc"
                  required
                  value={userData.rbc}
                  onChange={handleInputChange}
                />
              </Form.Group>
            </Col>
            <Col xs={6}>
              <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                <Form.Label>
                  HGB
                </Form.Label>
                <Form.Control
                  placeholder="HGB"
                  autoFocus
                  name="hgb"
                  value={userData.hgb}
                  required
                  onChange={handleInputChange}
                />
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col xs={6}>
              <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                <Form.Label>STDs</Form.Label>
                <Form.Select required  autoFocus name="stds"  onChange={handleInputChange} >
                  <option value="">STDs Found?*</option>
                  <option value="0">No</option>
                  <option value="1">Yes</option>
                </Form.Select>
              </Form.Group>
            </Col>
            <Col xs={6}>
              <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                <Form.Label>
                AIDs
                </Form.Label>
                <Form.Select required  autoFocus name="aids" onChange={handleInputChange} >
                  <option value="">Aids Found?*</option>
                  <option value="0">No</option>
                  <option value="1">Yes</option>
                </Form.Select>
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col xs={6}>
              <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                <Form.Label>Diabetes</Form.Label>
                <Form.Select required  autoFocus name="diabetes" onChange={handleInputChange} >
                  <option value="">Diabetes Found?*</option>
                  <option value="0">No</option>
                  <option value="1">Yes</option>
                </Form.Select>
              </Form.Group>
            </Col>
            <Col xs={6}>
              <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                <Form.Label>
                Syphilis
                </Form.Label>
                <Form.Select required  autoFocus name="syphilis" onChange={handleInputChange} >
                  <option value="">Syphilis Found?*</option>
                  <option value={0}>No</option>
                  <option value={1}>Yes</option>
                </Form.Select>
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col xs={6}>
              <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                <Form.Label>Blood Group</Form.Label>
                <Form.Select required name="bloodGroup" value={userData.bloodGroup} onChange={handleInputChange} >
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
              </Form.Group>
            </Col>
            <Col xs={6}>
              <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                <Form.Label>
                Status
                </Form.Label>
                 <Form.Select required name="donorEligibilityStatus" value={userData.donorEligibilityStatus} onChange={handleInputChange} >
                    <option value="">Select Status*</option>
                    <option value="Eligible">Eligible</option>
                    <option value="Not Eligible">Not Eligible</option>
                  </Form.Select>
                  {userData.donorEligibilityStatusError && (
                    <p style={{ color: 'red' }}>{userData.donorEligibilityStatusError}</p>
                  )}
              </Form.Group>
            </Col>
          </Row>
        </Form>
        }
        </div>
        ) : (
            <div>
              <h6 style={{textAlign:"center",marginTop:"20px"}}>Currently No Users!</h6>
            </div>
        )}
        {
        userData?(
              <div>
              {
                <Col xs={12} style={{justifyContent:"center",textAlign:"center",marignBottom:"20px",marginTop:"16px"}}>
                  <div>
                      <Button className='btn btn-info mb-3'  style={{backgroundColor: "#153250",color:"#fff"}} onClick={handleSubmit}>Upload Report Data of User</Button>
                  </div>
                </Col>
              }
              </div>
          )
           : (
            <div>
              
            </div>
          )}
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
  );
}

export default AddBloodReport;