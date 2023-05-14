import React, { useEffect, useState } from "react";
import { Container, Button,Image, Modal } from "react-bootstrap";
import { Row, Col, Nav } from "react-bootstrap";
import UserPanelHeader from "../UserPanelHeader";
import UserPanelFooter from "../UserPanelFooter";
import { useParams } from 'react-router-dom';
import { ArrowRight, CheckCircleFill, House, HouseDoorFill, PrinterFill, XCircleFill } from 'react-bootstrap-icons';
import image from '../../../Public/user/image/makeAppointment.jpg';
import '../css/style.css';

import centreService from "../../../Services/Api/User/BloodDonationCentreService";
import userService from "../../../Services/Api/User/UserService";
import jwtDecode from "jwt-decode";

import axios from 'axios';
import { toast } from 'react-toastify';
import ConfirmationBox from "../ConfirmationBox";

const MakeAppointment = () => {

    //Get Centre ID from url
    const { centreID } = useParams();

    //Get User ID from token
    const token = localStorage.getItem('token');
    const decodedToken = jwtDecode(token);
    const userID = decodedToken?.id;
    // console.log(userID);

    const [centre, setCentre] = useState();
    const [user, setUser] = useState();

    const [donorName, setDonorName] = React.useState("");
    const [donorDOB, setDonorDOB] = React.useState("");
    const [donorEmail, setDonorEmail] = React.useState("");
    const [donorContactNo, setDonorContactNo] = React.useState("");
    const [donorGender, setDonorGender] = React.useState("");
    const [donorAddress, setDonorAddress] = React.useState("");
    const [donorCity, setDonorCity] = React.useState("");
    const [donorBloodGroup, setDonorBloodGroup] = React.useState("");
    const [centreName, setCentreName] = React.useState("");
    const [centreTimings, setCentreTimings] = React.useState("");
    const [centreContactNo, setCentreContactNo] = React.useState("");
    const [centreEmail, setCentreEmail] = React.useState("");
    const [centreLocation, setCentreLocation] = React.useState("");

    const getUserData = () => {
        userService
            .getSingleUser(userID)
            .then((data) => {
                setUser(data?.results?.bindings?.[0]);
                setDonorName(data?.results?.bindings?.[0]?.Name?.value);
                setDonorDOB(data?.results?.bindings?.[0]?.DOB?.value);
                setDonorEmail(data?.results?.bindings?.[0]?.Email?.value);
                setDonorContactNo(data?.results?.bindings?.[0]?.ContactNo?.value);
                setDonorGender(data?.results?.bindings?.[0]?.Gender?.value);
                setDonorAddress(data?.results?.bindings?.[0]?.Address?.value);
                setDonorCity(data?.results?.bindings?.[0]?.City?.value);
                setDonorBloodGroup(data?.results?.bindings?.[0]?.BloodGroup?.value);
            })
            .catch((err) => {
                console.log(err);
        });
    };

    const getCentreData = () => {
        centreService
            .getSingleCentre(centreID)
            .then((data) => {
                setCentre(data?.results?.bindings?.[0]);
                setCentreName(data?.results?.bindings?.[0]?.Name?.value);
                setCentreLocation(data?.results?.bindings?.[0]?.Location?.value);
                setCentreContactNo(data?.results?.bindings?.[0]?.ContactNo?.value);
                setCentreTimings(data?.results?.bindings?.[0]?.Timings?.value);
                setCentreEmail(data?.results?.bindings?.[0]?.Email?.value);
            })
            .catch((err) => {
                console.log(err);
        });
    };



    useEffect(()=>{getUserData();getCentreData();}, []);
    console.log(centre);
    console.log(user);
    // console.log(donorName);

    const submitForm = async (e) => {
        // e.preventDefault();
        // const confirmed = window.confirm('Are you sure you want to delete?');
        
        try {
            if(user?.EligibilityStatus?.value == 'Eligible'){
                const response = await axios.post('http://localhost:8081/api/user/appointment/AppointmentDetails/add', {
                    centreID,userID,donorName,donorDOB,donorEmail,donorContactNo,donorGender,donorAddress,donorCity,donorBloodGroup,centreName,centreEmail,centreLocation,centreTimings,centreContactNo
                });
                console.log(response.data);
                handleShow();
            }
            else{
                toast.error(<ErrorToastMakeBloodAnalysis />, {
                    closeOnClick: true,
                    pauseOnHover: true,
                    position: toast.POSITION.BOTTOM_RIGHT,
                    className: 'custom-toast',
                });
            }
            
        } 
        catch (error) {
            if (error.response) {
                console.log(error.response.data.error);
                toast.error(error.response.data.error, {
                    closeOnClick: true,
                    pauseOnHover: true,
                    position: toast.POSITION.BOTTOM_RIGHT,
                });
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
        border: isHover ? '' : '',
        transitionDuration: isHover ? '' : '0.1s',
    };
    
    const ErrorToastMakeBloodAnalysis = ({ closeToast }) => (
        <div>
            <p><strong className='TextColor'>Sorry!</strong> Kindly check your eligibility status for blood donation. </p>
            <div style={{textAlign:'right'}}>
                <Nav.Link className='RedColor' href='/user/blood-analysis'>Make blood analysis  <ArrowRight className="" size={16} /></Nav.Link>
            </div>
        </div>
    );

    const [showConfirmationBox, setShowConfirmationBox] = useState(false);
    const handleDeleteButtonClick = () => {
        setShowConfirmationBox(true);
    };
    const handleCancelConfirmationBox = () => {
        setShowConfirmationBox(false);
    };


    //For Modal
    const [show, setShow] = React.useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return ( <div>
        <UserPanelHeader></UserPanelHeader>
        <div style={{marginTop:'9%',marginBottom:'4%'}}>
            <Container>
                <Row style={{marginBottom:'5%'}}>
                    <Col sm={12} style={{textAlign:'center'}}>
                        <h2 className='RedColor' style={{fontWeight:"bold",fontFamily:"cursive",}}>Make Appointment in "{centre?.Name?.value}"</h2>  
                        <p style={{fontWeight:"300"}}>The average person puts only 25% of his energy into his work. The world takes off its hat to those who put in more than 50% of their capacity, and stands on its head for those few and far between souls who devote 100%.</p>
                    </Col>
                </Row>
                <Row style={{marginBottom:'10%'}}>
                    <Col sm={4}>
                        <h4 className='PurpleColor' style={{fontSize:'18px'}}>Donor Name: <spam style={{fontSize:'16px',fontWeight:'400'}}>{user?.Name?.value}</spam></h4>
                        <h4 className='PurpleColor' style={{fontSize:'18px'}}>Date Of Birth: <spam style={{fontSize:'16px',fontWeight:'400'}}>{user?.DOB?.value}</spam></h4>
                        <h4 className='PurpleColor' style={{fontSize:'18px'}}>Donor Blood Group: <spam style={{fontSize:'16px',fontWeight:'400'}}>{user?.BloodGroup?.value}</spam></h4>
                        <h4 className='PurpleColor' style={{fontSize:'18px'}}>Donor Gender: <spam style={{fontSize:'16px',fontWeight:'400'}}>{user?.Gender?.value}</spam></h4>
                        <h4 className='PurpleColor' style={{fontSize:'18px'}}>Donor Email: <spam style={{fontSize:'16px',fontWeight:'400'}}>{user?.Email?.value}</spam></h4>
                        <h4 className='PurpleColor' style={{fontSize:'18px'}}>Donor ContactNo: <spam style={{fontSize:'16px',fontWeight:'400'}}>{user?.ContactNo?.value}</spam></h4>
                        <h4 className='PurpleColor' style={{fontSize:'18px'}}>Donor City: <spam style={{fontSize:'16px',fontWeight:'400'}}>{user?.City?.value}</spam></h4>
                        <h4 className='PurpleColor' style={{fontSize:'18px'}}>Donor Address: <spam style={{fontSize:'16px',fontWeight:'400'}}>{user?.Address?.value}</spam></h4>
                        
                    </Col>
                    <Col sm={4}>
                        <h4 className='PurpleColor' style={{fontSize:'18px'}}>Centre Name: <spam style={{fontSize:'16px',fontWeight:'400'}}>{centre?.Name?.value}</spam></h4>
                        <h4 className='PurpleColor' style={{fontSize:'18px'}}>Centre Email: <spam style={{fontSize:'16px',fontWeight:'400'}}>{centre?.Email?.value}</spam></h4>
                        <h4 className='PurpleColor' style={{fontSize:'18px'}}>Centre Timings: <spam style={{fontSize:'16px',fontWeight:'400'}}>{centre?.Timings?.value}</spam></h4>
                        <h4 className='PurpleColor' style={{fontSize:'18px'}}>Centre Contact No: <spam style={{fontSize:'16px',fontWeight:'400'}}>{centre?.ContactNo?.value}</spam></h4>
                        <h4 className='PurpleColor' style={{fontSize:'18px'}}>Centre Location: <spam style={{fontSize:'16px',fontWeight:'400'}}>{centre?.Location?.value}</spam></h4>
                        
                        <h4 className='PurpleColor' style={{fontSize:'18px',marginTop:'6%'}}>Eligible For Donation: <spam style={{fontSize:'16px',fontWeight:'400'}}>{user?.EligibilityStatus?.value}</spam>
                            { user?.EligibilityStatus?.value === 'Eligible' ? (
                                <>
                                    <spam style={{color:'green'}}> <CheckCircleFill className="m-1" size={20} /></spam>
                                </>
                            ):(
                                <>
                                    <spam style={{color:'red'}}><XCircleFill className="m-1" size={20} /></spam>
                                </>
                            )}
                        </h4>
                        <div style={{textAlign:'right',marginTop:'30%'}}>
                        <Button variant="default" type='submit' style={ButtonStyle} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} onClick={handleDeleteButtonClick}
                            >Book Appointment</Button>
                        </div>
                        <div>
                            {showConfirmationBox && (
                                <ConfirmationBox
                                message="Are you sure you want to book an appointment?"
                                onConfirm={submitForm}
                                onCancel={handleCancelConfirmationBox}
                                />
                            )}
                        </div>
                    </Col>
                    <Col sm={4}>
                    <div>
                        <Image src={image} rounded style={{marginLeft: "20%",marginTop:'3.9%',height: "18rem",opacity:'0.8'}}></Image>
                    </div>
                    </Col>
                </Row>
                
            </Container>
        </div>

        <div>
            <Modal show={show} onHide={handleClose} centered style={{}} >
                <div style={{border:'1px solid grey',boxShadow: '0px 0px 8px 0px grey'}}>
                    <Modal.Header closeButton>
                        <Modal.Title className='TextColor'>Appointment Slip</Modal.Title>
                    </Modal.Header>
                    <Modal.Body >
                        <p><strong style={{color:'grey'}}>Donor Name: </strong>{user?.Name?.value}</p>
                        <p style={{marginTop:'-4%'}}><strong style={{color:'grey'}}>Donor Date of Birth: </strong>{user?.DOB?.value}</p>
                        <p style={{marginTop:'-5%'}}><strong style={{color:'grey'}}>Donor Blood Group: </strong>{user?.BloodGroup?.value}</p>
                        <p style={{marginTop:'-5%'}}><strong style={{color:'grey'}}>Donor Gender: </strong>{user?.Gender?.value}</p>
                        <p style={{marginTop:'-5%'}}><strong style={{color:'grey'}}>Donor Email: </strong>{user?.Email?.value}</p>
                        <p style={{marginTop:'-5%'}}><strong style={{color:'grey'}}>Donor Contact No: </strong>{user?.ContactNo?.value}</p>
                        <p style={{marginTop:'-5%'}}><strong style={{color:'grey'}}>Donor City: </strong>{user?.City?.value}</p>
                        <p style={{marginTop:'-5%'}}><strong style={{color:'grey'}}>Donor Address: </strong>{user?.Address?.value}</p>
                        <p style={{marginTop:'-2%'}}><strong style={{color:'grey'}}>Centre Name: </strong>{centre?.Name?.value}</p>
                        <p style={{marginTop:'-4%'}}><strong style={{color:'grey'}}>Centre Timings: </strong>{centre?.Timings?.value}</p>
                        <p style={{marginTop:'-5%'}}><strong style={{color:'grey'}}>Centre Email: </strong>{centre?.Email?.value}</p>
                        <p style={{marginTop:'-5%'}}><strong style={{color:'grey'}}>Centre Contact No: </strong>{centre?.ContactNo?.value}</p>
                        <p style={{marginTop:'-5%'}}><strong style={{color:'grey'}}>Centre Location: </strong>{centre?.Location?.value}</p>
                    
                    </Modal.Body>

                    <Modal.Footer>
                        <div style={{marginRight:'45%'}}>
                            <Button size='sm' variant="flat" onClick={()=>{window.location.href = "/userpanel/HomeScreen";}}>
                                <HouseDoorFill className="" size={20} />
                            </Button>
                        </div>
                        
                        <Button size='sm' variant="flatSolid" onClick={()=>{window.location.href = "/userpanel/HomeScreen";}}>
                            <PrinterFill className="" size={20} />
                        </Button>
                        <Button size='sm' variant="flatSolid" onClick={()=>{window.location.href = "/user/my-account";}}>
                            View My Appointments
                        </Button>
                    </Modal.Footer>
                </div>
            </Modal>
        </div>

        <UserPanelFooter></UserPanelFooter>

    </div> );
};

export default MakeAppointment;