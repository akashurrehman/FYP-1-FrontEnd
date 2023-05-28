import React, { useEffect, useState } from "react";
import { Container,Image } from "react-bootstrap";
import { Row, Col } from "react-bootstrap";
import UserPanelHeader from "../UserPanelHeader";
import UserPanelFooter from "../UserPanelFooter";
import { useParams } from 'react-router-dom';
import image from '../../../Public/user/image/makeAppointment.jpg';
import '../css/style.css';
import axios from "axios";



const AppointmentDetails = () => {

    const { id } = useParams();
    const [appointment, setAppointment] = useState();

    const getData = async (e) => {
        // e.preventDefault();
        // const confirmed = window.confirm('Are you sure you want to delete?');
        
        try {  
            const response = await axios.get('http://localhost:8081/api/users/appointments/' + id,  {
                id
            });
            console.log(response.data?.results?.bindings?.[0]);
            // window.location.href = "/user/my-account";
            setAppointment(response.data?.results?.bindings?.[0]);
        } 
        catch (error) {
            if (error.response) {
                console.log(error.response.data.error);
            } 
            else {
                console.log('An error occurred');
            }
        }
        
        
    }



    
    useEffect(()=> getData, []);
    console.log(appointment);

    return ( <div>
        <UserPanelHeader></UserPanelHeader>
        <div style={{marginTop:'9%',marginBottom:'4%'}}>
            <Container>
                <Row style={{marginBottom:'5%'}}>
                    <Col sm={12} style={{textAlign:'center',width:'50%'}}>
                        <h2 style={{fontWeight:"bold",color:"rgb(160, 15, 15)",fontFamily:"cursive",}}>Appointment Details</h2>  
                        <p style={{fontWeight:"300"}}>The average person puts only 25% of his energy into his work. The world takes off its hat to those who put in more than 50% of their capacity, and stands on its head for those few and far between souls who devote 100%.</p>
                    </Col>
                </Row>
                <Row style={{marginBottom:'10%'}}>
                <Col sm={4}>
                        <h4 style={{fontSize:'18px'}}>Donor Name: <spam style={{fontSize:'16px',fontWeight:'400'}}>{appointment?.DonorName?.value}</spam></h4>
                        <h4 style={{fontSize:'18px'}}>Date Of Birth: <spam style={{fontSize:'16px',fontWeight:'400'}}>{appointment?.DOB?.value}</spam></h4>
                        <h4 style={{fontSize:'18px'}}>Donor Blood Group: <spam style={{fontSize:'16px',fontWeight:'400'}}>{appointment?.BloodGroup?.value}</spam></h4>
                        <h4 style={{fontSize:'18px'}}>Donor Gender: <spam style={{fontSize:'16px',fontWeight:'400'}}>{appointment?.Gender?.value}</spam></h4>
                        <h4 style={{fontSize:'18px'}}>Donor Email: <spam style={{fontSize:'16px',fontWeight:'400'}}>{appointment?.DonorEmail?.value}</spam></h4>
                        <h4 style={{fontSize:'18px'}}>Donor ContactNo: <spam style={{fontSize:'16px',fontWeight:'400'}}>{appointment?.DonorContactNo?.value}</spam></h4>
                        <h4 style={{fontSize:'18px'}}>Donor City: <spam style={{fontSize:'16px',fontWeight:'400'}}>{appointment?.City?.value}</spam></h4>
                        <h4 style={{fontSize:'18px'}}>Donor Address: <spam style={{fontSize:'16px',fontWeight:'400'}}>{appointment?.Address?.value}</spam></h4>
                        
                    </Col>
                    <Col sm={4}>
                        <h4 style={{fontSize:'18px'}}>Centre Name: <spam style={{fontSize:'16px',fontWeight:'400'}}>{appointment?.CentreName?.value}</spam></h4>
                        <h4 style={{fontSize:'18px'}}>Centre Email: <spam style={{fontSize:'16px',fontWeight:'400'}}>{appointment?.CentreEmail?.value}</spam></h4>
                        <h4 style={{fontSize:'18px'}}>Centre Timings: <spam style={{fontSize:'16px',fontWeight:'400'}}>{appointment?.Timings?.value}</spam></h4>
                        <h4 style={{fontSize:'18px'}}>Centre Contact No: <spam style={{fontSize:'16px',fontWeight:'400'}}>{appointment?.CentreContactNo?.value}</spam></h4>
                        <h4 style={{fontSize:'18px'}}>Centre Location: <spam style={{fontSize:'16px',fontWeight:'400'}}>{appointment?.Location?.value}</spam></h4>
                        <h4 style={{fontSize:'18px'}}>Booking Date: <spam style={{fontSize:'16px',fontWeight:'400'}}>{appointment?.BookingDate?.value}</spam></h4>
                        <h4 style={{fontSize:'18px'}}>Booking Time: <spam style={{fontSize:'16px',fontWeight:'400'}}>{appointment?.BookingTime?.value}</spam></h4>
                    </Col>
                    <Col sm={4}>
                    <div>
                        <Image src={image} rounded style={{marginLeft: "20%",marginTop:'0%',height: "20rem",opacity:'0.75'}}></Image>
                    </div>
                    </Col>
                </Row>
                
            </Container>
        </div>
        
        <UserPanelFooter></UserPanelFooter>

    </div> );
};

export default AppointmentDetails;