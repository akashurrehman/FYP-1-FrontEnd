import React from 'react'
import { Envelope,Globe, PersonLinesFill, CalendarDateFill,Lock, PhoneVibrate, Geo, Map, Fingerprint } from 'react-bootstrap-icons';
import { Form, Row, Col, InputGroup, FloatingLabel } from "react-bootstrap";
import { useAuth } from '../../BloodDonationCentre/Auth/AuthContext';
import jwtDecode from 'jwt-decode';
export default function Profilesettings() {
  const {token} = useAuth();
    
  const decodedToken = token ? jwtDecode(token) : null;
  const role = decodedToken?.role;

  const authCentre=()=>{
    if(role!='ADMIN'){
      window.location.href = "/user/login";
    }
      console.log("authCentre");
  }

  React.useEffect(() => {
    authCentre();
  }, []);
  return (
    <div className="turningred">
      <h1 className="color">
        Profile Settings
      </h1>

      <div className="container inputcont">
        <h3 className='color'><u>Personal Information</u></h3>
        <div className="row">
          <div className="col settingss">
            <h5 className='rang'>First Name</h5>
            <InputGroup className="mb-3">
              <InputGroup.Text id="basic-addon1">
                <PersonLinesFill className="Appcolor" size={30} />
              </InputGroup.Text>
              <FloatingLabel controlId="floatingPassword" label="Enter Your First Name">
                <Form.Control type="text" placeholder="Password" />
              </FloatingLabel>
            </InputGroup>
          </div>
          <div className="col">
            <h5 className='rang'>Last Name</h5>
            <InputGroup className="mb-3 input">
              <InputGroup.Text id="basic-addon1">
                <PersonLinesFill className="Appcolor" size={30} />
              </InputGroup.Text>
              <FloatingLabel controlId="floatingPassword" label="Surname">
                <Form.Control type="text" placeholder="Surname" />
              </FloatingLabel>
            </InputGroup>
          </div>
        </div>
      </div>
      <div className="container">
        <div class="row ">
          <div class="col-5 ">
            <h5 className='rang'>Date of Birth</h5>
            <InputGroup className="mb-3 input">
              <InputGroup.Text id="basic-addon1">
                <CalendarDateFill className="Appcolor" size={30} />
              </InputGroup.Text>
              <FloatingLabel controlId="floatingPassword" label="dd/mm/yyyy">
                <Form.Control type="date" placeholder="DOB" />
              </FloatingLabel>
            </InputGroup>
          </div>

          <div class="col-7">

            <h5 className='rang'>Nationality</h5>
            <InputGroup className="mb-3 input">
              <InputGroup.Text id="basic-addon1">
                <Globe className="Appcolor" size={30} />
              </InputGroup.Text>
              <FloatingLabel controlId="floatingPassword" label="Nationality">
                <Form.Control type="text" placeholder="Nationality" />
              </FloatingLabel>
            </InputGroup>
          </div>
        </div>
      </div>
      <div className="container inputcont">
        <h3 className='color'><u>Contact Information</u></h3>
        <div className="row">
          <div className="col settingss">
            <h5 className='rang'>Email</h5>
            <InputGroup className="mb-3">
              <InputGroup.Text id="basic-addon1">
                <Envelope className="Appcolor" size={30} />
              </InputGroup.Text>
              <FloatingLabel controlId="floatingPassword" label="Enter Email Here*">
                <Form.Control type="text" placeholder="Mail" />
              </FloatingLabel>
            </InputGroup>
          </div>
          <div className="col">
            <h5 className='rang'>Contact Number</h5>
            <InputGroup className="mb-3 input">
              <InputGroup.Text id="basic-addon1">
                <PhoneVibrate className="Appcolor" size={30} />
              </InputGroup.Text>
              <FloatingLabel controlId="floatingPassword" label="Phone Number*">
                <Form.Control type="tel" placeholder="Contact" />
              </FloatingLabel>
            </InputGroup>
          </div>
        </div>

        <div className="row">
          <div className="col settingss">
            <h5 className='rang'>City</h5>
            <InputGroup className="mb-3">
              <InputGroup.Text id="basic-addon1">
                <Geo className="Appcolor" size={30} />
              </InputGroup.Text>
              <FloatingLabel controlId="floatingPassword" label="City*">
                <Form.Control type="text" placeholder="City" />
              </FloatingLabel>
            </InputGroup>
          </div>
          <div className="col">
            <h5 className='rang'>Address</h5>
            <InputGroup className="mb-3 input">
              <InputGroup.Text id="basic-addon1">
                <Map className="Appcolor" size={30} />
              </InputGroup.Text>
              <FloatingLabel controlId="floatingPassword" label="Address">
                <Form.Control type="text" placeholder="Address" />
              </FloatingLabel>
            </InputGroup>
          </div>
        </div>
      </div>

      <div className="container inputcont">
        <h3 className='color'><u>Password</u></h3>
        <div className="row">
          <div className="col settingss">
            <h5 className='rang'>Current Password</h5>
            <InputGroup className="mb-3">
              <InputGroup.Text id="basic-addon1">
                <Fingerprint className="Appcolor" size={30} />
              </InputGroup.Text>
              <FloatingLabel controlId="floatingPassword" label="Enter Your Current Password Here*">
                <Form.Control type="password" placeholder="Mail" />
              </FloatingLabel>
            </InputGroup>
          </div>
        </div>

        <div className="row">
          <div className="col settingss">
            <h5 className='rang'>New Password</h5>
            <InputGroup className="mb-3">
              <InputGroup.Text id="basic-addon1">
                <Lock className="Appcolor" size={30} />
              </InputGroup.Text>
              <FloatingLabel controlId="floatingPassword" label="Password*">
                <Form.Control type="password" placeholder="Password" />
              </FloatingLabel>
            </InputGroup>
          </div>
          <div className="col">
            <h5 className='rang'>Re-Type Password</h5>
            <InputGroup className="mb-3 input">
              <InputGroup.Text id="basic-addon1">
                <Lock className="Appcolor" size={30} />
              </InputGroup.Text>
              <FloatingLabel controlId="floatingPassword" label="Re-type Password">
                <Form.Control type="password" placeholder="Password" />
              </FloatingLabel>
            </InputGroup>
          </div>
        </div>
      </div>




    </div>
  )
}
