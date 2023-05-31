import React,{useState,useEffect} from "react";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Sidebar from "../../Components_for_All_Panels/BloodCentre/SideNavbar";
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import CardGroup from 'react-bootstrap/CardGroup';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import Header from "../../Components_for_All_Panels/BloodCentre/Header";
import A_positive from './../../Components_for_All_Panels/BloodCentre/Image/A-positive.jpg';
import A_negative from './../../Components_for_All_Panels/BloodCentre/Image/A-negative.jpg';
import B_positive from './../../Components_for_All_Panels/BloodCentre/Image/B-positive.jpg';
import B_negative from './../../Components_for_All_Panels/BloodCentre/Image/B-negative.png';
import AB_positive from './../../Components_for_All_Panels/BloodCentre/Image/Ab-positive.jpg';
import AB_negative from './../../Components_for_All_Panels/BloodCentre/Image/Ab-negative.jpg';
import O_positive from './../../Components_for_All_Panels/BloodCentre/Image/O-positive.jpg';
import O_negative from './../../Components_for_All_Panels/BloodCentre/Image/O-negative.jpg';
import LoadingSpinner from "../../Components_for_All_Panels/BloodCentre/LoadingSpinner";
import {PrinterFill} from 'react-bootstrap-icons'
import axios from 'axios'; 
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {handleBloodStockPrint} from "./PrintedFiles/BloodStockPrint";
import { useAuth } from "./Auth/AuthContext";
import jwt_decode from 'jwt-decode';

const BloodStock=()=> {
  const [loading, setIsLoading] = useState(true);

  const mystyle = {
    height: "7%",
    width: "7%",
    borderRadius: "50px",
    display: "inline-block",
};

  const [show, setShow] = useState(false);

  const [blood, setbloodData] = useState([]);
  const [toastify,setToastify ] = useState(false);



  const handleBloodPrint = () => {
    handleBloodStockPrint(blood);
    console.log("Handle Print button in Blood Stock!")
  };
  const {token} = useAuth();
  
  //This will get the id  from the token if user is login
  const decodedToken = token ? jwt_decode(token) : null;
  const role = decodedToken?.role;
  const ID= decodedToken?.id;
  const authCentre=()=>{
    if(role!='CENTRE'){
      window.location.href = "/user/login";
    }
      console.log("authCentre");
  }
  const toasity=()=>{
    toast("All the activities are monitored by ADMIN!",{position:toast.POSITION.TOP_CENTER});
    setToastify(true);
  }
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:8081/api/bloodCenter/RegisteredCenters/bloodStockDetails');
        const { results } = response.data;
        if (results && results.bindings && results.bindings.length > 0) {
          const centerData = results.bindings.map((binding) => ({
            ID: binding.ID.value,
            bloodGroup: binding.Blood_Group.value,
            noOfBags: binding.No_Of_Bags.value,
            addedDate: binding.Gender.value,
          }));
          setbloodData(centerData);
          console.log("Data",centerData);
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
    authCentre();
    setIsLoading(false);
    toasity();
  }, []);
  
  
