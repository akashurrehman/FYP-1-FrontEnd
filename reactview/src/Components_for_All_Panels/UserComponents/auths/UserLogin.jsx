import React from "react";
import { Container, Button } from "react-bootstrap";
import { Form, Row, Col, InputGroup, FloatingLabel } from "react-bootstrap";
import UserPanelHeader from "../UserPanelHeader";
import UserPanelFooter from "../UserPanelFooter";
import image from '../../../Public/user/image/Image1.png';
import { Envelope,Lock,Google,Facebook,Twitter,Instagram,ArrowRight } from 'react-bootstrap-icons';
import { CDBFooter, CDBFooterLink, CDBBox, CDBBtn, CDBIcon } from 'cdbreact';


import '../css/style.css';

const UserLogin = () => {
    return ( 
    <div>
    <UserPanelHeader></UserPanelHeader>
    <Container>
        <Row className='LoginContainerRow mb-5'>
            <Col sm={6} className='LoginContainerCol'>
                <h2 className="TextColor TextCursive">LOGIN to Account</h2>
                <p className="justify-content">
                    You can view your blood donations, blood requests, or other features after signing in. By selecting your login method, 
                    you can log in with your User ID (assigned on sign up time), your username or your e-mail address.
                </p>
                <Form>
                
                    <InputGroup className="mb-3">
                        <InputGroup.Text id="basic-addon1">
                            <Envelope className="IconColor" size={26} />
                        </InputGroup.Text>
                        <FloatingLabel controlId="floatingEmail" label="Email">
                            <Form.Control type="email" placeholder="Email" required />
                        </FloatingLabel>
                    </InputGroup>
                
                    <InputGroup className="mb-3">
                        <InputGroup.Text id="basic-addon1">
                            <Lock className="IconColor" size={26} />
                        </InputGroup.Text>
                        <FloatingLabel controlId="floatingPassword" label="Password">
                            <Form.Control type="password" placeholder="Password" required />
                        </FloatingLabel>

                    </InputGroup>

                    <Row>
                        <Col sm={9}>
                            <Form.Group className="mb-3" controlId="formBasicCheckbox">
                                <Form.Check type="checkbox" label="Keep Logged In" />
                            </Form.Group>
                        </Col>
                        <Col sm={3}>
                            <a href="/user/contact-us" className="TextColor">Forgot Password?</a>
                        </Col>
                    </Row>
                    
                    <Row className="mt-3">
                        <Col sm={7}>
                            <Button className="" variant="flat" type="submit" >
                                <b>Login</b> <ArrowRight className="" size={25} />
                            </Button>
                        </Col>
                        <Col sm={5}>
                            Don't have a account? <a href="/user/register" className="TextColor TextCursive">SIGN UP</a>
                        </Col>
                    </Row>
                    
                    <p className="mt-5">Or you can join with : </p>

                    <Google className="AppSocialMediaIcon" size={33} />
                    <Instagram className="AppSocialMediaIcon" size={33} />
                    <Facebook className="AppSocialMediaIcon" size={33} />
                    <Twitter className="AppSocialMediaIcon" size={33} />
                    
                    {/* <CDBBox display="flex" className="mt-4">
                        <Button className="mx-1" variant='flatSolid'><CDBIcon fab icon="facebook-f" /></Button>
                        <Button className="mx-1" variant='flatSolid'><CDBIcon fab icon="twitter" /></Button>
                        <Button className="mx-1" variant='flatSolid'><CDBIcon fab icon="instagram" /></Button>
                        <Button className="mx-1" variant='flatSolid'><CDBIcon fab icon="google" /></Button>

                    </CDBBox> */}
                    
                </Form>
            </Col>
            <Col sm={6} className="">
                <img className="" src={image} alt="img" width="105%" height="110%" style={{opacity:'0.6'}} />
            </Col>
        </Row>
    </Container>
    <div style={{marginBottom:'10%'}}></div>
    <UserPanelFooter></UserPanelFooter>
    </div>
    );
}
 
export default UserLogin;