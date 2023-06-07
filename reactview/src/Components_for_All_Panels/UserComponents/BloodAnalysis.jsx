import React, { useState } from "react";
import { Container, Button, Image, Nav } from "react-bootstrap";
import { Form, Row, Col, InputGroup, FloatingLabel, OverlayTrigger, Popover } from "react-bootstrap";
import UserPanelHeader from "./UserPanelHeader";
import UserPanelFooter from "./UserPanelFooter";
import image from '../../Public/user/image/blood-donation-eligibility-quiz-icon.png';
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
import CongratulationBox from "./CongratulationBox";
import jwtDecode from "jwt-decode";

const BloodAnalysis = () => {

    //Get id from token 
    const token = localStorage.getItem('token');
    const decodedToken = token ? jwtDecode(token) : null;
    const id = decodedToken?.id;
    console.log(id);

    const role = decodedToken?.role;

    const authCentre=()=>{
      if(role!='USER'){
        window.location.href = "/user/login";
      }
        console.log("authCentre");
    }

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

    const [eligibilityStatus, setEligibilityStatus] = useState("Eligible");

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
            event.preventDefault();
        }
        setValidated(true);
    };

    const submitForm = async (e) => {
        try {
            const response = await axios.post('http://localhost:5000/predictions', {
                age, sex, wbc, rbc, plt, HGB, diabetes, stds, syphilis, aids
            });
            // window.location.href = "/user/blood-analysis";
            console.log(response.data.output);
            if (response.data.output == "Donor is eligible for blood donation") {
                // console.log(response.data.output);
                console.log(eligibilityStatus);
                handleImageSubmit();

                if(id != null){
                    updateUserEligibilityStatus();
                }

                setShowCongratulationBox(true);
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

    React.useEffect(() => {
        authCentre();
    },[])


    const updateUserEligibilityStatus = async (e) => {
        try {
            const response = await axios.put('http://localhost:8081/api/users/edit/eligibilityStatus/' + id, {
                eligibilityStatus
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

    

    //Button Stylings
    const [isHover, setIsHover] = React.useState(true);
    const handleMouseEnter = () => {
        setIsHover(false);
    };
    const handleMouseLeave = () => {
        setIsHover(true);
    };
    const ButtonStyle = {
        backgroundColor: isHover ? '#D64045' : '#27213C',
        color: isHover ? 'white' : 'white',
        transform: isHover ? 'scale(0.84)' : 'scale(0.84)',
        border: isHover ? '' : '1px solid #27213C',
        transitionDuration: isHover ? '' : '0.1s',
    };


    const [showCongratulationBox, setShowCongratulationBox] = useState(false);

    const [selectedImage, setSelectedImage] = useState(null);
    const [message, setMessage] = useState("");
    

    const handleImageChange = (event) => {
        event.preventDefault();
        setSelectedImage(event.target.files[0]);
    };
    
    const handleImageSubmit = () => {
        const formData = new FormData();
        formData.append("image", selectedImage);
        console.log(selectedImage);   
        axios
            .post("http://localhost:3003/users/upload", formData)
            .then((res) => {
            console.log(res.data)
            setMessage(res.data.message);
            })
            .catch((error) => {
            setMessage(error.message);
            console.log("error",error)
            });
    };


    const getUserCBCReportData = async (e) => {
        //Get id from token 
        const token = localStorage.getItem('token');
        const decodedToken = token ? jwtDecode(token) : null;
        const userName = decodedToken?.name;
        console.log(userName);
        try {
            if(userName !== null){
                const response = await axios.get('http://localhost:8081/api/labs/getCBCdetails/byUserName/' + userName, {});
                console.log(response?.data?.results?.bindings?.[0]);
                toast.success('Congratulation! The system automatically fills the given fields according to your CBC report. This report is generated based on the blood sample that you gave to LAB.', {
                    closeOnClick: true,
                    pauseOnHover: true,
                    position: toast.POSITION.BOTTOM_RIGHT,});
                setAge(response?.data?.results?.bindings?.[0].Age?.value);
                setSex(response?.data?.results?.bindings?.[0].Sex?.value);
                setWBC(response?.data?.results?.bindings?.[0].WBC?.value);
                setRBC(response?.data?.results?.bindings?.[0].RBC?.value);
                setPLT(response?.data?.results?.bindings?.[0].PLT?.value);
                setHGB(response?.data?.results?.bindings?.[0].HGB?.value);
                setDiabetes(response?.data?.results?.bindings?.[0].Diabetes?.value);
                setSTDs(response?.data?.results?.bindings?.[0].STDs?.value);
                setSyphilis(response?.data?.results?.bindings?.[0].Syphilis?.value);
                setAIDs(response?.data?.results?.bindings?.[0].AIDs?.value);
            }
            else {
                toast.error('Please login for requesting your CBC reports details from LAB', {
                    closeOnClick: true,
                    pauseOnHover: true,
                    position: toast.POSITION.BOTTOM_RIGHT,});
            }
        } 
        catch (error) {
            if (error.response) {
                console.log(error.response.data.error);
                toast.info('Kindly give your blood sample to lab, then you will be able to get your CBC report details here', {
                    closeOnClick: true,
                    pauseOnHover: true,
                    theme: "colored",
                    position: toast.POSITION.BOTTOM_RIGHT,});
            }
            else {
                console.log('An error occurred');
            }
        }
    }
    

    const address = 'Lahore, Pakistan';
  
    const handleGeocode = async () => {
        
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
                        <Image src={image} rounded style={{marginBottom: "3%",marginTop:'-5%',height: "7rem",opacity:'1.0'}}></Image>
                        <h3 className="RedColor" style={{}}>Check Donor Strength 
                            
                            {/* <Button onClick={handleGeocode}>Get Coordinates</Button> */}
                        </h3>
                        <p className="justify-content mb-3 mt-3" style={{fontSize:'15px',color:'grey',fontFamily:'cursive'}}>
                            "Dear Donor!", Fill out this form according to your CBC Report (Complete Blood Count). Then check your strength for blood donation or booking appointment.
                            <Nav.Link className='RedColor' style={{fontWeight:'600',marginTop:'1%'}} onClick={getUserCBCReportData}>Request for a CBC Report Details from LAB</Nav.Link>
                        </p>
                        <Form noValidate validated={validated} onSubmit={handleSubmit}>
                            <Row>
                                <Col sm={6}>
                                    <div style={{textAlign:'left',marginBottom:'-2%'}}>
                                        <Form.Label className='PurpleColor'>Age <spam className='RedColor'>*</spam></Form.Label>
                                    </div>
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
                                            aria-describedby="inputGroup-sizing-default" type="number" placeholder="Enter age*" 
                                            value={age}
                                            onChange={(e) => {
                                                setAge(e.target.value);
                                            }}
                                        />
                                        <Form.Control.Feedback type="invalid">
                                            Please provide a valid age.
                                        </Form.Control.Feedback>
                                    </InputGroup>
                                    </OverlayTrigger>
                                </Col>
                            
                                <Col sm={6}>
                                    <div style={{textAlign:'left',marginBottom:'-2%'}}>
                                        <Form.Label className='PurpleColor'>Sex <spam className='RedColor'>*</spam></Form.Label>
                                    </div>
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
                                            <option value="">Select gender*</option>
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
                                    <div style={{textAlign:'left',marginBottom:'-2%'}}>
                                        <Form.Label className='PurpleColor'>White Blood Cell <spam className='RedColor'>*</spam></Form.Label>
                                    </div>
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
                                            aria-describedby="inputGroup-sizing-default" type="number" placeholder="Enter White Blood Cell Count*" 
                                            value={wbc}
                                            onChange={(e) => {
                                                setWBC(e.target.value);
                                            }}
                                        />
                                        <Form.Control.Feedback type="invalid">
                                            Please provide a valid white blood cell count.
                                        </Form.Control.Feedback>
                                    </InputGroup>
                                    </OverlayTrigger>
                                </Col>
                                <Col sm={6}>
                                    <div style={{textAlign:'left',marginBottom:'-2%'}}>
                                        <Form.Label className='PurpleColor'>Red Blood Cell <spam className='RedColor'>*</spam></Form.Label>
                                    </div>
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
                                            aria-describedby="inputGroup-sizing-default" type="number" placeholder="Enter Red Blood Cell Count*" 
                                            value={rbc}
                                            onChange={(e) => {
                                                setRBC(e.target.value);
                                            }}
                                        />
                                        <Form.Control.Feedback type="invalid">
                                            Please provide a valid red blood cell count.
                                        </Form.Control.Feedback>
                                    </InputGroup>
                                    </OverlayTrigger>
                                </Col>

                            </Row>
                            <Row>
                                <Col sm={6}>
                                    <div style={{textAlign:'left',marginBottom:'-2%'}}>
                                        <Form.Label className='PurpleColor'>Platelets <spam className='RedColor'>*</spam></Form.Label>
                                    </div>
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
                                            aria-describedby="inputGroup-sizing-default" type="number" placeholder="Enter Platelets Count*" 
                                            value={plt}
                                            onChange={(e) => {
                                                setPLT(e.target.value);
                                            }}
                                        />
                                        <Form.Control.Feedback type="invalid">
                                            Please provide a valid value of platelets.
                                        </Form.Control.Feedback>
                                    </InputGroup>
                                    </OverlayTrigger>
                                </Col>
                                <Col sm={6}>
                                    <div style={{textAlign:'left',marginBottom:'-2%'}}>
                                        <Form.Label className='PurpleColor'>Hemoglobin <spam className='RedColor'>*</spam></Form.Label>
                                    </div>
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
                                            aria-describedby="inputGroup-sizing-default" type="number" placeholder="Enter Hemoglobin(HGB) Level*" 
                                            value={HGB}
                                            onChange={(e) => {
                                                setHGB(e.target.value);
                                            }}
                                        />
                                        <Form.Control.Feedback type="invalid">
                                            Please provide a valid hemoglobin level.
                                        </Form.Control.Feedback>
                                    </InputGroup>
                                    </OverlayTrigger>
                                </Col>
                            </Row>
                            
                            <Row>
                                <Col sm={6}>
                                    <div style={{textAlign:'left',marginBottom:'-2%'}}>
                                        <Form.Label className='PurpleColor'>Diabetes <spam className='RedColor'>*</spam></Form.Label>
                                    </div>
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
                                                <option value="">Select Diabetes Status*</option>
                                                <option value={1}>Yes</option>
                                                <option value={0}>No</option>
                                            </Form.Select>
                                            
                                            <Form.Control.Feedback type="invalid">
                                                Please provide a valid diabetes status.
                                            </Form.Control.Feedback>
                                        </InputGroup>
                                    </OverlayTrigger>
                                </Col>
                                <Col sm={6}>
                                    <div style={{textAlign:'left',marginBottom:'-2%'}}>
                                        <Form.Label className='PurpleColor'>Sexually Transmitted Diseases <spam className='RedColor'>*</spam></Form.Label>
                                    </div>
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
                                                <option value="">Select STDs Status*</option>
                                                <option value={1}>Yes</option>
                                                <option value={0}>No</option>
                                            </Form.Select>
                                            
                                            <Form.Control.Feedback type="invalid">
                                                Please provide a valid STDS status.
                                            </Form.Control.Feedback>
                                        </InputGroup>
                                    </OverlayTrigger>
                                </Col>
                            </Row>

                            
                            <Row>
                                <Col sm={6}>
                                    <div style={{textAlign:'left',marginBottom:'-2%'}}>
                                        <Form.Label className='PurpleColor'>Syphilis <spam className='RedColor'>*</spam></Form.Label>
                                    </div>
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
                                                <option value="">Select Syphilis Status*</option>
                                                <option value={1}>Yes</option>
                                                <option value={0}>No</option>
                                            </Form.Select>
                                            
                                            <Form.Control.Feedback type="invalid">
                                                Please provide a valid Syphilis status.
                                            </Form.Control.Feedback>
                                        </InputGroup>
                                    </OverlayTrigger>
                                </Col>
                                <Col sm={6}>
                                    <div style={{textAlign:'left',marginBottom:'-2%'}}>
                                        <Form.Label className='PurpleColor'>Acquired Immunodeficiency Syndrome <spam className='RedColor'>*</spam></Form.Label>
                                    </div>
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
                                                style={{ 
                                                    backgroundColor: "#f5f5f5", 
                                                    color: "#333", 
                                                    border: "1px solid #ccc", 
                                                    
                                                }}
                                            >
                                                <option value="">Select AIDS Status*</option>
                                                <option value={1}>Yes</option>
                                                <option value={0}>No</option>
                                            </Form.Select>
                                            
                                            <Form.Control.Feedback type="invalid">
                                                Please provide a valid AIDS status.
                                            </Form.Control.Feedback>
                                        </InputGroup>
                                    </OverlayTrigger>
                                </Col>
                            </Row>

                            <Row className="mt-2" >
                                <Col sm={6}>
                                    <form>
                                        <div style={{textAlign:'left',marginBottom:'-2%'}}>
                                            <Form.Label className='PurpleColor'>Upload your CBC report <spam className='RedColor'>*</spam></Form.Label>
                                        </div>
                                        <input type="file" accept="image/*"  onChange={handleImageChange} />
                                        {message && <p>{message}</p>}
                                    </form>
                                </Col>
                                <Col className="mt-3" sm={6} style={{textAlign:'right'}}>
                                <Button variant="default" type='submit' style={ButtonStyle} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}
                                >Check Strength</Button>
                                </Col>
                            </Row>

                            <div>
                                {showCongratulationBox && (
                                    <CongratulationBox
                                    message="Congratulation! You are eligible for making blood donation."
                                    thirdButtonText="Donate"
                                    secondButtonText="Make Appointment"
                                    firstButtonText="Home Page"
                                    firstButton={() => {window.location.href = "/userpanel/HomeScreen";}}
                                    secondButton={() => {window.location.href = "/user/blood-donation-centre";}}
                                    thirdButton={() => {window.location.href = "/user/make-blood-donation";}}
                                    onCancel={()=>{setShowCongratulationBox(false);}}
                                    margin="34%"
                                    />
                                )}
                            </div>
                        </Form>
                    </Col>
                </Row>
            </Container>
        </div>
        
        
    
        <UserPanelFooter></UserPanelFooter>
    </div> );
}

export default BloodAnalysis;