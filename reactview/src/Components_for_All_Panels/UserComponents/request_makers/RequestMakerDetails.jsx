import React, { useEffect, useState } from "react";
import { Container,Image } from "react-bootstrap";
import { Row, Col } from "react-bootstrap";
import UserPanelHeader from "../UserPanelHeader";
import UserPanelFooter from "../UserPanelFooter";
import { useParams } from 'react-router-dom';
import image from '../../../Public/user/image/jobpost.png';
import '../css/style.css';
import jwtDecode from "jwt-decode";
import { useAuth } from "../../../Panels/BloodDonationCentre/Auth/AuthContext";

import requestMakerService from "../../../Services/Api/User/RequestMakerService";

const RequestMakerDetails = () => {

    const { id } = useParams();
    const [requestMaker, setRequestMaker] = useState();

    const {token} = useAuth();
    
    const decodedToken = token ? jwtDecode(token) : null;
    const role = decodedToken?.role;

    const authCentre=()=>{
      if(role!='USER'){
        window.location.href = "/user/login";
      }
        console.log("authCentre");
    }

    const getData = () => {
        requestMakerService
            .getSingleRequestMaker(id)
            .then((data) => {
                setRequestMaker(data?.results?.bindings?.[0]);
            })
            .catch((err) => {
                console.log(err);
        });
    };

    
    useEffect(()=> getData,authCentre(), []);
    console.log(requestMaker);

    return ( <div>
        <UserPanelHeader></UserPanelHeader>
        <div style={{marginTop:'9%',marginBottom:'4%'}}>
            <Container>
                <Row style={{marginBottom:'4%'}}>
                    <Col sm={12} style={{textAlign:'center',width:'60%'}}>
                        <h2 style={{fontWeight:"bold",color:"rgb(160, 15, 15)",fontFamily:"cursive",}}>Request Maker Details</h2>  
                        {/* <p style={{fontWeight:"300"}}>The average person puts only 25% of his energy into his work. The world takes off its hat to those who put in more than 50% of their capacity, and stands on its head for those few and far between souls who devote 100%.</p> */}
                    </Col>
                </Row>
                <Row style={{marginBottom:'10%'}}>
                    <Col sm={7}>
                        {requestMaker?.RequestDonatedBy?.value !== 'null' ? (
                            <>
                                <h4 style={{fontSize:'15px', textAlign:'right', color:'green',textDecoration:'underline'}}>Donated By: <spam style={{fontSize:'15px',fontWeight:'400'}}>{requestMaker?.RequestDonorName?.value}</spam></h4>
                                <h4 style={{fontSize:'18px'}}>Request Maker Name: <spam style={{fontSize:'16px',fontWeight:'400'}}>{requestMaker?.Name?.value}</spam></h4>
                                <h4 style={{fontSize:'18px'}}>Email: <spam style={{fontSize:'16px',fontWeight:'400'}}>{requestMaker?.Email?.value}</spam></h4>
                                <h4 style={{fontSize:'18px'}}>Gender: <spam style={{fontSize:'16px',fontWeight:'400'}}>{requestMaker?.Gender?.value}</spam></h4>
                                <h4 style={{fontSize:'18px'}}>Blood Group: <spam style={{fontSize:'16px',fontWeight:'400'}}>{requestMaker?.Blood_Group?.value}</spam></h4>
                                <h4 style={{fontSize:'18px'}}>City: <spam style={{fontSize:'16px',fontWeight:'400'}}>{requestMaker?.City?.value}</spam></h4>
                                <h4 style={{fontSize:'18px'}}>Contact No: <spam style={{fontSize:'16px',fontWeight:'400'}}>{requestMaker?.Contact?.value}</spam></h4>
                                <h4 style={{fontSize:'18px'}}>Hospital: <spam style={{fontSize:'16px',fontWeight:'400'}}>{requestMaker?.Hospital?.value}</spam></h4>
                                <h4 style={{fontSize:'18px'}}>Location: <spam style={{fontSize:'16px',fontWeight:'400'}}>{requestMaker?.Location?.value}</spam></h4>
                                <h4 style={{fontSize:'18px'}}>Message: <spam style={{fontSize:'16px',fontWeight:'400'}}>{requestMaker?.Message?.value}</spam></h4>
                            </>
                        ) : (
                            <>
                                <h4 style={{fontSize:'18px'}}>Request Maker Name: <spam style={{fontSize:'16px',fontWeight:'400'}}>{requestMaker?.Name?.value}</spam></h4>
                                <h4 style={{fontSize:'18px'}}>Email: <spam style={{fontSize:'16px',fontWeight:'400'}}>{requestMaker?.Email?.value}</spam></h4>
                                <h4 style={{fontSize:'18px'}}>Gender: <spam style={{fontSize:'16px',fontWeight:'400'}}>{requestMaker?.Gender?.value}</spam></h4>
                                <h4 style={{fontSize:'18px'}}>Blood Group: <spam style={{fontSize:'16px',fontWeight:'400'}}>{requestMaker?.Blood_Group?.value}</spam></h4>
                                <h4 style={{fontSize:'18px'}}>City: <spam style={{fontSize:'16px',fontWeight:'400'}}>{requestMaker?.City?.value}</spam></h4>
                                <h4 style={{fontSize:'18px'}}>Contact No: <spam style={{fontSize:'16px',fontWeight:'400'}}>{requestMaker?.Contact?.value}</spam></h4>
                                <h4 style={{fontSize:'18px'}}>Hospital: <spam style={{fontSize:'16px',fontWeight:'400'}}>{requestMaker?.Hospital?.value}</spam></h4>
                                <h4 style={{fontSize:'18px'}}>Location: <spam style={{fontSize:'16px',fontWeight:'400'}}>{requestMaker?.Location?.value}</spam></h4>
                                <h4 style={{fontSize:'18px'}}>Message: <spam style={{fontSize:'16px',fontWeight:'400'}}>{requestMaker?.Message?.value}</spam></h4>
                            </>
                        )}
                        
                    </Col>
                    <Col sm={5}>
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

export default RequestMakerDetails;