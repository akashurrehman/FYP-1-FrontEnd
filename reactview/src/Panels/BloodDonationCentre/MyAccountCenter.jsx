import React,{useEffect,useState,useContext} from "react";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Sidebar from "../../Components_for_All_Panels/BloodCentre/SideNavbar";
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import CardGroup from 'react-bootstrap/CardGroup';
import Header from '../../Components_for_All_Panels/BloodCentre/Header';
import axios from 'axios';
import {toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useAuth  }  from './Auth/AuthContext';
import jwt_decode from 'jwt-decode';
import jwtDecode from "jwt-decode";
import LoadingSpinner from "../../Components_for_All_Panels/BloodCentre/LoadingSpinner";
import './Styling/popupcard.css'; 

const MyAccountCenter=()=> {
  const [Loading, setIsLoading]=useState(true);
  const {token} = useAuth();
  const decodedToken = token ? jwtDecode(token) : null;
  const id = decodedToken?.id;
  const role = decodedToken?.role;
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
    const [centerData,setCenterData]=useState([]);
  
    useEffect(() => {
      const fetchDataForAll = async () => {
        const [dataRes, donorsRes,requests, appointmentRes,centerRes] = await Promise.all([
          fetchData(`http://localhost:8081/api/users/bloodrequest/byUserID/${id}`),
          fetchData("http://localhost:8081/api/bloodCenter/RegisteredCenters/getDonorInfo"),
          fetchData(`http://localhost:8081/api/users/accepted/bloodRequests/${id}`),
          fetchData(`http://localhost:8081/api/users/appointment/byCentreID/${id}`),
          fetchData(`http://localhost:8081/api/bloodCenter/RegisteredCenters/${id}`),
        ]);
        setData(dataRes);
        setDonors(donorsRes);
        setRequests(requests);
        setAppointment(appointmentRes);
        setCenterData(centerRes);
      };
      fetchDataForAll();
      authCentre();
      setIsLoading(false);
      console.log("Decode Token",jwt_decode(token));
      
    }, []);
  
  const mystyle = {
      height: "7%",
      width: "7%",
      borderRadius: "50%",
      display: "inline-block",
    };
  return (
  Loading ? <LoadingSpinner/> :
    <Container fluid style={{backgroundColor:"#E9EAE0"}}>
      <Header />
      <Row>
        <Col xs={3}>
            <Sidebar/>        
        </Col>
        <Col className="mt-md-5" xs={9}>
          <Card style={{marginTop:30,paddingBottom:5,alignItems:"center",justifyContent:"center",backgroundColor:"#970C10",color:"white"}} className="shadow p-3 mb-5 rounded">
            <Card.Img variant="top" src="/Images/blood-Center.jpg" alt="Image" style={mystyle} className="d-inline-block align-top mx-2"/>
            <Card.Body>
              <Card.Title style={{justifyContent:"left",alignItems:"left"}}>Blood Donation Website: My Account</Card.Title>
            </Card.Body>
          </Card>
          <CardGroup style={{}}>
            <Col className="mt-md-2 px-2" md={8}>  
                <Card className="shadow p-3 mb-5 rounded" style={{marginTop:10,borderColor:"#272C33",backgroundColor: "#f2f2f2",borderRadius:"4px solid"}}>
                    <Card.Body>
                        <Card.Title style={{textAlign:"center", alignItems:"center",paddingBottom:"4px"}}>My Blood Requests</Card.Title>
                        <hr />
                        <div style={{ height: "25vh", overflow: "scroll", scrollbarWidth: 'thin', scrollbarColor: '#888 #f5f5f5' , padding: "10px"}}>
                        
                        {
                          data?.length===0 && <h5 style={{justifyContent:"center",textAlign:"center",fontSize:"28px"}}>No Blood Requests</h5>
                        }
                        {data.map((item) => (
                          <div key={item.ID.value}>
                            <h6><span>Name:</span>{item.Name.value}</h6>
                            <h6><span>Email:</span>{item.Email.value}</h6>
                            <h6><span>Gender:</span>{item.Gender.value}</h6>
                            <h6><span>Blood Group:</span>{item.Blood_Group.value}</h6>
                            <h6><span>Contact:</span>{item.Contact.value}</h6>
                            <h6><span>Address:</span>{item.Location.value}</h6>
                            <hr /> {/* Add a line after each item */}
                          </div>
                        ))} 
                        </div>
                        <Button variant="primary" onClick={ViewAllRequests} style={{backgroundColor: "#153250",marginTop:"12px"}}><><i class="fa fa-check-circle" aria-hidden="true"></i>View all requests</></Button>
                    </Card.Body>
                </Card>
            </Col>
            <Col className="mt-md-2 px-2" md={4}>
              <Card className="shadow p-3 mb-5 rounded" style={{marginTop:10,alignItems:"center",justifyContent:"center",backgroundColor:"#153250",color:"white"}} >
                <Card.Img variant="top" src="/Images/blood-Center.jpg" alt="Image" style={mystyle} className="d-inline-block align-top mx-2"/>
                  <Card.Header style={{justifyContent:"left",alignItems:"left",fontSize:"18px"}}>Personal Information</Card.Header>
                <Card.Body>
                <hr />
                {centerData.map((item) => (
                  <div key={item.ID.value} style={{textAlign:"left", paddingBottom:"10px", fontSize:"2rem"}}>
                    <h6><span className="mr-5 pr-5">Name:</span>{item.Name.value}</h6>
                    <h6><span>Email:</span>{item.Email.value}</h6>
                    <h6><span>License:</span>{item.License.value}</h6>
                    <h6><span>ContactNo:</span>{item.ContactNo.value}</h6>
                    <h6><span>Timings:</span>{item.Timings.value}</h6>
                    <h6><span>Opening_Days:</span>{item.Opening_Days.value}</h6>
                    <h6><span>Address:</span>{item.Location.value}</h6>
                    <h6><span>Category:</span>{item.Category.value}</h6>
                    
                  </div>
                ))} 
                </Card.Body>
              </Card> 
            </Col> 
        </CardGroup>
        <CardGroup style={{}}>
            <Col className="mt-md-2 px-2" md={8}>  
                <Card className="shadow p-3 mb-5 rounded" style={{paddingBottom:10,borderColor:"#272C33",backgroundColor: "#f2f2f2",borderRadius:"4px solid"}}>
                    <Card.Body>
                        <Card.Title style={{textAlign:"center", alignItems:"center",paddingBottom:"4px"}}>All Accepted Requests</Card.Title>
                        <hr />
                        <div style={{ height: "25vh", overflow: "scroll", scrollbarWidth: 'thin', scrollbarColor: '#888 #f5f5f5' , padding: "10px"}}>
                        {
                          requests?.length===0 && <h5>No Accepted Requests</h5>
                        }
                        {requests.map((item) => (
                          <div key={item.ID.value}>
                            <h6><span>Name:</span>{item.Name.value}</h6>
                            <h6><span>Email:</span>{item.Email.value}</h6>
                            <h6><span>Gender:</span>{item.Gender.value}</h6>
                            <h6><span>Blood Group:</span>{item.Blood_Group.value}</h6>
                            <h6><span>Contact:</span>{item.Contact.value}</h6>
                            <h6><span>City:</span>{item.Location.value}</h6>
                            <h6><span>Blood Donated By:</span>{item.RequestDonorName.value}</h6>
                            
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
            <Col className="mt-md-2 px-2" md={8}>  
                <Card className="shadow p-3 mb-5 rounded" style={{marginTop:10,paddingBottom:10,borderColor:"#272C33",backgroundColor: "#f2f2f2",borderRadius:"4px solid"}}>
                    <Card.Body>
                        <Card.Title style={{textAlign:"center", alignItems:"center",paddingBottom:"4px"}}>My Blood Donors</Card.Title>
                        <hr />
                        <div style={{ height: "25vh", overflow: "scroll" }}>
                        {
                          donors?.length===0 && <h5>No Donors Data added</h5>
                        }

                        {donors.map((donor) => (
                          <div key={donor.donations.value}>
                             <h6>Name: {donor.Name.value}</h6>
                             <h6>Email: {donor.Email.value}</h6>
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
              <Card className="shadow p-3 mb-5 bg-body rounded" style={{marginTop:10,paddingBottom:10}} id="card">
                <div>
                  <h4 style={{textAlign:"center", alignItems:"center",paddingBottom:"4px"}}> Appointments booked in your Center!</h4>
                  <hr />
                  {
                    appointment?.length===0 && <h5 style={{textAlign:"center",justifyContent:"center",color:"red",fontSize:"18px"}}>No Appointments booked in your center</h5>
                  }
                  {appointment.map((item) => (
                    <div key={item.appointments.value} style={{fontSize:"14px", marginLeft:"16px"}}>
                      <h6>Name:{item.DonorName.value}</h6>
                      <h6>Email:{item.DonorEmail.value}</h6>
                      <h6>Timing:{item.Timings.value}</h6>
                      <h6>Blood Group:{item.BloodGroup.value}</h6>
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