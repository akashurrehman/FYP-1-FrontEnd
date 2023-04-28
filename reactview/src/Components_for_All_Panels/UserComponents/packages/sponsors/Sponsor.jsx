import React from "react";
import { Container, Button } from "react-bootstrap";
import { Form, Row, Col, Card, ListGroup, Nav,Dropdown,DropdownButton,InputGroup,Modal } from "react-bootstrap";
import UserPanelHeader from "../../UserPanelHeader";
import UserPanelFooter from "../../UserPanelFooter";

import { Search,ArrowRight,Trash } from 'react-bootstrap-icons';

import '../../css/style.css';
import SingleSponsor from "./SingleSponsor";
import packageService from "../../../../Services/Api/User/PackageService";

const Sponsor = () => {

    const [sponsors, setSponsors] = React.useState([]);

    const getData = () => {
        packageService
            .getSponsors()
            .then((data) => {
                setSponsors(data);
            })
            .catch((err) => {
                console.log(err);
        });
    };
    React.useEffect(getData, []);
    console.log(sponsors.results);
    
    return ( <div>
        <UserPanelHeader></UserPanelHeader>
        <div style={{marginTop:'9%',marginBottom:'3%'}}>
            <Container style={{textAlign:'center',width:'50%'}}>
                <Row>
                    <h2 style={{fontWeight:"bold",color:"rgb(160, 15, 15)",fontFamily:"cursive",}}>Find a available Sponsors</h2>
                    <p style={{fontWeight:"300"}}>The average person puts only 25% of his energy into his work. The world takes off its hat to those who put in more than 50% of their capacity, and stands on its head for those few and far between souls who devote 100%.</p>
                </Row>
            </Container>
        </div>


        <div style={{width:'99.1%',marginBottom:'13%'}}>
            {sponsors.length === 0 ? (
                    <p>There are no Sponsors</p>
                ) : (
                    <Row className="d-flex justify-content-center m-5">
                
                        {sponsors?.results?.bindings?.map((sponsor, index) => (
                            <Col sm={4} key={index}>
                                <SingleSponsor key={index} sponsor={sponsor} />
                            </Col>
                        ))}
                    
                    </Row>
                )}
        </div>

        
        
        

        <UserPanelFooter></UserPanelFooter>

    </div> );
}
 
export default Sponsor;