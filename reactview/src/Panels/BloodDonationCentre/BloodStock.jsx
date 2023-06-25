import React,{useState,useEffect,useRef} from "react";
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
//Import bloodstock.css file
import './Styling/popupcard.css'; 

const BloodStock=()=> {
  const [loading, setIsLoading] = useState(true);
  const [isDataFetched, setIsDataFetched] = useState(false);

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
  
  //This will get the id  from the token if user is login
  const decodedToken = token ? jwt_decode(token) : null;
  const role = decodedToken?.role;
  const ID= decodedToken?.id;
  const authCentre=()=>{
    if(role!=='CENTRE'){
      window.location.href = "/user/login";
    }
      console.log("authCentre");
  }
  const isInitialRender = useRef(true);

  //For showing toast single time
  useEffect(() => {
    const showToast = () => {
      toast("All the activities are monitored by ADMIN!",{position:toast.POSITION.TOP_CENTER});
    };

    if (isInitialRender.current) {
      isInitialRender.current = false;
    } else {
      showToast();
    }
  }, []);
  const fetchData = async () => {
    try {
      const response = await axios.get(`http://localhost:8081/api/users/bloodstock/withAllBloodGroups/byCentreID/${ID}`);
      const { results } = response.data;
      if (results && results.bindings && results.bindings.length > 0) {
        const centerData = results.bindings.map((binding) => ({
          ID: binding.ID.value,
          bloodGroup: binding.BloodGroup.value,
          noOfBags: binding.NoOfBags.value,
          addedDate: binding.AddedDate.value,
        }));
        // Check if data is already fetched
        if (!isDataFetched) {
          setbloodData(centerData);
          setIsDataFetched(true);
          console.log("Blood stock on fetching", centerData);
        }
      }
    } catch (error) {
      console.error(error);
    }
  };

  const PostStockData=async()=>{
    try {
      const response = await axios.post('http://localhost:8081/api/bloodCenter/RegisteredCenters/bloodStockDetailsWithGroups/add',{
        centre_ID: ID,
      })
      .then((response)=>
      {
        console.log("Response Data in Posting blood stock",response.data);
        fetchData();
      })
      .catch((error)=>{console.log(error)});
      } catch (error) {
        console.error(error);
      }   
  };
  useEffect(() => {
    authCentre();
    fetchData();
    setIsLoading(false);
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
    axios.get(`http://localhost:8081/api/bloodCenter/RegisteredCenters/bloodStockDetailsByID/${id}`).then((response)=>{
      const { results } = response.data;
      if (results && results.bindings && results.bindings.length > 0) {
        const centerData = results.bindings[0];
        setSingleData({
          ID: centerData.ID.value,
          bloodGroup: centerData.Blood_Group.value,
          noOfBags: centerData.No_Of_Bags.value,
          addedDate: centerData?.AddedDate?.value
        });
        console.log("Data",centerData);
      }});
    return setShow(true);
  };
    /* 
      var today = new Date();
      var dd = String(today.getDate()).padStart(2, '0');
      var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
      var yyyy = today.getFullYear();

      today = mm + '/' + dd + '/' + yyyy;
    */
  const handleSaveChanges = () => {
    console.log("Handle Save Changes clicked");
    console.log("ID",bloodData.ID);
    axios
      .put(`http://localhost:8081/api/bloodCenter/RegisteredCenters/bloodStockDetails/${bloodData.ID}`, bloodData)
      .then((response) => {
        console.log("Response Data",response.data);
        toast.info(response.data.success,{position:toast.POSITION.TOP_RIGHT});
        handleClose();
        setTimeout(() => {
          window.location.reload();
        }, 4000);
      })
      .catch((error) => {
        toast.error(error.response.data,{position: toast.POSITION.TOP_RIGHT});
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
                //Add current date to form
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
        <Col xs={2}>
          <Sidebar/>        
        </Col>
        <Col className="mt-md-5" xs={10}>
        <Card style={{marginTop:30,paddingBottom:10,alignItems:"center",marginLeft:"25px",justifyContent:"center",backgroundColor:"#970C10",color:"white"}} className="shadow p-3 mb-3 border rounded">
          <Card.Img variant="top" src="/Images/blood-Center.jpg" alt="Image" style={mystyle} className="d-inline-block align-top mx-2"/>
            <Card.Body>
              <Card.Title >Available Blood Stock</Card.Title>
            </Card.Body>
          </Card>
          <Card style={{marginTop:10,paddingBottom:10,alignItems:"center",marginLeft:"25px",justifyContent:"center"}} className="shadow p-3 mb-2 border rounded">
            <Card.Body>
              <Card.Title style={
                {color:"red",fontSize:20,fontWeight:"bold",textAlign:"center"}
              }>You can generate the report of available blood stock for the Record Purposes!</Card.Title>
            </Card.Body>
          </Card>
          {
            blood?.length > 0 ? (
              <>
              </>
            ) : 
            (
            <Card style={{marginTop:10,paddingBottom:10,alignItems:"center",justifyContent:"center"}} className="shadow p-3 mb-2 border rounded">
              <Card.Body>
                <Button variant="primary" onClick={PostStockData}>
                  Create Blood Registry
                </Button>
              </Card.Body>
            </Card>
          )}
          
          <>
          <CardGroup style={{marginLeft:"20px"}}>
          {blood.map((card) => (
            <Col key={card.ID} md={4} sm={4}>
              <Card style={{ width: "18rem",marginTop:"10px"}} id="card">
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
                  <Button variant="primary" onClick={() => handleShow(card.ID)} style={{backgroundColor: "#153250"}}>
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
      {
      blood?.length > 0 ? (
        <Row>
          <Col xs={6}>
          
          </Col>
          <Col xs={12} md={4} style={{marginBottom:"1.5rem",textAlign:"center",justifyContent:"center",alignItems:"center",marginTop:"18px"}}>  
            <Button variant="danger" style={{backgroundColor:""}} onClick={handleBloodPrint}><PrinterFill className="" size={20} /> Print Blood stock</Button>
          </Col>
          <Col xs={2}>
          
          </Col>
        </Row>
      ) : 
      (
        <>
        </>
      )}
    </Container>
    </>
    )}
     </div>
  );
}
export default BloodStock;