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

function App() {
  return (
    <div>
      <AdminPanelHomeScreen/>
      <Router>
      
        <Routes>
          <Header/>
          <Route exact path="/sparql" element={<Sparql />} />
          <Route exact path='/bloodCenter/HomeScreen' element={<BloodCentreHomeScreen/>}/>
          {/* Admin panel Routes */}
          <Route exact path='/adminpanel/HomeScreen' element={<AdminPanelHomeScreen/>}/>
    

          {/* UserPanel Routes */}
          <Route exact path='/userpanel/HomeScreen' element={<UserPanelHomeScreen/>}/>
        </Routes>
        
      </Router>
    </div>
  );
}

export default App;
