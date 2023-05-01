import React from "react";
import { Container, Button, Image } from "react-bootstrap";
import { Form, Row, Col, InputGroup, FloatingLabel, OverlayTrigger, Popover } from "react-bootstrap";
import UserPanelHeader from "./UserPanelHeader";
import UserPanelFooter from "./UserPanelFooter";
import image from '../../Public/user/image/CoverImage1.jpg';
import { Envelope,PersonAdd, Hospital,Phone,Chat,Droplet,ArrowRight, HouseDoor, GeoAlt,Telephone } from 'react-bootstrap-icons';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';


import EscalatorWarningSharpIcon from '@mui/icons-material/EscalatorWarningSharp';
import BloodtypeSharpIcon from '@mui/icons-material/BloodtypeSharp';
import BloodtypeOutlinedIcon from '@mui/icons-material/BloodtypeOutlined';
import WcSharpIcon from '@mui/icons-material/WcSharp';
import GrainSharpIcon from '@mui/icons-material/GrainSharp';
import AnimationSharpIcon from '@mui/icons-material/AnimationSharp';
import CoronavirusSharpIcon from '@mui/icons-material/CoronavirusSharp';
import AcUnitSharpIcon from '@mui/icons-material/AcUnitSharp';
import Diversity2SharpIcon from '@mui/icons-material/Diversity2Sharp';
import HubSharpIcon from '@mui/icons-material/HubSharp';
import axios from "axios";
import { toast } from "react-toastify";

import './css/style.css';

