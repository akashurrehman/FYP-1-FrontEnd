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

const FAQDetails = () => {

    const { id } = useParams();
    const [faq, setFAQ] = useState();

    const getData = () => {
        packageService
            .getSingleFAQ(id)
            .then((data) => {
                setFAQ(data?.results?.bindings?.[0]);
            })
            .catch((err) => {
                console.log(err);
        });
    };

    
    useEffect(()=> getData, []);
    console.log(faq?.Title);

    return ( <div>
        <UserPanelHeader></UserPanelHeader>
        <div style={{marginTop:'9%',marginBottom:'4%'}}>
            <Container style={{width:'60%'}}>
                <Row style={{textAlign:'center',marginBottom:'5%'}}>
                    <Col sm={12}>
                        <h2 className="RedColor" style={{fontWeight:"bold",fontFamily:"cursive",}}>Frequently Asked Question Details</h2>  
                        <p style={{fontWeight:"300"}}>It’s normal to have some questions about donating. We may already have an answer ready for you below. Keeping donors and the patients who receive blood safe is vital for us. That’s why there are some criteria to donate blood.</p>
                    </Col>
                </Row>
            </Container>
            <Container>
                <Row style={{marginBottom:'10%'}}>
                    <Col sm={6}>
                        <h4 style={{fontSize:'20px'}}>FAQ Title: <spam style={{fontSize:'16px',fontWeight:'400'}}>{faq?.Title?.value}</spam></h4>
                        <h4 style={{fontSize:'20px'}}>FAQ Details: <spam style={{fontSize:'16px',fontWeight:'400'}}>{faq?.Details?.value}</spam></h4>
                        
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

export default FAQDetails;