import React,{useState,useEffect} from "react";
import axios from "axios";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import Header from "./LabComponents/Header";
import { toast } from 'react-toastify';
import LoadingSpinner from "../../Components_for_All_Panels/BloodCentre/LoadingSpinner";
import {  PrinterFill } from 'react-bootstrap-icons';
import { InputGroup,FormControl } from "react-bootstrap";
import { Search,ArrowRight,Trash } from 'react-bootstrap-icons';

const AddBloodReport=()=> {  


  const [loading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [userData, setUserData] = useState(
    {
      ID: "",
      UserName:"",
      Name: "",
      Address: "",
      Email: "",
      ContactNo: "",
      City: "",
      Age: "",
      Sex: "",
      Status: "",
      WBC: "",
      RBC: "",
      HGB: "",
      PLT: "",
      STDs: "",
      AIDs: "",
      Diabetes: "",
      Syphilis: "",
    }
  );
  
 
    useEffect(() => {
    setIsLoading(false);
    }, []);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUserData((prevCenterData) => ({ ...prevCenterData, [name]: value }));
  };
 
  
  
  
  const setArray = () => {
    //setFilteredDataArray(data);
    console.log("setArray", userData);
  };
  
  const getUsername = (searchTerm) => {
    console.log("getUsername", searchTerm);
    axios.get(`http://localhost:8081/api/labs/getCBCdetails/byUserName/${searchTerm}`).then((response)=>{
      const { results } = response.data;
      if (results && results.bindings && results.bindings.length > 0) {
        const UserData = results.bindings[0];
        setUserData({
          ID: UserData.ID.value,
          UserName:UserData.UserName.value,
          Age: UserData.Age.value,
          Name: UserData.Name.value,
          Address: UserData.Address.value,
          Email: UserData.Email.value,
          ContactNo: UserData.ContactNo.value,
          City: UserData.City.value,
          Status: UserData.Status.value,
          WBC: UserData.WBC.value,
          RBC: UserData.RBC.value,
          HGB: UserData.HGB.value,
          PLT: UserData.PLT.value,
          STDs: UserData.STDs.value,
          AIDs: UserData.AIDs.value,
          Diabetes: UserData.Diabetes.value,
          Syphilis: UserData.Syphilis.value,
        });
        console.log("Data",UserData);
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
                  name="Age"
                  value={userData.Age}
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
                  name="Sex"
                  value={userData.Sex == 0 ? 'Male' : 'Female'}
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
                  name="Name"
                  value={userData.Name}
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
                  name="ContactNo"
                  value={userData.ContactNo}
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
                  name="City"
                  value={userData.City}
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
                  name="Address"
                  value={userData.Address}
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
                  name="PLT"
                  value={userData.PLT}
                  onChange={handleInputChange}
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
                  name="WBC"
                  value={userData.WBC}
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
                  name="RBC"
                  value={userData.RBC}
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
                  name="HGB"
                  value={userData.HGB}
                  onChange={handleInputChange}
                />
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col xs={6}>
              <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                <Form.Label>STDs</Form.Label>
                <Form.Control
                  placeholder="STDs"
                  autoFocus
                  name="STDs"
                  value={userData.STDs == 1 ? 'Yes' : 'No'}
                  onChange={handleInputChange}
                />
              </Form.Group>
            </Col>
            <Col xs={6}>
              <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                <Form.Label>
                AIDs
                </Form.Label>
                <Form.Control
                  placeholder="AIDs"
                  autoFocus
                  name="AIDs"
                  value={userData.AIDs == 1 ? 'Yes' : 'No'}
                  onChange={handleInputChange}
                />
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col xs={6}>
              <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                <Form.Label>Diabetes</Form.Label>
                <Form.Control
                  placeholder="Diabetes"
                  autoFocus
                  name="Diabetes"
                  value={userData.Diabetes == 1 ? 'Yes' : 'No'}
                  onChange={handleInputChange}
                />
              </Form.Group>
            </Col>
            <Col xs={6}>
              <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                <Form.Label>
                Syphilis
                </Form.Label>
                <Form.Control
                  placeholder="Syphilis"
                  autoFocus
                  name="Syphilis"
                  value={userData.Syphilis == 1 ? 'Yes' : 'No'}
                  onChange={handleInputChange}
                />
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
                      <Button className='btn btn-info mb-3'  style={{backgroundColor: "#153250",color:"#fff"}}>Upload Report Data of User</Button>
                  </div>
                </Col>
              }
              </div>
          )
           : (
            <div>
              
            </div>
          )}
        </Col>
      </Row>
    </Container>
  );
}

export default AddBloodReport;