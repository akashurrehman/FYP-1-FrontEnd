import React from "react";
import { Container, Button } from "react-bootstrap";
import { Form, Row, Col, Card, ListGroup, Nav,Dropdown,DropdownButton,InputGroup,Modal } from "react-bootstrap";
import UserPanelHeader from "../../UserPanelHeader";
import UserPanelFooter from "../../UserPanelFooter";

import { Search,ArrowRight,Trash } from 'react-bootstrap-icons';

import '../../css/style.css';
import SingleNews from "./SingleNews";
import packageService from "../../../../Services/Api/User/PackageService";

const News = () => {

    const [news, setNews] = React.useState([]);

    const getData = () => {
        packageService
            .getNews()
            .then((data) => {
                setNews(data);
            })
            .catch((err) => {
                console.log(err);
        });
    };
    React.useEffect(getData, []);
    console.log(news.results);

    return ( <div>
        <UserPanelHeader></UserPanelHeader>
        <div style={{marginTop:'9%',marginBottom:'3%'}}>
            <Container style={{textAlign:'center',width:'50%'}}>
                <Row>
                    <h2 style={{fontWeight:"bold",color:"rgb(160, 15, 15)",fontFamily:"cursive",}}>Find a available Latest News</h2>
                    <p style={{fontWeight:"300"}}>The average person puts only 25% of his energy into his work. The world takes off its hat to those who put in more than 50% of their capacity, and stands on its head for those few and far between souls who devote 100%.</p>
                </Row>
            </Container>
        </div>


        <div style={{width:'99.1%',marginBottom:'13%'}}>
            {news.length === 0 ? (
                    <p>There are no Job Posts</p>
                ) : (
                    <Row className="d-flex justify-content-center m-5">
                
                        {news?.results?.bindings?.map((news, index) => (
                            <Col sm={4} key={index}>
                                <SingleNews key={index} news={news} />
                            </Col>
                        ))}
                    
                    </Row>
                )}
        </div>

        
        
        

        <UserPanelFooter></UserPanelFooter>

    </div> );
}
 
export default News;