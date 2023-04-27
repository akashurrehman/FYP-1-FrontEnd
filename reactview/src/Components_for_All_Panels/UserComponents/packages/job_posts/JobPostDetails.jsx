import React, { useEffect, useState } from "react";
import { Container, Button } from "react-bootstrap";
import { Form, Row, Col, Card, ListGroup, Nav,Dropdown,DropdownButton,InputGroup,Modal } from "react-bootstrap";
import UserPanelHeader from "../../UserPanelHeader";
import UserPanelFooter from "../../UserPanelFooter";
import { useParams } from 'react-router-dom';
import { Search,ArrowRight,Trash } from 'react-bootstrap-icons';

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
        <div style={{marginTop:'10%',marginBottom:'4%'}}>
            <Container className='d-flex justify-content-center'>
                <Row>
                    <Col sm={12}>
                        <h1 style={{fontWeight:"bold",color:"rgb(160, 15, 15)",fontFamily:"cursive",}}>Find a available donors near you</h1>
                        <h4>Title: {jobPosts?.Title?.value}</h4>
                    </Col>
                </Row>
                
            </Container>
        </div>
        
        <UserPanelFooter></UserPanelFooter>

    </div> );
};

export default JobPostDetails;