import React from "react";
import { Container, Button } from "react-bootstrap";
import { Form, Row, Col, InputGroup } from "react-bootstrap";
import UserPanelHeader from "../UserPanelHeader";
import background from '../../../Public/user/image/registration.jpg';
import '../css/style.css';

import { PersonFill,Envelope,Lock,Google,Facebook,Twitter,Instagram,Globe,Telephone,SignIntersection,Clock,Award, PersonCircle, HospitalFill, Calendar2Date, GeoAlt, HouseDoor, Calendar2Event, Geo } from 'react-bootstrap-icons';

const UserRegister = () => {

    const [formChanger,setFormChanger] = React.useState("false");

    const isBloodDonationCenter = () => {
        if(formChanger === "true"){
            return true;
        }
        else if (formChanger === "false"){
            return false;
        }
        
    }


    //Form Validation
    const [validated, setValidated] = React.useState(false);

    const handleSubmit = (event) => {
      const form = event.currentTarget;
      if (form.checkValidity() === false) {
        event.preventDefault();
        event.stopPropagation();
      }
  
      setValidated(true);
    };

    return ( <div>
        <UserPanelHeader></UserPanelHeader>
        <div style={{backgroundImage: `url(${background})`,backgroundRepeat: 'no-repeat',backgroundSize: 'cover',opacity:'1.0',width:'100%',height:'33rem',marginTop:'-1%'}}>

        <Container>
        <Row className='RegistrationContainerRow mb-5' >
            <Col sm={7} className='RegistrationContainerCol' style={{backgroundColor:'white',marginTop:'3%'}}> 
                <Row className="RowMargin">
                    <Col sm={2} className="UserChangerBox">
                        <Button variant="flat" type="submit" onClick={(e) => {
                            setFormChanger("false")
                            e.preventDefault();
                        }} >
                            <PersonCircle className="UserChangerBoxLogo" size={50} />
                            User
                        </Button>
                    </Col>
                    <Col sm={2} className="UserChangerBox">
                        <Button variant="flat" type="submit" onClick={(e) => {
                            setFormChanger("true")
                            e.preventDefault();
                        }} >
                            <HospitalFill className="UserChangerBoxLogo" size={50} />
                            Center
                        </Button>
                    </Col>
                </Row>

                <Form noValidate validated={validated} onSubmit={handleSubmit}>
                    {!isBloodDonationCenter() ? (
                        <>
                            <h5 className="TextColor">Personal Information</h5>
                            <Row>
                                <Col sm={12}>
                                    <InputGroup size="default" className="mb-2" hasValidation>
                                        <InputGroup.Text id="inputGroup-sizing-default">
                                            <PersonFill className="IconColor" size={23} />
                                        </InputGroup.Text>
                                        <Form.Control
                                            required
                                            aria-label="Default" 
                                            aria-describedby="inputGroup-sizing-default" type="name" placeholder="Full Name*" 
                                        />
                                        <Form.Control.Feedback type="invalid">
                                            Please provide a valid name.
                                        </Form.Control.Feedback>
                                    </InputGroup>
                                </Col>
                            </Row>   
                            <Row>
                                <Col sm={6}>
                                    <InputGroup className="mb-2" hasValidation>
                                        <InputGroup.Text id="inputGroup-sizing-default">
                                            <Calendar2Date className="IconColor" size={23} />
                                        </InputGroup.Text>
                                        <Form.Control
                                            required
                                            aria-label="Default" 
                                            aria-describedby="inputGroup-sizing-default" type="date" placeholder="Date of Birth*" 
                                        />
                                        <Form.Control.Feedback type="invalid">
                                            Please provide a valid date of birth.
                                        </Form.Control.Feedback>
                                    </InputGroup>
                                </Col>
                                <Col sm={6}>
                                    <InputGroup className="mb-3" hasValidation>
                                        <InputGroup.Text id="inputGroup-sizing-default">
                                            <Globe className="IconColor" size={23} />
                                        </InputGroup.Text>
                                        <Form.Control
                                            required
                                            aria-label="Default" 
                                            aria-describedby="inputGroup-sizing-default" type="text" placeholder="Nationality*" 
                                        />
                                        <Form.Control.Feedback type="invalid">
                                            Please provide a valid Nationality.
                                        </Form.Control.Feedback>
                                    </InputGroup>
                                </Col>
                            </Row>

                            <h5 className="TextColor">Contact Information</h5>
                            <Row>
                                <Col sm={6}>
                                    <InputGroup className="mb-2" hasValidation>
                                        <InputGroup.Text id="inputGroup-sizing-default">
                                            <Envelope className="IconColor" size={23} />
                                        </InputGroup.Text>
                                        <Form.Control
                                            required
                                            aria-label="Default" 
                                            aria-describedby="inputGroup-sizing-default" type="email" placeholder="Email*" 
                                        />
                                        <Form.Control.Feedback type="invalid">
                                            Please provide a valid Email.
                                        </Form.Control.Feedback>
                                    </InputGroup>
                                </Col>
                                <Col sm={6}>
                                    <InputGroup className="mb-2" hasValidation>
                                        <InputGroup.Text id="inputGroup-sizing-default">
                                            <Telephone className="IconColor" size={23} />
                                        </InputGroup.Text>
                                        <Form.Control
                                            required
                                            aria-label="Default" 
                                            aria-describedby="inputGroup-sizing-default" type="number" placeholder="Contact Number*" 
                                        />
                                        <Form.Control.Feedback type="invalid">
                                            Please provide a valid contact number.
                                        </Form.Control.Feedback>
                                    </InputGroup>
                                </Col>
                            </Row>
                            <Row>
                                <Col sm={6}>
                                    <InputGroup className="mb-2" hasValidation>
                                        <InputGroup.Text id="inputGroup-sizing-default">
                                            <GeoAlt className="IconColor" size={23} />
                                        </InputGroup.Text>
                                        <Form.Control
                                            required
                                            aria-label="Default" 
                                            aria-describedby="inputGroup-sizing-default" type="City" placeholder="City*" 
                                        />
                                        <Form.Control.Feedback type="invalid">
                                            Please provide a valid city.
                                        </Form.Control.Feedback>
                                    </InputGroup>
                                </Col>
                                <Col sm={6}>
                                    <InputGroup className="mb-2" hasValidation>
                                        <InputGroup.Text id="inputGroup-sizing-default">
                                            <HouseDoor className="IconColor" size={23} />
                                        </InputGroup.Text>
                                        <Form.Control
                                            required
                                            aria-label="Default" 
                                            aria-describedby="inputGroup-sizing-default" type="text" placeholder="Address*" 
                                        />
                                        <Form.Control.Feedback type="invalid">
                                            Please provide a valid Address.
                                        </Form.Control.Feedback>
                                    </InputGroup>
                                </Col>
                            </Row>

                            <h5 className="TextColor">Password Information</h5>
                            <Row>
                                <Col sm={6}>
                                    <InputGroup className="mb-2" hasValidation>
                                        <InputGroup.Text id="inputGroup-sizing-default">
                                            <Lock className="IconColor" size={23} />
                                        </InputGroup.Text>
                                        <Form.Control
                                            required
                                            aria-label="Default" 
                                            aria-describedby="inputGroup-sizing-default" type="password" placeholder="Password*" 
                                        />
                                        <Form.Control.Feedback type="invalid">
                                            Please provide a valid password.
                                        </Form.Control.Feedback>
                                    </InputGroup>
                                </Col>
                                <Col sm={6}>
                                    <InputGroup className="mb-2" hasValidation>
                                        <InputGroup.Text id="inputGroup-sizing-default">
                                            <Lock className="IconColor" size={23} />
                                        </InputGroup.Text>
                                        <Form.Control
                                            required
                                            aria-label="Default" 
                                            aria-describedby="inputGroup-sizing-default" type="password" placeholder="Confirm Password*" 
                                        />
                                        <Form.Control.Feedback type="invalid">
                                            Please provide a valid password.
                                        </Form.Control.Feedback>
                                    </InputGroup>
                                </Col>
                            </Row>
                        </>
                        ) : (
                        <>
                            <h5 className="TextColor">NGO's/Center Information</h5>
                            <Row>
                                <Col sm={12}>
                                    <InputGroup className="mb-2" hasValidation>
                                        <InputGroup.Text id="inputGroup-sizing-default">
                                            <HospitalFill className="IconColor" size={23} />
                                        </InputGroup.Text>
                                        <Form.Control
                                            required
                                            aria-label="Default" 
                                            aria-describedby="inputGroup-sizing-default" type="password" placeholder="Blood Donation Center Name*" 
                                        />
                                        <Form.Control.Feedback type="invalid">
                                            Please provide a valid center name.
                                        </Form.Control.Feedback>
                                    </InputGroup>
                                </Col>
                            </Row>   
                            <Row>
                                <Col sm={6}>
                                    <InputGroup className="mb-2" hasValidation>
                                        <InputGroup.Text id="inputGroup-sizing-default">
                                            <PersonFill className="IconColor" size={23} />
                                        </InputGroup.Text>
                                        <Form.Control
                                            required
                                            aria-label="Default" 
                                            aria-describedby="inputGroup-sizing-default" type="name" placeholder="Owner Name*" 
                                        />
                                        <Form.Control.Feedback type="invalid">
                                            Please provide a valid owner name.
                                        </Form.Control.Feedback>
                                    </InputGroup>
                                </Col>
                                <Col sm={6}>
                                    <InputGroup className="mb-2" hasValidation>
                                        <InputGroup.Text id="inputGroup-sizing-default">
                                            <Award className="IconColor" size={23} />
                                        </InputGroup.Text>
                                        <Form.Control
                                            required
                                            aria-label="Default" 
                                            aria-describedby="inputGroup-sizing-default" type="string" placeholder="License Number*" 
                                        />
                                        <Form.Control.Feedback type="invalid">
                                            Please provide a valid license number.
                                        </Form.Control.Feedback>
                                    </InputGroup>
                                </Col>
                            </Row>
                            <Row>
                                <Col sm={6}>
                                    <InputGroup className="mb-2" hasValidation>
                                        <InputGroup.Text id="inputGroup-sizing-default">
                                            <Globe className="IconColor" size={23} />
                                        </InputGroup.Text>
                                        <Form.Control
                                            required
                                            aria-label="Default" 
                                            aria-describedby="inputGroup-sizing-default" type="string" placeholder="Category*" 
                                        />
                                        <Form.Control.Feedback type="invalid">
                                            Please provide a valid category.
                                        </Form.Control.Feedback>
                                    </InputGroup>
                                </Col>
                                <Col sm={6}>
                                    <InputGroup className="mb-2" hasValidation>
                                        <InputGroup.Text id="inputGroup-sizing-default">
                                            <Calendar2Event className="IconColor" size={23} />
                                        </InputGroup.Text>
                                        <Form.Control
                                            required
                                            aria-label="Default" 
                                            aria-describedby="inputGroup-sizing-default" type="date" placeholder="Since*" 
                                        />
                                        <Form.Control.Feedback type="invalid">
                                            Please provide a valid date.
                                        </Form.Control.Feedback>
                                    </InputGroup>
                                </Col>
                            </Row>
                            <Row>
                                <Col sm={6}>
                                    <InputGroup className="mb-2" hasValidation>
                                        <InputGroup.Text id="inputGroup-sizing-default">
                                            <Clock className="IconColor" size={23} />
                                        </InputGroup.Text>
                                        <Form.Control
                                            required
                                            aria-label="Default" 
                                            aria-describedby="inputGroup-sizing-default" type="time" placeholder="From Timings*" 
                                        />
                                        <Form.Control.Feedback type="invalid">
                                            Please provide a valid time.
                                        </Form.Control.Feedback>
                                    </InputGroup>
                                </Col>
                                <Col sm={6}>
                                    <InputGroup className="mb-2" hasValidation>
                                        <InputGroup.Text id="inputGroup-sizing-default">
                                            <Clock className="IconColor" size={23} />
                                        </InputGroup.Text>
                                        <Form.Control
                                            required
                                            aria-label="Default" 
                                            aria-describedby="inputGroup-sizing-default" type="time" placeholder="To Timings*" 
                                        />
                                        <Form.Control.Feedback type="invalid">
                                            Please provide a valid time.
                                        </Form.Control.Feedback>
                                    </InputGroup>
                                </Col>
                            </Row>

                            <h5 className="TextColor">Contact Information</h5>
                            <Row>
                                <Col sm={6}>
                                    <InputGroup className="mb-2" hasValidation>
                                        <InputGroup.Text id="inputGroup-sizing-default">
                                            <Envelope className="IconColor" size={23} />
                                        </InputGroup.Text>
                                        <Form.Control
                                            required
                                            aria-label="Default" 
                                            aria-describedby="inputGroup-sizing-default" type="email" placeholder="Email*" 
                                        />
                                        <Form.Control.Feedback type="invalid">
                                            Please provide a valid email.
                                        </Form.Control.Feedback>
                                    </InputGroup>
                                </Col>
                                <Col sm={6}>
                                    <InputGroup className="mb-2" hasValidation>
                                        <InputGroup.Text id="inputGroup-sizing-default">
                                            <Telephone className="IconColor" size={23} />
                                        </InputGroup.Text>
                                        <Form.Control
                                            required
                                            aria-label="Default" 
                                            aria-describedby="inputGroup-sizing-default" type="number" placeholder="Contact Number*" 
                                        />
                                        <Form.Control.Feedback type="invalid">
                                            Please provide a valid contact number.
                                        </Form.Control.Feedback>
                                    </InputGroup>
                                </Col>
                            </Row>
                            <Row>
                                <Col sm={6}>
                                    <InputGroup className="mb-2" hasValidation>
                                        <InputGroup.Text id="inputGroup-sizing-default">
                                            <GeoAlt className="IconColor" size={23} />
                                        </InputGroup.Text>
                                        <Form.Control
                                            required
                                            aria-label="Default" 
                                            aria-describedby="inputGroup-sizing-default" type="text" placeholder="City*" 
                                        />
                                        <Form.Control.Feedback type="invalid">
                                            Please provide a valid city.
                                        </Form.Control.Feedback>
                                    </InputGroup>
                                </Col>
                                <Col sm={6}>
                                    <InputGroup className="mb-2" hasValidation>
                                        <InputGroup.Text id="inputGroup-sizing-default">
                                            <Geo className="IconColor" size={23} />
                                        </InputGroup.Text>
                                        <Form.Control
                                            required
                                            aria-label="Default" 
                                            aria-describedby="inputGroup-sizing-default" type="text" placeholder="Address*" 
                                        />
                                        <Form.Control.Feedback type="invalid">
                                            Please provide a valid address.
                                        </Form.Control.Feedback>
                                    </InputGroup>
                                </Col>
                            </Row>

                            <h5 className="TextColor">Password Information</h5>
                            <Row>
                                <Col sm={6}>
                                    <InputGroup className="mb-2" hasValidation>
                                        <InputGroup.Text id="inputGroup-sizing-default">
                                            <Lock className="IconColor" size={23} />
                                        </InputGroup.Text>
                                        <Form.Control
                                            required
                                            aria-label="Default" 
                                            aria-describedby="inputGroup-sizing-default" type="password" placeholder="Password*" 
                                        />
                                        <Form.Control.Feedback type="invalid">
                                            Please provide a valid password.
                                        </Form.Control.Feedback>
                                    </InputGroup>
                                
                                </Col>
                                <Col sm={6}>
                                    <InputGroup className="mb-2" hasValidation>
                                        <InputGroup.Text id="inputGroup-sizing-default">
                                            <Lock className="IconColor" size={23} />
                                        </InputGroup.Text>
                                        <Form.Control
                                            required
                                            aria-label="Default" 
                                            aria-describedby="inputGroup-sizing-default" type="password" placeholder="Password*" 
                                        />
                                        <Form.Control.Feedback type="invalid">
                                            Please provide a valid password.
                                        </Form.Control.Feedback>
                                    </InputGroup>
                                </Col>
                            </Row>
                        </>
                    )}
                    

                    <Row>
                        <Col sm={10}>
                            <Form.Group className="mb-3" controlId="formBasicCheckbox">
                                <Form.Check type="checkbox" label="Accept Term and Conditions" required/>
                            </Form.Group>
                        </Col>
                        <Col sm={2}>
                            <a href="/user/contact-us" className="TextColor">Need Help?</a>
                        </Col>
                    </Row>
                    
                    <Row className="mt-3">
                        <Col sm={8}>
                            <Button className="" variant="flat" type="submit" >
                                <b>Register</b> <SignIntersection className="" size={26} />
                            </Button>
                            <p>Already have a account? <a href="/user/login" className="TextColor">SIGN IN</a></p>
                        </Col>
                        <Col sm={5}>
                            
                        </Col>
                    </Row>
                   
                    <p className="mt-2">Or you can join with : </p>
                    <Google className="AppSocialMediaIcon" size={37} />
                    <Instagram className="AppSocialMediaIcon" size={37} />
                    <Facebook className="AppSocialMediaIcon" size={37} />
                    <Twitter className="AppSocialMediaIcon" size={37} />
                    
                </Form>
            </Col>

            <Col sm={5} className=""style={{backgroundColor:'',marginTop:'5%',paddingLeft:'6%'}}>
                <p style={{textAlign: "center", marginTop:"13%", color:"rgb(255,255,255)"}}>

                    {!isBloodDonationCenter() ? (
                        <>
                            <h3 className="TextCursive">Register as a Donor/Request Maker</h3>
                        </>
                    ) : (
                        <>
                            <h3 className="TextCursive">Register as a Blood Donation Center</h3>
                        </>
                    )}
                    

                    "Dear members!", your information is valuable to us. Please fill all the blanks. "*" Marked fields are mandatory!
                    When you fill out this form, the system will send you a OTP by SMS or e-mail. 
                    With your password; When you enter the system code with your donors that you can keep track of where 
                    and how to evaluate your donation!

                    {!isBloodDonationCenter() ? (
                    <>{/*<img className="" src={userimage} alt="img" width="60%" height="30%"/>*/}</>
                ) : (
                    <>{/*<img className="" src={centerimage} alt="img" width="60%" height="25%" />*/}</>
                )}
                </p>
                
                
                
            </Col>
        </Row>
        </Container>
        </div> 
    
    </div> );
}
 
export default UserRegister;