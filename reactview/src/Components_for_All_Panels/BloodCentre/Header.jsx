import React from 'react';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Row,Col,Modal,Image,Button } from 'react-bootstrap';
import { Dropdown } from 'react-bootstrap';
import './style/navbar.css'
import { useAuth } from './../../Panels/BloodDonationCentre/Auth/AuthContext';
import NotificationServiceCenter from './../../Services/Api/BloodCenter/NotificationServiceCenter';
import CircleNotificationsSharpIcon from '@mui/icons-material/NotificationsActiveSharp';
import DoneAllSharpIcon from '@mui/icons-material/DoneAllSharp';
import SettingsSharpIcon from '@mui/icons-material/SettingsSharp';
import SingleNotifications from './Notifications/singleNotifications';
import jwtDecode from "jwt-decode";
import Badge from 'react-bootstrap/Badge';

function Header(props) {

  const {handleLogout} = useAuth();
  const token = localStorage.getItem('token');
  const decodedToken = token ? jwtDecode(token) : null;
  const id = decodedToken?.id;
  console.log(id);
  const [notifications, setNotifications] = React.useState([]);

  const getData = () => {
      NotificationServiceCenter
          .getNotificationByRequestMakerID(id)
          .then((data) => {
              setNotifications(data);
          })
          .catch((err) => {
              console.log(err);
          });
  };
  React.useEffect(getData, []);
  console.log("Notifications:",notifications.results);

  const [show, setShow] = React.useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleLogoutClick=()=>{
    handleLogout();
    console.log('In Logout')
    window.location.href="/user/login";
  }
  return (
    <Navbar style={{backgroundColor:"#153250",color:"#FFFFFF",paddingLeft:"60px"}} expand="lg" fixed="top" id="visi" textColor="#FFFFFF">
      <Container fluid>
        <Navbar.Brand>
        <img
                src="/Images/WebLogo.jpeg"
                style={{
                  width: '35px',
                  height: '35px',
                  borderRadius: '50%'
              }}
                alt="Notification-icon"
                className="d-inline-block align-top mx-2"
              /></Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll" style={{color:"#FFFFFF"}}>
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: '100px',color:"#FFFFFF" }}
            navbarScroll
          >
            <Nav.Link href="/bloodCenter/HomeScreen" style={{color:"#FFFFFF" }}><i class="fa fa-home" aria-hidden="true"></i>Dashboard/Home</Nav.Link>
            <Nav.Link href="/bloodCenter/addbloodRequest" style={{color:"#FFFFFF" }}><i class="fa fa-tint" aria-hidden="true"></i>Add Blood Request</Nav.Link>
            <Nav.Link href="/bloodCenter/addNewUser" style={{color:"#FFFFFF" }}><i class="fa fa-address-card" aria-hidden="true"></i>Add New User</Nav.Link>
           
            <Nav.Link href="#" style={{color:"#FFFFFF" }}>
            <i class="fa fa-filter" aria-hidden="true"></i>Other Options
            </Nav.Link>
          </Nav>
            <Nav>
              <Nav.Link onClick={handleShow} style={{color:"#FFFFFF" }}><CircleNotificationsSharpIcon sx={{ color: '#ff0000', mr:0 , my: 0 }} className="d-inline-block align-top mx-2"/>
              {notifications.length > 0 && (
                <Badge bg="info" pill style={{ position: 'absolute', top: 0, right: 0 }}>
                  100
                </Badge>
              )}
              </Nav.Link>
            </Nav>
            <Modal show={show} onHide={handleClose}>
              <Modal.Header closeButton>
                <Modal.Title>Notifications</Modal.Title>
              </Modal.Header>
              <Modal.Body>
              <div>
                {notifications.length === 0 ? (
                  <></>
                    ) : (
                      <Row className="d-flex justify-content-center">
                        {notifications.results.bindings.map((notification, index) => (
                          <Col sm={12} key={index}>
                            <SingleNotifications key={index} notification={notification} />
                          </Col>
                            ))}
                      </Row>
                )}
              </div>
              <div style={{marginTop:'7%'}}>
                <Row>
                  
                  <Col sm={5}>
                    <Nav.Link style={{color:'#1824CB'}}><DoneAllSharpIcon sx={{ color: '', mr:0 , my: 0, fontSize:'large' }}/><span style={{fontSize:'13px'}}> Mark all as read</span></Nav.Link>
                  </Col>
                  <Col sm={7}>
                    <div style={{textAlign:'right'}}>
                        <Button size='sm' variant="flatSolid" onClick={handleClose}>
                          Close Notifications
                        </Button>
                      </div>
                    </Col>
                </Row>         
              </div>
              </Modal.Body>
            </Modal>
              <img
                src="/Images/blood-center.jpg"
                style={{
                  width: '30px',
                  height: '30px',
                  borderRadius: '50%'
              }}
                alt="user Profile"
                className="d-inline-block align-top mx-2"
              />
          <Form className="d-flex">
          <Dropdown>
            <Dropdown.Toggle variant="primary" id="dropdown-basic" style={{ backgroundColor: "white", color: "red",height:"auto",width:"auto"}} caret>
                
            </Dropdown.Toggle>

            <Dropdown.Menu style={{position: 'absolute', left: '-450%'}}>
                <Dropdown.Item href="/bloodCenter/MyAccount">My Account <i class="fa fa-user-md" aria-hidden="true"></i></Dropdown.Item>
                <Dropdown.Item href="#/action-2">Help <i class="fa fa-question-circle" aria-hidden="true"></i></Dropdown.Item>
                <Dropdown.Item onClick={handleLogoutClick}>Logout <i class="fa fa-share" aria-hidden="true"></i></Dropdown.Item>
            </Dropdown.Menu>
        </Dropdown>
          </Form>
        </Navbar.Collapse>
      </Container>
      
    </Navbar>
  );
}

export default Header;