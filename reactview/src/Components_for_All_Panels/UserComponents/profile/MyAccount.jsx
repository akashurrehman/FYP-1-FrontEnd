import React from 'react';

import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import UserPanelHeader from '../UserPanelHeader';


import MyPersonalDetails from './MyPersonalDetails';
import MyBloodRequests from './MyBloodRequests';
import MyBloodDonations from './MyBloodDonations';
import MyAppointments from './MyAppointments';
import AcceptedBloodRequests from './AcceptedBloodRequests';
import userLoginService from '../../../Services/Api/User/UserLoginService';
import UserPanelFooter from '../UserPanelFooter';
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

    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <div>
            <UserPanelHeader></UserPanelHeader>
            <div style={{marginTop:'10%', marginLeft:'5%'}}>
                <Box sx={{ display: 'flex', width: 1000 }}>
                    <Box sx={{ borderLeft: 0, borderColor: 'divider' }}>
                        <Tabs
                            orientation="vertical" // set the orientation to "vertical"
                            textColor=""
                            indicatorColor=""
                            value={value}
                            onChange={handleChange}
                            variant="fullWidth"
                            aria-label="basic tabs example"
                            
                            sx={{
                                width: 200,
                                position: 'fixed',
                                    "& .Mui-selected": {
                                        color: "#D64045",
                                    },
                                    "& .Mui-selected .MuiTab-wrapper": {
                                        backgroundColor: "#a00f0f",
                                        color: "#ffffff",
                                    },
                                    "& .MuiTabs-indicator": {
                                        backgroundColor: "#27213C",
                                    },
                                    
                            }}
                        >
                            <Tab label="My Profile" {...a11yProps(0)} sx={{ marginLeft: 0, }}/>
                            <Tab label="My Blood Requests" {...a11yProps(1)} />
                            <Tab label="My Blood Donations" {...a11yProps(2)} />
                            <Tab label="My Appointments" {...a11yProps(3)} />
                            <Tab label="Accepted Requests" {...a11yProps(4)} />
                            <Tab label="Log Out" {...a11yProps(5)} onClick={(e) => {
                                    userLoginService.logout();
                                    window.location.reload();
                                }} />
                        </Tabs>
                    </Box>
                    <TabPanel value={value} index={0}>
                        <div style={{marginLeft:'30%',width:'90%'}}>
                            <MyPersonalDetails></MyPersonalDetails>
                        </div>
                    </TabPanel>
                    <TabPanel value={value} index={1}>
                        <div style={{marginLeft:'20%',width:'100%'}}>
                            <MyBloodRequests></MyBloodRequests>
                        </div>
                    </TabPanel>
                    <TabPanel value={value} index={2}>
                        <div style={{marginLeft:'20%',width:'100%'}}>
                            <MyBloodDonations></MyBloodDonations>
                        </div>
                    </TabPanel>
                    <TabPanel value={value} index={3}>
                        <div style={{marginLeft:'20%',width:'100%'}}>
                            <MyAppointments></MyAppointments>
                        </div>
                    </TabPanel>
                    <TabPanel value={value} index={4}>
                        <div style={{marginLeft:'20%',width:'100%'}}>
                            <AcceptedBloodRequests></AcceptedBloodRequests>
                        </div>
                    </TabPanel>
                </Box>
            </div>
            <div style={{marginTop:'8%'}}>
                
            </div>
            <UserPanelFooter></UserPanelFooter>
        </div>
    );
}
