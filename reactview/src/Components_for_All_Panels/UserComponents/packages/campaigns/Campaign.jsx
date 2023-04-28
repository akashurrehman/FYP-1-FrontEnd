import React from "react";
import { Container, Button } from "react-bootstrap";
import { Form, Row, Col, Card, ListGroup, Nav,Dropdown,DropdownButton,InputGroup,Modal } from "react-bootstrap";
import UserPanelHeader from "../../UserPanelHeader";
import UserPanelFooter from "../../UserPanelFooter";

import { Search,ArrowRight,Trash } from 'react-bootstrap-icons';

import '../../css/style.css';
import SingleCampaign from "./SingleCampaign";
import packageService from "../../../../Services/Api/User/PackageService";

const Campaign = () => {

    const [campaigns, setCampaigns] = React.useState([]);

    const getData = () => {
        packageService
            .getCampaigns()
            .then((data) => {
                setCampaigns(data);
            })
            .catch((err) => {
                console.log(err);
        });
    };
    React.useEffect(getData, []);
    console.log(campaigns.results);
    
    return ( <div>
        <UserPanelHeader></UserPanelHeader>
        <div style={{marginTop:'9%',marginBottom:'3%'}}>
            <Container style={{textAlign:'center',width:'50%'}}>
                <Row>
                    <h2 style={{fontWeight:"bold",color:"rgb(160, 15, 15)",fontFamily:"cursive",}}>Find a available Campaigns</h2>
                    <p style={{fontWeight:"300"}}>The average person puts only 25% of his energy into his work. The world takes off its hat to those who put in more than 50% of their capacity, and stands on its head for those few and far between souls who devote 100%.</p>
                </Row>
            </Container>
        </div>


        <div style={{width:'99.1%',marginBottom:'13%'}}>
            {campaigns.length === 0 ? (
                    <p>There are no Campaigns</p>
                ) : (
                    <Row className="d-flex justify-content-center m-5">
                
                        {campaigns?.results?.bindings?.map((campaign, index) => (
                            <Col sm={4} key={index}>
                                <SingleCampaign key={index} campaign={campaign} />
                            </Col>
                        ))}
                    
                    </Row>
                )}
        </div>

        
        
        

        <UserPanelFooter></UserPanelFooter>

    </div> );
}
 
export default Campaign;