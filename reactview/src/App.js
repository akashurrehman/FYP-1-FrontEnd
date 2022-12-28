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

function App() {
  return (
    <div>
      <Router>
      <Header/>
        <Routes>
          <Route exact path="/sparql" element={<Sparql />} />
          <Route exact path='/bloodCenter/HomeScreen' element={<BloodCentreHomeScreen/>}/>
          <Route exact path='/bloodCenter/ProfileSettings' element={<ProfileSettings/>}/>
          <Route exact path='/bloodCenter/BloodStock' element={<BloodStock/>}/>
          <Route exact path='/bloodCenter/userbloodInformation' element={<UserBloodInformation/>}/>
          <Route exact path='/bloodCenter/AppointmentDetails' element={<Appointments/>}/>
          <Route exact path='/bloodCenter/addNewUser' element={<AddNewUser/>}/>
          {/* UserPanel Routes */}
          <Route exact path='/user/HomeScreen' element={<UserPanelHomeScreen/>}/>
        </Routes>
        <Footer/>
      </Router>
    </div>
  );
}

export default App;
