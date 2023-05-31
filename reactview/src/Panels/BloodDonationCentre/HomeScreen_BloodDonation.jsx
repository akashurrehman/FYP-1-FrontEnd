import React,{useEffect,useState,useContext} from "react";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Sidebar from "../../Components_for_All_Panels/BloodCentre/SideNavbar";
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import CardGroup from 'react-bootstrap/CardGroup';
import Header from '../../Components_for_All_Panels/BloodCentre/Header';
import {toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useAuth  }  from './Auth/AuthContext';
import jwtDecode from "jwt-decode";
import LoadingSpinner from "../../Components_for_All_Panels/BloodCentre/LoadingSpinner";
import axios from 'axios';

//import Link from 'react-router-dom/Link';


const HomeScreen_BloodDonation=()=> {
  const [isLoading, setIsLoading] = useState(true);
  const {token} = useAuth();
  //This will get the id  from the token if user is login
  const decodedToken = token ? jwtDecode(token) : null;
  const role = decodedToken?.role;
  const id= decodedToken?.id;
  const authCentre=()=>{
    if(role!='CENTRE'){
      window.location.href = "/user/login";
    }
      console.log("authCentre");
  }

  

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
    const [jobPosts, setJobPosts] = useState([]);
    const [news, setNews] = useState([]);
    const [FAQ, setFAQ] = useState([]);
    const [appointment, setAppointment] = useState([]);
    const [events, setEvents] = useState([]);
  
    useEffect(() => {
      const fetchDataForAll = async () => {
        const [dataRes, donorsRes, jobPostsRes, newsRes, FAQRes, appointmentRes, eventsRes] = await Promise.all([
          fetchData("http://localhost:8081/api/users/bloodrequest"),
          fetchData("http://localhost:8081/api/bloodCenter/RegisteredCenters/getDonorInfo"),
          fetchData("http://localhost:8081/api/admin/getJobPost"),
          fetchData("http://localhost:8081/api/admin/getNews"),
          fetchData("http://localhost:8081/api/admin/getFAQ"),
          fetchData(`http://localhost:8081/api/users/appointment/byCentreID/${id}`),
          fetchData("http://localhost:8081/api/admin/getEvents"),
        ]);
        setData(dataRes);
        setDonors(donorsRes);
        setJobPosts(jobPostsRes);
        setNews(newsRes);
        setFAQ(FAQRes);
        setAppointment(appointmentRes);
        setEvents(eventsRes);
        setIsLoading(false);
      };
      fetchDataForAll();
      authCentre();
      toast.info("You have successfully authenticated",{position:toast.POSITION.TOP_CENTER})
    }, []);
  

  

  const mystyle = {
      height: "7%",
      width: "7%",
      borderRadius: "50%",
      display: "inline-block",
    };
  return (
  <div>
    {isLoading ? (
        <LoadingSpinner />
      ) : (
    <Container fluid style={{backgroundColor:"#E9EAE0"}}>
      <Header />
      <Row>
        <Col xs={3}>
            <Sidebar/>        
        </Col>
        <Col className="mt-md-5" xs={9}>
          <Card style={{marginTop:30,paddingBottom:5,alignItems:"center",justifyContent:"center",backgroundColor:"#970C10",color:"white"}} className="shadow-lg p-3 mb-5 rounded">
            <Card.Img variant="top" src="/Images/blood-Center.jpg" alt="Image" style={mystyle} className="d-inline-block align-top mx-2"/>
            <Card.Body>
              <Card.Title style={{justifyContent:"left",alignItems:"left"}}>Blood Donation Website: Dashboard</Card.Title>
            </Card.Body>
          </Card>
          <CardGroup style={{}}>
            <Col className="mt-md-5 px-2" md={4}>  
                <Card style={{marginTop:10,paddingBottom:10,borderColor:"#272C33",backgroundColor: "#f2f2f2",borderRadius:"4px solid"}} className="shadow p-3 mb-5 bg-body rounded">
                    <Card.Body>
                        <Card.Title style={{justifyContent:"center",textAlign:"center",border:"1px underlined"}}>Recent Blood Requests</Card.Title>
                        <hr style={{color:"red",width:"100%",justifyContent:"center",alignItems:"center",textAlign:"center"}} />
                        <div style={{ height: "25vh", overflow: "scroll", scrollbarWidth: 'thin', scrollbarColor: '#888 #f5f5f5' , padding: "10px"}}>
                        {data?.length === 0 && <p>No Blood Requests</p>
                      }
                        {data?.map((item) => (
                          <div key={item.requests.value}>
                            <h5><span>Blood Group:</span>{item.Blood_Group.value}</h5>
                            <h6><span>Address:</span>{item.City.value}</h6>
                            <hr /> {/* Add a line after each item */}
                          </div>
                        ))}

                        </div>
                        <Button variant="primary" onClick={ViewAllRequests} style={{backgroundColor: "#153250",marginTop:"12px"}}><><i class="fa fa-check-circle" aria-hidden="true"></i>View all requests</></Button>
                    </Card.Body>
                </Card>
            </Col>
            <Col className="mt-md-5 px-2" md={8}>  
              <Card style={{marginTop:10}}>
                <div style={{position: "relative"}}>
                  <img src="/Images/Banner-bloodCentre-2.jpg" alt="Banner Image" style={{width: "100%", height: "50%", objectFit: "cover"}}/>
                    <div style={{position: "absolute", bottom: 0, left: 0, right: 0, backgroundColor: "rgba(0,0,0,0.5)", padding: "10px"}}>
                      <Card.Title style={{color: "white",justifyContent:"center",textAlign:"center"}}>Be a hero in your - It's in your blood</Card.Title>
                        <div style={{justifyContent:"center", alignItems:"center", textAlign:"center"}}>
                          <Button variant="primary" onClick={RegisterNewUser} style={{backgroundColor: "#153250"}}> <i class="fa fa-plus-square" aria-hidden="true"></i> Register New User</Button>
                        </div>
                    </div>
                </div>
              </Card>
            </Col>
        </CardGroup>
        <CardGroup style={{}}>
            <Col className="mt-md-5 px-2" md={4}>  
                <Card style={{marginTop:10,paddingBottom:10,borderColor:"#272C33",backgroundColor: "#f2f2f2",borderRadius:"4px solid"}} className="shadow p-3 mb-5 bg-body rounded">
                    <Card.Body>
                        <Card.Title style={{justifyContent:"center",textAlign:"center"}}>Recent Blood Donors</Card.Title>
                        <hr style={{color:"red",width:"100%",justifyContent:"center",alignItems:"center",textAlign:"center"}} />
                        <div style={{ height: "25vh", overflow: "scroll" }}>
                        {
                          donors?.length === 0 && <p>No Donors to Display</p>
                        }
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
            <Col className="mt-md-5 px-2" md={8}>  
            <Card style={{marginTop:10,paddingBottom:10}}>
              <Card.Header style={{textAlign:"center",justifyContent:"center",fontSize:"24px"}}>
                Booked Appointments!
              </Card.Header>
                {
                  appointment?.length === 0 && <p>No Appointments to Display</p>
                }
              <div>
                {appointment.map((item) => (
                   <div key={item.appointments.value} style={{fontSize:"14px",marginLeft:"16px"}}>
                   <h6>Name:{item.DonorName.value}</h6>
                   <h6>Email:{item.DonorEmail.value}</h6>
                   <h6>Timing:{item.Timings.value}</h6>
                   <h5>Blood Group:{item.BloodGroup.value}</h5>
                   <hr />
                 </div>
                ))}
                </div>

                <Card.Body className="d-flex justify-content-between">
                  <Card.Title >By appointment online, it is beneficial for staff and users! Donate Blood.</Card.Title>
                    <Button variant="danger" onClick={viewAllAppointments} style={{width:"50%"}}><i class="fa fa-check-circle" aria-hidden="true"></i> View All Appointment details!</Button>
                </Card.Body>
                  <p style={{fontSize:"14px",marginLeft:"16px"}}>By handling users through appointments you can gain best experience ever!</p>
            </Card>
            </Col>
        </CardGroup>
          <Card style={{marginTop:30,paddingBottom:10}} className="shadow-sm p-3 mb-5 bg-body rounded border border-primary">
            <Card.Body>
              <Card.Header style={{justifyContent:"center",textAlign:"center",fontSize:"22px",fontStyle:"bold"}}><i class="fa fa-question-circle" aria-hidden="true"></i>Important  FAQS</Card.Header>
              {FAQ.length === 0 && <p>No FAQS to Display</p>}
              {FAQ.map((item) => (
                <div key={item.ID.value}>
                  <h4>Question:{item.Title.value}</h4>
                  <p>Answer:{item.Details.value}</p>
                  <hr style={{color:"red",width:"100%"}}/>
                </div>
              ))}
            </Card.Body>
          </Card>
          <Card style={{marginTop:30,paddingBottom:10}} className="shadow-sm p-3 mb-5 bg-body rounded border border-primary">
            <Card.Body>
          <Card.Header style={{textAlign:"center",justifyContent:"center",fontSize:"22px",fontStyle:"bold"}}><i className="fa fa-calendar" aria-hidden="true"></i>Upcoming Events</Card.Header>
              <div>
                {events.length === 0 && <p>No Events to Display</p>}
                {events.map((event) => (
                  <div key={event.ID.value}>
                    <h4>Event Title:{event.Name.value}</h4>
                    <p>Event Details:{event.Message.value}</p>
                    <h6>Location:{event.Location.value}</h6>
                    <h6> Event Date:{event.Date.value}</h6>
                    <hr style={{color:"red",width:"100%",fontSize:"40px",fontWeight:"bold"}}/> {/* Add a line after each item */}
                  </div>
                  ))}
              </div>
            </Card.Body>
          </Card>
          <Card style={{marginTop:30,paddingBottom:10}} className="shadow-sm p-3 mb-5 bg-body rounded border border-primary">
            <Card.Body>
              <Card.Header style={{textAlign:"center",justifyContent:"center",fontSize:"22px",fontStyle:"bold"}}><i class="fa fa-briefcase" aria-hidden="true"></i>Job Posts</Card.Header>
              {
                jobPosts.length === 0 && <p>No Job Posts to Display</p>
              }
              {jobPosts.map((jobPost) => (
                <div key={jobPost.ID.value}>
                  <h4>Job Title:{jobPost.Title.value}</h4>
                  <p>Job Details:{jobPost.Details.value}</p>
                  <h6> Job Posted Date:{jobPost.Date.value}</h6>
                  <hr style={{color:"red",width:"100%",fontSize:"40px",fontWeight:"bold"}}/> {/* Add a line after each item */}
                </div>
              ))}
            </Card.Body>
          </Card>
          <Card style={{marginTop:30}} className="shadow-sm p-3 mb-5 bg-body rounded border border-primary">
            <Card.Body>
              <Card.Header style={{textAlign:"center",justifyContent:"center",fontSize:"22px",fontStyle:"bold"}}><i class="fa fa-folder" aria-hidden="true"></i>Important News </Card.Header>
              {
                news.length === 0 && <p>No News to Display</p>
              }
              {news.map((jobPost) => (
                <div key={jobPost.ID.value}>
                  <h4>Job Title:{jobPost.Title.value}</h4>
                  <p>Job Details:{jobPost.Details.value}</p>
                  <h6>Job Posted Date:{jobPost.Date.value}</h6>
                  <hr style={{color:"red",width:"100%",fontSize:"40px",fontWeight:"bold"}}/> {/* Add a line after each item */}
                </div>
              ))}
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
    )}
  </div>
  );
}

export default HomeScreen_BloodDonation;