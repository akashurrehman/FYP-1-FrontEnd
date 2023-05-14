import React, { useEffect, useState } from "react";

import { Container, Button } from "react-bootstrap";
import { Row, Col, Card, ListGroup} from "react-bootstrap";

import CardImage1 from "../../../Public/user/image/Avatar.JPG";
import { ArrowRight } from 'react-bootstrap-icons';

import '../css/style.css';
import { Link } from "react-router-dom";
import axios from "axios";
import jwtDecode from "jwt-decode";
import userService from "../../../Services/Api/User/UserService";
import { toast } from "react-toastify";
import userLoginService from "../../../Services/Api/User/UserLoginService";




const SingleRequestMaker = (props) => {

    //Get id from token 
    const token = localStorage.getItem('token');
    const decodedToken = token ? jwtDecode(token) : null;
    const id = decodedToken?.id;
    console.log(id);

    //For updating values in request table
    const donatedBy = id;
    const [donorName, setDonorName] = useState();
    const [personID, setPersonID] = useState();

    const { requestMaker } = props;
    // console.log(props);

    const getUserData = () => {
        userService
            .getSingleUser(donatedBy)
            .then((data) => {
                setDonorName(data?.results?.bindings?.[0]?.Name?.value);
            })
            .catch((err) => {
                console.log(err);
        });
    };

    const getPersonNameFromRequestMakerTabel = () => {
        const name = requestMaker.PersonName.value;
        setPersonID(name.substring(name.lastIndexOf("#") + 1));
    };

    useEffect(()=>{getUserData();getPersonNameFromRequestMakerTabel();}, []);

    const [isHover, setIsHover] = React.useState(true);

    const handleMouseEnter = () => {
        setIsHover(false);
    };

    const handleMouseLeave = () => {
        setIsHover(true);
    };
    const ButtonStyle1 = {
        backgroundColor: isHover ? 'rgb(160, 15, 15)' : 'white',
        color: isHover ? 'white' : 'rgb(160, 15, 15)',
        transform: isHover ? 'scale(0.8)' : 'scale(0.8)',
        border: isHover ? '' : '1px solid rgb(160, 15, 15)',
        transitionDuration: isHover ? '' : '0.45s',
    };

    const updateRequest = async (e) => {
        try {
            await axios.put('http://localhost:8081/api/users/accept/bloodRequest/' + requestMaker.ID.value, {
                donatedBy, donorName
            });
        } 
        catch (error) {
            if (error.response) {
                console.log(error.response.data.error);
            } 
            else {
                console.log('An error occurred');
            }
        }
    }

    return ( <div>
        <Container className='d-flex justify-content-center' style={{paddingTop:'0%',paddingBottom:'5%'}}>
            
                <div className='d-flex' style={{}}>
                        
                        <Row className="" style={{marginBottom:"5%"}}>
                            <Col sm={12}>
                                <Card className="UserCard" border="secondary" style={{ width: '22rem' }}>
                                    <Row>
                                        <Col sm={8} style={{paddingLeft: '7%',paddingTop: '5%',textAlign:'left'}}>
                                            <Card.Title><h4 className='TextCursive' style={{color:'rgb(116, 10, 10)'}}>{requestMaker.Blood_Group.value}</h4></Card.Title>
                                        </Col>
                                        <Col className='' sm={3} style={{marginRight:'0%',marginTop: '3%'}}>
                                            <Card.Img className="" variant="top" src={CardImage1} width="0%" height="60rem" style={{borderRadius:'40%',border: "solid rgb(116, 10, 10)"}}/>
                                            
                                        </Col>
                                    </Row>
                                    <Card.Body>
                                        <Card.Text>
                                        <p style={{marginTop:'-10%'}}><strong className='TextCursive' style={{color:'#635f5f'}}>Requested by: </strong>{requestMaker.Name.value}</p>
                                        <p style={{marginTop:'-5.5%'}}><strong className='TextCursive' style={{color:'#635f5f'}}>Email: </strong>{requestMaker.Email.value}</p>
                                        <p style={{marginTop:'-5.5%'}}><strong className='TextCursive' style={{color:'#635f5f'}}>City: </strong>{requestMaker.City.value}</p>
                                        </Card.Text>
                                        
                                        <Card.Text>
                                            <p style={{textAlign:'justify',marginTop:'-3%',height:'40px'}}>
                                            <strong className='TextCursive' style={{color:'#635f5f'}}>Message: </strong>{requestMaker.Message.value}</p>
                                        </Card.Text>
                                        
                                        <Link to={{ pathname: `/user/request-maker-details/${requestMaker.ID.value}`, state: { requestMaker } }} className='d-flex justify-content-end TextColor' style={{marginBottom:'-2%',textDecoration:'none',fontSize:'14px',fontWeight:'600'}}>
                                            View Details <ArrowRight className="m-1" size={16} />
                                        </Link>
                                    
                                        <ListGroup className="list-group-flush">
                                            <ListGroup.Item></ListGroup.Item>
                                            <ListGroup.Item><div className='d-flex justify-content-center' style={{marginBottom:'-6%'}}>

                                                {requestMaker.RequestDonatedBy.value !== 'null' ? (
                                                    <>
                                                        <p style={{color:'green'}}>Donated By: {requestMaker?.RequestDonorName?.value}</p>
                                                    </>
                                                ) : (
                                                    <>
                                                        <Button variant="default" style={ButtonStyle1} 
                                                            onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} 
                                                            onClick={() => {
                                                                if(userLoginService.isLoggedIn()){
                                                                    if(personID !== donatedBy){
                                                                        updateRequest();
                                                                        window.location.reload();
                                                                    }
                                                                    else{
                                                                        toast.error("Sorry! You cannot donate to this blood request because its posted by you.", {
                                                                            closeOnClick: true,
                                                                            pauseOnHover: true,
                                                                            position: toast.POSITION.BOTTOM_RIGHT,
                                                                        });
                                                                    }
                                                                }
                                                                else{
                                                                    toast.error("Kindly login for making donation.", {
                                                                        closeOnClick: true,
                                                                        pauseOnHover: true,
                                                                        position: toast.POSITION.BOTTOM_RIGHT,
                                                                    });
                                                                }
                                                                
                                                            }}>Donate & Save Life
                                                        </Button>
                                                    </>
                                                )}
                                                
                                            </div></ListGroup.Item>
                                        </ListGroup>

                                    </Card.Body>
                                </Card>
                            </Col>
                            
                        </Row>
                    
                </div>
                
        </Container>


    </div> );
}

export default SingleRequestMaker;