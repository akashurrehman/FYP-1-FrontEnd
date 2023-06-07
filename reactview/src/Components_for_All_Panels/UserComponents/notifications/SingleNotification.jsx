import React, { useState } from "react";

import { Container, Button, Nav, Modal } from "react-bootstrap";
import { Row, Col, Image } from "react-bootstrap";
import image from '../../../Public/user/image/profile.jpg';
import CircleSharpIcon from '@mui/icons-material/CircleSharp';
import '../css/style.css';
import axios from "axios";
import SocialMediaButtons from '../SocialMediaButtons';

const SingleNotification = (props) => {

    const { notification, history } = props;
    console.log(props);

    const [name, setName] = useState();
    const [address, setAddress] = useState();
    const [email, setEmail] = useState();
    const [contact, setContact] = useState();
    const [bloodGroup, setBloodGroup] = useState();
    const [city, setCity] = useState();

    console.log(city,name,address,contact,bloodGroup);

    React.useEffect( () => {
        getUserData();
    },[]);

    const getUserData = () => {
        const userName = notification.UserName.value;
        axios
            .get("http://localhost:8081/api/users/registration/getUserByUsername/" + userName)
            .then((res) => {
                setCity(res.data.results.bindings?.[0]?.City.value);
                setName(res.data.results.bindings?.[0]?.Name.value);
                setBloodGroup(res.data.results.bindings?.[0]?.BloodGroup.value);
                setAddress(res.data.results.bindings?.[0]?.Address.value);
                setContact(res.data.results.bindings?.[0]?.ContactNo.value);
                setEmail(res.data.results.bindings?.[0]?.Email.value);
            })
            .catch((error) => {
                console.log("error",error)
            });
    };

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return ( <div>
        <Container style={{}}>
            <div style={{paddingTop:'3%',paddingLeft:'0%',paddingRight:'0%',marginTop:'-2%'}}>
                <Row className=''>
                    <Col sm={1}>
                        <div>
                            <Image src={image} rounded style={{height: "2.5rem",opacity:'1.0'}}></Image>
                        </div>
                    </Col>
                    <Col sm={11}>
                        <Row>
                            <Col sm={11}>
                                <Nav.Link onClick={handleShow}>
                                    <p className='PurpleColor' style={{marginLeft:'3%',marginTop:'0%'}}>{notification.Message.value}</p>
                                </Nav.Link>
                            </Col>
                            <Col sm={1}>
                                <div style={{marginTop:'-30%'}}>
                                    <CircleSharpIcon sx={{ color: '#27213C', mr:0 , my: 0,fontSize:'small' }} />
                                </div>
                            </Col>
                        </Row>
                        <Row className=''>
                            <Col sm={6}>
                                <p className='PurpleColor' style={{marginLeft:'7%',marginTop:'-6%',marginBottom:'4%',textAlign:'left',fontSize:'10.5px',fontFamily:'cursive'}}>{notification.Day.value}  ({notification.Time.value})</p>
                            </Col>
                            <Col sm={6}>
                                <p className='PurpleColor' style={{marginLeft:'0%',marginTop:'-6%',marginBottom:'4%',textAlign:'right',fontSize:'10.5px',fontFamily:'cursive'}}>{notification.Date.value}</p>
                            </Col>
                        </Row>
                    </Col>
                </Row>
                
            </div>
            <div>
                <Modal show={show} onHide={handleClose}>
                    <Modal.Header closeButton>
                    <Modal.Title className='RedColor'>{notification.UserName.value}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div>
                            <p style={{fontWeight:'600'}}>fullName: {name}</p>
                            <p style={{marginTop:'-2%',fontWeight:'600'}}>bloodGroup: {bloodGroup}</p>
                            <p style={{marginTop:'-2%',fontWeight:'600'}}>city: {city}</p>
                            <p style={{marginTop:'-2%',fontWeight:'600'}}>email: {email}</p>
                            <p style={{marginTop:'-2%',fontWeight:'600'}}>location: {address}</p>
                            <p style={{marginTop:'-2%',fontWeight:'600'}}>contactNo: <spam style={{fontSize:'20px',color:'blue',fontWeight:'600'}}>{contact}</spam></p>
                        </div>
                        <div>
                            <SocialMediaButtons></SocialMediaButtons>
                        </div>
                    </Modal.Body>
                </Modal>
            </div>
        </Container>


    </div> );
}

export default SingleNotification;