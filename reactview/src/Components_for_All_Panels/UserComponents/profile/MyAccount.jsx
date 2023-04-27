import React from 'react';

import { Container,  Navbar, Nav, Button,NavDropdown,Row,Col,Modal } from 'react-bootstrap';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import UserPanelHeader from '../UserPanelHeader';

function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
        role="tabpanel"
        hidden={value !== index}
        id={`full-width-tabpanel-${index}`}
        aria-labelledby={`full-width-tab-${index}`}
        {...other}
        style={{ marginTop: '16px' }} // add margin to the top to separate each tab panel
        >
        {value === index && (
            <Box sx={{ p: 3 }}>
            <Typography>{children}</Typography>
            </Box>
        )}
        </div>
    );
    }

    TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
    };

    function a11yProps(index) {
    return {
        id: `full-width-tab-${index}`,
        'aria-controls': `full-width-tabpanel-${index}`,
    };
    }

    export default function MyAccount() {

    //For Modal
    const [show, setShow] = React.useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const [isHover, setIsHover] = React.useState(true);

    const handleMouseEnter = () => {
        setIsHover(false);
    };

    const handleMouseLeave = () => {
        setIsHover(true);
    };
    const ButtonStyle1 = {
        backgroundColor: isHover ? 'rgb(160, 15, 15)' : 'rgb(160, 15, 15)',
        color: isHover ? 'white' : 'white',
        transform: isHover ? 'scale(0.8)' : 'scale(0.82)',
        border: isHover ? '' : '1px solid white',
        transitionDuration: isHover ? '' : '0.45s',
    };
    const ButtonStyle2 = {
        backgroundColor: isHover ? 'white' : 'white',
        color: isHover ? 'rgb(160, 15, 15)' : 'rgb(160, 15, 15)',
        transform: isHover ? 'scale(0.8)' : 'scale(0.82)',
        border: isHover ? '1px solid rgb(160, 15, 15)' : '1px solid rgb(160, 15, 15)',
        transitionDuration: isHover ? '' : '0.45s',
    };

    return (
        <div>
            <UserPanelHeader></UserPanelHeader>
            <div style={{marginTop:'10%', marginLeft:'5%'}}>
                <Box sx={{ display: 'flex', width: 800 }}>
                    <Box sx={{ borderRight: 1, borderColor: 'divider' }}>
                        <Tabs
                            orientation="vertical" // set the orientation to "vertical"
                            textColor=""
                            indicatorColor=""
                            value={value}
                            onChange={handleChange}
                            variant="fullWidth"
                            aria-label="basic tabs example"
                            sx={{
                                    "& .Mui-selected": {
                                        color: "#a00f0f",
                                    },
                                    "& .Mui-selected .MuiTab-wrapper": {
                                        backgroundColor: "#a00f0f",
                                        color: "#ffffff",
                                    },
                                    "& .MuiTabs-indicator": {
                                        backgroundColor: "#a00f0f",
                                    },
                            }}
                        >
                        <Tab label="My Profile" {...a11yProps(0)} />
                        <Tab label="My Blood Requests" {...a11yProps(1)} />
                        <Tab label="My Blood Donations" {...a11yProps(2)} />
                        <Tab label="My Appointments" {...a11yProps(3)} />
                        <Tab label="Log Out" {...a11yProps(4)} />
                        </Tabs>
                    </Box>
                    <TabPanel value={value} index={0}>
                        <div style={{marginLeft:'5%', width:'140%',marginTop:'-15%'}}>
                            <h3 className='TextColor' style={{fontFamily:'cursive',textAlign:'left'}}>My Account</h3>
                            <div style={{marginTop:'5%'}}>
                                <Row>
                                    <Col sm={6}>
                                        <p><strong>Full Name: </strong>Muhammad Abu Hurairah</p>
                                    </Col>
                                    <Col sm={6}>
                                        <p><strong>Username: </strong>hurairah37</p>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col sm={6}>
                                        <p><strong>Blood Group: </strong>A+</p>
                                    </Col>
                                    <Col sm={6}>
                                        <p><strong>Gender: </strong>Male</p>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col sm={6}>
                                        <p><strong>Date Of Birth: </strong>December 23,20000</p>
                                    </Col>
                                    <Col sm={6}>
                                        <p><strong>Email: </strong>mabuhurairah@email.com</p>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col sm={6}>
                                        <p><strong>Contact No: </strong>+92 333 1234567</p>
                                    </Col>
                                    <Col sm={6}>
                                        <p><strong>City: </strong>Lahore</p>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col sm={12}>
                                    <p><strong>Location: </strong>Allama Iqbal Town, Multan Road, Lahore</p>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col sm={12} style={{marginTop:'2%',textAlign:'right',marginLeft:'0%'}}>
                                        <Button variant="default" style={ButtonStyle1} 
                                            onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} 
                                            onClick={(e) => {
                                                handleShow();
                                            }}>Update My Account</Button> 
                                        <Button variant="default" style={ButtonStyle2} 
                                            onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} 
                                            onClick={(e) => {
                                                window.location.reload();
                                            }}>Delete My Profile</Button> 
                                    </Col>
                                </Row>
                            </div>
                        </div>

                        <div>
                            <Modal show={show} onHide={handleClose}>
                                <div style={{border:'1px solid rgb(160,15,15)',boxShadow: '0px 0px 8px 0px rgb(116, 10, 10)'}}>
                                    <Modal.Header closeButton>
                                        <Modal.Title className='TextColor'>Personal Details</Modal.Title>
                                    </Modal.Header>
                                    <Modal.Body>
                                        <p><strong>Donated Blood Group: </strong>AB+</p>
                                        <p><strong>Donated By: </strong>Muhammad Ahmad</p>
                                        <p><strong>Donated On: </strong>December 01,2000</p>
                                        <p><strong>Email Address: </strong>muhammadali@gmail.com</p>
                                        <p><strong>City: </strong>Lahore</p>
                                        <p><strong>Location: </strong>House 08, Allama Iqbal Town, Lahore</p>
                                        <p><strong>Blood Donation Centre: </strong>Jinnah Hospital</p>
                                        <p><strong>Contact Number: </strong>+92 300 1234567</p>
                                        <p><strong>Member Since: </strong>one Year</p>
                                    </Modal.Body>
                                    <Modal.Footer>
                                    <Button variant="flat" onClick={handleClose}>
                                        Close
                                    </Button>
                                    <Button variant="flatSolid" onClick={handleClose}>
                                        Make Blood Donation
                                    </Button>
                                    </Modal.Footer>
                                </div>
                            </Modal>
                        </div>


                    </TabPanel>
                    <TabPanel value={value} index={1}>
                        Item Two
                    </TabPanel>
                    <TabPanel value={value} index={2}>
                        Item Three
                    </TabPanel>
                </Box>
            </div>
        </div>
    );
}