const BloodAnalysis = () => {

    const [age, setAge] = React.useState();
    const [sex, setSex] = React.useState();
    const [wbc, setWBC] = React.useState();
    const [rbc, setRBC] = React.useState();
    const [plt, setPLT] = React.useState();
    const [HGB, setHGB] = React.useState();
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
            submitForm();
        }
        setValidated(true);
    };

    const submitForm = async (e) => {
        console.log(age,sex,wbc,rbc,plt,HGB,diabetes,stds,syphilis,aids);
        e.preventDefault(); 
        
        try {
            const response = await axios.post('http://localhost:5000/predictions', {
                age, sex, wbc, rbc, plt, HGB, diabetes, stds, syphilis, aids
            });
            // window.location.href = "/user/blood-analysis";
            console.log(response.data.output);
            if (response.data.output == "Donor is eligible for blood donation") {
                console.log(response.data.output);
                toast.success(response.data.output, {
                    closeOnClick: true,
                    pauseOnHover: true,
                    position: toast.POSITION.BOTTOM_RIGHT,});
            }
            else {
                console.log(response.data.output);
                toast.error(response.data.output, {
                    closeOnClick: true,
                    pauseOnHover: true,
                    position: toast.POSITION.BOTTOM_RIGHT,});
            } 
        }
        catch (error) {
            if (error.response) {
                console.log(error.response.data.error);
                toast.error(error.response.data.error, {
                    closeOnClick: true,
                    pauseOnHover: true,
                    position: toast.POSITION.BOTTOM_RIGHT,});
            } 
            else {
                console.log('An error occurred');
            }
        }
    }



    

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
                                    <OverlayTrigger
                                        trigger={['hover', 'focus']}
                                        placement="left"
                                        overlay={
                                        <Popover id="aids-popover">
                                            <Popover.Body>
                                                Enter correct value Age. How old are you?
                                            </Popover.Body>
                                        </Popover>
                                        }
                                    >
                                    <InputGroup size="sm" className="mb-3" hasValidation>
                                        <InputGroup.Text id="inputGroup-sizing-default">
                                            <EscalatorWarningSharpIcon sx={{ color: 'action.active', mr:0 , my: 0 }}/>
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
                                    </OverlayTrigger>
                                </Col>
                            
                                <Col sm={6}>
                                    <OverlayTrigger
                                        trigger={['hover', 'focus']}
                                        placement="right"
                                        overlay={
                                        <Popover id="aids-popover" style={{ backgroundColor: 'white', color: 'black',  }}>
                                            <Popover.Body>
                                                Select your gender.
                                            </Popover.Body>
                                        </Popover>
                                        }
                                    >
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
                                    </OverlayTrigger>
                                </Col>
                            </Row>
                            <Row>
                                <Col sm={6}>
                                    <OverlayTrigger
                                        trigger={['hover', 'focus']}
                                        placement="left"
                                        overlay={
                                        <Popover id="aids-popover">
                                            <Popover.Body>
                                                Enter correct value of White Blood Cell Level in body.
                                            </Popover.Body>
                                        </Popover>
                                        }
                                    >
                                    <InputGroup size="sm" className="mb-3" hasValidation>
                                        <InputGroup.Text id="inputGroup-sizing-default">
                                            <BloodtypeOutlinedIcon sx={{ color: 'action.active', mr:0 , my: 0 }}/>
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
                                    </OverlayTrigger>
                                </Col>
                                <Col sm={6}>
                                    <OverlayTrigger
                                        trigger={['hover', 'focus']}
                                        placement="right"
                                        overlay={
                                        <Popover id="aids-popover">
                                            <Popover.Body>
                                                Enter correct value of Red Blood Cells Level in body.
                                            </Popover.Body>
                                        </Popover>
                                        }
                                    >
                                    <InputGroup size="sm" className="mb-3" hasValidation>
                                        <InputGroup.Text id="inputGroup-sizing-default">
                                            <BloodtypeSharpIcon sx={{ color: 'action.active', mr:0 , my: 0 }}/>
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
                                    </OverlayTrigger>
                                </Col>

                            </Row>
                            <Row>
                                <Col sm={6}>
                                    <OverlayTrigger
                                        trigger={['hover', 'focus']}
                                        placement="left"
                                        overlay={
                                        <Popover id="aids-popover">
                                            <Popover.Body>
                                                Enter correct value of Platelets Level in body.
                                            </Popover.Body>
                                        </Popover>
                                        }
                                    >
                                    <InputGroup size="sm" className="mb-3" hasValidation>
                                        <InputGroup.Text id="inputGroup-sizing-default">
                                            <GrainSharpIcon sx={{ color: 'action.active', mr:0 , my: 0 }}/>
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
                                    </OverlayTrigger>
                                </Col>
                                <Col sm={6}>
                                    <OverlayTrigger
                                        trigger={['hover', 'focus']}
                                        placement="right"
                                        overlay={
                                        <Popover id="aids-popover">
                                            <Popover.Body>
                                                Enter correct value of Hemoglobin Level in body.
                                            </Popover.Body>
                                        </Popover>
                                        }
                                    >
                                    <InputGroup size="sm" className="mb-3" hasValidation>
                                        <InputGroup.Text id="inputGroup-sizing-default">
                                            <AnimationSharpIcon sx={{ color: 'action.active', mr:0 , my: 0 }}/>
                                        </InputGroup.Text>
                                        <Form.Control
                                            required
                                            aria-label="Default"
                                            aria-describedby="inputGroup-sizing-default" type="number" placeholder="HGB*" 
                                            value={HGB}
                                            onChange={(e) => {
                                                setHGB(e.target.value);
                                            }}
                                        />
                                        <Form.Control.Feedback type="invalid">
                                            Please provide a valid name.
                                        </Form.Control.Feedback>
                                    </InputGroup>
                                    </OverlayTrigger>
                                </Col>
                            </Row>
                            
                            <Row>
                                <Col sm={6}>
                                    <OverlayTrigger
                                        trigger={['hover', 'focus']}
                                        placement="left"
                                        overlay={
                                        <Popover id="aids-popover">
                                            <Popover.Body>
                                                Select "Yes" if the person has Diabetes, or "No" if they do not have AIDS.
                                            </Popover.Body>
                                        </Popover>
                                        }
                                    >
                                        <InputGroup size="sm" className="mb-3" hasValidation>
                                            <InputGroup.Text id="inputGroup-sizing-default">
                                                <CoronavirusSharpIcon sx={{ color: 'action.active', mr:0 , my: 0 }}/>
                                            </InputGroup.Text>
                                            
                                            <Form.Select
                                                required
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
                                    </OverlayTrigger>
                                </Col>
                                <Col sm={6}>
                                    <OverlayTrigger
                                        trigger={['hover', 'focus']}
                                        placement="right"
                                        overlay={
                                        <Popover id="aids-popover">
                                            <Popover.Body>
                                                Select "Yes" if the person has STDs, or "No" if they do not have AIDS.
                                            </Popover.Body>
                                        </Popover>
                                        }
                                    >
                                        <InputGroup size="sm" className="mb-3" hasValidation>
                                            <InputGroup.Text id="inputGroup-sizing-default">
                                                <AcUnitSharpIcon sx={{ color: 'action.active', mr:0 , my: 0 }}/>
                                            </InputGroup.Text>
                                            
                                            <Form.Select
                                                required
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
                                    </OverlayTrigger>
                                </Col>
                            </Row>

                            
                            <Row>
                                <Col sm={6}>
                                    <OverlayTrigger
                                        trigger={['hover', 'focus']}
                                        placement="left"
                                        overlay={
                                        <Popover id="aids-popover">
                                            <Popover.Body>
                                                Select "Yes" if the person has Syphilis, or "No" if they do not have AIDS.
                                            </Popover.Body>
                                        </Popover>
                                        }
                                    >
                                        <InputGroup size="sm" className="mb-3" hasValidation>
                                            <InputGroup.Text id="inputGroup-sizing-default">
                                                <Diversity2SharpIcon sx={{ color: 'action.active', mr:0 , my: 0 }}/>
                                            </InputGroup.Text>
                                            
                                            <Form.Select
                                                required
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
                                    </OverlayTrigger>
                                </Col>
                                <Col sm={6}>
                                    <OverlayTrigger
                                        trigger={['hover', 'focus']}
                                        placement="right"
                                        overlay={
                                        <Popover id="aids-popover">
                                            <Popover.Body>
                                                Select "Yes" if the person has AIDS, or "No" if they do not have AIDS.
                                            </Popover.Body>
                                        </Popover>
                                        }
                                    >
                                        <InputGroup size="sm" className="mb-3" hasValidation>
                                            <InputGroup.Text id="inputGroup-sizing-default">
                                                <HubSharpIcon sx={{ color: 'action.active', mr:0 , my: 0 }}/>
                                            </InputGroup.Text>
                                            
                                            <Form.Select
                                                required
                                                value={aids}
                                                onChange={(e) => setAIDs(e.target.value)}
                                            >
                                                <option value="">AIDS*</option>
                                                <option value={1}>Yes</option>
                                                <option value={0}>No</option>
                                            </Form.Select>
                                            
                                            <Form.Control.Feedback type="invalid">
                                                Please provide a valid gender.
                                            </Form.Control.Feedback>
                                        </InputGroup>
                                    </OverlayTrigger>
                                </Col>
                            </Row>

                            <Row className="mt-2" style={{textAlign:'right'}}>
                                <Col sm={12}>
                                <Button variant="default" type='submit' style={ButtonStyle} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} onClick={submitForm}
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