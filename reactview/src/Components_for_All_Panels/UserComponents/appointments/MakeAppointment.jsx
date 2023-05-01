import React, { useEffect, useState } from "react";
import { Container, Button,Image } from "react-bootstrap";
import { Form, Row, Col, Card, ListGroup, Nav,Dropdown,DropdownButton,InputGroup,Modal } from "react-bootstrap";
import UserPanelHeader from "../UserPanelHeader";
import UserPanelFooter from "../UserPanelFooter";
import { useParams } from 'react-router-dom';
import { Search,ArrowRight,Trash } from 'react-bootstrap-icons';
import image from '../../../Public/user/image/jobpost.png';
import '../css/style.css';

import centreService from "../../../Services/Api/User/BloodDonationCentreService";
import userService from "../../../Services/Api/User/UserService";
import jwtDecode from "jwt-decode";

import axios from 'axios';
import { toast } from 'react-toastify';

const MakeAppointment = () => {

    //Get Centre ID from url
    const { centreID } = useParams();

    //Get User ID from token
    const token = localStorage.getItem('token');
    const decodedToken = jwtDecode(token);
    const userID = decodedToken?.id;
    // console.log(userID);

    const [centre, setCentre] = useState();
    const [user, setUser] = useState();

    const [donorName, setDonorName] = React.useState("");
    const [donorDOB, setDonorDOB] = React.useState("");
    const [donorEmail, setDonorEmail] = React.useState("");
    const [donorContactNo, setDonorContactNo] = React.useState("");
    const [donorGender, setDonorGender] = React.useState("");
    const [donorAddress, setDonorAddress] = React.useState("");
    const [donorCity, setDonorCity] = React.useState("");
    const [donorBloodGroup, setDonorBloodGroup] = React.useState("");
    const [centreName, setCentreName] = React.useState("");
    const [centreTimings, setCentreTimings] = React.useState("");
    const [centreContactNo, setCentreContactNo] = React.useState("");
    const [centreEmail, setCentreEmail] = React.useState("");
    const [centreLocation, setCentreLocation] = React.useState("");

    const getUserData = () => {
        userService
            .getSingleUser(userID)
            .then((data) => {
                setUser(data?.results?.bindings?.[0]);
                setDonorName(data?.results?.bindings?.[0]?.Name?.value);
                setDonorDOB(data?.results?.bindings?.[0]?.DOB?.value);
                setDonorEmail(data?.results?.bindings?.[0]?.Email?.value);
                setDonorContactNo(data?.results?.bindings?.[0]?.ContactNo?.value);
                setDonorGender(data?.results?.bindings?.[0]?.Gender?.value);
                setDonorAddress(data?.results?.bindings?.[0]?.Address?.value);
                setDonorCity(data?.results?.bindings?.[0]?.City?.value);
                setDonorBloodGroup(data?.results?.bindings?.[0]?.BloodGroup?.value);
            })
            .catch((err) => {
                console.log(err);
        });
    };

    const getCentreData = () => {
        centreService
            .getSingleCentre(centreID)
            .then((data) => {
                setCentre(data?.results?.bindings?.[0]);
                setCentreName(data?.results?.bindings?.[0]?.Name?.value);
                setCentreLocation(data?.results?.bindings?.[0]?.Location?.value);
                setCentreContactNo(data?.results?.bindings?.[0]?.ContactNo?.value);
                setCentreTimings(data?.results?.bindings?.[0]?.Timings?.value);
                setCentreEmail(data?.results?.bindings?.[0]?.Email?.value);
            })
            .catch((err) => {
                console.log(err);
        });
    };

    useEffect(()=>{getUserData();getCentreData();}, []);
    console.log(centre);
    console.log(user);
    // console.log(donorName);

    const submitForm = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:8081/api/user/appointment/AppointmentDetails/add', {
                centreID,userID,donorName,donorDOB,donorEmail,donorContactNo,donorGender,donorAddress,donorCity,donorBloodGroup,centreName,centreEmail,centreLocation,centreTimings,centreContactNo
            });
            console.log(response.data);
            window.location.href = "/user/my-account";
        } 
        catch (error) {
            if (error.response) {
                console.log(error.response.data.error);
                toast.error(error.response.data.error, {
                    closeOnClick: true,
                    pauseOnHover: true,
                    position: toast.POSITION.BOTTOM_RIGHT,});
            } 
            else {
                console.log('An error occurred');
            }
        }
    }



    //Button Stylings
    const [isHover, setIsHover] = React.useState(true);
    const handleMouseEnter = () => {
        setIsHover(false);
    };
    const handleMouseLeave = () => {
        setIsHover(true);
    };
    const ButtonStyle = {
        
        backgroundColor: isHover ? 'rgb(160, 15, 15)' : 'white',
        color: isHover ? 'white' : 'rgb(160, 15, 15)',
        transform: isHover ? 'scale(0.84)' : 'scale(0.84)',
        border: isHover ? '' : '1px solid rgb(160, 15, 15)',
        transitionDuration: isHover ? '' : '0.1s',
    };
    

    return ( <div>
        <UserPanelHeader></UserPanelHeader>
        <div style={{marginTop:'9%',marginBottom:'4%'}}>
            <Container>
                <Row style={{marginBottom:'5%'}}>
                    <Col sm={12} style={{textAlign:'center',width:'65%'}}>
                        <h2 style={{fontWeight:"bold",color:"rgb(160, 15, 15)",fontFamily:"cursive",}}>Make Appointment in "{centre?.Name?.value}"</h2>  
                        <p style={{fontWeight:"300"}}>The average person puts only 25% of his energy into his work. The world takes off its hat to those who put in more than 50% of their capacity, and stands on its head for those few and far between souls who devote 100%.</p>
                    </Col>
                </Row>
                <Row style={{marginBottom:'10%'}}>
                    <Col sm={4}>
                        <h4 style={{fontSize:'18px'}}>Donor Name: <spam style={{fontSize:'16px',fontWeight:'400'}}>{user?.Name?.value}</spam></h4>
                        <h4 style={{fontSize:'18px'}}>Date Of Birth: <spam style={{fontSize:'16px',fontWeight:'400'}}>{user?.DOB?.value}</spam></h4>
                        <h4 style={{fontSize:'18px'}}>Donor Blood Group: <spam style={{fontSize:'16px',fontWeight:'400'}}>{user?.BloodGroup?.value}</spam></h4>
                        <h4 style={{fontSize:'18px'}}>Donor Gender: <spam style={{fontSize:'16px',fontWeight:'400'}}>{user?.Gender?.value}</spam></h4>
                        <h4 style={{fontSize:'18px'}}>Donor Email: <spam style={{fontSize:'16px',fontWeight:'400'}}>{user?.Email?.value}</spam></h4>
                        <h4 style={{fontSize:'18px'}}>Donor ContactNo: <spam style={{fontSize:'16px',fontWeight:'400'}}>{user?.ContactNo?.value}</spam></h4>
                        <h4 style={{fontSize:'18px'}}>Donor City: <spam style={{fontSize:'16px',fontWeight:'400'}}>{user?.City?.value}</spam></h4>
                        <h4 style={{fontSize:'18px'}}>Donor Address: <spam style={{fontSize:'16px',fontWeight:'400'}}>{user?.Address?.value}</spam></h4>
                        
                    </Col>
                    <Col sm={4}>
                        <h4 style={{fontSize:'18px'}}>Centre Name: <spam style={{fontSize:'16px',fontWeight:'400'}}>{centre?.Name?.value}</spam></h4>
                        <h4 style={{fontSize:'18px'}}>Centre Email: <spam style={{fontSize:'16px',fontWeight:'400'}}>{centre?.Email?.value}</spam></h4>
                        <h4 style={{fontSize:'18px'}}>Centre Timings: <spam style={{fontSize:'16px',fontWeight:'400'}}>{centre?.Timings?.value}</spam></h4>
                        <h4 style={{fontSize:'18px'}}>Centre Contact No: <spam style={{fontSize:'16px',fontWeight:'400'}}>{centre?.ContactNo?.value}</spam></h4>
                        <h4 style={{fontSize:'18px'}}>Centre Location: <spam style={{fontSize:'16px',fontWeight:'400'}}>{centre?.Location?.value}</spam></h4>
                        <div style={{textAlign:'right',marginTop:'30%'}}>
                        <Button variant="default" type='submit' style={ButtonStyle} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} onClick={submitForm}
                            >Book Appointment <ArrowRight className="" size={17} /></Button>
                        </div>
                    </Col>
                    <Col sm={4}>
                    <div>
                        <Image src={image} rounded style={{marginLeft: "48.5%",marginTop:'3.9%',height: "40%",opacity:'0.75'}}></Image>
                    </div>
                    </Col>
                </Row>
                
            </Container>
        </div>
        
        <UserPanelFooter></UserPanelFooter>

    </div> );
};

export default MakeAppointment;