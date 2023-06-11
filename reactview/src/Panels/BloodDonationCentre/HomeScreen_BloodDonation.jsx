import React,{useEffect,useState,useContext} from "react";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import {Nav} from 'react-bootstrap';
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
import './Styling/popupcard.css'; 
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { PostcardFill } from "react-bootstrap-icons";

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
        setTimeout(() => {
          setIsLoading(false);
        }, 3000);
      };
      console.log("Blood Request Data:",data)
      console.log("Donors Data:",donors)
      console.log("Job Posts Data:",jobPosts)
      console.log("News Data:",news)
      console.log("FAQ Data:",FAQ)
      console.log("Appointment Data:",appointment)
      fetchDataForAll();
      authCentre();
      toast.info("You have successfully authenticated",{position:toast.POSITION.TOP_CENTER})
    }, []);
  

  

  const mystyle = {
      height: "15%",
      width: "15%",
      justifyContent: "center",
      alignItems: "center",
      textAlign: "center",
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
        <Col xs={2}>
            <Sidebar/>        
        </Col>
        <Col className="mt-md-5" xs={10}>
          <Card style={{marginTop:30,paddingBottom:5,alignItems:"center",marginLeft:"24px",justifyContent:"center",backgroundColor:"#970C10",color:"white"}} className="shadow-lg p-3 mb-5 rounded">
          
            <Card.Img
              variant="top"
              id="Circularimg"
              src="/Images/blood-Center.jpg"
              alt="Image"
              style={mystyle}
              className="d-inline-block align-top mx-2"
            />
            <Card.Body>
              <Card.Title style={{justifyContent:"left",alignItems:"left"}}>Blood Donation Center: Dashboard</Card.Title>
            </Card.Body>
          </Card>
          <CardGroup style={{}}>
            <Col className="mt-md-2 px-2" md={4}>  
                <Card style={{marginTop:10,paddingBottom:10,height:"66vh",borderColor:"#272C33",marginLeft:"24px",backgroundColor: "#f2f2f2",borderRadius:"4px solid"}} className="shadow p-3 mb-5 bg-body rounded">
                    <Card.Body>
                        <Card.Title style={{justifyContent:"center",textAlign:"center",border:"1px underlined"}}><span style={{backgroundColor:"#153250",padding:"8px",borderRadius:"8px",color:"#f2f2f2"}} >Recent Blood Requests</span></Card.Title>
                        <hr style={{color:"red",width:"100%",justifyContent:"center",alignItems:"center",textAlign:"center"}} />
                        <div style={{ height: "40vh",width:"110%", overflow: "scroll", scrollbarWidth: 'thin', scrollbarColor: '#888 #f5f5f5' , padding: "10px"}}>
                        {data?.length === 0 && <p>No Blood Requests</p>
                      }
                        {data?.map((item) => (
                          <div key={item.requests.value} >
                            <h5><strong>Blood Group:</strong>{item.Blood_Group.value}</h5>
                            <h6><span>Address:</span>{item.City.value}</h6>
                            <h6><span>Gender:</span>{item.Gender.value}</h6>
                            <h6><span>Location:</span>{item.Location.value}</h6>
                            <hr /> {/* Add a line after each item */}
                          </div>
                        ))}

                        </div>
                        <Button variant="primary" onClick={ViewAllRequests} style={{backgroundColor: "#153250",marginTop:"12px"}}><><i class="fa fa-check-circle" aria-hidden="true"></i>View all requests</></Button>
                    </Card.Body>
                </Card>
            </Col>
            <Col className="mt-md-2 px-2" md={8}>  
              <Card style={{marginTop:10,borderRadius:"24px"}}>
                <div style={{position: "relative"}}>
                  <img src="/Images/Banner-bloodCentre-2.jpg" alt="Banner Image" style={{width: "100%", height: "50%", objectFit: "cover",borderRadius:"24px"}}/>
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
            <Col className="mt-md-2 px-2" md={4}>  
                <Card style={{marginTop:10,paddingBottom:10,marginLeft:"24px",borderColor:"#272C33",backgroundColor: "#f2f2f2",borderRadius:"4px solid"}} className="shadow p-3 mb-5 bg-body rounded">
                    <Card.Body>
                        <Card.Title style={{justifyContent:"center",textAlign:"center"}}> <span style={{backgroundColor:"#153250",padding:"8px",borderRadius:"8px",color:"#f2f2f2"}} >Recent Blood Donors</span></Card.Title>
                        <hr style={{color:"red",width:"100%",justifyContent:"center",alignItems:"center",textAlign:"center"}} />
                        <div style={{ height: "25vh",width:"110%", overflow: "scroll" }}>
                        {
                          donors?.length === 0 && <p style={{textAlign:"center",justifyContent:"center"}}>No Donors to Display</p>
                        }
                        {donors.map((donor) => (
                          <div key={donor.donations.value}>
                            <h6><strong>Blood Group: {donor.Blood_Group.value}</strong></h6>
                            <h6>Name: {donor.Name.value}</h6>
                            <h6>Email: {donor.Email.value}</h6>
                            <h6>Contact: {donor.Contact.value}</h6>
                            <h6>Gender: {donor.Gender.value}</h6>
                             <hr />
                          </div>                       
                        ))} 
                        </div>
                        <Button variant="primary" onClick={ViewAllDonors} style={{backgroundColor: "#153250",marginTop:"12px"}}><i class="fa fa-check-circle" aria-hidden="true"></i>View All Donors</Button>
                    </Card.Body>
                </Card>
            </Col>
            <Col className="mt-md-2 px-2" md={8}>  
            <Card style={{marginTop:10,paddingBottom:10}}>
              <Card.Header style={{textAlign:"center",justifyContent:"center",fontSize:"24px"}}>
              <span style={{backgroundColor:"#153250",padding:"8px",borderRadius:"8px",color:"#f2f2f2"}} >
                Booked Appointments!
              </span>
              </Card.Header>
                {
                  appointment?.length === 0 && <p style={{justifyContent:"center",textAlign:"center",color:"red", paddingBottom:"14px", fontSize:"20px"
                }}>No Appointments to Display</p>
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
                <Card.Body>
                  <Card.Title >By appointment online, it is beneficial for staff and users! Donate Blood.</Card.Title>
                    <Button variant="danger" className="justify-content-center text-center mb-0" onClick={viewAllAppointments} style={{width:"50%",justifyContent:"center",textAlign:"center",alignItems:"center"}}><i class="fa fa-check-circle" aria-hidden="true"></i> View All Appointments!</Button>
                </Card.Body>
            </Card>
            </Col>
        </CardGroup>
        <CardGroup style={{marginLeft:"25px"}}>
            <Col className="mt-md-2 px-2" md={4}>
            <div className='BarBox' style={{borderBottom:'',width:'100%',borderRadius:'10px'}}>
                
                <Row style={{justifyContent:"center",textAlign:"center"}}>
                <div style={{fontSize:'17px',marginTop:'3%',marginBottom:'-6%',color:'#fff1e1'}}>
                    <Nav.Link href='/bloodCenter/bloodRequests'><p>Total Blood Requests</p></Nav.Link>
                </div>
                    <Col sm={8}>
                    <div style={{marginTop:'5%',textAlign:'left',marginLeft:'25%'}}>
                        
                        <div style={{ width: 55, height: 55,marginLeft:'0%'}}>
                        <CircularProgressbar value={data?.length} text={data?.length + "%"}
                            styles={buildStyles({
                            // Rotation of path and trail, in number of turns (0-1)
                            // rotation: 0.25,
                        
                            // Whether to use rounded or flat corners on the ends - can use 'butt' or 'round'
                            strokeLinecap: 'round',
                        
                            // Text size
                            textSize: '35px',
                        
                            // How long animation takes to go from one percentage to another, in seconds
                            pathTransitionDuration: 3,
                        
                            // Can specify path transition in more detail, or remove it entirely
                            pathTransition: '',
                        
                            // Colors
                            pathColor: 'white',
                            textColor: 'white',
                            trailColor: '#D64045',
                            backgroundColor: '#D64045',
                            })}
                        />
                        
                        </div>
                        <div style={{fontSize:'14px',marginTop:'1%',color:'#fff1e1',fontFamily:'cursive'}}>
                            <Nav.Link href='/bloodCenter/bloodRequests'><p>Blood Requests</p></Nav.Link>
                        </div>
                    </div>
                    </Col>

                </Row>
                
            </div>
            </Col>
            <Col className="mt-md-2 px-2" md={4} style={{justifyContent:"center",alignItems:"center"}}>
              <div className='BarBox' style={{borderBottom:'',width:'100%',borderRadius:'10px'}}>
                
                <Row style={{justifyContent:"center",textAlign:"center"}}>
                <div style={{fontSize:'17px',marginTop:'3%',marginBottom:'-6%',color:'#fff1e1',justifyContent:"center"}}>
                    <Nav.Link href='/bloodCenter/AppointmentDetails'><p>Appointments</p></Nav.Link>
                </div>
                    <Col sm={4}>
                    <div style={{marginTop:'5%',textAlign:'left',marginLeft:'25%'}}>
                        
                        <div style={{ width: 55, height: 55,marginLeft:'0%'}}>
                        <CircularProgressbar value={appointment?.length} text={appointment?.length + "%"}
                            styles={buildStyles({
                            // Rotation of path and trail, in number of turns (0-1)
                            // rotation: 0.25,
                        
                            // Whether to use rounded or flat corners on the ends - can use 'butt' or 'round'
                            strokeLinecap: 'round',
                        
                            // Text size
                            textSize: '35px',
                        
                            // How long animation takes to go from one percentage to another, in seconds
                            pathTransitionDuration: 3,
                        
                            // Can specify path transition in more detail, or remove it entirely
                            pathTransition: '',
                        
                            // Colors
                            pathColor: 'white',
                            textColor: 'white',
                            trailColor: '#D64045',
                            backgroundColor: '#D64045',
                            })}
                        />
                        
                        </div>
                        <div style={{fontSize:'18px',marginTop:'1%',color:'#fff1e1',fontFamily:'cursive'}}>
                            <Nav.Link href='/bloodCenter/AppointmentDetails'><p>Appointments</p></Nav.Link>
                        </div>
                    </div>
                    </Col>

                </Row>
                
            </div>
            </Col>
            <Col className="mt-md-2 px-2" md={4}>
            <div className='BarBox' style={{borderBottom:'',width:'100%',borderRadius:'10px'}}>
                
                <Row style={{justifyContent:"center",textAlign:"center"}}>
                <div style={{fontSize:'17px',marginTop:'3%',marginBottom:'-6%',color:'#fff1e1'}}>
                    <Nav.Link href='/bloodCenter/ViewAllDonors'><p>Total Donors</p></Nav.Link>
                </div>
                    <Col sm={4}>
                    <div style={{marginTop:'5%',textAlign:'left',marginLeft:'25%'}}>
                        
                        <div style={{ width: 55, height: 55,marginLeft:'0%'}}>
                        <CircularProgressbar value={donors?.length} text={donors?.length + "%"}
                            styles={buildStyles({
                            // Rotation of path and trail, in number of turns (0-1)
                            // rotation: 0.25,
                        
                            // Whether to use rounded or flat corners on the ends - can use 'butt' or 'round'
                            strokeLinecap: 'round',
                        
                            // Text size
                            textSize: '35px',
                        
                            // How long animation takes to go from one percentage to another, in seconds
                            pathTransitionDuration: 3,
                        
                            // Can specify path transition in more detail, or remove it entirely
                            pathTransition: '',
                        
                            // Colors
                            pathColor: 'white',
                            textColor: 'white',
                            trailColor: '#D64045',
                            backgroundColor: '#D64045',
                            })}
                        />
                        
                        </div>
                        <div style={{fontSize:'18px',marginTop:'1%',color:'#fff1e1',fontFamily:'cursive'}}>
                            <Nav.Link href='/bloodCenter/ViewAllDonors'><p>Donors</p></Nav.Link>
                        </div>
                    </div>
                    </Col>

                </Row>
                
            </div>
            </Col>
        </CardGroup>
          <Card id="card" style={{marginTop:30,paddingBottom:10,marginLeft:"24px"}} className="shadow-sm p-3 mb-5 bg-body rounded border border-primary">
            <Card.Body>
              <Card.Header style={{justifyContent:"center",textAlign:"center",fontSize:"22px",fontStyle:"bold"}}><span style={{backgroundColor:"#153250",padding:"8px",borderRadius:"18px",color:"#f2f2f2"}} ><i class="fa fa-question-circle" aria-hidden="true"></i>Important  FAQS</span></Card.Header>
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
          <Card id="card" style={{marginTop:30,paddingBottom:10,marginLeft:"24px"}} className="shadow-sm p-3 mb-5 bg-body rounded border border-primary">
            <Card.Body>
          <Card.Header style={{textAlign:"center",justifyContent:"center",fontSize:"22px",fontStyle:"bold"}}><span style={{backgroundColor:"#153250",padding:"8px",borderRadius:"18px",color:"#f2f2f2"}} ><i className="fa fa-calendar" aria-hidden="true"></i>Upcoming Events</span></Card.Header>
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
          <Card id="card" style={{marginTop:30,paddingBottom:10,marginLeft:"24px"}} className="shadow-sm p-3 mb-5 bg-body rounded border border-primary">
            <Card.Body>
              <Card.Header style={{textAlign:"center",justifyContent:"center",fontSize:"22px",fontStyle:"bold"}}><span style={{backgroundColor:"#153250",padding:"8px",borderRadius:"18px",color:"#f2f2f2"}} ><i class="fa fa-briefcase" aria-hidden="true"></i>Job Posts</span></Card.Header>
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
          <Card id="card" style={{marginTop:30,marginLeft:"24px"}} className="shadow-sm p-3 bg-body rounded border border-primary">
            <Card.Body>
              <Card.Header style={{textAlign:"center",justifyContent:"center",fontSize:"22px",fontStyle:"bold"}}><span style={{backgroundColor:"#153250",padding:"8px",borderRadius:"18px",color:"#f2f2f2"}} ><i class="fa fa-folder" aria-hidden="true"></i>Important News </span></Card.Header>
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