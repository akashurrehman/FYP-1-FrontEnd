import React from "react";
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row'
import { useNavigate } from 'react-router-dom';
import Sidebar from "../../Components_for_All_Panels/BloodCentre/SideNavbar";
import Card from 'react-bootstrap/Card';
import Paper from '@material-ui/core/Paper';
import axios from 'axios';
import { BsStopwatch } from 'react-icons/bs';
import { BsFillTelephoneFill } from 'react-icons/bs';
import { BsExclamationSquare } from 'react-icons/bs';
import { BsEnvelopeFill } from 'react-icons/bs';
import { BsGeoAltFill } from 'react-icons/bs';





const ProfileSettings=()=> {
  const[data,setData]=React.useState([]);
  const[phoneNumber,setphoneNumber]=React.useState([]);
  const[licenseNumber,setLicenseNumber]=React.useState([]);
  let navigate=useNavigate();

  React.useEffect(()=>{
    axios.get('http://localhost:3001/bloodcentre/profilesettings').then((response)=>{
      setData(response.data);
      setphoneNumber(response.data.number)
      console.log(response.data);
  });
},[data]);

  const mystyle = {
      height: "7%",
      width: "7%",
      borderRadius: "50px",
      display: "inline-block",
};

  return (
    <Container fluid>
      <Row>
        <Col xs={3}>
            <Sidebar/>        
        </Col>
        <Col className="mt-md-5" xs={9}>
            <Card style={{marginTop:30,paddingBottom:10,alignItems:"center",justifyContent:"center"}} >
            <Card.Img variant="top" src="/Images/blood-Center.jpg" alt="Image" style={mystyle} className="d-inline-block align-top mx-2"/>
            <Card.Body>
              <Card.Title >Name of blood Donation Center</Card.Title>
            </Card.Body>
          </Card>
        <Paper variant="outlined" square />
        <Form className="mt-5">
        <Row className="mb-3">
          <Form.Group as={Col} controlId="formGridEmail">
            <Form.Label>Center Number</Form.Label>
            <Form.Control placeholder="Enter Center Number" value={phoneNumber} onChange={(e)=>{setphoneNumber(e.target.value)}}/>
          </Form.Group>
          <Form.Group as={Col} controlId="formGridPassword">
            <Form.Label>License Number</Form.Label>
            <Form.Control type="License" placeholder="License Number" value={licenseNumber} disabled={true}/>
          </Form.Group>
        </Row>

        <Form.Group className="mb-3" controlId="formGridAddress1">
          <Form.Label>Location/Address</Form.Label>
          <BsGeoAltFill size={15}/>
          <Form.Control placeholder="Main Ferozpur Road" />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formGridAddress2">
          <Form.Label>City</Form.Label>
          <Form.Control placeholder="Lahore, Punjab, Pakistan" />
      </Form.Group>
      <Form.Group className="mb-3" controlId="contact1">
          <Form.Label>Contact Number</Form.Label>
          <BsFillTelephoneFill size={15} color="red"/>
          <Form.Control placeholder="+9234946123" />
        </Form.Group>

        <Form.Group className="mb-3" controlId="email">
          <Form.Label>Email</Form.Label>

          <BsEnvelopeFill size={15} color="red"/>
          <Form.Control placeholder="Lahore, Punjab, Pakistan" />
      </Form.Group>

      <Row className="mb-3">
        <Form.Group as={Col} controlId="formGridCity">
          <Form.Label>Timings</Form.Label>
          <BsStopwatch size={15} color="red"/>
            <Form.Select defaultValue="Select Timings...">
            <option>Option-1</option>
            <option>Option-2</option>
          </Form.Select>
        </Form.Group>

        <Form.Group as={Col} controlId="formGridState">
          <Form.Label>State</Form.Label>
          <Form.Select defaultValue="Select Category...">
            <option>Option1</option>
            <option>Option2</option>
          </Form.Select>
        </Form.Group>

        <Form.Group as={Col} controlId="formGridZip">
          <Form.Label>Status</Form.Label>
          <BsExclamationSquare size={15} color="red"/>
          <Form.Control placeholder="Status"/>
        </Form.Group>
      </Row>
      <Row className="mb-3">
        <Form.Group as={Col} id="formGridCheckbox">
          <Form.Check type="checkbox" label="Agree?" />
        </Form.Group>

        <Button as={Col} variant="primary" size="sm" type="submit" onClick={(e)=>{axios.put('',{
          number:phoneNumber
          }).then(function(response){

          }).catch(function(err){
              console.log(err);
          });
        }}
        >
          Submit Information
        </Button>
      </Row>
    </Form>
          {/* {<Card style={{marginTop:30,paddingBottom:10}}>
            <Card.Body>
              <Card.Title>Important  Notifications</Card.Title>
              <p>

              </p>
            </Card.Body>
          </Card>
          <Card style={{marginTop:30,paddingBottom:10}}>
            <Card.Body>
              <Card.Title>Upcoming Events</Card.Title>
              <p>
                
              </p>
            </Card.Body>
          </Card>
            <Card style={{marginTop:30,paddingBottom:10}}>
              <Card.Body>
                <Card.Title>Blood Stock Overview</Card.Title>
                <p>
                
                </p>
              </Card.Body>
            </Card>} */}
        </Col>
      </Row>
    </Container>
  );
}

export default ProfileSettings;