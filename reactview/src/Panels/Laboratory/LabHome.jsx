import React,{useState,useEffect} from "react";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCoffee } from '@fortawesome/free-solid-svg-icons'
import Header from "./LabComponents/Header";
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useAuth  }  from './../BloodDonationCentre/Auth/AuthContext';
import jwt_decode from 'jwt-decode';

const LabHome=()=> {
  const [jobPosts, setJobPosts] = useState([]);
  const [news, setNews] = useState([]);
  const [FAQ, setFAQ] = useState([]);
  const [events, setEvents] = useState([]);
  const [lab, setLab] = useState([]);


  //Get the token from the AuthContext
  const {token} = useAuth();
  const {id} = jwt_decode(token);

  useEffect(() => {
    const fetchData = async () => {
      const response1 = await axios.get("http://localhost:8081/api/labs/RegisteredLabs")
      .then((response) => setLab(response.data.results.bindings)).catch((error) => toast.error(error, {position: toast.POSITION.TOP_CENTER}));
      const response2 = await axios.get(`http://localhost:8081/api/labs/RegisteredLabs/${id}`)
      .then((response) => console.log(response.data)).catch((error) => toast.error(error, {position: toast.POSITION.TOP_CENTER}));
      const response3 = await axios.get("http://localhost:8081/api/admin/getJobPost")
      .then((response) => setJobPosts(response.data.results.bindings)).catch((error) => toast.error(error, {position: toast.POSITION.TOP_CENTER}));
      const response4 = await axios.get("http://localhost:8081/api/admin/getNews")
      .then((response) => setNews(response.data.results.bindings)).catch((error) => console.log(error));
      const response5 = await axios.get("http://localhost:8081/api/admin/getFAQ")
      .then((response) => setFAQ(response.data.results.bindings)).catch((error) => toast.error(error));
      const response7 = await axios.get("http://localhost:8081/api/admin/getEvents")
      .then((response) => setEvents(response.data.results.bindings)).catch((error) => console.log(error));

    };
    fetchData();
    console.log("ID: "+id)
  }, []);
  const mystyle = {
      height: "7%",
      width: "7%",
      borderRadius: "50%",
      display: "inline-block",
    };
  return (
    <Container >
      <Header />
      <Row>
        <Col className="mt-md-5" xs={12}>
          <Card style={{marginTop:30,paddingBottom:10,alignItems:"center",justifyContent:"center"}} >
            <Card.Img variant="top" src="/Images/blood-Center.jpg" alt="Image" style={mystyle} className="d-inline-block align-top mx-2"/>
            <Card.Body>
              <Card.Title>{"Lab Name"}</Card.Title>
              <Card.Title >Dashboard</Card.Title>
            </Card.Body>
          </Card>
          <Card border="danger" style={{marginTop:30,paddingBottom:10}}>
            <Card.Body>
              <Card.Title><i className="fa fa-flag" aria-hidden="true"></i>Important  Notification</Card.Title>
              {news.map((item) => (
                <div key={item.ID.value}>
                  <h4>Title:{item.Title.value}</h4>
                  <p>Details:{item.Details.value}</p>
                  <hr style={{color:"red",width:"100%"}}/>
                </div>
              ))}
            </Card.Body>
          </Card>
          <Card border="success" style={{marginTop:30,paddingBottom:10}}>
            <Card.Body>
              <Card.Title><i className="fa fa-calendar" aria-hidden="true"></i>Upcoming Events</Card.Title>
              {events.map((item) => (
                <div key={item.ID.value}>
                  <h4>Event:{item.Title.value}</h4>
                  <p>Details:{item.Details.value}</p>
                  <hr style={{color:"red",width:"100%"}}/>
                </div>
              ))}
            </Card.Body>
          </Card>
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
          <Card border="info" style={{marginTop:30,paddingBottom:10}}>
            <Card.Body>
              <Card.Title><i className="fa fa-flag" aria-hidden="true"></i>Job Posts</Card.Title>
              {jobPosts.map((item) => (
                <div key={item.ID.value}>
                  <h4>Question:{item.Title.value}</h4>
                  <p>Answer:{item.Details.value}</p>
                  <hr style={{color:"red",width:"100%"}}/>
                </div>
              ))}
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}
export default LabHome;