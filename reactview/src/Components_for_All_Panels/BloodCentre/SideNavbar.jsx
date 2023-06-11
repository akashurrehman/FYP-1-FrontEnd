import React from 'react';
import {
  CDBSidebar,
  CDBSidebarContent,
  CDBSidebarFooter,
  CDBSidebarHeader,
  CDBSidebarMenu,
  CDBSidebarMenuItem,
} from 'cdbreact';
import { NavLink } from 'react-router-dom';
import './style/navbar.css';
import { useAuth } from './../../Panels/BloodDonationCentre/Auth/AuthContext';

const Sidebar = () => {
  const {handleLogout} = useAuth();
  const handleLogoutClick=()=>{
    handleLogout();
    console.log('In Logout')
    window.location.href="/user/login";
  }
  return (
    <div className="sticky-top position-fixed" style={{ display: 'flex', height: '95vh',marginTop:38,marginLeft:-25}} id="sticky-sidebar">
      <CDBSidebar textColor="#FFFFFF" backgroundColor="#153250"   breakpoint={720} style={{width:"125%"}}>
        <CDBSidebarHeader prefix={<i className="fa fa-bars fa-large"></i>}>
        <img
                src="/Images/WebLogo.jpeg"
                style={{
                  width: '38px',
                  height: '38px',
                  borderRadius: '50%'
              }}
                alt="user Profile"
                className="d-inline-block align-top mx-2"
              />
        </CDBSidebarHeader>

        <CDBSidebarContent className="sidebar-content" >
          <CDBSidebarMenu textColor="#FFFFFF" backgroundColor="#272C33">
            <NavLink exact to="/bloodCenter/HomeScreen" activeClassName="activeClicked">
              <CDBSidebarMenuItem icon="columns">Dashboard</CDBSidebarMenuItem>
            </NavLink>
            <NavLink exact to="/bloodCenter/ProfileSettings" activeClassName="activeClicked">
              <CDBSidebarMenuItem icon="cog">Profile Setting</CDBSidebarMenuItem>
            </NavLink>
            <NavLink exact to="/bloodCenter/addbloodRequest" activeClassName="activeClicked">
              <CDBSidebarMenuItem icon="plus-circle">Add Blood Request</CDBSidebarMenuItem>
            </NavLink>
            <NavLink exact to="/bloodCenter/BloodStock" activeClassName="activeClicked">
              <CDBSidebarMenuItem icon="book">Blood Stock Report</CDBSidebarMenuItem>
            </NavLink>
            <NavLink exact to="/bloodCenter/userbloodInformation" activeClassName="activeClicked">
              <CDBSidebarMenuItem icon="info-circle">Add Blood Information</CDBSidebarMenuItem>
            </NavLink>
            <NavLink exact to="/bloodCenter/AppointmentDetails" activeClassName="activeClicked">
              <CDBSidebarMenuItem icon="user">Appointments</CDBSidebarMenuItem>
            </NavLink>
            <NavLink exact to="/bloodCenter/addNewUser" activeClassName="activeClicked">
            <CDBSidebarMenuItem icon="user-plus">Add New User</CDBSidebarMenuItem>
            </NavLink>
            <NavLink exact to="/bloodCenter/bloodRequests" activeClassName="activeClicked">
              <CDBSidebarMenuItem icon="tint">All Blood Requests</CDBSidebarMenuItem>
            </NavLink>
            <NavLink exact to="/bloodCenter/MyAccount" activeClassName="activeClicked">
              <CDBSidebarMenuItem icon="user">My Account</CDBSidebarMenuItem>
            </NavLink>
            <NavLink onClick={handleLogoutClick} activeClassName="activeClicked">
              <CDBSidebarMenuItem icon="share">Logout</CDBSidebarMenuItem>
            </NavLink>
          </CDBSidebarMenu>
        </CDBSidebarContent>
      </CDBSidebar>
    </div>
  );
};

export default Sidebar;