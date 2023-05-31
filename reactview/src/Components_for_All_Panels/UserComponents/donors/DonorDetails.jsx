import React, { useEffect, useState } from "react";
import { Container,Image } from "react-bootstrap";
import { Row, Col } from "react-bootstrap";
import UserPanelHeader from "../UserPanelHeader";
import UserPanelFooter from "../UserPanelFooter";
import { useParams } from 'react-router-dom';
import image from '../../../Public/user/image/jobpost.png';
import '../css/style.css';
import { useAuth } from "../../../Panels/BloodDonationCentre/Auth/AuthContext";
import jwtDecode from "jwt-decode";
import donorService from "../../../Services/Api/User/DonorService";

const DonorDetails = () => {

    const { id } = useParams();
    const [donor, setDonor] = useState();

    const getData = () => {
        donorService
            .getSingleDonor(id)
            .then((data) => {
                setDonor(data?.results?.bindings?.[0]);
            })
            .catch((err) => {
                console.log(err);
        });
    };
    //Get User ID from token
    const {token} = useAuth();
    const decodedToken = token ? jwtDecode(token) : null;

    const role = decodedToken?.role;

    const authCentre=()=>{
      if(role!='USER'){
        window.location.href = "/user/login";
      }
        console.log("authCentre");
    }

    
    React.useEffect(() =>{
        getData();
        authCentre();
    },[]);

    console.log(donor);

    return ( <div>
        <UserPanelHeader></UserPanelHeader>
        <div style={{marginTop:'9%',marginBottom:'4%'}}>
            <Container>
                <Row style={{marginBottom:'5%'}}>
                    <Col sm={12} style={{textAlign:'center',width:'50%'}}>
                        <h2 style={{fontWeight:"bold",color:"rgb(160, 15, 15)",fontFamily:"cursive",}}>Blood Donor Details</h2>  
                        <p style={{fontWeight:"300"}}>The average person puts only 25% of his energy into his work. The world takes off its hat to those who put in more than 50% of their capacity, and stands on its head for those few and far between souls who devote 100%.</p>
                    </Col>
                </Row>
                <Row style={{marginBottom:'10%'}}>
                    <Col sm={6}>
                        <h4 style={{fontSize:'18px'}}>Donor Name: <spam style={{fontSize:'16px',fontWeight:'400'}}>{donor?.Name?.value}</spam></h4>
                        <h4 style={{fontSize:'18px'}}>Email: <spam style={{fontSize:'16px',fontWeight:'400'}}>{donor?.Email?.value}</spam></h4>
                        <h4 style={{fontSize:'18px'}}>Gender: <spam style={{fontSize:'16px',fontWeight:'400'}}>{donor?.Gender?.value}</spam></h4>
                        <h4 style={{fontSize:'18px'}}>Blood Group: <spam style={{fontSize:'16px',fontWeight:'400'}}>{donor?.Blood_Group?.value}</spam></h4>
                        <h4 style={{fontSize:'18px'}}>City: <spam style={{fontSize:'16px',fontWeight:'400'}}>{donor?.City?.value}</spam></h4>
                        <h4 style={{fontSize:'18px'}}>Contact No: <spam style={{fontSize:'16px',fontWeight:'400'}}>{donor?.Contact?.value}</spam></h4>
                        <h4 style={{fontSize:'18px'}}>Location: <spam style={{fontSize:'16px',fontWeight:'400'}}>{donor?.Location?.value}</spam></h4>
                        <h4 style={{fontSize:'18px'}}>Message: <spam style={{fontSize:'16px',fontWeight:'400'}}>{donor?.Message?.value}</spam></h4>
                    </Col>
                    <Col sm={6}>
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

export default DonorDetails;