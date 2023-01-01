import React from 'react';
import { BrowserRouter as Router, Route,Routes } from 'react-router-dom';

/* SparQL Query Imports */
import Sparql from './Services/Api/SparqlQuery/sparql';


/* BloodDonationCenterPanel Imports */
import BloodCentreHomeScreen from './Panels/BloodDonationCentre/HomeScreen_BloodDonation';
import Footer from './Components_for_All_Panels/BloodCentre/Footer';
import Header from './Components_for_All_Panels/BloodCentre/Header';
import ProfileSettings from './Panels/BloodDonationCentre/ProfileSettings';
import BloodStock from './Panels/BloodDonationCentre/BloodStock'
import UserBloodInformation from './Panels/BloodDonationCentre/BloodInformation'
import Appointments from './Panels/BloodDonationCentre/Appointments';
import AddNewUser from './Panels/BloodDonationCentre/AddNewUser';
 
/* AdminPanel Imports */


/* UserPanel Imports */
import UserPanelHomeScreen from './Panels/Users/HomePage_UserPanel';
import UserLogin from './Components_for_All_Panels/UserComponents/auths/UserLogin';
import UserRegister from './Components_for_All_Panels/UserComponents/auths/UserRegister';
import UserPostBloodRequest from './Components_for_All_Panels/UserComponents/request_makers/PostBloodRequest';
import UserRequestMaker from './Components_for_All_Panels/UserComponents/request_makers/RequestMaker';
import UserMakeBloodDonation from './Components_for_All_Panels/UserComponents/donors/MakeBloodDonation';
import UserDonor from './Components_for_All_Panels/UserComponents/donors/Donor';
import UserBloodDonationCentre from './Components_for_All_Panels/UserComponents/blood_donation_centres/BloodDonationCentre';

function App() {
  return (
    <div>
      <Router>
      
        <Routes>
          <Header/>
          <Route exact path="/sparql" element={<Sparql />} />
          <Route exact path='/bloodCenter/HomeScreen' element={<BloodCentreHomeScreen/>}/>
          <Route exact path='/bloodCenter/ProfileSettings' element={<ProfileSettings/>}/>
          <Route exact path='/bloodCenter/BloodStock' element={<BloodStock/>}/>
          <Route exact path='/bloodCenter/userbloodInformation' element={<UserBloodInformation/>}/>
          <Route exact path='/bloodCenter/AppointmentDetails' element={<Appointments/>}/>
          <Route exact path='/bloodCenter/addNewUser' element={<AddNewUser/>}/>
          <Footer/>

          
          {/* UserPanel Routes */}
          <Route exact path='/user/home' element={<UserPanelHomeScreen/>} />
          <Route exact path='/user/login' element={<UserLogin/>} />
          <Route exact path='/user/register' element={<UserRegister/>} />
          <Route exact path='/user/post-blood-request' element={<UserPostBloodRequest/>} />
          <Route exact path='/user/request-maker' element={<UserRequestMaker/>} />
          <Route exact path='/user/make-blood-donation' element={<UserMakeBloodDonation/>} />
          <Route exact path='/user/donor' element={<UserDonor/>} />
          <Route exact path='/user/blood-donation-centre' element={<UserBloodDonationCentre/>} />

          <Route exact path='/user/HomeScreen' element={<UserPanelHomeScreen/>}/>
        </Routes>
        
      </Router>
    </div>
  );
}

export default App;
