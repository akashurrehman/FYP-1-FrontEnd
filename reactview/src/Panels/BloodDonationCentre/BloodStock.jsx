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
 
const BloodStock=()=> {

  const mystyle = {
    height: "7%",
    width: "7%",
    borderRadius: "50px",
    display: "inline-block",
};
const [bloodStocks, setBloodStocks] = useState([]);

useEffect(() => {
  axios.get('http://localhost:8081/api/bloodCenter/RegisteredCenters/bloodStockDetails')
    .then((response) => {
      const data = JSON.parse(response);
      const stocks = data.results.bindings.map((stock) => {
        return {
          Blood_Group: stock.Blood_Group.value,
          No_Of_Bags: stock.No_Of_Bags.value,
          Gender: stock.Gender.value
        };
      });
      console.log(stocks); 
      setBloodStocks(stocks);
      console.log("Blood stock details are:",stocks); 
    })
    .catch((error) => {
      console.error(error);
    });
}, []);


  const [show, setShow] = useState(false);

  function handleClose() {
    console.log("Handle Closed clicked");

    return setShow(false);
  }
  function handleShow() {
    console.log("handle show clicked");
    return setShow(true);
  }
    return (
      <>
      <Modal fade={false} show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Blood Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Blood Group:{"A+"}</Form.Label>
            </Form.Group>
            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Label>Total blood bottles or quantity in MLiters</Form.Label>
              <Form.Control
                placeholder="1 bottle or 100Ml"
                autoFocus
                value="1 bottle or 100Ml"
                onChange={(e)=>console.log(e.target.value)}
              />
              <Form.Label>Date on last bottle collected?</Form.Label>
              <Form.Control
                placeholder="21 january 2022"
                autoFocus
                value="29 jan 2022"
                onChange={(e)=>console.log(e.target.value)}
              />
              <Form.Label>Freeze time</Form.Label>
              <Form.Control
                placeholder="10 am"
                autoFocus
                value="10 am"
                onChange={(e)=>console.log(e.target.value)}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClose}> 
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    <Container fluid>
      <Header />
      <Row>
        <Col xs={3}>
            <Sidebar/>        
        </Col>
        <Col className="mt-md-5" xs={9}>
        <Card style={{marginTop:30,paddingBottom:10,alignItems:"center",justifyContent:"center"}} >
            <Card.Img variant="top" src="/Images/blood-Center.jpg" alt="Image" style={mystyle} className="d-inline-block align-top mx-2"/>
            <Card.Body>
              <Card.Title >Available Blood Stock</Card.Title>
            </Card.Body>
          </Card>
          <CardGroup>
            <Col className="mt-md-5 px-2" xs={12} md={4}>  
                <Card style={{marginTop:30,paddingBottom:10}}>
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <Card.Img variant="top" src={A_positive} style={{height:"8rem",width:"10rem"}}/>
                </div>
                    <Card.Body>
                        <Card.Title>Last blood updated on {"time_Changes"}</Card.Title>
                        <Button variant="primary" onClick={handleShow}>Details</Button>
                        <Button variant="danger">Update Details</Button>
                    </Card.Body>
                </Card>
            </Col>
            <Col className="mt-md-5 px-2" xs={12} md={4}>  
                <Card style={{marginTop:30,paddingBottom:10}}>
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <Card.Img variant="top" src={B_positive} style={{height:"8rem",width:"10rem"}}/>
                </div>
                    <Card.Body>
                    <Card.Title>Last blood changed on time={"date"}</Card.Title>
                    <Button variant="primary">Go to Details-2</Button>
                    <Button variant="danger">Update Details</Button>
                    </Card.Body>
                </Card>
            </Col>
            <Col className="mt-md-5" xs={12} md={4}>  
                <Card style={{marginTop:30,paddingBottom:10}}>
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <Card.Img variant="top" src={AB_positive} style={{height:"8rem",width:"10rem"}}/>
                </div>
                <Card.Body>
                    <Card.Title>Last blood changed on {"date"}</Card.Title>
                    <Button variant="primary">Go to Details-2</Button>
                    <Button variant="danger">Update Details</Button>
                    </Card.Body>
                </Card>
            </Col>
        </CardGroup>
        <CardGroup>
            <Col className="mt-md-5 px-2" xs={12} md={4}>  
                <Card style={{marginTop:30,paddingBottom:10}}>
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <Card.Img variant="top" src={AB_negative} style={{height:"8rem",width:"10rem"}}/>
                </div>
                    <Card.Body>
                        <Card.Title>Last blodd changed on time={"date"}</Card.Title>
                        <Button variant="primary" onClick={handleShow}>Details</Button>
                        <Button variant="danger">Update Details</Button>
                    </Card.Body>
                </Card>
            </Col>
            <Col className="mt-md-5 px-2" xs={12} md={4}>  
                <Card style={{marginTop:30,paddingBottom:10}}>
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <Card.Img variant="top" src={A_positive} style={{height:"8rem",width:"10rem"}}/>
                </div>
                    <Card.Body>
                    <Card.Title>Blood Group</Card.Title>
                    <Button variant="primary">Go to Details-2</Button>
                    <Button variant="danger">Update Details</Button>
                    </Card.Body>
                </Card>
            </Col>
            <Col className="mt-md-5 px-2" xs={12} md={4}>  
                <Card style={{marginTop:30,paddingBottom:10}}>
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <Card.Img variant="top" src={A_positive} style={{height:"8rem",width:"10rem"}}/>
                </div>
                    <Card.Body>
                    <Card.Title>Blood Stock-2</Card.Title>
                    <Button variant="primary">Go to Details-2</Button>
                    <Button variant="danger">Update Details</Button>
                    </Card.Body>
                </Card>
            </Col>
        </CardGroup>
        <CardGroup>
            <Col className="mt-md-5 px-2" xs={12} md={4}>  
                <Card style={{marginTop:30,paddingBottom:10}}>
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <Card.Img variant="top" src={A_positive} style={{height:"8rem",width:"10rem"}}/>
                </div>
                    <Card.Body>
                        <Card.Title>Blood Stock-1</Card.Title>
                        <Button variant="primary" onClick={handleShow}>Details</Button>
                        <Button variant="danger">Update Details</Button>
                    </Card.Body>
                </Card>
            </Col>
            <Col className="mt-md-5 px-2" xs={12} md={4}>  
                <Card style={{marginTop:30,paddingBottom:10}}>
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <Card.Img variant="top" src={A_positive} style={{height:"8rem",width:"10rem"}}/>
                </div>
                    <Card.Body>
                    <Card.Title>Blood Stock-2</Card.Title>
                    <Button variant="primary">Go to Details-2</Button>
                    <Button variant="danger">Update Details</Button>
                    </Card.Body>
                </Card>
            </Col>
            <Col className="mt-md-5 px-2" xs={12} md={4}>  
                <Card style={{marginTop:30,paddingBottom:10}}>
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <Card.Img variant="top" src={A_positive} style={{height:"8rem",width:"10rem"}}/>
                </div>
                    <Card.Body>
                    <Card.Title>Blood Stock-2</Card.Title>
                    <Button variant="primary">Go to Details-2</Button>
                    <Button variant="danger">Update Details</Button>
                    </Card.Body>
                </Card>
            </Col>
        </CardGroup>
        </Col>
      </Row>
    </Container>
    </>
  );
}
export default BloodStock;