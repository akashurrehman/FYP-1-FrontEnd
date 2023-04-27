import React from "react";
import { Container, Button, Image } from "react-bootstrap";
import { Form, Row, Col, InputGroup, FloatingLabel } from "react-bootstrap";
import UserPanelHeader from "./UserPanelHeader";
import UserPanelFooter from "./UserPanelFooter";
import image from '../../Public/user/image/CoverImage1.jpg';
import { Envelope,PersonAdd, Hospital,Phone,Chat,Droplet,ArrowRight, HouseDoor, GeoAlt,Telephone } from 'react-bootstrap-icons';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

import AccountCircle from '@mui/icons-material/PersonSharp';
import EmailIcon from '@mui/icons-material/EmailSharp';
import LocalHospitalIcon from '@mui/icons-material/LocalPharmacySharp';
import BloodtypeSharpIcon from '@mui/icons-material/BloodtypeSharp';
import LocationOnSharpIcon from '@mui/icons-material/LocationOnSharp';
import ContactsSharpIcon from '@mui/icons-material/ContactsSharp';
import LocationCitySharpIcon from '@mui/icons-material/LocationCitySharp';
import ChatSharpIcon from '@mui/icons-material/ChatSharp';
import WcSharpIcon from '@mui/icons-material/WcSharp';

import './css/style.css';