const handleInputChange = (event) => {
  const { name, value } = event.target;
  setSingleData((prevCenterData) => ({ ...prevCenterData, [name]: value }));
};

  function handleClose() {
    console.log("Handle Closed clicked");
    return setShow(false);
  }

  const [bloodData, setSingleData] = useState(
    {
      ID: "",
      bloodGroup: "",
      noOfBags: "",
      addedDate: "",
    }
  );
  const handleShow = (id) => {
    console.log("Handle Show clicked");
    console.log("ID",id)
    axios.get(`http://localhost:8081/api/bloodCenter/RegisteredCenters/bloodStockDetails/${id}`).then((response)=>{
      const { results } = response.data;
      if (results && results.bindings && results.bindings.length > 0) {
        const centerData = results.bindings[0];
        setSingleData({
          ID: centerData.ID.value,
          bloodGroup: centerData.Blood_Group.value,
          noOfBags: centerData.No_Of_Bags.value,
          addedDate: centerData.Gender.value
        });
        console.log("Data",centerData);
      }});
    return setShow(true);
  };
  
  

  const handleSaveChanges = () => {
    console.log("Handle Save Changes clicked");
    console.log("ID",bloodData.ID);
    axios
      .put(`http://localhost:8081/api/bloodCenter/RegisteredCenters/bloodStockDetails/${bloodData.ID}`, bloodData)
      .then((response) => {
        console.log("Response Data",response.data);
        toast(response.data.success,{position:toast.POSITION.TOP_RIGHT});
        handleClose();
        window.location.reload();
      })
      .catch((error) => {
        toast.error(error,{position: toast.POSITION.TOP_RIGHT});
        console.log("Error updating data: ", error);
      });
  };


    return (
    <div>
      {loading ? (
    <LoadingSpinner />
    ) : (
      <>
      <Modal fade={false} show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Blood Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label>Blood Group: {bloodData.bloodGroup}</Form.Label>
            </Form.Group>
            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Label>Total blood bottles or quantity in MLiters</Form.Label>
              <Form.Control
                placeholder="1 bottle or 100Ml"
                autoFocus
                name="noOfBags"
                value={bloodData.noOfBags}
                onChange={handleInputChange}
                />
              <Form.Label>Freeze time</Form.Label>
              <Form.Control
                placeholder="10 am"
                autoFocus
                name="addedDate"
                value={bloodData.addedDate}
                onChange={handleInputChange}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose} style={{backgroundColor: "#153250"}}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSaveChanges} style={{backgroundColor: "#153250"}}> 
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    <Container fluid style={{backgroundColor:"#EEEEEE"}}>
      <Header />
      <Row>
        <Col xs={3}>
          <Sidebar/>        
        </Col>
        <Col className="mt-md-5" xs={9}>
        <Card style={{marginTop:30,paddingBottom:10,alignItems:"center",justifyContent:"center",backgroundColor:"#970C10",color:"white"}} className="shadow p-3 mb-3 border rounded">
          <Card.Img variant="top" src="/Images/blood-Center.jpg" alt="Image" style={mystyle} className="d-inline-block align-top mx-2"/>
            <Card.Body>
              <Card.Title >Available Blood Stock</Card.Title>
            </Card.Body>
          </Card>
          <Card style={{marginTop:10,paddingBottom:10,alignItems:"center",justifyContent:"center"}} className="shadow p-3 mb-2 border rounded">
            <Card.Body>
              <Card.Title style={
                {color:"red",fontSize:20,fontWeight:"bold",textAlign:"center"}
              }>You can generate the report of available blood stock for the Record Purposes!</Card.Title>
            </Card.Body>
          </Card>
          <>
          <CardGroup>
          {blood.map((card) => (
            <Col key={card.ID} md={4}>
              <Card style={{ width: "18rem",marginTop:"10px" }}>
              <Card.Header>
                <Card.Img variant="top" style={{
                    width: "50%",
                    height: "50%",
                    margin: "0 auto",
                    display: "block"
                  }}  src={card.bloodGroup === 'A+' ? A_positive : card.bloodGroup === 'B+' ? B_positive : card.bloodGroup === 'AB+' ? AB_positive : card.bloodGroup ==='A-' ? A_negative : card.bloodGroup === 'B-' ? B_negative : card.bloodGroup ==='A-' ? A_negative : card.bloodGroup === 'AB-' ? AB_negative : card.bloodGroup === 'O+' ? O_positive : O_negative } />
                </Card.Header>
                <Card.Body>
                  <Card.Title>Blood Group:{card.bloodGroup}</Card.Title>
                  <Card.Text>No of bags available: {card.noOfBags}</Card.Text>
                  <Card.Text>Freeze time: {card.addedDate}</Card.Text>
                  <Button variant="primary" onClick={() => handleShow(card.bloodGroup)} style={{backgroundColor: "#153250"}}>
                    Update Stock
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </CardGroup>
          </>
        </Col>
      </Row>
      <Row>
        <Col xs={6}>
        
        </Col>
        <Col xs={12} md={4} style={{marginBottom:"1.5rem"}}>  
          <div style={{justifyContent:"center",alignItems:"center",marginTop:"18px"}}>
            <Button variant="danger" style={{backgroundColor:""}} onClick={handleBloodPrint}><PrinterFill className="" size={20} /> Print Blood stock</Button>
          </div>
        </Col>
        <Col xs={2}>
        
        </Col>
      </Row>
    </Container>
    </>
    )}
     </div>
  );
}
export default BloodStock;