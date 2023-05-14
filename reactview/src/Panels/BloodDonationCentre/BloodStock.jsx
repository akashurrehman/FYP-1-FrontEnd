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
import B_positive from './../../Components_for_All_Panels/BloodCentre/Image/B-positive.jpg';
import AB_positive from './../../Components_for_All_Panels/BloodCentre/Image/Ab-positive.jpg';
import AB_negative from './../../Components_for_All_Panels/BloodCentre/Image/Ab-negative.jpg';
import axios from 'axios'; 
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {handleBloodStockPrint} from "./PrintedFiles/BloodStockPrint";
import { useAuth  }  from './Auth/AuthContext';
import jwt_decode from 'jwt-decode';


const BloodStock=()=> {

  const mystyle = {
    height: "7%",
    width: "7%",
    borderRadius: "50px",
    display: "inline-block",
};

  const [show, setShow] = useState(false);

  const [blood, setbloodData] = useState([]);

  const handleBloodPrint = () => {
    handleBloodStockPrint(blood);
    console.log("Handle Print button in Blood Stock!")
  };
  const {token} = useAuth();
  const authCentre=()=>{
    if(!token){
      window.location.href = "/Login";
    }
      console.log("authCentre");
  }

//This will get the id  from the token if user is login
  //const {id} = jwt_decode(token);
  
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
        toast.success(response.data,{position:toast.POSITION.TOP_RIGHT});
        toast("Data added Successfully")
        handleClose();
        window.location.reload();
      })
      .catch((error) => {
        toast.error(error,{
          position: toast.POSITION.TOP_RIGHT
      });
        console.log("Error updating data: ", error);
      });
  };


    return (
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
        <Card style={{marginTop:30,paddingBottom:10,alignItems:"center",justifyContent:"center",backgroundColor:"#970C10",color:"white"}} >
          <Card.Img variant="top" src="/Images/blood-Center.jpg" alt="Image" style={mystyle} className="d-inline-block align-top mx-2"/>
            <Card.Body>
              <Card.Title >Available Blood Stock</Card.Title>
            </Card.Body>
          </Card>
          <>
          <CardGroup>
          {blood.map((card) => (
            <Col key={card.ID} md={4}>
              <Card style={{ width: "18rem",marginTop:"10px" }}>
                <Card.Img variant="top" style={{
                    width: "50%",
                    height: "50%",
                    margin: "0 auto",
                    display: "block"
                  }}  src={card.bloodGroup === 'A+' ? A_positive : card.bloodGroup === 'B+' ? B_positive : card.bloodGroup === 'AB+' ? AB_positive : AB_negative} />
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
        <Button onClick={handleBloodPrint}>Print Blood stock files</Button>
        </Col>
      </Row>
    </Container>
    </>
  );
}
export default BloodStock;