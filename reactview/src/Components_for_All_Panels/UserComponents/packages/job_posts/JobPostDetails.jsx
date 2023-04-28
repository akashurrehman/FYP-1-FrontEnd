import React, { useEffect, useState } from "react";
import { Container, Button,Image } from "react-bootstrap";
import { Form, Row, Col, Card, ListGroup, Nav,Dropdown,DropdownButton,InputGroup,Modal } from "react-bootstrap";
import UserPanelHeader from "../../UserPanelHeader";
import UserPanelFooter from "../../UserPanelFooter";
import { useParams } from 'react-router-dom';
import { Search,ArrowRight,Trash } from 'react-bootstrap-icons';
import image from '../../../../Public/user/image/jobpost.png';
import '../../css/style.css';
import packageService from "../../../../Services/Api/User/PackageService";

const JobPostDetails = () => {

    const { id } = useParams();
    const [jobPosts, setJobPosts] = useState();

    const getData = () => {
        packageService
            .getSingleJobPost(id)
            .then((data) => {
                setJobPosts(data?.results?.bindings?.[0]);
            })
            .catch((err) => {
                console.log(err);
        });
    };

    
    useEffect(()=> getData, []);
    console.log(jobPosts?.Title);

    return ( <div>
        <UserPanelHeader></UserPanelHeader>
        <div style={{marginTop:'9%',marginBottom:'4%'}}>
            <Container>
                <Row style={{textAlign:'center',marginBottom:'5%'}}>
                    <Col sm={12}>
                        <h2 style={{fontWeight:"bold",color:"rgb(160, 15, 15)",fontFamily:"cursive",}}>Job Post Details</h2>  
                    </Col>
                </Row>
                <Row style={{marginBottom:'10%'}}>
                    <Col sm={6}>
                        <h4 style={{fontSize:'20px'}}>Job Title: <spam style={{fontSize:'16px',fontWeight:'400'}}>{jobPosts?.Title?.value}</spam></h4>
                        <h4 style={{fontSize:'20px'}}>Job Description: <spam style={{fontSize:'16px',fontWeight:'400'}}>{jobPosts?.Details?.value}</spam></h4>
                        <h4 style={{fontSize:'20px'}}>Posting Date: <spam style={{fontSize:'16px',fontWeight:'400'}}>{jobPosts?.Date?.value}</spam></h4>
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

export default JobPostDetails;