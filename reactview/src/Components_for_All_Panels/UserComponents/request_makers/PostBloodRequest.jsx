import React from "react";
import { Container, Button } from "react-bootstrap";
import { Form, Row, Col, InputGroup, FloatingLabel } from "react-bootstrap";
import UserPanelHeader from "../UserPanelHeader";
import UserPanelFooter from "../UserPanelFooter";
import image from '../../../Public/user/image/PostBloodRequest.jpg';
import { Envelope,PersonAdd, Hospital,Phone,Chat,Droplet,ArrowRight, HouseDoor, GeoAlt,Telephone } from 'react-bootstrap-icons';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

const PostBloodRequest = () => {

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

        <div style={{position: "relative"}}>
            <div 
                style={{
                    backgroundImage:`url(${image})`,backgroundRepeat:'no-repeat',
                    backgroundSize:'cover',opacity: 0.8,paddingTop:"37%",marginBottom:"2%",backgroundColor: "",
                }}>
            </div>

            <div 
                style={{position: "absolute",
                    bottom: "20%",left: "5%",top: "27%",
                    backgroundColor: "white",color: "",
                    height: "80%",
                    marginLeft: "20px",textAlign: "center",
                    width:"55%",fontFamily: "Arial",opacity: "0.99"
            }}>
                <Container>
                    <Row className='mt-3 mb-5 p-1'>
                        <Col sm={12} className='LoginContainerCol'>
                            <h3 className="TextColor">Post Blood Request</h3>
                            <p className="justify-content mb-3 mt-3">
                                "Dear Request Maker!", your information is valuable to us. Please fill all the blanks. "*" Marked fields are mandatory!
                                When you fill out this form, the system will create your blood request. 
                                With your name and other details; you can view your posted blood requests!
                            </p>
                            <Form noValidate validated={validated} onSubmit={handleSubmit}>
                                <Row>
                                    <Col sm={6}>
                                        <InputGroup className="mb-3" hasValidation>
                                            <InputGroup.Text id="inputGroup-sizing-default">
                                                <PersonAdd className="IconColor" size={23} />
                                            </InputGroup.Text>
                                            <Form.Control
                                                required
                                                aria-label="Default"
                                                aria-describedby="inputGroup-sizing-default" type="number" placeholder="Age*" 
                                            />
                                            <Form.Control.Feedback type="invalid">
                                                Please provide a valid age.
                                            </Form.Control.Feedback>
                                        </InputGroup>
                                    </Col>
                                    <Col sm={6}>
                                        <InputGroup className="mb-3" hasValidation>
                                            <InputGroup.Text id="inputGroup-sizing-default">
                                                <Droplet className="IconColor" size={23} />
                                            </InputGroup.Text>
                                            <Form.Control
                                                required
                                                aria-label="Default" 
                                                aria-describedby="inputGroup-sizing-default" type="text" placeholder="Blood Group*" 
                                            />
                                            <Form.Control.Feedback type="invalid">
                                                Please provide a valid blood group.
                                            </Form.Control.Feedback>
                                        </InputGroup>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col sm={6}>
                                        <InputGroup className="mb-3" hasValidation>
                                            <InputGroup.Text id="inputGroup-sizing-default">
                                                <Hospital className="IconColor" size={23} />
                                            </InputGroup.Text>
                                            <Form.Control
                                                not-required
                                                aria-label="Default"
                                                aria-describedby="inputGroup-sizing-default" type="text" placeholder="Hospital / Blood Donation Centre" 
                                            />
                                            <Form.Control.Feedback type="invalid">
                                                
                                            </Form.Control.Feedback>
                                        </InputGroup>
                                    </Col>
                                    <Col sm={6}>
                                        <InputGroup className="mb-3" hasValidation>
                                            <InputGroup.Text id="inputGroup-sizing-default">
                                                <Envelope className="IconColor" size={23} />
                                            </InputGroup.Text>
                                            <Form.Control
                                                required
                                                aria-label="Default"
                                                aria-describedby="inputGroup-sizing-default" type="email" placeholder="Email*" 
                                            />
                                            <Form.Control.Feedback type="invalid">
                                                Please provide a valid email address.
                                            </Form.Control.Feedback>
                                        </InputGroup>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col sm={6}>
                                        <InputGroup className="mb-3" hasValidation>
                                            <InputGroup.Text id="inputGroup-sizing-default">
                                                <GeoAlt className="IconColor" size={23} />
                                            </InputGroup.Text>
                                            <Form.Control
                                                required
                                                aria-label="Default" 
                                                aria-describedby="inputGroup-sizing-default" type="city" placeholder="City*" 
                                            />
                                            <Form.Control.Feedback type="invalid">
                                                Please provide a valid city.
                                            </Form.Control.Feedback>
                                        </InputGroup>
                                    </Col>
                                    <Col sm={6}>
                                        <InputGroup className="mb-3" hasValidation>
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
                                    <Col sm={12}>
                                        <InputGroup className="mb-3" hasValidation>
                                            <InputGroup.Text id="inputGroup-sizing-default">
                                                <HouseDoor className="IconColor" size={23} />
                                            </InputGroup.Text>
                                            <Form.Control
                                                required
                                                aria-label="Default" 
                                                aria-describedby="inputGroup-sizing-default" type="address" placeholder="Address*" 
                                            />
                                            <Form.Control.Feedback type="invalid">
                                                Please provide a valid location/address.
                                            </Form.Control.Feedback>
                                        </InputGroup>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col sm={12}>
                                        <InputGroup className="mb-3" hasValidation>
                                            <InputGroup.Text id="inputGroup-sizing-default">
                                                <Chat className="IconColor" size={23} />
                                            </InputGroup.Text>
                                            <Form.Control
                                                aria-label="Default" as="textarea" rows={3} 
                                                aria-describedby="inputGroup-sizing-default" type="text" placeholder="Message" 
                                            />
                                            <Form.Control.Feedback type="invalid">
                                                
                                            </Form.Control.Feedback>
                                        </InputGroup>
                                    </Col>
                                </Row>
                                <Row className="mt-2" style={{textAlign:'right'}}>
                                    <Col sm={12}>
                                        <Button className="" variant="flatSolid" type="submit" >
                                            <b>Post Request</b> <ArrowRight className="" size={22} />
                                        </Button>
                                    </Col>
                                    
                                </Row>
                            </Form>
                        </Col>
                    </Row>
                </Container>
            </div>
            
        </div>

        <Container style={{ marginBottom:'2%'}}>
            <div style={{ width: 100, height: 100,marginLeft:'87%'}}>
                <CircularProgressbar value={66} text={111}
                    styles={buildStyles({
                    // Rotation of path and trail, in number of turns (0-1)
                    // rotation: 0.25,
                
                    // Whether to use rounded or flat corners on the ends - can use 'butt' or 'round'
                    // strokeLinecap: 'butt',
                
                    // Text size
                    textSize: '17px',
                
                    // How long animation takes to go from one percentage to another, in seconds
                    // pathTransitionDuration: 0.5,
                
                    // Can specify path transition in more detail, or remove it entirely
                    // pathTransition: 'none',
                
                    // Colors
                    pathColor: 'rgb(160, 15, 15)',
                    textColor: 'rgb(160, 15, 15)',
                    trailColor: '#d6d6d6',
                    backgroundColor: '#3e98c7',
                    })}
                />
                
            </div>
            <div style={{textAlign:'right',marginTop:'1%',color:'rgb(160, 15, 15)',marginBottom:'10%'}}>
                <h5 className="TextCursive">Available Request Makers</h5>
            </div>
        </Container>
        
        <UserPanelFooter></UserPanelFooter>
    </div> );
}
 
export default PostBloodRequest;