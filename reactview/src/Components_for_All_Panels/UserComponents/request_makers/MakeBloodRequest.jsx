import React from 'react'

import { Form, Row, Col, InputGroup, FloatingLabel, Image } from "react-bootstrap";

import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';

import AccountCircle from '@mui/icons-material/AccountCircleSharp';
import EmailIcon from '@mui/icons-material/EmailSharp';
import LocalHospitalIcon from '@mui/icons-material/LocalHospitalSharp';
import BloodtypeSharpIcon from '@mui/icons-material/BloodtypeSharp';
import LocationOnSharpIcon from '@mui/icons-material/LocationOnSharp';
import ContactsSharpIcon from '@mui/icons-material/ContactsSharp';
import LocationCitySharpIcon from '@mui/icons-material/LocationCitySharp';

import image from '../../../Public/user/image/PostBloodRequest2.jpg';
import '../css/style.css';

import UserPanelHeader from '../UserPanelHeader';

export default function MakeBloodRequest() {

    const [city, setCity] = React.useState('');
    const [bloodGroup, setBloodGroup] = React.useState('');

    const handleChange = (event) => {
        setCity(event.target.value);
        setBloodGroup(event.target.value);
    };

    return (<div>

        <UserPanelHeader></UserPanelHeader>

        <div style={{position: "relative"}}>
            <div>
                <Image src={image} rounded style={{marginLeft: "49.2%",marginTop:'4.2%',height: "40%",}}></Image>
            </div>

            <div 
                style={{position: "absolute",
                    bottom: "20%",left: "3%",top: "22%",
                    backgroundColor: "white",color: "",
                    height: "70%",
                    marginLeft: "20px",textAlign: "center",
                    width:"50%",fontFamily: "Arial",opacity: "1.0"
            }}>
            <Container fixed>
                <Box
                    component="form"
                    noValidate
                    autoComplete="off"
                    sx={{ mt: 3 }}
                    >
                        <Row>
                            <h4 className="TextColor" style={{fontFamily:'cursive'}}>Post Blood Request</h4>
                        </Row>
                    <Row>
                        <Col sm={6}>
                        <Box sx={{ display: 'flex', alignItems: 'flex-end', width:'90%' }}>
                            <AccountCircle sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
                            <TextField fullWidth id="input-with-sx" label="Name" variant="standard" size="small" margin="normal" />
                        </Box>
                        </Col>
                        <Col sm={6}>
                        <Box sx={{ display: 'flex', alignItems: 'flex-end', width:'90%' }}>
                            <EmailIcon sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
                            <TextField fullWidth id="input-with-sx" label="Email" variant="standard" size="small" margin="normal" />
                        </Box>
                        </Col>
                    </Row>
                    <Row>
                        <Col sm={6}>
                        <Box sx={{ display: 'flex', alignItems: 'flex-end', width:'90%' }}>
                            <LocalHospitalIcon sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
                            <TextField fullWidth id="input-with-sx" label="Hospital *" variant="standard" size="small" margin="normal" />
                        </Box>
                        </Col>
                        <Col sm={6}>
                        <Box sx={{ display: 'flex', alignItems: 'flex-end', width:'90%' }}>
                            <LocationOnSharpIcon sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
                            <TextField fullWidth id="input-with-sx" label="Location *" variant="standard" size="small" margin="normal" />
                        </Box>
                        </Col>
                    </Row>
                    <Row>
                        <Col sm={6}>
                        <Box sx={{ display: 'flex', alignItems: 'flex-end', width:'90%' }}>
                            <ContactsSharpIcon sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
                            <TextField fullWidth id="input-with-sx" label="Contact No *" variant="standard" size="small" margin="normal" />
                        </Box>
                        </Col>
                        <Col sm={6}>
                        <Box sx={{ display: 'flex', alignItems: 'flex-end', width:'90%' }}>
                            <LocationOnSharpIcon sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
                            <TextField fullWidth id="input-with-sx" label="Location *" variant="standard" size="small" margin="normal" />
                        </Box>
                        </Col>
                    </Row>
                    <Row>
                        <Col sm={6}>
                        <Box sx={{ display: 'flex', alignItems: 'flex-end', width:'94%' }}>
                            <LocationCitySharpIcon sx={{ color: 'action.active', mr: 0, my: 0.5 }} />
                            <FormControl fullWidth variant="standard" sx={{ m: 1.6, minWidth: 120 }}>
                                <InputLabel id="demo-simple-select-standard-label">City*</InputLabel>
                                <Select
                                    labelId="demo-simple-select-standard-label"
                                    id="demo-simple-select-standard"
                                    value={city}
                                    onChange={handleChange}
                                    label="City"
                                >
                                    <MenuItem value="">
                                    <em>None</em>
                                    </MenuItem>
                                    <MenuItem value={10}>Lahore</MenuItem>
                                    <MenuItem value={20}>Islamabad</MenuItem>
                                    <MenuItem value={30}>Karachi</MenuItem>
                                </Select>
                            </FormControl>
                        </Box>
                        </Col>
                        <Col sm={6}>
                        <Box sx={{ display: 'flex', alignItems: 'flex-end', width:'94%' }}>
                            <BloodtypeSharpIcon sx={{ color: 'action.active', mr: 0, my: 0.5 }} />
                            <FormControl fullWidth variant="standard" sx={{ m: 1.6, minWidth: 120 }}>
                                <InputLabel id="demo-simple-select-standard-label">Blood Group*</InputLabel>
                                <Select
                                    labelId="demo-simple-select-standard-label"
                                    id="demo-simple-select-standard"
                                    value={bloodGroup}
                                    onChange={handleChange}
                                    label="Blood Group *"
                                >
                                    <MenuItem value="">
                                    <em>None</em>
                                    </MenuItem>
                                    <MenuItem value={10}>A+</MenuItem>
                                    <MenuItem value={20}>B+</MenuItem>
                                    <MenuItem value={30}>C+</MenuItem>
                                    <MenuItem value={10}>A-</MenuItem>
                                    <MenuItem value={20}>B-</MenuItem>
                                    <MenuItem value={30}>C-</MenuItem>
                                </Select>
                            </FormControl>
                        </Box>
                        </Col>
                    </Row>
                </Box>
            </Container>
                
            </div>
            
        </div>

    </div>)
}
