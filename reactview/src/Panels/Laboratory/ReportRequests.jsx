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
//import { toast } from 'react-toastify';
import { handleRequestReportsPrint } from "./LabComponents/PrintedFiles/RequestedReport";
import LoadingSpinner from "../../Components_for_All_Panels/BloodCentre/LoadingSpinner";
import {  PrinterFill } from 'react-bootstrap-icons';
import { useAuth  }  from './../BloodDonationCentre/Auth/AuthContext';
import jwt_decode from 'jwt-decode';

const ReportRequests=()=> {  

  const {token} = useAuth();


  //This will get the id  from the token if user is login
  const decodedToken = token ? jwt_decode(token) : null;
  const role = decodedToken?.role;

  const [loading, setIsLoading] = useState(true);
  const [data, setData] = useState([]);
  const [show, setShow] = useState(false);
  
  const authCentre=()=>{
    if(role!=='LAB'){
      window.location.href = "/user/login";
    }
      console.log("authCentre");
  }
  const [CBCData, setSingleData] = useState(
    {
      ID: "",
      UserName:"",
      Age: "",
      Sex: "",
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
  
  function handleClose() {
    console.log("Handle Closed clicked");
    return setShow(false);
  }
  const handleShow = (UserName) => {
    console.log("Handle Show Button clicked");
    console.log("UserName",UserName);
    axios.get(`http://localhost:8081/api/labs/getCBCdetails/byUserName/${UserName}`).then((response)=>{
      const { results } = response.data;
      if (results && results.bindings && results.bindings.length > 0) {
        const CBCdata = results.bindings[0];
        setSingleData({
          ID: CBCdata.ID.value,
          UserName:CBCdata.UserName.value,
          Age: CBCdata.Age.value,
          Sex: CBCdata.Sex.value,
          WBC: CBCdata.WBC.value,
          RBC: CBCdata.RBC.value,
          HGB: CBCdata.HGB.value,
          PLT: CBCdata.PLT.value,
          STDs: CBCdata.STDs.value,
          AIDs: CBCdata.AIDs.value,
          Diabetes: CBCdata.Diabetes.value,
          Syphilis: CBCdata.Syphilis.value,
        });
        console.log("Data",CBCdata);
      }});
    return setShow(true);
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setSingleData((prevCenterData) => ({ ...prevCenterData, [name]: value }));
  };
 
  
  useEffect(() => {
    // fetch data from the backend
    fetch('http://localhost:8081/api/labs/AllDonorsCBCReport')
      .then((response) => response.json())
      .then((data) => {
        // map the bindings array to an array of objects
        const rows = data.results.bindings.map((binding) => {
          return {
            ID: binding.ID,
            UserName: binding.UserName,
            Name: binding.Name,
            Address: binding.Address,
            Email: binding.Email,
            ContactNo: binding.ContactNo,
            City: binding.City,
            Status: binding.Status,
            BloodGroup: binding.BloodGroup,
          };
        });
        setData(rows);
      })
      .catch((error) => console.log(error));
      setIsLoading(false);
      authCentre();
  }, []);
  const handlePrint = () => {
    console.log("Handle Print method calls!")
    handleRequestReportsPrint(data,CBCData);
  };
  
  
 
  
const mystyle = {
  height: "7%",
  width: "7%",
  borderRadius: "50px",
  display: "inline-block",
};  

  return (
    loading ? <LoadingSpinner/> :
    <>
    <Modal fade={false} show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title style={{textAlign:"center",justifyContent:"center",fontSize:"22px"}}>CBC Report Details</Modal.Title>
        </Modal.Header>
        <Modal.Title style={{textAlign:"center",fontSize:"18px",justifyContent:"center"}}>UserName:{CBCData.UserName}</Modal.Title>

        <Modal.Body>
          <Form>
          <Row>
            <Col xs={6}>
              <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                <Form.Label>Age</Form.Label>
                <Form.Control
                  placeholder="Age"
                  disabled
                  name="Age"
                  value={CBCData.Age}
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
                  name="Sex"
                  disabled
                  value={CBCData.Sex == 0 ? 'Male' : 'Female'}
                />
              </Form.Group>
            </Col>
          </Row>

          <Row>
            <Col xs={6}>
              <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                <Form.Label>PLT</Form.Label>
                <Form.Control
                  disabled
                  placeholder="PLT"
                  name="PLT"
                  value={CBCData.PLT}
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
                  disabled
                  name="WBC"
                  value={CBCData.WBC}
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
                  disabled
                  name="RBC"
                  value={CBCData.RBC}
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
                  disabled
                  name="HGB"
                  value={CBCData.HGB}
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
                  disabled
                  name="STDs"
                  value={CBCData.STDs == 1 ? 'Yes' : 'No'}
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
                  disabled
                  name="AIDs"
                  value={CBCData.AIDs == 1 ? 'Yes' : 'No'}
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
                  disabled
                  name="Diabetes"
                  value={CBCData.Diabetes == 1 ? 'Yes' : 'No'}
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
                  disabled
                  name="Syphilis"
                  value={CBCData.Syphilis == 1 ? 'Yes' : 'No'}
                  onChange={handleInputChange}
                />
              </Form.Group>
            </Col>
          </Row>
        </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose} style={{backgroundColor: "#153250"}}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    <Container style={{backgroundColor:"#EEEEEE"}} fluid>
      <Header />
      <Row>
        <Col className="mt-sm-5" xs={12}>
        <Card style={{marginTop:30,paddingBottom:10,alignItems:"center",justifyContent:"center",backgroundColor:"#85586F",color:"white"}} className="shadow p-3 mb-2 rounded">
          <Card.Img variant="top" src="/Images/blood-Center.jpg" alt="Image" style={mystyle} className="d-inline-block align-top mx-2"/>
            <Card.Body>
              <Card.Title >All Report Requests</Card.Title>
            </Card.Body>
        </Card>
        
          {data.length > 0 ? (
          <div>
          {
            data.map((item) => (
              <Col md={12} xs={12}>
                <Card className="shadow p-3 mb-2 mt-2 rounded">
                  <Card.Body>
                    <Card.Text>
                      <Row>
                        <Col xs={5}>
                          <h6>
                            User Name:  
                          </h6>
                          <h6>
                            Name:
                          </h6>
                          <h6>
                            Email:
                          </h6>
                          <h6>
                            Address:
                          </h6>
                          <h6>
                            City:
                          </h6> 
                          <h6>
                            Contact No:
                          </h6>
                          <h6>
                            Status:
                          </h6>
                          <h6>
                            Blood Group:
                          </h6>
                        </Col>
                        <Col xs={7}>
                          <h6>
                            {item.UserName.value}
                          </h6>
                          <h6>
                            {item.Name.value}
                          </h6>
                          <h6>
                            {item.Email.value}
                          </h6>
                          <h6>
                            {item.Address.value}
                          </h6>
                          <h6>
                            {item.City.value}
                          </h6>
                          <h6>
                            {item.ContactNo.value}
                          </h6>
                          <h6>
                            {item.Status.value}
                          </h6>
                          <h6>
                            {item.BloodGroup.value}
                          </h6>
                        </Col>
                      </Row>
                      <Row>
                        <Col xs={12} style={{justifyContent:"center",textAlign:"center",marignBottom:"20px",marginTop:"16px"}}>
                          <div>
                            <Button className='btn btn-info mb-3' onClick={()=>handleShow(item.UserName.value)} style={{backgroundColor: "#153250",color:"#fff"}}>View Report Details</Button>
                          </div>
                        </Col>
                      </Row>
                    </Card.Text>                   
                  </Card.Body> 
                </Card>
              </Col>
            ))
         }
         </div>
          ) : (
            <div>
              <h6 style={{textAlign:"center",marginTop:"20px"}}>No Report Requests Found!</h6>
            </div>
          )}
          {
            data.length>0?(
              <div>
              {
                <Col xs={12} style={{justifyContent:"center",textAlign:"center",marignBottom:"20px",marginTop:"16px"}}>
                  <div>
                    <h6>
                      For Printing the Report list, click this button. This is for record Purposes only.
                    </h6>
                      <Button className='btn btn-info mb-3' onClick={handlePrint} style={{backgroundColor: "#153250",color:"#fff"}}><PrinterFill className="" size={20} />Download/Print</Button>
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
  </>
  );
}

export default ReportRequests;