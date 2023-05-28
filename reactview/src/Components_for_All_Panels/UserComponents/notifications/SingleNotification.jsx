import React from "react";

import { Container, Button } from "react-bootstrap";
import { Row, Col, Image } from "react-bootstrap";
import image from '../../../Public/user/image/profile.jpg';
import CircleSharpIcon from '@mui/icons-material/CircleSharp';
import '../css/style.css';

const SingleNotification = (props) => {

    const { notification, history } = props;
    console.log(props);


    return ( <div>
        <Container style={{}}>
            <div style={{paddingTop:'3%',paddingLeft:'0%',paddingRight:'0%',marginTop:'-2%'}}>
                <Row className=''>
                    <Col sm={1}>
                        <div>
                            <Image src={image} rounded style={{height: "2.5rem",opacity:'1.0'}}></Image>
                        </div>
                    </Col>
                    <Col sm={11}>
                        <Row>
                            <Col sm={11}>
                                <p className='PurpleColor' style={{marginLeft:'3%',marginTop:'0%'}}>{notification.Message.value}</p>
                            </Col>
                            <Col sm={1}>
                                <div style={{marginTop:'-30%'}}>
                                    <CircleSharpIcon sx={{ color: '#27213C', mr:0 , my: 0,fontSize:'small' }} />
                                </div>
                            </Col>
                        </Row>
                        <Row className=''>
                            <Col sm={6}>
                                <p className='PurpleColor' style={{marginLeft:'7%',marginTop:'-6%',marginBottom:'4%',textAlign:'left',fontSize:'10.5px',fontFamily:'cursive'}}>{notification.Day.value}  ({notification.Time.value})</p>
                            </Col>
                            <Col sm={6}>
                                <p className='PurpleColor' style={{marginLeft:'0%',marginTop:'-6%',marginBottom:'4%',textAlign:'right',fontSize:'10.5px',fontFamily:'cursive'}}>{notification.Date.value}</p>
                            </Col>
                        </Row>
                    </Col>
                </Row>
                
            </div>
        </Container>


    </div> );
}

export default SingleNotification;