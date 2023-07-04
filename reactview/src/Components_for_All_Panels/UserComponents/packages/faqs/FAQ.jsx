import React from "react";
import { Container, Button } from "react-bootstrap";
import { Row, Col } from "react-bootstrap";
import UserPanelHeader from "../../UserPanelHeader";
import UserPanelFooter from "../../UserPanelFooter";

import '../../css/style.css';
import SingleFAQ from "./SingleFAQ";
import packageService from "../../../../Services/Api/User/PackageService";

const FAQ = () => {

    const [faqs, setFAQs] = React.useState([]);

    const getData = () => {
        packageService
            .getFAQs()
            .then((data) => {
                setFAQs(data);
            })
            .catch((err) => {
                console.log(err);
        });
    };
    React.useEffect(getData, []);
    console.log(faqs.results);



    
    
    return ( <div>
        <UserPanelHeader></UserPanelHeader>
        <div style={{marginTop:'9%',marginBottom:'3%'}}>
            <Container style={{textAlign:'center',width:'50%'}}>
                <Row>
                    <h2 className='RedColor' style={{fontWeight:"bold",fontFamily:"cursive",}}>Find a frequently asked questions</h2>
                    <p style={{fontWeight:"300"}}>It’s normal to have some questions about donating. We may already have an answer ready for you below. Keeping donors and the patients who receive blood safe is vital for us. That’s why there are some criteria to donate blood.</p>
                </Row>
            </Container>
        </div>


        <div style={{width:'99.1%',marginBottom:'2%'}}>
            {faqs.length === 0 ? (
                    <p>There are no FAQs</p>
                ) : (
                    <Row className="d-flex justify-content-center m-1">
                
                        {faqs?.results?.bindings?.map((faq, index) => (
                            <Col sm={12} key={index}>
                                <SingleFAQ key={index} faq={faq} />
                            </Col>
                        ))}
                    
                    </Row>
                )}
        </div>

        
        
        

        <UserPanelFooter></UserPanelFooter>

    </div> );
}
 
export default FAQ;