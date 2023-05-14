import React,{useEffect,useState,useContext} from "react";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Sidebar from "../../Components_for_All_Panels/BloodCentre/SideNavbar";
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import CardGroup from 'react-bootstrap/CardGroup';
import Header from '../../Components_for_All_Panels/BloodCentre/Header';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCoffee } from '@fortawesome/free-solid-svg-icons'
import axios from 'axios';
import { Bar } from 'react-chartjs-2';
import { useHistory } from 'react-router-dom';
import {toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useAuth  }  from './Auth/AuthContext';
import jwt_decode from 'jwt-decode';


//import Link from 'react-router-dom/Link';


const MyAccountCenter=()=> {
  const { token } = useAuth();

  
  const authCentre=()=>{
    if(!token){
      window.location.href = "/Login";
    }
      console.log("authCentre");
  }

  //This will get the id  from the token if user is login
  const {id} = jwt_decode(token);

  const ViewAllRequests = () => {
    toast.success("You are redirected to View All Requests Page", {position: toast.POSITION.TOP_CENTER});
    window.location.href = '/bloodCenter/bloodRequests';
  }
  const ViewAllDonors = () => {
    window.location.href = '/bloodCenter/ViewAllDonors';
  }
  const viewAllAppointments = () => {
    window.location.href = '/bloodCenter/AppointmentDetails';
  }

  const fetchData = async (url) => {
    try {
      const response = await axios.get(url);
      return response.data.results.bindings;
    } catch (error) {
      console.log(error);
      return [];
    }
  };
  
    const [data, setData] = useState([]);
    const [donors, setDonors] = useState([]);
    const [requests,setRequests]=useState([]);
    const [appointment, setAppointment] = useState([]);
  
    useEffect(() => {
      const fetchDataForAll = async () => {
        const [dataRes, donorsRes,requests, appointmentRes] = await Promise.all([
          fetchData(`http://localhost:8081/api/users/bloodrequest/byUserID/${id}`),
          fetchData("http://localhost:8081/api/bloodCenter/RegisteredCenters/getDonorInfo"),
          fetchData(`http://localhost:8081/api/users/accepted/bloodRequests/${id}`),
          fetchData(`http://localhost:8081/api/users/appointment/byCentreID/${id}`),
        ]);
        setData(dataRes);
        setDonors(donorsRes);
        setRequests(requests);
        setAppointment(appointmentRes);
      };
      fetchDataForAll();
      authCentre();
      console.log("Decode Token",jwt_decode(token));
    }, []);
  
  const mystyle = {
      height: "7%",
      width: "7%",
      borderRadius: "50%",
      display: "inline-block",
    };
  return (
    <Container fluid style={{backgroundColor:"#E9EAE0"}}>
      <Header />
      <Row>
        <Col xs={3}>
            <Sidebar/>        
        </Col>
        <Col className="mt-md-5" xs={9}>
          <Card style={{marginTop:30,paddingBottom:5,alignItems:"center",justifyContent:"center",backgroundColor:"#970C10",color:"white"}} >
            <Card.Img variant="top" src="/Images/blood-Center.jpg" alt="Image" style={mystyle} className="d-inline-block align-top mx-2"/>
            <Card.Body>
              <Card.Title style={{justifyContent:"left",alignItems:"left"}}>Blood Donation Website: My Account</Card.Title>
            </Card.Body>
          </Card>
          <CardGroup style={{}}>
            <Col className="mt-md-5 px-2" md={10}>  
                <Card style={{marginTop:10,paddingBottom:10,borderColor:"#272C33",backgroundColor: "#f2f2f2",borderRadius:"4px solid"}}>
                    <Card.Body>
                        <Card.Title>My Blood Requests</Card.Title>
                        <div style={{ height: "25vh", overflow: "scroll", scrollbarWidth: 'thin', scrollbarColor: '#888 #f5f5f5' , padding: "10px"}}>
                        {data.map((item) => (
                          <div key={item.ID.value}>
                            <h5><span>Name:</span>{item.Name.value}</h5>
                            <h5><span>Email:</span>{item.Email.value}</h5>
                            <h5><span>Gender:</span>{item.Gender.value}</h5>
                            <h5><span>Blood Group:</span>{item.Blood_Group.value}</h5>
                            <h5><span>Contact:</span>{item.Contact.value}</h5>
                            <h6><span>Address:</span>{item.Location.value}</h6>
                            <hr /> {/* Add a line after each item */}
                          </div>
                        ))} 
                        </div>
                        <Button variant="primary" onClick={ViewAllRequests} style={{backgroundColor: "#153250",marginTop:"12px"}}><><i class="fa fa-check-circle" aria-hidden="true"></i>View all requests</></Button>
                    </Card.Body>
                </Card>
            </Col>
        </CardGroup>
        <CardGroup style={{}}>
            <Col className="mt-md-5 px-2" md={10}>  
                <Card style={{marginTop:10,paddingBottom:10,borderColor:"#272C33",backgroundColor: "#f2f2f2",borderRadius:"4px solid"}}>
                    <Card.Body>
                        <Card.Title>All Accepted Requests</Card.Title>
                        <div style={{ height: "25vh", overflow: "scroll", scrollbarWidth: 'thin', scrollbarColor: '#888 #f5f5f5' , padding: "10px"}}>
                        {requests.map((item) => (
                          <div key={item.ID.value}>
                            <h5><span>Name:</span>{item.Name.value}</h5>
                            <h5><span>Email:</span>{item.Email.value}</h5>
                            <h5><span>Gender:</span>{item.Gender.value}</h5>
                            <h5><span>Blood Group:</span>{item.Blood_Group.value}</h5>
                            <h5><span>Contact:</span>{item.Contact.value}</h5>
                            <h6><span>City:</span>{item.Location.value}</h6>
                            <h6><span>Blood Donated By:</span>{item.RequestDonatedBy.value}</h6>
                            
                            <hr /> {/* Add a line after each item */}
                          </div>
                        ))} 
                        </div>
                        <Button variant="primary" onClick={ViewAllRequests} style={{backgroundColor: "#153250",marginTop:"12px"}}><><i class="fa fa-check-circle" aria-hidden="true"></i>View all requests</></Button>
                    </Card.Body>
                </Card>
            </Col>
        </CardGroup>
        <CardGroup style={{}}>
            <Col className="mt-md-5 px-2" md={10}>  
                <Card style={{marginTop:10,paddingBottom:10,borderColor:"#272C33",backgroundColor: "#f2f2f2",borderRadius:"4px solid"}}>
                    <Card.Body>
                        <Card.Title>My Blood Donors</Card.Title>
                        <div style={{ height: "25vh", overflow: "scroll" }}>
                        {donors.map((donor) => (
                          <div key={donor.donations.value}>
                             <p>Name: {donor.Name.value}</p>
                             <p>Email: {donor.Email.value}</p>
                             <hr />
                          </div>                       
                        ))} 
                        </div>
                        <Button variant="primary" onClick={ViewAllDonors} style={{backgroundColor: "#153250",marginTop:"12px"}}><i class="fa fa-check-circle" aria-hidden="true"></i>View All Donors</Button>
                    </Card.Body>
                </Card>
            </Col>
            <Col className="mt-md-5 px-2" md={10}>  
            <Card style={{marginTop:10,paddingBottom:10}}>
              <div>
                <h2 style={{textAlign:"center", alignItems:"center",paddingBottom:"1.5rem"}}> Appointments booked in your Center!</h2>
                {appointment.map((item) => (
                  <div key={item.appointments.value} style={{fontSize:"14px"}}>
                    <h3>Name:{item.DonorName.value}</h3>
                    <h3>Email:{item.DonorEmail.value}</h3>
                    <h3>Timing:{item.Timings.value}</h3>
                    <h3>Blood Group:{item.BloodGroup.value}</h3>
                    <hr />
                  </div>
                ))}
                </div>
                <Card.Body className="d-flex justify-content-between">
                  <Card.Title>By appointment online, it is beneficial for staff and users! Donate Blood.</Card.Title>
                    <Button variant="danger" onClick={viewAllAppointments} style={{width:"50%"}}><i class="fa fa-check-circle" aria-hidden="true"></i> View All Appointment details!</Button>
                </Card.Body>
                  <p>By handling users through appointments you can gain best experience ever!</p>
            </Card>
            </Col>
        </CardGroup>        
        </Col>
      </Row>
    </Container>
  );
}

export default MyAccountCenter;