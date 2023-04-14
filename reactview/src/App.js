import React from 'react';
import { BrowserRouter as Router, Route,Routes } from 'react-router-dom';



/* BloodDonationCenterPanel Imports */
import BloodCentreHomeScreen from './Panels/BloodDonationCentre/HomeScreen_BloodDonation';
import Footer from './Components_for_All_Panels/BloodCentre/Footer';
import Header from './Components_for_All_Panels/BloodCentre/Header';
import ProfileSettings from './Panels/BloodDonationCentre/ProfileSettings';
import BloodStock from './Panels/BloodDonationCentre/BloodStock'
import UserBloodInformation from './Panels/BloodDonationCentre/BloodInformation'
import Appointments from './Panels/BloodDonationCentre/Appointments';
import AddNewUser from './Panels/BloodDonationCentre/AddNewUser';
import BloodRequests from './Panels/BloodDonationCentre/BloodRequests';
import AddBloodRequest from './Panels/BloodDonationCentre/AddBloodRequest';

/* AdminPanel Imports */
import AdminPanelHomeScreen from './Panels/Admin/screen';
/* UserPanel Imports */
import UserPanelHomeScreen from './Panels/Users/HomePage_UserPanel';
import UserLogin from './Components_for_All_Panels/UserComponents/auths/UserLogin';
import UserRegister from './Components_for_All_Panels/UserComponents/auths/UserRegister';
import UserPostBloodRequest from './Components_for_All_Panels/UserComponents/request_makers/PostBloodRequest';
import UserRequestMaker from './Components_for_All_Panels/UserComponents/request_makers/RequestMaker';
import UserMakeBloodDonation from './Components_for_All_Panels/UserComponents/donors/MakeBloodDonation';
import UserDonor from './Components_for_All_Panels/UserComponents/donors/Donor';
import UserBloodDonationCentre from './Components_for_All_Panels/UserComponents/blood_donation_centres/BloodDonationCentre';
import LabHome from './Panels/Laboratory/LabHome';
import Login from './Temp-Files/Login';
import ViewCenterDonors from './Panels/BloodDonationCentre/ViewCenterDonors';
import MakeBloodDonation from './Components_for_All_Panels/UserComponents/donors/MakeBloodDonation';
import MakeBloodRequest from './Components_for_All_Panels/UserComponents/request_makers/MakeBloodRequest';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import LabProfileSetting from './Panels/Laboratory/LabProfileSetting';
import ReportRequests from './Panels/Laboratory/ReportRequests';
function App() {
  return (
    <div>
      <Router>
      <ToastContainer />      
        <Routes>
          <Route exact path="/Login" element={<Login />} />
          <Route exact path='/bloodCenter/HomeScreen' element={<BloodCentreHomeScreen/>}/>
          <Route exact path='/bloodCenter/ProfileSettings' element={<ProfileSettings/>}/>
          <Route exact path='/bloodCenter/BloodStock' element={<BloodStock/>}/>
          <Route exact path='/bloodCenter/addbloodRequest' element={<AddBloodRequest />} />
          <Route exact path='/bloodCenter/userbloodInformation' element={<UserBloodInformation/>}/>
          <Route exact path='/bloodCenter/AppointmentDetails' element={<Appointments/>}/>
          <Route exact path='/bloodCenter/addNewUser' element={<AddNewUser/>}/>
          <Route exact path='/bloodCenter/bloodRequests' element={<BloodRequests/>}/>
          <Route exact path='/bloodCenter/ViewAllDonors' element={<ViewCenterDonors/>}/>

          
          {/* Admin panel Routes */}
          <Route exact path='/adminpanel/HomeScreen' element={<AdminPanelHomeScreen/>}/>

          {/* UserPanel Routes */}
          
          <Route exact path='/userpanel/HomeScreen' element={<UserPanelHomeScreen/>}/>
          <Route exact path='/user/login' element={<UserLogin/>} />
          <Route exact path='/user/register' element={<UserRegister/>} />
          <Route exact path='/user/post-blood-request' element={<UserPostBloodRequest/>} />
          <Route exact path='/user/make-blood-request' element={<MakeBloodRequest/>} />
          <Route exact path='/user/request-maker' element={<UserRequestMaker/>} />
          <Route exact path='/user/make-blood-donation' element={<UserMakeBloodDonation/>} />
          <Route exact path='/user/donor' element={<UserDonor/>} />
          <Route exact path='/user/blood-donation-centre' element={<UserBloodDonationCentre/>} />

          {/*Lab Interface Routes */}
          <Route exact path='/lab/home' element={<LabHome/>}/>
          <Route exact path='/lab/profileSettings' element={<LabProfileSetting/>}/>
          <Route exact path='/lab/ReportRequest' element={<ReportRequests/>}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
