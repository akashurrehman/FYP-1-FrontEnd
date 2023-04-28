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

const FinancialDonationDetails = () => {

    const { id } = useParams();
    const [financialDonation, setFinancialDonation] = useState();

    const getData = () => {
        packageService
            .getSingleFinancialDonation(id)
            .then((data) => {
                setFinancialDonation(data?.results?.bindings?.[0]);
            })
            .catch((err) => {
                console.log(err);
        });
    };

    
    useEffect(()=> getData, []);
    console.log(financialDonation?.Name);

    return ( <div>
        <UserPanelHeader></UserPanelHeader>
        <div style={{marginTop:'9%',marginBottom:'4%'}}>
            <Container style={{width:'60%'}}>
                <Row style={{textAlign:'center',marginBottom:'5%'}}>
                    <Col sm={12}>
                        <h2 style={{fontWeight:"bold",color:"rgb(160, 15, 15)",fontFamily:"cursive",}}>Financial Donor Details</h2>  
                        <p style={{fontWeight:"300"}}>The average person puts only 25% of his energy into his work. The world takes off its hat to those who put in more than 50% of their capacity, and stands on its head for those few and far between souls who devote 100%.</p>
                    </Col>
                </Row>
            </Container>
            <Container>
                <Row style={{marginBottom:'10%'}}>
                    <Col sm={6}>
                        <h4 style={{fontSize:'20px'}}>Financial Donor Name: <spam style={{fontSize:'16px',fontWeight:'400'}}>{financialDonation?.Name?.value}</spam></h4>
                        <h4 style={{fontSize:'20px'}}>Donation Date: <spam style={{fontSize:'16px',fontWeight:'400'}}>{financialDonation?.Date?.value}</spam></h4>
                        <h4 style={{fontSize:'20px'}}>Contact No: <spam style={{fontSize:'16px',fontWeight:'400'}}>{financialDonation?.ContactNo?.value}</spam></h4>
                        <h4 style={{fontSize:'20px'}}>Amount: <spam style={{fontSize:'16px',fontWeight:'400'}}>{financialDonation?.Amount?.value}</spam></h4>
                        <h4 style={{fontSize:'20px'}}>Message: <spam style={{fontSize:'16px',fontWeight:'400'}}>{financialDonation?.Message?.value}</spam></h4>
                    
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

export default FinancialDonationDetails;