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
// import { useAuth  }  from './Auth/AuthContext';
// import jwt_decode from 'jwt-decode';


//import Link from 'react-router-dom/Link';
const data = {
  labels: ['O+', 'O-', 'A+', 'A-', 'B+', 'B-', 'AB+', 'AB-'],
  datasets: [
    {
      label: 'Number of Donors',
      data: [100, 50, 75, 40, 60, 30, 20, 10],
      backgroundColor: 'rgba(54, 162, 235, 0.2)',
      borderColor: 'rgba(54, 162, 235, 1)',
      borderWidth: 1,
    },
  ],
};


const options = {
  scales: {
    xAxes: [
      {
        ticks: {
          beginAtZero: true,
        },
      },
    ],
  },
};


const HomeScreen_BloodDonation=()=> {
  // const { token } = useAuth();

  // //Get the ID from the token
  // const {ID}= jwt_decode(token);

  const ViewAllRequests = () => {
    toast.success("You are redirected to View All Requests Page", {position: toast.POSITION.TOP_CENTER});
    window.location.href = '/bloodCenter/bloodRequests';
  }
  const RegisterNewUser = ()=> {
    window.location.href = '/bloodCenter/addNewUser';
  }
  const ViewAllDonors = () => {
    window.location.href = '/bloodCenter/ViewAllDonors';
  }
  const viewAllAppointments = () => {
    window.location.href = '/bloodCenter/AppointmentDetails';
  }

  const [data, setData] = useState([]);
  const [donors,setDonors]=useState([]);
  const [jobPosts,setJobPosts]=useState([]);
  const [news,setNews]=useState([]);
  const [FAQ,setFAQ]=useState([]);
  const [appointment,setAppointment]=useState([]);
  const [events,setEvents]=useState([]);
  useEffect(() => {
    const fetchData = async () => {
      const response1 = await axios.get("http://localhost:8081/api/users/bloodrequest")
      .then((response) => setData(response.data.results.bindings)).catch((error) => console.log(error));
      const response2 = await axios.get("http://localhost:8081/api/bloodCenter/RegisteredCenters/getDonorInfo")
      .then((response) => setDonors(response.data.results.bindings)).catch((error) => console.log(error));
      const response3 = await axios.get("http://localhost:8081/api/admin/getJobPost")
      .then((response) => setJobPosts(response.data.results.bindings)).catch((error) => toast.error(error, {position: toast.POSITION.TOP_CENTER}));
      const response4 = await axios.get("http://localhost:8081/api/admin/getNews")
      .then((response) => setNews(response.data.results.bindings)).catch((error) => console.log(error));
      const response5 = await axios.get("http://localhost:8081/api/admin/getFAQ")
      .then((response) => setFAQ(response.data.results.bindings)).catch((error) => toast.error(error));
      const response6 = await axios.get("http://localhost:8081/api/bloodCenter/RegisteredCenters/getAppointmentInfo")
      .then((response) => setAppointment(response.data.results.bindings)).catch((error) => console.log(error));
      const response7 = await axios.get("http://localhost:8081/api/admin/getEvents")
      .then((response) => setEvents(response.data.results.bindings)).catch((error) => console.log(error));

    };
    fetchData();
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
              <Card.Title style={{justifyContent:"left",alignItems:"left"}}>Blood Donation Website: Dashboard</Card.Title>
            </Card.Body>
          </Card>
          <CardGroup style={{}}>
            <Col className="mt-md-5 px-2" md={4}>  
                <Card style={{marginTop:10,paddingBottom:10}}>
                    <Card.Body>
                        <Card.Title>Recent Blood Requests</Card.Title>
                        <div style={{ height: "25vh", overflow: "scroll", scrollbarWidth: 'thin', scrollbarColor: '#888 #f5f5f5' ,backgroundColor: "#f2f2f2", padding: "10px"}}>
                        {data.map((item) => (
                          <div key={item.requests.value}>
                            <h5><span>Blood Group:</span>{item.Blood_Group.value}</h5>
                            <h6><span>Address:</span>{item.City.value}</h6>
                            <hr /> {/* Add a line after each item */}
                          </div>
                        ))} 
                        </div>
                        <Button variant="primary" onClick={ViewAllRequests} style={{backgroundColor: "#153250",marginTop:"12px"}}><>View all requests</></Button>
                    </Card.Body>
                </Card>
            </Col>
            <Col className="mt-md-5 px-2" md={8}>  
              <Card style={{marginTop:10,paddingBottom:10}}>
                <div style={{position: "relative"}}>
                  <img src="/Images/blood-Center.jpg" alt="Image for display" style={{width: "50%", height: "50%", objectFit: "cover"}}/>
                    <div style={{position: "absolute", bottom: 0, left: 0, right: 0, backgroundColor: "rgba(0,0,0,0.5)", padding: "10px"}}>
                      <Card.Title style={{color: "white"}}>Be a hero in your - It's in your blood</Card.Title>
                        <Button variant="primary" onClick={RegisterNewUser} style={{backgroundColor: "#153250"}}>Register New User</Button>
                    </div>
                </div>
                <div style={{display: "flex", flexDirection: "column", alignItems: "center", marginTop: "10px"}}>
                  <p>Register to be a blood donor, give blood and save blood!</p>
                </div>
              </Card>
            </Col>
        </CardGroup>
        <CardGroup style={{}}>
            <Col className="mt-md-5 px-2" md={4}>  
                <Card style={{marginTop:10,paddingBottom:10}}>
                    <Card.Body>
                        <Card.Title>Recent Blood Donors</Card.Title>
                        <div style={{ height: "25vh", overflow: "scroll" }}>
                        {donors.map((donor) => (
                          <div key={donor.donations.value}>
                             <p>Name: {donor.Name.value}</p>
                             <p>Email: {donor.Email.value}</p>
                             <hr />
                          </div>                       
                        ))} 
                        </div>
                        <Button variant="primary" onClick={ViewAllDonors} style={{backgroundColor: "#153250",marginTop:"12px"}}>View All Donors</Button>
                    </Card.Body>
                </Card>
            </Col>
            <Col className="mt-md-5 px-2" md={8}>  
            <Card style={{marginTop:10,paddingBottom:10}}>
              {/*
              <div>
                {appointment.map((item) => (
                  <div key={item.appointments.value}>
                    <h2>{item.Name.value}</h2>
                    <p>{item.Email.value}</p>
                    <hr />
                  </div>
                ))}
                </div>
             */ }
                <Card.Body className="d-flex justify-content-between">
                  <Card.Title>By appointment online, it is beneficial for staff and users! Donate Blood.</Card.Title>
                    <Button variant="danger" onClick={viewAllAppointments} style={{width:"50%"}}>View All Appointment details!</Button>
                </Card.Body>
                  <p>By handling users through appointments you can gain best experience ever!</p>
            </Card>
            </Col>
        </CardGroup>
          <Card border="danger" style={{marginTop:30,paddingBottom:10}}>
            <Card.Body>
              <Card.Title><i className="fa fa-flag" aria-hidden="true"></i>Important  FAQS</Card.Title>
              {FAQ.map((item) => (
                <div key={item.ID.value}>
                  <h4>Question:{item.Title.value}</h4>
                  <p>Answer:{item.Details.value}</p>
                  <hr style={{color:"red",width:"100%"}}/>
                </div>
              ))}
            </Card.Body>
          </Card>
          <Card border="light" style={{marginTop:30,paddingBottom:10}}>
            <Card.Body>
              <Card.Title><i className="fa fa-calendar" aria-hidden="true"></i>Upcoming Events</Card.Title>
              <div>
                {events.map((event) => (
                  <div key={event.ID.value}>
                    <h4>Event Title:{event.Title.value}</h4>
                    <p>Event Details:{event.Details.value}</p>
                    <h6> Event Date:{event.Date.value}</h6>
                    <hr style={{color:"red",width:"50%",fontSize:"40px",fontWeight:"bold"}}/> {/* Add a line after each item */}
                  </div>
                  ))}
              </div>
            </Card.Body>
          </Card>
          <Card border="light" style={{marginTop:30,paddingBottom:10}}>
            <Card.Body>
              <Card.Title><i className="fa fa-calendar" aria-hidden="true"></i>Job Posts</Card.Title>
              {jobPosts.map((jobPost) => (
                <div key={jobPost.ID.value}>
                  <h4>Job Title:{jobPost.Title.value}</h4>
                  <p>Job Details:{jobPost.Details.value}</p>
                  <h6> Job Posted Date:{jobPost.Date.value}</h6>
                  <hr style={{color:"red",width:"50%",fontSize:"40px",fontWeight:"bold"}}/> {/* Add a line after each item */}
                </div>
              ))}
            </Card.Body>
          </Card>
          <Card border="light" style={{marginTop:30,paddingBottom:10}}>
            <Card.Body>
              <Card.Title><i className="fa fa-calendar" aria-hidden="true"></i>Important News </Card.Title>
              {news.map((jobPost) => (
                <div key={jobPost.ID.value}>
                  <h4>Job Title:{jobPost.Title.value}</h4>
                  <p>Job Details:{jobPost.Details.value}</p>
                  <h6>Job Posted Date:{jobPost.Date.value}</h6>
                  <hr style={{color:"red",width:"50%",fontSize:"40px",fontWeight:"bold"}}/> {/* Add a line after each item */}
                </div>
              ))}
            </Card.Body>
          </Card>
            <Card border="info" style={{marginTop:30,paddingBottom:10}}>
              <Card.Body>
                <Card.Title><i className="fa fa-folder" aria-hidden="true"></i>Blood Stock Overview/Available Blood Stock</Card.Title>
                <p>
                
                </p>
              </Card.Body>
            </Card>            
        </Col>
      </Row>
    </Container>
  );
}

export default HomeScreen_BloodDonation;