const BloodAnalysis = () => {

    const [age, setAge] = React.useState();
    const [sex, setSex] = React.useState();
    const [wbc, setWBC] = React.useState();
    const [rbc, setRBC] = React.useState();
    const [plt, setPLT] = React.useState();
    const [hgb, setHGB] = React.useState();
    const [diabetes, setDiabetes] = React.useState();
    const [stds, setSTDs] = React.useState();
    const [syphilis, setSyphilis] = React.useState();
    const [aids, setAIDs] = React.useState();

    //Form Validation
    const [validated, setValidated] = React.useState(false);
    const handleSubmit = (event) => {
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
        }
        else {
            storeData();
        }
        setValidated(true);
    };

    //Store Data In Database(API)
    const storeData = () => {
        console.log("Send API call");
        
    };

    

    //Button Stylings
    const [isHover, setIsHover] = React.useState(true);
    const handleMouseEnter = () => {
        setIsHover(false);
    };
    const handleMouseLeave = () => {
        setIsHover(true);
    };
    const ButtonStyle = {
        backgroundColor: isHover ? 'rgb(160, 15, 15)' : 'white',
        color: isHover ? 'white' : 'rgb(160, 15, 15)',
        transform: isHover ? 'scale(0.84)' : 'scale(0.84)',
        border: isHover ? '' : '1px solid rgb(160, 15, 15)',
        transitionDuration: isHover ? '' : '0.1s',
    };
    
    return ( <div>
        <UserPanelHeader></UserPanelHeader>

        <div 
            style={{
                backgroundColor: "white",color: "",
                height: "90%", marginTop:'7%',
                marginLeft: "22%",textAlign: "center",
                width:"55%",fontFamily: "Arial",opacity: "1"
        }}>
            <Container>
                <Row className='mt-0 mb-5 p-1'>
                    <Col sm={12} className='LoginContainerCol'>
                        <h4 className="TextColor" style={{fontFamily:'cursive'}}>Check your eligibility</h4>
                        <p className="justify-content mb-3 mt-3" style={{fontSize:'13px'}}>
                            "Dear Donor!", Your donation changes lives. But not everyone can donate blood (including plasma), for a few reasons. Check your eligibility to donate today.
                        </p>
                        <Form noValidate validated={validated} onSubmit={handleSubmit}>
                            <Row>
                                <Col sm={6}>
                                    <InputGroup size="sm" className="mb-3" hasValidation>
                                        <InputGroup.Text id="inputGroup-sizing-default">
                                            <AccountCircle sx={{ color: 'action.active', mr:0 , my: 0 }}/>
                                        </InputGroup.Text>
                                        <Form.Control
                                            required
                                            aria-label="Default"
                                            aria-describedby="inputGroup-sizing-default" type="number" placeholder="Age*" 
                                            value={age}
                                            onChange={(e) => {
                                                setAge(e.target.value);
                                            }}
                                        />
                                        <Form.Control.Feedback type="invalid">
                                            Please provide a valid name.
                                        </Form.Control.Feedback>
                                    </InputGroup>
                                </Col>
                            
                                <Col sm={6}>
                                    <InputGroup size="sm" className="mb-3" hasValidation>
                                        <InputGroup.Text id="inputGroup-sizing-default">
                                            <WcSharpIcon sx={{ color: 'action.active', mr:0 , my: 0 }}/>
                                        </InputGroup.Text>
                                        
                                        <Form.Select required 
                                            value={sex} 
                                            onChange={(e) => setSex(e.target.value)}
                                        >
                                            <option value="">Sex*</option>
                                            <option value={0}>Male</option>
                                            <option value={1}>Female</option>
                                        </Form.Select> 
                                        <Form.Control.Feedback type="invalid">
                                            Please provide a valid gender.
                                        </Form.Control.Feedback>
                                            
                                    </InputGroup>
                                </Col>
                            </Row>
                            <Row>
                                <Col sm={6}>
                                    <InputGroup size="sm" className="mb-3" hasValidation>
                                        <InputGroup.Text id="inputGroup-sizing-default">
                                            <AccountCircle sx={{ color: 'action.active', mr:0 , my: 0 }}/>
                                        </InputGroup.Text>
                                        <Form.Control
                                            required
                                            aria-label="Default"
                                            aria-describedby="inputGroup-sizing-default" type="number" placeholder="White Blood Cell*" 
                                            value={wbc}
                                            onChange={(e) => {
                                                setWBC(e.target.value);
                                            }}
                                        />
                                        <Form.Control.Feedback type="invalid">
                                            Please provide a valid name.
                                        </Form.Control.Feedback>
                                    </InputGroup>
                                </Col>
                                <Col sm={6}>
                                    <InputGroup size="sm" className="mb-3" hasValidation>
                                        <InputGroup.Text id="inputGroup-sizing-default">
                                            <AccountCircle sx={{ color: 'action.active', mr:0 , my: 0 }}/>
                                        </InputGroup.Text>
                                        <Form.Control
                                            required
                                            aria-label="Default"
                                            aria-describedby="inputGroup-sizing-default" type="number" placeholder="Red Blood Cell*" 
                                            value={rbc}
                                            onChange={(e) => {
                                                setRBC(e.target.value);
                                            }}
                                        />
                                        <Form.Control.Feedback type="invalid">
                                            Please provide a valid name.
                                        </Form.Control.Feedback>
                                    </InputGroup>
                                </Col>
                            </Row>
                            <Row>
                            <Col sm={6}>
                                    <InputGroup size="sm" className="mb-3" hasValidation>
                                        <InputGroup.Text id="inputGroup-sizing-default">
                                            <AccountCircle sx={{ color: 'action.active', mr:0 , my: 0 }}/>
                                        </InputGroup.Text>
                                        <Form.Control
                                            required
                                            aria-label="Default"
                                            aria-describedby="inputGroup-sizing-default" type="number" placeholder="Platelet*" 
                                            value={plt}
                                            onChange={(e) => {
                                                setPLT(e.target.value);
                                            }}
                                        />
                                        <Form.Control.Feedback type="invalid">
                                            Please provide a valid name.
                                        </Form.Control.Feedback>
                                    </InputGroup>
                                </Col>
                                <Col sm={6}>
                                    <InputGroup size="sm" className="mb-3" hasValidation>
                                        <InputGroup.Text id="inputGroup-sizing-default">
                                            <AccountCircle sx={{ color: 'action.active', mr:0 , my: 0 }}/>
                                        </InputGroup.Text>
                                        <Form.Control
                                            required
                                            aria-label="Default"
                                            aria-describedby="inputGroup-sizing-default" type="number" placeholder="HGB*" 
                                            value={hgb}
                                            onChange={(e) => {
                                                setHGB(e.target.value);
                                            }}
                                        />
                                        <Form.Control.Feedback type="invalid">
                                            Please provide a valid name.
                                        </Form.Control.Feedback>
                                    </InputGroup>
                                </Col>
                            </Row>
                            
                            <Row>
                                <Col sm={6}>
                                    <InputGroup size="sm" className="mb-3" hasValidation>
                                        <InputGroup.Text id="inputGroup-sizing-default">
                                            <WcSharpIcon sx={{ color: 'action.active', mr:0 , my: 0 }}/>
                                        </InputGroup.Text>
                                        
                                        <Form.Select required 
                                            value={diabetes} 
                                            onChange={(e) => setDiabetes(e.target.value)}
                                        >
                                            <option value="">Diabetes*</option>
                                            <option value={1}>Yes</option>
                                            <option value={0}>No</option>
                                        </Form.Select> 
                                        <Form.Control.Feedback type="invalid">
                                            Please provide a valid gender.
                                        </Form.Control.Feedback>
                                            
                                    </InputGroup>
                                </Col>
                                <Col sm={6}>
                                    <InputGroup size="sm" className="mb-3" hasValidation>
                                        <InputGroup.Text id="inputGroup-sizing-default">
                                            <WcSharpIcon sx={{ color: 'action.active', mr:0 , my: 0 }}/>
                                        </InputGroup.Text>
                                        
                                        <Form.Select required 
                                            value={stds} 
                                            onChange={(e) => setSTDs(e.target.value)}
                                        >
                                            <option value="">STDs*</option>
                                            <option value={1}>Yes</option>
                                            <option value={0}>No</option>
                                        </Form.Select> 
                                        <Form.Control.Feedback type="invalid">
                                            Please provide a valid gender.
                                        </Form.Control.Feedback>
                                            
                                    </InputGroup>
                                </Col>
                            </Row>
                            
                            <Row>
                                <Col sm={6}>
                                    <InputGroup size="sm" className="mb-3" hasValidation>
                                        <InputGroup.Text id="inputGroup-sizing-default">
                                            <WcSharpIcon sx={{ color: 'action.active', mr:0 , my: 0 }}/>
                                        </InputGroup.Text>
                                        
                                        <Form.Select required 
                                            value={syphilis} 
                                            onChange={(e) => setSyphilis(e.target.value)}
                                        >
                                            <option value="">Syphilis*</option>
                                            <option value={1}>Yes</option>
                                            <option value={0}>No</option>
                                        </Form.Select> 
                                        <Form.Control.Feedback type="invalid">
                                            Please provide a valid gender.
                                        </Form.Control.Feedback>
                                            
                                    </InputGroup>
                                </Col>
                                <Col sm={6}>
                                    <InputGroup size="sm" className="mb-3" hasValidation>
                                        <InputGroup.Text id="inputGroup-sizing-default">
                                            <WcSharpIcon sx={{ color: 'action.active', mr:0 , my: 0 }}/>
                                        </InputGroup.Text>
                                        
                                        <Form.Select required 
                                            value={aids} 
                                            onChange={(e) => setAIDs(e.target.value)}
                                        >
                                            <option value="">AIDs*</option>
                                            <option value={1}>Yes</option>
                                            <option value={0}>No</option>
                                        </Form.Select> 
                                        <Form.Control.Feedback type="invalid">
                                            Please provide a valid gender.
                                        </Form.Control.Feedback>
                                            
                                    </InputGroup>
                                </Col>
                            </Row>

                            <Row className="mt-2" style={{textAlign:'right'}}>
                                <Col sm={12}>
                                <Button variant="default" type='submit' style={ButtonStyle} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} 
                                >Check Eligibility <ArrowRight className="" size={17} /></Button>
                                </Col>
                            </Row>
                        </Form>
                    </Col>
                </Row>
            </Container>
        </div>
        
        <div style={{textAlign:'right',marginTop:'20%',color:'rgb(160, 15, 15)',marginBottom:'50%'}}>
            
        </div>
    
        <UserPanelFooter></UserPanelFooter>
    </div> );
}

export default BloodAnalysis;