import React from "react";
import { Row, Col,Button } from "react-bootstrap";
import { CDBFooter, CDBFooterLink, CDBBox, CDBBtn, CDBIcon } from 'cdbreact';
import logo from '../../Public/user/image/AppLogo4.png';
import './css/style.css';
const UserPanelFooter = () => {
    return (
        <CDBFooter className="FooterColor">
        <CDBBox display="flex" flex="column" className="mx-auto py-5" style={{ width: '85%' }}>
            <CDBBox display="flex" justifyContent="between" className="flex-wrap">
            <CDBBox>
                <a href="/" className="d-flex align-items-center p-0 TextColor">
                <img alt="logo" src={logo} width="60px" />
                <span className="h3 font-weight-bold TextColor">DONORS</span>
                </a>
                <p className="my-3 text-center" style={{ width: '250px' }}>
                This helps for making blood donation easily.
                </p>
                <CDBBox display="flex" className="mt-4">
                
                    <Button className="mx-1" variant='flatSolid'><CDBIcon fab icon="facebook-f" /></Button>
                    <Button className="mx-1" variant='flatSolid'><CDBIcon fab icon="twitter" /></Button>
                    <Button className="mx-1" variant='flatSolid'><CDBIcon fab icon="instagram" /></Button>
                    <Button className="mx-1" variant='flatSolid'><CDBIcon fab spin icon="google" /></Button>
                
               
                </CDBBox>
            </CDBBox>
            
            <CDBBox>
                <p className="h5 mb-4" style={{ fontWeight: '600' }}>
                Blood
                </p>
                <CDBBox flex="column" style={{ cursor: 'pointer', padding: '0'}}>
                <CDBFooterLink href="/">Blood Donors</CDBFooterLink>
                <CDBFooterLink href="/">Request Makers</CDBFooterLink>
                <CDBFooterLink href="/">Make Blood Donation</CDBFooterLink>
                <CDBFooterLink href="/">Post Blood Request</CDBFooterLink>
                <CDBFooterLink href="/">Registered As a Donor</CDBFooterLink>
                <CDBFooterLink href="/">Registered As a Request Maker</CDBFooterLink>
                <CDBFooterLink href="/">Registered As a NGO's/Center</CDBFooterLink>
                <CDBFooterLink href="/">Sign In</CDBFooterLink>
                <CDBFooterLink href="/">View Blood Donation Centers</CDBFooterLink>
                <CDBFooterLink href="/">Blood Analysis/Eligibility</CDBFooterLink>
                <CDBFooterLink href="/">Make Appointments</CDBFooterLink>
                </CDBBox>
            </CDBBox>
            <CDBBox>
                <p className="h5 mb-4" style={{ fontWeight: '600' }}>
                Features
                </p>
                <CDBBox flex="column" style={{ cursor: 'pointer', padding: '0' }}>
                <CDBFooterLink href="/">Frequently Asked Question</CDBFooterLink>
                <CDBFooterLink href="/">Packages</CDBFooterLink>
                <CDBFooterLink href="/">Job Posts</CDBFooterLink>
                <CDBFooterLink href="/">Financial Donation</CDBFooterLink>
                <CDBFooterLink href="/">Campaigns</CDBFooterLink>
                <CDBFooterLink href="/">Enquiries</CDBFooterLink>
                <CDBFooterLink href="/">Advertisement/News</CDBFooterLink>
                <CDBFooterLink href="/">Blog</CDBFooterLink>
                </CDBBox>
            </CDBBox>
            <CDBBox>
                <p className="h5 mb-4" style={{ fontWeight: '600' }}>
                Panels/Interfaces
                </p>
                <CDBBox flex="column" style={{ cursor: 'pointer', padding: '0' }}>
                <CDBFooterLink href="/">Donor Panel</CDBFooterLink>
                <CDBFooterLink href="/">Request Maker Panel</CDBFooterLink>
                <CDBFooterLink href="/">Admin Panel</CDBFooterLink>
                <CDBFooterLink href="/">Center Panel</CDBFooterLink>
                <CDBFooterLink href="/">NGO's Panel</CDBFooterLink>
                </CDBBox>
            </CDBBox>
            <CDBBox>
                <p className="h5 mb-4" style={{ fontWeight: '600' }}>
                About Us
                </p>
                <CDBBox flex="column" style={{cursor: 'pointer', padding: '0',color:"drak"}}>
                <CDBFooterLink href="/">Support</CDBFooterLink>
                <CDBFooterLink href="/">Contact</CDBFooterLink>
                <CDBFooterLink href="/">Who We Are</CDBFooterLink>
                <CDBFooterLink href="/">Our Team</CDBFooterLink>
                <CDBFooterLink href="/">Our Services</CDBFooterLink>
                <CDBFooterLink href="/">Partner With Us(Sponsors)</CDBFooterLink>
                <CDBFooterLink href="/">Meet Our Researchers</CDBFooterLink>
                <CDBFooterLink href="/">About Us</CDBFooterLink>
                </CDBBox>
            </CDBBox>
            
            </CDBBox>
            
        </CDBBox>
        <CDBBox display="flex" flex="column" className="mx-auto py-2" style={{ width: '10%' }}>
            <Button variant="flat">Donate Now</Button>
        </CDBBox>
        <CDBBox display="flex" flex="column" className="mx-auto py-1" style={{ width: '45%' }}>
            <p className="text-center mt-1 pl-5">DONORS acknowledges and pays our respect to the past, present and future Traditional Custodians and Elders of this nation
                and the continuation of cultural, spiritual and educational practices of Aboriginal and Torres Strait Islander peoples.</p>
            <h6 className="text-center mt-3 TextColor">&copy; DONOR, 2022. All rights reserved.</h6>
        </CDBBox>
            
        </CDBFooter>
    );
};
export default UserPanelFooter;